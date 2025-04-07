import { JwtPayload, SignOptions } from 'jsonwebtoken';
import { TokenTypeEnum } from '../enum/token-type.enum';

export interface JwtServiceInterface {
    createJwt(payload: Record<string, any>, options?: SignOptions): Promise<string>;
    verifyJwt(authHeader: string, tokenType: TokenTypeEnum): Promise<JwtPayload>;
}
