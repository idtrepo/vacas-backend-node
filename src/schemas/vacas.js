import z from 'zod';

const VacasSchema = z.object({
    id: z.number().gt(0).nullish(),
    nombre: z.string().min(1).max(50),
    fechaNacimiento: z.string(),
    peso: z.number().gt(0),
    idCliente: z.number().gt(0).nullish(),
    idSucursal: z.number().gt(0).nullish(),
    idCollar: z.number().gt(0).nullish(),
});

export const vacasSchemaLeer = {
    id: true,
    nombre: true,
    fechaNacimiento: true,
    peso: true,
    collar: { select: { id: true, ns: true } },
    sucursal: { select: { id: true, nombre: true } },
    cliente: { select: { id: true, nombre: true } },
};

export const vacasUbicacionSchemaLeer = {
    id: true,
    nombre: true,
    peso:true,
    collar: { select: { id: true, ns: true,
        gateways:{ orderBy: {
            creado: 'desc' ,
        },
        where:{ estatus: true},
        select:{
            gateway:{
                select:{
                    datos:{
                        orderBy:{
                            creado:'desc'
                        },
                        where:{
                            ns:{ equals: undefined },
                        },
                        select:{
                            ns:true,
                            latitud:true,
                            longitud:true,
                            temperaturaAmb:true,
                            temperaturaCor:true,
                            pasos:true,
                        }
                    }
                }
            }
        }
    }
     } },
    sucursal: { select: { id: true, nombre: true } },
};

export const evaluarVaca = async (data) => {
    return await VacasSchema.safeParseAsync(data);
}

export const evaluarVacaParcial = async (data) => {
    return await VacasSchema.partial().safeParseAsync(data);
}