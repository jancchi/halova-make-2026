from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import Session, desc, func, or_, select

from app.database import get_session
from app.models.request import (
    AdminRequestRow,
    CategoryRead,
    CommunityRequest,
    RequestCreate,
    RequestCreateResponse,
    RequestDetailRead,
    RequestStatusPatch,
    RequestStatus,
    StatsRead,
)
from app.services.ai_pipeline import AIPipelineError, analyze_request, fallback_analysis
from app.services.constants import DEFAULT_CATEGORIES


router = APIRouter()


@router.get("/ping")
async def ping() -> dict[str, bool]:
    return {"pong": True}


@router.get("/categories", response_model=list[CategoryRead])
async def categories() -> list[CategoryRead]:
    return DEFAULT_CATEGORIES


@router.get("/stats", response_model=StatsRead)
async def stats(session: Session = Depends(get_session)) -> StatsRead:
    active_requests = session.exec(
        select(func.count(CommunityRequest.id)).where(
            CommunityRequest.status.in_(
                [RequestStatus.PENDING, RequestStatus.PROCESSING, RequestStatus.OPEN]
            )
        )
    ).one()
    completed_requests = session.exec(
        select(func.count(CommunityRequest.id)).where(
            CommunityRequest.status == RequestStatus.RESOLVED
        )
    ).one()
    total_requests = session.exec(select(func.count(CommunityRequest.id))).one()

    success_rate = 0
    if total_requests:
        success_rate = round((completed_requests / total_requests) * 100)

    return StatsRead(
        activeRequests=active_requests,
        completedRequests=completed_requests,
        activeHelpers=342,
        successRate=success_rate,
    )


@router.post(
    "/requests",
    response_model=RequestCreateResponse,
    status_code=status.HTTP_202_ACCEPTED,
)
async def create_request(
    payload: RequestCreate,
    session: Session = Depends(get_session),
) -> RequestCreateResponse:
    now = datetime.now(timezone.utc)
    request = CommunityRequest(
        name=payload.name,
        email=payload.email,
        organization=payload.organization,
        role=payload.role,
        phone=payload.phone,
        city=payload.city,
        category=payload.category,
        title=payload.title,
        description=payload.description,
        urgency=payload.urgency,
        deadline=payload.deadline,
        budget=payload.budget,
        help_type=payload.helpType,
        tags=payload.tags,
        status=RequestStatus.PROCESSING,
        created_at=now,
        updated_at=now,
    )

    session.add(request)
    session.commit()
    session.refresh(request)

    try:
        ai = analyze_request(
            category=request.category,
            title=request.title,
            description=request.description,
            urgency=request.urgency.value,
            deadline=request.deadline,
            role=request.role.value,
            city=request.city,
            tags=request.tags,
        )
    except (AIPipelineError, ValueError):
        ai = fallback_analysis(
            title=request.title,
            description=request.description,
            urgency=request.urgency.value,
            deadline=request.deadline,
        )
        request.ai_error = "Primary AI pipeline failed; fallback applied."

    request.ai_summary = ai["summary"]
    request.ai_urgency_score = ai["urgency_score"]
    request.ai_urgency_reasoning = ai["urgency_reasoning"]
    request.ai_processed_at = datetime.now(timezone.utc)
    request.status = RequestStatus.OPEN
    request.updated_at = datetime.now(timezone.utc)

    session.add(request)
    session.commit()
    session.refresh(request)

    return RequestCreateResponse(
        id=str(request.id),
        status=request.status.value,
        createdAt=request.created_at,
    )


@router.get("/requests/{request_id}", response_model=RequestDetailRead)
async def get_request(
    request_id: int, session: Session = Depends(get_session)
) -> RequestDetailRead:
    request = session.get(CommunityRequest, request_id)
    if not request:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Request not found"
        )

    return RequestDetailRead(
        id=str(request.id),
        status=request.status,
        createdAt=request.created_at,
        updatedAt=request.updated_at,
        name=request.name,
        email=request.email,
        organization=request.organization,
        role=request.role,
        phone=request.phone,
        city=request.city,
        category=request.category,
        title=request.title,
        description=request.description,
        urgency=request.urgency,
        deadline=request.deadline,
        budget=request.budget,
        helpType=request.help_type,
        tags=request.tags,
        aiSummary=request.ai_summary,
        aiUrgencyScore=request.ai_urgency_score,
        aiUrgencyReasoning=request.ai_urgency_reasoning,
        aiProcessedAt=request.ai_processed_at,
        aiError=request.ai_error,
    )


