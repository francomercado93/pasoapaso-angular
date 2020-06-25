import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Speech from "speak-tts";
import { Categoria } from 'src/app/domain/categoria';
import { Locacion } from 'src/app/domain/locacion';
import { Ruta } from 'src/app/domain/ruta';
import { LocacionService } from 'src/app/services/locacion.service';
import { RutaService } from 'src/app/services/ruta.service';
import { Usuario } from 'src/app/domain/usuario';

@Component({
  selector: 'app-busquedanv',
  templateUrl: './busquedanv.component.html',
  styleUrls: ['./busquedanv.component.css']
})
export class BusquedaNvComponent implements OnInit {

  speech: Speech
  i: number = 0
  j: number = 0
  categoriaSeleccionada: Categoria
  locacionSeleccionada: Locacion
  rutaSeleccionada: Ruta
  combinacion: any
  categorias: Categoria[] = new Array
  locaciones: Locacion[] = new Array
  rutas: Ruta[] = new Array
  texto: string = ""
  deshabilitado: Boolean
  constructor(private locacionService: LocacionService, private rutaService: RutaService, private route: Router) { }

  async ngOnInit() {
    try {
      this.speech = new Speech()
      this.categorias = await this.locacionService.getCategorias()
      this.inicializarVoz()
      await delay(3000)
      this.leerInstruccion("Seleccione una categoría")
      await delay(3000)
      this.leerInstruccion(this.categorias[this.i].nombre)
    } catch (e) {
      console.log("Error" + e)
    }
  }

  siguienteOpcion() {
    this.i++
    switch (this.j) {
      case 0:
        if (this.i >= this.categorias.length) {
          this.i--
        }
        console.log("i " + this.i)
        this.leerInstruccion(this.categorias[this.i].nombre)
        break
      case 1:
        if (this.i >= this.locaciones.length) {
          this.i--
        }
        this.leerInstruccion(this.locaciones[this.i].nombre)
        break
      case 2:
        if (this.i >= this.rutas.length) {
          this.i--
        }
        this.leerInstruccion(this.rutas[this.i].nombre)
        break
      default:
        this.leerInstruccion("Opcion no valida")
        break
    }
  }

  anteriorOpcion() {
    this.i--
    if (this.i < 0) {
      this.i = 0
    }
    switch (this.j) {
      case 0:
        this.leerInstruccion(this.categorias[this.i].nombre)
        break
      case 1:
        this.leerInstruccion(this.locaciones[this.i].nombre)
        break
      case 2:
        this.leerInstruccion(this.rutas[this.i].nombre)
        break
      default:
        this.leerInstruccion("Opcion no valida")
        break
    }
  }

  async confirmarOpcion() {
    switch (this.j) {
      case 0:
        this.categoriaSeleccionada = this.categorias[this.i]
        this.locaciones = await this.locacionService.getLocacionesCategoria(this.categoriaSeleccionada.id)
        if (this.locaciones == null || this.locaciones.length == 0) {
          this.leerInstruccion("La categoría seleccionada no tiene locaciones cargadas")
          await delay(3000)
          this.leerInstruccion("Seleccione una locación")
          await delay(3000)
          this.leerInstruccion(this.categorias[this.i].nombre)
          this.categoriaSeleccionada = null
          this.j = 0
        } else {
          console.log("Confirmado " + this.categoriaSeleccionada.nombre)
          this.leerInstruccion("Confirmado " + this.categoriaSeleccionada.nombre)
          this.j++
          this.i = 0
          await delay(3000)
          this.leerInstruccion("Seleccione una locación")
          this.leerInstruccion(this.locaciones[this.i].nombre)
        }
        break
      case 1:
        this.locacionSeleccionada = this.locaciones[this.i]
        this.rutas = await this.rutaService.getRutasLocacion(this.locacionSeleccionada.id)
        console.log("i" + this.i)
        console.log(this.rutas)
        if (this.rutas == null || this.rutas.length == 0) {
          this.leerInstruccion("La locación seleccionada no tiene rutas cargadas")
          await delay(3000)
          this.leerInstruccion("Seleccione una locación")
          this.locacionSeleccionada = null
          await delay(3000)
          this.leerInstruccion(this.locaciones[this.i].nombre)
          this.j = 1
        } else {
          console.log("Cantidad de rutas " + this.locacionSeleccionada.nombre + " " + this.rutas.length)
          console.log("Confirmado " + this.locacionSeleccionada.nombre)
          this.leerInstruccion("Confirmado " + this.locacionSeleccionada.nombre)
          await delay(3000)
          this.leerInstruccion("Seleccione una ruta")
          await delay(3000)
          this.i = 0
          this.leerInstruccion(this.rutas[this.i].nombre)
          this.j++
        }
        break
      case 2:
        this.rutaSeleccionada = this.rutas[this.i]
        console.log("Confirmado " + this.rutaSeleccionada.nombre)
        this.leerInstruccion("Confirmado " + this.rutaSeleccionada.nombre)
        this.j++
        this.i = 0
        console.log("Redireccion a Seguir ruta")
        let id = this.rutaSeleccionada.id
        this.route.navigate(['/ruta', id]);
        break
    }
  }

  get opcionNoValida(): Boolean {
    return this.i < 0
  }

  inicializarVoz() {
    this.speech
      .init({
        volume: 0.5,
        lang: "es-ES",
        rate: 1,
        'voice': 'Google español',
        'splitSentences': false
      })
      .then(data => {
        console.log(data)
        this.deshabilitado = false
      })
      .catch(e => {
        console.error("El siguiente error se produjo al inicializarse: ", e);
      });

  }

  leerInstruccion(instruccion: string) {
    this.deshabilitado = true
    this.texto = instruccion
    if (instruccion.length > 30) {
      this.speech.setRate(1.2)
    }
    this.speech
      .speak({
        text: instruccion,
        queue: true,
        listeners: {
          onstart: () => {
            console.log("Instruccion: " + instruccion);
          },
          onend: () => {
            console.log("Termino")
          },
          onresume: () => {
            console.log("Resumen")
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
      .then(() => {
        console.log("Funcionó! ");
        this.deshabilitado = false
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