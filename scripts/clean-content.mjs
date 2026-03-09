/**
 * Nettoyage des artefacts IA dans les articles
 * Corrige htmlContent + re-migre vers Lexical
 *
 * Usage : node scripts/clean-content.mjs [--dry-run]
 */

import pg from 'pg'
import dotenv from 'dotenv'
import { parse, NodeType } from 'node-html-parser'

dotenv.config({ path: '.env.local' })

const DATABASE_URL = process.env.DATABASE_URI || process.env.POSTGRES_URL || process.env.DATABASE_URL
const DRY_RUN = process.argv.includes('--dry-run')
if (DRY_RUN) console.log('🔍 Mode dry-run\n')

// ── Règles de nettoyage ──
// Chaque règle : { find: RegExp, replace: string | function }
const CLEANUP_RULES = [
  // Supprimer les mentions "Plan éditorial — Onami Dojo" et variantes
  { find: /(?:le |du |au |un )?<em>Plan éditorial — Onami Dojo<\/em>/gi, replace: 'l\'Onami Dojo' },
  { find: /(?:le |du |au |un )?<em>Plan importé — Onami Dojo<\/em>/gi, replace: 'l\'Onami Dojo' },
  { find: /(?:le |du |au |un )?Plan éditorial — Onami Dojo/gi, replace: 'l\'Onami Dojo' },
  { find: /(?:le |du |au |un )?Plan importé — Onami Dojo/gi, replace: 'l\'Onami Dojo' },
  { find: /(?:le |du |au |un )?<em>Plan éditorial<\/em>/gi, replace: '' },
  { find: /(?:le |du |au |un )?<em>Plan importé<\/em>/gi, replace: '' },
  { find: /Plan éditorial/gi, replace: '' },
  { find: /Plan importé/gi, replace: '' },
  { find: /plan éditorial/gi, replace: '' },
  { find: /plan importé/gi, replace: '' },

  // Supprimer "Arts martiaux de contact — Génériques"
  { find: /<em>Arts martiaux de contact — Génériques<\/em>/gi, replace: 'les arts martiaux de contact' },
  { find: /Arts martiaux de contact — Génériques/gi, replace: 'les arts martiaux de contact' },

  // Corriger "ceinture brune" → "ceinture marron"
  { find: /ceinture brune/gi, replace: 'ceinture marron' },
  { find: /Ceinture brune/gi, replace: 'Ceinture marron' },

  // Supprimer "Nom du site"
  { find: /Nom du site/gi, replace: 'Onami Dojo' },

  // Supprimer DojoZen et mon blog
  { find: /DojoZen/gi, replace: 'Onami Dojo' },
  { find: /<em>mon blog<\/em>/gi, replace: 'l\'Onami Dojo' },

  // Nettoyer "Découvrez le  et le  — Onami Dojo" (résidu après suppression)
  { find: /Découvrez le\s+et le\s+—\s+Onami Dojo/gi, replace: 'Découvrez l\'Onami Dojo' },
  { find: /Consultez le\s+—\s+Onami Dojo/gi, replace: 'Contactez l\'Onami Dojo' },
  { find: /le\s+et le\s+pour/gi, replace: 'nos ressources pour' },
  { find: /Si oui, découvrez\s+et\s+pour structurer/gi, replace: 'Si oui, rejoignez-nous pour structurer' },

  // Nettoyer les doubles espaces et espaces avant ponctuation
  { find: /\s{2,}/g, replace: ' ' },
  { find: /\s+\./g, replace: '.' },
  { find: /\s+,/g, replace: ',' },

  // Phrases vides après nettoyage
  { find: /<p>\s*<\/p>/g, replace: '' },
  { find: /<li>\s*<\/li>/g, replace: '' },

  // Nettoyer "Intégrez un  ou un  dans votre routine avec l'Onami Dojo"
  { find: /Intégrez un\s+ou un\s+dans votre routine avec l'Onami Dojo/gi, replace: 'Intégrez l\'entraînement dans votre routine avec l\'Onami Dojo' },

  // "comme ceux affiliés au l'Onami Dojo" → "comme ceux de l'Onami Dojo"
  { find: /comme ceux affiliés au l'Onami Dojo/gi, replace: 'comme ceux de l\'Onami Dojo' },
  { find: /comme ceux du réseau l'Onami Dojo/gi, replace: 'comme ceux de l\'Onami Dojo' },

  // "Découvrez l'Onami Dojo et l'Onami Dojo" doublon
  { find: /l'Onami Dojo et l'Onami Dojo/gi, replace: 'l\'Onami Dojo' },

  // "avec le l'Onami Dojo" / "du l'Onami Dojo"
  { find: /avec le l'Onami Dojo/gi, replace: 'avec l\'Onami Dojo' },
  { find: /du l'Onami Dojo/gi, replace: 'de l\'Onami Dojo' },
  { find: /au l'Onami Dojo/gi, replace: 'à l\'Onami Dojo' },
  { find: /le l'Onami Dojo/gi, replace: 'l\'Onami Dojo' },
  { find: /un l'Onami Dojo/gi, replace: 'l\'Onami Dojo' },
]

