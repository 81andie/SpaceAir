import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { FlightData, States } from '../interfaces/states.interface';

@Injectable({providedIn: 'root'})

export class flightService {

  private apiUrl="https://opensky-network.org/api//states/all/";
  private filteredFlightsSubject = new BehaviorSubject<FlightData[]>([]);
 filteredFlights$ = this.filteredFlightsSubject.asObservable();

 private selectedFlightSource = new BehaviorSubject<FlightData | null>(null);
  selectedFlight$ = this.selectedFlightSource.asObservable();


  //private apiUrl="http://localhost:3000/states";
  //private apiUrl1="http://localhost:3000/flights";

  private selectedState: string | null = null;
  constructor(private http: HttpClient) { }

  getStates():Observable<States>{
    return this.http.get<States>(this.apiUrl)
  }

  setSelectedState(state: string) {
    this.selectedState = state; // Simplemente almacenamos el estado
  }

  getSelectedState(): string | null {
    return this.selectedState; // Retornamos el estado almacenado
  }

  getFlights(): Observable<FlightData[]>{

    return this.http.get<any>(this.apiUrl).pipe(
      map(data => data.states.map((state: any[]) => ({
        icao: state[0],
        callsign: state[1],
        origin_country: state[2],
        timePosition: state[3],
        latitude: state[6],  // Latitud
        longitude: state[5], // Longitud
        speed: state[9],     // Velocidad
        heading: state[10],
        category:state[17] // Dirección
      })))
    )
  }


  updateFilteredFlights(flights: FlightData[]) {
    this.filteredFlightsSubject.next(flights);
  }


  selectFlight(flight: FlightData) {
    this.selectedFlightSource.next(flight);
  }

}
