import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { BusquedaComponent } from './components/ruta/busqueda.component';
import { BusquedaNvComponent } from './components/ruta/busquedanv/busquedanv.component';
import { SeguirrutaComponent } from './components/ruta/seguirruta/seguirruta.component';
import { CrearRutaComponent } from './crear-ruta/crear-ruta.component';
import { LocacionComponent } from './components/locacion/locacion.component';


const routes: Routes = [
  { path: '', component: BusquedaComponent },
  { path: 'app-busquedanv', component: BusquedaNvComponent },
  { path: 'app-locacion', component: LocacionComponent },
  { path: 'app-notificacion', component: NotificacionComponent },
  { path: 'ruta/:id', component: SeguirrutaComponent },
  { path: 'crear-ruta', component: CrearRutaComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' }, // redirect to `BusquedaComponent`
  { path: '**', component: NotFoundComponent } // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
