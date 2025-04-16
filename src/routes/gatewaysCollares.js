import { Router } from "express";
import { GatewaysCollaresController } from "../controllers/gatewaysCollares.js";

export const crearRouterGatewaysCollares = ({ model }) => {
    const routerGatewaysCollares = Router();
    const controller = new GatewaysCollaresController({ model });
    
    routerGatewaysCollares.get("/", controller.obtenerElementos);
    
    routerGatewaysCollares.post("/", controller.crearElemento);
    
    routerGatewaysCollares.get("/:id", controller.obtenerElemento);
    
    routerGatewaysCollares.patch("/:id", controller.editarElemento);
    
    return routerGatewaysCollares;
    }