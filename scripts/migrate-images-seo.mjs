/**
 * Migration images + SEO pour les articles Onami Dojo
 * - Upload les images blog dans la collection Media (avec variantes sharp)
 * - Lie les images aux articles via featuredImage
 * - Remplit les champs SEO (meta.title, meta.description, meta.image)
 *
 * Usage : node scripts/migrate-images-seo.mjs [--dry-run]
 */

import pg from 'pg'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

dotenv.config({ path: '.env.local' })

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, '..')

const DATABASE_URL = process.env.DATABASE_URI || process.env.POSTGRES_URL || process.env.DATABASE_URL
if (!DATABASE_URL) {
  console.error('❌ Aucune variable DATABASE_URL trouvée')
  process.exit(1)
}

const DRY_RUN = process.argv.includes('--dry-run')
if (DRY_RUN) console.log('🔍 Mode dry-run — aucune modification ne sera appliquée\n')

const MEDIA_DIR = path.join(PROJECT_ROOT, 'public', 'media')

// Tailles définies dans Media.ts
const IMAGE_SIZES = [
  { name: 'thumbnail', width: 400, height: 300 },
  { name: 'card', width: 768, height: 480 },
  { name: 'desktop', width: 1920, height: undefined },
]

async function processImage(srcPath, fileName) {
  if (!fs.existsSync(MEDIA_DIR)) fs.mkdirSync(MEDIA_DIR, { recursive: true })

  // Copier l'original
  const destPath = path.join(MEDIA_DIR, fileName)
  fs.copyFileSync(srcPath, destPath)

  // Obtenir dimensions originales
  const metadata = await sharp(srcPath).metadata()
  const stat = fs.statSync(srcPath)
  const mimeType = fileName.endsWith('.webp') ? 'image/webp'
    : fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') ? 'image/jpeg'
    : fileName.endsWith('.png') ? 'image/png' : 'image/webp'

  const result = {
    filename: fileName,
    mimeType,
    filesize: stat.size,
    width: metadata.width,
    height: metadata.height,
    url: `/media/${fileName}`,
    sizes: {},
  }

  // Générer les variantes
  for (const size of IMAGE_SIZES) {
    const ext = path.extname(fileName)
    const base = path.basename(fileName, ext)
    const sizeFileName = `${base}-${size.width}x${size.height || 'auto'}${ext}`
    const sizePath = path.join(MEDIA_DIR, sizeFileName)

    try {
      const resizeOpts = { width: size.width, withoutEnlargement: true }
      if (size.height) resizeOpts.height = size.height
      if (size.height) resizeOpts.fit = 'cover'

      const resized = await sharp(srcPath).resize(resizeOpts).toBuffer()
      fs.writeFileSync(sizePath, resized)
      const sizeMetadata = await sharp(resized).metadata()
      const sizeStat = fs.statSync(sizePath)

      result.sizes[size.name] = {
        url: `/media/${sizeFileName}`,
        width: sizeMetadata.width,
        height: sizeMetadata.height,
        mimeType,
        filesize: sizeStat.size,
        filename: sizeFileName,
      }
    } catch (e) {
      console.warn(`    ⚠️  Erreur resize ${size.name} : ${e.message}`)
    }
  }

  return result
}

