import React from 'react';
import { Trophy, Medal, Flag } from 'lucide-react';
import { Driver } from '../types/f1';

interface Props {
  drivers: Driver[];
}

export const DriverStandings: React.FC<Props> = ({ drivers }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Trophy className="text-yellow-500" />
        Driver Standings
      </h2>
      <div className="space-y-4">
        {drivers.map((driver) => (
          <div
            key={driver.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="font-semibold">{driver.name}</span>
              <span className="text-gray-500">{driver.team}</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Trophy size={16} className="text-yellow-500" />
                <span>{driver.wins}</span>
              </div>
              {/* <div className="flex items-center gap-2">
                <Medal size={16} className="text-gray-400" />
                <span>{driver.podiums}</span>
              </div> */}
              <div className="flex items-center gap-2">
                <Flag size={16} className="text-blue-500" />
                <span className="font-bold">{driver.points}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};