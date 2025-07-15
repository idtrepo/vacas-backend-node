import { MENSAJE_ERROR, MENSAJE_EXITO } from "../utils/mensajes.js";
import {evaluarUsuario, evaluarUsuarioParcial} from "../schemas/usuarios.js"
import {UsuariosDTO} from "../dtos/usuarios.js"
import { hashearPassword } from "../utils/password.js";

export class UsuariosController{
    constructor({model}){
        this.model = model;
    }

    obtenerElementos = async (req, res) =>{
        try {
                const { elementos: usuarios, numElementos } = await this.model.obtenerElementos(req);
                res.json({ mensaje: MENSAJE_EXITO.LISTADO, data: usuarios, resultados: numElementos });
            } catch (err) {
                res.status(404).json({ error: MENSAJE_ERROR_LISTADO })
            }
    }

    crearElemento = async (req, res) =>{
        const { data, error } = await evaluarUsuario(req.body);
        
            if (error) return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });
        
            if(data.password) data.password = await hashearPassword({ password: data.password })
        
            try {
                const usuario = await this.model.crearElemento({ data: UsuariosDTO.parse(data) });
                res.status(201).json({
                    mensaje: MENSAJE_EXITO.CREACION,
                    data: usuario
                });
            } catch (err) {
                res.status(400).json({ error: MENSAJE_ERROR.CREACION });
            }
    };

    obtenerElemento = async (req, res) =>{
        try {
                 const { id } = req.params;
                const usuario = await this.model.obtenerElemento({id: parseInt(id)});
                res.send({
                    mensaje: MENSAJE_EXITO.LISTADO_UNO,
                    data: usuario
                })
            } catch (err) {
                res.status(404).json({ error: MENSAJE_ERROR.LISTADO_UNO })
            }
    };

    editarElemento = async (req, res) =>{
        const { data, error } = await evaluarUsuarioParcial(req.body);
        const { id } = req.params;
        
            if (error) return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });
        
            let dataUsuario = data;
            if (data?.password) {
                dataUsuario = {
                    ...data,
                    password: await hashearPassword({ password: data.password })
                }
            }
        
            try {
                const usuario = await this.model.editarElemento({ id: parseInt(id), data: UsuariosDTO.parse(dataUsuario) });
                res.json({
                    mensaje: MENSAJE_EXITO.EDICION,
                    data: usuario
                });
            } catch (err) {
                res.status(400).json({ error: MENSAJE_ERROR.EDICION });
            }
    }
}