import { MENSAJE_ERROR, MENSAJE_EXITO } from "../utils/mensajes.js";
import { evaluarPerfil, evaluarPerfilParcial } from "../schemas/perfiles.js";
import { PerfilesDTO } from "../dtos/perfiles.js";

export class PerfilesController {
  constructor({ model }) {
    this.model = model;
  }

  obtenerElementos = async (req, res) => {
    try {
      const { numElementos, elementos: perfiles } =
        await this.model.obtenerElementos(req);
      res.json({
        mensaje: MENSAJE_EXITO.LISTADO,
        data: perfiles,
        resultados: numElementos,
      });
    } catch (err) {
      res.status(404).json({ error: MENSAJE_ERROR.LISTADO });
    }
  };

  crearElemento = async (req, res) => {
    const { error, data } = await evaluarPerfil(req.body);

    if (error) {
      return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });
    }

    try {
      const perfil = await this.model.crearElemento({
        data: PerfilesDTO.parse(data),
      });
      res.status(201).json({
        mensaje: MENSAJE_EXITO.CREACION,
        data: perfil,
      });
    } catch (err) {
      res.status(400).json({ error: MENSAJE_ERROR.CREACION });
    }
  };

  obtenerElemento = async (req, res) => {
    const { id } = req.params;

    try {
      const perfiles = await this.model.obtenerElemento({ id: parseInt(id) });
      res.json({ mensaje: MENSAJE_EXITO.LISTADO_UNO, data: perfiles });
    } catch (err) {
      res.status(404).json({ error: MENSAJE_ERROR.LISTADO_UNO });
    }
  };

  editarElemento = async (req, res) => {
      const { id } = req.params;
      const { error, data } = await evaluarPerfilParcial(req.body);
  
      if (error)
        return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });
  
      try {
        const perfil = await this.model.editarElemento({
          id: parseInt(id),
          data,
        });
        res.json({ mensaje: MENSAJE_EXITO.EDICION, data: perfil });
      } catch (err) {
        res.status(400).json({ error: MENSAJE_ERROR.EDICION });
      }
    };
}
