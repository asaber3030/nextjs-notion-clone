'use client'

import { useState, useEffect } from "react";

import { File } from "lucide-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";

import { useSearch } from "../hooks/use-search";

import { api } from "../convex/_generated/api";

export const SearchCommand = () => {

  const { user } = useUser()

  const [isMounted, setIsMounted] = useState(false)

  const router = useRouter()
  const documents = useQuery(api.documents.getSearch)

  const toggle = useSearch((store) => store.toggle)
  const isOpen = useSearch((store) => store.isOpen)
  const onClose = useSearch((store) => store.onClose)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggle()
      }
    }
    document.addEventListener('keydown', down)

    return () => document.removeEventListener('keydown', down)
  }, [toggle])

  const onSelect = (id: String) => {
    router.push(`/documents/${id}`)
    onClose()
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput
        placeholder={`Search ${user?.fullName}'s notes`}
      />
      <CommandList>
        <CommandEmpty>No results found!</CommandEmpty>
        <CommandGroup heading='Documents'>
          {documents?.map(doc => (
            <CommandItem
              key={doc._id}
              value={`${doc._id}-${doc.title}`}
              title={doc.title}
              onSelect={onSelect}
            >
              {doc.icon ? (
                <p className='mr-2 text-[18px]'>{doc.icon}</p>
              ) : (
                <File className='mr-2 w-4 h-4' />
              )}
              <span>{doc.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )

}