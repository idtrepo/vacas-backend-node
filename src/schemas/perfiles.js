import z from 'zod'

const PerfilSchema = z.object({
    nombre: z.string(),
    acciones: z.array(z.object({
        idAccion: z.number().gt(0),
        estatus: z.boolean()
    })).optional()
});

export const perfilSchemaLeer = {
    id: true,
    nombre: true,
}

export const evaluarPerfil = async (data) => {
    return await PerfilSchema.safeParseAsync(data);
}

export const evaluarPerfilParcial = async (data) => {
    return await PerfilSchema.partial().safeParseAsync(data);
}