"use client"
import React, { useState,useTransition } from 'react'
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

const LoginForm = () => {
    const [Error, setError] = useState<string | undefined>("")
    const [Success, setSuccess] = useState<string | undefined>("")
    const [isPending,startTransition] = useTransition()
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password:""
        }
    })
    const router = useRouter()
    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")
        try {
            const data = await fetch("/api/auth/sign-in", {
                method: "POST",
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if(data.ok){
                const res = await data.json()
                if(res.error){
                    setError(res.error)
                }
                else{
                    setSuccess(res.message)
                }
            }
            else{
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
            <Form {...form}>
                <form 
                className='space-y-5'
                onSubmit={form.handleSubmit((onSubmit))}>
                    <FormField
                    control={form.control}
                    name='email'
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input
                                {...field}
                                disabled={isPending}
                                placeholder='abc@example.com'
                                type="email"
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name='password'
                    render={({field})=>(
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
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <FormError message={Error} />
                    <FormSuccess message={Success}/>
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