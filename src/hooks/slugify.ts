import type { CollectionBeforeChangeHook } from 'payload'

export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function slugField(sourceField: string): CollectionBeforeChangeHook {
  return ({ data, operation }) => {
    // Ne pas écraser un slug déjà fourni
    if (!data?.slug && (operation === 'create' || !data?.slug)) {
      if (data?.[sourceField]) {
        data.slug = slugify(data[sourceField] as string)
      }
    }
    return data
  }
}
