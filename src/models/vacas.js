import { prisma } from '../../config/db.js'
import { vacasSchemaLeer } from '../schemas/vacas.js';

export class VacasModel {
    static async obtenerElementos({ skip, take, where }) {
        try {
            const numElementos = await prisma.vacas.count({ where });
            const elementos = await prisma.vacas.findMany({
                skip, take, where, orderBy: [{ creado: 'desc' }], select: vacasSchemaLeer
            });
            return { numElementos, elementos };
        } catch (err) {
            throw err;
        }
    }

    static async crearElemento({ data }) {
        try {
            const elemento = await prisma.vacas.create({ data, select: vacasSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async obtenerElemento({ id }) {
        try {
            const elemento = await prisma.vacas.findFirstOrThrow({ where:{id}, select: vacasSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async editarElemento({ id, data }) {
        try {
            const elemento = await prisma.vacas.update({
                where:{id},
                data,
                select: vacasSchemaLeer
            })

            return elemento;
        } catch (err) {
            throw err;
        }
    }
}