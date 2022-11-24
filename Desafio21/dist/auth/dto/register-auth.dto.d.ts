import { LoginAuthDto } from './login-auth.dto';
declare const RegisterAuthDto_base: import("@nestjs/common").Type<Partial<LoginAuthDto>>;
export declare class RegisterAuthDto extends RegisterAuthDto_base {
    name: string;
}
export {};
