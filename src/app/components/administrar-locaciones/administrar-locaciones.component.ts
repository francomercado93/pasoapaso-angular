import { Component, OnInit } from '@angular/core';
import { Locacion } from 'src/app/domain/locacion';
import { LocacionService } from 'src/app/services/locacion.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/domain/usuario';

@Component({
  selector: 'app-administrar-locaciones',
  templateUrl: './administrar-locaciones.component.html',
  styleUrls: ['./administrar-locaciones.component.css']
})
export class AdministrarLocacionesComponent implements OnInit {

  constructor(private locacionService: LocacionService, private route: Router) { }

  locaciones: Locacion[] = new Array
  usuarioLog: Usuario = new Usuario()


  async ngOnInit() {
    try{
      this.usuarioLog.usuario = 'emiravenna@gmail.com'
      this.locaciones = await this.locacionService.getLocacionesUsuario(this.usuarioLog.usuario)
      console.log(this.locaciones)
    }catch(e){
      console.log(e)
    }
  }

  navigateCrearLocacion(){
    this.route.navigate(['/crear-locacion'])
  }

}
