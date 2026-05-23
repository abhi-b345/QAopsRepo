const{test,expect} = require('@playwright/test');
const { brotliCompress } = require('node:zlib');

test('UI element handling', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const password = page.locator("#password");
    const dropDown = page.locator("[data-style*='btn-info']");
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await page.locator(".checkmark").nth(1).click();
    await dropDown.selectOption("stud");
    await page.locator("#terms").click();
    await page.locator("[class*='btn-info']").click();

});

test('Handling of child page', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const password = page.locator("#password");
    const dropDown = page.locator("[data-style*='btn-info']");
    const link1 = page.locator("[href*='documents-request']");
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await page.locator(".checkmark").nth(1).click();
    await dropDown.selectOption("stud");
    await page.locator("#terms").click();
    const[newPage]= await Promise.all([
        context.waitForEvent('page'),
        link1.click(),

    ])
    console.log(await newPage.locator("[class*='im-para']").nth(1).textContent());
    await page.locator("[class*='btn-info']").click();
});

/*test('Handling of multiple page', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const password = page.locator("#password");
    const dropDown = page.locator("[data-style*='btn-info']");
    const link1 = page.locator("[href*='documents-request']");
    const link2= page.locator("[href*='techsmarthire']");
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await page.locator(".checkmark").nth(1).click();
    await dropDown.selectOption("stud");
    await page.locator("#terms").click();
    const[newPage]= await Promise.all([
        context.waitForEvent('page'),
        link1.click(),

    ]);
      const[newPage1]= await Promise.all([
        context.waitForEvent('page'),
        link2.click(),

    ]);
    console.log(await newPage.locator("[class*='im-para']").nth(1).textContent());
    await newPage1.waitForLoadState();
    console.log(await newPage1.locator("p.mb-4").textContent());
    await page.locator("[class*='btn-info']").click();
});*/