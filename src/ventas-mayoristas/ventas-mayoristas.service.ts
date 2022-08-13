import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { VentasMayoristasDTO } from './dto/ventas-mayoristas.dto';
import { IVentasMayoristas } from './interface/ventas-mayoristas-interface';

@Injectable()
export class VentasMayoristasService {

  constructor(@InjectModel('VentasMayoristas') private readonly ventasModel: Model<IVentasMayoristas>){}
  
  // Venta por ID
  async getVenta(id: string): Promise<IVentasMayoristas> {

      const ventaDB = await this.ventasModel.findById(id);
      if(!ventaDB) throw new NotFoundException('El venta no existe');

      const pipeline = [];

      // Venta por ID
      const idVenta = new Types.ObjectId(id);
      pipeline.push({ $match:{ _id: idVenta } }) 

      // Informacion - Mayorista
      pipeline.push({
        $lookup: { // Lookup
            from: 'mayoristas',
            localField: 'mayorista',
            foreignField: '_id',
            as: 'mayorista'
        }}
      );

      pipeline.push({ $unwind: '$mayorista' });      

      // Informacion - Usuario creador
      pipeline.push({
        $lookup: { // Lookup
            from: 'usuarios',
            localField: 'creatorUser',
            foreignField: '_id',
            as: 'creatorUser'
        }}
      );

      pipeline.push({ $unwind: '$creatorUser' });

      // Informacion - Usuario actualizador
      pipeline.push({
        $lookup: { // Lookup
            from: 'usuarios',
            localField: 'updatorUser',
            foreignField: '_id',
            as: 'updatorUser'
        }}
      );

      pipeline.push({ $unwind: '$updatorUser' });

      const venta = await this.ventasModel.aggregate(pipeline);
      
      return venta[0];

  } 

// Listar ventas
async listarVentas(querys: any): Promise<IVentasMayoristas[]> {
      
    const {columna, direccion} = querys;

    const pipeline = [];
    pipeline.push({$match:{}});

    // Informacion - Mayorista
    pipeline.push({
      $lookup: { // Lookup
          from: 'mayoristas',
          localField: 'mayorista',
          foreignField: '_id',
          as: 'mayorista'
      }}
    );

    pipeline.push({ $unwind: '$mayorista' });      

    // Informacion de usuario creador
    pipeline.push({
      $lookup: { // Lookup
          from: 'usuarios',
          localField: 'creatorUser',
          foreignField: '_id',
          as: 'creatorUser'
      }}
    );

    pipeline.push({ $unwind: '$creatorUser' });

    // Informacion de usuario actualizador
    pipeline.push({
      $lookup: { // Lookup
        from: 'usuarios',
        localField: 'updatorUser',
        foreignField: '_id',
        as: 'updatorUser'
      }}
    );

    pipeline.push({ $unwind: '$updatorUser' });

    // Ordenando datos
    const ordenar: any = {};
    if(columna){
        ordenar[String(columna)] = Number(direccion);
        pipeline.push({$sort: ordenar});
    }      

    const ventas = await this.ventasModel.aggregate(pipeline);
    
    return ventas;

  }  

  // Crear ventas
  async crearVenta(ventaDTO: VentasMayoristasDTO): Promise<IVentasMayoristas> {
      const nuevaVenta = new this.ventasModel(ventaDTO);
      return await nuevaVenta.save();
  }

  // Actualizar venta
  async actualizarVenta(id: string, ventaUpdateDTO: any): Promise<IVentasMayoristas> {
      const venta = await this.ventasModel.findByIdAndUpdate(id, ventaUpdateDTO, {new: true});
      return venta;
  }

}
