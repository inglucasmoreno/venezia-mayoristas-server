import { IsNotEmpty } from "class-validator";

export class VentasMayoristasDTO {
    
  @IsNotEmpty()
  readonly mayorista: string;

  @IsNotEmpty()
  readonly total_balanza: number;

  @IsNotEmpty()
  readonly total_no_balanza: number;

  @IsNotEmpty()
  readonly precio_total: number;

  readonly facturacion: any;
  
  @IsNotEmpty()
  readonly comprobante: string;
  
  readonly activo: boolean;

}