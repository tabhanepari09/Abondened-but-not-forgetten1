from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from models import Artifact, Hotspot
from data.artifacts import ARTIFACTS_DATA

router = APIRouter(prefix="/api/artifacts", tags=["artifacts"])

@router.get("", response_model=List[Artifact])
def get_artifacts(
    planet: Optional[str] = Query(None, description="Filter by celestial world: 'moon' or 'mars'"),
    search: Optional[str] = Query(None, description="Search query for artifact name or mission"),
    status: Optional[str] = Query(None, description="Filter by status (e.g. 'Preserved', 'Dormant')")
):
    results = ARTIFACTS_DATA
    if planet:
        results = [a for a in results if a["planet"].lower() == planet.lower()]
    if search:
        q = search.lower()
        results = [
            a for a in results
            if q in a["name"].lower() or q in a["mission"].lower() or q in a["coordinates"]["siteName"].lower()
        ]
    if status:
        results = [a for a in results if status.lower() in a["currentStatus"].lower()]
    return results

@router.get("/{artifact_id}", response_model=Artifact)
def get_artifact(artifact_id: str):
    for a in ARTIFACTS_DATA:
        if a["id"].lower() == artifact_id.lower():
            return a
    raise HTTPException(status_code=404, detail=f"Artifact with ID '{artifact_id}' not found in registry")

@router.get("/{artifact_id}/hotspots", response_model=List[Hotspot])
def get_artifact_hotspots(artifact_id: str):
    for a in ARTIFACTS_DATA:
        if a["id"].lower() == artifact_id.lower():
            return a["hotspots"]
    raise HTTPException(status_code=404, detail=f"Artifact with ID '{artifact_id}' not found")
