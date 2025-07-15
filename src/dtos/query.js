const VALORES_BOOLEANOS_FALSOS = ["false", "0", false, 0];

export class QueryDTO {
  static parse = ({
    id,
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
    ns,
    collar,
    vaca,
    gateway
  }) => {
    estatus = !VALORES_BOOLEANOS_FALSOS.includes(estatus);

    id &&= parseInt(id);
    sucursal &&= parseInt(sucursal);
    cliente &&= parseInt(cliente);
    perfil &&= parseInt(perfil);
    operacion &&= parseInt(operacion);
    categoria &&= parseInt(categoria);
    accion &&= parseInt(accion);
    collar &&= parseInt(collar);
    vaca &&= parseInt(vaca);
    gateway &&= parseInt(gateway);

    return {
      estatus,
      id,
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
      ns,
      collar,
      vaca,
      gateway,
    };
  };
}
