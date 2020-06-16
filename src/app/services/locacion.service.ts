import { Injectable } from '@angular/core';
import { Locacion } from '../domain/locacion';
import { Categoria } from '../domain/categoria';

export interface ILocacionService {
  getLocaciones(): Promise<any>
  getLocacionesByName(nombre: string): Promise<any>
  crearLocacion(locacion: Locacion): Promise<any>
  getCategorias(): Promise<any>
  getLocacionesCategoria(idCategoria: number): Promise<any>
}

@Injectable({
  providedIn: 'root'
})

export class LocacionService implements ILocacionService {

  constructor() { }

  getLocacionesCategoria(idCategoria: number): Promise<any> {
    throw new Error("Method not implemented.");
  }

  getCategorias(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  crearLocacion(locacion: Locacion): Promise<any> {
    throw new Error("Method not implemented.");
  }

  getLocaciones(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getLocacionesByName(nombre: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

@Injectable({
  providedIn: 'root'
})
export class StubLocacionService implements ILocacionService {

  locaciones: Locacion[] = new Array
  unsam: Locacion
  unlam: Locacion
  untref: Locacion
  hospitalPirovano: Locacion
  hospitalTornu: Locacion
  hospitalThompson: Locacion
  categorias: Categoria[] = [
    // { id: 0, nombre: 'Por favor seleccione el tipo de locación' },
    { id: 1, nombre: 'Favoritos' },
    { id: 2, nombre: 'Hospitales' },
    { id: 3, nombre: 'Universidades' },
    { id: 4, nombre: 'Museos' }
  ]

  constructor() {
    this.unsam = new Locacion(1, "Universidad Nacional de San Martin", "Martin de Irigoyen 3100", "San Martin", "Buenos Aires", 3, false, "mariosantos@gmail.com")
    this.unlam = new Locacion(2, "Universidad Nacional de La Matanza", "Pres. Juan Domingo Peron 2335", "La Matanza", "Buenos Aires", 3, false, "mariosantos@gmail.com")
    this.untref = new Locacion(3, "Universidad Nacional de Tres de Febrero", "Valentin Gomez 4772", "Tres de Febrero", "Buenos Aires", 3, false, "mariosantos@gmail.com")
    this.hospitalPirovano = new Locacion(4, "Hospital Pirovano", "Av. Monroe 3555", "CABA", "CABA", 2, false, "lamponne@gmail.com")
    this.hospitalTornu = new Locacion(5, "Hospital Tornu", "Combatientes de Malvinas 3002", "CABA", "CABA", 2, false, "mariosantos@gmail.com")
    this.hospitalThompson = new Locacion(6, "Hospital Thompson", "Avellaneda 33", "San Martin", "Buenos Aires", 2, false, "lamponne@gmail.com")
    this.locaciones.push(this.unsam)
    this.locaciones.push(this.unlam)
    this.locaciones.push(this.untref)
    this.locaciones.push(this.hospitalPirovano)
    this.locaciones.push(this.hospitalTornu)
    this.locaciones.push(this.hospitalThompson)
  }
  async getLocacionesCategoria(idCategoria: number): Promise<any> {
    return this.locaciones.filter(locacion => locacion.tipoLocacion == idCategoria)
  }
  async getCategorias(): Promise<any> {
    return this.categorias
  }

  async crearLocacion(locacion: Locacion): Promise<any> {
    return this.locaciones.push(locacion)
  }

  async getLocaciones(): Promise<any> {
    return this.locaciones
  }

  async getLocacionesByName(nombre: string): Promise<any> {
    return this.locaciones.filter(locacion => locacion.nombre.includes(nombre))
  }
}