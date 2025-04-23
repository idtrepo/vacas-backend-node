import { evaluarVaca, evaluarVacaParcial } from "../schemas/vacas.js";
import { VacasDTO } from "../dtos/vacas.js";
import { MENSAJE_ERROR, MENSAJE_EXITO } from "../utils/mensajes.js";


export class VacasController{
    constructor({model}){
        this.model = model;
    }

    obtenerElementos = async (req, res) => {
        try {
            const { numElementos, elementos: vacas } = await this.model.obtenerElementos(req);
            res.json({
                mensaje: MENSAJE_EXITO.LISTADO,
                data: vacas,
                resultados: numElementos,
            });
        } catch (err) {
            res.status(404).json({ error: MENSAJE_ERROR.LISTADO });
        }
    };

    crearElemento = async (req, res) => {
        const { error, data } = await evaluarVaca(req.body);

        if (error) {
            return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });
        }

        try {
            const vaca = await this.model.crearElemento({
                data: VacasDTO.parse(data),
            });
            res.status(201).json({
                mensaje: MENSAJE_EXITO.CREACION,
                data: vaca,
            });
        } catch (err) {
            res.status(400).json({ error: MENSAJE_ERROR.CREACION });
        }
    };

    obtenerElemento = async (req, res) => {
        const { id } = req.params;

        try {
            const vaca = await this.model.obtenerElemento({ id: parseInt(id) });
            res.json({ mensaje: MENSAJE_EXITO.LISTADO_UNO, data: vaca });
        } catch (err) {
            res.status(404).json({ error: MENSAJE_ERROR.LISTADO_UNO });
        }
    };

    editarElemento = async (req, res) => {
        const { id } = req.params;
        const { error, data } = await evaluarVacaParcial(req.body);

        if (error)
            return res.status(400).json({ error: MENSAJE_ERROR.VALIDACION_DATOS });

        try {
            const vaca = await this.model.editarElemento({
                id: parseInt(id),
                data: VacasDTO.parse(data),
            });
            res.json({
                mensaje: MENSAJE_EXITO.EDICION,
                data: vaca,
            });
        } catch (err) {
            res.status(404).json({ error: MENSAJE_ERROR.EDICION });
        }
    };

    obtenerUbicaciones = async (req, res) =>{
        try {
            const { numElementos, elementos: vacas } = await this.model.obtenerUbicaciones(req);
            const data = vacas.map(vaca =>{
                const nsCollar = vaca.collar.ns;

                const datos = vaca.collar?.gateways[0].gateway.datos.filter(d => d.ns === nsCollar);
                const dato = datos?.[0] || null;

                return{
                    id: vaca.id,
                    nombre: vaca.nombre,
                    peso: vaca.peso,
                    idCollar: vaca.collar.id,
                    idSucursal: vaca.sucursal.id,
                    coordenadas:[ dato?.latitud, dato?.longitud,],
                }
            })
            res.json({
                mensaje: MENSAJE_EXITO.LISTADO,
                data,
                resultados: numElementos,
            });
        } catch (err) {
            res.status(404).json({ error: MENSAJE_ERROR.LISTADO });
        }
    };

    obtenerUbicacion = async (req, res) =>{
        const { id } = req.params;
        try {
            const vaca = await this.model.obtenerUbicacion({ id: parseInt(id) });
            const nsCollar = vaca.collar.ns;

            const datos = vaca.collar?.gateways[0].gateway.datos.filter(d => d.ns === nsCollar);
            const dato = datos?.[0] || null;

            res.json({
                mensaje: MENSAJE_EXITO.LISTADO_UNO,
                data:{
                    id: vaca.id,
                    nombre: vaca.nombre,
                    peso: vaca.peso,
                    idCollar: vaca.collar.id,
                    idSucursal: vaca.sucursal.id,
                    coordenadas:[ dato?.latitud, dato?.longitud,],
                }
            });
        } catch (err) {
            res.status(404).json({ error: MENSAJE_ERROR.LISTADO_UNO });
        }
    }
}