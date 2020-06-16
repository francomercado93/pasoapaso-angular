export class Ruta {
    constructor(public id: number, public esPublica: boolean, public idLocacion: number,
        public nombre: string, public usuario: string, public fechaCreacion: Date, public descripcion: string, public idEstado: number) {
    }
}
