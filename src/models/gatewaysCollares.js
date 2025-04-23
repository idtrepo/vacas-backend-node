import { prisma } from '../../config/db.js'
import { gatewaysCollaresSchemaLeer } from '../schemas/gatewaysCollares.js';

export class GatewaysCollaresModel {
    static async obtenerElementos({ skip, take, where }) {
        try {
            const numElementos = await prisma.gatewaysCollares.count({ where });
            const elementos = await prisma.gatewaysCollares.findMany({
                skip, take, where, orderBy: [{ creado: 'desc' }], select: gatewaysCollaresSchemaLeer
            });
            return { numElementos, elementos };
        } catch (err) {
            throw err;
        }
    }

    static async crearElemento({ data }) {
        try {
            const elemento = await prisma.gatewaysCollares.create({ data, select: gatewaysCollaresSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async obtenerElemento({ id }) {
        try {
            const elemento = await prisma.gatewaysCollares.findFirstOrThrow({ where:{id}, select: gatewaysCollaresSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async editarElemento({ id, data }) {
        try {
            const elemento = await prisma.gatewaysCollares.update({
                where:{id},
                data,
                select: gatewaysCollaresSchemaLeer
            })

            return elemento;
        } catch (err) {
            throw err;
        }
    }
}