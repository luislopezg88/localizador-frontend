export interface IEmpresa {
    id?: string;
    nombre?: string;
    descripcion?: string;
    finalidad?: string;
    sector?: string;
    empleados?: string;
    intereses?: string;
    tags: Array<string>;
    id_user?: string;
}