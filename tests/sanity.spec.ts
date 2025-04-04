import { test, expect } from '@/common/fixtures'
import { ContactForm } from '@/pages/ContactUsPage'
import { getFieldSourround } from '@/common/helpers'

test('page load', async ({ page }) => {
    await page.goto('')
    await expect(page).toHaveTitle(/Balyasny Asset Management/)
})

test('founders are presented on the Leadership page', async ({ mainPage }) => {
    await mainPage.goto()
    await mainPage.navigateTo(['About Us', 'Leadership'])
    for (const founder of ['Dmitry Balyasny', "Taylor O'Malley", 'Scott Schroeder']) {
        await expect(mainPage.$foundersSection).toContainText(founder)
    }
})

test('validate the Contact form', async ({ contactUsPage }) => {
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

test('validate the Contact form with invalid email', async ({ contactUsPage }) => {
    await contactUsPage.goto()
    const testData: ContactForm = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email',
        message: 'Test message',
    }
    await contactUsPage.fillForm(testData)
    await contactUsPage.submitContactForm()
    await expect(contactUsPage.$email).toBeFocused()
    const validationMsg = await contactUsPage.$email.evaluate((el) => {
        return (el as HTMLInputElement).validationMessage
    })
    expect(validationMsg).toBe("Please include an '@' in the email address. 'invalid-email' is missing an '@'.")
})
