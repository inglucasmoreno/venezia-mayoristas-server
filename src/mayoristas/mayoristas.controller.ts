import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MayoristasDTO } from './dto/mayoristas.dto';
import * as bcryptjs from 'bcryptjs';
import { MayoristasService } from './mayoristas.service';
import { MayoristasUpdateDTO } from './dto/mayoristas-update.dto';

@Controller('mayoristas')
export class MayoristasController {
  constructor( private mayoristasService: MayoristasService ){}

    // Mayorista por ID
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getMayorista(@Res() res, @Param('id') mayoristaID) {
        const mayorista = await this.mayoristasService.getMayorista(mayoristaID);
        res.status(HttpStatus.OK).json({
            message: 'Mayorista obtenido correctamente',
            mayorista
        });
    }

    // Listar mayoristas
    @UseGuards(JwtAuthGuard)
    @Get('/')
    async listarMayoristas(@Res() res, @Query() querys) {
        const mayoristas = await this.mayoristasService.listarMayoristas(querys);
        res.status(HttpStatus.OK).json({
            message: 'Listado de mayoristas correcto',
            mayoristas
        });
    }

    // Crear mayorista
    @Post('/')
    async crearMayorista(@Res() res, @Body() mayoristaDTO: MayoristasDTO ) {

        const { password } = mayoristaDTO;

        // Se encripta el password
        const salt = bcryptjs.genSaltSync();
        mayoristaDTO.password = bcryptjs.hashSync(password, salt);

        // Se crea el mayorista
        const mayoristaCreado = await this.mayoristasService.crearMayorista(mayoristaDTO);        
        res.status(HttpStatus.CREATED).json({
            message: 'Mayorista creado correctamente',
            mayorista: mayoristaCreado
        });
    
    }

    // Enviar correo
    @Post('/correo/confirmacion')
    async enviarCorreo(@Res() res, @Body() data: any ) {
        const { id, email } = data;
        await this.mayoristasService.enviarCorreo(id, email);        
        res.status(HttpStatus.CREATED).json({
            message: 'Correo enviado correctamente',
        });
    }

    // Actualizar mayorista
    @Put('/:id')
    async actualizarUsuario(@Res() res, @Body() mayoristaUpdateDTO: MayoristasUpdateDTO, @Param('id') mayoristaID ) {

        const { password } = mayoristaUpdateDTO;

        if(password){
            const salt = bcryptjs.genSaltSync();
            mayoristaUpdateDTO.password = bcryptjs.hashSync(password, salt);
        }

        const mayorista = await this.mayoristasService.actualizarMayorista(mayoristaID, mayoristaUpdateDTO);

        res.status(HttpStatus.OK).json({
            message: 'Mayorista actualizado correctamente',
            mayorista
        });

    }
    
}
