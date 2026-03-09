import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

// Import statique des articles existants
import { articles, categories as articleCategories } from '../src/data/articles'

async function seed() {
  console.log('Démarrage du seed Payload CMS...')

  const payload = await getPayload({ config })

  // 1. Créer l'utilisateur admin
  console.log('\n--- Création utilisateur admin ---')
  try {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@onamidojo.fr',
        password: process.env.ADMIN_PASSWORD || 'changeme',
        firstName: 'Admin',
        lastName: 'Onami',
        role: 'admin',
      },
    })
    console.log('  ✓ Admin créé (admin@onamidojo.fr)')
  } catch {
    console.log('  → Admin existe déjà, ignoré')
  }

  // 2. Créer les catégories
  console.log('\n--- Création des catégories ---')
  const categoryMap: Record<string, string> = {}

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
      categoryMap[cat.id] = created.id as string
      console.log(`  ✓ Catégorie "${cat.label}" (${cat.id})`)
    } catch {
      // Catégorie existe déjà, la retrouver
      const existing = await payload.find({
        collection: 'categories',
        where: { slug: { equals: cat.id } },
        limit: 1,
      })
      if (existing.docs[0]) {
        categoryMap[cat.id] = existing.docs[0].id as string
        console.log(`  → Catégorie "${cat.label}" existe déjà`)
      }
    }
  }

  // 3. Importer les articles
  console.log(`\n--- Import de ${articles.length} articles ---`)
  let created = 0
  let skipped = 0

  for (const article of articles) {
    // Vérifier si l'article existe déjà
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
          // Contenu minimal Lexical (un paragraphe vide) — le vrai contenu est dans htmlContent
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
      if (created % 10 === 0) console.log(`  ${created} articles importés...`)
    } catch (e) {
      console.error(`  ✗ Erreur article "${article.slug}":`, (e as Error).message)
    }
  }

  console.log(`\n✓ Seed terminé: ${created} créés, ${skipped} ignorés (existants)`)
  process.exit(0)
}

seed().catch((e) => {
  console.error('Erreur seed:', e)
  process.exit(1)
})
