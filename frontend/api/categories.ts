import apiClient from './axios'
import type { Category } from './types'
import { findFirstAvailableRoute } from './openapi'

const REQUIRED_FORM_CATEGORIES: Category[] = [
  {
    id: 'INVESTOR_INTRO',
    title: 'Predstavenie investorovi',
    description: 'Hľadáte intro alebo kontakt na investora pre váš projekt.',
    slug: 'predstavenie-investorovi',
  },
  {
    id: 'HIRING',
    title: 'Nábor',
    description: 'Potrebujete nájsť vhodného človeka do tímu alebo externú posilu.',
    slug: 'nabor',
  },
  {
    id: 'SPEAKING_OPPORTUNITY',
    title: 'Príležitosť na vystúpenie',
    description: 'Máte záujem vystúpiť, prezentovať alebo moderovať na podujatí.',
    slug: 'prilezitost-na-vystupenie',
  },
  {
    id: 'MARKETING_SUPPORT',
    title: 'Marketingová podpora',
    description: 'Potrebujete pomoc s propagáciou, obsahom alebo komunikačnou stratégiou.',
    slug: 'marketingova-podpora',
  },
  {
    id: 'SALES_SUPPORT',
    title: 'Podpora predaja',
    description: 'Potrebujete podporu v oblasti predaja, outreachu alebo obchodného procesu.',
    slug: 'podpora-predaja',
  },
  {
    id: 'PARTNERSHIP',
    title: 'Partnerstvo',
    description: 'Hľadáte strategického partnera pre spoluprácu alebo spoločný projekt.',
    slug: 'partnerstvo',
  },
  {
    id: 'PRODUCT_FEEDBACK',
    title: 'Spätná väzba na produkt',
    description: 'Potrebujete spätnú väzbu na produkt, funkcie alebo používateľský zážitok.',
    slug: 'spatna-vazba-na-produkt',
  },
  {
    id: 'LEGAL_FINANCE',
    title: 'Právo a financie',
    description: 'Potrebujete konzultáciu v právnej alebo finančnej oblasti.',
    slug: 'pravo-a-financie',
  },
  {
    id: 'OPERATIONS',
    title: 'Operatíva',
    description: 'Potrebujete zefektívniť interné procesy, riadenie alebo prevádzku.',
    slug: 'operativa',
  },
  {
    id: 'OTHER',
    title: 'Iné',
    description: 'Iný typ požiadavky, ktorý nespadá do uvedených kategórií.',
    slug: 'ine',
  },
]

const FALLBACK_CATEGORIES: Category[] = [
  { id: 'employee-search', title: 'Hľadanie zamestnanca', description: 'Hľadanie kolegu, freelancera alebo špecialistu do tímu.', slug: 'hladanie-zamestnanca' },
  { id: 'investor-search', title: 'Hľadanie investora', description: 'Potrebujete investora, partnera alebo financovanie projektu.', slug: 'hladanie-investora' },
  { id: 'event-speaking', title: 'Speakovanie na evente', description: 'Máte záujem vystúpiť, prezentovať alebo viesť diskusiu na podujatí.', slug: 'speakovanie-na-evente' },
  { id: 'social-media-sharing', title: 'Zdieľanie marketingových podkladov', description: 'Potrebujete pomoc so zdieľaním podkladov na sociálnych sieťach.', slug: 'zdielanie-marketingovych-podkladov' },
  { id: 'sales-support', title: 'Podpora v oblasti sales', description: 'Pomoc s obchodnou stratégiou, outreachom alebo predajným procesom.', slug: 'podpora-v-oblasti-sales' },
  { id: 'client-search', title: 'Hľadanie klientov', description: 'Potrebujete osloviť nových klientov a získať dopyt.', slug: 'hladanie-klientov' },
  { id: 'other', title: 'Iné', description: 'Iný typ požiadavky, ktorý nespĺňa vyššie uvedené oblasti.', slug: 'ine' },
]

const CATEGORIES_ROUTES = ['/api/v1/categories']
const BACKEND_PING_ROUTE = '/api/ping'

const LEGACY_TO_CANONICAL_CATEGORY_ID: Record<string, string> = {
  'employee-search': 'HIRING',
  'investor-search': 'INVESTOR_INTRO',
  'event-speaking': 'SPEAKING_OPPORTUNITY',
  'social-media-sharing': 'MARKETING_SUPPORT',
  'sales-support': 'SALES_SUPPORT',
  other: 'OTHER',
}

const REQUIRED_BY_ID = new Map(REQUIRED_FORM_CATEGORIES.map((category) => [category.id, category]))

function normalizeCategoryId(id: string): string {
  return LEGACY_TO_CANONICAL_CATEGORY_ID[id] ?? id
}

function withRequiredCategories(categories: Category[]): Category[] {
  const normalizedDeduped: Category[] = []
  const seenIds = new Set<string>()

  for (const category of categories) {
    const normalizedId = normalizeCategoryId(category.id)
    if (seenIds.has(normalizedId)) {
      continue
    }

    seenIds.add(normalizedId)

    const canonicalCategory = REQUIRED_BY_ID.get(normalizedId)
    if (canonicalCategory) {
      normalizedDeduped.push(canonicalCategory)
      continue
    }

    normalizedDeduped.push({
      ...category,
      id: normalizedId,
    })
  }

  const missingRequired = REQUIRED_FORM_CATEGORIES.filter((category) => !seenIds.has(category.id))
  const merged = [...normalizedDeduped, ...missingRequired]

  const nonOther = merged.filter((category) => category.id !== 'OTHER')
  const otherCategory = merged.find((category) => category.id === 'OTHER')

  return otherCategory ? [...nonOther, otherCategory] : nonOther
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const route = await findFirstAvailableRoute(CATEGORIES_ROUTES)

    if (route) {
      const response = await apiClient.get<Category[]>(route)
      return withRequiredCategories(response.data)
    }

    await apiClient.get(BACKEND_PING_ROUTE)
    return withRequiredCategories(FALLBACK_CATEGORIES)
  } catch (error) {
    console.warn('Categories API unavailable, using fallback', error)
    return withRequiredCategories(FALLBACK_CATEGORIES)
  }
}
