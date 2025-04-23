const VALORES_BOOLEANOS_FALSOS = ["false", "0", false, 0];

export class QueryDTO {
  static parse = ({
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
  }) => {
    estatus = !VALORES_BOOLEANOS_FALSOS.includes(estatus);

    sucursal &&= parseInt(sucursal);
    cliente &&= parseInt(cliente);
    perfil &&= parseInt(perfil);
    operacion &&= parseInt(operacion);
    categoria &&= parseInt(categoria);
    accion &&= parseInt(accion);

    return {
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
    };
  };
}
