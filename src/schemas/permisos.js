import z from 'zod'

const PermisoSchema = z.object({
    idPerfil: z.number().gt(0),
    idAccion: z.number().gt(0)
});

export const permisoSchemaLeer = {
    id:true,
    perfil: { select: { id: true, nombre: true } },
    accion: { select: { id: true, nombre: true } }
}

export const evaluarPermiso = async (data) => {
    return await PermisoSchema.safeParseAsync(data);
}

export const evaluarPermisoParcial = async (data) => {
    return await PermisoSchema.partial().safeParseAsync(data);
}