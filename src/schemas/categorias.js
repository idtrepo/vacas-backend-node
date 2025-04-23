import z from 'zod'

const CategoriaSchema = z.object({
    nombre: z.string()
});

export const categoriaSchemaLeer = {
    id: true,
    nombre: true
}

export const evaluarCategoria = async (data) => {
    return await CategoriaSchema.safeParseAsync(data);
}

export const evaluarCategoriaParcial = async (data) => {
    return await CategoriaSchema.partial().safeParseAsync(data);
}