function cleanHtml(html) {
  let cleaned = html
  for (const rule of CLEANUP_RULES) {
    cleaned = cleaned.replace(rule.find, rule.replace)
  }
  // Passe supplémentaire pour nettoyer les résidus
  cleaned = cleaned.replace(/\s{2,}/g, ' ')
  cleaned = cleaned.replace(/<p>\s*<\/p>/g, '')
  return cleaned
}

// ── Convertisseur HTML → Lexical (identique au script de migration) ──
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
          type: 'link', children: linkChildren.length > 0 ? linkChildren : [textNode(child.text || href, parentFormat)],
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
  if (tag === 'HR') return [{ type: 'horizontalrule', version: 1 }]
  if (tag === 'DIV' || tag === 'SECTION' || tag === 'ARTICLE') return convertBlockNodes(node)
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
  return { root: { type: 'root', children, direction: 'ltr', format: '', indent: 0, version: 1 } }
}

// ── Migration ──
async function main() {
  const client = new pg.Client({ connectionString: DATABASE_URL })
  await client.connect()
  console.log('✅ Connecté\n')

  const { rows: posts } = await client.query(`
    SELECT id, slug, html_content FROM posts WHERE html_content IS NOT NULL
  `)

  let cleaned = 0
  let unchanged = 0

  for (const post of posts) {
    const original = post.html_content
    const fixed = cleanHtml(original)

    if (fixed === original) {
      unchanged++
      continue
    }

    const diffs = []
    // Count changes
    for (const rule of CLEANUP_RULES) {
      const matches = original.match(rule.find)
      if (matches) diffs.push(...matches.map(m => m.replace(/<[^>]+>/g, '').trim()).filter(Boolean))
    }

    if (DRY_RUN) {
      console.log(`  🔍 ${post.slug} — ${diffs.length} corrections : ${[...new Set(diffs)].slice(0, 3).join(', ')}`)
      cleaned++
      continue
    }

    // Mettre à jour htmlContent ET re-générer le Lexical
    const lexical = htmlToLexical(fixed)

    await client.query(
      `UPDATE posts SET html_content = $1, content = $2 WHERE id = $3`,
      [fixed, JSON.stringify(lexical), post.id]
    )
    try {
      await client.query(
        `UPDATE _posts_v SET version_html_content = $1, version_content = $2 WHERE parent_id = $3`,
        [fixed, JSON.stringify(lexical), post.id]
      )
    } catch { /* best effort */ }

    cleaned++
    console.log(`  ✅ ${post.slug} — ${diffs.length} corrections`)
  }

  console.log('\n────────────────────────────────────')
  console.log(`📊 ${cleaned} articles corrigés, ${unchanged} déjà OK`)
  if (DRY_RUN) console.log('   (dry-run)')
  console.log('────────────────────────────────────')

  await client.end()
}

main().catch(e => { console.error('Erreur :', e); process.exit(1) })
