from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, field_validator
from typing import List, Optional, Literal, Dict, Any
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Tài Chính An Tâm API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
LeadSource = Literal["contact", "chat", "package"]
LeadStatus = Literal["new", "contacted", "closed"]


class CalcInput(BaseModel):
    model_config = ConfigDict(extra="ignore")
    age: Optional[int] = None
    monthly: Optional[int] = None
    years: Optional[int] = None


class LeadCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")

    source: LeadSource = "contact"
    name: str = Field(min_length=2, max_length=120)
    phone: str = Field(min_length=5, max_length=40)
    email: Optional[str] = Field(default=None, max_length=160)
    city: Optional[str] = Field(default=None, max_length=120)
    interest: Optional[str] = Field(default=None, max_length=160)
    langPref: Optional[str] = Field(default=None, max_length=40)
    message: Optional[str] = Field(default=None, max_length=2000)
    lang: Optional[Literal["cs", "vi"]] = "cs"
    packageId: Optional[str] = Field(default=None, max_length=40)
    calc: Optional[CalcInput] = None

    @field_validator("name", "phone", mode="before")
    @classmethod
    def strip_required(cls, v):
        if isinstance(v, str):
            v = v.strip()
        return v

    @field_validator("email", "city", "interest", "langPref", "message", "packageId", mode="before")
    @classmethod
    def blank_to_none(cls, v):
        if isinstance(v, str):
            v = v.strip()
            return v or None
        return v


class LeadUpdate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    status: Optional[LeadStatus] = None
    note: Optional[str] = Field(default=None, max_length=2000)


class Lead(LeadCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: LeadStatus = "new"
    note: Optional[str] = None
    createdAt: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updatedAt: Optional[str] = None


class LeadStats(BaseModel):
    total: int
    bySource: Dict[str, int]
    byStatus: Dict[str, int]


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Tài Chính An Tâm API", "status": "ok"}


@api_router.get("/health")
async def health():
    try:
        await db.command("ping")
        return {"status": "ok", "db": "ok"}
    except Exception as e:  # pragma: no cover
        logger.error("DB ping failed: %s", e)
        raise HTTPException(status_code=503, detail="Database unavailable")


@api_router.post("/leads", response_model=Lead, status_code=201)
async def create_lead(payload: LeadCreate):
    lead = Lead(**payload.model_dump())
    await db.leads.insert_one(lead.model_dump())
    logger.info("New lead %s from %s (%s)", lead.id, lead.source, lead.name)
    return lead


@api_router.get("/leads/stats", response_model=LeadStats)
async def lead_stats():
    total = await db.leads.count_documents({})
    by_source: Dict[str, int] = {}
    by_status: Dict[str, int] = {}
    async for row in db.leads.aggregate([{"$group": {"_id": "$source", "n": {"$sum": 1}}}]):
        by_source[row["_id"] or "unknown"] = row["n"]
    async for row in db.leads.aggregate([{"$group": {"_id": "$status", "n": {"$sum": 1}}}]):
        by_status[row["_id"] or "unknown"] = row["n"]
    return LeadStats(total=total, bySource=by_source, byStatus=by_status)


@api_router.get("/leads", response_model=List[Lead])
async def list_leads(
    source: Optional[LeadSource] = None,
    status: Optional[LeadStatus] = None,
    limit: int = Query(default=100, ge=1, le=500),
):
    query: Dict[str, Any] = {}
    if source:
        query["source"] = source
    if status:
        query["status"] = status
    rows = await db.leads.find(query, {"_id": 0}).sort("createdAt", -1).to_list(limit)
    return rows


@api_router.get("/leads/{lead_id}", response_model=Lead)
async def get_lead(lead_id: str):
    row = await db.leads.find_one({"id": lead_id}, {"_id": 0})
    if not row:
        raise HTTPException(status_code=404, detail="Lead not found")
    return row


@api_router.patch("/leads/{lead_id}", response_model=Lead)
async def update_lead(lead_id: str, payload: LeadUpdate):
    updates = {k: v for k, v in payload.model_dump().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="Nothing to update")
    updates["updatedAt"] = datetime.now(timezone.utc).isoformat()
    result = await db.leads.find_one_and_update(
        {"id": lead_id}, {"$set": updates}, projection={"_id": 0}, return_document=True
    )
    if not result:
        raise HTTPException(status_code=404, detail="Lead not found")
    return result


@api_router.delete("/leads/{lead_id}", status_code=204)
async def delete_lead(lead_id: str):
    result = await db.leads.delete_one({"id": lead_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return None

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()