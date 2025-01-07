import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { DriverStandings } from '../components/DriverStandings';
import { RaceResults } from '../components/RaceResults';
import { TeamStandingsChart } from '../components/TeamStandingsChart';
import { SeasonSelector } from '../components/SeasonSelector';
import { useF1Data } from '../hooks/useF1Data';

export const Dashboard: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState(new Date().getFullYear());
  const { drivers, teams, races, loading, error } = useF1Data(selectedSeason);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{error}</p>
          <p className="text-sm mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SeasonSelector
        selectedSeason={selectedSeason}
        onSeasonChange={setSelectedSeason}
      />
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-indigo-600" size={48} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <DriverStandings drivers={drivers} />
            <TeamStandingsChart standings={teams} />
          </div>
          <div>
            <RaceResults races={races} />
          </div>
        </div>
      )}
    </main>
  );
};