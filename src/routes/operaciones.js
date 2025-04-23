import { Router } from "express";
import { OperacionesController } from "../controllers/operaciones.js";

export const crearRouterOperaciones = ({ model }) => {
  const routerOperaciones = Router();
  const controller = new OperacionesController({ model });

  routerOperaciones.get("/", controller.obtenerElementos);

  routerOperaciones.post("/", controller.crearElemento);

  routerOperaciones.get("/:id",controller.obtenerElemento);

  routerOperaciones.patch("/:id", controller.editarElemento);
  return routerOperaciones;
};
