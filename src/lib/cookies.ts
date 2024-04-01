'use server'
import { cookies } from 'next/headers'
import { Tokens } from '../../typings'

export default async function setCookies({ access_token, access_expires_in, refresh_token, token_type, refresh_token_expires_in }: Tokens) {
    const accessToken_expirationTime = new Date();
    accessToken_expirationTime.setSeconds(accessToken_expirationTime.getSeconds() + access_expires_in);
    const refreshToken_expirationTime = new Date();
    refreshToken_expirationTime.setSeconds(refreshToken_expirationTime.getSeconds() + refresh_token_expires_in);
    const cookiesArray = [
        {
            name: 'access_token', value: access_token, options: {
                expires: accessToken_expirationTime,
            }
        },
        {
            name: 'refresh_token', value: refresh_token, options: {
                expires: refreshToken_expirationTime
            }
        },
        // Add more cookies as needed
    ]
    // console.log(cookiesArray)
    cookiesArray.forEach(cookie => {
        cookies().set(cookie.name, cookie.value, cookie.options)
    })
}