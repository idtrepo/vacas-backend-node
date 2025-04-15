import { prisma } from '../../config/db.js'
import { clienteSchema } from '../schemas/clientes.js';


export class ClienteModel {
    static async obtenerElementos({ skip, take, where }) {
        try {
            const numElementos = await prisma.cliente.count({ where });
            const elementos = await prisma.cliente.findMany({
                skip, take, where, orderBy: [{ creado: 'desc' }], select: clienteSchema
            });
            return { numElementos, elementos };
        } catch (err) {
            throw err;
        }
    }
    static async obtenerElemento({ id }) {
        try {
            const elemento = await prisma.cliente.findUniqueOrThrow({
                where:{id},
                select: clienteSchema
            });
            return elemento;
        } catch (err) {
            throw err;
        }
    }
    static async crearElemento({ data }) {
        try {
            const elemento = await prisma.cliente.create({ 
                data,
                select: clienteSchema 
            });
            return elemento;
        } catch (err) {
            throw err;
        }
    }
    static async editarElemento({ id, data }) {
        try {
            const elemento = await prisma.cliente.update({
                where:{id},
                data,
                select: clienteSchema
            });
            return elemento;
        } catch (err) {
            throw err;
        }
    }
}