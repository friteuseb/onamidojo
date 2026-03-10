import type { CollectionConfig } from 'payload'
import { anyone, isAdminOrEditor } from '@/access/roles'
import { slugField } from '@/hooks/slugify'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    group: 'Contenu',
    description: 'Catégories pour organiser les articles du blog',
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: {
    beforeChange: [slugField('name')],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nom',
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
      name: 'color',
      type: 'text',
      label: 'Couleur CSS',
      admin: {
        description: 'Classe Tailwind pour le badge (ex: bg-slate-800)',
      },
    },
  ],
}
