import { evaluarCollar, evaluarCollarParcial } from "../schemas/collares.js";
import { CollaresDTO } from "../dtos/collares.js";
import { MENSAJE_ERROR, MENSAJE_EXITO } from "../utils/mensajes.js";

export class CollaresController {
  constructor({ model }) {
    this.model = model;
  }

  obtenerElementos = async (req, res) => {
    try {
      const { numElementos, elementos: collares } =
        await this.model.obtenerElementos(req);
      res.json({
        mensaje: MENSAJE_EXITO.LISTADO,
        data: collares,
        resultados: numElementos,
      });
    } catch (err) {
      res.status(404).json({ error: MENSAJE_ERROR.LISTADO });
    }
  };

  crearElemento = async (req, res) => {
    const { error, data } = await evaluarCollar(req.body);

    if (error) {
      return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });
    }

    try {
      const collar = await this.model.crearElemento({
        data: CollaresDTO.parse(data),
      });
      res.status(201).json({
        mensaje: MENSAJE_EXITO.CREACION,
        data: collar,
      });
    } catch (err) {
      res.status(400).json({ error: MENSAJE_ERROR.CREACION });
    }
  };

  obtenerElemento = async (req, res) => {
    const { id } = req.params;
    try {
      const collar = await this.model.obtenerElemento({ id: parseInt(id) });
      res.json({ mensaje: MENSAJE_EXITO.LISTADO_UNO, data: collar });
    } catch (err) {
      res.status(404).json({ error: MENSAJE_ERROR.LISTADO_UNO });
    }
  };

  editarElemento = async (req, res) => {
    const { id } = req.params;
    const { error, data } = await evaluarCollarParcial(req.body);

    if (error)
      return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });

    try {
      const collar = await this.model.editarElemento({
        id: parseInt(id),
        data: CollaresDTO.parse(data),
      });
      res.json({
        mensaje: MENSAJE_EXITO.ACTUALIZACION,
        data: collar,
      });
    } catch (err) {
      res.status(404).json({ error: MENSAJE_ERROR.ACTUALIZACION });
    }
  }
}
