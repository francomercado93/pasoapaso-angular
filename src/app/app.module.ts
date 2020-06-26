import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
//Flex-Layout
import { FlexLayoutModule } from '@angular/flex-layout';
//Reactive Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocacionComponent } from './components/locacion/locacion.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { BusquedaComponent } from './components/ruta/busqueda.component';
import { BusquedaNvComponent } from './components/ruta/busquedanv/busquedanv.component';
import { RutavidenteComponent } from './components/ruta/rutavidente/rutavidente.component';
import { SeguirrutaComponent } from './components/ruta/seguirruta/seguirruta.component';
import { SidenavResponsiveExample } from './components/sidenav/sidenav.component';
import { CrearRutaComponent } from './crear-ruta/crear-ruta.component';
//Material
import { Material } from './material.module';
import { AdministrarLocacionesComponent } from './components/administrar-locaciones/administrar-locaciones.component';
import { AdministrarRutasComponent } from './components/administrar-rutas/administrar-rutas.component';
import { ConfirmacionPublicarRutaComponent } from './components/confirmacion-publicar-ruta/confirmacion-publicar-ruta.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavResponsiveExample,
    LocacionComponent,
    NotificacionComponent,
    BusquedaComponent,
    NotFoundComponent,
    BusquedaNvComponent,
    SeguirrutaComponent,
    RutavidenteComponent,
    CrearRutaComponent,
    AdministrarLocacionesComponent,
    AdministrarRutasComponent,
    ConfirmacionPublicarRutaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Material
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
