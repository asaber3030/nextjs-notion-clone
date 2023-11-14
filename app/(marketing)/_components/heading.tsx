"use client"

import { Button } from "../../../components/ui/button";
import { ArrowRight } from "lucide-react";
import { useConvexAuth } from "convex/react";
import { SignInButton } from '@clerk/clerk-react'
import { Spinner } from "../../../components/spinner";
import Link from "next/link";

const Heading = () => {

  const { isLoading, isAuthenticated } = useConvexAuth()

  return (
    <div className='max-w-3xl space-y-4'>
      <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-400'>Your ideas, docs, and your plans, Welcome to <span className='underline'>Potion</span></h1>
      <h3 className='text-base sm:text-xl md:text-2xl font-medium'>Potion is the connected workspace where <br /> better, faster work happens</h3>

      {!isLoading && isAuthenticated && (
        <Button>
          <Link href='/documents'>Enter Potion <ArrowRight className='h-4 w-4 ml-2' /></Link>
        </Button>
      )}

      {isLoading && (
        <div className='w-full flex items-center justify-center'>
          <Spinner size='large' />
        </div>
      )}

      {!isLoading && !isAuthenticated && (
        <SignInButton mode='modal'>
          <Button>Join us now! <ArrowRight className='h-4 w-4 ml-2' /></Button>
        </SignInButton>
      )}


    </div>
  )
}

export default Heading