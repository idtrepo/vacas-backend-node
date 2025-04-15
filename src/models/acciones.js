import { prisma } from '../../config/db.js'
import { accionSchemaLeer } from '../schemas/acciones.js';

export class AccionModel {
    static async obtenerElementos({ skip, take, where }) {
        try {
            const numElementos = await prisma.accion.count({ where });
            const elementos = await prisma.accion.findMany({
                skip, take, where, orderBy: [{ creado: 'desc' }], select: accionSchemaLeer
            });
            return { numElementos, elementos };
        } catch (err) {
            throw err;
        }
    }

    static async crearElemento({ data }) {
        try {
            const elemento = await prisma.accion.create({ data, select: accionSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async obtenerElemento({ id }) {
        try {
            const elemento = await prisma.accion.findFirstOrThrow({ where:{id}, select: accionSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async editarElemento({ id, data }) {
        try {
            const elemento = await prisma.accion.update({
                where:{id},
                data,
                select: accionSchemaLeer
            })

            return elemento;
        } catch (err) {
            throw err;
        }
    }
} 