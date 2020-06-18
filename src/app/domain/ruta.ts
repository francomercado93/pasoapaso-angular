export class Ruta {
    constructor(public id: number, public esPublica: Boolean, public locacion: string,
        public nombre: string, public usuario: string, public fechaCreacion: Date, public descripcion: string, public estado: string) {
    }
}
