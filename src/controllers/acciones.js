import { evaluarAccion, evaluarAccionParcial } from "../schemas/acciones.js";
import { MENSAJE_ERROR, MENSAJE_EXITO } from "../utils/mensajes.js";
import { AccionDTO } from "../dtos/acciones.js";

export class AccionesController {
  constructor({ model }) {
    this.model = model;
  }

  obtenerElementos = async (req, res) => {
    try {
      const { elementos: acciones, numElementos } =
        await this.model.obtenerElementos(req);
      res.json({
        mensaje: MENSAJE_EXITO.LISTADO,
        data: acciones,
        resultados: numElementos,
      });
    } catch (err) {
      res.status(400).json({ error: MENSAJE_ERROR.LISTADO_UNO });
    }
  };

  crearElemento = async (req, res) => {
    const { error, data } = await evaluarAccion(req.body);

    if (error) {
      return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });
    }

    try {
      const accion = await this.model.crearElemento({ data:AccionDTO.parse(data) });
      res.status(201).json({
        mensaje: MENSAJE_EXITO.CREACION,
        data: accion,
      });
    } catch (err) {
      res.status(400).json({ error: MENSAJE_ERROR.CREACION });
    }
  };

  obtenerElemento = async (req, res) => {
    const { id } = req.params;

    try {
      const accion = await this.model.obtenerElemento({ id: parseInt(id) });
      res.json({ mensaje: MENSAJE_EXITO.LISTADO_UNO, data: accion });
    } catch (err) {
      res.status(404).json({ error: MENSAJE_ERROR.LISTADO_UNO });
    }
  };

  editarElemento = async (req, res) => {
    const { id } = req.params;
    const { error, data } = await evaluarAccionParcial(req.body);

    if (error)
      return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });

    try {
      const accion = await this.model.editarElemento({
        id: parseInt(id),
        data,
      });
      res.json({ mensaje: MENSAJE_EXITO.EDICION, data: accion });
    } catch (err) {
      res.status(400).json({ error: MENSAJE_ERROR.EDICION });
    }
  };
}
