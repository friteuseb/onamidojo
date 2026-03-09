'use client'

import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState, SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'

interface RichTextProps {
  data: SerializedEditorState<SerializedLexicalNode> | null | undefined
  className?: string
}

export default function RichText({ data, className }: RichTextProps) {
  if (!data) return null
  return <PayloadRichText data={data} className={className} />
}
