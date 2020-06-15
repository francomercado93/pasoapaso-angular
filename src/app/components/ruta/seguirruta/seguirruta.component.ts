import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Speech from 'speak-tts';

export interface Instruccion {
  id: number;
  instruccion: string;
}

export interface Ruta {
  id: number;
  nombre: string;
  idLocacion: number;
  instrucciones: Instruccion[];
}

@Component({
  selector: 'ruta',
  templateUrl: './seguirruta.component.html',
  styleUrls: ['./seguirruta.component.css']
})

export class SeguirrutaComponent implements OnInit {

  speech: Speech = new Speech()
  i: number = 0

  instruccion = { id: 0, instruccion: "Iniciando instrucciones" };
  instruccion2 = { id: 1, instruccion: "en bicho bicho yo me convertí" };
  instruccion3 = { id: 2, instruccion: "cocodrilo soy" };
  instrucciones: Instruccion[] = [this.instruccion, this.instruccion2, this.instruccion3];
  //Ruta
  ruta: Ruta = { id: 0, nombre: 'Seleccione la ruta', idLocacion: 0, instrucciones: this.instrucciones }

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params);
    });
    const id = +this.route.snapshot.paramMap.get('id');
    this.getRuta(id);
    this.inicializarVoz();
  }

  getRuta(id: number) {
    return this.ruta;
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
    this.leerInstruccion(this.ruta.instrucciones[this.i].instruccion);
    this.i++;
  }

  get opcionNoValida(): Boolean {
    return this.i >= this.ruta.instrucciones.length;
  }
}
