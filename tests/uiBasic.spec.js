const {test, expect} = require('@playwright/test')

test('Browser context pw test', async({browser})=>
{
  const context =await browser.newContext();
  const page =   await context.newPage();
  await page.goto("https://www.google.com/");
});

test('Page Playwright test', async({page})=>
{

 await page.goto("https://www.google.com/");
 console.log('title of page is' + await page.title());
 await expect(page).toHaveTitle("Google");
});