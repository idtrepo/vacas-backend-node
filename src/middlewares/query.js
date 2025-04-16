import { QueryDTO } from "../dtos/query.js";

const PERFIL = {
  SUPER_USUARIO: 1,
  ADMINISTRADOR: 2,
  SUPERVISOR: 3,
};

export class QueryMiddleware {
  static execute(req, res, next) {
    const {
      estatus,
      nombre,
      fecha,
      correo,
      apellido,

      sucursal,
      cliente,
      perfil,
      operacion,
      categoria,
      accion,

      collar,
      vaca,
      gateway
    } = QueryDTO.parse(req.query);
    const where = {};

    where["estatus"] = estatus;

    if (nombre !== undefined) where["nombre"] = nombre && { contains: nombre };
    if (correo !== undefined) where["correo"] = correo && { contains: correo };
    if (apellido !== undefined)
      where["apellido"] = apellido && { contains: apellido };
    if (sucursal !== undefined)
      where["sucursal"] = sucursal && { id: { equals: sucursal } };
    if (accion !== undefined)
      where["accion"] = accion && { id: { equals: accion } };
    if (operacion !== undefined)
      where["operacion"] = operacion && { id: { equals: operacion } };
    if (categoria !== undefined)
      where["categoria"] = categoria && { id: { equals: categoria } };
    if (cliente !== undefined)
      where["cliente"] = cliente && { id: { equals: cliente } };
    if (perfil !== undefined)
      where["perfil"] = perfil && { id: { equals: perfil } };
    if (collar !== undefined)
      where["collar"] = collar && { id: { equals: collar } };
    if (vaca !== undefined) where["vaca"] = vaca && { id: { equals: vaca } };
    if (gateway !== undefined) 
      where["gateway"] = gateway && { id: { equals: gateway } };
    if (fecha) {
      const fechaInferior = new Date(fecha);
      const fechaSuperior = new Date(fecha);
      fechaSuperior.setDate(fechaSuperior.getDate() + 1);

      where["creado"] = { gte: fechaInferior, lt: fechaSuperior };
    }

    req["where"] = where;

    next();
  }
}

export class QueryPerfilMiddleware {
  static execute = (req, res, next) => {
    const { usuario, query, where } = req;
    const { perfil } = QueryDTO.parse(query);
    const usuarioPerfil = usuario?.perfil?.id;

    if (usuarioPerfil === PERFIL.ADMINISTRADOR)
      where["perfil"] = { id: { gt: PERFIL.ADMINISTRADOR } };

    if (usuarioPerfil === PERFIL.SUPERVISOR)
      where["perfil"] = { id: { gt: PERFIL.SUPERVISOR } };

    if (perfil && usuarioPerfil === PERFIL.SUPER_USUARIO)
      where["perfil"] = { id: { equals: perfil } };

    if (
      perfil &&
      usuarioPerfil === PERFIL.ADMINISTRADOR &&
      perfil > PERFIL.ADMINISTRADOR
    )
      where["perfil"] = { id: { equals: perfil } };

    if (
      perfil &&
      usuarioPerfil === PERFIL.SUPERVISOR &&
      perfil > PERFIL.SUPERVISOR
    )
      where["perfil"] = { id: { equals: perfil } };

    req.where = {
      ...req.where,
      ...where,
    };

    next();
  };
}

export class QueryClienteMiddleware {
  static execute = (req, res, next) => {
    const { usuario, where, query } = req;
    const { cliente } = QueryDTO.parse(query);
    const usuarioCliente = usuario?.cliente?.id;

    if (usuarioCliente) {
      where["cliente"] = { id: { equals: usuarioCliente } };
    }

    if (cliente !== undefined)
      where["cliente"] = cliente && { id: { equals: cliente } };

    req.where = {
      ...req.where,
      ...where,
    };

    console.log("PARAMETROS DE BUSQUEDA");
    console.log(req.where);

    next();
  };
}

export class QuerySucursalMiddleware {
  static execute = (req, res, next) => {
    const { usuario, where, query } = req;
    const { sucursal } = QueryDTO.parse(query);
    const usuarioSucursal = usuario?.sucursal?.id;

    if (usuarioSucursal)
      where["sucursal"] = { id: { equals: usuarioSucursal } };

    if (sucursal !== undefined)
      where["sucursal"] = sucursal && { id: { equals: sucursal } };

    req.where = {
      ...req.where,
      ...where,
    };

    next();
  };
}