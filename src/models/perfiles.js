import { prisma } from '../../config/db.js'
import { perfilSchemaLeer } from '../schemas/perfiles.js';

export class PerfilModel {
    static async obtenerElementos({ skip, take, where }) {
        try {
            const numElementos = await prisma.perfil.count({ where });
            const elementos = await prisma.perfil.findMany({
                skip, take, where, orderBy: [{ creado: 'desc' }], select: perfilSchemaLeer
            });
            return { numElementos, elementos };
        } catch (err) {
            throw err;
        }
    }
    static async obtenerElemento({ id }) {
        try {
            const elemento = await prisma.perfil.findUniqueOrThrow({
                where:{id},
                select: perfilSchemaLeer
            });
            return elemento;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    static async crearElemento({ data }) {
        try {
            const elemento = await prisma.perfil.create({ data, select: perfilSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }
    static async editarElemento({ id, data }) {
        try {
            const {acciones} = data;
            !acciones ? await prisma.perfil.update({
                where:{id},
                data:{
                    nombre:data.nombre,
                },
                select: perfilSchemaLeer
            }) :  await prisma.$transaction([
                prisma.perfil.update({
                    where:{id},
                    data:{
                        nombre:data.nombre,
                    },
                    select: perfilSchemaLeer
                }),
                    ...acciones.map((accion) =>
                        prisma.permiso.upsert({
                            where: { idPerfil_idAccion: { idPerfil: id, idAccion: accion.idAccion } },
                            update: {
                                estatus: accion.estatus,
                            },
                            create: { idPerfil: id, idAccion: accion.idAccion }
                        })
                    ),
            ])

            const elemento = await prisma.perfil.findUniqueOrThrow({
                where:{id},
                select: perfilSchemaLeer
            });
     
            return elemento;
        } catch (err) {
            throw err;
        }
    }
}