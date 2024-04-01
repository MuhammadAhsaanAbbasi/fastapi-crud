'use server'
import { Tokens } from "../../typings";
import setCookies from "./cookies";
import { cookies } from 'next/headers'

export async function create_refresh_token(){
    const cookieStore = cookies();
    await cookieStore.set('refresh_token', JSON.stringify('ref_token'));
    const ref_token = cookieStore.get('refresh_token')?.value;
    const refresh = ref_token as string;
    console.log("refresh token: " + refresh);
    try {
        const response = await fetch("http://localhost:8000/api/auth/token/", {
            method: "POST",
            headers: {
                "request-mode": "no-cors",
                "Authorization": `Bearer ${refresh}`
            } // Let the browser handle Content-Type and boundary
        });
        const res = await response.json() as Tokens;
        return res; // Return tokens for middleware to handle
    console.log(res);
    }catch (error) {
            console.error(error)
        }
    }