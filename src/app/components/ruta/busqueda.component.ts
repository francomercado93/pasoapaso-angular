import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface Ruta {
  id: number;
  nombre: string;
}

export interface Locacion {
  id: number;
  institucion: string;
}

@Component({
  selector: '',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  formGroup: FormGroup;
  titleAlert: string = 'Campo Obligatorio';
  post: any = '';

  //Locaciones
  cargaLocaciones: Locacion[] = [
    { id: 1, institucion: 'Hospital Pirovano, Buenos Aires, Pergamino' },
    { id: 2, institucion: 'Hospital Pirovano, Buenos Aires, Junin' },
    { id: 3, institucion: 'Hospital Pirovano, Buenos Aires, Rojas' }
  ];
  locaciones: Observable<Locacion[]>;

  //Rutas
  cargaRutas: Ruta[] = [
    { id: 4, nombre: 'Mesa de Ayuda' },
    { id: 5, nombre: 'Radiología' },
    { id: 6, nombre: 'Consultorio 4' }
  ];
  rutas: Observable<Ruta[]>;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.cargarRuta();
    this.cargarLocacion();
  }

  cargarLocacion() {
    this.locaciones = this.formGroup.get('locacion').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.institucion),
        map(institucion => institucion ? this._filterLocacion(institucion) : this.cargaLocaciones.slice())
      );
  }

  cargarRuta() {
    this.rutas = this.formGroup.get('ruta').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(nombre => nombre ? this._filterRuta(nombre) : this.cargaRutas.slice())
      );
  }

  private _filterLocacion(nombre: string): Locacion[] {
    const filterValue = nombre.toLowerCase();
    return this.cargaLocaciones.filter(option => option.institucion.toLowerCase().includes(filterValue));
  }

  private _filterRuta(nombre: string): Ruta[] {
    const filterValue = nombre.toLowerCase();
    return this.cargaRutas.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  displayRuta(ruta: Ruta): string {
    return ruta && ruta.nombre ? ruta.nombre : '';
  }

  displayLocacion(locacion: Locacion): string {
    return locacion && locacion.institucion ? locacion.institucion : '';
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'locacion': [null, Validators.required],
      'ruta': [null, Validators.required],
      'validate': ''
    });
  }

  onSubmit(post: any) {
    this.post = post;
  }

  /*
  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail],
      'name': [null, Validators.required],
      'password': [null, [Validators.required, this.checkPassword]],
      'description': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      'locacion': '',
      'ruta': '',
      'validate': ''
    });
  }
  */

  /*
  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.formGroup.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "You need to specify at least 3 characters";
        } else {
          this.formGroup.get('name').setValidators(Validators.required);
        }
        this.formGroup.get('name').updateValueAndValidity();
      }
    )
  }
  */

  /*
  get name() {
    return this.formGroup.get('name') as FormControl
  }

  checkPassword(control: FormControl) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  checkInUseEmail(control: FormControl) {
    // mimic http database access
    let db = ['tony@gmail.com'];
    return new Observable(observer => {
      setTimeout(() => {
        let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
        observer.next(result);
        observer.complete();
      }, 4000)
    })
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }
  */
}
