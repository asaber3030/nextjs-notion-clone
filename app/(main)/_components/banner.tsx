'use client'

import { Id } from "../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";
import { ConfirmModal } from "../../../components/modals/confirm-modal";

interface BannerProps {
  documentId: Id<'documents'>
}

const Banner = ({ documentId }: BannerProps) => {

  const router = useRouter()

  const remove = useMutation(api.documents.remove)
  const restore = useMutation(api.documents.restore)

  const onRemove = () => {
    const promise = remove({
      id: documentId
    })

    toast.promise(promise, {
      loading: 'Deleting Note',
      success: 'Deleted!',
      error: 'Failed to delete!'
    })

    router.push('/documents')
  }
  const onRestore = () => {
    const promise = restore({
      id: documentId
    })
    toast.promise(promise, {
      loading: 'Restoring Note',
      success: 'Restored!',
      error: 'Failed to restore!'
    })
  }

  return (
    <div className='w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center'>
      This note is trashed!
      <Button size='sm' onClick={onRestore} variant='outline' className='border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal'>
        Restore Note
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button size='sm' variant='outline' className='border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal'>
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  )
}

export default Banner