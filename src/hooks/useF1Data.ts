import { useState, useEffect } from 'react';
import { Driver, Race, TeamStanding } from '../types/f1';
import {
  fetchDriverStandings,
  fetchConstructorStandings,
  fetchSeasonRaces,
} from '../services/api';
import {
  transformDriverStandings,
  transformConstructorStandings,
  transformRaces,
} from '../utils/transformers';

export const useF1Data = (season?: number) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [teams, setTeams] = useState<TeamStanding[]>([]);
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const selectedSeason = season || currentYear;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [driverData, constructorData, raceData] = await Promise.all([
          fetchDriverStandings(selectedSeason),
          fetchConstructorStandings(selectedSeason),
          fetchSeasonRaces(selectedSeason),
        ]);

        const transformedDrivers = transformDriverStandings(driverData);
        const transformedTeams = transformConstructorStandings(constructorData);
        const transformedRaces = await transformRaces(raceData);

        // Sort races by round number
        const sortedRaces = transformedRaces.sort((a, b) => 
          parseInt(a.id) - parseInt(b.id)
        );

        setDrivers(transformedDrivers);
        setTeams(transformedTeams);
        setRaces(sortedRaces);
        setError(null);
      } catch (err) {
        setError(`Failed to fetch F1 data for ${selectedSeason} season`);
        console.error('Error fetching F1 data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [season]);

  return { drivers, teams, races, loading, error };
};