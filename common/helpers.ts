import { Locator } from '@playwright/test'

export function getFieldSourround(field: Locator): Promise<Locator> {
    return field.locator('..')
}
