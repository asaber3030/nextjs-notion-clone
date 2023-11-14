'use client'

import { Doc } from '@/convex/_generated/dataModel'
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import React, {useRef, useState} from "react";
import {Input} from "../../../components/ui/input";
import {Button} from "../../../components/ui/button";
import {Skeleton} from "../../../components/ui/skeleton";

interface TitleProps {
  initialData: any
}

const Title = ({ initialData }: TitleProps) => {

  const update = useMutation(api.documents.update)

  const inputRef = useRef(null)

  const [title, setTitle] = useState(initialData.title || 'Untitled')
  const [isEditing, setIsEditing] = useState(false)


  const enableInput = () => {
    setTitle(initialData.title)
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
    }, 0)
  }

  const disableInput = () => {
    setIsEditing(false)
  }

  const onChange = (e: React.ChangeEvent) => {
    setTitle(e.target.value)
    update({
      id: initialData._id,
      title: e.target.value || 'Untitled'
    })
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      disableInput()
    }
  }

  return (
    <div className='flex items-center gap-x-1'>
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
          className='h-7 px-2 focus-visible:ring-transparent'
        />
      ) : (
        <div>

          <Button
            variant='ghost'
            onClick={enableInput}
            size='sm'
            className='font-normal h-auto p-1'
          >
            {initialData?.title}
          </Button>

        </div>
      )}
    </div>
  )
}

Title.Skeleton = function TitleSkeleton() {
  return (
    <Skeleton
      className='h-4 w-16 rounded-sm'
    />
  )
}

export default Title