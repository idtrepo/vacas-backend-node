import z from 'zod';

const GeoCercaSchema = z.object({
    latitud: z.number(),
    longitud: z.number(),
    idCliente: z.number().gt(0).nullish(),
    idSucursal: z.number().gt(0).nullish(),
});

export const geoCercasSchemaLeer = {
    id: true,
    latitud: true,
    longitud: true,
    idCliente: true,
    idSucursal: true,
};

export const evaluarGeoCerca = async (data) => {
    return await GeoCercaSchema.safeParseAsync(data);
}

export const evaluarGeoCercaParcial = async (data) => {
    return await GeoCercaSchema.partial().safeParseAsync(data);
}