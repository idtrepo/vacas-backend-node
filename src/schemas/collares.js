import z from 'zod';

const CollaresSchema = z.object({
    id: z.number().gt(0).nullish(),
    ns: z.string().min(1).max(50),
});

export const collaresSchemaLeer = {
    id: true,
    ns: true,
    vacas: { select: { id: true, nombre: true } },
};

export const evaluarCollar = async (data) => {
    return await CollaresSchema.safeParseAsync(data);
}

export const evaluarCollarParcial = async (data) => {
    return await CollaresSchema.partial().safeParseAsync(data);
}