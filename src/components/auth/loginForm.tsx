"use client"
import React, { useState, useTransition } from 'react'
import * as z from "zod"
import CardWrapper from './cardWrapper'
import { useForm } from 'react-hook-form'
import { LoginSchema } from "../../../schemas/index"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
// import { Login } from '../../../actions/login'
import { FormSuccess } from '../form.success'
import { useRouter } from 'next/navigation'
import { Tokens } from '../../../typings'
import setCookies from '@/lib/cookies'
import { setCookie } from "cookies-next"

const LoginForm = () => {
    const [Error, setError] = useState<string | undefined>("")
    const [Success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })
    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {

        setError("")
        setSuccess("")
        try {
            const formData = new FormData();
            formData.append('username', values.username);
            formData.append('password', values.password);

            const response = await fetch('http://localhost:8000/api/auth/login/', {
                method: 'POST',
                body: formData,
            })
            if (response.ok) {
                const res: Tokens = await response.json()
                console.log(res)
                await setCookies({access_token: res.access_token, access_expires_in: res.access_expires_in, refresh_token: res.refresh_token, token_type: res.token_type, refresh_token_expires_in: res.refresh_token_expires_in})
                // if(res.error){
                //     setError(res.error)
                // }
                // else{
                //     setSuccess(res.message)
                // }
                router.push('/user/me')
            }

            else {
                startTransition(() => {
                    router.refresh()
                })
            }
        } catch (err) {
            console.error((err as { message: string }).message)
        }
        form.reset()
    }
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <CardWrapper
                headLabel='Welcome Back'
                backButtonLabel="Don't have an account"
                backButtonhref="/auth/register"
                showSocial
            >
                <Form  {...form}>
                    <form
                        className='space-y-5'
                        onSubmit={form.handleSubmit((onSubmit))}>
                        <FormField
                            control={form.control}
                            name='username'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        UserName
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder='Ahsaan Abbasi'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder='*********'
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormError message={Error} />
                        <FormSuccess message={Success} />
                        <Button
                            disabled={isPending}
                            type="submit" className='w-full'>Sign-In</Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}

export default LoginForm