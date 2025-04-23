import { prisma } from '../../config/db.js'
import { gatewaysCollaresSchemaLeer } from '../schemas/gatewaysCollares.js';

export class GatewaysCollaresModel {
    static async obtenerElementos({ skip, take, where }) {
        try {
            const numElementos = await prisma.gatewayCollar.count({ where });
            const elementos = await prisma.gatewayCollar.findMany({
                skip, take, where, orderBy: [{ creado: 'desc' }], select: gatewaysCollaresSchemaLeer
            });
            return { numElementos, elementos };
        } catch (err) {
            throw err;
        }
    }

    static async crearElemento({ data }) {
        try {
            const elemento = await prisma.gatewayCollar.create({ data, select: gatewaysCollaresSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async obtenerElemento({ id }) {
        try {
            const elemento = await prisma.gatewayCollar.findFirstOrThrow({ where:{id}, select: gatewaysCollaresSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async editarElemento({ id, data }) {
        try {
            const elemento = await prisma.gatewayCollar.update({
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