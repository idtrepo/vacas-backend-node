export class CategoriasDTO{
    static parse = ({nombre}) => ({nombre: nombre?.toString()})
}