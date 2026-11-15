from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class Coordinates(BaseModel):
    lat: float
    lng: float
    latDisplay: str
    lngDisplay: str
    siteName: str
    region: str

class Hotspot(BaseModel):
    id: str
    position: List[float]
    title: str
    description: str

class ArtifactImage(BaseModel):
    url: str
    caption: str
    credit: str

class ArtifactReference(BaseModel):
    title: str
    url: str
    organization: str

class Specs(BaseModel):
    massKg: Any
    dimensions: str
    powerSource: str
    communication: str

class Artifact(BaseModel):
    id: str
    name: str
    shortName: str
    mission: str
    operator: str
    country: str
    planet: str
    launchDate: str
    landingDate: str
    lastContactDate: Optional[str] = None
    operationalDuration: str
    coordinates: Coordinates
    originalObjective: str
    whatItAccomplished: List[str]
    scientificContributions: List[str]
    fateAndCondition: str
    currentStatus: str
    statusCertainty: str
    historicalSignificance: str
    interestingFacts: List[str]
    specs: Specs
    hotspots: List[Hotspot]
    images: List[ArtifactImage]
    references: List[ArtifactReference]

class PlanetInfo(BaseModel):
    id: str
    name: str
    subtitle: str
    type: str
    diameterKm: str
    distanceFromSun: str
    surfaceGravity: str
    surfaceTemp: str
    atmosphere: str
    dayLength: str
    artifactsCount: int
    description: str
    colorAccent: str
    colorHex: str

class LivePhoto(BaseModel):
    id: str
    title: str
    subtitle: str
    planet: str
    imageSrc: str
    credit: str
    date: str
    location: str
    description: str
    sensor: Optional[str] = None
    telemetry: Optional[Dict[str, str]] = None

class TimelineItem(BaseModel):
    id: str
    year: int
    exactDate: str
    title: str
    mission: str
    planet: str
    operator: str
    category: str
    description: str
    artifactId: Optional[str] = None
    significance: str

class QuizQuestion(BaseModel):
    id: int
    question: str
    options: List[str]
    correctIndex: int
    explanation: str
    missionRef: str
    verifiedSource: str

class AnswerSubmission(BaseModel):
    questionId: int
    selectedIndex: int

class QuizSubmission(BaseModel):
    answers: List[AnswerSubmission]

class AnswerEvaluation(BaseModel):
    questionId: int
    selectedIndex: int
    correctIndex: int
    isCorrect: bool
    explanation: str
    missionRef: str

class QuizEvaluationResult(BaseModel):
    score: int
    total: int
    percentage: float
    evaluations: List[AnswerEvaluation]
    rating: str

class LiveTelemetry(BaseModel):
    timestampUtc: str
    carrierLock: bool
    dsnStation: str
    downlinkBand: str
    frequencyGhz: float
    signalStrengthDbm: float
    lunarDistanceKm: int
    marsDistanceKm: int
    lunarOneWayLightSeconds: float
    marsOneWayLightMinutes: float
