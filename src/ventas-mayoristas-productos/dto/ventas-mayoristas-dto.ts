import { IsNotEmpty } from "class-validator";

export class VentasMayoristasProductosDTO {
   
  @IsNotEmpty()
  readonly venta_mayorista: string;

  @IsNotEmpty()
  readonly producto: string;

  @IsNotEmpty()
  readonly descripcion: string;

  @IsNotEmpty()
  readonly balanza: string;
  
  @IsNotEmpty()
  readonly precio: number;

  @IsNotEmpty()
  readonly precio_unitario: number;

  @IsNotEmpty()
  readonly unidad_medida: string;

  @IsNotEmpty()
  readonly cantidad: number;

  readonly activo: boolean;
  
  readonly creatorUser: Date;
  
  readonly updatorUser: Date;

}