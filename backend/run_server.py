"""
Convenient launcher for the FastAPI Space Heritage Archive Backend.
Run with: python backend/run_server.py
"""
import sys
import uvicorn
from pathlib import Path

# Add backend directory to sys.path
backend_dir = Path(__file__).resolve().parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

if __name__ == "__main__":
    print("\n" + "=" * 60)
    print("🚀 AFTER THE FOOTPRINTS - FASTAPI BACKEND SERVER")
    print("=" * 60)
    print("📡 Local API URL:     http://localhost:8000")
    print("📑 Swagger UI Docs:   http://localhost:8000/docs")
    print("📚 ReDoc API Docs:    http://localhost:8000/redoc")
    print("🛰️ Telemetry Stream:  http://localhost:8000/api/telemetry/live")
    print("=" * 60 + "\n")
    
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True, app_dir=str(backend_dir))
