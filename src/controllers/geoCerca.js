import { evaluarGeoCerca, evaluarGeoCercaParcial } from "../schemas/geoCercas.js";
import { GeoCercaDTO } from "../dtos/geoCercas.js";
import { MENSAJE_ERROR, MENSAJE_EXITO } from "../utils/mensajes.js";

export class GeoCercaController {
  constructor({ model }) {
    this.model = model;
  }

  obtenerElementos = async (req, res) => {
    try {
      const { numElementos, elementos: geoCercas } =
        await this.model.obtenerElementos(req);
      res.json({
        mensaje: MENSAJE_EXITO.LISTADO,
        data: geoCercas,
        resultados: numElementos,
      });
    } catch (err) {
      res.status(404).json({ error: MENSAJE_ERROR.LISTADO });
    }
  };

  crearElemento = async (req, res) => {
    const { error, data } = await evaluarGeoCerca(req.body);

    if (error) {
      return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });
    }

    try {
      const geoCerca = await this.model.crearElemento({
        data: GeoCercaDTO.parse(data),
      });
      res.status(201).json({
        mensaje: MENSAJE_EXITO.CREACION,
        data: geoCerca,
      });
    } catch (err) {
      res.status(400).json({ error: MENSAJE_ERROR.CREACION });
    }
  };

  obtenerElemento = async (req, res) => {
    const { id } = req.params;

    try {
      const geoCerca = await this.model.obtenerElemento({ id: parseInt(id) });
      res.json({ mensaje: MENSAJE_EXITO.LISTADO_UNO, data: geoCerca });
    } catch (err) {
      res.status(404).json({ error: MENSAJE_ERROR.LISTADO_UNO });
    }
  };

  editarElemento = async (req, res) => {
    const { id } = req.params;
    const { error, data } = await evaluarGeoCercaParcial(req.body);

    if (error)
      return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });

    try {
      const geoCerca = await this.model.editarElemento({
        id: parseInt(id),
        data,
      });
      res.json({
        mensaje: MENSAJE_EXITO.ACTUALIZACION,
        data: geoCerca,
      });
    } catch (err) {
      res.status(404).json({ error: MENSAJE_ERROR.ACTUALIZACION });
    }
  };
}
