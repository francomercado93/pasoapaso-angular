import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import Speech from 'speak-tts';
import { Instruccion } from 'src/app/domain/instruccion';
import { RutaService } from 'src/app/services/ruta.service';
import { Ruta } from 'src/app/domain/ruta';

@Component({
  selector: 'ruta',
  templateUrl: './seguirruta.component.html',
  styleUrls: ['./seguirruta.component.css']
})

export class SeguirrutaComponent implements OnInit, OnDestroy {

  speech: Speech
  i: number = 0
  ruta: Ruta
  instrucciones: Instruccion[]
  inicio: Boolean = true

  constructor(private route: ActivatedRoute, private rutaService: RutaService) {
    this.speech = new Speech()

    this.speech
      .init({
        'default': true,
        'volume': 0.5,
        'lang': 'es-ES',
        'rate': 1,
        'voice': 'Google español',
        'splitSentences': false
      })
      .then(data => {
        console.log("Speech is ready, voices are available", data)
        this.leerInstruccion("Pantalla de seguir ruta " + this.ruta.nombre)
        delay(3000)
        this.leerInstruccion("La pantalla consta de los siguientes botones: siguiente en la parte superior, me perdí en el medio y abandonar ruta en la parte inferior ")
        delay(3000)
        this.leerInstruccion("Toque la parte superior de la pantalla para iniciar la ruta")
      })
      .catch(e => {
        console.error("El siguiente error se produjo al inicializarse: ", e);
      });

  }

  ngOnDestroy() {
    console.log("Destroy")
    this.speech.cancel()
    this.speech = null
  }

  async ngOnInit() {
    try {
      const id = +this.route.snapshot.paramMap.get('id');
      this.ruta = await this.rutaService.getRutaById(id)
      this.instrucciones = await this.rutaService.getInstruccionesRuta(id)
      this.instrucciones = this.instrucciones.sort(inst => inst.numeroInstruccion)
    } catch (e) {
      console.log(e)
    }

  }
  async leerInstruccionesPrincipales() {
    await delay(3000)
    this.leerInstruccion("Pantalla de seguir ruta " + this.ruta.nombre)
    await delay(3000)
    this.leerInstruccion("La pantalla consta de los siguientes botones: siguiente en la parte superior, me perdí en el medio y abandonar ruta en la parte inferior ")
    await delay(3000)
    this.leerInstruccion("Toque la parte superior de la pantalla para iniciar la ruta")
  }

  get textButton(): String {
    return this.inicio ? "INICIAR RUTA" : "SIGUIENTE"
  }

  leerInstruccion(instruccion: string) {
    if (this.speech != null) {
      if (instruccion.length > 30) {
        this.speech.setRate(1.2)
      }
      else {
        this.speech.setRate(1)
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
        })
        .catch(e => {
          console.error("Ocurrio un error: ", e);
        });
    }
  }

  async siguienteOpcion() {
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
        await delay(3000)
        this.leerInstruccion("Toque la parte superior de la pantalla para agregar la ruta a favoritos")
        await delay(3000)
        this.leerInstruccion("Toque la parte del medio de la pantalla para buscar una nueva ruta")
        await delay(3000)
        this.leerInstruccion("Toque la parte inferior de la pantalla para invertir la ruta")
      }
    }
  }

  get opcionNoValida(): Boolean {
    return this.instrucciones == null ? false : this.i >= this.instrucciones.length
  }

  get deshabilitado(): Boolean {
    return this.speech.speaking()
  }

}
