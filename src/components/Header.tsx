"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation'

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Container from "./container";
import { Button } from "./ui/button";
import ProfileButton from "./ProfileButton";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

export const Header = () => {
    const pathname = usePathname()
    const { data: session } = useSession();

    const routes = [
        {
            href: "/",
            label: "About Us",
        },
        {
            href: "/",
            label: "FAQs",
        },
        {
            href: "/",
            label: "Contact Us",
        },
    ];

    return (
        <header className="sm:flex sm:justify-between py-3 px-4 border-b">
            <Container>
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
                    <div className="flex items-center">

                        <Sheet>
                            <SheetTrigger>
                                <Menu className="h-6 md:hidden w-6" />
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                                <nav className="flex flex-col gap-4">
                                    {routes.map((route, i) => (
                                        <Link
                                            key={i}
                                            href={route.href}
                                            className="block px-2 py-1 text-lg"
                                        >
                                            {route.label}
                                        </Link>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>

                        <Link href="/" className="ml-4 lg:ml-0">
                            <img
                            className="pr-2"
                            src="/assets/images/logo-placeholder.png"
                            alt=""
                            style={{ height: "3rem" }}
                        />
                        </Link>
                    </div>

                    <nav className="mx-6 items-center space-x-4 lg:space-x-6 hidden md:block">
                        {routes.map((route, i) => (
                            <Button asChild variant="ghost" key={i}>
                                <Link
                                    key={i}
                                    href={route.href}
                                    className="text-sm font-medium transition-colors"
                                >
                                    {route.label}
                                </Link>
                            </Button>
                        ))}
                    </nav>

                    <div className="flex items-center">
                        {session?.user ? (
                            <ProfileButton profileImageUrl={session.user.image} />
                        ) : (
                            <>
                                <button
                                    type='button'
                                    onClick={() => {
                                        // clicking signing when already at /login adds duplicated 'callbackUrl' to query params
                                        if (pathname !== "/login") {
                                            signIn();
                                        }
                                    }}
                                    className='black_btn'
                                >
                                    Sign in
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </header>
    )
}
