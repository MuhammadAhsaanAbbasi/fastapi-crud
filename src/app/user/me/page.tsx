// "use client"
import { cookies } from 'next/headers'
import React, { useEffect } from 'react'

const UserPage = () => {
    const cookieStore = cookies().get('access_token');
    console.log(cookieStore);
    return (
        <div>UserPage</div>
    )
}

export default UserPage