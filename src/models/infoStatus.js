import { prisma } from '../../config/db.js'
import { infoStatusSchemaLeer } from '../schemas/infoStatus.js';

export class InfoStatusModel {
    static async obtenerElementos({ skip, take, where }) {
        try {
            const numElementos = await prisma.infoStatus.count({ where });
            const elementos = await prisma.infoStatus.findMany({
                skip, take, where, orderBy: [{ creado: 'desc' }], select: infoStatusSchemaLeer
            });
            return { numElementos, elementos };
        } catch (err) {
            throw err;
        }
    }

    static async crearElemento({ data }) {
        try {
            const elemento = await prisma.infoStatus.create({ data, select: infoStatusSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async obtenerElemento({ id }) {
        try {
            const elemento = await prisma.infoStatus.findFirstOrThrow({ where:{id}, select: infoStatusSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async editarElemento({ id, data }) {
        try {
            const elemento = await prisma.infoStatus.update({
                where:{id},
                data,
                select: infoStatusSchemaLeer
            })

            return elemento;
        } catch (err) {
            throw err;
        }
    }
}