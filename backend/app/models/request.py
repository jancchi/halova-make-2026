from datetime import datetime, timezone
from enum import Enum
from typing import Optional

from sqlalchemy import Column, JSON, Text
from sqlmodel import Field, SQLModel


class RequestStatus(str, Enum):
    PENDING = "PENDING"
    PROCESSING = "PROCESSING"
    OPEN = "OPEN"
    FAILED = "FAILED"
    RESOLVED = "RESOLVED"


class RequestRole(str, Enum):
    STARTUP = "startup"
    INVESTOR = "investor"
    SERVICE_PROVIDER = "service_provider"
    MEMBER = "member"


class RequestUrgency(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class RequestHelpType(str, Enum):
    VOLUNTEER = "volunteer"
    FINANCIAL = "financial"
    MATERIAL = "material"
    OTHER = "other"


class CommunityRequest(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    name: str
    email: str = Field(index=True)
    organization: Optional[str] = None
    role: RequestRole
    phone: Optional[str] = None
    city: str

    category: str = Field(index=True)
    title: str = Field(sa_column=Column(Text, nullable=False))
    description: str = Field(sa_column=Column(Text, nullable=False))

    urgency: RequestUrgency
    deadline: Optional[str] = None
    budget: Optional[float] = None
    help_type: RequestHelpType
    tags: list[str] = Field(
        default_factory=list, sa_column=Column(JSON, nullable=False)
    )

    status: RequestStatus = Field(default=RequestStatus.PENDING, index=True)

    ai_summary: Optional[str] = Field(
        default=None, sa_column=Column(Text, nullable=True)
    )
    ai_urgency_score: Optional[int] = Field(default=None, index=True)
    ai_urgency_reasoning: Optional[str] = Field(
        default=None, sa_column=Column(Text, nullable=True)
    )
    ai_processed_at: Optional[datetime] = None
    ai_error: Optional[str] = Field(default=None, sa_column=Column(Text, nullable=True))

    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc), index=True
    )
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class CategoryRead(SQLModel):
    id: str
    title: str
    description: str
    slug: str


class StatsRead(SQLModel):
    activeRequests: int
    completedRequests: int
    activeHelpers: int
    successRate: int


class RequestCreate(SQLModel):
    name: str = Field(min_length=1)
    email: str = Field(min_length=3)
    organization: Optional[str] = None
    role: RequestRole
    phone: Optional[str] = None
    city: str = Field(min_length=2)

    category: str = Field(min_length=1)
    title: str = Field(min_length=5)
    description: str = Field(min_length=40, max_length=2000)

    urgency: RequestUrgency
    deadline: Optional[str] = None
    budget: Optional[float] = None
    helpType: RequestHelpType
    tags: list[str] = Field(default_factory=list)


class RequestCreateResponse(SQLModel):
    id: str
    status: str
    createdAt: datetime


class RequestDetailRead(SQLModel):
    id: str
    status: RequestStatus
    createdAt: datetime
    updatedAt: datetime

    name: str
    email: str
    organization: Optional[str]
    role: RequestRole
    phone: Optional[str]
    city: str
    category: str
    title: str
    description: str
    urgency: RequestUrgency
    deadline: Optional[str]
    budget: Optional[float]
    helpType: RequestHelpType
    tags: list[str]

    aiSummary: Optional[str]
    aiUrgencyScore: Optional[int]
    aiUrgencyReasoning: Optional[str]
    aiProcessedAt: Optional[datetime]
    aiError: Optional[str]


class AdminRequestRow(SQLModel):
    id: str
    title: str
    category: str
    status: RequestStatus
    createdAt: datetime
    name: str
    organization: Optional[str]
    aiUrgencyScore: Optional[int]


class RequestStatusPatch(SQLModel):
    status: RequestStatus
