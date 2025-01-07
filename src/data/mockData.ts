import { Driver, Race, TeamStanding } from '../types/f1';

export const drivers: Driver[] = [
  { id: '1', name: 'Max Verstappen', team: 'Red Bull Racing', points: 575, wins: 19, podiums: 21 },
  { id: '2', name: 'Lewis Hamilton', team: 'Mercedes', points: 234, wins: 3, podiums: 12 },
  { id: '3', name: 'Sergio Perez', team: 'Red Bull Racing', points: 285, wins: 2, podiums: 9 },
  { id: '4', name: 'Charles Leclerc', team: 'Ferrari', points: 206, wins: 1, podiums: 6 },
];

export const races: Race[] = [
  { id: '1', name: 'Bahrain Grand Prix', circuit: 'Bahrain International Circuit', date: '2024-03-02', winner: 'Max Verstappen', fastestLap: '1:32.608' },
  { id: '2', name: 'Saudi Arabian Grand Prix', circuit: 'Jeddah Corniche Circuit', date: '2024-03-09', winner: 'Max Verstappen', fastestLap: '1:31.632' },
];

export const teamStandings: TeamStanding[] = [
  { team: 'Red Bull Racing', points: 860, wins: 21 },
  { team: 'Mercedes', points: 409, wins: 3 },
  { team: 'Ferrari', points: 406, wins: 1 },
];