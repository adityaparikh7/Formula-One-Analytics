import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { TelemetryChart } from '../components/TelemetryChart';
import { useF1Data } from '../hooks/useF1Data';

export const TelemetryPage: React.FC = () => {
  const { drivers, races, loading } = useF1Data();
  const [selectedDriver, setSelectedDriver] = useState<string>('');
  const [selectedRace, setSelectedRace] = useState<string>('');
  const [selectedSession, setSelectedSession] = useState<string>('race');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin text-indigo-600">
          <Activity size={48} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Driver Telemetry Analysis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Driver</option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.name}
              </option>
            ))}
          </select>

          <select
            value={selectedRace}
            onChange={(e) => setSelectedRace(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Race</option>
            {races.map((race) => (
              <option key={race.id} value={race.id}>
                {race.name}
              </option>
            ))}
          </select>

          <select
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="practice">Practice</option>
            <option value="qualifying">Qualifying</option>
            <option value="race">Race</option>
          </select>
        </div>

        {selectedDriver && selectedRace && (
          <div className="space-y-6">
            <TelemetryChart
              data={[]} // TODO: Add real telemetry data
              metrics={['speed', 'throttle', 'brake', 'rpm']}
            />
          </div>
        )}
      </div>
    </div>
  );
}