import { publicClient as client } from '.'

export type SupportedLanguage = 'en' | 'pt' | 'es'

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en'

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
] as const

/**
 * Get content in preferred language with fallback
 */
export async function getLocalizedContent<T>(
  query: string,
  params: Record<string, any>,
  preferredLanguage: SupportedLanguage = DEFAULT_LANGUAGE
): Promise<T> {
  // Try preferred language first
  let result = await client.fetch<T>(query, {
    ...params,
    language: preferredLanguage,
  })

  // Fallback to default language if not found
  if (!result && preferredLanguage !== DEFAULT_LANGUAGE) {
    result = await client.fetch<T>(query, {
      ...params,
      language: DEFAULT_LANGUAGE,
    })
  }

  return result
}

/**
 * Get all translations of a document
 */
export async function getTranslations(
  documentId: string,
  documentType: string
): Promise<Array<{ language: string; _id: string }>> {
  const query = `*[_type == $type && references($id)] {
    _id,
    language
  }`
  
  return client.fetch(query, { type: documentType, id: documentId })
}