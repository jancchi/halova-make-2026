import { test, expect } from '@playwright/test'

test('API offline fallback scenario', async ({ page, context }) => {
  await page.route('**/api/v1/**', route => route.abort('failed'))
  
  await page.goto('http://localhost:3000/test-api')
  
  await page.waitForLoadState('networkidle')
  
  await expect(page.getByText('Hľadanie zamestnanca')).toBeVisible({ timeout: 5000 })
  await expect(page.getByText('Active Requests')).toBeVisible()
  await expect(page.getByText('127')).toBeVisible()
  
  await page.screenshot({ path: '.sisyphus/evidence/task-4-api-offline.png', fullPage: true })
})
