import { prisma } from "../../config/db.js";
import { categoriaSchemaLeer } from "../schemas/categorias.js";

export class CategoriaModel {
    static async obtenerElementos({ skip, take, where }) {
        try {
            const numElementos = await prisma.categoria.count({ where });
            const elementos = await prisma.categoria.findMany({
                skip, take, where, orderBy: [{ creado: 'desc' }], select: categoriaSchemaLeer
            });
            return { numElementos, elementos };
        } catch (err) {
            throw err;
        }
    }

    static async crearElemento({ data }) {
        try {
            const elemento = await prisma.categoria.create({ data, select: categoriaSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async obtenerElemento({ id }) {
        try {
            const elemento = await prisma.categoria.findUniqueOrThrow({ where:{id}, select: categoriaSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }

    static async editarElemento({ id, data }) {
        try {
            const elemento = await prisma.categoria.update({ where:{id}, data, select: categoriaSchemaLeer });
            return elemento;
        } catch (err) {
            throw err;
        }
    }
}