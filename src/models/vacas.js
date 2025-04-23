import { prisma } from '../../config/db.js'
import { vacasSchemaLeer, vacasUbicacionSchemaLeer } from '../schemas/vacas.js';

export class VacaModel {
    static async obtenerElementos({ skip, take, where }) {
        try {
            const numElementos = await prisma.vaca.count({ where });
            const elementos = await prisma.vaca.findMany({
                skip, take, where, orderBy: [{ creado: 'desc' }], select: vacasSchemaLeer
            });
            return { numElementos, elementos };
        } catch (err) {
            throw err;
        }
    }

    static async crearElemento({ data }) {
        try {
            const elemento = await prisma.vaca.create({ data, select: vacasSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async obtenerElemento({ id }) {
        try {
            const elemento = await prisma.vaca.findFirstOrThrow({ where:{id}, select: vacasSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async editarElemento({ id, data }) {
        try {
            const elemento = await prisma.vaca.update({
                where:{id},
                data,
                select: vacasSchemaLeer
            })

            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async obtenerUbicaciones({ skip, take, where }) {
        try{
            const numElementos = await prisma.vaca.count({ where });
            const elementos = await prisma.vaca.findMany({
                skip, take, where, orderBy: [{ creado: 'desc' }], select: vacasUbicacionSchemaLeer
            });
        
            return { numElementos, elementos };
        } catch (err){
            throw err;
        }
    }

    static async obtenerUbicacion({ id }) {
        try {
            const elemento = await prisma.vaca.findFirstOrThrow({ where:{id}, select: vacasUbicacionSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }
}