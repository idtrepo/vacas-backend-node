export class UsuariosDTO {
  static parse = ({
    correo,
    password,
    nombre,
    apellido,
    idPerfil,
    idCliente,
    idArea,
    idSucursal,
  }) => {
    nombre = nombre?.toString();
    correo = correo?.toString();
    password = password?.toString()
    apellido = apellido?.toString();
    idCliente &&= parseInt(idCliente);
    idPerfil &&= parseInt(idPerfil);
    idArea &&= parseInt(idArea);
    idSucursal &&= parseInt(idSucursal);
    return {
      correo,
      password,
      nombre,
      apellido,
      idPerfil,
      idCliente,
      idArea,
      idSucursal,
    };
  };
}
