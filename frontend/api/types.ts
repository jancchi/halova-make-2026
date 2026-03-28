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

export interface BackendPingResponse {
  pong: boolean
}

export interface RegisterPayload {
  email: string
  password: string
}

export interface User {
  id: number
  email: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthTokenResponse {
  access_token: string
  token_type: string
}
