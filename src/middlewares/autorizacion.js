import { MENSAJE_ERROR } from "../utils/mensajes.js";

const RUTA_AUTENTICACION = "autenticacion";
const ACCIONES = {
  GET: "ver",
  POST: "crear",
  PATCH: "editar",
  DELETE: "eliminar",
};

export class AutorizacionMiddleware {
  static execute(req, res, next) {
    const { path, usuario, method } = req;
    const [, , endpoint] = path.split("/");

    if (endpoint === RUTA_AUTENTICACION) return next();

    const permisos = usuario.perfil.acciones;

    if (endpoint in permisos && permisos[endpoint].includes(ACCIONES[method]))
      return next();

    return res.status(401).json({ error: MENSAJE_ERROR.PERFIL });
  }
}
