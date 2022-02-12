export interface RegisterRequestBody {
    name: string;
    username: string;
    surname: string;
    email: string;
    password: string;
}
export class RegisterRequestBody implements RegisterRequestBody {
}