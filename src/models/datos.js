import { prisma } from '../../config/db.js'
import { datosSchemaLeer } from '../schemas/datos.js';

export class DatosModel {
    static async obtenerElementos({ skip, take, where }) {
        try {
            const numElementos = await prisma.datos.count({ where });
            const elementos = await prisma.datos.findMany({
                skip, take, where, orderBy: [{ creado: 'desc' }], select: datosSchemaLeer
            });
            return { numElementos, elementos };
        } catch (err) {
            throw err;
        }
    }

    static async crearElemento({ data }) {
        try {
            const elemento = await prisma.datos.create({ data, select: datosSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async obtenerElemento({ id }) {
        try {
            const elemento = await prisma.datos.findFirstOrThrow({ where:{id}, select: datosSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async editarElemento({ id, data }) {
        try {
            const elemento = await prisma.datos.update({
                where:{id},
                data,
                select: datosSchemaLeer
            })

            return elemento;
        } catch (err) {
            throw err;
        }
    }
}