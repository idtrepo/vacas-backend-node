export class PermisosDTO{
    static parse = ({idPerfil, idAccion}) => ({
        idPerfil: Number.isNaN(parseInt(idPerfil)) ? null : parseInt(idPerfil),
        idAccion: Number.isNaN(parseInt(idAccion)) ? null : parseInt(idAccion)
    })
}