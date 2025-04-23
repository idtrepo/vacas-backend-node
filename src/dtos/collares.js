export class CollaresDTO{
    static parse = ({nombre, ns}) => ({
        ns: ns?.toString()
    });
}