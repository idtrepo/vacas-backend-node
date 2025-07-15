import { prisma } from '../../config/db.js';
import {geoCercasSchemaLeer} from '../schemas/geoCercas.js';

export class GeoCercaModel {
    static async obtenerElementos({ skip, take, where }) {
        try {
            const numElementos = await prisma.geoCerca.count({ where });
            const elementos = await prisma.geoCerca.findMany({
                skip, take, where, orderBy: [{ creado: 'desc' }], select: geoCercasSchemaLeer
            });
            return { numElementos, elementos };
        } catch (err) {
            throw err;
        }
    }

    static async crearElemento({ data }) {
        try {
            const elemento = await prisma.geoCerca.create({ data, select: geoCercasSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async obtenerElemento({ id }) {
        try {
            const elemento = await prisma.geoCerca.findFirstOrThrow({ where:{id}, select: geoCercasSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async editarElemento({ id, data }) {
        try {
            const elemento = await prisma.geoCerca.update({
                where:{id},
                data,
                select: geoCercasSchemaLeer
            })

            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async crearGeocercas(idSucursal, geocercas) {
        try {
            const data = geocercas.map((geo) => ({
                idSucursal,
                latitud: geo[0],
                longitud: geo[1],
            }));

            await prisma.geoCerca.createMany({ data });
        } catch (err) {
            throw err;
        }
    }

    static async eliminarGeocercasPorSucursal(idSucursal) {
        try {
            await prisma.geoCerca.deleteMany({ where: { idSucursal:{ equals: idSucursal} } });
        } catch (err) {
            throw err;
        }
    }
}