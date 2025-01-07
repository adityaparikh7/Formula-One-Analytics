import { useState, useEffect } from 'react';
import { DetailedRace } from '../types/f1';
import { fetchRaceDetails } from '../services/api';

export const useRaceDetails = (season: number, round: number) => {
  const [raceDetails, setRaceDetails] = useState<DetailedRace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchRaceDetails(season, round);
        setRaceDetails(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch race details');
        console.error('Error fetching race details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (season && round) {
      fetchData();
    }
  }, [season, round]);

  return { raceDetails, loading, error };
};