import { Router } from 'express';
import { VacasController } from '../controllers/vacas.js';

export const crearRouterVacas = ({ model }) => {
    const routerVacas = Router();
    const controller = new VacasController({ model });
    
    routerVacas.get("/", controller.obtenerElementos);
    
    routerVacas.post("/", controller.crearElemento);
    
    routerVacas.get("/:id", controller.obtenerElemento);
    
    routerVacas.patch("/:id", controller.editarElemento);
    
    return routerVacas;
}