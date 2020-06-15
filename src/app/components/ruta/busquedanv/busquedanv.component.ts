import { Component, OnInit } from '@angular/core';
import { Speech } from 'speak-tts';

export interface Ruta {
  id: number;
  nombre: string;
}

export interface Locacion {
  id: number;
  institucion: string;
}

export interface Tile {
  color: string;
  text: string;
}

@Component({
  selector: 'app-busquedanv',
  templateUrl: './busquedanv.component.html',
  styleUrls: ['./busquedanv.component.css']
})
export class BusquedanvComponent implements OnInit {

  tiles: Tile[] = [
    { text: 'SIGUIENTE', color: 'lightblue' },
    { text: 'ANTERIOR', color: 'lightgreen' },
    { text: 'OK', color: 'lightpink' },
  ];

  //Locaciones
  cargaLocaciones: Locacion[] = [
    { id: 1, institucion: 'Hospital Pirovano, Buenos Aires, Pergamino' },
    { id: 2, institucion: 'Hospital San Martin, Buenos Aires, Junin' },
    { id: 3, institucion: 'Hospital Avellaneda, Buenos Aires, Rojas' }
  ];

  //Rutas
  cargaRutas: Ruta[] = [
    { id: 4, nombre: 'Mesa de Ayuda' },
    { id: 5, nombre: 'Radiología' },
    { id: 6, nombre: 'Consultorio 4' }
  ];

  ngOnInit() {
    this.inicializarVoz();
  }

  inicializarVoz() {
    const speech = new Speech();
    speech.init({
      'volume': 1,
      'lang': 'en-GB',
      'rate': 1,
      'pitch': 1,
      'voice': 'Google UK English Male',
      'splitSentences': true,
      'listeners': {
        'onvoiceschanged': (voices) => {
          console.log("Event voiceschanged", voices)
        }
      }
    })
  }

  _prepareSpeakButton(speech) {
    const speakButton = document.getElementById("test");
    speakButton.addEventListener("click", () => {
      speech
        .speak({
          text: 'asdasdasd',
          queue: false,
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
    );
  }

}
