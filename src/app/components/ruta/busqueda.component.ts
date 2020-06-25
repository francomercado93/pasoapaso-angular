import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Categoria } from 'src/app/domain/categoria';
import { Locacion } from 'src/app/domain/locacion';
import { Ruta } from 'src/app/domain/ruta';
import { LocacionService } from 'src/app/services/locacion.service';
import { RutaService } from 'src/app/services/ruta.service';
import { Router } from '@angular/router';

@Component({
  selector: '',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  formGroup: FormGroup;
  titleAlert: string = 'Campo Obligatorio';
  post: any = '';

  //categoriaSeleccionada: Categoria
  //locacionSeleccionada: Locacion
  rutaSeleccionada: Ruta
  //categorias: Categoria[] = new Array
  cargaLocaciones: Locacion[] = new Array
  locaciones: Observable<Locacion[]>;
  cargaRutas: Ruta[] = new Array
  rutas: Observable<Ruta[]>;
  test: Subscription

  constructor(private locacionService: LocacionService, private rutaService: RutaService, private route: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.cargarLocacion();
  }

  async cargarLocacion() {
    this.cargaLocaciones = await this.locacionService.getLocaciones();
    this.mostrarLocaciones();
  }

  async cargarRutas() {
    console.log(this.formGroup.get('ruta').value)
    if (this.formGroup.controls['locacion'].valid) {
      this.cargaRutas = await this.rutaService.getRutasLocacion(this.formGroup.get('locacion').value.id)
    }
    this.mostrarRutas();
  }

  mostrarLocaciones() {
    this.locaciones = this.formGroup.get('locacion').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.provincia),
        map(nombre => nombre ? this._filterLocacion(nombre) : this.cargaLocaciones.slice())
      );
  }

  mostrarRutas() {
    this.formGroup.get('ruta').reset
    this.rutas = this.formGroup.get('ruta').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(nombre => nombre ? this._filterRuta(nombre) : this.cargaRutas.slice())
      );
  }

  private _filterLocacion(nombre: string): Locacion[] {
    const filterValue = nombre.toLowerCase();
    return this.cargaLocaciones.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  private _filterRuta(nombre: string): Ruta[] {
    const filterValue = nombre.toLowerCase();
    return this.cargaRutas.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  displayRuta(ruta: Ruta): string {
    return ruta && ruta.nombre ? ruta.nombre : '';
  }

  displayLocacion(locacion: Locacion): string {
    return locacion && locacion.nombre ? locacion.nombre : '';
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'locacion': ['', Validators.required],
      'ruta': ['', Validators.required],
      'validate': ''
    });
  }

  onSubmit(post: any) {
    this.post = post;
    this.rutaSeleccionada = this.post.ruta;
    this.route.navigate(['/app-rutavidente', this.rutaSeleccionada.id]);
  }
}
