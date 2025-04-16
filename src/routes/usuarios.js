import { Router } from "express";
import { UsuariosController } from "../controllers/usuarios.js";
import { QueryClienteMiddleware,QuerySucursalMiddleware } from "../middlewares/query.js";

export const crearRouterUsuarios = ({ model }) => {
  const routerUsuarios = Router();
  const controller = new UsuariosController({ model });

  routerUsuarios.use(QueryClienteMiddleware.execute);
  routerUsuarios.use(QuerySucursalMiddleware.execute);
  routerUsuarios.get("/", controller.obtenerElementos);

  routerUsuarios.post("/", controller.crearElemento);

  routerUsuarios.get("/:id", controller.obtenerElemento);

  routerUsuarios.patch(
    "/:id",
    controller.editarElemento
  );
  return routerUsuarios;
};
