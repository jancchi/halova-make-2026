<template>
  <header class="app-header" data-testid="app-header">
    <div class="header-container">
  <NuxtLink to="/" class="logo text-display text-caps">0100 Komunita pomáha</NuxtLink>

      <!-- Desktop Nav -->
      <nav class="desktop-nav text-caps" aria-label="Desktop Navigation">
        <NuxtLink to="/" data-testid="nav-link-home">Domov</NuxtLink>
        <NuxtLink to="/about" data-testid="nav-link-about">O nás</NuxtLink>
        <NuxtLink to="/form" data-testid="nav-link-requests">Žiadosti</NuxtLink>
        <NuxtLink to="/contact" data-testid="nav-link-contact">Kontakt</NuxtLink>
      </nav>

      <!-- Mobile Toggle -->
      <button 
        class="mobile-toggle" 
        data-testid="nav-toggle"
        @click="mobileMenuOpen = !mobileMenuOpen"
        :aria-expanded="mobileMenuOpen"
        aria-label="Toggle navigation"
      >
        <span class="hamburger-line" :class="{ 'is-open': mobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ 'is-open': mobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ 'is-open': mobileMenuOpen }"></span>
      </button>
    </div>

    <!-- Mobile Panel -->
    <div 
      class="mobile-nav-panel text-caps" 
      data-testid="mobile-nav-panel"
      :class="{ 'is-open': mobileMenuOpen }"
    >
      <nav class="mobile-nav" aria-label="Mobile Navigation">
        <NuxtLink to="/" data-testid="nav-link-home-mobile">Domov</NuxtLink>
        <NuxtLink to="/about" data-testid="nav-link-about-mobile">O nás</NuxtLink>
        <NuxtLink to="/form" data-testid="nav-link-requests-mobile">Žiadosti</NuxtLink>
        <NuxtLink to="/contact" data-testid="nav-link-contact-mobile">Kontakt</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const mobileMenuOpen = ref(false)
const route = useRoute()

// Close menu on route change
watch(route, () => {
  mobileMenuOpen.value = false
})
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  z-index: 50;
  display: flex;
  align-items: center;
  animation: header-accent-pulse 8s ease-in-out infinite;
}

@keyframes header-accent-pulse {
  0%,
  100% {
    border-bottom-color: var(--color-border);
    box-shadow: 0 1px 0 rgba(15, 239, 170, 0);
  }

  50% {
    border-bottom-color: rgba(15, 239, 170, 0.42);
    box-shadow: 0 2px 14px -10px rgba(15, 239, 170, 0.28);
  }
}

.header-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-sm);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-weight: 700;
  letter-spacing: 0.05em;
  font-size: 1.125rem;
  z-index: 51; /* Keep above mobile panel */
}

.desktop-nav {
  display: none;
  gap: var(--spacing-md);
}

.desktop-nav a {
  font-weight: 500;
  font-size: 0.875rem;
  opacity: 1;
  transition: color 0.2s ease, opacity 0.2s ease;
}

.desktop-nav a:hover,
.desktop-nav a.router-link-active {
  color: var(--color-accent);
  opacity: 1;
}

.mobile-toggle {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 24px;
  height: 24px;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  cursor: pointer;
  padding: 0.15rem;
  z-index: 51;
}

.hamburger-line {
  width: 24px;
  height: 1px;
  background-color: var(--color-text);
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;
}

.hamburger-line.is-open:nth-child(1) {
  transform: rotate(45deg);
}
.hamburger-line.is-open:nth-child(2) {
  opacity: 0;
}
.hamburger-line.is-open:nth-child(3) {
  transform: rotate(-45deg);
}

.mobile-nav-panel {
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.97);
  border-bottom: 1px solid var(--color-border);
  transform: translateY(-100%);
  opacity: 0;
  visibility: hidden;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s;
  z-index: 49;
}

.mobile-nav-panel.is-open {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md) var(--spacing-sm);
  gap: var(--spacing-md);
}

.mobile-nav a {
  font-size: 1.25rem;
  font-weight: 500;
  opacity: 1;
  transition: color 0.2s ease, opacity 0.2s ease;
}

.mobile-nav a:hover,
.mobile-nav a.router-link-active {
  color: var(--color-accent);
  opacity: 1;
}

/* Tablet / Desktop */
@media (min-width: 768px) {
  .desktop-nav {
    display: flex;
  }
  .mobile-toggle {
    display: none;
  }
  .mobile-nav-panel {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .app-header {
    animation: none;
  }
}
</style>
