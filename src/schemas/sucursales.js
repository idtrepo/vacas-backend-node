import z from 'zod'

const SucursalSchema = z.object({
    nombre: z.string(),
    idCliente: z.number().gt(0),
});

export const sucursalSchema = {
    id: true,
    nombre: true,
    cliente: {
        select: {
            id: true,
            nombre: true
        }
    },
    estatus: true
}

export const evaluarSucursal = async (data) => {
    return await SucursalSchema.safeParseAsync(data);
}

export const evaluarSucursalParcial = async (data) => {
    return await SucursalSchema.partial().safeParseAsync(data);
}