export interface Category {
  id: string
  title: string
  description: string
  slug: string
}

export interface Stats {
  activeRequests: number
  completedRequests: number
  activeHelpers: number
  successRate: number
}

export interface RequestPayload {
  // Step 1: Identity
  name: string
  email: string
  organization?: string
  role?: 'startup' | 'investor' | 'service_provider' | 'member'
  phone?: string
  city: string
  
  // Step 2: Need
  category: string
  title: string
  description: string
  
  // Step 3: Details
  urgency: 'low' | 'medium' | 'high'
  deadline?: string
  budget?: number
  helpType: 'volunteer' | 'financial' | 'material' | 'other'
  tags: string[]
}

export interface RequestResponse {
  id: string
  status: string
  createdAt: string
}
