export class VacasDTO{
    static parse = ({nombre, idCollar, fechaNacimiento, peso, idCliente, idSucursal}) => ({
        nombre: nombre?.toString(),
        idCollar: Number.isNaN(parseInt(idCollar)) ? null : parseInt(idCollar),
        //fecha de nacimiento a datetime
        fechaNacimiento: fechaNacimiento ? new Date(fechaNacimiento) : null,
        //peso a float
        peso: Number.isNaN(parseFloat(peso)) ? null : parseFloat(peso),
        idCliente: Number.isNaN(parseInt(idCliente)) ? null : parseInt(idCliente),  
        idSucursal: Number.isNaN(parseInt(idSucursal)) ? null : parseInt(idSucursal)
    });
}