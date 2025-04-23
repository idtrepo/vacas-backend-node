import { PrismaClient } from '@prisma/client';
import { acciones } from './semillas/acciones.js';
import { categorias } from './semillas/categorias.js';
import { clientes } from './semillas/clientes.js';
import { datos } from './semillas/datos.js';
import { operaciones } from './semillas/operaciones.js';
import { permisos } from './semillas/permisos.js';
import { perfiles } from './semillas/perfiles.js';
import { sucursales } from './semillas/sucursales.js';
import { usuarios } from './semillas/usuarios.js';
import { vacas } from './semillas/vacas.js';
import { collares } from './semillas/collares.js';
import { gatewaysCollares } from './semillas/gatewayCollares.js';
import { gateways } from './semillas/gateways.js';
import { infoStatus } from './semillas/infoStatus.js';
import { hashearPassword } from "../src/utils/password.js";


const prisma = new PrismaClient();

(async () => {
    // Limpiar la base de datos
    await prisma.dato.deleteMany({});
    await prisma.gatewayCollar.deleteMany({});
    await prisma.gateway.deleteMany({});
    await prisma.vaca.deleteMany({});
    await prisma.collar.deleteMany({});
    await prisma.usuario.deleteMany({});
    await prisma.sucursal.deleteMany({});
    await prisma.cliente.deleteMany({});
    await prisma.permiso.deleteMany({});
    await prisma.accion.deleteMany({});
    await prisma.categoria.deleteMany({});
    await prisma.perfil.deleteMany({});
    await prisma.operacion.deleteMany({});
    await prisma.infoStatus.deleteMany({});

    //creacion de operaciones
    for(let dataOperaciones of operaciones){
        await prisma.operacion.create({
            data: dataOperaciones
        })
    }

    //creacion de perfiles
    for(let dataPerfiles of perfiles){
        await prisma.perfil.create({
            data:dataPerfiles
        })
    }
    //creacion de categorias
    for(let dataCategorias of categorias){
        await prisma.categoria.create({
            data:dataCategorias
        })
    }

    //creacion de acciones
    for(let dataAcciones of acciones){
        await prisma.accion.create({
            data:dataAcciones
        })
    }
    //creacion de permisos
    for(let dataPermisos of permisos){
        await prisma.permiso.create({
            data:dataPermisos
        })
    }
    //creacion de clientes
    for(let dataClientes of clientes){
        await prisma.cliente.create({
            data:dataClientes
        })
    }
    //creacion de sucursales
    for(let dataSucursales of sucursales){
        await prisma.sucursal.create({
            data:dataSucursales
        })
    }
      // Creacion de usuarios
  for (let dataUsuario of usuarios) {
    await prisma.usuario.create({
      data: {
        ...dataUsuario,
        password: dataUsuario.password
          ? await hashearPassword({ password: dataUsuario.password })
          : null,
      },
    });
  }
    
    //creacion de collares
    for(let dataCollares of collares){
        await prisma.collar.create({
            data:dataCollares
        })
    }
    //creacion de vacas
    for(let dataVacas of vacas){
        await prisma.vaca.create({
            data:dataVacas
        })
    }
    //creacion de gateways
    for(let dataGateways of gateways){
        await prisma.gateway.create({
            data:dataGateways
        })
    }
    //creacion de gatewaysCollares
    for(let dataGatewaysCollares of gatewaysCollares){
        await prisma.gatewayCollar.create({
            data:dataGatewaysCollares
        })
    }
    //creacion de datos
    for(let dataDatos of datos){
        await prisma.dato.create({
            data:dataDatos
        })
    }
    //creacion de infoStatus
    for(let dataInfoStatus of infoStatus){
        await prisma.infoStatus.create({
            data:dataInfoStatus
        })
    }
    console.log("Semillas creadas correctamente")
})().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
