'use client'

import { useState } from 'react';
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react';
import { redirect } from "next/navigation"

import UserCard from "@/components/UserCard"
import { Button } from "@/components/ui/button";


export default function ProfilePage() {

    const [isLoading, setIsloading] = useState(false)

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/')
        }
    })

    const handleSignOut = () => {
        setIsloading(true)
        signOut();
    }

    return (
        <section className="flex flex-col gap-6">
            
        {session && session?.user && !isLoading ? (
            <>
            <UserCard user={session?.user} pagetype={"Profile"} />

            <Button onClick={() => handleSignOut()}>Sign Out</Button>
            </>
        ): (
            <p className="flex flex-col items-center mt-12">please wait..</p>
        )}



        </section>
    )

}
