import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '@/access/roles'
import { slugField } from '@/hooks/slugify'
import { calculateReadingTime } from '@/hooks/lexical-utils'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedDate', '_status'],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { _status: { equals: 'published' } }
    },
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: {
    beforeChange: [
      slugField('title'),
      ({ data }) => {
        if (data?.content) {
          data.readingTime = calculateReadingTime(data.content)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titre',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      unique: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'pageTitle',
      type: 'text',
      label: 'Titre SEO (balise title)',
      admin: {
        description: 'Titre affiché dans l\'onglet du navigateur et les résultats Google',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Extrait / Description',
      admin: {
        description: 'Résumé court pour les listings et le SEO (meta description)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenu',
      required: true,
    },
    {
      name: 'htmlContent',
      type: 'code',
      label: 'Contenu HTML (import legacy)',
      admin: {
        language: 'html',
        description: 'Contenu HTML importé. Sera remplacé progressivement par le contenu Lexical.',
        condition: (data) => Boolean(data?.htmlContent),
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      label: 'Image à la une',
      relationTo: 'media',
    },
    {
      name: 'featuredImagePath',
      type: 'text',
      label: 'Chemin image (legacy)',
      admin: {
        description: 'Chemin vers l\'image statique (pour les articles importés)',
        condition: (data) => Boolean(data?.featuredImagePath),
      },
    },
    {
      name: 'category',
      type: 'relationship',
      label: 'Catégorie',
      relationTo: 'categories',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      label: 'Date de publication',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'readingTime',
      type: 'number',
      label: 'Temps de lecture (min)',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
}
