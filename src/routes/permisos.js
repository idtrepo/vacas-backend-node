import { Router } from "express";
import { PermisosController } from "../controllers/permisos.js";

export const crearRouterPermisos = ({ model }) => {
  const routerPermisos = Router();
  const controller = new PermisosController({ model });

  routerPermisos.get("/", controller.obtenerElementos);

  routerPermisos.post("/", controller.crearElemento);

  routerPermisos.get("/:id", controller.obtenerElemento);

  routerPermisos.patch(
    "/:id", controller.editarElemento
  );
  return routerPermisos;
};
