export class GeoCercaDTO{
    static parse = ({ latitud, longitud, idCliente, idSucursal }) => ({
        latitud: Number.isNaN(parseFloat(latitud)) ? null : parseFloat(latitud),
        longitud: Number.isNaN(parseFloat(longitud)) ? null : parseFloat(longitud),
        idCliente: Number.isNaN(parseInt(idCliente)) ? null : parseInt(idCliente),
        idSucursal: Number.isNaN(parseInt(idSucursal)) ? null : parseInt(idSucursal)
    })
}