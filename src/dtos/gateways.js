export class GatewaysDTO{
    static parse = ({ ns }) => ({
        ns: ns?.toString()
    });
}