import z from 'zod'

const OperacionSchema = z.object({
    nombre: z.string()
});

export const operacionSchemaLeer = {
    id: true,
    nombre: true
};

export const evaluarOperacion = async (data) => {
    return await OperacionSchema.safeParseAsync(data);
}