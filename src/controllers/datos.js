import { evaluarDato, evaluarDatoParcial } from "../schemas/datos";
import { DatosDTO } from "../dtos/datos";
import { MENSAJE_ERROR, MENSAJE_EXITO } from "../utils/mensajes.js";

export class DatosController {
    constructor({ model }) {
        this.model = model;
    }

    obtenerElementos = async (req, res) => {
        try {
            const { numElementos, elementos: datos } = await this.model.obtenerElementos(req);
            res.json({
                mensaje: MENSAJE_EXITO.LISTADO,
                data: datos,
                resultados: numElementos,
            });
        } catch (err) {
            res.status(404).json({ error: MENSAJE_ERROR.LISTADO });
        }
    };

    crearElemento = async (req, res) => {
        const { error, data } = await evaluarDato(req.body);

        if (error) {
            return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });
        }

        try {
            const dato = await this.model.crearElemento({
                data: DatosDTO.parse(data),
            });
            res.status(201).json({
                mensaje: MENSAJE_EXITO.CREACION,
                data: dato,
            });
        } catch (err) {
            res.status(400).json({ error: MENSAJE_ERROR.CREACION });
        }
    };

    obtenerElemento = async (req, res) => {
        const { id } = req.params;

        try {
            const dato = await this.model.obtenerElemento({ id: parseInt(id) });
            res.json({ mensaje: MENSAJE_EXITO.LISTADO_UNO, data: dato });
        } catch (err) {
            res.status(404).json({ error: MENSAJE_ERROR.LISTADO_UNO });
        }
    };
}