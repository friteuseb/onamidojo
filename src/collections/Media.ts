import type { CollectionConfig } from 'payload'
import { anyone, isAuthenticated } from '@/access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: '../public/media',
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 480, position: 'centre' },
      { name: 'desktop', width: 1920, height: undefined, position: 'centre' },
    ],
    mimeTypes: ['image/*'],
  },
  access: {
    read: anyone,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texte alternatif',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Légende',
    },
  ],
}
