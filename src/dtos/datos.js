export class DatosDTO{
    static parse = ({ns, latitud,longitud, pasos, temperaturaAmbiente, temperaturaCorporal, idGateway}) => ({
        ns: ns?.toString(),
        latitud: Number.isNaN(parseFloat(latitud)) ? null : parseFloat(latitud),
        longitud: Number.isNaN(parseFloat(longitud)) ? null : parseFloat(longitud),
        pasos: Number.isNaN(parseInt(pasos)) ? null : parseInt(pasos),
        temperaturaAmbiente: Number.isNaN(parseFloat(temperaturaAmbiente)) ? null : parseFloat(temperaturaAmbiente),
        temperaturaCorporal: Number.isNaN(parseFloat(temperaturaCorporal)) ? null : parseFloat(temperaturaCorporal),
        idGateway: Number.isNaN(parseInt(idGateway)) ? null : parseInt(idGateway)
    })
}