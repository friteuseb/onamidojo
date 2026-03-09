import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

export const getPosts = cache(async (limit = 100) => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    sort: '-publishedDate',
    limit,
    depth: 1,
  })
  return docs
})

export const getPostBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
      _status: { equals: 'published' },
    },
    limit: 1,
    depth: 1,
  })
  return docs[0] || null
})

export const getCategories = cache(async () => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'categories',
    sort: 'name',
    limit: 50,
  })
  return docs
})

export const getPostsByCategory = cache(async (categoryId: string, limit = 100) => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      _status: { equals: 'published' },
      category: { equals: categoryId },
    },
    sort: '-publishedDate',
    limit,
    depth: 1,
  })
  return docs
})
