import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    
    constructor(private authService: AuthService){ super(); }
    
    async validate(email: string, password: string): Promise<any>{
        const mayorista = await this.authService.validateMayorista(email, password);
        if(!mayorista) throw new UnauthorizedException();
        return mayorista;
    }
    
}