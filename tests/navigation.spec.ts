import { test, expect } from '@/common/fixtures'

test('navigating to the Leadership page show all founders', async ({ mainPage }) => {
    // Given
    await mainPage.goto()
    // When
    await mainPage.navigateTo(['About Us', 'Leadership'])
    // Then
    for (const founder of ['Dmitry Balyasny', "Taylor O'Malley", 'Scott Schroeder']) {
        await expect(mainPage.$foundersSection).toContainText(founder)
    }
})
