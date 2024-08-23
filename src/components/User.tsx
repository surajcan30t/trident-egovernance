import Image from 'next/image'
// import React from 'react'

// const User = () => {
//     const username = ['John Doe', 'Jane Doe', 'Alice Smith', 'Bob Johnson']
//     const userrole = ['Admin', 'Student', 'Faculty', 'Staff']
//     const branch = ['CSE', 'CST', 'CSIT']
//     const singleUser = userrole[Math.floor(Math.random() * userrole.length)]
//     return (
//         <div className='w-[20vw] h-screen bg-slate-500 p-4 flex flex-col justify-start items-center rounded-md'>
// <div className='relative w-[150px] h-[150px] border border-black rounded-full overflow-hidden'>
//     <Image className='object-cover' src={"/user.png"} alt='user' fill sizes='100vw' />
// </div>
// <h1 className='text-white font-bold text-xl'>{username[Math.floor(Math.random() * userrole.length)]}</h1>
// <h1 className='text-white font-semibold text-base'>{singleUser}</h1>
// <h1 className='text-white font-semibold text-base'>{branch[Math.floor(Math.random() * branch.length)]}</h1>
//         </div>
//     )
// }



import { BellIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const notifications = [
    {
        title: "Your call has been confirmed.",
        description: "1 hour ago",
    },
    {
        title: "You have a new message!",
        description: "1 hour ago",
    },
    {
        title: "Your subscription is expiring soon!",
        description: "2 hours ago",
    },
]

type CardProps = React.ComponentProps<typeof Card>

const User = ({ className, ...props }: CardProps) => {

    const username = ['John Doesdjh', 'Swayam Prakash Mohanty Mohanty', 'Swayam Prakash Mohanty', 'Bob Johnson']
    const userrole = ['Admin', 'Student', 'Faculty', 'Staff']
    const branch = ['CSE', 'CST', 'CSIT']

    return (
        <Card className={cn("w-[380px]", className)} {...props}>

            <CardContent className="grid gap-4 ">
                <div className='flex space-x-4 items-center'>
                    <div className='relative w-[100px] h-[100px] rounded-full overflow-hidden shrink-0'>
                        <Image className='object-cover' src={"/user.png"} alt='user' fill sizes='100vw' />
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='font-bold text-base'>{username[Math.floor(Math.random() * userrole.length)]}</h1>
                        <h1 className='font-semibold text-base'>{userrole[Math.floor(Math.random() * branch.length)]}</h1>
                        <h1 className='font-semibold text-base'>{branch[Math.floor(Math.random() * branch.length)]}</h1>
                    </div>
                </div>
            </CardContent>

        </Card>
    )
}

export default User