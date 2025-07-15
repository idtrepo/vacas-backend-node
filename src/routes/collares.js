import {Router} from 'express';
import { CollaresController } from '../controllers/collares.js';

export const crearRouterCollares = ({ model }) => {
    const routerCollares = Router();
    const controller = new CollaresController({ model });
    
    routerCollares.get("/", controller.obtenerElementos);
    routerCollares.get("/libres", controller.obtenerElementosLibres);
    
    routerCollares.post("/", controller.crearElemento);
    
    routerCollares.get("/:id", controller.obtenerElemento);
    
    routerCollares.patch("/:id", controller.editarElemento);
    
    return routerCollares;
    }