import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { MayoristasService } from 'src/mayoristas/mayoristas.service';


@Injectable()
export class AuthService {

    constructor(private mayoristasService: MayoristasService,
                private jwtService: JwtService,){}

    // Validar mayorista
    async validateMayorista(username: string, pass: string): Promise<any> {
        const mayorista = await this.mayoristasService.getMayoristaPorEmail(username);
        if(!mayorista) throw new NotFoundException('Datos incorrectos'); // El usuario no coincide
        const validPassword = bcryptjs.compareSync(pass, mayorista.password);
        if(mayorista && validPassword){
            const { password, ...result } = mayorista;
            return result;
        }
        throw new NotFoundException('Datos incorrectos'); // EL password no coincide
    }

    // Login - Mayoristas
    async login(mayorista: any){
        const payload = {
            mayoristaId: String(mayorista._doc._id),
            email: mayorista._doc.email,
            descripcion: mayorista._doc.descripcion,
            confirm: mayorista._doc.confirm,
            role: mayorista._doc.role,
            activo: mayorista._doc.activo
        };
        return {
            token: this.jwtService.sign(payload)
        }
    }

}
