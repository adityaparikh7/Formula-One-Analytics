import React from 'react';
import { Trophy, Timer, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Race } from '../../types/f1';

interface Props {
  race: Race;
}

export const RaceResultCard: React.FC<Props> = ({ race }) => {
  return (
    <Link
      to={`/race/${race.id}`}
      className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">Round {race.id} - {race.name}</h3>
        <span className="text-gray-500">{race.date}</span>
      </div>
      <div className="text-sm text-gray-600 mb-2">{race.circuit}</div>
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Trophy size={16} className="text-yellow-500" />
            <span>{race.winner}</span>
          </div>
          {race.hasSprint && (
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-orange-500" />
              <span>{race.sprintWinner}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Timer size={16} className="text-purple-500" />
          <span>{race.fastestLap}</span>
        </div>
      </div>
    </Link>
  );
};