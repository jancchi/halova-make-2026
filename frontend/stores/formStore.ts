import { defineStore } from 'pinia'
import type { RequestPayload, RequestResponse } from '~/api/types'
import { submitRequest } from '~/api/requests'

export const useFormStore = defineStore('form', {
  state: () => ({
    currentStep: 1,
    totalSteps: 4,
    isSubmitting: false,
    submittedId: null as string | null,
    data: {
      // Step 1: Identity
      name: '',
      email: '',
      phone: '',
      city: '',
      // Step 2: Need
      category: '',
      title: '',
      description: '',
      // Step 3: Details
      urgency: 'medium' as 'low' | 'medium' | 'high',
      deadline: '',
      budget: undefined as number | undefined,
      helpType: 'volunteer' as 'volunteer' | 'financial' | 'material' | 'other',
      tags: [] as string[],
    } as RequestPayload,
  }),
  
  actions: {
    nextStep() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++
      }
    },
    
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },
    
    goToStep(step: number) {
      if (step >= 1 && step <= this.totalSteps) {
        this.currentStep = step
      }
    },
    
    resetForm() {
      this.currentStep = 1
      this.isSubmitting = false
      this.submittedId = null
      this.data = {
        name: '',
        email: '',
        phone: '',
        city: '',
        category: '',
        title: '',
        description: '',
        urgency: 'medium',
        deadline: '',
        budget: undefined,
        helpType: 'volunteer',
        tags: [],
      }
    },
    
    async submitForm(): Promise<RequestResponse> {
      this.isSubmitting = true
      try {
        const response = await submitRequest(this.data)
        this.submittedId = response.id
        return response
      } catch (error) {
        this.isSubmitting = false
        throw error
      } finally {
        this.isSubmitting = false
      }
    },
  },
  
  persist: true, // Enable persistence via pinia-plugin-persistedstate
})
