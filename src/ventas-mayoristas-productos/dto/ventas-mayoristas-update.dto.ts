export class VentasMayoristasProductosUpdateDTO {
   
  readonly venta_mayorista: string;

  readonly producto: string;

  readonly descripcion: string;

  readonly balanza: string;
  
  readonly precio: number;

  readonly precio_unitario: number;

  readonly unidad_medida: string;

  readonly cantidad: number;

  readonly activo: boolean;
  
  readonly creatorUser: Date;
  
  readonly updatorUser: Date;

}