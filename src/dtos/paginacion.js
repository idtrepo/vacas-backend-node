const VALORES_BOOLEANOS_VERDADEROS = ["true", "1", true, 1];

export class PaginacionDTO {
  static parse = ({ elementos = 8, listado = false, pagina = 1 }) => {
    if (VALORES_BOOLEANOS_VERDADEROS.includes(listado)) listado = true;
    else listado = false;

    console.log({
      listado,
      elementos,
      pagina,
    });

    return {
      listado,
      pagina: parseInt(pagina),
      elementos: parseInt(elementos),
    };
  };
}
