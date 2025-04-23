import { generarToken, evaluarToken } from "../utils/token.js";
import { MENSAJE_ERROR, MENSAJE_EXITO } from "../utils/mensajes.js";
import {
  TOKEN_ACCESS_TIME,
  TOKEN_REFRESH_TIME,
} from "../../config/settings.js";
import {
  evaluarCredenciales,
  evaluarRefresh,
} from "../schemas/autenticacion.js";
import { evaluarPassword } from "../utils/password.js";

const mapearPermisos = (data) => {
  const permisos = {};
  const vistas = Array.from(
    new Set(data.map(({ accion }) => accion.nombre.split("-")[0]))
  );

  vistas.forEach((vista) => {
    permisos[vista] = data
      .filter(({ accion }) => accion.nombre.includes(vista))
      .map(({ accion }) => accion.nombre.split("-")[1]);
  });

  return permisos;
};

export class AutenticacionController {
  constructor({ model }) {
    this.model = model;
  }

  login = async (req, res) => {
    const { data: dataCredenciales, error } = await evaluarCredenciales(
      req.body
    );

    if (error)
      return res.status(401).json({ error: MENSAJE_ERROR.CREDENCIALES });

    let usuario;

    try {
      usuario = await this.model.obtenerElementoActivo({
        correo: dataCredenciales.correo,
      });
    } catch (err) {
      return res.status(401).json({ error: MENSAJE_ERROR.CREDENCIALES });
    }

    const passwordCorrecto = await evaluarPassword({
      password: dataCredenciales.password,
      hashPassword: usuario.password,
    });

    if (!passwordCorrecto)
      return res.status(401).json({ error: MENSAJE_ERROR.CREDENCIALES });

    const { password: passw, ...dataUsuario } = usuario;

    dataUsuario.perfil.acciones = mapearPermisos(dataUsuario.perfil.acciones);

    const tokenAccess = generarToken({
      data: { usuario: dataUsuario },
      expiresIn: TOKEN_ACCESS_TIME,
    });
    const tokenRefresh = generarToken({
      data: { usuario: dataUsuario },
      expiresIn: TOKEN_REFRESH_TIME,
    });

    res.json({
      mensaje: MENSAJE_EXITO.SESION,
      data: { access: tokenAccess, refresh: tokenRefresh },
    });
  };

  actualizar = async (req, res) => {
    const { data, error } = await evaluarRefresh(req.body);

    if (error) return res.status(401).json({ error: MENSAJE_ERROR.SESION });

    const { refresh } = data;
    const decodeToken = evaluarToken({ token: refresh });

    if (!decodeToken)
      return res.status(401).json({ error: MENSAJE_ERROR.SESION });

    const { usuario } = decodeToken;
    const { correo } = usuario;
    let dbUsuario;

    try {
      dbUsuario = await this.model.obtenerElementoActivo({ correo });
    } catch (err) {
      return res.status(401).json({ error: MENSAJE_ERROR.CREDENCIALES });
    }

    const { password, ...dataUsuario } = dbUsuario;

    dataUsuario.perfil.acciones = mapearPermisos(dataUsuario.perfil.acciones);

    const tokenAccess = generarToken({
      data: { usuario: dataUsuario },
      expiresIn: TOKEN_ACCESS_TIME,
    });

    res.json({
      mensaje: MENSAJE_EXITO.SESION,
      data: { access: tokenAccess },
    });
  };
}
