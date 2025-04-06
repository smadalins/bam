import { Page } from '@playwright/test'
import { test as base } from '@playwright/test'

export class AppPage {
    protected page: Page
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
        //  Move the mouse to workaround the hover issue on Firefox
        await this.page.mouse.move(0, 0)
        for (const menuName of menuPath) {
            await this.$navigation.getByRole('link', { name: menuName }).hover()
        }
        await this.clickMenu(menuPath.at(-1))
    }

    private async clickMenu(menuName: string) {
        const menu = this.$navigation.getByRole('link', { name: menuName })
        let pagePromise: Promise<Page> = Promise.resolve(this.page)
        if ((await menu.getAttribute('target')) === '_blank') {
            pagePromise = this.page.waitForEvent('popup')
        }

        await menu.click()

        if ((await menu.getAttribute('target')) === '_blank') {
            this.page = await pagePromise
        }
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
