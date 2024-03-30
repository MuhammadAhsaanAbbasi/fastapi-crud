'use server'

import { cookies } from 'next/headers'
import { Tokens } from '../../typings'

export default async function setCookies({ access_token, expires_in, refresh_token, token_type }: Tokens) {
    const accessToken_expirationTime = new Date();
    accessToken_expirationTime.setSeconds(accessToken_expirationTime.getSeconds() + expires_in);
    const cookiesArray = [
        {
            name: 'access_token', value: access_token, options: {
                expires: accessToken_expirationTime,
            }
        },
        {
            name: 'refresh_token', value: refresh_token, options: {
                expires: accessToken_expirationTime
            }
        },
        // Add more cookies as needed
    ]
    // console.log(cookiesArray)
    cookiesArray.forEach(cookie => {
        cookies().set(cookie.name, cookie.value, cookie.options)
    })
    const cookieStore = cookies()
    const theme = cookieStore.get('access_token')?.value
    console.log(theme)
}