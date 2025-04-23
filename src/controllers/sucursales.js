import { MENSAJE_ERROR, MENSAJE_EXITO } from "../utils/mensajes.js";
import {
  evaluarSucursal,
  evaluarSucursalParcial,
} from "../schemas/sucursales.js";
import { SucursalesDTO } from "../dtos/sucursales.js";

export class SucursalesController {
  constructor({ model }) {
    this.model = model;
  }

  obtenerElementos = async (req, res) => {
    try {
      const { numElementos, elementos: sucursales } =
        await this.model.obtenerElementos(req);
      res.json({
        mensaje: MENSAJE_EXITO.LISTADO,
        data: sucursales,
        resultados: numElementos,
      });
    } catch (err) {
      res.status(404).json({ error: MENSAJE_ERROR.LISTADO });
    }
  };

  crearElemento = async (req, res) => {
    const { error, data } = await evaluarSucursal(req.body);

    if (error) {
      return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });
    }

    try {
      const sucursal = await this.model.crearElemento({
        data: SucursalesDTO.parse(data),
      });
      res.status(201).json({
        mensaje: MENSAJE_EXITO.CREACION,
        data: sucursal,
      });
    } catch (err) {
      res.status(400).json({ error: MENSAJE_ERROR.CREACION });
    }
  };

  obtenerElemento = async (req, res) => {
    const { id } = req.params;

    try {
      const sucursal = await this.model.obtenerElemento({ id: parseInt(id) });
      res.json({ mensaje: MENSAJE_EXITO.LISTADO_UNO, data: sucursal });
    } catch (err) {
      res.status(404).json({ error: MENSAJE_ERROR.LISTADO_UNO });
    }
  };

  editarElemento = async (req, res) => {
    const { id } = req.params;
    const { error, data } = await evaluarSucursalParcial(req.body);

    if (error)
      return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });

    try {
      const sucursal = await this.model.editarElemento({
        id: parseInt(id),
        data,
      });
      res.json({ mensaje: MENSAJE_EXITO.EDICION, data: sucursal });
    } catch (err) {
      console.log(err)
      res.status(400).json({ error: MENSAJE_ERROR.EDICION });
    }
  };
}
