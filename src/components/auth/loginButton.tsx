"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

interface LoginButtonProps {
    children:React.ReactNode
    mode?:"modal"|"redirect"
    asChild?:boolean
}

const LoginButton = ({children,mode,asChild}:LoginButtonProps) => {
    const router = useRouter()
    const onClick=()=>{
        router.push("/auth/sign-in")
    }
    if(mode==="modal"){
        return(
            <span>
                Todo Added or Embeded
            </span>
        )
    }
    return (
        <span onClick={onClick}>
            {children}
        </span>
    )
}

export default LoginButton