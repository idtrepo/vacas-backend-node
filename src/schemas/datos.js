import z from 'zod'

const DatoSchema = z.object({
    id: z.number().gt(0).nullish(),
    idGateway: z.number().gt(0).nullish(),
    ns: z.string(),
    latitud: z.number(),
    longitud: z.number(),
    pasos: z.number(),
    temperaturaAmb: z.number(),
    temperaturaCor: z.number(),
});

export const datosSchemaLeer = {
    id: true,
    ns:true,
    latitud: true,
    longitud: true,
    pasos: true,
    temperaturaAmb: true,
    temperaturaCor: true,
    creado: true,
};

export const evaluarDato = async (data) => {
    return await DatoSchema.safeParseAsync(data);
}

export const evaluarDatoParcial = async (data) => {
    return await DatoSchema.partial().safeParseAsync(data);
}