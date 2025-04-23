import { Router } from 'express';
import { GeoCercaController } from '../controllers/geoCerca.js';

export const crearRouterGeoCercas = ({ model }) => {
    const routerGeoCerca = Router();
    const controller = new GeoCercaController({ model });
    
    routerGeoCerca.get('/', controller.obtenerElementos);
    
    routerGeoCerca.post('/', controller.crearElemento);
    
    routerGeoCerca.get('/:id', controller.obtenerElemento);
    
    routerGeoCerca.patch('/:id', controller.editarElemento);
    
    return routerGeoCerca;
    }