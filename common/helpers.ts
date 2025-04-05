import { Locator } from '@playwright/test'

export function getFieldSourround(field: Locator): Locator {
    return field.locator('..')
}

export async function getFieldValidationMessage(field: Locator): Promise<string> {
    return await field.evaluate((el) => {
        return (el as HTMLInputElement).validationMessage
    })
}
