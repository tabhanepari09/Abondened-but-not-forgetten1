import { Artifact, PlanetInfo, TimelineItem, QuizQuestion, LiveTelemetry, QuizEvaluationResult, Hotspot } from '../types';
import { artifactsData } from '../data/artifacts';
import { planetsData } from '../data/missions';
import { livePhotosCollection, LivePhoto } from '../data/livePhotos';
import { timelineData } from '../data/timeline';
import { quizQuestions } from '../data/quiz';

const API_BASE = '/api';

class ApiService {
  private isOnline: boolean | null = null;

  /**
   * Check if the FastAPI backend is reachable
   */
  async checkBackendStatus(): Promise<{ online: boolean; info?: any }> {
    try {
      const res = await fetch(`${API_BASE}/telemetry/status`, { method: 'GET', signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        const data = await res.json();
        this.isOnline = true;
        return { online: true, info: data };
      }
    } catch (e) {
      this.isOnline = false;
    }
    return { online: false };
  }

  getBackendOnline(): boolean | null {
    return this.isOnline;
  }

  /**
   * Fetch all artifacts with optional filters
   */
  async getArtifacts(planet?: 'moon' | 'mars', search?: string): Promise<Artifact[]> {
    try {
      const params = new URLSearchParams();
      if (planet) params.append('planet', planet);
      if (search) params.append('search', search);

      const url = `${API_BASE}/artifacts${params.toString() ? '?' + params.toString() : ''}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        this.isOnline = true;
        return await res.json();
      }
    } catch {
      this.isOnline = false;
    }

    // Fallback to local data
    let results = [...artifactsData];
    if (planet) {
      results = results.filter((a) => a.planet === planet);
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.mission.toLowerCase().includes(q) ||
          a.coordinates.siteName.toLowerCase().includes(q)
      );
    }
    return results;
  }

  /**
   * Fetch a single artifact by ID
   */
  async getArtifactById(id: string): Promise<Artifact | undefined> {
    try {
      const res = await fetch(`${API_BASE}/artifacts/${id}`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        this.isOnline = true;
        return await res.json();
      }
    } catch {
      this.isOnline = false;
    }

    return artifactsData.find((a) => a.id.toLowerCase() === id.toLowerCase());
  }

  /**
   * Fetch hotspots for an artifact
   */
  async getArtifactHotspots(id: string): Promise<Hotspot[]> {
    try {
      const res = await fetch(`${API_BASE}/artifacts/${id}/hotspots`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        this.isOnline = true;
        return await res.json();
      }
    } catch {
      this.isOnline = false;
    }

    const artifact = artifactsData.find((a) => a.id.toLowerCase() === id.toLowerCase());
    return artifact ? artifact.hotspots : [];
  }

  /**
   * Fetch planets list
   */
  async getPlanets(): Promise<PlanetInfo[]> {
    try {
      const res = await fetch(`${API_BASE}/planets`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        this.isOnline = true;
        return await res.json();
      }
    } catch {
      this.isOnline = false;
    }

    return Object.values(planetsData);
  }

  /**
   * Fetch single planet info
   */
  async getPlanetById(planetId: string): Promise<PlanetInfo | undefined> {
    try {
      const res = await fetch(`${API_BASE}/planets/${planetId}`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        this.isOnline = true;
        return await res.json();
      }
    } catch {
      this.isOnline = false;
    }

    return planetsData[planetId as keyof typeof planetsData];
  }

  /**
   * Fetch Live Photos collection
   */
  async getLivePhotos(planet?: string): Promise<LivePhoto[]> {
    try {
      const url = planet ? `${API_BASE}/photos?planet=${encodeURIComponent(planet)}` : `${API_BASE}/photos`;
      const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        this.isOnline = true;
        return await res.json();
      }
    } catch {
      this.isOnline = false;
    }

    if (planet) {
      return livePhotosCollection.filter((p) => p.planet === planet);
    }
    return livePhotosCollection;
  }

  /**
   * Fetch Mission Timeline
   */
  async getTimeline(planet?: string, artifactId?: string): Promise<TimelineItem[]> {
    try {
      const params = new URLSearchParams();
      if (planet) params.append('planet', planet);
      if (artifactId) params.append('artifact_id', artifactId);

      const url = `${API_BASE}/timeline${params.toString() ? '?' + params.toString() : ''}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        this.isOnline = true;
        return await res.json();
      }
    } catch {
      this.isOnline = false;
    }

    let results = [...timelineData];
    if (planet) {
      results = results.filter((t) => t.planet === planet);
    }
    if (artifactId) {
      results = results.filter((t) => t.artifactId === artifactId);
    }
    return results;
  }

  /**
   * Fetch Quiz Questions
   */
  async getQuizQuestions(): Promise<QuizQuestion[]> {
    try {
      const res = await fetch(`${API_BASE}/quiz`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        this.isOnline = true;
        return await res.json();
      }
    } catch {
      this.isOnline = false;
    }

    return quizQuestions;
  }

  /**
   * Evaluate Quiz via FastAPI backend
   */
  async evaluateQuiz(answers: { questionId: number; selectedIndex: number }[]): Promise<QuizEvaluationResult> {
    try {
      const res = await fetch(`${API_BASE}/quiz/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
        signal: AbortSignal.timeout(4000),
      });
      if (res.ok) {
        this.isOnline = true;
        return await res.json();
      }
    } catch {
      this.isOnline = false;
    }

    // Local evaluation fallback
    let score = 0;
    const evaluations = answers.map((a) => {
      const q = quizQuestions.find((item) => item.id === a.questionId);
      const isCorrect = q ? a.selectedIndex === q.correctIndex : false;
      if (isCorrect) score += 1;
      return {
        questionId: a.questionId,
        selectedIndex: a.selectedIndex,
        correctIndex: q ? q.correctIndex : 0,
        isCorrect,
        explanation: q ? q.explanation : '',
        missionRef: q ? q.missionRef : '',
      };
    });

    const total = quizQuestions.length;
    const percentage = Math.round((score / total) * 100);
    let rating = 'TRAINEE ORBITAL SPECIALIST';
    if (percentage === 100) rating = 'FLIGHT DIRECTOR - PERFECT ARCHIVE ACCURACY';
    else if (percentage >= 75) rating = 'SENIOR PAYLOAD SPECIALIST - DISTINGUISHED';
    else if (percentage >= 50) rating = 'MISSION ARCHIVIST - CERTIFIED';

    return {
      score,
      total,
      percentage,
      evaluations,
      rating,
    };
  }

  /**
   * Fetch Live Telemetry from FastAPI
   */
  async getLiveTelemetry(): Promise<LiveTelemetry> {
    try {
      const res = await fetch(`${API_BASE}/telemetry/live`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        this.isOnline = true;
        return await res.json();
      }
    } catch {
      this.isOnline = false;
    }

    // Fallback computed values
    const now = new Date();
    return {
      timestampUtc: now.toISOString(),
      carrierLock: true,
      dsnStation: 'Canberra DSS-43 (Autonomous Cache)',
      downlinkBand: 'X-Band Standalone Emulation',
      frequencyGhz: 8.4215,
      signalStrengthDbm: -128.4,
      lunarDistanceKm: 384400,
      marsDistanceKm: 225000000,
      lunarOneWayLightSeconds: 1.28,
      marsOneWayLightMinutes: 12.51,
    };
  }
}

export const api = new ApiService();
