import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Header from '@/components/auth/header';
import Social from '../ui/social';
import BackButton from './callBackButton';

interface CardWrapperProps {
    children: React.ReactNode
    headLabel: string;
    backButtonLabel: string;
    backButtonhref: string;
    showSocial?: boolean
}


const CardWrapper = ({
    children, headLabel, backButtonLabel, backButtonhref, showSocial
}: CardWrapperProps) => {
    return (
        <Card className='w-[400px] shadow-md'>
            <CardHeader>
                <Header label={headLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonhref} />
            </CardFooter>
        </Card>
    )
}

export default CardWrapper