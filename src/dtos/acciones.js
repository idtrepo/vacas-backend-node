export class AccionDTO{
    static parse = ({nombre, idOperacion, idCategoria}) => ({
        nombre: nombre?.toString(),
        idOperacion: Number.isNaN(parseInt(idOperacion)) ? null : parseInt(idOperacion),
        idCategoria: Number.isNaN(parseInt(idCategoria)) ? null : parseInt(idCategoria)
    })
}