import Image from 'next/image'
import React from 'react'

interface Header {
    label:string
}

const Header = ({label}:Header) => {
    return (
        <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
            {/* <Image src={"/assets/logo-black.png"} alt='Tech Heaven' width={250} height={250} className=''/> */}
            <p className='text-xl'>{label}</p>
        </div>
    )
}

export default Header