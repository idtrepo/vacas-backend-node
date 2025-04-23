export class CollaresDTO{
    static parse = ({nombre, ns}) => ({
        nombre: nombre?.toString(),
        ns: ns?.toString()
    });
}