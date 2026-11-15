from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from models import TimelineItem
from data.timeline import TIMELINE_DATA

router = APIRouter(prefix="/api/timeline", tags=["timeline"])

@router.get("", response_model=List[TimelineItem])
def get_timeline(
    planet: Optional[str] = Query(default=None, description="Filter by celestial world: 'moon' or 'mars'"),
    artifact_id: Optional[str] = Query(default=None, description="Filter by artifact ID")
):
    results = TIMELINE_DATA
    if isinstance(planet, str) and planet:
        results = [t for t in results if t.get("planet", "").lower() == planet.lower()]
    if isinstance(artifact_id, str) and artifact_id:
        results = [t for t in results if t.get("artifactId", "").lower() == artifact_id.lower()]
    return results

@router.get("/{item_id}", response_model=TimelineItem)
def get_timeline_item(item_id: str):
    for t in TIMELINE_DATA:
        if t["id"].lower() == item_id.lower():
            return t
    raise HTTPException(status_code=404, detail=f"Timeline event with ID '{item_id}' not found")
