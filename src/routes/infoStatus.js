import { Router } from 'express';
import { InfoStatusController } from '../controllers/infoStatus.js';

export const crearRouterInfoStatus = ({ model }) => {
    const routerInfoStatus = Router();
    const controller = new InfoStatusController({ model });
    
    routerInfoStatus.get("/", controller.obtenerElementos);
    
    routerInfoStatus.post("/", controller.crearElemento);
    
    routerInfoStatus.get("/:id", controller.obtenerElemento);
    
    routerInfoStatus.patch("/:id", controller.editarElemento);
    
    return routerInfoStatus;
}