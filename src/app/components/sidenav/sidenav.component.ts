import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { LocacionComponent } from '../locacion/locacion.component';
import { NotificacionComponent } from '../notificacion/notificacion.component';
import { BusquedaComponent } from '../ruta/busqueda.component';
import { BusquedaNvComponent } from '../ruta/busquedanv/busquedanv.component';

/** @title Responsive sidenav */
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})

export class SidenavResponsiveExample implements OnDestroy {
  mobileQuery: MediaQueryList;

  menuItems = [
    { path: '', component: BusquedaComponent, label: 'Buscar Ruta' },
    { path: 'app-locacion', component: LocacionComponent, label: 'Iniciar Sesion' },
    { path: 'app-notificacion', component: NotificacionComponent, label: 'Registrarse' },
    { path: 'app-busquedanv', component: BusquedaNvComponent, label: 'Buscar Ruta No Vidente' },
  ];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}