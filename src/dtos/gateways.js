export class GatewayDTO{
    static parse = ({ ns }) => ({
        ns: ns?.toString()
    });
}