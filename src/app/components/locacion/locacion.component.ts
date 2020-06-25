import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LocacionService } from 'src/app/services/locacion.service';
import { Locacion } from 'src/app/domain/locacion';
import { Categoria } from 'src/app/domain/categoria';
import { Provincia } from 'src/app/domain/provincia';

@Component({
  selector: 'app-locacion',
  templateUrl: './locacion.component.html',
  styleUrls: ['./locacion.component.css']
})

export class LocacionComponent {

  categorias: Categoria[] = new Array
  provincias: Provincia[] = new Array

  async ngOnInit() {
    this.categorias = await this.locacionService.getCategorias()
    console.log(this.categorias)
    this.provincias = await this.locacionService.getProvincias()
    console.log(this.provincias)
  }

  // TODO: agregar validators
  constructor(private locacionService: LocacionService) { }

  form = new FormGroup({
    nombreInstitucion: new FormControl(),
    tipoInstitucion: new FormControl(),
    direccionInstitucion: new FormControl(),
    ciudadInstitucion: new FormControl(),
    provinciaInstitucion: new FormControl()
  });

  contador: number = 10

  async crear_locacion() {
    const locacion = new Locacion()
    locacion.id = this.contador
    locacion.nombre = this.form.get('nombreInstitucion').value
    locacion.direccion = this.form.get('direccionInstitucion').value
    locacion.ciudad = this.form.get('ciudadInstitucion').value
    locacion.provincia = this.form.get('provinciaInstitucion').value
    locacion.tipoLocacion = this.form.get('tipoInstitucion').value
    locacion.esPublica = false
    locacion.usuario = 'emiravenna@gmail.com'

    this.contador++

    const res = await this.locacionService.crearLocacion(locacion)
    console.log(res)
    return res
  }
}