@router.get("/admin/requests/top-urgent", response_model=list[AdminRequestRow])
async def top_urgent(
    limit: int = Query(default=10, ge=1, le=50),
    session: Session = Depends(get_session),
) -> list[AdminRequestRow]:
    rows = session.exec(
        select(CommunityRequest)
        .where(CommunityRequest.status == RequestStatus.OPEN)
        .order_by(
            desc(CommunityRequest.ai_urgency_score), desc(CommunityRequest.created_at)
        )
        .limit(limit)
    ).all()

    return [
        AdminRequestRow(
            id=str(row.id),
            title=row.title,
            category=row.category,
            status=row.status,
            createdAt=row.created_at,
            name=row.name,
            organization=row.organization,
            aiUrgencyScore=row.ai_urgency_score,
        )
        for row in rows
    ]


@router.get("/admin/requests", response_model=list[AdminRequestRow])
async def list_admin_requests(
    category: str | None = None,
    status_filter: RequestStatus | None = Query(default=None, alias="status"),
    urgency_min: int | None = Query(default=None, ge=1, le=10),
    urgency_max: int | None = Query(default=None, ge=1, le=10),
    q: str | None = None,
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
    session: Session = Depends(get_session),
) -> list[AdminRequestRow]:
    query = select(CommunityRequest)

    if category:
        query = query.where(CommunityRequest.category == category)
    if status_filter:
        query = query.where(CommunityRequest.status == status_filter)
    if urgency_min is not None:
        query = query.where(CommunityRequest.ai_urgency_score >= urgency_min)
    if urgency_max is not None:
        query = query.where(CommunityRequest.ai_urgency_score <= urgency_max)
    if q:
        like = f"%{q}%"
        query = query.where(
            or_(
                CommunityRequest.title.ilike(like),
                CommunityRequest.description.ilike(like),
                CommunityRequest.name.ilike(like),
                CommunityRequest.organization.ilike(like),
            )
        )

    rows = session.exec(
        query.order_by(desc(CommunityRequest.created_at)).offset(offset).limit(limit)
    ).all()

    return [
        AdminRequestRow(
            id=str(row.id),
            title=row.title,
            category=row.category,
            status=row.status,
            createdAt=row.created_at,
            name=row.name,
            organization=row.organization,
            aiUrgencyScore=row.ai_urgency_score,
        )
        for row in rows
    ]


@router.patch("/admin/requests/{request_id}", response_model=RequestDetailRead)
async def patch_admin_request(
    request_id: int,
    payload: RequestStatusPatch,
    session: Session = Depends(get_session),
) -> RequestDetailRead:
    request = session.get(CommunityRequest, request_id)
    if not request:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Request not found"
        )

    request.status = payload.status
    request.updated_at = datetime.now(timezone.utc)
    session.add(request)
    session.commit()
    session.refresh(request)

    return RequestDetailRead(
        id=str(request.id),
        status=request.status,
        createdAt=request.created_at,
        updatedAt=request.updated_at,
        name=request.name,
        email=request.email,
        organization=request.organization,
        role=request.role,
        phone=request.phone,
        city=request.city,
        category=request.category,
        title=request.title,
        description=request.description,
        urgency=request.urgency,
        deadline=request.deadline,
        budget=request.budget,
        helpType=request.help_type,
        tags=request.tags,
        aiSummary=request.ai_summary,
        aiUrgencyScore=request.ai_urgency_score,
        aiUrgencyReasoning=request.ai_urgency_reasoning,
        aiProcessedAt=request.ai_processed_at,
        aiError=request.ai_error,
    )
