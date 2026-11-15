import os
import sys
from pathlib import Path

# Ensure backend root directory is in sys.path
backend_dir = Path(__file__).resolve().parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from routers.artifacts import router as artifacts_router
from routers.planets import router as planets_router
from routers.photos import router as photos_router
from routers.timeline import router as timeline_router
from routers.quiz import router as quiz_router
from routers.telemetry import router as telemetry_router

app = FastAPI(
    title="After the Footprints - Space Heritage Archive API",
    description="Backend API powering the interactive 3D digital archive of lunar and martian exploration artifacts.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount public images if directory exists
public_images_dir = backend_dir.parent / "public" / "images"
if public_images_dir.exists():
    app.mount("/images", StaticFiles(directory=str(public_images_dir)), name="images")

# Register API Routers
app.include_router(artifacts_router)
app.include_router(planets_router)
app.include_router(photos_router)
app.include_router(timeline_router)
app.include_router(quiz_router)
app.include_router(telemetry_router)

@app.get("/", tags=["root"])
def read_root():
    return {
        "mission": "After the Footprints",
        "subtitle": "Interactive 3D Space Heritage Archive",
        "quote": "The mission may end, but its footprint remains.",
        "status": "OPERATIONAL",
        "documentation": "/docs",
        "endpoints": [
            "/api/artifacts",
            "/api/artifacts/{id}",
            "/api/artifacts/{id}/hotspots",
            "/api/planets",
            "/api/planets/{id}",
            "/api/photos",
            "/api/timeline",
            "/api/quiz",
            "/api/quiz/evaluate",
            "/api/telemetry/live",
            "/api/telemetry/status"
        ]
    }

@app.get("/health", tags=["system"])
def health_check():
    return {
        "status": "healthy",
        "service": "after-the-footprints-backend",
        "subsystems": {
            "archiveRegistry": "nominal",
            "telemetryUplink": "connected",
            "deepSpaceNetwork": "tracking"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
