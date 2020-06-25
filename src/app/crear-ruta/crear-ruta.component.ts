import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Locacion } from '../domain/locacion';
import { TipoInstruccion } from '../domain/tipoInstruccion';
import { LocacionService } from '../services/locacion.service';
import { RutaService } from '../services/ruta.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-ruta',
  templateUrl: './crear-ruta.component.html',
  styleUrls: ['./crear-ruta.component.css']
})
export class CrearRutaComponent implements OnInit {

  tiposInstrucciones: TipoInstruccion[] = new Array
  locaciones: Locacion[] = new Array
  rutaForm: FormGroup
  instrucciones: FormArray

  constructor(private fb: FormBuilder, private rutaService: RutaService, private locacionService: LocacionService, private snackBar: MatSnackBar, private route: Router) { }

  async ngOnInit() {
    try {
      this.setValidators()
      this.tiposInstrucciones = await this.rutaService.getTiposInstrucciones()
      this.locaciones = await this.locacionService.getLocaciones()
      console.log(this.locaciones)
    } catch (e) {
      console.log(e)
    }
  }

  setValidators() {
    this.rutaForm = this.fb.group({
      id: [''],
      esPublica: [0],
      locacion: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      usuario: ['lamponne@gmail.com'],
      fechaCreacion: ['2020-05-06'],
      descripcion: [''],
      estado: [1],
      instrucciones: this.fb.array([
      ])
    })
    this.agregarInstruccion()
  }

  agregarInstruccion() {
    this.instrucciones = this.rutaForm.get('instrucciones') as FormArray
    this.instrucciones.push(this.createInstruccion())
  }

  createInstruccion(): FormGroup {
    return this.fb.group({
      id: [this.cantidadInstrucciones],
      idRuta: [''],
      numeroInstruccion: this.cantidadInstrucciones,
      tipoInstruccion: ['', [Validators.required]],
      cantidad: ['', [Validators.min(0), Validators.required]]
    })
  }
  get cantidadInstrucciones() {
    return this.instrucciones.length
  }

  async onSubmit() {
    try {
      console.log(this.rutaForm.value)
      await this.rutaService.crearNuevaRuta(this.rutaForm.value)
      this.openSnackBar()
      // Redirigir a administrar locaciones
      this.route.navigate(['/app-busquedanv'])
    } catch (e) {
      console.log(e)
    }
  }

  reset() {
    this.rutaForm.reset()
    this.setValidators()
    // this.rutaForm.markAsUntouched()
  }

  openSnackBar() {
    this.snackBar.open('Nueva ruta creada!', "Ok", {
      duration: 3000,
    })
  }

  eliminarInstruccion(i: number){
    this.instrucciones.removeAt(i)
  }
}
