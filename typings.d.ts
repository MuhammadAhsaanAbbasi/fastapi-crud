export interface Todo {
    id: number,
    name: string,
    status: boolean
}

export interface Tokens {
    access_token: string,
    expires_in: number,
    refresh_token: string,
    token_type: string
}

export interface User {
    id: number,
    username: string,
    updated_at: string,
    hashed_password: string,
    imageUrl: string,
    email: string,
    is_active: boolean,
    is_verified: boolean,
    role: string,
    created_at: string
}