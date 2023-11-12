import { Dayjs } from 'dayjs'

export interface IEmpresa {
    id?: string;
    nombre?: string;
    descripcion?: string;
    finalidad?: string;
    tipo?: string;
    empleados: string;
    instrumento?: string;
    tags: Array<string>;
    id_user?: string;
}

export interface ILicitacion {
    id?: string;
    nombre: string;
    descripcion?: string;
    inicio: Dayjs | null;
    fin: Dayjs | null;
    presupuesto: string;
    id_user?: string;
}