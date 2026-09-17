'use client'

import { RichText as PayloadRichText, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState, SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'

interface RichTextProps {
  data: SerializedEditorState<SerializedLexicalNode> | null | undefined
  className?: string
}

interface UploadValue {
  url?: string
  alt?: string
  width?: number
  height?: number
  mimeType?: string
}

// Les tailles générées par Payload sont recadrées (400×300, 768×480) : dans un article,
// on affiche toujours l'image entière pour ne pas couper les schémas sur mobile.
const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  upload: ({ node }) => {
    const value = (node as { value?: UploadValue | number | string }).value
    if (!value || typeof value !== 'object' || !value.url) return null
    if (value.mimeType && !value.mimeType.startsWith('image')) {
      return (
        <a href={value.url} rel="noopener noreferrer">
          {value.alt || value.url}
        </a>
      )
    }
    return (
      <img
        src={value.url}
        alt={value.alt || ''}
        width={value.width}
        height={value.height}
        loading="lazy"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    )
  },
})

export default function RichText({ data, className }: RichTextProps) {
  if (!data) return null
  return <PayloadRichText data={data} className={className} converters={converters} />
}
