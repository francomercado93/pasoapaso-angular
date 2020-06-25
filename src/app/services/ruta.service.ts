import { Injectable } from '@angular/core';
import { Ruta } from '../domain/ruta';
import { Instruccion } from '../domain/instruccion';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../configuration/baseUrl';
import { TipoInstruccion } from '../domain/tipoInstruccion';

export interface IRutaService {
  getRutasLocacion(idLocacion: number): Promise<any>
  crearNuevaRuta(ruta: Ruta): Promise<any>
  getRutaById(idRuta: number): Promise<any>
  getInstruccionesRuta(idRuta: number): Promise<any>
  getTiposInstrucciones(): Promise<any>
}

@Injectable({
  providedIn: 'root'
})

export class RutaService implements IRutaService {

  constructor(private httpClient: HttpClient) { }

  async getInstruccionesRuta(idRuta: number): Promise<any> {
    const res = this.httpClient.get<Array<Instruccion>>(`${baseUrl}/instrucciones/${idRuta}`).toPromise()
    return res
  }

  async crearNuevaRuta(ruta: Ruta): Promise<any> {
    const nuevaRutaId = await this.httpClient.post<Ruta>(`${baseUrl}/rutas`, ruta).toPromise()
    this.crearNuevasInstrucciones(nuevaRutaId, ruta.instrucciones)
    return nuevaRutaId
  }

  crearNuevasInstrucciones(nuevaRutaId: any, instrucciones: Instruccion[]) {
    instrucciones.forEach(instruccion => {
      this.insertInstruccion(instruccion, nuevaRutaId)
    })
  }

  async insertInstruccion(instruccion: Instruccion, nuevaRutaId: number) {
    return this.httpClient.post<Instruccion>(`${baseUrl}/instrucciones/${nuevaRutaId}`, instruccion).toPromise()
  }

  async getRutasLocacion(idLocacion: number): Promise<any> {
    const res = this.httpClient.get<Array<Ruta>>(`${baseUrl}/rutas-por-locacion/${idLocacion}`).toPromise()
    return res
  }

  async getRutaById(idRuta: number): Promise<any> {
    const res = this.httpClient.get<Ruta>(`${baseUrl}/rutas/${idRuta}`).toPromise()
    return res
  }

  async getTiposInstrucciones(): Promise<any> {
    return this.httpClient.get<TipoInstruccion>(`${baseUrl}/tipos-instrucciones`).toPromise()
  }
}

// @Injectable({
//   providedIn: 'root'
// })
// export class StubRutaService implements IRutaService {

//   deptoAlumnosTornaviasUnsam1: Instruccion
//   deptoAlumnosTornaviasUnsam2: Instruccion
//   deptoAlumnosTornaviasUnsam3: Instruccion
//   deptoAlumnosTornaviasUnsam4: Instruccion
//   deptoAlumnosTornaviasUnsam5: Instruccion
//   deptoAlumnosTornaviasUnsam6: Instruccion
//   laboratorioSociales1: Instruccion
//   laboratorioSociales2: Instruccion
//   laboratorioSociales3: Instruccion
//   laboratorioSociales4: Instruccion
//   laboratorioSociales5: Instruccion
//   laboratorioSociales6: Instruccion
//   laboratorioSociales7: Instruccion
//   laboratorioSociales8: Instruccion
//   laboratorioSociales9: Instruccion
//   laboratorioSociales10: Instruccion
//   laboratorioSociales11: Instruccion
//   laboratorioSociales12: Instruccion
//   laboratorioSociales13: Instruccion
//   laboratorioSociales14: Instruccion
//   laboratorioSociales15: Instruccion
//   laboratorioSociales16: Instruccion
//   laboratorioSociales17: Instruccion
//   salaRXPirovano1: Instruccion
//   salaRXPirovano2: Instruccion
//   salaRXPirovano3: Instruccion
//   salaRXPirovano4: Instruccion
//   salaRXPirovano5: Instruccion
//   salaRXPirovano6: Instruccion
//   salaRXPirovano7: Instruccion
//   instrucciones: Instruccion[] = new Array


