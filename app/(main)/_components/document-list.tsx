'use client';

import { Id, Doc } from '../../..//convex/_generated/dataModel'

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "convex/react";
import { cn } from "../../../lib/utils";

import { api } from "../../../convex/_generated/api";
import { FileIcon } from "lucide-react";

import TrashBox from "./trash-box";
import Item from "./item";

interface DocumentListProps {
  parentDocumentId?: Id<"documents">
  level?: number
  data?: Doc<any>
}

const DocumentList = ({ parentDocumentId, level = 0 }: DocumentListProps) => {

  const params = useParams()
  const router = useRouter()

  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const onExpand = (documentId: string) => {
    setExpanded(prev => ({
      ...prev,
      [documentId]: !prev[documentId]
    }))
  }

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId
  })

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`)
  }

  if (documents == undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level == 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    )
  }

  return (
    <>
      <p
        className={cn(
          'hidden text-sm font-medium text-muted-foreground/80',
          expanded && 'last:block',
          level == 0 && 'hidden'
        )}
        style={{ paddingLeft: level ? `${(level * 12) + 25}px` : undefined }}>No pages inside</p>
      {documents.map(doc => (
        <div key={doc._id}>
          <Item
            id={doc._id}
            label={doc.title}
            onClick={ () => onRedirect(doc._id) }
            icon={FileIcon}
            documentIcon={doc.icon}
            active={params.documentId === doc._id}
            level={level}
            onExpand={() => onExpand(doc._id)}
            expanded={expanded[doc._id]}
          />
          {expanded[doc._id] && (
            <DocumentList parentDocumentId={doc._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  )
}

export default DocumentList