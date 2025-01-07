import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { TelemetryChart } from '../components/TelemetryChart';
import { useF1Data } from '../hooks/useF1Data';

export const ComparisonPage: React.FC = () => {
  const { drivers, races, loading } = useF1Data();
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);
  const [selectedRace, setSelectedRace] = useState<string>('');
  const [selectedSession, setSelectedSession] = useState<string>('race');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin text-indigo-600">
          <Users size={48} />
        </div>
      </div>
    );
  }

  const handleDriverSelect = (driverId: string) => {
    setSelectedDrivers((prev) => {
      if (prev.includes(driverId)) {
        return prev.filter((id) => id !== driverId);
      }
      if (prev.length < 2) {
        return [...prev, driverId];
      }
      return prev;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Driver Comparison</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Drivers (max 2)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {drivers.map((driver) => (
                <button
                  key={driver.id}
                  onClick={() => handleDriverSelect(driver.id)}
                  className={`p-2 rounded-md text-left ${
                    selectedDrivers.includes(driver.id)
                      ? 'bg-indigo-100 text-indigo-700 border-indigo-300'
                      : 'bg-gray-50 text-gray-700 border-gray-200'
                  } border hover:bg-indigo-50`}
                >
                  {driver.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Race
              </label>
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
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Session
              </label>
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
          </div>
        </div>

        {selectedDrivers.length === 2 && selectedRace && (
          <div className="space-y-6">
            <TelemetryChart
              data={[]} // TODO: Add real telemetry data
              metrics={['speed', 'throttle']}
            />
          </div>
        )}
      </div>
    </div>
  );
}