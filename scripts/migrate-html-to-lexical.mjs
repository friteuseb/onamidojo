/**
 * Migration HTML → Lexical pour les articles Onami Dojo
 *
 * Usage : node scripts/migrate-html-to-lexical.mjs [--dry-run]
 */

import pg from 'pg'
import { parse, NodeType } from 'node-html-parser'
import dotenv from 'dotenv'
import { readFileSync } from 'fs'

// Charger .env.local
dotenv.config({ path: '.env.local' })

const DATABASE_URL = process.env.DATABASE_URI || process.env.POSTGRES_URL || process.env.DATABASE_URL
if (!DATABASE_URL) {
  console.error('❌ Aucune variable DATABASE_URL trouvée')
  process.exit(1)
}

const DRY_RUN = process.argv.includes('--dry-run')
if (DRY_RUN) console.log('🔍 Mode dry-run — aucune modification ne sera appliquée\n')

// ──────────────────────────────────────────────────
// Convertisseur HTML → Lexical
// ──────────────────────────────────────────────────

function textNode(text, format = 0) {
  return { type: 'text', text, format, detail: 0, mode: 'normal', style: '', version: 1 }
}

function elementNode(type, children, extra = {}) {
  return { type, children, direction: 'ltr', format: '', indent: 0, version: 1, ...extra }
}

function getFormatFromTag(tagName) {
  switch (tagName) {
    case 'STRONG': case 'B': return 1
    case 'EM': case 'I': return 2
    case 'U': return 8
    case 'S': case 'STRIKE': return 4
    default: return 0
  }
}

const INLINE_TAGS = new Set(['STRONG', 'B', 'EM', 'I', 'U', 'S', 'STRIKE', 'A', 'SPAN', 'CODE'])

function convertInlineChildren(node, parentFormat = 0) {
  const result = []
  for (const child of node.childNodes) {
    if (child.nodeType === NodeType.TEXT_NODE) {
      const text = child.text
      if (text) result.push(textNode(text, parentFormat))
    } else if (child.nodeType === NodeType.ELEMENT_NODE) {
      const tag = child.tagName
      if (tag === 'A') {
        const href = child.getAttribute('href') || ''
        const linkChildren = convertInlineChildren(child, parentFormat)
        result.push({
          type: 'link',
          children: linkChildren.length > 0 ? linkChildren : [textNode(child.text || href, parentFormat)],
          direction: 'ltr', format: '', indent: 0, version: 1,
          fields: { linkType: 'custom', newTab: child.getAttribute('target') === '_blank', url: href },
        })
      } else if (tag === 'BR') {
        result.push({ type: 'linebreak', version: 1 })
      } else if (tag === 'CODE') {
        const t = child.text || ''
        if (t) result.push(textNode(t, parentFormat | 16))
      } else if (INLINE_TAGS.has(tag)) {
        result.push(...convertInlineChildren(child, parentFormat | getFormatFromTag(tag)))
      } else {
        result.push(...convertInlineChildren(child, parentFormat))
      }
    }
  }
  return result
}

function convertElement(node) {
  const tag = node.tagName

  if (tag === 'P') {
    const children = convertInlineChildren(node)
    return [elementNode('paragraph', children.length > 0 ? children : [textNode('')])]
  }

  if (/^H[1-6]$/.test(tag)) {
    const children = convertInlineChildren(node)
    return [elementNode('heading', children.length > 0 ? children : [textNode('')], { tag: tag.toLowerCase() })]
  }

  if (tag === 'BLOCKQUOTE') {
    const quoteChildren = []
    for (const child of node.childNodes) {
      if (child.nodeType === NodeType.ELEMENT_NODE) {
        if (child.tagName === 'P') quoteChildren.push(...convertElement(child))
        else quoteChildren.push(...convertBlockNodes(child))
      } else if (child.nodeType === NodeType.TEXT_NODE) {
        const text = child.text.trim()
        if (text) quoteChildren.push(elementNode('paragraph', [textNode(text)]))
      }
    }
    if (quoteChildren.length === 0) quoteChildren.push(elementNode('paragraph', [textNode('')]))
    return [elementNode('quote', quoteChildren)]
  }

  if (tag === 'UL' || tag === 'OL') {
    const listType = tag === 'UL' ? 'bullet' : 'number'
    const items = []
    let index = 1
    for (const child of node.childNodes) {
      if (child.nodeType === NodeType.ELEMENT_NODE && child.tagName === 'LI') {
        const liChildren = convertInlineChildren(child)
        items.push(elementNode('listitem', liChildren.length > 0 ? liChildren : [textNode('')], { value: index }))
        index++
      }
    }
    return [elementNode('list', items, { listType, start: 1, tag: tag.toLowerCase() })]
  }

  if (tag === 'HR') {
    return [{ type: 'horizontalrule', version: 1 }]
  }

  if (tag === 'DIV' || tag === 'SECTION' || tag === 'ARTICLE') {
    return convertBlockNodes(node)
  }

  // Fallback
  const text = node.text?.trim()
  if (text) {
    const children = convertInlineChildren(node)
    return [elementNode('paragraph', children)]
  }
  return []
}

