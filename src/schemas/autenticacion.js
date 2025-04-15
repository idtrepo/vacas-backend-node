import z from 'zod'

const CredencialesSchema = z.object({
    correo: z.string().email(),
    password: z.string()
});

const RefreshSchema = z.object({
    refresh: z.string()
});

export const evaluarCredenciales = async (data) => {
    return await CredencialesSchema.safeParseAsync(data);
}

export const evaluarRefresh = async (data) => {
    return await RefreshSchema.safeParseAsync(data);
}