import z from 'zod';

const GeoCercaSchema = z.object({
    latitud: z.number(),
    longitud: z.number(),
    idSucursal: z.number().gt(0).nullish(),
});

export const geoCercasSchemaLeer = {
    id: true,
    latitud: true,
    longitud: true,
    idSucursal: true,
};

export const evaluarGeoCerca = async (data) => {
    return await GeoCercaSchema.safeParseAsync(data);
}

export const evaluarGeoCercaParcial = async (data) => {
    return await GeoCercaSchema.partial().safeParseAsync(data);
}