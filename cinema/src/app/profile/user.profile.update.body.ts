export interface UserInfoUpdateBody {
    refreshToken: string;
    name: string;
    username: string;
    surname: string;
    email: string;
    password: string;
}
export class UserInfoUpdateBody implements UserInfoUpdateBody {
}