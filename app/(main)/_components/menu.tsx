'use client'

import { useRouter } from "next/navigation";

import { Id } from "../../../convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "../../../components/ui/dropdown-menu";
import { Button } from "../../../components/ui/button";
import {MoreHorizontal, Trash} from "lucide-react";

import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";

import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";
import {Skeleton} from "../../../components/ui/skeleton";

interface MenuProps {
  documentId: Id<'documents'>
}

const Menu = ({ documentId }: MenuProps) => {

  const router = useRouter()
  const { user } = useUser()

  const archive = useMutation(api.documents.archive)

  const onArchive = () => {
    const promise = archive({
      id: documentId
    })
    toast.promise(promise, {
      loading: 'Moving to archive..',
      success: 'Archived!',
      error: 'Failed to archive!'
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='sm' variant='ghost'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent content='w-60' alignOffset={8} align='end' forceMount>
        <DropdownMenuItem onClick={onArchive}><Trash className='h-4 w-4 mr-2' /> Delete</DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className='text-xs text-muted-foreground p-2'>
          Last edited by: {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

Menu.Skeleton = function MenuSkeleton() {
  return (
    <Skeleton
      className='h-10 w-10'
    />
  )
}

export default Menu