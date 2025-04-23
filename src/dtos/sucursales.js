export class SucursalesDTO{
    static parse = ({nombre,idCliente}) => ({
        nombre: nombre?.toString(),
        idCliente: Number.isNaN(parseInt(idCliente)) ? null : parseInt(idCliente)
    });
}