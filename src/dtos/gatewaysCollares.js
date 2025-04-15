export class GatewaysCollaresDTO {
  static parse = ({ idGateway, idCollar }) => ({
    idGateway: Number.isNaN(parseInt(idGateway)) ? null : parseInt(idGateway),
    idCollar: Number.isNaN(parseInt(idCollar)) ? null : parseInt(idCollar),
  });
}