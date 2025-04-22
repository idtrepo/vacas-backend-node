import { MENSAJE_ERROR, MENSAJE_EXITO } from "../utils/mensajes.js";
import { evaluarPermiso, evaluarPermisoParcial } from '../schemas/permisos.js'
import { PermisosDTO } from "../dtos/permisos.js";

export class PermisosController{
    constructor({ model }) {
        this.model = model;
      }
    
      obtenerElementos = async (req, res) => {
        try {
          const { numElementos, elementos: permisos } =
            await this.model.obtenerElementos(req);
          res.json({
            mensaje: MENSAJE_EXITO.LISTADO,
            data: permisos,
            resultados: numElementos,
          });
        } catch (err) {
          res.status(404).json({ error: MENSAJE_ERROR.LISTADO });
        }
      };
    
      crearElemento = async (req, res) => {
        const { error, data } = await evaluarPermiso(req.body);
    
        if (error) {
          return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });
        }
    
        try {
          const permiso = await this.model.crearElemento({
            data: PermisosDTO.parse(data),
          });
          res.status(201).json({
            mensaje: MENSAJE_EXITO.CREACION,
            data: permiso,
          });
        } catch (err) {
          res.status(400).json({ error: MENSAJE_ERROR.CREACION });
        }
      };

      obtenerElemento = async (req, res) => {
        const { id } = req.params;
    
        try {
          const permiso = await this.model.obtenerElemento({ id: parseInt(id) });
          res.json({ mensaje: MENSAJE_EXITO.LISTADO_UNO, data: permiso });
        } catch (err) {
          res.status(404).json({ error: MENSAJE_ERROR.LISTADO_UNO });
        }
      };
    
      editarElemento = async (req, res) => {
          const { id } = req.params;
          const { error, data } = await evaluarPermisoParcial(req.body);
      
          if (error)
            return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });
      
          try {
            const permiso = await this.model.editarElemento({
              id: parseInt(id),
              data,
            });
            res.json({ mensaje: MENSAJE_EXITO.EDICION, data: permiso });
          } catch (err) {
            res.status(400).json({ error: MENSAJE_ERROR.EDICION });
          }
        };
}
