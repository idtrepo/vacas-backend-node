import z from 'zod'

const ClienteSchema = z.object({
    nombre: z.string(),
});

export const clienteSchema = {
    id: true,
    nombre: true,
}

export const evaluarCliente = async (data) => {
    return await ClienteSchema.safeParseAsync(data);
}

export const evaluarClienteParcial = async (data) => {
    return await ClienteSchema.partial().safeParseAsync(data);
}