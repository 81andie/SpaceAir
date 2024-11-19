import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { flightService } from '../../services/flight.service';
import { FlightData } from '../../interfaces/states.interface';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit, OnDestroy {

  private flightInformationSubscription!: Subscription;

  public flightInformations: FlightData[] = [];

  public isSidebarVisible: boolean = false;


  constructor(
    private stateService: flightService,


  ) { }


  ngOnInit(): void {
    console.log('ngOnInit');

    this.informationFlights();
    // Cargar las traducciones cuando el componente se inicialice

  }

  ngOnDestroy(): void {
    // Asegúrate de desuscribirte cuando el componente se destruya
    if (this.flightInformationSubscription) {
      this.flightInformationSubscription.unsubscribe();
    }

  }


  informationFlights(): void {
    this.flightInformationSubscription = this.stateService.selectedFlight$.subscribe((information: FlightData | null) => {
      if (information) {
        this.flightInformations = [information];  // Convertir un solo objeto en array
      } else {
        this.flightInformations = [];  // Si no hay información, asignamos un array vacío
      }

      // Controlar la visibilidad del sidebar
    // this.isSidebarVisible = this.flightInformations.length > 0;
    });

}






}
