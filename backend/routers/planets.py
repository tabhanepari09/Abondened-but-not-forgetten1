from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List
from models import PlanetInfo
from data.planets import PLANETS_DATA

router = APIRouter(prefix="/api/planets", tags=["planets"])

@router.get("", response_model=List[PlanetInfo])
def get_all_planets():
    return list(PLANETS_DATA.values())

@router.get("/{planet_id}", response_model=PlanetInfo)
def get_planet(planet_id: str):
    pid = planet_id.lower()
    if pid in PLANETS_DATA:
        return PLANETS_DATA[pid]
    raise HTTPException(status_code=404, detail=f"Planet with ID '{planet_id}' not recognized")
