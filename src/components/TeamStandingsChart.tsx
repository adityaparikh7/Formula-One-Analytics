import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Building2 } from 'lucide-react';
import { TeamStanding } from '../types/f1';

interface Props {
  standings: TeamStanding[];
}

export const TeamStandingsChart: React.FC<Props> = ({ standings }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Building2 className="text-indigo-500" />
        Constructor Standings
      </h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={standings}>
            <XAxis dataKey="team" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="points" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};