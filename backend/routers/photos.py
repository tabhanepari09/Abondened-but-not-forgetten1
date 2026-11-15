from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from models import LivePhoto
from data.photos import LIVE_PHOTOS_DATA

router = APIRouter(prefix="/api/photos", tags=["photos"])

@router.get("", response_model=List[LivePhoto])
def get_photos(
    planet: Optional[str] = Query(default=None, description="Filter by celestial world: 'moon' or 'mars'")
):
    if isinstance(planet, str) and planet:
        return [p for p in LIVE_PHOTOS_DATA if p["planet"].lower() == planet.lower()]
    return LIVE_PHOTOS_DATA

@router.get("/{photo_id}", response_model=LivePhoto)
def get_photo(photo_id: str):
    for p in LIVE_PHOTOS_DATA:
        if p["id"].lower() == photo_id.lower():
            return p
    raise HTTPException(status_code=404, detail=f"Live Photo with ID '{photo_id}' not found")
