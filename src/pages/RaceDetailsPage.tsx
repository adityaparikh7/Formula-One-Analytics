import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Flag, Trophy, Timer, Clock, MapPin, ChevronLeft, Zap } from 'lucide-react';
import { useRaceDetails } from '../hooks/useRaceDetails';
import { RaceResultsTable } from '../components/race/RaceResultsTable';
import { QualifyingResultsTable } from '../components/race/QualifyingResultsTable';
import { SprintResultsTable } from '../components/race/SprintResultsTable';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const RaceDetailsPage: React.FC = () => {
  const { season = new Date().getFullYear().toString(), round } = useParams();
  const navigate = useNavigate();
  const { raceDetails, loading, error } = useRaceDetails(Number(season), Number(round));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !raceDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 text-xl mb-4">{error || 'Race details not found'}</p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <ChevronLeft size={20} />
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ChevronLeft size={20} />
        Back to Dashboard
      </button>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Flag className="text-blue-500" />
            {raceDetails.name}
          </h1>
          <div className="text-gray-500">{raceDetails.date}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="text-gray-400" />
              <span>{raceDetails.circuit.name}, {raceDetails.circuit.location}, {raceDetails.circuit.country}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-500" />
              <span>Race Winner: {raceDetails.winner}</span>
            </div>
            {raceDetails.hasSprint && (
              <div className="flex items-center gap-2">
                <Zap className="text-orange-500" />
                <span>Sprint Winner: {raceDetails.sprintWinner}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Timer className="text-purple-500" />
              <span>Fastest Lap: {raceDetails.fastestLap}</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Flag className="text-blue-500" />
              Race Results
            </h2>
            <RaceResultsTable results={raceDetails.results} />
          </div>

          {raceDetails.hasSprint && (
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Zap className="text-orange-500" />
                Sprint Results
              </h2>
              <SprintResultsTable results={raceDetails.sprintResults || []} />
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Clock className="text-blue-500" />
              Qualifying Results
            </h2>
            <QualifyingResultsTable results={raceDetails.qualifying} />
          </div>
        </div>
      </div>
    </div>
  );
};