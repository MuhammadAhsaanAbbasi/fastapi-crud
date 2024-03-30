import * as z from "zod"
import { zfd } from "zod-form-data";

export const LoginSchema = z.object({
        username: z.string().min(2,{
            message:"Username is Required"
        }),
        password: z.string().min(6)
    })


export const RegisterSchema = z.object({
    name:z.string().min(1,{
        message:"Name is Required"
    }),
    email: z.string().email({message:'Email is Required'}),
    password: z.string().min(6)
})