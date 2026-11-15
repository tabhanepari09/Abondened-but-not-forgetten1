# After the Footprints — FastAPI Space Heritage Backend

RESTful backend service powering **"After the Footprints: An Interactive 3D Space Heritage Archive"** (NASA Hackathon theme).

---

## 🛰️ Architecture & Capabilities

The backend is built with **FastAPI**, **Uvicorn**, and **Pydantic v2**, providing high-performance asynchronous REST endpoints with automated OpenAPI schemas, verified NASA historical telemetry, and real-time Deep Space Network (DSN) carrier lock simulations.

### Key Subsystems:
1. **Artifacts Registry (`/api/artifacts`)**: Full inventory of documented human and robotic lunar/martian hardware (Apollo 11 Eagle, Surveyor 3, Lunar Rover LRV-001, Sojourner, Spirit, Opportunity) with verified coordinates, surface duration, historical significance, and 3D hotspots.
2. **Planetary Profiles (`/api/planets`)**: Astronomical and geophysical data for Earth, the Moon, and Mars.
3. **Live Reconnaissance Gallery (`/api/photos`)**: Direct access to high-resolution orbital reconnaissance imagery (including the user-provided live JAXA/NASA SELENE lunar imagery and Mars Phobos orbital tidal survey).
4. **Historical Timeline (`/api/timeline`)**: Chronological archive of extraterrestrial exploration milestones from 1967 to present.
5. **Mission Control Quiz & Evaluation Engine (`/api/quiz`)**: Automated server-side grading and rating system for the Space Heritage Knowledge Check.
6. **Live Telemetry & Ephemeris (`/api/telemetry/live`)**: Dynamic real-time calculation of DSN tracking stations (Goldstone, Madrid, Canberra), radio frequency, signal dBm, and light-time delay (e.g. 1.28s Moon, ~12.5m Mars).

---

## 🚀 Quick Start

### 1. Launch with Batch Script (Windows)
Double-click `start_backend.bat` in the project root, or execute:
```cmd
start_backend.bat
```

### 2. Launch with Python
```bash
# Navigate to backend directory or run from root:
python backend/run_server.py
```

### 3. Launch with Uvicorn CLI
```bash
cd backend
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

---

## 📑 Interactive API Documentation

When the server is running, visit:
- **Interactive Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc Interactive Reference**: [http://localhost:8000/redoc](http://localhost:8000/redoc)
- **Root Health Check**: [http://localhost:8000/health](http://localhost:8000/health)

---

## 📡 API Endpoints Summary

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API Root Metadata & Mission Statement |
| `GET` | `/health` | Subsystem Health Status Check |
| `GET` | `/api/artifacts` | List all 6 verified artifacts (filters: `planet`, `search`, `status`) |
| `GET` | `/api/artifacts/{id}` | Detailed artifact dossier by ID |
| `GET` | `/api/artifacts/{id}/hotspots` | 3D inspection hotspots for an artifact |
| `GET` | `/api/planets` | Astronomical specifications for Earth, Moon, Mars |
| `GET` | `/api/planets/{id}` | Individual planet profile |
| `GET` | `/api/photos` | High-definition live reconnaissance gallery |
| `GET` | `/api/timeline` | Space heritage mission timeline events |
| `GET` | `/api/quiz` | Space Heritage Knowledge Check question bank |
| `POST` | `/api/quiz/evaluate` | Evaluates user answers and returns certified rating |
| `GET` | `/api/telemetry/live` | Dynamic real-time Deep Space Network tracking metrics |
| `GET` | `/api/telemetry/status` | Network & archive link status |

---

## 🛡️ Frontend Integration

The React + Vite frontend is configured to automatically route `/api/*` requests to `http://localhost:8000` via the Vite development server proxy (`vite.config.ts`).
In addition, `src/services/api.ts` features autonomous resilience: if the backend is temporarily offline, the frontend seamlessly falls back to its local cached registry so that the user experience is never interrupted.
