import React from 'react';
import { CalendarRange } from 'lucide-react';

interface Props {
  selectedSeason: number;
  onSeasonChange: (season: number) => void;
}

export const SeasonSelector: React.FC<Props> = ({ selectedSeason, onSeasonChange }) => {
  // F1 seasons from 1950 to current year
  const seasons = Array.from(
    { length: new Date().getFullYear() - 1949 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <CalendarRange className="text-indigo-500" />
        <h2 className="text-xl font-semibold">Select Season</h2>
      </div>
      <select
        value={selectedSeason}
        onChange={(e) => onSeasonChange(Number(e.target.value))}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        {seasons.map((year) => (
          <option key={year} value={year}>
            {year} Season
          </option>
        ))}
      </select>
    </div>
  );
};