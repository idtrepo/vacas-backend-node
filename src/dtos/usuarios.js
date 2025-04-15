export class UsuariosDTO {
  static parse = ({
    correo,
    password,
    nombre,
    apellido,
    idPerfil,
    idCliente,
    idSucursal,
  }) => {
    nombre = nombre?.toString();
    correo = correo?.toString();
    password = password?.toString()
    apellido = apellido?.toString();
    idCliente &&= parseInt(idCliente);
    idPerfil &&= parseInt(idPerfil);
    idSucursal &&= parseInt(idSucursal);
    return {
      correo,
      password,
      nombre,
      apellido,
      idPerfil,
      idCliente,
      idSucursal,
    };
  };
}
