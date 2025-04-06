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

const menuItems = {
    'About Us': ['Leadership', 'Locations'],
    'How We Work': ['Investment', 'Risk', 'Technology', 'Business Infrastructure'],
    'Our Strategies': [],
    'News & Insights': [],
    Careers: ['Internships', 'Early Career', 'Talent Development' /*,'Open Roles'*/],
}
const textOnPage = {
    'About Us': 'About Us',
    Leadership: 'Leadership',
    Locations: 'Locations',
    'How We Work': 'How We Work',
    Investment: 'Investment',
    Risk: 'Risk',
    Technology: 'Technology',
    'Business Infrastructure': 'Business Infrastructure',
    'Our Strategies': 'Investment Strategies',
    'News & Insights': 'News',
    Careers: 'Careers',
    Internships: 'Internships',
    'Early Career': 'Early Career',
    'Talent Development': 'Talent Development',
    'Open Roles': 'Open Roles',
}
test('top navigation menu can redirect to all pages', async ({ mainPage }) => {
    // Given
    await mainPage.goto()
    for (const menuItem of Object.keys(menuItems)) {
        await test.step(`navigating to ${menuItem} pages`, async () => {
            // When
            await mainPage.navigateTo([menuItem])
            // Then
            await expect(mainPage.$mainContent).toHaveText(RegExp(`^${textOnPage[menuItem]}`, 'i'))
            for (const subMenuItem of menuItems[menuItem]) {
                // When
                await mainPage.navigateTo([menuItem, subMenuItem])
                // Then
                await expect(mainPage.$mainContent).toHaveText(RegExp(`^${textOnPage[subMenuItem]}`, 'i'))
            }
        })
    }
})
