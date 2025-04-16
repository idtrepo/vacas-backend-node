import Router from 'express';
import { crearRouterAcciones } from './acciones.js';
import { crearRouterAutenticacion } from "./autenticacion.js";
import { crearRouterCategorias } from "./categorias.js";
import { crearRouterClientes } from "./clientes.js";
import { crearRouterOperaciones } from "./operaciones.js";
import { crearRouterPerfiles } from "./perfiles.js";
import { crearRouterPermisos } from "./permisos.js";
import { crearRouterSucursales } from "./sucursales.js";
import { crearRouterUsuarios } from "./usuarios.js";
import { crearRouterCollares } from "./collares.js";
import { crearRouterDatos } from "./datos.js";
import { crearRouterGateways } from "./gateways.js";
import {crearRouterGatewaysCollares} from "./gatewaysCollares.js";
import { crearRouterInfoStatus } from './infoStatus.js';
import { crearRouterVacas } from './vacas.js';
import { crearRouterGeoCercas } from './geoCercas.js';

import { AccionModel } from "../models/acciones.js";
import { CategoriaModel } from "../models/categorias.js";
import { ClienteModel } from "../models/clientes.js";
import { OperacionModel } from "../models/operaciones.js";
import { PerfilModel } from "../models/perfiles.js";
import { PermisoModel } from "../models/permisos.js";
import { SucursalModel } from "../models/sucursales.js";
import { UsuarioModel } from "../models/usuarios.js";
import { CollarModel } from '../models/collares.js';
import { DatoModel } from '../models/datos.js';
import { GatewayModel } from '../models/gateways.js';
import { GatewaysCollaresModel } from '../models/gatewaysCollares.js';
import { InfoStatusModel } from '../models/infoStatus.js';
import { VacaModel } from '../models/vacas.js';
import { GeoCercaModel } from '../models/geoCercas.js';

export class AppRouter{
    static get routes() {
        const router = Router();

        router.use('/acciones', crearRouterAcciones({ model: AccionModel }));
        router.use('/autenticacion', crearRouterAutenticacion({ model: UsuarioModel }));
        router.use('/categorias', crearRouterCategorias({ model: CategoriaModel }));
        router.use('/clientes', crearRouterClientes({ model: ClienteModel }));
        router.use('/operaciones', crearRouterOperaciones({ model: OperacionModel }));
        router.use('/perfiles', crearRouterPerfiles({ model: PerfilModel }));
        router.use('/permisos', crearRouterPermisos({ model: PermisoModel }));
        router.use('/sucursales', crearRouterSucursales({ model: SucursalModel }));
        router.use('/usuarios', crearRouterUsuarios({ model: UsuarioModel }));
        router.use('/collares', crearRouterCollares({ model: CollarModel }));
        router.use('/datos', crearRouterDatos({ model: DatoModel }));
        router.use('/gateways', crearRouterGateways({ model: GatewayModel }));
        router.use('/gatewaysCollares', crearRouterGatewaysCollares({ model: GatewaysCollaresModel }));
        router.use('/infoStatus', crearRouterInfoStatus({ model: InfoStatusModel }));
        router.use('/vacas', crearRouterVacas({ model: VacaModel }));
        router.use('/geoCercas', crearRouterGeoCercas({ model: GeoCercaModel }));

        return router;
    }
}