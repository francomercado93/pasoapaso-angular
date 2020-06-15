import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocacionComponent } from './components/locacion/locacion.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { BusquedaComponent } from './components/ruta/busqueda.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BusquedanvComponent } from './components/ruta/busquedanv/busquedanv.component';


const routes: Routes = [
  { path: '', component: BusquedaComponent },
  { path: 'app-busquedanv', component: BusquedanvComponent },
  { path: 'app-locacion', component: LocacionComponent },
  { path: 'app-notificacion', component: NotificacionComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' }, // redirect to `BusquedaComponent`
  { path: '**', component: NotFoundComponent } // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
