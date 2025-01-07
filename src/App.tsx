import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Dashboard } from './pages/Dashboard';
import { TelemetryPage } from './pages/TelemetryPage';
import { ComparisonPage } from './pages/ComparisonPage';
import { RaceDetailsPage } from './pages/RaceDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/telemetry" element={<TelemetryPage />} />
          <Route path="/comparison" element={<ComparisonPage />} />
          <Route path="/race/:round" element={<RaceDetailsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;