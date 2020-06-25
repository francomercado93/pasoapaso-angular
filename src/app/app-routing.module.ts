import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocacionComponent } from './components/locacion/locacion.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { BusquedaComponent } from './components/ruta/busqueda.component';
import { BusquedaNvComponent } from './components/ruta/busquedanv/busquedanv.component';
import { RutavidenteComponent } from './components/ruta/rutavidente/rutavidente.component';
import { SeguirrutaComponent } from './components/ruta/seguirruta/seguirruta.component';
import { CrearRutaComponent } from './crear-ruta/crear-ruta.component';
import { AdministrarLocacionesComponent } from './components/administrar-locaciones/administrar-locaciones.component';

const routes: Routes = [
  { path: '', component: BusquedaComponent },
  { path: 'app-busquedanv', component: BusquedaNvComponent },
  { path: 'administrar-locaciones', component: AdministrarLocacionesComponent },
  { path: 'crear-locacion', component: LocacionComponent },
  { path: 'app-notificacion', component: NotificacionComponent },
  { path: 'ruta/:id', component: SeguirrutaComponent },
  { path: 'app-rutavidente/:id', component: RutavidenteComponent },
  { path: 'crear-ruta', component: CrearRutaComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' }, // redirect to `BusquedaComponent`
  { path: '**', component: NotFoundComponent } // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
