"use client"

import Logo from "./logo";

import { useScrollTop } from "../../../hooks/use-scroll-top";
import { cn } from '@/lib/utils'
import { ModeToggle } from "@/components/theme-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from '@clerk/clerk-react'
import { Button } from "../../../components/ui/button";
import { Spinner } from "../../../components/spinner";
import Link from "next/link";

const Navbar = () => {

  const scrolled = useScrollTop()
  const { isAuthenticated, isLoading } = useConvexAuth()

  return (
    <div className={
      cn(
        "dark:bg-[#1F1F1F] z-50 bg-background fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}>
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">

        {isLoading && (
          <Spinner />
        )}

        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode='modal'>
              <Button variant='ghost' size='sm'>Sign in</Button>
            </SignInButton>
            <SignInButton mode='modal'>
              <Button size='sm'>Register</Button>
            </SignInButton>
          </>
        )}

        {isAuthenticated && !isLoading && (
          <>
            <Button variant='ghost' size='sm'>
              <Link href='/documents'>Enter Notes</Link>
            </Button>
            <UserButton afterSignOurUrl={'/'} />
          </>
        )}

        <ModeToggle />

      </div>

    </div>
  )
}

export default Navbar