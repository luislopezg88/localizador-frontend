import { Dayjs } from 'dayjs'
import { AlertColor } from '@mui/material'

export interface IEmpresa {
    id?: string;
    nombre?: string;
    descripcion?: string;
    tipo?: string;
    empleados: string;
    finalidad?: string;
    instrumento?: string;
    administracion?: string;
    organo?: string;
    tags: Array<string>;
    id_user?: string;
}

export interface ILicitacion {
    _id?: string;
    nombre: string;
    descripcion?: string;
    inicio: Dayjs | null;
    fin: Dayjs | null;
    presupuesto: string;
    id_user?: string;
}

export interface IMessage  {
    show: boolean;
    text: string;
    type: AlertColor
}