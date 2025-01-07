export interface Driver {
  id: string;
  name: string;
  team: string;
  points: number;
  wins: number;
  podiums: number;
}

export interface Race {
  id: string;
  name: string;
  circuit: string;
  date: string;
  winner: string;
  fastestLap: string;
  hasSprint: boolean;
  sprintWinner?: string;
}

export interface TeamStanding {
  team: string;
  points: number;
  wins: number;
}

export interface RaceResult {
  position: string;
  number: string;
  driver: {
    id: string;
    name: string;
    nationality: string;
  };
  constructor: {
    id: string;
    name: string;
    nationality: string;
  };
  grid: string;
  laps: string;
  status: string;
  time?: string;
  fastestLap?: {
    rank: string;
    lap: string;
    time: string;
    averageSpeed: {
      units: string;
      speed: string;
    };
  };
  points: string;
}

export interface SprintResult extends RaceResult {
  sprintPoints: string;
}

export interface QualifyingResult {
  position: string;
  number: string;
  driver: {
    id: string;
    name: string;
    nationality: string;
  };
  constructor: {
    id: string;
    name: string;
  };
  Q1?: string;
  Q2?: string;
  Q3?: string;
}

export interface DetailedRace extends Race {
  results: RaceResult[];
  sprintResults?: SprintResult[];
  qualifying: QualifyingResult[];
  circuit: {
    id: string;
    name: string;
    location: string;
    country: string;
  };
}