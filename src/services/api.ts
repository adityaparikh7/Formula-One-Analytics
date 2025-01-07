import axios from 'axios';
import { RaceResult, QualifyingResult, DetailedRace, SprintResult } from '../types/f1';

const BASE_URL = 'https://ergast.com/api/f1';

export const ergastApi = axios.create({
  baseURL: BASE_URL,
  params: {
    limit: 1000,
  },
});

export const fetchDriverStandings = async (season: number) => {
  const response = await ergastApi.get(`/${season}/driverStandings.json`);
  return response.data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];
};

export const fetchConstructorStandings = async (season: number) => {
  const response = await ergastApi.get(`/${season}/constructorStandings.json`);
  return response.data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];
};

export const fetchSeasonRaces = async (season: number) => {
  const response = await ergastApi.get(`/${season}/results/1.json`);
  const totalRaces = parseInt(response.data.MRData.total);
  
  if (totalRaces > 1000) {
    const requests = [];
    const numberOfRequests = Math.ceil(totalRaces / 1000);
    
    for (let i = 0; i < numberOfRequests; i++) {
      const offset = i * 1000;
      requests.push(
        ergastApi.get(`/${season}/results/1.json`, {
          params: { offset, limit: 1000 }
        })
      );
    }
    
    const responses = await Promise.all(requests);
    return responses.flatMap(r => r.data.MRData.RaceTable.Races);
  }
  
  return response.data.MRData.RaceTable.Races || [];
};

export const fetchSprintResults = async (season: number, round: number): Promise<SprintResult[]> => {
  try {
    const response = await ergastApi.get(`/${season}/${round}/sprint.json`);
    const results = response.data.MRData.RaceTable.Races[0]?.SprintResults || [];
    
    return results.map((result: any) => ({
      position: result.position,
      number: result.number,
      driver: {
        id: result.Driver.driverId,
        name: `${result.Driver.givenName} ${result.Driver.familyName}`,
        nationality: result.Driver.nationality,
      },
      constructor: {
        id: result.Constructor.constructorId,
        name: result.Constructor.name,
        nationality: result.Constructor.nationality,
      },
      grid: result.grid,
      laps: result.laps,
      status: result.status,
      time: result.Time?.time,
      fastestLap: result.FastestLap ? {
        rank: result.FastestLap.rank,
        lap: result.FastestLap.lap,
        time: result.FastestLap.Time.time,
        averageSpeed: {
          units: result.FastestLap.AverageSpeed.units,
          speed: result.FastestLap.AverageSpeed.speed,
        },
      } : undefined,
      points: result.points,
      sprintPoints: result.points,
    }));
  } catch (error) {
    return [];
  }
};

export const fetchRaceResults = async (season: number, round: number): Promise<RaceResult[]> => {
  const response = await ergastApi.get(`/${season}/${round}/results.json`);
  const results = response.data.MRData.RaceTable.Races[0]?.Results || [];
  
  return results.map((result: any) => ({
    position: result.position,
    number: result.number,
    driver: {
      id: result.Driver.driverId,
      name: `${result.Driver.givenName} ${result.Driver.familyName}`,
      nationality: result.Driver.nationality,
    },
    constructor: {
      id: result.Constructor.constructorId,
      name: result.Constructor.name,
      nationality: result.Constructor.nationality,
    },
    grid: result.grid,
    laps: result.laps,
    status: result.status,
    time: result.Time?.time,
    fastestLap: result.FastestLap ? {
      rank: result.FastestLap.rank,
      lap: result.FastestLap.lap,
      time: result.FastestLap.Time.time,
      averageSpeed: {
        units: result.FastestLap.AverageSpeed.units,
        speed: result.FastestLap.AverageSpeed.speed,
      },
    } : undefined,
    points: result.points,
  }));
};

export const fetchQualifyingResults = async (season: number, round: number): Promise<QualifyingResult[]> => {
  const response = await ergastApi.get(`/${season}/${round}/qualifying.json`);
  const results = response.data.MRData.RaceTable.Races[0]?.QualifyingResults || [];
  
  return results.map((result: any) => ({
    position: result.position,
    number: result.number,
    driver: {
      id: result.Driver.driverId,
      name: `${result.Driver.givenName} ${result.Driver.familyName}`,
      nationality: result.Driver.nationality,
    },
    constructor: {
      id: result.Constructor.constructorId,
      name: result.Constructor.name,
    },
    Q1: result.Q1,
    Q2: result.Q2,
    Q3: result.Q3,
  }));
};

export const fetchRaceDetails = async (season: number, round: number): Promise<DetailedRace> => {
  const [raceResponse, resultsResponse, qualifyingResponse, sprintResponse] = await Promise.all([
    ergastApi.get(`/${season}/${round}.json`),
    fetchRaceResults(season, round),
    fetchQualifyingResults(season, round),
    fetchSprintResults(season, round),
  ]);

  const raceData = raceResponse.data.MRData.RaceTable.Races[0];
  
  if (!raceData) {
    throw new Error('Race not found');
  }

  const winner = resultsResponse[0];
  const fastestLap = resultsResponse.find(r => r.fastestLap)?.fastestLap?.time || 'N/A';
  const sprintWinner = sprintResponse[0]?.driver.name;

  return {
    id: raceData.round,
    name: raceData.raceName,
    circuit: raceData.Circuit.circuitName,
    date: new Date(raceData.date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    winner: winner ? winner.driver.name : 'TBD',
    fastestLap,
    hasSprint: sprintResponse.length > 0,
    sprintWinner,
    results: resultsResponse,
    sprintResults: sprintResponse.length > 0 ? sprintResponse : undefined,
    qualifying: qualifyingResponse,
    circuit: {
      id: raceData.Circuit.circuitId,
      name: raceData.Circuit.circuitName,
      location: raceData.Circuit.Location.locality,
      country: raceData.Circuit.Location.country,
    },
  };
};

export const fetchCurrentDriverStandings = () => fetchDriverStandings(new Date().getFullYear());
export const fetchCurrentConstructorStandings = () => fetchConstructorStandings(new Date().getFullYear());
export const fetchCurrentSeasonRaces = () => fetchSeasonRaces(new Date().getFullYear());