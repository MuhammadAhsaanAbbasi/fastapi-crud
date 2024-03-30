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