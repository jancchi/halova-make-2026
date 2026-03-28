from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

from app.services.ai_pipeline import AIPipelineError, analyze_request


router = APIRouter()


class RequestCreate(BaseModel):
    company_name: str = Field(min_length=1)
    web_url: str = Field(min_length=1)
    description: str = Field(min_length=1)


class AIResult(BaseModel):
    category: str
    priority_score: int = Field(ge=1, le=10)
    priority_reasoning: str
    summary: str
    required_member_roles: list[str]


@router.post("/requests", response_model=AIResult, status_code=status.HTTP_202_ACCEPTED)
async def create_request(payload: RequestCreate) -> AIResult:
    try:
        result = analyze_request(
            company_name=payload.company_name,
            web_url=payload.web_url,
            description=payload.description,
        )
    except AIPipelineError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"AI pipeline failed: {exc}",
        ) from exc
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="AI returned malformed response",
        ) from exc

    return AIResult.model_validate(result)
