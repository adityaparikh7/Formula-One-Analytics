import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TelemetryData } from '../types/telemetry';

interface Props {
  data: TelemetryData[];
  metrics: Array<'speed' | 'throttle' | 'brake' | 'rpm'>;
}

const metricColors = {
  speed: '#6366f1',
  throttle: '#22c55e',
  brake: '#ef4444',
  rpm: '#f59e0b',
};

export const TelemetryChart: React.FC<Props> = ({ data, metrics }) => {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" label={{ value: 'Time (s)', position: 'bottom' }} />
          <YAxis />
          <Tooltip />
          <Legend />
          {metrics.map((metric) => (
            <Line
              key={metric}
              type="monotone"
              dataKey={metric}
              stroke={metricColors[metric]}
              dot={false}
              name={metric.charAt(0).toUpperCase() + metric.slice(1)}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}