const VALORES_BOOLEANOS_FALSOS = ["false", "0", false, 0];

export class QueryDTO {
  static parse = ({
    estatus,
    nombre,
    fecha,
    mac,
    clave,
    correo,
    apellido,

    sucursal,
    valor,
    sensor,
    modulo,
    cliente,
    area,
    perfil,
    operacion,
    categoria,
    accion,
  }) => {
    estatus = !VALORES_BOOLEANOS_FALSOS.includes(estatus);

    sucursal &&= parseInt(sucursal);
    valor &&= parseInt(valor);
    sensor &&= parseInt(sensor);
    modulo &&= parseInt(modulo);
    cliente &&= parseInt(cliente);
    area &&= parseInt(area);
    perfil &&= parseInt(perfil);
    operacion &&= parseInt(operacion);
    categoria &&= parseInt(categoria);
    accion &&= parseInt(accion);

    return {
      estatus,
      nombre,
      fecha,
      mac,
      clave,
      correo,
      apellido,

      sucursal,
      valor,
      sensor,
      modulo,
      cliente,
      area,
      perfil,
      operacion,
      categoria,
      accion,
    };
  };
}
