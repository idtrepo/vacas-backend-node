import  {evaluarCategoria, evaluarCategoriaParcial} from "../schemas/categorias.js";
import { MENSAJE_ERROR, MENSAJE_EXITO } from "../utils/mensajes.js";
import { CategoriasDTO } from "../dtos/categorias.js";

export class CategoriasController{
    constructor({model}){
        this.model = model;
    }

    obtenerElementos = async (req, res) => {
        try {
            const { numElementos, elementos: categorias } = await this.model.obtenerElementos(req);
            res.json({ 
                mensaje: MENSAJE_EXITO.LISTADO, 
                data: categorias, 
                resultados: numElementos,
            });
        } catch (err) {
            res.status(404).json({ error: MENSAJE_ERROR.LISTADO })
        }
    };

    crearElemento = async (req, res) => {
        const { error, data } = await evaluarCategoria(req.body);
        
            if (error) {
              return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });
            }
        
            try {
              const categoria = await this.model.crearElemento({
                data: CategoriasDTO.parse(data),
              });
              res.status(201).json({
                mensaje: MENSAJE_EXITO.CREACION,
                data: categoria,
              });
            } catch (err) {
              res.status(400).json({ error: MENSAJE_ERROR.CREACION });
            }
    };

     obtenerElemento = async (req, res) => {
        const { id } = req.params;
    
        try {
          const categoria = await this.model.obtenerElemento({ id: parseInt(id) });
          res.json({ mensaje: MENSAJE_EXITO.LISTADO_UNO, data: categoria });
        } catch (err) {
          res.status(404).json({ error: MENSAJE_ERROR.LISTADO_UNO });
        }
      };
    
      editarElemento = async (req, res) => {
        const { id } = req.params;
        const { error, data } = await evaluarCategoriaParcial(req.body);
    
        if (error)
          return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });
    
        try {
          const categoria = await this.model.editarElemento({
            id: parseInt(id),
            data,
          });
          res.json({ mensaje: MENSAJE_EXITO.EDICION, data: categoria });
        } catch (err) {
          res.status(400).json({ error: MENSAJE_ERROR.EDICION });
        }
      };
}