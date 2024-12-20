import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VuelosRoutingModule } from './vuelos-routing.module';
import { MapComponent } from './pages/map/map.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { TranslocoModule } from '@ngneat/transloco';


@NgModule({
  declarations: [
    MapComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    VuelosRoutingModule,
    ReactiveFormsModule,
    TranslocoModule


  ]
})
export class VuelosModule { }
