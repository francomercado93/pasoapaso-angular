import { Instruccion } from './instruccion';

export class Ruta {
    constructor(public id?: number, public esPublica?: boolean, public locacion?: string,
        public nombre?: string, public usuario?: string, public fechaCreacion?: string, public descripcion?: string, public estado?: number, public instrucciones?: Instruccion[]) {
    }
}
