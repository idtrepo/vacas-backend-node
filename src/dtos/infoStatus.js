export class InfoStatusDTO{
    static parse = ({idGateway, idCollar, rssi, snr, bateria}) => ({
        idGateway: Number.isNaN(parseInt(idGateway)) ? null : parseInt(idGateway),
        idCollar: Number.isNaN(parseInt(idCollar)) ? null : parseInt(idCollar),
        rssi: Number.isNaN(parseInt(rssi)) ? null : parseInt(rssi),
        snr: Number.isNaN(parseInt(snr)) ? null : parseInt(snr),
        bateria: Number.isNaN(parseInt(bateria)) ? null : parseInt(bateria),
    });
}