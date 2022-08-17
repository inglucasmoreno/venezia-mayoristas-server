import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProducto } from './interace/productos.interface';

@Injectable()
export class ProductosService {

constructor(@InjectModel('Productos') private readonly productosModel: Model<IProducto>){}

    // Listar productos
    async listarProductos(querys: any): Promise<IProducto[]> {
        
        const {columna, direccion} = querys;

        const pipeline = [];
        pipeline.push({$match:{}});

        // Informacion de unidad_medida
        pipeline.push({
        $lookup: { // Lookup  
            from: 'unidad_medida',
            localField: 'unidad_medida',
            foreignField: '_id',
            as: 'unidad_medida'
        }}
        );

        pipeline.push({ $unwind: '$unidad_medida' });
        
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

        const productos = await this.productosModel.aggregate(pipeline);
        
        return productos;

    }  
    
}
