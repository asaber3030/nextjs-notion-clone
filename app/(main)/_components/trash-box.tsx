'use client'

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";

import { ConfirmModal } from "../../../components/modals/confirm-modal";
import { Spinner } from "../../../components/spinner";
import { Id } from "../../../convex/_generated/dataModel";

import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";
import { Search, Trash, Undo } from "lucide-react";
import { Input } from "../../../components/ui/input";

const TrashBox = () => {

  const router = useRouter()
  const params = useParams()
  const documents = useQuery(api.documents.getTrashed)
  const restore = useMutation(api.documents.restore)
  const remove = useMutation(api.documents.remove)

  const [search, setSearch] = useState('')

  const filterDocs = documents?.filter(doc => doc.title.toLowerCase().includes(search.toLowerCase()))

  const onClick = (documentId: String) => {
    router.push(`/documents/${documentId}`)
  }
  const onRestore = (event: React.MouseEvent, documentId: Id<'documents'>) => {
    event.stopPropagation()
    const promise = restore({ id: documentId })
    toast.promise(promise, {
      loading: 'Restoring..',
      success: 'Success!',
      error: 'Failed to restore!'

    })
  }
  const onRemove = (documentId: Id<'documents'>) => {
    const promise = remove({ id: documentId })
    toast.promise(promise, {
      loading: 'Removing a note...',
      success: 'Success!',
      error: 'Failed to restore!'
    })

    if (params.documentId === documentId) {
      router.push(`/documents`)
    }
  }

  if (documents === undefined) {
    return (
      <div className='h-full flex items-center p-4 justify-center'>
        <Spinner
          size='lg'
        />
      </div>
    )
  }

  return (
    <div className='text-sm'>
      <div className="flex items-center gap-x-1 p-2">
        <Search className='h-4 w-4' />
        <Input
          onChange={ e => setSearch(e.target.value) }
          value={search}
          className='h-7 px-2 focus-visible:ring-transparent bg-secondary'
          placeholder='Filter by title'
        />
      </div>
      <div className='mt-2 px-1 pb-1'>
        <p className='hidden last:block text-xs text-center text-muted-foreground pb-2'>No documents found!</p>
        {filterDocs?.map(doc => (
          <div
            className='text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between'
            key={doc._id}
            role='button'
            onClick={ () => onClick(doc._id) }
          >
            <span className='truncate pl-2'>{doc.title}</span>
            <div className='flex items-center'>
              <div
                className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                role='button'
                onClick={ (e) => onRestore(e, doc._id) }
              >
                <Undo className='h-4 w-4 text-muted-foreground' />
              </div>
              <ConfirmModal onConfirm={ () => onRemove(doc._id) }>
                <div
                  className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                  role='button'
                >
                  <Trash className='h-4 w-4 text-muted-foreground' />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrashBox