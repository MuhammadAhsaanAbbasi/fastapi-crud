"use client"
import React from 'react'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import { Button } from './button'


const Social = () => {
    return (
        <div className='flex w-full items-center gap-x-2'>
            <Button
            variant={"outline"}
            className='w-full'
            onClick={()=>{}}
            >
            <FaGoogle className='w-5 h-5'/>
            </Button>
            <Button
            variant={"outline"}
            className='w-full'
            onClick={()=>{}}
            >
            <FaGithub className='w-5 h-5'/>
            </Button>
        </div>
    )
}

export default Social