import { Router } from 'express';
import { VacasController } from '../controllers/vacas.js';

export const crearRouterUbicaciones = ({ model }) => {
    const router = Router();
    const controller = new VacasController({ model });
    
    router.get("/", controller.obtenerUbicaciones);

    router.get("/:id", controller.obtenerUbicacion);

    return router;
}
 