import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocacionComponent } from './components/locacion/locacion.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';


const routes: Routes = [
  { path: 'app-locacion', component: LocacionComponent },
  { path: 'app-notificacion', component: NotificacionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
