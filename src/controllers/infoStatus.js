import { evaluarInfoStatus, evaluarInfoStatusParcial } from "../schemas/infoStatus";
import { InfoStatusDTO } from "../dtos/infoStatus";
import { MENSAJE_ERROR, MENSAJE_EXITO } from "../utils/mensajes.js";

export class InfoStatusController{
    constructor({model}) {
        this.model = model;
    }

    obtenerElementos = async (req, res) => {
        try {
            const { numElementos, elementos: infoStatus } = await this.model.obtenerElementos(req);
            res.json({
                mensaje: MENSAJE_EXITO.LISTADO,
                data: infoStatus,
                resultados: numElementos,
            });
        } catch (err) {
            res.status(404).json({ error: MENSAJE_ERROR.LISTADO });
        }
    };

    crearElemento = async (req, res) => {
        const { error, data } = await evaluarInfoStatus(req.body);

        if (error) {
            return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });
        }

        try {
            const infoStatus = await this.model.crearElemento({
                data: InfoStatusDTO.parse(data),
            });
            res.status(201).json({
                mensaje: MENSAJE_EXITO.CREACION,
                data: infoStatus,
            });
        } catch (err) {
            res.status(400).json({ error: MENSAJE_ERROR.CREACION });
        }
    };

    obtenerElemento = async (req, res) => {
        const { id } = req.params;

        try {
            const infoStatus = await this.model.obtenerElemento({ id: parseInt(id) });
            res.json({ mensaje: MENSAJE_EXITO.LISTADO_UNO, data: infoStatus });
        } catch (err) {
            res.status(404).json({ error: MENSAJE_ERROR.LISTADO_UNO });
        }
    };

    editarElemento = async (req, res) => {
        const { id } = req.params;
        const { error, data } = await evaluarInfoStatusParcial(req.body);

        if (error)
            return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });

        try {
            const infoStatus = await this.model.editarElemento({
                id: parseInt(id),
                data: InfoStatusDTO.parse(data),
            });
            res.json({
                mensaje: MENSAJE_EXITO.ACTUALIZACION,
                data: infoStatus,
            });
        } catch (err) {
            res.status(404).json({ error: MENSAJE_ERROR.ACTUALIZACION });
        }
    };
}