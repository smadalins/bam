import { test, expect } from '@/common/fixtures'
import { ContactForm } from '@/pages/ContactUsPage'
import { getFieldSourround, getFieldValidationMessage } from '@/common/helpers'
import { faker } from '@faker-js/faker'

test('founders are visible on the Leadership page', async ({ mainPage }) => {
    // Given
    await mainPage.goto()
    // When
    await mainPage.navigateTo(['About Us', 'Leadership'])
    // Then
    for (const founder of ['Dmitry Balyasny', "Taylor O'Malley", 'Scott Schroeder']) {
        await expect(mainPage.$foundersSection).toContainText(founder)
    }
})

test('validate the required fields in Contact form', async ({ contactUsPage }) => {
    // Given
    await contactUsPage.goto()
    // When
    const testData: ContactForm = {
        firstName: '',
        lastName: '',
        email: '',
        message: '',
    }
    await contactUsPage.fillForm(testData)
    await contactUsPage.submitContactForm()
    // Then
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
    // Given
    await contactUsPage.goto()
    // When
    const testData: ContactForm = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: invalidEmail,
        message: faker.lorem.paragraphs(),
    }
    await contactUsPage.fillForm(testData)
    await contactUsPage.submitContactForm()
    // Then
    await expect(contactUsPage.$email).toBeFocused()
    expect(await getFieldValidationMessage(contactUsPage.$email)).toBe(
        invalidEmailErrorText[browser.browserType().name()],
    )
})
