import { Role } from './role';

export class User {
    id: number;
    name: string;
    password: string;
    email: string;
    roles: Role[];

    constructor(id?: number, name?: string, password?: string, email?: string, roles?: Role[]) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.roles = roles;
    }
}