import z from 'zod'

const UsuarioSchema = z.object({
    correo: z.string().email(),
    password: z.string().nullish(),
    nombre: z.string(),
    apellido: z.string(),
    idPerfil: z.number().gt(0),
    idCliente: z.number().gt(0).nullish(),
    idSucursal: z.number().gt(0).nullish()
});

export const usuarioSchemaLeer = {
    id: true,
    correo: true,
    nombre: true,
    apellido: true,
    cliente: { select: { id: true, nombre: true } },
    sucursal: { select: { id: true, nombre: true } },
    perfil: { select: {
        id: true,
        nombre: true,
        acciones: {
            select: {
                accion: { select: { id: true, nombre: true } }
            }
        }
    } },

}

export const usuarioAutenticacionSchema = {
    id: true,
    correo: true,
    nombre: true,
    apellido: true,
    password: true,
    cliente: { select: { id: true, nombre: true } },
    sucursal: { select: { id: true, nombre: true } },
    perfil: { select: {
        id: true,
        nombre: true,
        acciones: {
            select: {
                accion: { select: { id: true, nombre: true } }
            }
        }
    } },

}

export const evaluarUsuario = async (data) => {
    return await UsuarioSchema.safeParseAsync(data);
}

export const evaluarUsuarioParcial = async (data) => {
    return await UsuarioSchema.partial().safeParseAsync(data);
}