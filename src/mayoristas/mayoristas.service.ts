import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MayoristasUpdateDTO } from './dto/mayoristas-update.dto';
import { MayoristasDTO } from './dto/mayoristas.dto';
import { IMayoristas } from './interface/mayoristas.interface';
import { transporter } from '../config/email.config';

@Injectable()
export class MayoristasService {
  constructor(@InjectModel('Mayoristas') private readonly mayoristasModel: Model<IMayoristas>){}
    
  // Mayorista por ID
  async getMayorista(id: string): Promise<IMayoristas> {
      const mayorista = await this.mayoristasModel.findById(id);
      if(!mayorista) throw new NotFoundException('El mayorista no existe');
      return mayorista;
  }  

  // Mayorista por email
  async getMayoristaPorEmail(email: string): Promise<IMayoristas> {
        const mayorista = await this.mayoristasModel.findOne({ email, activo: true });
        return mayorista;
  }  

  // Listar mayoristas
  async listarMayoristas(querys: any): Promise<IMayoristas[]> {
      
      const {columna, direccion} = querys;

      // Ordenar
      let ordenar = [columna || 'descripcion', direccion || 1];

      const mayoristas = await this.mayoristasModel.find().sort([ordenar]);
      return mayoristas;
  }  

  // Crear mayorista
  async crearMayorista(mayoristaDTO: MayoristasDTO): Promise<IMayoristas> {

    const { email, password } = mayoristaDTO;

    // Verificamos que el mayorista no esta repetido
    let mayoristaDB = await this.getMayoristaPorEmail(email);
    if(mayoristaDB) throw new NotFoundException('El email ya se encuentra registrado');

    // Creacion de usuario
    const nuevoMayorista = new this.mayoristasModel(mayoristaDTO);
    const mayorista = await nuevoMayorista.save();
    
    // Envio de correo electronico de confirmacion
    await transporter.sendMail({
        from: 'Activacion de cuenta <morenoluketi@gmail.com>',
        to: email,
        subject: 'Venezia panaderia',
        html: `
        <p> ??Muchas gracias por sumarte a nuestra plataforma!, a continuaci??n te enviamos el link para la activaci??n de tu cuenta. </p>
        <a href='http://178.128.146.6:3001/confirm/${mayorista._id}' target='_blank'> Haga click aqui! </a>
        `
    }).catch(()=>{
        throw new NotFoundException('Error al enviar correo electr??nico');
    });

    return mayorista;

  }

  // Actualizar mayorista
  async actualizarMayorista(id: string, mayoristaUpdateDTO: MayoristasUpdateDTO): Promise<IMayoristas> {

      const { email } = mayoristaUpdateDTO;

      // Se verifica si el mayorista a actualizar existe
      let mayoristaDB = await this.getMayorista(id);
      if(!mayoristaDB) throw new NotFoundException('El mayorista no existe');
      
      // Verificamos que el email no este repetido
      if(email && mayoristaDB.email !== email){
          const mayoristaDBEmail = await this.getMayoristaPorEmail(email);
          if(mayoristaDBEmail) throw new NotFoundException('El mayorista ya esta registrado');
      }

      const mayoristaRes = await this.mayoristasModel.findByIdAndUpdate(id, mayoristaUpdateDTO, {new: true});
      return mayoristaRes;
      
  }

  // Reenviar correo de confirmacion
  async enviarCorreo(idMayorista, email): Promise<any> {

    // Envio de correo electronico de confirmacion
    await transporter.sendMail({
        from: 'Activacion de cuenta <morenoluketi@gmail.com>',
        to: email,
        subject: 'Venezia panaderia',
        html: `
        <p> ??Muchas gracias por sumarte a nuestra plataforma!, a continuaci??n te enviamos el link para la activaci??n de tu cuenta. </p>
        <a href='http://178.128.146.6:3001/confirm/${idMayorista}' target='_blank'> Haga click aqui! </a>
        `
        }).catch(()=>{
        throw new NotFoundException('Error al enviar correo electr??nico');
    });  

  }

}
