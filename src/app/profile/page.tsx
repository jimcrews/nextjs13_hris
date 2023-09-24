'use client'

import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react';
import { redirect } from "next/navigation"

import UserCard from "@/components/UserCard"
import { Button } from "@/components/ui/button";


export default function ProfilePage() {

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/')
        }
    })

    return (
        <section className="flex flex-col gap-6">
            
        {session?.user ? (
            <>
            <UserCard user={session?.user} pagetype={"Profile"} />

            <Button onClick={() => signOut()}>Sign Out</Button>
            </>
        ): (
            <p className="flex flex-col items-center mt-12">please wait..</p>
        )}



        </section>
    )

}
