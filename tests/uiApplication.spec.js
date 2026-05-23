const {test, expect} = require('@playwright/test');

test('email validation test', async({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const userName = page.locator('#userEmail');
    const userPassword = page.locator("[id='userPassword']");
    await userName.fill("tyagi.b345@gmail.com");
    await userPassword.fill("Abhishek@123");
    await page.locator("[type='submit']").click();
}
);

test('extracting first item from list', async({page})=>
{
   
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    
    const userName = page.locator('#userEmail');
    const userPassword = page.locator("[id='userPassword']");
    const element = page.locator("[style*='text-transform: uppercase']");
    await userName.fill("tyagi.b345@gmail.com");
    await userPassword.fill("Abhishek@123");
    await page.locator("[type='submit']").click();
    console.log(await element.nth(0).textContent());
    await expect(element.nth(0)).toContainText('ADIDAS');


});

test('test to validate allTextContent', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const userName = page.locator("#userEmail");
    const userPassword = page.locator("#userPassword");
    const submit = page.locator("[class*='btn-block']");
    const element = page.locator(".card-body b");
    await userName.fill("tyagi.b345@gmail.com");
    await userPassword.fill("Abhishek@123");
    await submit.click();
    //await page.waitForLoadState('networkidle');
    //console.log(await element.allTextContents());
    await element.last().waitFor();
    console.log(await element.allTextContents());
    console.log(await element.nth(1).textContent());
   

});