//   bibliotecaUnsam: Ruta
//   aularioUnsam: Ruta
//   deptoAlumnosTornaviasUnsam: Ruta //2
//   laboratorioSocialesUnsam: Ruta //4
//   salaRXPirovano: Ruta //5
//   mesaAyudaThompson: Ruta
//   radiologiaThompson: Ruta
//   consultorio4Tornu: Ruta
//   rutas: Ruta[] = new Array

//   constructor() {
//     this.bibliotecaUnsam = new Ruta(1, false, 1, "Biblioteca Unsam", "mariosantos@gmail.com", new Date(2020, 5, 3), "Ruta biblioteca unsam", 1)
//     this.deptoAlumnosTornaviasUnsam = new Ruta(2, false, 1, "Departamento de alumnos del tornavias de la Unsam", "mariosantos@gmail.com", new Date(2020, 5, 4), "Ruta Departamento de alumnos del tornavias de la Unsam", 1)
//     this.aularioUnsam = new Ruta(3, false, 1, "Aulario Unsam", "lamponne@gmail.com", new Date(2020, 5, 8), "Aulario Unsam", 1)
//     this.laboratorioSocialesUnsam = new Ruta(4, false, 1, "Laboratiorio de Ciencias Sociales de la Unsam", "mariosantos@gmail.com", new Date(2020, 5, 9), "Laboratiorio de Ciencias Sociales de la Unsam", 1)
//     this.salaRXPirovano = new Ruta(5, false, 4, "Sala de rayos X", "lamponne@gmail.com", new Date(2020, 5, 1), "Ruta de sala de rayos X del hospitla Pirovano", 2)

