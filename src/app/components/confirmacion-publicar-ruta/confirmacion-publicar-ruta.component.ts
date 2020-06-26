import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RutaService } from 'src/app/services/ruta.service';
import { Ruta } from 'src/app/domain/ruta';

@Component({
  selector: 'app-confirmacion-publicar-ruta',
  templateUrl: './confirmacion-publicar-ruta.component.html',
  styleUrls: ['./confirmacion-publicar-ruta.component.css']
})
export class ConfirmacionPublicarRutaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmacionPublicarRutaComponent>,
    @Inject(MAT_DIALOG_DATA) public ruta: Ruta, private rutaService: RutaService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async publicar() {
    try {
      console.log(this.ruta.nombre)
      await this.rutaService.publicarRuta(this.ruta)
    } catch (e) {
      console.log(e)
    }
  }
}
