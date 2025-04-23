import { prisma } from '../../config/db.js';
import { gatewaySchemaLeer } from '../schemas/gateways.js';

export class GatewayModel {
    static async obtenerElementos({ skip, take, where }) {
        try {
            const numElementos = await prisma.gateway.count({ where });
            const elementos = await prisma.gateway.findMany({
                skip, take, where, orderBy: [{ creado: 'desc' }], select: gatewaySchemaLeer
            });
            return { numElementos, elementos };
        } catch (err) {
            throw err;
        }
    }

    static async crearElemento({ data }) {
        try {
            const elemento = await prisma.gateway.create({ data, select: gatewaySchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async obtenerElemento({ id }) {
        try {
            const elemento = await prisma.gateway.findFirstOrThrow({ where:{id}, select: gatewaySchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async editarElemento({ id, data }) {
        try {
            const elemento = await prisma.gateway.update({
                where:{id},
                data,
                select: gatewaySchemaLeer
            })

            return elemento;
        } catch (err) {
            throw err;
        }
    }
}