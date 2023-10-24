import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // header에 있는 Bearer token을 가져옴
            ignoreExpiration: false,
            secretOrKey: 'secret_key'
        })
    }


    async validate(payload: { username: string; name: string;}) {
        return payload;
    }
}