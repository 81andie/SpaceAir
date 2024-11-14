import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { flightService } from '../../services/flight.service';
import { FlightData } from '../../interfaces/states.interface';
import { TranslocoService } from '@jsverse/transloco';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  private flightInformationSubscription!: Subscription;

  public flightInformations: FlightData[] = [];

  public isSidebarVisible: boolean = true;
  selectedLang: string = 'ca';

  constructor(
    private stateService: flightService,
    private translocoService: TranslocoService,
  ) { }


  ngOnInit(): void {
    console.log('ngOnInit');
    this.informationFlights();
    this.setActiveLang(this.selectedLang);
  }


  informationFlights(): void {
    this.flightInformationSubscription = this.stateService.selectedFlight$.subscribe((information: FlightData | null) => {
      if (information) {
        this.flightInformations = [information];  // Convertir un solo objeto en array
      } else {
        this.flightInformations = [];  // Si no hay información, asignamos un array vacío
      }

      // Controlar la visibilidad del sidebar
     this.isSidebarVisible = this.flightInformations.length > 0;
    });

}
setActiveLang(lang: string): void {
  this.translocoService.setActiveLang(lang); // Cambia el idioma activo en Transloco
  this.selectedLang = lang;  // Actualiza el idioma seleccionado en la variable
}

// Función para cambiar el idioma al seleccionar desde el selector
onLanguageChange(event: any): void {
  const lang = event.target.value;
  this.setActiveLang(lang);
}

}
