export class Usuario {
    constructor(public usuario?: string, public alias?: string, public nombre?: string,
        public apellido?: string, public password?: string, public esVidente?: boolean, public tipoUsuario?: number) {
    }
}
