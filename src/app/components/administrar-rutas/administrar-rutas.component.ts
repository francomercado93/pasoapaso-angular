import { Component, OnInit } from '@angular/core';
import { RutaService } from 'src/app/services/ruta.service';
import { Router } from '@angular/router';
import { Ruta } from 'src/app/domain/ruta';
import { Usuario } from 'src/app/domain/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionPublicarRutaComponent } from '../confirmacion-publicar-ruta/confirmacion-publicar-ruta.component';

@Component({
  selector: 'app-administrar-rutas',
  templateUrl: './administrar-rutas.component.html',
  styleUrls: ['./administrar-rutas.component.css']
})
export class AdministrarRutasComponent implements OnInit {
  rutas: Ruta[] = new Array
  usuario = new Usuario()
  constructor(private route: Router, private rutaService: RutaService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  async ngOnInit() {
    try {
      this.usuario.usuario = "emiravenna@gmail.com"
      this.getRutasUsuario()
    } catch (e) {
      console.log(e)
    }
  }

  async publicarRuta(ruta) {
    try {
      this.openDialog(ruta)

    } catch (e) {
      console.log(e)
    }
  }

  async openDialog(ruta: Ruta) {
    const dialogRef = this.dialog.open(ConfirmacionPublicarRutaComponent, {
      width: '250px',
      data: ruta
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getRutasUsuario()
      this.openSnackBar()
    });


  }
  async getRutasUsuario() {
    this.rutas = await this.rutaService.getRutasUsuario(this.usuario.usuario)
    console.log(this.rutas)
  }

  navigateCrearRuta() {
    this.route.navigate(['/crear-ruta'])
  }

  openSnackBar() {
    this.snackBar.open('Ruta publicada!', "Ok", {
      duration: 3000,
    })
  }

}