function convertBlockNodes(parent) {
  const result = []
  for (const child of parent.childNodes) {
    if (child.nodeType === NodeType.TEXT_NODE) {
      const text = child.text.trim()
      if (text) result.push(elementNode('paragraph', [textNode(text)]))
    } else if (child.nodeType === NodeType.ELEMENT_NODE) {
      if (INLINE_TAGS.has(child.tagName)) {
        const children = convertInlineChildren(child)
        if (children.length > 0) result.push(elementNode('paragraph', children))
      } else {
        result.push(...convertElement(child))
      }
    }
  }
  return result
}

function htmlToLexical(html) {
  const root = parse(html)
  const children = convertBlockNodes(root)
  if (children.length === 0) children.push(elementNode('paragraph', [textNode('')]))
  return {
    root: { type: 'root', children, direction: 'ltr', format: '', indent: 0, version: 1 },
  }
}

// ──────────────────────────────────────────────────
// Migration
// ──────────────────────────────────────────────────

async function migrate() {
  const client = new pg.Client({ connectionString: DATABASE_URL })
  await client.connect()
  console.log('✅ Connecté à la base de données\n')

  // Trouver la table posts (Payload peut préfixer)
  const tableCheck = await client.query(`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name LIKE '%posts%'
    ORDER BY table_name
  `)
  console.log('Tables posts trouvées :', tableCheck.rows.map(r => r.table_name).join(', '))

  // Récupérer les posts avec htmlContent
  const { rows: posts } = await client.query(`
    SELECT id, slug, title, content, html_content
    FROM posts
    WHERE html_content IS NOT NULL AND html_content != ''
  `)

  console.log(`\n📄 ${posts.length} articles avec htmlContent trouvés\n`)

  let migrated = 0
  let skipped = 0
  let errors = 0

  for (const post of posts) {
    const currentContent = post.content

    // Vérifier si déjà migré (contenu Lexical non-placeholder)
    let isPlaceholder = true
    if (currentContent?.root?.children?.length > 0) {
      const firstChild = currentContent.root.children[0]
      const firstText = firstChild?.children?.[0]?.text || ''
      isPlaceholder = firstText.includes('Contenu importé') || firstText === ''
    }

    if (!isPlaceholder) {
      console.log(`  ⏭  ${post.slug} — contenu Lexical déjà présent`)
      skipped++
      continue
    }

    try {
      const lexical = htmlToLexical(post.html_content)
      const blockCount = lexical.root.children.length

      if (DRY_RUN) {
        console.log(`  🔍 ${post.slug} — ${blockCount} blocs détectés (dry-run)`)
        migrated++
        continue
      }

      await client.query(
        `UPDATE posts SET content = $1 WHERE id = $2`,
        [JSON.stringify(lexical), post.id]
      )

      // Mettre aussi à jour dans _posts_v (versions) si existe
      try {
        await client.query(
          `UPDATE _posts_v SET version_content = $1 WHERE parent_id = $2`,
          [JSON.stringify(lexical), post.id]
        )
      } catch {
        // Table de versions peut ne pas exister
      }

      console.log(`  ✅ ${post.slug} — ${blockCount} blocs migrés`)
      migrated++
    } catch (e) {
      console.error(`  ❌ ${post.slug} — ${e.message}`)
      errors++
    }
  }

  console.log('\n────────────────────────────────────')
  console.log(`📊 Résultat : ${migrated} migrés, ${skipped} déjà OK, ${errors} erreurs`)
  if (DRY_RUN) console.log('   (dry-run — rien n\'a été modifié)')
  console.log('────────────────────────────────────')

  await client.end()
}

migrate().catch(e => {
  console.error('Erreur fatale :', e)
  process.exit(1)
})
