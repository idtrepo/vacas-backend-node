import { prisma } from '../../config/db.js'
import { sucursalSchema } from '../schemas/sucursales.js';

export class SucursalModel {
    static async obtenerElementos({ skip, take, where }) {
        try {
            const numElementos = await prisma.sucursal.count({ where });
            const elementos = await prisma.sucursal.findMany({
                skip, take, where, orderBy: [{ creado: 'desc' }], select: sucursalSchema
            });
            return { numElementos, elementos }
        } catch (err) {
            throw err;
        }
    }
    static async obtenerElemento({ id }) {
        try {
            const registro = await prisma.sucursal.findUniqueOrThrow({
                where:{id},
                select: sucursalSchema
            });
            return registro;
        } catch (err) {
            throw err;
        }
    }
    static async crearElemento({ data }) {
        try {
            const registro = await prisma.sucursal.create({ 
                data,
                select: sucursalSchema
            });
            return registro;
        } catch (err) {
            throw err;
        }
    }
    static async editarElemento({ id, data }) {
        try {
            const registro = await prisma.sucursal.update({
                where:{id},
                data,
                select: sucursalSchema,
            });
            return registro;
        } catch (err) {
            throw err;
        }
    }
}