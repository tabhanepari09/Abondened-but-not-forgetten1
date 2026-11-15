from fastapi import APIRouter
from datetime import datetime, timezone
import random
import math
from models import LiveTelemetry

router = APIRouter(prefix="/api/telemetry", tags=["telemetry"])

# Known Deep Space Network stations
DSN_STATIONS = [
    "Goldstone DSS-14 (California, 70m)",
    "Madrid DSS-63 (Spain, 70m)",
    "Canberra DSS-43 (Australia, 70m)",
    "Goldstone DSS-25 (Beam Waveguide, 34m)"
]

@router.get("/live", response_model=LiveTelemetry)
def get_live_telemetry():
    now = datetime.now(timezone.utc)
    seconds_in_day = now.hour * 3600 + now.minute * 60 + now.second
    
    # Select active DSN station based on Earth rotation
    station_index = (now.hour // 6) % len(DSN_STATIONS)
    active_station = DSN_STATIONS[station_index]
    
    # Slight dynamic signal fluctuation simulating ionospheric & tropospheric variance
    jitter = math.sin(seconds_in_day / 30.0) * 1.8 + (random.random() - 0.5) * 0.4
    signal_dbm = round(-128.4 + jitter, 2)
    
    # Approximate ephemeris distances
    lunar_dist = 384400 + int(math.sin(seconds_in_day / 500.0) * 2000)
    mars_dist = 225000000 + int(math.sin(seconds_in_day / 86400.0) * 500000)
    
    # Speed of light = ~299,792 km/s
    lunar_delay = round(lunar_dist / 299792.458, 2)
    mars_delay_min = round((mars_dist / 299792.458) / 60.0, 2)
    
    return LiveTelemetry(
        timestampUtc=now.isoformat(),
        carrierLock=True,
        dsnStation=active_station,
        downlinkBand="X-Band / Ka-Band Multi-Carrier",
        frequencyGhz=8.4215,
        signalStrengthDbm=signal_dbm,
        lunarDistanceKm=lunar_dist,
        marsDistanceKm=mars_dist,
        lunarOneWayLightSeconds=lunar_delay,
        marsOneWayLightMinutes=mars_delay_min
    )

@router.get("/status")
def get_telemetry_status():
    return {
        "status": "OPERATIONAL",
        "archiveSystem": "ONLINE",
        "deepSpaceNetwork": "LOCK_ACQUIRED",
        "orbitalSensors": ["LRO", "MRO", "SELENE-KAGUYA", "ODYSSEY"],
        "artifactsTracked": 6,
        "lunarSector": "MONITORED",
        "marsSector": "MONITORED"
    }
