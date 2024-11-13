import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { flightService } from '../../services/flight.service';
import { FlightData, StateData, States } from '../../interfaces/states.interface';
 import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'vuelos-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})


export class NavbarComponent implements OnInit {


  public flightData: FlightData[] = [];

  public statesData: StateData[] = [];
  public countries: string[] = [];
  activeLang: string = 'ca';
  translatedCountries: any = {};
  languages = ['ca', 'en', 'es', 'fr', 'de', 'ru', 'zh'];

  // Solo declara la variable aquí
  public myForm: FormGroup = this.fb.group({

    state: ['', Validators.required],
    language: [this.activeLang]

  })


  constructor(
    private fb: FormBuilder,
    private stateService: flightService,
    private translocoService: TranslocoService
  ) { }

  ngOnInit(): void {
    this.onloadStates();
    this.onStateChange();
    this.changeSelectTranslate();
  }

  onloadStates(): void {
    this.stateService.getStates().subscribe(
      (data: any) => {
       // console.log(data);
        // Aquí accedemos directamente al array de estados
        this.countries = Array.from(new Set(data.states.map((state:any) =>state[2])))
       // console.log(this.countries)
       this.translateCities()
      },
      (error)=>{
        console.error('error al obtener estados:', error)
      }
    );
  }

  translateCities(): void {
    this.countries.forEach(country => {
      const translatedName = this.translocoService.translate('cities.' + country);
      this.translatedCountries[country] = translatedName;
    });
  }

  onStateChange(): void {
    this.myForm.get('state')?.valueChanges.subscribe(selectedCountry => {
      if (selectedCountry) {
        // Llamamos a la API de vuelos cuando se selecciona un país
        this.stateService.getFlights().subscribe(flights => {
        //  console.log('Vuelos:', flights);

          // Asignamos los vuelos a `this.flightData`
          this.flightData = flights;  // Asegúrate de que `flights` es el array que esperas

          // Filtramos los vuelos según el país seleccionado
          const filteredFlights = this.flightData.filter((flight: FlightData) => flight.origin_country === selectedCountry);

         // console.log('Vuelos filtrados:', filteredFlights);

          this.stateService.updateFilteredFlights(filteredFlights);
          // Aquí puedes agregar la lógica para hacer algo con los vuelos filtrados, como mostrarlos en el mapa
        });
      }
    });
  }

  changeSelectTranslate():void{
    this.myForm.get('language')?.valueChanges.subscribe(lang => {
      console.log('Idioma cambiado a:', lang);
      this.translocoService.setActiveLang(lang);  // Cambia el idioma activo con Transloco
      this.translateCities();
    });
  }

  changeLanguage(lang: string): void {
    this.translocoService.setActiveLang(lang);  // Cambia el idioma activo con Transloco
  }



}






