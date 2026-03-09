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

  // 1. Créer ou mettre à jour l'utilisateur admin
  try {
    const existingAdmin = await payload.find({
      collection: 'users',
      where: { email: { equals: 'admin@onamidojo.fr' } },
      limit: 1,
    })
    if (existingAdmin.docs.length > 0) {
      await payload.update({
        collection: 'users',
        id: existingAdmin.docs[0].id,
        data: {
          password: 'On@mi2026!Dojo#Kx',
          firstName: 'Admin',
          lastName: 'Onami',
          role: 'admin',
        },
      })
      results.push('Admin mis à jour (admin@onamidojo.fr)')
    } else {
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
    }
  } catch (e) {
    results.push(`Erreur admin: ${(e as Error).message}`)
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

  // 4. Importer les instructeurs
  const instructors = [
    {
      name: 'Senseï Olivier Leclerc',
      role: 'Directeur Technique - Kempo',
      discipline: 'kempo',
      rank: 'Ceinture Noire',
      achievements: [
        { label: '3ème au Championnat du Monde WKB' },
        { label: '5x Podium Européen' },
        { label: 'Vice-Champion d\'Europe 2023 & 2024' },
      ],
      photoPath: '/images/instructors/olivier.png',
      order: 1,
    },
    {
      name: 'Senseï Xavier Gadoux',
      role: 'Responsable Kyokushin',
      discipline: 'kyokushin',
      rank: '3ème Dan',
      achievements: [
        { label: 'Champion de France' },
        { label: 'WKB Branch Chief' },
        { label: 'World Kyokushin Budokai France' },
      ],
      photoPath: '/images/instructors/xavier.jpg',
      order: 2,
    },
    {
      name: 'Senseï Marc Yeu',
      role: 'Instructeur Kempo',
      discipline: 'kempo',
      rank: '2ème Dan',
      achievements: [
        { label: 'Instructeur certifié' },
        { label: 'Spécialiste Kumite' },
      ],
      photoPath: '/images/instructors/marc.jpg',
      order: 3,
    },
    {
      name: 'Senseï Anibal Barreira',
      role: 'Instructeur Kempo',
      discipline: 'kempo',
      rank: '1er Dan',
      achievements: [
        { label: 'Instructeur certifié' },
        { label: 'Formation continue' },
      ],
      photoPath: '/images/instructors/anibal.jpg',
      order: 4,
    },
  ]

  let membersCreated = 0
  for (const inst of instructors) {
    const existing = await payload.find({
      collection: 'team-members',
      where: { name: { equals: inst.name } },
      limit: 1,
    })
    if (existing.docs.length > 0) continue

    try {
      await payload.create({ collection: 'team-members', data: inst })
      membersCreated++
    } catch (e) {
      results.push(`Erreur instructeur "${inst.name}": ${(e as Error).message}`)
    }
  }
  results.push(`Instructeurs: ${membersCreated} créés`)

  // 5. Initialiser la global Homepage
  try {
    await payload.updateGlobal({
      slug: 'homepage',
      data: {
        hero: {
          badge: 'Inscriptions ouvertes 2025-2026',
          subtitle: 'L\'Art du Karaté Traditionnel à Amiens',
          baseline: 'Découvrez la puissance du Kyokushin et la polyvalence du Kempo dans un environnement dédié à l\'excellence, au respect et au dépassement de soi.',
          ctaPrimary: 'Découvrir nos cours',
          ctaSecondary: 'Essai gratuit',
        },
        disciplines: {
          kempo: {
            tagline: 'Combat Libre Japonais',
            description: 'Une approche moderne et complète intégrant frappes, projections et travail au sol. Le Kempo à l\'Onami Dojo privilégie l\'efficacité en combat réel tout en conservant l\'esprit martial japonais.',
            features: [
              { label: 'Système polyvalent pieds-poings' },
              { label: 'Self-défense réaliste' },
              { label: 'Combat libre (Kumite)' },
              { label: 'Technique et polyvalence' },
            ],
            audience: 'Enfants, Ados, Adultes',
          },
          kyokushin: {
            tagline: 'Full Contact Traditionnel',
            description: 'L\'école de l\'ultime vérité. Un style à frappes réelles, réputé pour sa rigueur physique. Forgez un corps de fer et un mental d\'acier à travers la tradition de Sosai Mas Oyama.',
            features: [
              { label: 'Conditionnement physique intensif' },
              { label: 'Technique traditionnelle (Kihon)' },
              { label: 'Katas et Bunkai' },
              { label: 'Kumite plein contact' },
            ],
            audience: 'Ados & Adultes',
          },
        },
        whyChooseUs: {
          title: 'Pourquoi choisir Onami Dojo ?',
          subtitle: 'Plus qu\'un simple club de sport, un centre de formation humaine et martiale au cœur d\'Amiens.',
          features: [
            { icon: 'award', title: 'Champions Internationaux', description: 'Encadrement par des experts titrés : podiums européens et championnats nationaux.' },
            { icon: 'users', title: 'Tous les Publics', description: 'Sections dédiées aux enfants dès 6 ans, adolescents et adultes de tous niveaux.' },
            { icon: 'flame', title: '2 Cours d\'Essai Gratuits', description: 'Venez tester gratuitement nos deux disciplines sans aucun engagement.' },
            { icon: 'shield', title: 'Équipement Disponible', description: 'Matériel de frappe et protections de qualité disponibles sur place et à la vente.' },
            { icon: 'mappin', title: 'Dojo en Centre-Ville', description: 'Notre dojo au 24 rue des Cordeliers à Amiens, facilement accessible pour tous.' },
            { icon: 'users', title: 'Esprit de Famille', description: 'Une ambiance bienveillante où l\'entraide et le respect sont les règles d\'or.' },
          ],
        },
        contact: {
          headline: 'Commencez votre parcours martial dès aujourd\'hui.',
          description: 'Le karaté est une quête de vie. Que vous cherchiez la forme physique, la self-défense ou une discipline mentale, l\'Onami Dojo vous accompagne à chaque étape.',
          trialText: '2 cours d\'essai gratuits !',
          trialDescription: 'Venez découvrir nos disciplines sans engagement. Prévoyez une tenue de sport et de l\'eau.',
        },
        scheduleNote: 'Les cours du samedi sont sur autorisation selon l\'assiduité et le niveau. Reprise des cours : 16 septembre 2025.',
      },
    })
    results.push('Homepage global initialisée')
  } catch (e) {
    results.push(`Erreur homepage: ${(e as Error).message}`)
  }

  return NextResponse.json({ success: true, results })
}
