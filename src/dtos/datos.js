export class DatosDTO{
    static parse = ({ns, lat,lon, pasos, temperatura, ambiente, idGateway}) => ({
        ns: ns?.toString(),
        latitud: parseFloat(lat),
        longitud: parseFloat(lon),
        pasos: Number.isNaN(parseInt(pasos)) ? null : parseInt(pasos),
        temperaturaAmb: Number.isNaN(parseFloat(ambiente)) ? null : parseFloat(ambiente),
        temperaturaCor: Number.isNaN(parseFloat(temperatura)) ? null : parseFloat(temperatura),
        idGateway: Number.isNaN(parseInt(idGateway)) ? null : parseInt(idGateway),
    })
}