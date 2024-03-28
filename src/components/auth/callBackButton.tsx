import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';

interface CallBackButtonProps {
    label: string;
    href: string;
}

const BackButton = ({ label, href }: CallBackButtonProps) => {
    return (
        <>
        <Button 
        variant={"link"}
        className='w-full items-center justify-center'
        >
            <Link href={href}>
            {label}
            </Link>
        </Button>
        </>
    )
}

export default BackButton