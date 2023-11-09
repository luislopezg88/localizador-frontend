import { Dayjs } from 'dayjs'

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

export interface ILicitacion {
    id?: string;
    nombre?: string;
    descripcion?: string;
    inicio?: Dayjs | null;
    fin?: Dayjs | null;
    presupuesto: string;
    id_user?: string;
}