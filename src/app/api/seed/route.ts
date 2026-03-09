import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { articles, categories as articleCategories } from '@/data/articles'

export async function POST() {
  // Sécurité : uniquement en dev
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Non autorisé en production' }, { status: 403 })
  }

  const payload = await getPayload({ config })
  const results: string[] = []

  // 1. Créer l'utilisateur admin
  try {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@onamidojo.fr',
        password: 'On@mi2026!Dojo#Kx',
        firstName: 'Admin',
        lastName: 'Onami',
        role: 'admin',
      },
    })
    results.push('Admin créé (admin@onamidojo.fr)')
  } catch {
    results.push('Admin existe déjà')
  }

  // 2. Créer les catégories
  const categoryMap: Record<string, number | string> = {}
  const categoryColors: Record<string, string> = {
    kyokushin: 'bg-slate-800',
    kempo: 'bg-red-700',
    enfants: 'bg-purple-700',
    competition: 'bg-orange-600',
    general: 'bg-indigo-900',
  }

  for (const cat of articleCategories) {
    if (cat.id === 'all') continue
    try {
      const created = await payload.create({
        collection: 'categories',
        data: {
          name: cat.label,
          slug: cat.id,
          color: categoryColors[cat.id] || 'bg-indigo-900',
        },
      })
      categoryMap[cat.id] = created.id
      results.push(`Catégorie "${cat.label}" créée`)
    } catch {
      const existing = await payload.find({
        collection: 'categories',
        where: { slug: { equals: cat.id } },
        limit: 1,
      })
      if (existing.docs[0]) {
        categoryMap[cat.id] = existing.docs[0].id
        results.push(`Catégorie "${cat.label}" existe déjà`)
      }
    }
  }

  // 3. Importer les articles
  let created = 0
  let skipped = 0

  for (const article of articles) {
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: article.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      skipped++
      continue
    }

    try {
      await payload.create({
        collection: 'posts',
        data: {
          title: article.title,
          slug: article.slug,
          pageTitle: article.pageTitle,
          excerpt: article.description,
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [{ type: 'text', text: 'Contenu importé (voir HTML legacy)', version: 1 }],
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
          htmlContent: article.content,
          featuredImagePath: article.image,
          category: categoryMap[article.category] || undefined,
          publishedDate: '2026-03-08',
          _status: 'published',
        },
      })
      created++
    } catch (e) {
      results.push(`Erreur "${article.slug}": ${(e as Error).message}`)
    }
  }

  results.push(`Articles: ${created} créés, ${skipped} ignorés (existants)`)

  return NextResponse.json({ success: true, results })
}
