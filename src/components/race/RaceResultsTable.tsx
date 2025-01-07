import React from 'react';
import { RaceResult } from '../../types/f1';
import { cn } from '../../utils/cn';

interface Props {
  results: RaceResult[];
}

export const RaceResultsTable: React.FC<Props> = ({ results }) => {
  if (!results?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No race results available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pos</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Constructor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grid</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time/Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {results.map((result) => (
            <tr key={`${result.position}-${result.driver.id}`} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {result.position}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {result.number}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {result.driver.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {result.constructor.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {result.grid}
              </td>
              <td className={cn(
                "px-6 py-4 whitespace-nowrap text-sm",
                result.status === 'Finished' ? 'text-green-600' : 'text-red-600'
              )}>
                {result.time || result.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {result.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};