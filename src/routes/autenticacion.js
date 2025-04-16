import { Router } from "express";
import { AutenticacionController } from "../controllers/autenticacion.js";

export const crearRouterAutenticacion = ({ model }) => {
  const routerAutenticacion = Router();
  const controller = new AutenticacionController({ model });

  routerAutenticacion.post("/login", controller.login);

  routerAutenticacion.post("/actualizar", controller.actualizar);

  return routerAutenticacion;
};
