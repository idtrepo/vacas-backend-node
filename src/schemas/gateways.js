import z from 'zod';

const GatewaySchema = z.object({
    id: z.number().gt(0).nullish(),
    ns: z.string().min(1).max(50),
    idCliente: z.number().gt(0).nullish(),
    idSucursal: z.number().gt(0).nullish(),//preguntar por estas 2 propiedades
});

export const gatewaySchemaLeer = {
    id: true,
    ns: true,
    idCliente: true,
    idSucursal: true,
};

export const evaluarGateway = async (data) => {
    return await GatewaySchema.safeParseAsync(data);
}

export const evaluarGatewayParcial = async (data) => {
    return await GatewaySchema.partial().safeParseAsync(data);
}