'use client'

import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { useCoverImage } from "../../hooks/use-cover";

import { SingleImageDropzone } from "../single-image-dropzone";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";

import { useEdgeStore } from "../../lib/edgestore";
import { api } from "../../convex/_generated/api";

import { Id } from "../../convex/_generated/dataModel";

export const CoverImageModal = () => {

  const update = useMutation(api.documents.update)
  const params = useParams()

  const [submit, setSubmit] = useState(false)
  const [file, setFile] = useState()

  const coverImage = useCoverImage()

  const { edgestore } = useEdgeStore()

  const onClose = () => {
    setFile(undefined)
    setSubmit(false)
    coverImage.onClose()
  }
  const onChange = async (file?: File) => {
    if (file) {
      setSubmit(true)
      setFile(file)

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url
        }
      })

      await update({
        id: params.documentId as Id<'documents'>,
        coverImage: res.url
      })

      onClose()

    }
  }

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>

      <DialogContent>
        <DialogHeader>
          <h2 className='text-center text-lg font-semibold'>Cover Image</h2>
        </DialogHeader>
        <div>
          <SingleImageDropzone
            className='w-full outline-none'
            disabled={submit}
            onChange={onChange}
            value={file}
          />
        </div>
      </DialogContent>

    </Dialog>
  )
}

