import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaService } from 'src/app/services/ruta.service';
import { Instruccion } from 'src/app/domain/instruccion';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-rutavidente',
  templateUrl: './rutavidente.component.html',
  styleUrls: ['./rutavidente.component.css']
})
export class RutavidenteComponent implements OnInit {
  isLinear = true;
  iniciarRuta = false;
  instrucciones: Instruccion[]

  constructor(private activatedRoute: ActivatedRoute, private route: Router, private rutaService: RutaService, private _snackBar: MatSnackBar) { }

  async ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.instrucciones = await this.rutaService.getInstruccionesRuta(id);
    this.instrucciones = this.instrucciones.sort(inst => inst.numeroInstruccion)
    this.descripcionInstruccion();
  }

  openSnackBar(message: string, accion: string) {
    this._snackBar.open(message, accion, { duration: 2000, panelClass: ['mat-toolbar', 'mat-primary'] });
  }

  navigateToBuscarRuta(){
    this.route.navigate(['/'])
  }

  descripcionInstruccion() {
    if (this.instrucciones != null) {
      for (let instruccion of this.instrucciones) {
        if (instruccion.tipoInstruccion.includes("Caminar")) {
          instruccion.descripcion = instruccion.tipoInstruccion + " " + instruccion.cantidad + " pasos."
        } else
          if (instruccion.tipoInstruccion.includes("escalones")) {
            var aux = instruccion.tipoInstruccion.split(" ");
            instruccion.descripcion = aux[0] + " " + instruccion.cantidad + " " + aux[1] + "."
          } else
            if (instruccion.tipoInstruccion.includes("ascensor")) {
              var aux = instruccion.tipoInstruccion.split(" ");
              instruccion.descripcion = aux[0] + " " + instruccion.cantidad + " pisos " + aux[1] + "."
            } else {
              instruccion.descripcion = instruccion.tipoInstruccion + "."
            }
      }
    }
  }
}
