import { PaginacionDTO } from "../dtos/paginacion.js";

export class PaginacionMiddleware {
  static execute(req, res, next) {
    const { query } = req;
    const { elementos, listado, pagina } = PaginacionDTO.parse(query);
    console.log(elementos,listado, pagina)

    req["take"] = listado ? undefined : elementos;
    req["skip"] = listado ? undefined : elementos * (pagina - 1);

    next();
  }
}