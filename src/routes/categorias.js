import { Router } from "express";
import { CategoriasController } from "../controllers/categorias.js";

export const crearRouterCategorias = ({ model }) => {
  const routerCategorias = Router();
  const controller = new CategoriasController({ model });

  routerCategorias.get("/", controller.obtenerElementos);

  routerCategorias.post("/", controller.crearElemento);

  routerCategorias.get(
    "/:id",
    controller.obtenerElemento
  );

  routerCategorias.patch(
    "/:id",
    controller.editarElemento
  );
  return routerCategorias;
};
