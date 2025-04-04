import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
    await page.goto('')
    await expect(page).toHaveTitle(/Balyasny Asset Management/)
})

test('get started link', async ({ page }) => {
    await page.goto('')
    await page.getByLabel('Header').getByRole('link', { name: 'About Us' }).click()
    await expect(page.getByRole('main')).toHaveText(/Dmitry Balyasny/)
})
