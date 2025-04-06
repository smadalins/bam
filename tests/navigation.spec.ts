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
    Careers: ['Internships', 'Early Career', 'Talent Development', 'Open Roles'],
}
const textOnPage = {
    'About Us': '^About Us',
    Leadership: '^Leadership',
    Locations: '^Locations',
    'How We Work': '^How We Work',
    Investment: '^Investment',
    Risk: '^Risk',
    Technology: '^Technology',
    'Business Infrastructure': '^Business Infrastructure',
    'Our Strategies': '^Investment Strategies',
    'News & Insights': '^News',
    Careers: '^Careers',
    Internships: '^Internships',
    'Early Career': '^Early Career',
    'Talent Development': '^Talent Development',
    'Open Roles': 'Open RolesExplore Opportunities',
}
test('top navigation menu can redirect to all pages', async ({ mainPage }) => {
    /*   This test is to check the top navigation menu items and sub-menu menu items
     *   The test will navigate to each menu item and sub-menu menuItems
     *   and check if the page is loaded correctly
     *
     *   The test will check the following menu items:
     *   - About Us
     *   - How We Work
     *   - Our Strategies
     *   - News & Insights
     *   - Careers
     *   - Leadership
     *   - Locations
     *   - Investment
     *   - Risk
     *   - Technology
     *   - Business Infrastructure
     *   - Internships
     *   - Early Careers
     *   - Talent Development
     *   - Open Roles (link to new tab in different domain)
     */
    // Given
    await mainPage.goto()
    for (const menuItem of Object.keys(menuItems)) {
        await test.step(`navigating to ${menuItem} pages`, async () => {
            // When
            await mainPage.navigateTo([menuItem])
            // Then
            await expect(mainPage.$mainContent).toHaveText(RegExp(`${textOnPage[menuItem]}`, 'i'))
            for (const subMenuItem of menuItems[menuItem]) {
                // When
                await mainPage.navigateTo([menuItem, subMenuItem])
                // Then
                await expect(mainPage.$mainContent).toHaveText(RegExp(`${textOnPage[subMenuItem]}`, 'i'))
            }
        })
    }
    const firstMenuItem = Object.keys(menuItems).at(0)
    await mainPage.navigateTo([firstMenuItem])
    await expect(mainPage.$mainContent).toHaveText(RegExp(`${textOnPage[firstMenuItem]}`, 'i'))
})
