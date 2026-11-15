import sys
from pathlib import Path

# Add backend directory to path
backend_dir = Path(__file__).resolve().parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from main import app
import httpx

import asyncio

async def run_tests():
    print("Testing FastAPI endpoints using ASGITransport...")
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://testserver") as client:
        # Test Root
        res = await client.get("/")
        assert res.status_code == 200, f"Root failed: {res.status_code}"
        print("✓ GET / -> 200 OK | Mission:", res.json()["mission"])

        # Test Health
        res = await client.get("/health")
        assert res.status_code == 200
        print("✓ GET /health -> 200 OK | Subsystems:", res.json()["subsystems"])

        # Test Artifacts list
        res = await client.get("/api/artifacts")
        assert res.status_code == 200
        artifacts = res.json()
        assert len(artifacts) == 6
        print(f"✓ GET /api/artifacts -> 200 OK | {len(artifacts)} artifacts retrieved")

        # Test Single Artifact
        res = await client.get("/api/artifacts/apollo-11-lm")
        assert res.status_code == 200
        print(f"✓ GET /api/artifacts/apollo-11-lm -> 200 OK | {res.json()['name']}")

        # Test Artifact Hotspots
        res = await client.get("/api/artifacts/apollo-11-lm/hotspots")
        assert res.status_code == 200
        print(f"✓ GET /api/artifacts/apollo-11-lm/hotspots -> 200 OK | {len(res.json())} hotspots")

        # Test Planets
        res = await client.get("/api/planets")
        assert res.status_code == 200
        print(f"✓ GET /api/planets -> 200 OK | {len(res.json())} planets retrieved")

        # Test Photos
        res = client_photos = await client.get("/api/photos")
        assert client_photos.status_code == 200
        print(f"✓ GET /api/photos -> 200 OK | {len(client_photos.json())} photos retrieved")

        # Test Timeline
        res_timeline = await client.get("/api/timeline")
        assert res_timeline.status_code == 200
        print(f"✓ GET /api/timeline -> 200 OK | {len(res_timeline.json())} events retrieved")

        # Test Quiz Questions
        res_quiz = await client.get("/api/quiz")
        assert res_quiz.status_code == 200
        print(f"✓ GET /api/quiz -> 200 OK | {len(res_quiz.json())} questions retrieved")

        # Test Quiz Evaluation
        submission = {
            "answers": [
                {"questionId": 1, "selectedIndex": 1},
                {"questionId": 2, "selectedIndex": 2}
            ]
        }
        res_eval = await client.post("/api/quiz/evaluate", json=submission)
        assert res_eval.status_code == 200
        eval_data = res_eval.json()
        print(f"✓ POST /api/quiz/evaluate -> 200 OK | Score: {eval_data['score']}/{eval_data['total']} ({eval_data['percentage']}%)")

        # Test Live Telemetry
        res_telem = await client.get("/api/telemetry/live")
        assert res_telem.status_code == 200
        telem = res_telem.json()
        print(f"✓ GET /api/telemetry/live -> 200 OK | DSN: {telem['dsnStation']} ({telem['signalStrengthDbm']} dBm)")

        # Test Telemetry Status
        res_status = await client.get("/api/telemetry/status")
        assert res_status.status_code == 200
        print(f"✓ GET /api/telemetry/status -> 200 OK | Status: {res_status.json()['status']}")

    print("\n🎉 ALL FASTAPI BACKEND ENDPOINTS PASSED VERIFICATION!")

if __name__ == "__main__":
    asyncio.run(run_tests())
