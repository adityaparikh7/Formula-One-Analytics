import React from 'react';
import { Flag } from 'lucide-react';
import { Race } from '../types/f1';
import { RaceResultCard } from './race/RaceResultCard';
import { Pagination } from './Pagination';

interface Props {
  races: Race[];
}

const ITEMS_PER_PAGE = 10;

export const RaceResults: React.FC<Props> = ({ races }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(races.length / ITEMS_PER_PAGE);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [races.length]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentRaces = races.slice(startIndex, endIndex);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Flag className="text-blue-500" />
        Race Results ({races.length} races)
      </h2>
      <div className="space-y-4 mb-4">
        {currentRaces.map((race) => (
          <RaceResultCard key={race.id} race={race} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};