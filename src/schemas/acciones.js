import z from 'zod'

const AccionSchema = z.object({
    nombre: z.string(),
    idOperacion: z.number().gt(0),
    idCategoria: z.number().gt(0)
});

export const accionSchemaLeer = {
    id: true,
    nombre: true,
    operacion:{
        select:{
            id:true,
            nombre:true
        }
    },
    categoria:{
        select:{
            id:true,
            nombre:true
        }
    }
}

export const evaluarAccion = async (data) => {
    return await AccionSchema.safeParseAsync(data);
}

export const evaluarAccionParcial = async (data) => {
    return await AccionSchema.partial().safeParseAsync(data);
}