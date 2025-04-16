import { Router } from "express";
import { ClientesController } from "../controllers/clientes.js";

export const crearRouterClientes = ({ model }) => {
  const routerClientes = Router();
  const controller = new ClientesController({ model });

  routerClientes.get(
    "/",
    controller.obtenerElementos
  );

  routerClientes.post("/", controller.crearElemento);

  routerClientes.get("/:id", controller.obtenerElemento);

  routerClientes.patch(
    "/:id",
    controller.editarElemento
  );
  return routerClientes;
};
