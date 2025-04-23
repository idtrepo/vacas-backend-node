import { Router } from "express";
import { SucursalesController } from "../controllers/sucursales.js";
import { QueryClienteMiddleware } from "../middlewares/query.js";


export const crearRouterSucursales = ({ model }) => {
  const routerSucursales = Router();
  const controller = new SucursalesController({ model });

  routerSucursales.use(QueryClienteMiddleware.execute);

  routerSucursales.get("/", controller.obtenerElementos);

  routerSucursales.post("/", controller.crearElemento);

  routerSucursales.get("/:id", controller.obtenerElemento);

  routerSucursales.patch("/:id", controller.editarElemento);
  return routerSucursales;
};
