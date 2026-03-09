/**
 * Réécriture intelligente des passages cassés dans les articles du blog Onami Dojo
 *
 * Le script clean-content.mjs a supprimé les artefacts IA (Plan éditorial, etc.)
 * mais a laissé des phrases incomplètes ou absurdes. Ce script corrige ces résidus.
 *
 * Usage : node scripts/rewrite-broken-passages.mjs [--dry-run]
 */

import pg from 'pg'
import dotenv from 'dotenv'
import { parse, NodeType } from 'node-html-parser'

dotenv.config({ path: '.env.local' })

const DATABASE_URL = process.env.DATABASE_URI || process.env.POSTGRES_URL || process.env.DATABASE_URL
if (!DATABASE_URL) {
  console.error('Aucune variable DATABASE_URL trouvée')
  process.exit(1)
}

const DRY_RUN = process.argv.includes('--dry-run')
if (DRY_RUN) console.log('Mode dry-run — aucune modification ne sera appliquée\n')

// ──────────────────────────────────────────────────────────────────
// Corrections par article (slug → liste de {old, new})
// Chaque old doit être une sous-chaîne exacte du html_content
// ──────────────────────────────────────────────────────────────────

const CORRECTIONS = {
  'art-martial-contact-reprise-sport-apres-35-ans': [
    {
      old: 'comme ceux affiliés l\u2019Onami Dojo, exigent',
      new: 'comme ceux de l\u2019Onami Dojo, exigent',
    },
  ],

  'art-martial-perte-poids-ce-qui-marche-vraiment-onami-dojo': [
    {
      old: 'Intégrez un ou un dans votre routine avec l\u2019Onami Dojo pour structurer vos efforts.',
      new: 'Intégrez cette discipline dans votre routine pour structurer vos efforts.',
    },
  ],

  'entrainement-kempo-karate-programme-type-onami-dojo': [
    {
      old: 'Quelles erreurs éviter dans un comme celui-ci ?',
      new: 'Quelles erreurs éviter dans ce type de programme ?',
    },
    {
      old: 'Quels outils pour avancer avec l\u2019Onami Dojo ?',
      new: 'Quels outils pour progresser entre les cours ?',
    },
  ],

  'karate-harcelement-enfant-une-solution-onami-dojo': [
    {
      old: 'Renseignez-vous sur un comme celui d\u2019Onami Dojo pour un accompagnement adapté aux enfants et familles.',
      new: 'Renseignez-vous auprès d\u2019un dojo comme l\u2019Onami Dojo pour un accompagnement adapté aux enfants et aux familles.',
    },
  ],

  'kyokushin-40-ans-demarrer-est-il-possible-onami-dojo': [
    {
      old: 'Si vous cherchez un ou un pour structurer votre progression, des dojos comme',
      new: 'Si vous cherchez un cadre bienveillant pour structurer votre progression, des dojos comme',
    },
  ],

  'kyokushin-frappes-autorisees-guide-competition-onami-dojo': [
    {
      old: 'D\u2019ailleurs, pour un ou un sur le sujet, comme au Onami Dojo, c\u2019est un excellent point de départ pour structurer vos entraînements ou vos articles.',
      new: 'D\u2019ailleurs, un dojo comme l\u2019Onami Dojo est un excellent point de départ pour approfondir le sujet et structurer vos entraînements.',
    },
  ],

  'kyokushin-karate-histoire-et-philosophie-onami-dojo': [
    {
      old: 'Découvrez l\u2019Onami Dojo pour en savoir plus sur cette pratique.',
      new: 'L\u2019Onami Dojo perpétue cet héritage au quotidien.',
    },
  ],

  'muscles-arts-martiaux-entrainement-corps-entier': [
    {
      old: 'inscrite dans un ou un d\u2019entraînement, transforme',
      new: 'inscrite dans un programme d\u2019entraînement régulier, transforme',
    },
  ],

  'preparation-physique-kyokushin-guide-complet': [
    {
      old: 'Quels points vérifier avant de suivre un de préparation ?',
      new: 'Quels points vérifier avant de suivre un programme de préparation ?',
    },
    {
      old: 'Avant de vous lancer dans un comme celui de l\u2019Onami Dojo,',
      new: 'Avant de vous lancer dans un programme comme celui de l\u2019Onami Dojo,',
    },
  ],

  'sport-de-combat-enfant-quel-art-martial-choisir': [
    {
      old: 'avec le soutien d\u2019un comme celui d\u2019Onami Dojo.',
      new: 'avec le soutien d\u2019un club comme l\u2019Onami Dojo.',
    },
  ],
}

