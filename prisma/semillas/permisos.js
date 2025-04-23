import { acciones } from "./acciones.js";
import { perfiles } from "./perfiles.js";

const accionesAdministrador = [
  1, 5, 6, 7, 8, 21, 29,30,31,32,33,34,35,36,37,41, 45
];
const accionesSupervisor = [1, 2, 3, 4, 5, 6, 7, 8, 9, 13, 17, 25, 45, 57, 37];

const generarListadoPermisos = () =>
  perfiles
    .map((_, indexPerfil) => {
      const idPerfil = indexPerfil + 1;

      if (idPerfil > 3) return [];

      // Supervisor
      if (idPerfil === 3)
        return acciones
          .map((_, indexAccion) => {
            const idAccion = indexAccion + 1;

            if (!accionesSupervisor.includes(idAccion)) return null;

            return { idPerfil, idAccion };
          })
          .filter((accion) => accion !== null);

      // Administrador
      if (idPerfil === 2)
        return acciones
          .map((_, indexAccion) => {
            const idAccion = indexAccion + 1;

            if (!accionesAdministrador.includes(idAccion)) return null;

            return { idPerfil, idAccion };
          })
          .filter((accion) => accion !== null);

      return acciones.map((_, indexAccion) => {
        const idAccion = indexAccion + 1;

        return {
          idPerfil,
          idAccion,
        };
      });
    })
    .flat();

export const permisos = generarListadoPermisos();