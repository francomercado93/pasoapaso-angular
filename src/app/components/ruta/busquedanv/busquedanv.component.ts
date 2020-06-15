import { Component, OnInit } from '@angular/core';
import Speech from 'speak-tts';

export interface Ruta {
  id: number;
  nombre: string;
  idLocacion: number
}

export interface Locacion {
  id: number;
  nombre: string;
  idTipoInstitucion: number
}

export interface Categoria {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-busquedanv',
  templateUrl: './busquedanv.component.html',
  styleUrls: ['./busquedanv.component.css']
})
export class BusquedanvComponent implements OnInit {

  siguiente: Boolean = false
  categoriaSeleccionada: Categoria
  ok: Boolean = false
  speech: Speech = new Speech()
  i: number = -1
  j: number = 0
  k: number = -1
  locacionSeleccionada: Locacion
  rutaSeleccionada: Ruta

  combinacion: any

  categorias: Categoria[] = [
    { id: 0, nombre: 'Por favor seleccione el tipo de locación' },
    { id: 1, nombre: 'Favoritos' },
    { id: 2, nombre: 'Hospitales' },
    { id: 3, nombre: 'Universidades' },
    { id: 4, nombre: 'Museos' }
  ]

  locaciones: Locacion[] = [
    { id: 0, nombre: 'Por favor seleccione la locación', idTipoInstitucion: 0 },
    { id: 1, nombre: 'Hospital Pirovano', idTipoInstitucion: 2 },
    { id: 2, nombre: 'Hospital Thompson', idTipoInstitucion: 2 },
    { id: 3, nombre: 'Hospital Tornu', idTipoInstitucion: 2 }
  ];
  //Rutas
  rutas: Ruta[] = [
    { id: 0, nombre: 'Seleccione la ruta', idLocacion: 0 },
    { id: 4, nombre: 'Mesa de Ayuda', idLocacion: 1 },
    { id: 5, nombre: 'Radiología', idLocacion: 1 },
    { id: 6, nombre: 'Consultorio 4', idLocacion: 2 }
  ];

  ngOnInit() {
    this.combinacion = [this.categorias, this.locaciones, this.rutas];
    this.inicializarVoz();
  }

  siguienteOpcion() {
    this.i++
    switch (this.j) {
      case 0:
        if (this.i < this.categorias.length) {
          this.leerInstruccion(this.combinacion[this.j][this.i].nombre)
        }
        else {
          this.i = 0
        }
        break
      case 1:
        if (this.i < this.locaciones.length) {
          this.leerInstruccion(this.combinacion[this.j][this.i].nombre)
        }
        else {
          this.i = 0
        }
        break
      case 2:
        console.log(this.rutas.length)
        if (this.i < this.rutas.length) {
          this.leerInstruccion(this.combinacion[this.j][this.i].nombre)
        }
        else {
          this.i = 0
        }
        break
    }
  }

  anteriorOpcion() {
    this.i--
    if (this.i < 0) {
      this.i = 0
    }
    this.leerInstruccion(this.combinacion[this.j][this.i].nombre)
  }

  confirmarOpcion() {
    switch (this.j) {
      case 0:
        this.categoriaSeleccionada = this.combinacion[this.j][this.i]
        break
      case 1:
        this.locacionSeleccionada = this.combinacion[this.j][this.i]
        break
      case 2:
        this.rutaSeleccionada = this.combinacion[this.j][this.i]
        console.log("Redireccion a Seguir ruta")
        break
    }
    console.log("Confirmado " + this.combinacion[this.j][this.i].nombre)
    this.leerInstruccion("Confirmado " + this.combinacion[this.j][this.i].nombre)
    this.j++
    this.i = -1
  }

  getRutasLocacion(idLocacion: number): any {
    return this.rutas.filter(ruta => ruta.idLocacion == idLocacion)
  }

  getLocacionesByCategoria(idCategoria: number): any {
    return this.locaciones.filter(locacion => locacion.idTipoInstitucion == idCategoria)
  }

  confirmar() {
    this.ok = true
  }

  get opcionNoValida(): Boolean {
    return this.i <= 0
  }

  inicializarVoz() {
    this.speech
      .init({
        volume: 0.5,
        lang: "es-ES",
        rate: 0.88,
        'voice': 'Google español',
        'splitSentences': false
      })
      .then(data => {
        console.log(data)
      })
      .catch(e => {
        console.error("El siguiente error se produjo al inicializarse: ", e);
      });

  }

  leerInstruccion(instruccion: string) {
    this.speech
      .speak({
        text: instruccion,
        queue: true,
        listeners: {
          onstart: () => {
            console.log("Comienza el habla");
          },
          onend: () => {
            console.log("Termina el habla");
          },
          onresume: () => {
            console.log("Resume el habla");
          },
          onboundary: event => {
            console.log(
              event.name +
              " se llego a un limite en " +
              event.elapsedTime +
              " milisegundos."
            );
          }
        }
      })
      .then(data => {
        console.log("Funcionó! ", data);
      })
      .catch(e => {
        console.error("Ocurrio un error: ", e);
      });
  }
}

function delay(ms: number) {
  console.log("delay")
  return new Promise(resolve => setTimeout(resolve, ms));
}
