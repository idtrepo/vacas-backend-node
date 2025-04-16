import { Router } from 'express';
import { GatewaysController } from '../controllers/gateways.js';

export  const crearRouterGateways = ({ model }) => {
    const routerGateways = Router();
    const controller = new GatewaysController({ model });
    
    routerGateways.get("/", controller.obtenerElementos);
    
    routerGateways.post("/", controller.crearElemento);
    
    routerGateways.get("/:id", controller.obtenerElemento);
    
    routerGateways.patch("/:id", controller.editarElemento);
    
    return routerGateways;
}