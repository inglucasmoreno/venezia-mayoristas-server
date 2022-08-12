import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from './constants';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpliration: false,
            secretOrKey: jwtConstants.secret
        });
    }

    async validate(payload: any){
        return { 
            mayoristaId: payload.mayoristaId, 
            email: payload.email,
            descripcion: payload.descripcion,
            confirm: payload.confirm,
            role: payload.role,
            activo: payload.activo
        }
    }

}