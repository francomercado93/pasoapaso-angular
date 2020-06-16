import { Injectable } from '@angular/core';
import { Ruta } from '../domain/ruta';
import { Instruccion } from '../domain/instruccion';

export interface IRutaService {

  getRutasLocacion(idLocacion: number): Promise<any>
  crearNuevaRuta(ruta: Ruta): Promise<any>
  getRutaById(idRuta: number): Promise<any>
  getRutasLocacion(idLocacion: number): Promise<any>
}

@Injectable({
  providedIn: 'root'
})

export class RutaService implements IRutaService {

  constructor() { }

  crearNuevaRuta(ruta: Ruta): Promise<any> {
    throw new Error("Method not implemented.");
  }

  getRutasLocacion(idLocacion: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getRutaById(idRuta: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

@Injectable({
  providedIn: 'root'
})
export class StubRutaService implements IRutaService {

  deptoAlumnosTornaviasUnsam1: Instruccion
  deptoAlumnosTornaviasUnsam2: Instruccion
  deptoAlumnosTornaviasUnsam3: Instruccion
  deptoAlumnosTornaviasUnsam4: Instruccion
  deptoAlumnosTornaviasUnsam5: Instruccion
  deptoAlumnosTornaviasUnsam6: Instruccion
  laboratorioSociales1: Instruccion
  laboratorioSociales2: Instruccion
  laboratorioSociales3: Instruccion
  laboratorioSociales4: Instruccion
  laboratorioSociales5: Instruccion
  laboratorioSociales6: Instruccion
  laboratorioSociales7: Instruccion
  laboratorioSociales8: Instruccion
  laboratorioSociales9: Instruccion
  laboratorioSociales10: Instruccion
  laboratorioSociales11: Instruccion
  laboratorioSociales12: Instruccion
  laboratorioSociales13: Instruccion
  laboratorioSociales14: Instruccion
  laboratorioSociales15: Instruccion
  laboratorioSociales16: Instruccion
  laboratorioSociales17: Instruccion
  salaRXPirovano1: Instruccion
  salaRXPirovano2: Instruccion
  salaRXPirovano3: Instruccion
  salaRXPirovano4: Instruccion
  salaRXPirovano5: Instruccion
  salaRXPirovano6: Instruccion
  salaRXPirovano7: Instruccion
  instrucciones: Instruccion[] = new Array


  bibliotecaUnsam: Ruta
  deptoAlumnosTornaviasUnsam: Ruta
  aularioUnsam: Ruta
  laboratorioSocialesUnsam: Ruta
  salaRXPirovano: Ruta
  mesaAyudaThompson: Ruta
  radiologiaThompson: Ruta
  consultorio4Tornu: Ruta
  rutas: Ruta[] = new Array

  constructor() {
    this.bibliotecaUnsam = new Ruta(1, false, 1, "Biblioteca Unsam", "mariosantos@gmail.com", new Date(2020, 5, 3), "Ruta biblioteca unsam", 1)
    this.deptoAlumnosTornaviasUnsam = new Ruta(2, false, 1, "Departamento de alumnos del tornavias de la Unsam", "mariosantos@gmail.com", new Date(2020, 5, 4), "Ruta Departamento de alumnos del tornavias de la Unsam", 1)
    this.aularioUnsam = new Ruta(3, false, 1, "Aulario Unsam", "lamponne@gmail.com", new Date(2020, 5, 8), "Aulario Unsam", 1)
    this.laboratorioSocialesUnsam = new Ruta(4, false, 1, "Laboratiorio de Ciencias Sociales de la Unsam", "mariosantos@gmail.com", new Date(2020, 5, 9), "Laboratiorio de Ciencias Sociales de la Unsam", 1)
    this.salaRXPirovano = new Ruta(5, false, 4, "Sala de rayos X", "lamponne@gmail.com", new Date(2020, 5, 1), "Ruta de sala de rayos X del hospitla Pirovano", 2)

    this.rutas.push(this.bibliotecaUnsam)
    this.rutas.push(this.deptoAlumnosTornaviasUnsam)
    this.rutas.push(this.aularioUnsam)
    this.rutas.push(this.laboratorioSocialesUnsam)
    this.rutas.push(this.salaRXPirovano)
    this.deptoAlumnosTornaviasUnsam1 = new Instruccion(1, 1, "Caminar", 20)
    this.deptoAlumnosTornaviasUnsam2 = new Instruccion(2, 1, "Girar a la izquierda", 0)
    this.deptoAlumnosTornaviasUnsam3 = new Instruccion(4, 1, "Girar a la derecha", 0)
    this.deptoAlumnosTornaviasUnsam4 = new Instruccion(5, 1, "Caminar", 20)
    this.deptoAlumnosTornaviasUnsam5 = new Instruccion(6, 1, "Subir escalones", 20)
    this.deptoAlumnosTornaviasUnsam6 = new Instruccion(7, 1, "Caminar", 35)
    this.laboratorioSociales1 = new Instruccion(8, 2, "Caminar", 20)
    this.laboratorioSociales2 = new Instruccion(9, 2, "Girar a la derecha", 0)
    this.laboratorioSociales3 = new Instruccion(10, 2, "Caminar", 20)
    this.laboratorioSociales4 = new Instruccion(11, 2, "Girar a la derecha", 0)
    this.laboratorioSociales5 = new Instruccion(12, 2, "Caminar", 5)
    this.laboratorioSociales6 = new Instruccion(13, 2, "Girar a la izquierda", 0)
    this.laboratorioSociales7 = new Instruccion(14, 2, "Caminar", 40)
    this.laboratorioSociales8 = new Instruccion(15, 2, "Girar a la izquierda", 0)
    this.laboratorioSociales9 = new Instruccion(16, 2, "Caminar", 15)
    this.laboratorioSociales10 = new Instruccion(17, 2, "Girar a la derecha", 0)
    this.laboratorioSociales11 = new Instruccion(18, 2, "Caminar", 75)
    this.laboratorioSociales12 = new Instruccion(19, 2, "Girar a la derecha", 0)
    this.laboratorioSociales13 = new Instruccion(20, 2, "Caminar", 3)
    this.laboratorioSociales14 = new Instruccion(21, 2, "Girar a la izquierda", 0)
    this.laboratorioSociales15 = new Instruccion(22, 2, "Caminar", 3)
    this.laboratorioSociales16 = new Instruccion(23, 2, "Girar a la derecha", 0)
    this.laboratorioSociales17 = new Instruccion(24, 2, "Caminar", 10)
    this.salaRXPirovano1 = new Instruccion(25, 5, "Caminar", 10)
    this.salaRXPirovano2 = new Instruccion(26, 5, "Girar a la izquierda", 0)
    this.salaRXPirovano3 = new Instruccion(27, 5, "Subir ascensor", 5)
    this.salaRXPirovano4 = new Instruccion(28, 5, "Caminar", 5)
    this.salaRXPirovano5 = new Instruccion(29, 5, "Girar a la izquierda", 0)
    this.salaRXPirovano6 = new Instruccion(30, 5, "Caminar", 20)
    this.salaRXPirovano7 = new Instruccion(31, 5, "Girar a la derecha", 0)
    this.instrucciones.push(this.deptoAlumnosTornaviasUnsam1)
    this.instrucciones.push(this.deptoAlumnosTornaviasUnsam2)
    this.instrucciones.push(this.deptoAlumnosTornaviasUnsam3)
    this.instrucciones.push(this.deptoAlumnosTornaviasUnsam4)
    this.instrucciones.push(this.deptoAlumnosTornaviasUnsam5)
    this.instrucciones.push(this.deptoAlumnosTornaviasUnsam6)
    this.instrucciones.push(this.laboratorioSociales1)
    this.instrucciones.push(this.laboratorioSociales2)
    this.instrucciones.push(this.laboratorioSociales3)
    this.instrucciones.push(this.laboratorioSociales4)
    this.instrucciones.push(this.laboratorioSociales5)
    this.instrucciones.push(this.laboratorioSociales6)
    this.instrucciones.push(this.laboratorioSociales7)
    this.instrucciones.push(this.laboratorioSociales8)
    this.instrucciones.push(this.laboratorioSociales9)
    this.instrucciones.push(this.laboratorioSociales10)
    this.instrucciones.push(this.laboratorioSociales11)
    this.instrucciones.push(this.laboratorioSociales12)
    this.instrucciones.push(this.laboratorioSociales13)
    this.instrucciones.push(this.laboratorioSociales14)
    this.instrucciones.push(this.laboratorioSociales15)
    this.instrucciones.push(this.laboratorioSociales16)
    this.instrucciones.push(this.laboratorioSociales17)
    this.instrucciones.push(this.salaRXPirovano1)
    this.instrucciones.push(this.salaRXPirovano2)
    this.instrucciones.push(this.salaRXPirovano3)
    this.instrucciones.push(this.salaRXPirovano4)
    this.instrucciones.push(this.salaRXPirovano5)
    this.instrucciones.push(this.salaRXPirovano6)
    this.instrucciones.push(this.salaRXPirovano7)
  }

  async crearNuevaRuta(ruta: Ruta): Promise<any> {
    return this.rutas.push(ruta)
  }

  async getRutasLocacion(idLocacion: number): Promise<any> {
    return this.rutas.filter(ruta => ruta.idLocacion == idLocacion)
  }

  async getRutaById(idRuta: number) {
    return this.rutas.find(ruta => ruta.id == idRuta)
  }

  async getInstruccionesRuta(idRuta: number): Promise<any> {
    return this.instrucciones.filter(instruccion => instruccion.idRuta == idRuta)
  }
}