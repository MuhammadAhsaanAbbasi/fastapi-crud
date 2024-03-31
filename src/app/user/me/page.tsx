import { Button } from '@/components/ui/button';
import { MailCheckIcon } from 'lucide-react';
import { cookies } from 'next/headers'
import { User } from '../../../../typings';
import Image from 'next/image';

const UserPage = async () => {
    const cookieStore = cookies().get('access_token');
    // console.log(cookieStore);
    const getUser = await fetch("http://localhost:8000/api/auth/user/me/", {
        method: "GET",
        headers: {
            "request-mode": "no-cors",
            "Authorization": `Bearer ${cookieStore?.value}`
        }
    })
    const user: User = await getUser.json();
    console.log(user);
    return (
        <main className="h-screen flex items-center justify-center">

            <div className="max-w-2xl my-auto mx-auto p-6 bg-white rounded-lg shadow-md w-full">
                <div className="flex justify-between items-center mb-4">
                    {user.imageUrl && <Image src={user.imageUrl} width={56} height={56} alt='pictureURL' className="flex items-center gap-2" />}
                    <PanelTopCloseIcon className="w-6 h-10" />
                </div>
                <div className="border-b-2 border-blue-600 py-2 mb-4">
                    <div className="text-lg font-semibold border-none p-0" />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm font-semibold" htmlFor="fieldName">
                            Google Details Received in Cookies
                        </label>
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <Button className="flex items-center gap-2" variant="secondary">
                        <PlusIcon className="w-4 h-4" />
                        Name{"\n          "}
                        {user.username}
                    </Button>
                    <Button className="flex items-center gap-2" variant="secondary">
                        <MailCheckIcon className="w-4 h-4" />
                        Email{"\n          "}{user.email}
                    </Button>
                </div>
            </div>
        </main>
    );
}

export default UserPage

function PanelTopCloseIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <line x1="3" x2="21" y1="9" y2="9" />
            <path d="m9 16 3-3 3 3" />
        </svg>
    );
}

function PlusIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    );
}