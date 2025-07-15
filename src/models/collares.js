import { prisma } from '../../config/db.js'
import { collaresSchemaLeer } from '../schemas/collares.js';

export class CollarModel {
    static async obtenerElementosLibres({ skip, take }) {
        try {
            //obtener todos los collares que no esten asignados a una vaca
            const where = {
                vaca: {
                    is: null
                }
            };
            const numElementos = await prisma.collar.count({ where });
            const elementos = await prisma.collar.findMany({
                skip, take, where, orderBy: [{ creado: 'desc' }], select: collaresSchemaLeer
            });
            return { numElementos, elementos };
        } catch (err) {
            throw err;
        }
    }

    static async obtenerElementos({ skip, take, where}) {
        try {
            const numElementos = await prisma.collar.count({ where });
            const elementos = await prisma.collar.findMany({
                skip, take, where, orderBy: [{ creado: 'desc' }], select: collaresSchemaLeer
            });
            return { numElementos, elementos };
        } catch (err) {
            throw err;
        }
    }

    static async crearElemento({ data }) {
        try {
            const elemento = await prisma.collar.create({ data, select: collaresSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async obtenerElemento({ id }) {
        try {
            const elemento = await prisma.collar.findFirstOrThrow({ where:{id}, select: collaresSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async editarElemento({ id, data }) {
        try {
            const elemento = await prisma.collar.update({
                where:{id},
                data,
                select: collaresSchemaLeer
            })

            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async obtenerIdCollar({identificador}){
        try {
            const elemento = await prisma.collar.findFirstOrThrow({ where:{ns:identificador}, select: collaresSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }
}