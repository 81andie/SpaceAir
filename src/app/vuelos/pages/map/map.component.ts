import { Component, AfterViewInit } from '@angular/core';
import "ol/ol.css";
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM, { ATTRIBUTION } from 'ol/source/OSM';


import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { flightService } from '../../services/flight.service';
import { fromLonLat } from 'ol/proj';
import { FlightData } from '../../interfaces/states.interface';
import { Icon, Style } from 'ol/style';
import { Point } from 'ol/geom';
import { Subscription } from 'rxjs';



@Component({
  selector: 'vuelos-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',

})

export class MapComponent implements AfterViewInit {
  map!: Map;
  flightLayer!: VectorLayer<VectorSource>;
  private flightSubscription!: Subscription;
  public countries: string[] = [];



  constructor(private flightService: flightService) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.loadFlights();
    this.subscribeToFilteredFlights();


}




initMap():void{
  this.map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM(),


      }),
    ],

    view: new View({
      center:fromLonLat([0,0]),
      zoom: 2
    }),

  });


  this.flightLayer = new VectorLayer({
    source: new VectorSource(),
  });

  this.map.addLayer(this.flightLayer);

}



loadFlights(): void {
 this.flightSubscription = this.flightService.getFlights().subscribe((flights: FlightData[]) => {
    this.updateFlightLayer(flights);
    console.log(flights)
  });
}



subscribeToFilteredFlights(): void {
  this.flightSubscription = this.flightService.filteredFlights$.subscribe(filteredFlights => {
    if (filteredFlights.length > 0) {
      this.updateFlightLayer(filteredFlights); // Actualiza el mapa con los vuelos filtrados
    }
  });
}



updateFlightLayer(flights: FlightData[]): void {
  console.log(flights)
  const features = flights.map(flight => {

    const feature = new Feature({
      geometry: new Point(fromLonLat([flight.longitude, flight.latitude])),
    });

    feature.setStyle(new Style({
      image: new Icon({
        src: 'https://i.ibb.co/YWrftTp/air.png', // Cambia la ruta a tu ícono de avión
        scale: 0.05,
      }),
    }));

    feature.set('flightData', flight);

    return feature;
  });

  const source = this.flightLayer.getSource();

  if (this.flightLayer && source) {
    source.clear(); // Limpiar las capas anteriores
    source.addFeatures(features); // Agregar nuevas características
  }

  this.map.on('singleclick', (event) => {
    this.map.forEachFeatureAtPixel(event.pixel, (feature) => {
      if (feature) {
        const selectedFlight = feature.get('flightData'); // Obtener el vuelo desde la feature
        this.flightService.selectFlight(selectedFlight); // Envía el vuelo seleccionado al servicio
        console.log(selectedFlight);
      }
    });
  });

}



ngOnDestroy(): void {
  if (this.flightSubscription) {
    this.flightSubscription.unsubscribe(); // Desuscribirse para evitar fugas de memoria
  }
}


}
