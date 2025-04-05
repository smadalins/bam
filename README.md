# Simple BAM Automation Framework

Table of Contents

- **[Summary](#summary)**
- **[Setup](#setup)**
- **[Running Tests](#Running-Tests)**
- **[Creating Tests](#Creating-Tests)**
- **[Allure Reports](#Allure-Reports)**
- **[Suported browsers](#Suported-browsers)**
- **[Useful Links](#Useful-Links)**

## Summary

The `bam` repository contains automated tests for BAM web page. It supports the following browsers:

- chromium
- Firefox
- webkit

The test are written in TyepeScript and use the Playwright framework for browser automation. The tests are organized using the Page Object Model (POM) design pattern, which helps to separate the test logic from the page structure and behavior.

GH Actions are used to run the tests. `Playwright Test` workflow is used for that. Additionally to that the `Verified code changes` workflow is used on every push or pull request to the `main` branch. This workflow checks if changes are passing lint and formatting checks.

## Setup

Follow these steps to prepare your local environment to develop and run tests:

1. Familiarize yourself with [Playwright][playwright], which is the browser-based test automation framework.
2. Install [nvm][nvm] to manage Node.js versions locally.
3. `nvm install` to install and use the recommended Node.js version for this project.
4. `npm ci` to install all dependencies needed to run tests locally.
5. `npx playwright install --with-deps` to install the browsers needed for testing.
6. Create a `.env` file using [`.env.sample`](.env.sample) as a guide.

## Running Tests

To run all of the tests against all configured browsers, simply execute `npx playwright test`.

For other options regarding test execution, see [the Playwright doc page on running tests][playwright-run-tests].

To run tests in a specific browser, use the `--project` flag. For example, to run tests in Firefox, use the following command:

```bash
npx playwright test --project=firefox
```

## Creating Tests

Be sure to follow already established patterns codified in existing specs and POMs.
For more info on writing tests, see [the Playwright doc page on writing tests][playwright-write-tests].

## Allure Reports

Allure reports are generated after running tests locally and in the GHA pipeline. They are rich in information and provide a detailed view of the test results.

To show Allure reports, run the following command from the root of the project after running tests:
`allure serve`. Note that [you must have Allure installed on your machine][allure-install] first.

Allure reports are also generated in the GHA pipeline. You can find latest report in [GH pages][gh-pages]. The link to particular report is generated for each run and can be found on the workflow run page.

To analyze the trace of the failed test, you have to go to the failed test in the report and download the trace file. Then drag and drop the trace file into the [playwrig-trace][playwright-trace] page. This will allow you to see the exact steps that were taken during the test execution, including screenshots and network requests.

## Suported browsers

The following browsers are supported by the framework:

- chromium
- firefox
- webkit

## Useful Links

- [Node Version Manager (nvm)][nvm]

[allure-install]: https://allurereport.org/docs/install/
[playwright]: https://playwright.dev/docs/next/intro
[playwright-run-tests]: https://playwright.dev/docs/next/running-tests
[playwright-write-tests]: https://playwright.dev/docs/next/writing-tests
[playwright-trace]: https://trace.playwright.dev
[gh-pages]: https://smadalins.github.io/bam
[nvm]: https://github.com/nvm-sh/nvm

