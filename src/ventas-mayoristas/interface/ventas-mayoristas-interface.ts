import { Document } from 'mongoose';

export interface IVentasMayoristas extends Document {
    readonly mayorista: string;
    readonly total_balanza: number;
    readonly total_no_balanza: number;
    readonly precio_total: number;
    readonly facturacion: any;
    readonly comprobante: string;
    readonly activo: boolean;
}