<template>
  <div class="app-shell">
    <AppHeader />
    <main class="main-content">
      <NuxtPage />
    </main>
    <AppFooter />
    
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <ToastNotification
        v-for="toast in toasts"
        :key="toast.id"
        :message="toast.message"
        :retry-callback="toast.retry"
        @close="removeToast(toast.id)"
      />
    </div>
  </div>
</template>

<script setup>
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
import ToastNotification from '~/components/ui/ToastNotification.vue'
import { useToast } from '~/composables/useToast'

const { toasts, removeToast } = useToast()
</script>

<style>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding-top: 60px; /* Accounts for fixed header */
}
</style>
