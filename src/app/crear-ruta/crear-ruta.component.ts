import { Component, OnInit } from '@angular/core';
import { Instruccion } from '../domain/instruccion';
import { Ruta } from '../domain/ruta';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { RutaService } from '../services/ruta.service';
import { TipoInstruccion } from '../domain/tipoInstruccion';
import { Locacion } from '../domain/locacion';
import { LocacionService } from '../services/locacion.service';

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

  constructor(private fb: FormBuilder, private rutaService: RutaService, private locacionService: LocacionService) { }

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
      id: '',
      esPublica: 0,
      locacion: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      usuario: 'lamponne@gmail.com',
      fechaCreacion: '2020-05-06',
      descripcion: [''],
      estado: 1,
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
      id: '',
      idRuta: '',
      tipoInstruccion: ['', [Validators.required]],
      cantidad: ['', [Validators.min(0)]]
    })
  }

  onSubmit() {
    try {
      this.rutaService.crearNuevaRuta(this.rutaForm.value)
    } catch (e) {
      console.log(e)
    }
  }

  cancelar(){
    console.log(this.rutaForm.value)
  }

}