async function migrate() {
  const client = new pg.Client({ connectionString: DATABASE_URL })
  await client.connect()
  console.log('✅ Connecté à la base de données\n')

  // Récupérer les posts avec un featuredImagePath
  const { rows: posts } = await client.query(`
    SELECT id, slug, title, page_title, excerpt,
           featured_image_path, featured_image_id,
           meta_title, meta_description, meta_image_id
    FROM posts
    WHERE featured_image_path IS NOT NULL AND featured_image_path != ''
  `)

  console.log(`📄 ${posts.length} articles avec un chemin d'image trouvés\n`)

  let imagesUploaded = 0
  let imagesLinked = 0
  let seoUpdated = 0
  let errors = 0

  for (const post of posts) {
    const imagePath = post.featured_image_path
    const localPath = path.join(PROJECT_ROOT, 'public', imagePath)
    const fileName = path.basename(imagePath)

    // ── 1. Upload de l'image ──
    let mediaId = post.featured_image_id

    if (!mediaId) {
      if (!fs.existsSync(localPath)) {
        console.log(`  ⚠️  ${post.slug} — image introuvable : ${localPath}`)
        errors++
        continue
      }

      // Vérifier si l'image existe déjà dans media
      const { rows: existingMedia } = await client.query(
        `SELECT id FROM media WHERE filename = $1 LIMIT 1`,
        [fileName]
      )

      if (existingMedia.length > 0) {
        mediaId = existingMedia[0].id
        console.log(`  ♻️  ${post.slug} — image déjà dans media (id: ${mediaId})`)
      } else {
        if (DRY_RUN) {
          console.log(`  🔍 ${post.slug} — uploadrait ${fileName} (dry-run)`)
          imagesUploaded++
        } else {
          try {
            const imgData = await processImage(localPath, fileName)
            const altText = post.title || post.slug.replace(/-/g, ' ')

            const { rows: [newMedia] } = await client.query(
              `INSERT INTO media (
                filename, mime_type, filesize, width, height, alt, url,
                sizes_thumbnail_url, sizes_thumbnail_width, sizes_thumbnail_height,
                sizes_thumbnail_mime_type, sizes_thumbnail_filesize, sizes_thumbnail_filename,
                sizes_card_url, sizes_card_width, sizes_card_height,
                sizes_card_mime_type, sizes_card_filesize, sizes_card_filename,
                sizes_desktop_url, sizes_desktop_width, sizes_desktop_height,
                sizes_desktop_mime_type, sizes_desktop_filesize, sizes_desktop_filename,
                created_at, updated_at
              ) VALUES (
                $1, $2, $3, $4, $5, $6, $7,
                $8, $9, $10, $11, $12, $13,
                $14, $15, $16, $17, $18, $19,
                $20, $21, $22, $23, $24, $25,
                NOW(), NOW()
              ) RETURNING id`,
              [
                imgData.filename, imgData.mimeType, imgData.filesize, imgData.width, imgData.height,
                altText, imgData.url,
                imgData.sizes.thumbnail?.url, imgData.sizes.thumbnail?.width, imgData.sizes.thumbnail?.height,
                imgData.sizes.thumbnail?.mimeType, imgData.sizes.thumbnail?.filesize, imgData.sizes.thumbnail?.filename,
                imgData.sizes.card?.url, imgData.sizes.card?.width, imgData.sizes.card?.height,
                imgData.sizes.card?.mimeType, imgData.sizes.card?.filesize, imgData.sizes.card?.filename,
                imgData.sizes.desktop?.url, imgData.sizes.desktop?.width, imgData.sizes.desktop?.height,
                imgData.sizes.desktop?.mimeType, imgData.sizes.desktop?.filesize, imgData.sizes.desktop?.filename,
              ]
            )
            mediaId = newMedia.id
            imagesUploaded++
            console.log(`  📸 ${post.slug} — image + variantes créées (id: ${mediaId})`)
          } catch (e) {
            console.error(`  ❌ ${post.slug} — erreur upload : ${e.message}`)
            errors++
            continue
          }
        }
      }
    } else {
      console.log(`  ⏭  ${post.slug} — image déjà liée (id: ${mediaId})`)
    }

    // ── 2. Lier l'image au post ──
    if (mediaId && !post.featured_image_id && !DRY_RUN) {
      await client.query(
        `UPDATE posts SET featured_image_id = $1 WHERE id = $2`,
        [mediaId, post.id]
      )
      try {
        await client.query(
          `UPDATE _posts_v SET version_featured_image_id = $1 WHERE parent_id = $2`,
          [mediaId, post.id]
        )
      } catch { /* versions table may differ */ }
      imagesLinked++
    }

    // ── 3. Remplir les champs SEO ──
    const seoTitle = post.page_title || `${post.title} | Onami Dojo`
    const seoDesc = post.excerpt || ''
    const needsSeoUpdate = !post.meta_title || !post.meta_description

    if (needsSeoUpdate) {
      if (DRY_RUN) {
        console.log(`  🔍 ${post.slug} — SEO serait rempli (dry-run)`)
        seoUpdated++
      } else {
        const updates = []
        const values = []
        let paramIdx = 1

        if (!post.meta_title) {
          updates.push(`meta_title = $${paramIdx++}`)
          values.push(seoTitle.slice(0, 70))
        }
        if (!post.meta_description) {
          updates.push(`meta_description = $${paramIdx++}`)
          values.push(seoDesc.slice(0, 160))
        }
        if (mediaId && !post.meta_image_id) {
          updates.push(`meta_image_id = $${paramIdx++}`)
          values.push(mediaId)
        }

        if (updates.length > 0) {
          values.push(post.id)
          await client.query(
            `UPDATE posts SET ${updates.join(', ')} WHERE id = $${paramIdx}`,
            values
          )
          try {
            const vUpdates = updates.map(u => u.replace('meta_', 'version_meta_'))
            await client.query(
              `UPDATE _posts_v SET ${vUpdates.join(', ')} WHERE parent_id = $${paramIdx}`,
              [...values]
            )
          } catch { /* best effort */ }
        }

        seoUpdated++
        console.log(`  🔎 ${post.slug} — SEO rempli`)
      }
    }
  }

  console.log('\n────────────────────────────────────')
  console.log(`📊 Résultat :`)
  console.log(`   📸 ${imagesUploaded} images uploadées`)
  console.log(`   🔗 ${imagesLinked} images liées aux articles`)
  console.log(`   🔎 ${seoUpdated} articles SEO remplis`)
  console.log(`   ❌ ${errors} erreurs`)
  if (DRY_RUN) console.log('   (dry-run — rien n\'a été modifié)')
  console.log('────────────────────────────────────')

  await client.end()
}

migrate().catch(e => {
  console.error('Erreur fatale :', e)
  process.exit(1)
})
