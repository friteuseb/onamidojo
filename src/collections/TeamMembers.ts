import type { CollectionConfig } from 'payload'
import { anyone, isAdminOrEditor } from '@/access/roles'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'discipline', 'order'],
  },
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nom complet',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      label: 'Fonction',
      required: true,
      admin: {
        description: 'Ex: Directeur Technique - Kempo, Responsable Kyokushin...',
      },
    },
    {
      name: 'discipline',
      type: 'select',
      label: 'Discipline principale',
      options: [
        { label: 'Kempo', value: 'kempo' },
        { label: 'Kyokushin', value: 'kyokushin' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'rank',
      type: 'text',
      label: 'Grade',
      admin: {
        description: 'Ex: 3ème Dan, Ceinture Noire...',
      },
    },
    {
      name: 'achievements',
      type: 'array',
      label: 'Palmarès',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Réalisation',
          required: true,
        },
      ],
    },
    {
      name: 'photo',
      type: 'upload',
      label: 'Photo',
      relationTo: 'media',
    },
    {
      name: 'photoPath',
      type: 'text',
      label: 'Chemin photo (legacy)',
      admin: {
        description: 'Chemin vers la photo statique (pour les instructeurs importés)',
        condition: (data) => Boolean(data?.photoPath),
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Ordre d\'affichage',
      defaultValue: 10,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
