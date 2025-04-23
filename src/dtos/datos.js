export class DatosDTO{
    static parse = ({ns, latitud,longitud, pasos, temperaturaAmb, temperaturaCor, idGateway}) => ({
        ns: ns?.toString(),
        latitud: Number.isNaN(parseFloat(latitud)) ? null : parseFloat(latitud),
        longitud: Number.isNaN(parseFloat(longitud)) ? null : parseFloat(longitud),
        pasos: Number.isNaN(parseInt(pasos)) ? null : parseInt(pasos),
        temperaturaAmb: Number.isNaN(parseFloat(temperaturaAmb)) ? null : parseFloat(temperaturaAmb),
        temperaturaCor: Number.isNaN(parseFloat(temperaturaCor)) ? null : parseFloat(temperaturaCor),
        idGateway: Number.isNaN(parseInt(idGateway)) ? null : parseInt(idGateway)
    })
}