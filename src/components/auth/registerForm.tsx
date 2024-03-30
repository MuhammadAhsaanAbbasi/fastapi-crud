"use client"
import React, { useState, useTransition } from 'react'
import * as z from "zod"
import CardWrapper from './cardWrapper'
import { useForm } from 'react-hook-form'
import { RegisterSchema } from '../../../schemas/index'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form.success'
import { useRouter } from 'next/navigation'

const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("")
    const [Success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });
    const router = useRouter()

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        setError("")
        setSuccess("")
        try {
            const response = await fetch("http://localhost:8000/api/auth/signup/", {
                method: "POST",
                headers: {
                    "request-mode": "no cors",
                    "content-type": "application/json"
                },
                body: JSON.stringify({ 
                    "username": values.name,
                    "email": values.email,
                    "hashed_password": values.password,
                })
            })
            if (response.ok) {
                const res = await response.json()
                if (res.error) {
                    setError(res.error)
                }
                else {
                    setSuccess(res.message)
                }
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
                headLabel='Create an Account'
                backButtonLabel="Already have an Account"
                backButtonhref="/auth/sign-in"
                showSocial
            >
                <Form {...form}>
                    <form
                        className='space-y-5'
                        onSubmit={form.handleSubmit((onSubmit))}
                    >
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Name
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
                            name='email'
                            render={({ field }) => (
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
                        <FormError message={error} />
                        <FormSuccess message={Success} />
                        <Button
                            disabled={isPending}
                            type="submit" className='w-full'>Create an Account</Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}

export default RegisterForm