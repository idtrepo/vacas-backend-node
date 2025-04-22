import { prisma } from '../../config/db.js'
import { permisoSchemaLeer } from '../schemas/permisos.js';

export class PermisoModel {
    static async obtenerElementos({ skip, take, where }) {
        try {
            const numElementos = await prisma.permiso.count({ where });
            const elementos = await prisma.permiso.findMany({
                skip, take, where, orderBy: [{ creado: 'desc' }], select: permisoSchemaLeer
            });
            return { numElementos, elementos };
        } catch (err) {
            throw err;
        }
    }

    static async crearElemento({ data }) {
        try {
            const elemento = await prisma.permiso.create({ data, select: permisoSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async obtenerElemento({ id }) {
        try {
            const elemento = await prisma.permiso.findFirstOrThrow({ where:{id}, select: permisoSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async editarElemento({ id, data }) {
        try {
            const elemento = await prisma.permiso.update({
                where:{id},
                data,
                select: permisoSchemaLeer
            })
            return elemento;
        } catch (err) {
            throw err;
        }
    }
}