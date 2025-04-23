import { categorias } from "./categorias.js";
import { operaciones } from "./operaciones.js";

const generarListadoAcciones = () => {
  const acciones = categorias.map(({ nombre: nombreCategoria }, indexCategoria) => {
    return operaciones.map(({ nombre: nombreOperacion }, indexOperacion) => {
      return {
        nombre: `${nombreCategoria}-${nombreOperacion}`,
        idOperacion: indexOperacion + 1,
        idCategoria: indexCategoria + 1,
      };
    });
  });

  return acciones.flat();
};

export const acciones = generarListadoAcciones();