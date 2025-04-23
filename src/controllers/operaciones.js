import { evaluarOperacion } from "../schemas/operaciones.js";
import { MENSAJE_ERROR, MENSAJE_EXITO } from "../utils/mensajes.js";
import { OperacionesDTO } from "../dtos/operaciones.js";

export class OperacionesController {
  constructor({ model }) {
    this.model = model;
  }

  obtenerElementos = async (req, res) => {
    try {
      const { numElementos, elementos: operaciones } =
        await this.model.obtenerElementos(req);
      res.json({
        mensaje: MENSAJE_EXITO.LISTADO,
        data: operaciones,
        resultados: numElementos,
      });
    } catch (err) {
      res.status(404).json({ error: MENSAJE_ERROR.LISTADO });
    }
  };

  crearElemento = async (req, res) => {
    const { error, data } = await evaluarOperacion(req.body);

    if (error) {
      return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });
    }

    try {
      const operacion = await this.model.crearElemento({
        data: OperacionesDTO.parse(data),
      });
      res.status(201).json({
        mensaje: MENSAJE_EXITO.CREACION,
        data: operacion,
      });
    } catch (err) {
      res.status(400).json({ error: MENSAJE_ERROR.CREACION });
    }
  };

  obtenerElemento = async (req, res) => {
    const { id } = req.params;

    try {
      const operacion = await this.model.obtenerElemento({ id: parseInt(id) });
      res.json({ mensaje: MENSAJE_EXITO.LISTADO_UNO, data: operacion });
    } catch (err) {
      res.status(404).json({ error: MENSAJE_ERROR.LISTADO_UNO });
    }
  };

  editarElemento = async (req, res) => {
    const { id } = req.params;
    const { error, data } = await evaluarOperaciones(req.body);

    if (error)
      return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });

    try {
      const operacion = await this.model.editarElemento({
        id: parseInt(id),
        data,
      });
      res.json({ mensaje: MENSAJE_EXITO.EDICION, data: operacion });
    } catch (err) {
      res.status(400).json({ error: MENSAJE_ERROR.EDICION });
    }
  };
}
