import { Router } from "express";
import { PerfilesController } from "../controllers/perfiles.js";

export const crearRouterPerfiles = ({ model }) => {
  const routerPerfiles = Router();
  const controller = new PerfilesController({ model });

  routerPerfiles.get("/", controller.obtenerElementos);

  routerPerfiles.post("/", controller.crearElemento);

  routerPerfiles.get("/:id", controller.obtenerElemento);

  routerPerfiles.patch("/:id", controller.editarElemento);
  return routerPerfiles;
};
