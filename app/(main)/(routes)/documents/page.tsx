"use client"

import Image from "next/image";

import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";

import { Button } from "../../../../components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

import { api } from '@/convex/_generated/api'
import {useRouter} from "next/navigation";

const Documents = () => {

  const { user } = useUser()

  const router = useRouter()
  const create = useMutation(api.documents.create)

  const onCreate = () => {
    const promise = create({ title: 'Untitled' }).then(docId => router.push(`/documents/${docId}`))
    toast.promise(promise, {
      loading: 'Creating new note...',
      success: 'Created!',
      error: 'Failed!'
    })

  }

  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image
        src={'/empty.png'}
        alt='Empty docs'
        width='300'
        height='300'
        className='dark:hidden'
      />
      <Image
        src={'/empty.png'}
        alt='Empty docs'
        width='300'
        height='300'
        className='hidden dark:block'
      />
      <h2 className='text-lg font-medium'>
        Welcome to {user?.firstName}&apos;s PotionNotes
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className='h-4 w-4 mr-2' />
        Create a note
      </Button>
    </div>
  )
}

export default Documents