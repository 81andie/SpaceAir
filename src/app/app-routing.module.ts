import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'map',
    loadChildren: () =>  import('./vuelos/vuelos.module').then(m =>m.VuelosModule )
  },

  {
    path: '**',
    redirectTo: 'map'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
