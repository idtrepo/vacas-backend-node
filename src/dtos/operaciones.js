export class OperacionesDTO{
    static parse = ({nombre}) => ({nombre: nombre?.toString()})
}