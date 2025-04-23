import { evaluarGatewayCollar, evaluarGatewayCollarParcial } from "../schemas/gatewaysCollares";
import { GatewaysCollaresDTO } from "../dtos/gatewaysCollares";
import { MENSAJE_ERROR, MENSAJE_EXITO } from "../utils/mensajes.js";

export class GatewaysCollaresController{
    constructor({model}) {
        this.model = model;
    }

    obtenerElementos = async (req, res) => {
        try {
            const { numElementos, elementos: gatewaysCollares } = await this.model.obtenerElementos(req);
            res.json({
                mensaje: MENSAJE_EXITO.LISTADO,
                data: gatewaysCollares,
                resultados: numElementos,
            });
        } catch (err) {
            res.status(404).json({ error: MENSAJE_ERROR.LISTADO });
        }
    };

    crearElemento = async (req, res) => {
        const { error, data } = await evaluarGatewayCollar(req.body);

        if (error) {
            return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });
        }

        try {
            const gatewayCollar = await this.model.crearElemento({
                data: GatewaysCollaresDTO.parse(data),
            });
            res.status(201).json({
                mensaje: MENSAJE_EXITO.CREACION,
                data: gatewayCollar,
            });
        } catch (err) {
            res.status(400).json({ error: MENSAJE_ERROR.CREACION });
        }
    };

    obtenerElemento = async (req, res) => {
        const { id } = req.params;

        try {
            const gatewayCollar = await this.model.obtenerElemento({ id: parseInt(id) });
            res.json({ mensaje: MENSAJE_EXITO.LISTADO_UNO, data: gatewayCollar });
        } catch (err) {
            res.status(404).json({ error: MENSAJE_ERROR.LISTADO_UNO });
        }
    };

    editarElemento = async (req, res) => {
        const { id } = req.params;
        const { error, data } = await evaluarGatewayCollarParcial(req.body);

        if (error)
            return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });

        try {
            const gatewayCollar = await this.model.editarElemento({
                id: parseInt(id),
                data: GatewaysCollaresDTO.parse(data),
            });
            res.json({
                mensaje: MENSAJE_EXITO.ACTUALIZACION,
                data: gatewayCollar,
            });
        } catch (err) {
            res.status(404).json({ error: MENSAJE_ERROR.ACTUALIZACION });
        }
    };
}