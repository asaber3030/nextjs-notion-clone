'use client'

import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "../hooks/use-cover";
import { useEdgeStore } from "../lib/edgestore";

import { cn } from "../lib/utils";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

import { api } from "../convex/_generated/api";

import { Id } from "../convex/_generated/dataModel";

import Image from "next/image";

interface CoverProps {
  url?: string,
  preview?: boolean
}

const Cover = ({ url, preview }: CoverProps) => {

  const { edgestore } = useEdgeStore()

  const params = useParams()

  const coverImage = useCoverImage()
  const removeCover = useMutation(api.documents.removeCoverImage)

  const onRemoveCover = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url
      })
    }

    removeCover({
      id: params.documentId as Id<'documents'>
    })
  }

  return (
    <div className={cn(
      'relative w-full h-[35vh] group',
      !url && 'h-[12vh]',
      url && 'bg-muted'
    )}>
      {!!url && (
        <Image
          src={url}
          fill
          className='object-cover'
          alt='Cover image'
        />
      )}
      {url && !preview && (
        <div className='opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2'>
          <Button
            onClick={ () => coverImage.onReplace(url) }
            className='text-muted-foreground text-xs'
            variant='outline'
            size='sm'
          >
            <ImageIcon className='w-4 h-4 mr-2' />
            Change Cover
          </Button>
          <Button
            onClick={onRemoveCover}
            className='text-muted-foreground text-xs'
            variant='outline'
            size='sm'
          >
            <X className='w-4 h-4 mr-2' />
            Remove
          </Button>
        </div>
      )}
    </div>
  )
}

Cover.Skeleton = function CoverSkeleton() {
  return (
    <Skeleton className='w-full h-[12vh]' />
  )
}

export default Cover