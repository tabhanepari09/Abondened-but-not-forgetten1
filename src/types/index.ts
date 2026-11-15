export type PlanetId = 'earth' | 'moon' | 'mars';

export interface Hotspot {
  id: string;
  position: [number, number, number];
  title: string;
  description: string;
}

export interface ArtifactReference {
  title: string;
  url: string;
  organization: string;
}

export interface ArtifactImage {
  url: string;
  caption: string;
  credit: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
  latDisplay: string;
  lngDisplay: string;
  siteName: string;
  region: string;
}

export interface Artifact {
  id: string;
  name: string;
  shortName: string;
  mission: string;
  operator: string;
  country: string;
  planet: 'moon' | 'mars';
  launchDate: string;
  landingDate: string;
  lastContactDate?: string;
  operationalDuration: string;
  coordinates: Coordinates;
  originalObjective: string;
  whatItAccomplished: string[];
  scientificContributions: string[];
  fateAndCondition: string;
  currentStatus: 'Preserved / Intact Descent Stage' | 'Dormant / Surface Static' | 'Inactive / Silent' | 'Preserved In Situ';
  statusCertainty: 'Directly Imaged by LRO / MRO' | 'Confirmed Historical Coordinates' | 'In Situ Contact Confirmed';
  historicalSignificance: string;
  interestingFacts: string[];
  specs: {
    massKg: number | string;
    dimensions: string;
    powerSource: string;
    communication: string;
  };
  hotspots: Hotspot[];
  images: ArtifactImage[];
  references: ArtifactReference[];
}

export interface PlanetInfo {
  id: PlanetId;
  name: string;
  subtitle: string;
  type: string;
  diameterKm: string;
  distanceFromSun: string;
  surfaceGravity: string;
  surfaceTemp: string;
  atmosphere: string;
  dayLength: string;
  artifactsCount: number;
  description: string;
  colorAccent: string;
  colorHex: string;
}

export interface TimelineItem {
  id: string;
  year: number;
  exactDate: string;
  title: string;
  mission: string;
  planet: 'moon' | 'mars' | 'earth';
  operator: string;
  category: 'Landing' | 'Operation' | 'End of Mission' | 'Milestone';
  description: string;
  artifactId?: string;
  significance: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  missionRef: string;
  verifiedSource: string;
}

export interface LiveTelemetry {
  timestampUtc: string;
  carrierLock: boolean;
  dsnStation: string;
  downlinkBand: string;
  frequencyGhz: number;
  signalStrengthDbm: number;
  lunarDistanceKm: number;
  marsDistanceKm: number;
  lunarOneWayLightSeconds: number;
  marsOneWayLightMinutes: number;
}

export interface AnswerEvaluation {
  questionId: number;
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
  explanation: string;
  missionRef: string;
}

export interface QuizEvaluationResult {
  score: number;
  total: number;
  percentage: number;
  evaluations: AnswerEvaluation[];
  rating: string;
}

