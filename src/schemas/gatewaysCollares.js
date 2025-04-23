import z from 'zod';

const GatewayCollarSchema = z.object({
    id: z.number().gt(0).nullish(),
    idCollar: z.number().gt(0).nullish(),
    idGateway: z.number().gt(0).nullish(),//preguntar por esta propiedad
});

export const GatewayCollarSchemaLeer = {
    id: true,
    idCollar: true,
    idGateway: true,
}

export const evaluarGatewayCollar = async (data) => {
    return await GatewayCollarSchema.safeParseAsync(data);
}

export const evaluarGatewayCollarParcial = async (data) => {
    return await GatewayCollarSchema.partial().safeParseAsync(data);
}