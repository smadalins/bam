import { mergeTests } from '@playwright/test'

import { test as mainPage } from '@/pages/AppPage'
import { test as contactUsPage } from '@/pages/ContactUsPage'

export const test = mergeTests(mainPage, contactUsPage)

export { expect } from '@playwright/test'
