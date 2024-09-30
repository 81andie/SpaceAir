
export interface StateData {
  isActive: boolean;
  value: number | null;
  name: string;
}

export interface States {
  time: number;
  states: StateData[];
}

export interface FlightData {// Ej: "UAL820"
  icao: number,
  origin_country: string;
  callsign: string
  time: number;
  latitude: number;
  longitude: number;
  speed: number, // Velocidad en nudos
  heading: number,

}





