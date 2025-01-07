import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Activity, Users } from 'lucide-react';

export const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="text-indigo-600" size={24} />
            <h1 className="text-xl font-bold text-gray-900">F1 Analytics</h1>
          </div>
          <div className="flex gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                isActive('/') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 size={20} />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/telemetry"
              className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                isActive('/telemetry') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Activity size={20} />
              <span>Telemetry</span>
            </Link>
            <Link
              to="/comparison"
              className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                isActive('/comparison') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users size={20} />
              <span>Compare</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}