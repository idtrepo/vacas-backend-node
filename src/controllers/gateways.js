import { evaluarGateway, evaluarGatewayParcial } from "../schemas/gateways";
import { GatewaysDTO } from "../dtos/gateways.js";
import { MENSAJE_ERROR, MENSAJE_EXITO } from "../utils/mensajes.js";

export class GatewaysController {
    constructor({model}){
        this.model = model;
    }

    obtenerElementos = async (req, res) => {
        try {
            const { numElementos, elementos: gateways } = await this.model.obtenerElementos(req);
            res.json({
                mensaje: MENSAJE_EXITO.LISTADO,
                data: gateways,
                resultados: numElementos,
            });
        } catch (err) {
            res.status(404).json({ error: MENSAJE_ERROR.LISTADO });
        }
    };

    crearElemento = async (req, res) => {
        const { error, data } = await evaluarGateway(req.body);

        if (error) {
            return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });
        }

        try {
            const gateway = await this.model.crearElemento({
                data: GatewaysDTO.parse(data),
            });
            res.status(201).json({
                mensaje: MENSAJE_EXITO.CREACION,
                data: gateway,
            });
        } catch (err) {
            res.status(400).json({ error: MENSAJE_ERROR.CREACION });
        }
    };

    obtenerElemento = async (req, res) => {
        const { id } = req.params;

        try {
            const gateway = await this.model.obtenerElemento({ id: parseInt(id) });
            res.json({ mensaje: MENSAJE_EXITO.LISTADO_UNO, data: gateway });
        } catch (err) {
            res.status(404).json({ error: MENSAJE_ERROR.LISTADO_UNO });
        }
    };

    editarElemento = async (req, res) => {
        const { id } = req.params;
        const { error, data } = await evaluarGatewayParcial(req.body);

        if (error)
            return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });

        try {
            const gateway = await this.model.editarElemento({
                id: parseInt(id),
                data: GatewaysDTO.parse(data),
            });
            res.json({
                mensaje: MENSAJE_EXITO.ACTUALIZACION,
                data: gateway,
            });
        } catch (err) {
            res.status(400).json({ error: MENSAJE_ERROR.ACTUALIZACION });
        }
    };
}