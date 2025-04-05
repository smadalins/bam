import { test, expect } from '@/common/fixtures'
import { ContactForm } from '@/pages/ContactUsPage'
import { getFieldSourround } from '@/common/helpers'
import { faker } from '@faker-js/faker'

test('founders are visible on the Leadership page', async ({ mainPage }) => {
    await mainPage.goto()
    await mainPage.navigateTo(['About Us', 'Leadership'])
    for (const founder of ['Dmitry Balyasny', "Taylor O'Malley", 'Scott Schroeder']) {
        await expect(mainPage.$foundersSection).toContainText(founder)
    }
})

test('validate the required fields in Contact form', async ({ contactUsPage }) => {
    await contactUsPage.goto()
    const testData: ContactForm = {
        firstName: '',
        lastName: '',
        email: '',
        message: '',
    }
    await contactUsPage.fillForm(testData)
    await contactUsPage.submitContactForm()
    for (const required of ['$firstName', '$lastName', '$email', '$message']) {
        await expect(getFieldSourround(contactUsPage[required])).toHaveText(/This field is required/)
    }
})

const invalidEmail = 'invalid-email'
const invalidEmailErrorText = {
    chromium: `Please include an '@' in the email address. '${invalidEmail}' is missing an '@'.`,
    firefox: 'Please enter an email address.',
    webkit: 'Enter an email address',
}
test('validate the Contact form with invalid email', async ({ contactUsPage, browser }) => {
    await contactUsPage.goto()
    const testData: ContactForm = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: invalidEmail,
        message: faker.lorem.paragraphs(),
    }
    await contactUsPage.fillForm(testData)
    await contactUsPage.submitContactForm()
    await expect(contactUsPage.$email).toBeFocused()
    const validationMsg = await contactUsPage.$email.evaluate((el) => {
        return (el as HTMLInputElement).validationMessage
    })
    expect(validationMsg).toBe(invalidEmailErrorText[browser.browserType().name()])
})
