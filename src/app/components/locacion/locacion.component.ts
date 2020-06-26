import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LocacionService } from 'src/app/services/locacion.service';
import { Locacion } from 'src/app/domain/locacion';
import { Categoria } from 'src/app/domain/categoria';
import { Provincia } from 'src/app/domain/provincia';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-locacion',
  templateUrl: './locacion.component.html',
  styleUrls: ['./locacion.component.css']
})

export class LocacionComponent {

  categorias: Categoria[] = new Array
  provincias: Provincia[] = new Array
  form: FormGroup
  contador: number = 10
  locacion: Locacion;
  id: number

  constructor(private locacionService: LocacionService, private fb: FormBuilder, private snackBar: MatSnackBar, private route: Router, private activatedRoute: ActivatedRoute) {
  }

  async ngOnInit() {
    try {
      this.setValidators()
      this.categorias = await this.locacionService.getCategorias()
      this.categorias = this.categorias.filter(cat => cat.nombre != "Favoritos")
      console.log(this.categorias)
      this.provincias = await this.locacionService.getProvincias()
      console.log(this.provincias)

      this.id = +this.activatedRoute.snapshot.paramMap.get('id');
      if (this.id != null && this.id != 0) {
        this.locacion = await this.locacionService.getLocacion(this.id);
        this.setValidatorsUpdate();
      }
    } catch (e) {
      console.log(e)
    }
  }

  setValidatorsUpdate() {
    if (this.locacion != null) {
      this.form.setValue(this.locacion)
    }
  }

  get titulo() {
    return (this.id == null || this.id == 0 ) ? "Crear locación" : "Editar locación" 
  }

  setValidators() {
    this.form = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      tipoLocacion: ['', [Validators.required]],
      esPublica: false,
      usuario: ['emiravenna@gmail.com']
    });
  }

  async onSubmit() {
    try {
      if (this.id != null && this.id != 0) {
        this.form.value.id = this.id;
        await this.locacionService.actualizarLocacion(this.form.value)
        this.actualizarSnackBar();
      } else {
        await this.locacionService.crearLocacion(this.form.value)
        this.openSnackBar()
      }
      this.route.navigate(['/administrar-locaciones'])
    } catch (e) {
      console.log(e)
    }
  }

  async reset() {
    if (this.id != null && this.id != 0) {
      this.locacion = await this.locacionService.getLocacion(this.id)
      console.log(this.locacion)
      this.form.setValue(this.locacion)
      console.log(this.form)
      this.form.markAllAsTouched()
    }
    else {
      this.form.reset()
      this.setValidators()
    }
  }

  openSnackBar() {
    this.snackBar.open('Nueva locacion creada!', "Ok", {
      duration: 2000,
    })
  }

  actualizarSnackBar() {
    this.snackBar.open('Locacion actualizada!', "Ok", { duration: 2000, panelClass: ['mat-toolbar', 'mat-primary'] })
  }
}