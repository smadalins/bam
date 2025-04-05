import { Page } from '@playwright/test'
import { test as base } from '@playwright/test'

export class AppPage {
    readonly page: Page
    protected url: string

    constructor(page: Page) {
        this.page = page
        this.url = ''
    }

    async goto(sufix: string = '') {
        await this.page.goto(this.url.concat(sufix))
    }

    get $navigation() {
        return this.page.getByRole('navigation')
    }

    get $foundersSection() {
        return this.page.getByText(/^Founders.+/)
    }

    get $mainContent() {
        return this.page.getByRole('main')
    }

    async navigateTo(menuPath: string[]) {
        for (const menuName of menuPath) {
            await this.$navigation.getByRole('link', { name: menuName }).hover()
        }
        await this.$navigation.getByRole('link', { name: menuPath.at(-1) }).click()
    }
}

type TestFixtures = {
    mainPage: AppPage
}

export const test = base.extend<TestFixtures>({
    mainPage: async ({ page }, use) => {
        const appPage = new AppPage(page)
        await use(appPage)
    },
})
