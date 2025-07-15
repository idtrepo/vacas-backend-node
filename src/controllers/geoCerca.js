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
      if (geoCercas.length === 0) {
        return res.status(404).json({ error: MENSAJE_ERROR.LISTADO });
      }
      //agrupamos por id de sucursal
      const geoCercasAgrupadas = geoCercas.reduce((acc, geoCerca) => {
        const { idSucursal } = geoCerca;
        if (!acc[idSucursal]) {
          acc[idSucursal] = {
            idSucursal,
            geoCercas: [],
          };
        }
        acc[idSucursal].geoCercas.push([geoCerca.latitud, geoCerca.longitud]);
        return acc;
      }, {});

      // Convertimos el objeto en un array y formateamos las coordenadas
      const geoCercasAgrupadasArray = Object.values(geoCercasAgrupadas).map((item) => {
        return {
          idSucursal: item.idSucursal,
          coordenadas: item.geoCercas,
        };
      });

      res.json({
        mensaje: MENSAJE_EXITO.LISTADO,
        data: geoCercasAgrupadasArray[0],
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
      //esto devuelve todas las geocercas de la sucursal
      const geoCerca = await this.model.obtenerElemento({ id: parseInt(id) });
      //formato el resultado para que devuelva un array de coordenadas
      const geoCercaFormateada = geoCerca.map((geo) => {
        return {
          coordenadas: [geo.latitud, geo.longitud],
        };
      });
      
      res.json({ mensaje: MENSAJE_EXITO.LISTADO_UNO, data: geoCercaFormateada });
    } catch (err) {
      res.status(404).json({ error: MENSAJE_ERROR.LISTADO_UNO });
    }
  };

  editarElemento = async (req, res) => {
    const { id:idSucursal } = req.params;
    const { coordenadas:geocercas } = req.body;

    try {
      // Eliminar todas las geocercas asociadas a la sucursal
      await this.model.eliminarGeocercasPorSucursal(parseInt(idSucursal));

      // Crear las nuevas geocercas
      if (geocercas.length > 2) {
        await this.model.crearGeocercas(parseInt(idSucursal), geocercas);
      }

      res.json({ mensaje: MENSAJE_EXITO.ACTUALIZACION, data: geocercas });
    } catch (err) {
      res.status(400).json({ error: MENSAJE_ERROR.ACTUALIZACION });
    }
  };
}
