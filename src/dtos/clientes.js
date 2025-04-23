export class ClientesDTO{
    static parse = ({nombre}) => ({nombre: nombre?.toString()})
}