export interface User {
    email: string;
    password: string;
    role?: 'admin' | 'user' | 'guest';
    status?: 'active' | 'inactive' | 'banned';
    created_at?: Date;
    updated_at?: Date;
    last_login?: Date;
}
