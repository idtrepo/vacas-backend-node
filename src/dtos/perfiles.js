export class PerfilesDTO{
    static parse = ({nombre}) => ({nombre: nombre?.toString()})
}