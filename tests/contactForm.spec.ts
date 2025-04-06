import { test, expect } from '@/common/fixtures'
import { ContactForm } from '@/pages/ContactUsPage'
import { getFieldSourround, getFieldValidationMessage } from '@/common/helpers'
import { faker } from '@faker-js/faker'
import { Config } from '@/config'

test('submitting the Contact Form with empty required fields show validation message', async ({ contactUsPage }) => {
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
test('submitting the Contact Form with invalid email show validation message', async ({ contactUsPage, browser }) => {
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

test('submitting the Contact Form with invalid phone number show validation message', async ({ contactUsPage }) => {
    // Given
    await contactUsPage.goto()
    // When
    const testData: ContactForm = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        companySchoolName: faker.company.name(),
        phoneNumber: 'invalid-phone-number',
        topic: faker.helpers.arrayElement([
            'General',
            'Media Requests',
            'Investor Relations',
            'Request a Campus Visit',
            'Employment Verification',
        ]),
        message: faker.lorem.paragraphs(),
    }
    await contactUsPage.fillForm(testData)
    await contactUsPage.submitContactForm()
    // Then
    await expect(contactUsPage.$phoneNumber).toBeFocused()
    await expect(getFieldSourround(contactUsPage.$phoneNumber)).toHaveText(/Invalid phone number/)
})

test('submitting contact form by automation with valida data is blocked by reCAPTCHA', async ({ contactUsPage }) => {
    /*
     * This test is to check if the reCAPTCHA is blocking the form submission when the form is filled by automation
     * The test will fill the form with valid data and submit it.
     * The test will check if the reCAPTCHA is blocking the form submission by checking the response of the form submission.
     * The test will check if the error message is shown on the page.
     */
    // Given
    await contactUsPage.goto()
    // Wait for the page to load completely along with the reCAPTCHA
    // eslint-disable-next-line playwright/no-networkidle
    await contactUsPage.page.waitForLoadState('networkidle')
    // When
    const testData: ContactForm = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        companySchoolName: faker.company.name(),
        phoneNumber: faker.phone.number({ style: 'international' }),
        topic: faker.helpers.arrayElement([
            'General',
            'Media Requests',
            'Investor Relations',
            'Request a Campus Visit',
            'Employment Verification',
        ]),
        message: faker.lorem.paragraphs(),
    }
    await contactUsPage.fillForm(testData)
    const responsePromise = contactUsPage.page.waitForResponse(
        (response) => response.url().includes(Config.API_URL) && response.request().method() === 'POST',
    )
    await contactUsPage.submitContactForm()
    const response = await responsePromise
    // Then
    expect(await response.text()).toMatch(/Failed reCAPTCHA verification/)
    await expect(contactUsPage.$mainContent).toContainText(
        'There was an error submitting the form. Please try again or refresh the page.',
    )
})
