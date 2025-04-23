import z from 'zod'

const InfoStatusSchema = z.object({
    id: z.number().gt(0).nullish(),
    idCollar: z.number().gt(0).nullish(),
    idGateway: z.number().gt(0).nullish(),
    rssi: z.number(),
    snr: z.number(),
    bateria: z.number().nullish(),
});

export const infoStatusSchemaLeer = {
    id: true,
    idCollar: true,
    idGateway: true,
    rssi: true,
    snr: true,
    bateria: true,
};

export const evaluarInfoStatus = async (data) => {
    return await InfoStatusSchema.safeParseAsync(data);
}

export const evaluarInfoStatusParcial = async (data) => {
    return await InfoStatusSchema.partial().safeParseAsync(data);
}