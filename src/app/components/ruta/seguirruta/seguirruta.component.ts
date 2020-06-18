import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import Speech from 'speak-tts';
import { Instruccion } from 'src/app/domain/instruccion';
import { RutaService } from 'src/app/services/ruta.service';
import { Ruta } from '../busqueda.component';

@Component({
  selector: 'ruta',
  templateUrl: './seguirruta.component.html',
  styleUrls: ['./seguirruta.component.css']
})

export class SeguirrutaComponent implements OnInit {

  speech: Speech = new Speech()
  i: number = 0
  ruta: Ruta
  instrucciones: Instruccion[]
  inicio: Boolean = true
  deshabilitado: Boolean

  constructor(private route: ActivatedRoute, private rutaService: RutaService) { }

  async ngOnInit() {
    this.speech = new Speech()
    const id = +this.route.snapshot.paramMap.get('id');
    this.ruta = await this.rutaService.getRutaById(id)
    this.instrucciones = await this.rutaService.getInstruccionesRuta(id)
    this.inicializarVoz()
    await delay(2000)
    this.leerInstruccion("Seguir ruta " + this.ruta.nombre)
  }

  get textButton(): String {
    return this.inicio ? "INICIAR RUTA" : "SIGUIENTE"
  }

  inicializarVoz() {
    this.speech
      .init({
        volume: 0.5,
        lang: "es-ES",
        rate: 0.9,
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
    this.deshabilitado = true
    if (instruccion.length > 30) {
      this.speech.setRate(1.3)
    }
    this.speech
      .speak({
        text: instruccion,
        queue: true,
        listeners: {
          onstart: () => {
            console.log("Instrucción: " + instruccion);
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
        console.log("Funcionó")
        this.deshabilitado = false
      })
      .catch(e => {
        console.error("Ocurrio un error: ", e);
      });
  }

  siguienteOpcion() {
    if (this.inicio) {
      this.inicio = false
    }
    if (this.instrucciones == null || this.instrucciones.length == 0) {
      this.leerInstruccion("La ruta seleccionada no tiene instrucciones cargadas")
    }
    else {
      var instruccion = this.instrucciones[this.i].tipoInstruccion
      const cantidad = this.instrucciones[this.i].cantidad
      if (instruccion.includes("Caminar")) {
        instruccion = instruccion + " " + cantidad + " pasos"
      }
      if (instruccion.includes("escalones")) {
        var aux = instruccion.split(" ")
        instruccion = aux[0] + " " + cantidad + aux[1]
      }
      if (instruccion.includes("ascensor")) {
        var aux = instruccion.split(" ")
        instruccion = aux[0] + " " + cantidad + " pisos " + aux[1]
      }
      this.leerInstruccion(instruccion);
      this.i++;
      if (this.i >= this.instrucciones.length) {
        this.leerInstruccion("A llegado a su destino")
      }
    }
  }

  get opcionNoValida(): Boolean {
    return this.instrucciones == null ? false : this.i >= this.instrucciones.length
  }
}
