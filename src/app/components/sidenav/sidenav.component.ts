import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { LocacionComponent } from '../locacion/locacion.component';
import { NotificacionComponent } from '../notificacion/notificacion.component';
import { BusquedaComponent } from '../ruta/busqueda.component';
import { BusquedaNvComponent } from '../ruta/busquedanv/busquedanv.component';
import { CrearRutaComponent } from 'src/app/crear-ruta/crear-ruta.component';

/** @title Responsive sidenav */
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})

export class SidenavResponsiveExample implements OnDestroy {
  mobileQuery: MediaQueryList;
  usuarioLogueado: boolean = false;

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