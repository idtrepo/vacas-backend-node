import { Router } from 'express';
import { DatosController } from '../controllers/datos.js';

export const crearRouterDatos = ({ model }) => {
    const routerDatos = Router();
    const controller = new DatosController({ model });
    
    routerDatos.get("/", controller.obtenerElementos);
    
    routerDatos.post("/", controller.crearElemento);
    
    routerDatos.get("/:id", controller.obtenerElemento);
        
    return routerDatos;
}