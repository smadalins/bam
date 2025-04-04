import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import tseslint from 'typescript-eslint'
import playwright from 'eslint-plugin-playwright'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import { includeIgnoreFile } from '@eslint/compat'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

export default defineConfig([
    tseslint.configs.recommended,
    includeIgnoreFile(gitignorePath),
    {
        ...playwright.configs['flat/recommended'],
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        plugins: {
            js,
            playwright,
            typescriptEslint,
            tseslint,
        },
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        extends: ['js/recommended'],
        rules: {
            ...typescriptEslint.configs.recommended.rules,
            ...playwright.configs['flat/recommended'].rules,
            'linebreak-style': ['error', 'unix'],
            quotes: ['error', 'single', { avoidEscape: true }],
            semi: ['error', 'never'],
            'playwright/prefer-web-first-assertions': 'off',
        },
    },
    eslintPluginPrettierRecommended,
])
