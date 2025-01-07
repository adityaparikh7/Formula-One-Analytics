import React from 'react';
import { QualifyingResult } from '../../types/f1';

interface Props {
  results: QualifyingResult[];
}

export const QualifyingResultsTable: React.FC<Props> = ({ results }) => {
  if (!results?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No qualifying results available
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Q1</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Q2</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Q3</th>
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
                {result.Q1 || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {result.Q2 || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {result.Q3 || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};