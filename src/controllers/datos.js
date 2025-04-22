import { evaluarDato, evaluarDatoParcial } from "../schemas/datos.js";
import { DatosDTO } from "../dtos/datos.js";
import { MENSAJE_ERROR, MENSAJE_EXITO } from "../utils/mensajes.js";
import { GatewayModel } from "../models/gateways.js";
import { CollarModel } from "../models/collares.js";
import { InfoStatusModel } from "../models/infoStatus.js";

export class DatosController {
    constructor({ model }) {
        this.model = model;
    }

    obtenerElementos = async (req, res) => {
        try {
            const { numElementos, elementos: datos } = await this.model.obtenerElementos(req);
            res.json({
                mensaje: MENSAJE_EXITO.LISTADO,
                data: datos,
                resultados: numElementos,
            });
        } catch (err) {
            res.status(404).json({ error: MENSAJE_ERROR.LISTADO });
        }
    };

    crearElemento = async (req, res) => {
        const data = req.body;
        /*
                    data = {
                        "identificador":'gateway1',
                        "data":[
                            {
                            "identificador":"collar1",
                            "signal":{
                                "bateria":85,
                                "rssi":-50,
                                "snr":10,
                            },
                            "data":{
                                "latitud":-34.123456,
                                "longitud":-56.123456,
                                "pasos":1000,
                                "temperatura":25.5,
                                "ambiente":27.9
                            }
                            }
                        ]
                    }
        */
        const {id: idGateway} = await GatewayModel.obtenerIdGateway(data.identificador);
        if (!idGateway)  return res.status(404).json({ error: MENSAJE_ERROR.LISTADO_UNO });

        const {id: idCollar} = await CollarModel.obtenerIdCollar(data.data[0].identificador);
        if (!idCollar) return res.status(404).json({ error: MENSAJE_ERROR.LISTADO_UNO });

        const dataSignal = {...data.data[0].signal, idGateway: idGateway, idCollar: idCollar};

        const dataSensor = {...data.data[0].data, idGateway: idGateway, ns:data.data[0].identificador};
        try {
            await InfoStatusModel.crearElemento({
                data: dataSignal,
            });
            const dato = await this.model.crearElemento({
                data: DatosDTO.parse(dataSensor),
            });
            res.status(201).json({
                mensaje: MENSAJE_EXITO.CREACION,
                data: dato,
            });
        } catch (err) {
            res.status(400).json({ error: MENSAJE_ERROR.CREACION });
        }
    };

    obtenerElemento = async (req, res) => {
        const { id } = req.params;

        try {
            const dato = await this.model.obtenerElemento({ id: parseInt(id) });
            res.json({ mensaje: MENSAJE_EXITO.LISTADO_UNO, data: dato });
        } catch (err) {
            res.status(404).json({ error: MENSAJE_ERROR.LISTADO_UNO });
        }
    };
}