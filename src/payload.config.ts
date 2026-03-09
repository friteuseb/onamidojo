import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from '@/collections/Users'
import { Posts } from '@/collections/Posts'
import { Categories } from '@/collections/Categories'
import { Media } from '@/collections/Media'
import { TeamMembers } from '@/collections/TeamMembers'
import { Homepage } from '@/globals/Homepage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — Onami Dojo',
    },
  },
  collections: [Users, Posts, Categories, Media, TeamMembers],
  globals: [Homepage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'onami-dojo-dev-secret-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['posts'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }: { doc: Record<string, unknown> }) =>
        `${doc.title as string} | Onami Dojo`,
      generateDescription: ({ doc }: { doc: Record<string, unknown> }) =>
        (doc.excerpt as string) || '',
    }),
  ],
})
