import { prisma } from '../../config/db.js'
import { usuarioSchemaLeer, usuarioAutenticacionSchema } from '../schemas/usuarios.js';


export class UsuarioModel {
    static async obtenerElementoActivo({ correo, estatus = true } = {}) {
        try {
            const elemento = await prisma.usuario.findFirstOrThrow({
                where: { correo, estatus },
                select: usuarioAutenticacionSchema,
            });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async obtenerElementos({ skip, take, where }) {

        try {
            const numElementos = await prisma.usuario.count({ where });
            const elementos = await prisma.usuario.findMany({
                skip, take, where, orderBy: [{ creado: 'desc' }],
                select: usuarioSchemaLeer
            });
            return { numElementos, elementos };
        } catch (err) {
            throw err;
        }
    }
    static async obtenerElemento({ id }) {
        try {
            const elemento = await prisma.usuario.findUniqueOrThrow({
                where:{id},
                select: usuarioSchemaLeer
            });
            return elemento;
        } catch (err) {
            throw err;
        }
    }
    static async crearElemento({ data }) {
        try {
            const elemento = await prisma.usuario.create({
                data,
                select: usuarioSchemaLeer
            });
            return elemento;
        } catch (err) {
            throw err;
        }
    }
    static async editarElemento({ id, data }) {
        try {
            const elemento = await prisma.usuario.update({
                where:{id},
                data,
                select: usuarioSchemaLeer
            });
            return elemento;
        } catch (err) {
            throw err;
        }
    }
}