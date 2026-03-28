<template>
  <main class="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-6">
    <h1 class="text-5xl font-bold tracking-tight">🚀 Hackathon Template</h1>
    <p class="text-gray-400 text-lg">Nuxt 3 · FastAPI · PostgreSQL · Qdrant · JWT</p>
    <div class="flex gap-4 mt-4">
      <a
        href="http://localhost:8000/docs"
        target="_blank"
        class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition-colors"
      >
        API Docs →
      </a>
      <a
        href="http://localhost:8000/health"
        target="_blank"
        class="px-4 py-2 border border-gray-700 hover:border-gray-500 rounded-lg text-sm font-medium transition-colors"
      >
        Health Check
      </a>
    </div>
  </main>
</template>