//     this.rutas.push(this.bibliotecaUnsam)
//     this.rutas.push(this.deptoAlumnosTornaviasUnsam)
//     this.rutas.push(this.aularioUnsam)
//     this.rutas.push(this.laboratorioSocialesUnsam)
//     this.rutas.push(this.salaRXPirovano)
//     this.deptoAlumnosTornaviasUnsam1 = new Instruccion(1, 2, "Caminar", 20)
//     this.deptoAlumnosTornaviasUnsam2 = new Instruccion(2, 2, "Girar a la izquierda", 0)
//     this.deptoAlumnosTornaviasUnsam3 = new Instruccion(4, 2, "Girar a la derecha", 0)
//     this.deptoAlumnosTornaviasUnsam4 = new Instruccion(5, 2, "Caminar", 20)
//     this.deptoAlumnosTornaviasUnsam5 = new Instruccion(6, 2, "Subir escalones", 20)
//     this.deptoAlumnosTornaviasUnsam6 = new Instruccion(7, 2, "Caminar", 35)
//     this.laboratorioSociales1 = new Instruccion(8, 4, "Caminar", 20)
//     this.laboratorioSociales2 = new Instruccion(9, 4, "Girar a la derecha", 0)
//     this.laboratorioSociales3 = new Instruccion(10, 4, "Caminar", 20)
//     this.laboratorioSociales4 = new Instruccion(11, 4, "Girar a la derecha", 0)
//     this.laboratorioSociales5 = new Instruccion(12, 4, "Caminar", 5)
//     this.laboratorioSociales6 = new Instruccion(13, 4, "Girar a la izquierda", 0)
//     this.laboratorioSociales7 = new Instruccion(14, 4, "Caminar", 40)
//     this.laboratorioSociales8 = new Instruccion(15, 4, "Girar a la izquierda", 0)
//     this.laboratorioSociales9 = new Instruccion(16, 4, "Caminar", 15)
//     this.laboratorioSociales10 = new Instruccion(17, 4, "Girar a la derecha", 0)
//     this.laboratorioSociales11 = new Instruccion(18, 4, "Caminar", 75)
//     this.laboratorioSociales12 = new Instruccion(19, 4, "Girar a la derecha", 0)
//     this.laboratorioSociales13 = new Instruccion(20, 4, "Caminar", 3)
//     this.laboratorioSociales14 = new Instruccion(21, 4, "Girar a la izquierda", 0)
//     this.laboratorioSociales15 = new Instruccion(22, 4, "Caminar", 3)
//     this.laboratorioSociales16 = new Instruccion(23, 4, "Girar a la derecha", 0)
//     this.laboratorioSociales17 = new Instruccion(24, 4, "Caminar", 10)
//     this.salaRXPirovano1 = new Instruccion(25, 5, "Caminar", 10)
//     this.salaRXPirovano2 = new Instruccion(26, 5, "Girar a la izquierda", 0)
//     this.salaRXPirovano3 = new Instruccion(27, 5, "Subir ascensor", 5)
//     this.salaRXPirovano4 = new Instruccion(28, 5, "Caminar", 5)
//     this.salaRXPirovano5 = new Instruccion(29, 5, "Girar a la izquierda", 0)
//     this.salaRXPirovano6 = new Instruccion(30, 5, "Caminar", 20)
//     this.salaRXPirovano7 = new Instruccion(31, 5, "Girar a la derecha", 0)
//     this.instrucciones.push(this.deptoAlumnosTornaviasUnsam1)
//     this.instrucciones.push(this.deptoAlumnosTornaviasUnsam2)
//     this.instrucciones.push(this.deptoAlumnosTornaviasUnsam3)
//     this.instrucciones.push(this.deptoAlumnosTornaviasUnsam4)
//     this.instrucciones.push(this.deptoAlumnosTornaviasUnsam5)
//     this.instrucciones.push(this.deptoAlumnosTornaviasUnsam6)
//     this.instrucciones.push(this.laboratorioSociales1)
//     this.instrucciones.push(this.laboratorioSociales2)
//     this.instrucciones.push(this.laboratorioSociales3)
//     this.instrucciones.push(this.laboratorioSociales4)
//     this.instrucciones.push(this.laboratorioSociales5)
//     this.instrucciones.push(this.laboratorioSociales6)
//     this.instrucciones.push(this.laboratorioSociales7)
//     this.instrucciones.push(this.laboratorioSociales8)
//     this.instrucciones.push(this.laboratorioSociales9)
//     this.instrucciones.push(this.laboratorioSociales10)
//     this.instrucciones.push(this.laboratorioSociales11)
//     this.instrucciones.push(this.laboratorioSociales12)
//     this.instrucciones.push(this.laboratorioSociales13)
//     this.instrucciones.push(this.laboratorioSociales14)
//     this.instrucciones.push(this.laboratorioSociales15)
//     this.instrucciones.push(this.laboratorioSociales16)
//     this.instrucciones.push(this.laboratorioSociales17)
//     this.instrucciones.push(this.salaRXPirovano1)
//     this.instrucciones.push(this.salaRXPirovano2)
//     this.instrucciones.push(this.salaRXPirovano3)
//     this.instrucciones.push(this.salaRXPirovano4)
//     this.instrucciones.push(this.salaRXPirovano5)
//     this.instrucciones.push(this.salaRXPirovano6)
//     this.instrucciones.push(this.salaRXPirovano7)
//   }

//   async crearNuevaRuta(ruta: Ruta): Promise<any> {
//     return this.rutas.push(ruta)
//   }

//   async getRutasLocacion(idLocacion: number): Promise<any> {
//     return this.rutas.filter(ruta => ruta.idLocacion == idLocacion)
//   }

//   async getRutaById(idRuta: number) {
//     return this.rutas.find(ruta => ruta.id == idRuta)
//   }

//   async getInstruccionesRuta(idRuta: number): Promise<any> {
//     return this.instrucciones.filter(instruccion => instruccion.idRuta == idRuta)
//   }
// }