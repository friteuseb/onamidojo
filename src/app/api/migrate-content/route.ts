import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { htmlToLexical } from '@/utils/html-to-lexical'

export async function POST(request: Request) {
  // Vérification par clé secrète (ou dev uniquement)
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')
  const isDev = process.env.NODE_ENV !== 'production'

  if (!isDev && key !== process.env.MIGRATION_KEY) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }

  const dryRun = searchParams.get('dry') === '1'

  const payload = await getPayload({ config })
  const results: { slug: string; status: string; preview?: string }[] = []

  // Récupérer tous les posts qui ont du htmlContent
  const allPosts = await payload.find({
    collection: 'posts',
    limit: 200,
    depth: 0,
    draft: true,
  })

  for (const post of allPosts.docs) {
    const htmlContent = (post as Record<string, unknown>).htmlContent as string | undefined

    if (!htmlContent) {
      results.push({ slug: post.slug as string, status: 'skip — pas de htmlContent' })
      continue
    }

    // Vérifier si le contenu Lexical est déjà rempli (pas juste le placeholder)
    const content = post.content as { root?: { children?: Array<{ children?: Array<{ text?: string }> }> } } | undefined
    const firstText = content?.root?.children?.[0]?.children?.[0]?.text || ''
    const isPlaceholder = firstText.includes('Contenu importé') || firstText === ''

    if (!isPlaceholder) {
      results.push({ slug: post.slug as string, status: 'skip — contenu Lexical déjà présent' })
      continue
    }

    try {
      const lexicalContent = htmlToLexical(htmlContent)

      if (dryRun) {
        const nodeCount = (lexicalContent.root as { children: unknown[] }).children.length
        results.push({
          slug: post.slug as string,
          status: `dry-run — ${nodeCount} blocs détectés`,
          preview: JSON.stringify(lexicalContent).slice(0, 200) + '...',
        })
        continue
      }

      await payload.update({
        collection: 'posts',
        id: post.id,
        data: {
          content: lexicalContent,
        },
        draft: (post as Record<string, unknown>)._status === 'draft',
      })

      results.push({ slug: post.slug as string, status: 'migré' })
    } catch (e) {
      results.push({
        slug: post.slug as string,
        status: `erreur — ${(e as Error).message}`,
      })
    }
  }

  const migrated = results.filter(r => r.status === 'migré').length
  const skipped = results.filter(r => r.status.startsWith('skip')).length
  const errors = results.filter(r => r.status.startsWith('erreur')).length

  return NextResponse.json({
    summary: { total: allPosts.docs.length, migrated, skipped, errors, dryRun },
    results,
  })
}
