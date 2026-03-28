<template>
  <footer class="app-footer" data-testid="app-footer">
    <div class="footer-content">
      <div class="copyright text-body">
      &copy; 2026 0100 Komunita pomáha
      </div>
      <div class="footer-links text-body">
        <NuxtLink to="/about">O projekte</NuxtLink>
        <NuxtLink to="/support">Podpora</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  border-top: 1px solid var(--color-border);
  padding: 2rem 0;
  height: auto;
  margin-top: auto; /* Push to bottom if container is flex */
}

.footer-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
}

.copyright {
  color: var(--color-muted);
  font-size: 0.875rem;
}

.footer-links {
  display: flex;
  gap: var(--spacing-md);
  font-size: 0.875rem;
}

.footer-links a {
  color: var(--color-muted);
  transition: color 0.2s ease, opacity 0.2s ease;
}

.footer-links a:hover {
  color: var(--color-text);
  opacity: 0.8;
}

@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
