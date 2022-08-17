import { Controller, Get, HttpStatus, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {

    constructor( private productosService: ProductosService ){}

    // Listar productos
    @UseGuards(JwtAuthGuard)
    @Get('/')
    async listarProductos(@Res() res, @Query() querys) {
        const productos = await this.productosService.listarProductos(querys);
        res.status(HttpStatus.OK).json({
            message: 'Listado de productos correcto',
            productos
        });
    }
    
}