// ──────────────────────────────────────────────────────────────────
// Convertisseur HTML → Lexical (copié de migrate-html-to-lexical.mjs)
// ──────────────────────────────────────────────────────────────────

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

// ──────────────────────────────────────────────────────────────────
// Application des corrections
// ──────────────────────────────────────────────────────────────────

async function main() {
  const client = new pg.Client({ connectionString: DATABASE_URL })
  await client.connect()
  console.log('Connecté à la base de données\n')

  const slugs = Object.keys(CORRECTIONS)
  const { rows: posts } = await client.query(
    `SELECT id, slug, html_content FROM posts WHERE slug = ANY($1)`,
    [slugs]
  )

  console.log(`${posts.length} articles à corriger sur ${slugs.length} attendus\n`)

  let corrected = 0
  let totalFixes = 0
  const notFound = []

  for (const post of posts) {
    const corrections = CORRECTIONS[post.slug]
    if (!corrections || corrections.length === 0) continue

    let html = post.html_content
    let fixCount = 0

    for (const { old: oldText, new: newText } of corrections) {
      // Essayer d'abord tel quel, puis avec l'autre type d'apostrophe
      let actualOld = oldText
      if (!html.includes(actualOld)) {
        // Tenter avec apostrophes droites uniquement
        const withStraight = oldText.replace(/\u2019/g, "'")
        if (html.includes(withStraight)) {
          actualOld = withStraight
        } else {
          // Tenter avec apostrophes courbes uniquement
          const withCurly = oldText.replace(/'/g, '\u2019')
          if (html.includes(withCurly)) {
            actualOld = withCurly
          }
        }
      }

      if (html.includes(actualOld)) {
        html = html.replace(actualOld, newText)
        fixCount++
        console.log(`  [${post.slug}] "${actualOld.substring(0, 60)}..."`)
        console.log(`    \u2192 "${newText.substring(0, 60)}..."`)
      } else {
        console.log(`  [${post.slug}] INTROUVABLE: "${oldText.substring(0, 80)}..."`)
        notFound.push({ slug: post.slug, old: oldText })
      }
    }

    if (fixCount === 0) continue

    totalFixes += fixCount

    if (DRY_RUN) {
      console.log(`  => ${fixCount} correction(s) prête(s) (dry-run)\n`)
      corrected++
      continue
    }

    // Appliquer : mettre à jour html_content ET re-générer le Lexical
    const lexical = htmlToLexical(html)

    await client.query(
      `UPDATE posts SET html_content = $1, content = $2 WHERE id = $3`,
      [html, JSON.stringify(lexical), post.id]
    )

    // Mettre à jour les versions si la table existe
    try {
      await client.query(
        `UPDATE _posts_v SET version_html_content = $1, version_content = $2 WHERE parent_id = $3`,
        [html, JSON.stringify(lexical), post.id]
      )
    } catch {
      // Table de versions peut ne pas exister
    }

    corrected++
    console.log(`  => ${fixCount} correction(s) appliquée(s)\n`)
  }

  // Vérifier les slugs manquants en base
  const foundSlugs = new Set(posts.map(p => p.slug))
  for (const slug of slugs) {
    if (!foundSlugs.has(slug)) {
      console.log(`  ARTICLE INTROUVABLE EN BASE: ${slug}`)
    }
  }

  console.log('\n────────────────────────────────────')
  console.log(`Résultat : ${corrected} articles corrigés, ${totalFixes} passages réécrits`)
  if (notFound.length > 0) {
    console.log(`Attention : ${notFound.length} passage(s) non trouvé(s) dans le HTML`)
  }
  if (DRY_RUN) console.log('(dry-run — rien n\'a été modifié)')
  console.log('────────────────────────────────────')

  await client.end()
}

main().catch(e => {
  console.error('Erreur fatale :', e)
  process.exit(1)
})
