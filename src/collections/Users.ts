import type { CollectionConfig } from 'payload'
import { isAdmin, isAuthenticated, adminOnly } from '@/access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: isAdmin,
    read: isAuthenticated,
    update: isAuthenticated,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      label: 'Prénom',
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Nom',
    },
    {
      name: 'role',
      type: 'select',
      label: 'Rôle',
      required: true,
      defaultValue: 'author',
      options: [
        { label: 'Administrateur', value: 'admin' },
        { label: 'Éditeur', value: 'editor' },
        { label: 'Auteur', value: 'author' },
      ],
      access: {
        update: adminOnly,
      },
    },
  ],
}
