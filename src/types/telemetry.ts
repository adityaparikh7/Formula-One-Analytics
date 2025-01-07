export interface TelemetryData {
  time: number;
  speed: number;
  throttle: number;
  brake: number;
  gear: number;
  rpm: number;
  drs: boolean;
}

export interface SessionData {
  sessionType: 'Practice' | 'Qualifying' | 'Race';
  trackName: string;
  date: string;
  weather: {
    trackTemp: number;
    airTemp: number;
    humidity: number;
  };
}

export interface DriverTelemetry {
  driverId: string;
  driverName: string;
  lapNumber: number;
  lapTime: string;
  data: TelemetryData[];
  session: SessionData;
}