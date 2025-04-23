import z from 'zod'

const DatoSchema = z.object({
    id: z.number().gt(0).nullish(),
    idGateway: z.number().gt(0).nullish(),
    latitud: z.number(),
    longitud: z.number(),
    pasos: z.number(),
    temperaturaAmbiente: z.number(),
    temperaturaCorporal: z.number(),
});

export const datosSchemaLeer = {
    id: true,
    idGateway: true,
    latitud: true,
    longitud: true,
    pasos: true,
    temperaturaAmbiente: true,
    temperaturaCorporal: true
};

export const evaluarDato = async (data) => {
    return await DatoSchema.safeParseAsync(data);
}

export const evaluarDatoParcial = async (data) => {
    return await DatoSchema.partial().safeParseAsync(data);
}