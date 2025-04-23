import { evaluarToken } from "../utils/token.js";
import { MENSAJE_ERROR } from "../utils/mensajes.js";

export class AutenticacionMiddleware {
  static execute(req, res, next) {
    const { path, headers } = req;

    if (path.includes("/autenticacion")) return next();

    const headerAuthorization = headers?.["authorization"];

    if (!headerAuthorization)
      return res.status(401).json({ error: MENSAJE_ERROR.CREDENCIALES });

    const [, token] = headerAuthorization.split(" ");
    const tokenDecodificado = evaluarToken({ token });

    if (!tokenDecodificado)
      return res.status(401).json({ error: MENSAJE_ERROR.SESION });

    req["usuario"] = tokenDecodificado.usuario;

    next();
  }
}