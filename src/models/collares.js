import { prisma } from '../../config/db.js'
import { collaresSchemaLeer } from '../schemas/collares.js';

export class CollaresModel {
    static async obtenerElementos({ skip, take, where }) {
        try {
            const numElementos = await prisma.collares.count({ where });
            const elementos = await prisma.collares.findMany({
                skip, take, where, orderBy: [{ creado: 'desc' }], select: collaresSchemaLeer
            });
            return { numElementos, elementos };
        } catch (err) {
            throw err;
        }
    }

    static async crearElemento({ data }) {
        try {
            const elemento = await prisma.collares.create({ data, select: collaresSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async obtenerElemento({ id }) {
        try {
            const elemento = await prisma.collares.findFirstOrThrow({ where:{id}, select: collaresSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async editarElemento({ id, data }) {
        try {
            const elemento = await prisma.collares.update({
                where:{id},
                data,
                select: collaresSchemaLeer
            })

            return elemento;
        } catch (err) {
            throw err;
        }
    }
}