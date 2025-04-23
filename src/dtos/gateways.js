export class GatewaysDTO{
    static parse = ({ ns, idCliente, idSucursal }) => ({
        ns: ns?.toString(),
        idCliente: Number.isNaN(parseInt(idCliente)) ? null : parseInt(idCliente),
        idSucursal: Number.isNaN(parseInt(idSucursal)) ? null : parseInt(idSucursal)
    });
}