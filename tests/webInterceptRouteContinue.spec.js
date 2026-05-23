const {test, expect, request} = require('@playwright/test');
let webContext ;

test.beforeAll(async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByPlaceholder("you@email.com").fill("tyagi.b345@gmail.com");
    await page.getByPlaceholder("••••••").fill("Abhishek@123");
    //await page.getByRole("textbox", {name :"enter your passsword"}).fill("Abhishek@123");
    //page.getByPlaceholder("enter your passsword")
    //await page.getByRole("button", {name: "Login"}).click();
    await page.getByRole("button", {name: "Sign In"}).click();
    await page.waitForLoadState('networkidle');

    await context.storageState({path: 'state.json'}); //tell playwright to store current storage to state.json file

    webContext = await browser.newContext({storageState: "state.json"});  // new webContext to create having state.json file in that context

});

test('Intercept/route API with new url using route.continue()', async()=>
{
    const page = await webContext.newPage();
    await page.route("https://api.eventhub.rahulshettyacademy.com/api/events?page=1&limit=12", async route=>{
       await route.continue({url: 'https://api.eventhub.rahulshettyacademy.com/api/bookings?page=1&limit=10'})
    }
    );
    await page.goto("https://eventhub.rahulshettyacademy.com/");

    await page.waitForLoadState('networkidle');
    await page.locator("#nav-events").click();


})

