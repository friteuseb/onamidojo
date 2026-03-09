/**
 * Upload des images media locales vers Vercel Blob
 * Met à jour les URLs dans la table media
 *
 * Usage : node scripts/upload-to-blob.mjs [--dry-run]
 */

import pg from 'pg'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { put } from '@vercel/blob'

dotenv.config({ path: '.env.local' })

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, '..')
const MEDIA_DIR = path.join(PROJECT_ROOT, 'public', 'media')

const DATABASE_URL = process.env.DATABASE_URI || process.env.POSTGRES_URL || process.env.DATABASE_URL
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN

if (!DATABASE_URL) { console.error('❌ DATABASE_URL manquante'); process.exit(1) }
if (!BLOB_TOKEN) { console.error('❌ BLOB_READ_WRITE_TOKEN manquante'); process.exit(1) }

const DRY_RUN = process.argv.includes('--dry-run')
if (DRY_RUN) console.log('🔍 Mode dry-run\n')

async function migrate() {
  const client = new pg.Client({ connectionString: DATABASE_URL })
  await client.connect()
  console.log('✅ Connecté à la base de données\n')

  const { rows: mediaItems } = await client.query(`
    SELECT id, filename, url,
           sizes_thumbnail_filename, sizes_thumbnail_url,
           sizes_card_filename, sizes_card_url,
           sizes_desktop_filename, sizes_desktop_url
    FROM media
    WHERE url LIKE '/media/%'
  `)

  console.log(`📄 ${mediaItems.length} fichiers media à migrer vers Blob\n`)

  let uploaded = 0
  let errors = 0

  for (const item of mediaItems) {
    const files = [
      { field: 'url', filename: item.filename },
      { field: 'sizes_thumbnail_url', filename: item.sizes_thumbnail_filename },
      { field: 'sizes_card_url', filename: item.sizes_card_filename },
      { field: 'sizes_desktop_url', filename: item.sizes_desktop_filename },
    ].filter(f => f.filename)

    const updates = {}

    for (const file of files) {
      const localPath = path.join(MEDIA_DIR, file.filename)
      if (!fs.existsSync(localPath)) {
        console.warn(`  ⚠️  ${file.filename} introuvable localement`)
        continue
      }

      if (DRY_RUN) {
        console.log(`  🔍 ${file.filename} serait uploadé (dry-run)`)
        continue
      }

      try {
        const fileBuffer = fs.readFileSync(localPath)
        const blob = await put(`media/${file.filename}`, fileBuffer, {
          access: 'public',
          token: BLOB_TOKEN,
          addRandomSuffix: false,
        })
        updates[file.field] = blob.url
      } catch (e) {
        console.error(`  ❌ ${file.filename} — ${e.message}`)
        errors++
      }
    }

    if (!DRY_RUN && Object.keys(updates).length > 0) {
      const setClauses = []
      const values = []
      let idx = 1
      for (const [col, url] of Object.entries(updates)) {
        setClauses.push(`${col} = $${idx++}`)
        values.push(url)
      }
      values.push(item.id)
      await client.query(
        `UPDATE media SET ${setClauses.join(', ')} WHERE id = $${idx}`,
        values
      )
      uploaded++
      console.log(`  ✅ ${item.filename} — ${Object.keys(updates).length} fichiers uploadés vers Blob`)
    }
  }

  console.log('\n────────────────────────────────────')
  console.log(`📊 ${uploaded} media migrés vers Vercel Blob, ${errors} erreurs`)
  if (DRY_RUN) console.log('   (dry-run)')
  console.log('────────────────────────────────────')

  await client.end()
}

migrate().catch(e => {
  console.error('Erreur fatale :', e)
  process.exit(1)
})
