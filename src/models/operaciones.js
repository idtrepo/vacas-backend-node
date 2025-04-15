import { prisma } from '../../config/db.js'
import { operacionSchemaLeer } from '../schemas/operaciones.js';

export class OperacionModel {
    static async obtenerElementos({ skip, take, where }) {
        try {
            const numElementos = await prisma.operacion.count({ where });
            const elementos = await prisma.operacion.findMany({
                skip, take, where, orderBy: [{ creado: 'desc' }], select: operacionSchemaLeer
            });
            return { numElementos, elementos };
        } catch (err) {
            throw err;
        }
    }

    static async crearElemento({ data }) {
        try {
            const elemento = await prisma.operacion.create({ data, select: operacionSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async obtenerElemento({ id }) {
        try {
            const elemento = await prisma.operacion.findFirstOrThrow({ where:{id}, select: operacionSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async editarElemento({ id, data }) {
        try {
            const elemento = await prisma.operacion.update({
                where:{id},
                data,
                select: operacionSchemaLeer
            })

            return elemento;
        } catch (err) {
            throw err;
        }
    }
} 