import sys
from pathlib import Path

# Add backend directory to path
backend_dir = Path(__file__).resolve().parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from routers.artifacts import get_artifacts, get_artifact, get_artifact_hotspots
from routers.planets import get_all_planets, get_planet
from routers.photos import get_photos, get_photo
from routers.timeline import get_timeline
from routers.quiz import get_quiz_questions, evaluate_quiz
from routers.telemetry import get_live_telemetry, get_telemetry_status
from models import QuizSubmission, AnswerSubmission

print("=" * 60)
print("VERIFYING FASTAPI ROUTER LOGIC & DATA MODELS")
print("=" * 60)

print("\n1. Testing Artifacts:")
arts = get_artifacts()
print(f"   ✓ Retrieved {len(arts)} artifacts. Sample: {arts[0]['name']}")
art = get_artifact("apollo-11-lm")
print(f"   ✓ Specific artifact: {art['name']} ({art['coordinates']['siteName']})")
hotspots = get_artifact_hotspots("apollo-11-lm")
print(f"   ✓ Hotspots count: {len(hotspots)}")

print("\n2. Testing Planets:")
planets = get_all_planets()
names = [p['name'] for p in planets]
print(f"   ✓ Retrieved {len(planets)} worlds: {names}")

print("\n3. Testing Photos:")
photos = get_photos()
print(f"   ✓ Retrieved {len(photos)} live space photos")
moon_photos = get_photos(planet="moon")
print(f"   ✓ Moon photos: {len(moon_photos)}")

print("\n4. Testing Timeline:")
timeline = get_timeline()
print(f"   ✓ Retrieved {len(timeline)} historical mission events")

print("\n5. Testing Quiz & Grading Engine:")
questions = get_quiz_questions()
print(f"   ✓ Retrieved {len(questions)} quiz questions")
sub = QuizSubmission(answers=[
    AnswerSubmission(questionId=1, selectedIndex=1),
    AnswerSubmission(questionId=2, selectedIndex=2)
])
eval_res = evaluate_quiz(sub)
print(f"   ✓ Evaluated quiz: score {eval_res.score}/{eval_res.total} ({eval_res.percentage}%) - {eval_res.rating}")

print("\n6. Testing Live Telemetry Stream:")
telem = get_live_telemetry()
print(f"   ✓ Active DSN Station: {telem.dsnStation}")
print(f"   ✓ Frequency: {telem.frequencyGhz} GHz, Signal: {telem.signalStrengthDbm} dBm")
print(f"   ✓ Lunar Delay: {telem.lunarOneWayLightSeconds}s | Mars Delay: {telem.marsOneWayLightMinutes}m")

print("\n7. Testing System Status:")
status = get_telemetry_status()
print(f"   ✓ System status: {status['status']} | Deep Space Network: {status['deepSpaceNetwork']}")

print("\n" + "=" * 60)
print("SUCCESS: ALL FASTAPI BACKEND SERVICES ARE OPERATIONAL!")
print("=" * 60)
