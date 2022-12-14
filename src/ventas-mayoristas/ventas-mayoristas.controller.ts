import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { VentasMayoristasUpdateDTO } from './dto/ventas-mayoristas-update.dto';
import { VentasMayoristasDTO } from './dto/ventas-mayoristas.dto';
import { VentasMayoristasService } from './ventas-mayoristas.service';

@Controller('ventas-mayoristas')
export class VentasMayoristasController {

  constructor( private ventasService: VentasMayoristasService ){}

  // Venta por ID
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getVentas(@Res() res, @Param('id') ventaID) {
      const venta = await this.ventasService.getVenta(ventaID);
      res.status(HttpStatus.OK).json({
          message: 'Venta obtenido correctamente',
          venta
      });
  }

  // Listar ventas
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async listarVentas(@Res() res, @Query() querys) {
      const ventas = await this.ventasService.listarVentas(querys);
      res.status(HttpStatus.OK).json({
          message: 'Listado de ventas correcto',
          ventas
      });
  }

  // Crear ventas
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async crearVentas(@Res() res, @Body() data: any ) {
      await this.ventasService.crearVenta(data);        
      res.status(HttpStatus.CREATED).json({
          message: 'Venta creada correctamente',
      });
  }
    
  // Actualizar venta
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async actualizarVenta(@Res() res, @Body() ventaUpdateDTO: VentasMayoristasUpdateDTO, @Param('id') ventaID ) {
      
      const venta = await this.ventasService.actualizarVenta(ventaID, ventaUpdateDTO);

      res.status(HttpStatus.OK).json({
          message: 'Venta actualizada correctamente',
          venta
      });

  }

}
