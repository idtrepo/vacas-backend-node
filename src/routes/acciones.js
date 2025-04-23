import { Router } from "express";
import { AccionesController } from "../controllers/acciones.js";

export const crearRouterAcciones = ({ model }) => {
  const routerAcciones = Router();
  const controller = new AccionesController({ model });

  routerAcciones.get("/", controller.obtenerElementos);

  routerAcciones.post("/", controller.crearElemento);

  routerAcciones.get("/:id", controller.obtenerElemento);

  routerAcciones.patch("/:id",controller.editarElemento);
  return routerAcciones;
};
