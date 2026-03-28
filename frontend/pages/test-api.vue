<script setup>
const { data: categories, error: catError } = await useAsyncData('categories', async () => {
  const { fetchCategories } = await import('~/api/categories')
  return await fetchCategories()
})

const { data: stats, error: statsError } = await useAsyncData('stats', async () => {
  const { fetchStats } = await import('~/api/stats')
  return await fetchStats()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">API Test Page</h1>
      
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Categories</h2>
        <div v-if="categories" class="space-y-2">
          <div v-for="cat in categories" :key="cat.id" class="p-3 bg-gray-50 rounded">
            <div class="font-medium">{{ cat.title }}</div>
            <div class="text-sm text-gray-600">{{ cat.description }}</div>
          </div>
        </div>
        <div v-if="catError" class="text-red-600">Error: {{ catError }}</div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Stats</h2>
        <div v-if="stats" class="grid grid-cols-2 gap-4">
          <div class="p-3 bg-gray-50 rounded">
            <div class="text-2xl font-bold text-blue-600">{{ stats.activeRequests }}</div>
            <div class="text-sm text-gray-600">Active Requests</div>
          </div>
          <div class="p-3 bg-gray-50 rounded">
            <div class="text-2xl font-bold text-green-600">{{ stats.completedRequests }}</div>
            <div class="text-sm text-gray-600">Completed</div>
          </div>
          <div class="p-3 bg-gray-50 rounded">
            <div class="text-2xl font-bold text-purple-600">{{ stats.activeHelpers }}</div>
            <div class="text-sm text-gray-600">Active Helpers</div>
          </div>
          <div class="p-3 bg-gray-50 rounded">
            <div class="text-2xl font-bold text-orange-600">{{ stats.successRate }}%</div>
            <div class="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>
        <div v-if="statsError" class="text-red-600">Error: {{ statsError }}</div>
      </div>
    </div>
  </div>
</template>
