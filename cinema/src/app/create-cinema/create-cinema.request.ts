export interface CreateCinemaRequestBody {
    name: string;
    username: string;
    surname: string;
    email: string;
    password: string;
    web:string;
    address:string;
}
export class CreateCinemaRequestBody implements CreateCinemaRequestBody {
}