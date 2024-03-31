"use client"
import React from 'react'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import { Button } from './button'


const Social = () => {
    const googleRedirect = () => {
        window.location.href = `http://localhost:8000/api/auth/google/login`;
    };
    return (
        <div className='flex w-full items-center gap-x-2'>
            <Button
                variant={"outline"}
                className='w-full'
                onClick={() => {googleRedirect()}}
            >
                <FaGoogle className='w-5 h-5' />
            </Button>
            <Button
                variant={"outline"}
                className='w-full'
                onClick={() => { }}
            >
                <FaGithub className='w-5 h-5' />
            </Button>
        </div>
    )
}

export default Social