import { AppPage } from './AppPage'
import { test as base, Page } from '@playwright/test'

export class ContactUsPage extends AppPage {
    constructor(page: Page) {
        super(page)
        this.url = 'contact-us'
    }

    get $firstName() {
        return this.page.getByLabel('First Name*')
    }
    get $lastName() {
        return this.page.getByLabel('Last Name*')
    }
    get $email() {
        return this.page.getByRole('textbox', { name: 'E-mail Address*' })
    }
    get $companySchoolName() {
        return this.page.getByLabel('Company/School Name')
    }
    get $phoneNumber() {
        return this.page.getByLabel('Phone Number')
    }
    get $topic() {
        return this.page.getByLabel('Topic')
    }
    get $message() {
        return this.page.getByLabel('Your Message*')
    }
    get $submitButton() {
        return this.page.getByRole('button', { name: 'Submit' })
    }

    async fillForm(contactForm: ContactForm) {
        await this.$firstName.fill(contactForm.firstName)
        await this.$lastName.fill(contactForm.lastName)
        await this.$email.fill(contactForm.email)
        if (contactForm.companySchoolName !== undefined) {
            await this.$companySchoolName.fill(contactForm.companySchoolName)
        }
        if (contactForm.phoneNumber !== undefined) {
            await this.$phoneNumber.fill(contactForm.phoneNumber)
        }
        if (contactForm.topic !== undefined) {
            await this.$topic.selectOption({ label: contactForm.topic })
        }
        await this.$message.fill(contactForm.message)
    }

    async submitContactForm() {
        await this.$submitButton.click()
    }
}

export interface ContactForm {
    firstName: string
    lastName: string
    email: string
    companySchoolName?: string
    phoneNumber?: string
    topic?: string
    message: string
}

type TestFixtures = {
    contactUsPage: ContactUsPage
}

export const test = base.extend<TestFixtures>({
    contactUsPage: async ({ page }, use) => {
        const contactUsPage = new ContactUsPage(page)
        await use(contactUsPage)
    },
})
