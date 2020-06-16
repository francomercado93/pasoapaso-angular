import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Speech from 'speak-tts';
import { StubRutaService } from 'src/app/services/ruta.service';
import { Ruta } from '../busqueda.component';
import { Instruccion } from 'src/app/domain/instruccion';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'ruta',
  templateUrl: './seguirruta.component.html',
  styleUrls: ['./seguirruta.component.css']
})

export class SeguirrutaComponent implements OnInit {

  speech: Speech = new Speech()
  i: number = 0

  // instruccion = { id: 0, instruccion: "Iniciando instrucciones" };
  // instruccion2 = { id: 1, instruccion: "en bicho bicho yo me convertí" };
  // instruccion3 = { id: 2, instruccion: "cocodrilo soy" };
  // instrucciones: Instruccion[] = [this.instruccion, this.instruccion2, this.instruccion3];
  // //Ruta
  // ruta: Ruta = { id: 0, nombre: 'Seleccione la ruta', idLocacion: 0, instrucciones: this.instrucciones }
  ruta: Ruta
  instrucciones: Instruccion[]

  constructor(private route: ActivatedRoute, private rutaService: StubRutaService) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params);
    });
    const id = +this.route.snapshot.paramMap.get('id');
    // this.getRuta(id);
    this.ruta = await this.rutaService.getRutaById(id)
    this.instrucciones = await this.rutaService.getInstruccionesRuta(id)
    this.inicializarVoz()
    await delay(2000)
    this.leerInstruccion("Seguir ruta " + this.ruta.nombre)
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
    this.speech
      .speak({
        text: instruccion,
        queue: true,
        listeners: {
          onstart: () => {
            console.log("Instrucción: " + instruccion);
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
        console.log("Ingrese la opción elegida", data);
      })
      .catch(e => {
        console.error("Ocurrio un error: ", e);
      });
  }

  siguienteOpcion() {
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
        instruccion = aux[0] + " " + cantidad + " pisos "+ aux[1]
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
