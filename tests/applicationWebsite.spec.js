const {test,expect} = require('@playwright/test');

test('to validate addToCard website test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client", {
    waitUntil: 'domcontentloaded',
    timeout: 90000
});
    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const cardBody = page.locator(".card-body");
    const productName = 'ZARA COAT 3';
    const cartOrder = page.locator("[class*='cartWrap']");
    await email.waitFor();
    await email.fill("tyagi.b345@gmail.com");
    await password.fill("Abhishek@123");
    await page.locator("#login").click();
    await cardBody.first().waitFor();
    const count = await cardBody.count();
    const title =await page.locator(".card-body b").allTextContents();
    console.log(title);
    for(let i=0; i<count; ++i)
    {
        if(await cardBody.nth(i).locator("b").textContent() === productName)
        {
            await cardBody.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='dashboard']").last().click();
    //await page.waitForLoadState('networkidle');
    await cartOrder.first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();

    await page.locator("[class*='input ddl']").nth(0).selectOption("01");
    await page.locator("[class*='input ddl']").nth(1).selectOption("11");

    await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay:150});

    const dropDown = page.locator(".ta-results");
    await dropDown.waitFor();

    const countA = await dropDown.locator("button").count();

    for(let i=0; i< countA ; ++i )
    {
        const text = await dropDown.locator("button").nth(i).textContent();
        if(text === " India")
        {
            await dropDown.locator("button").nth(i).click();
            break;
        }
    }
    
    //expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
     console.log(orderId);
    await page.locator("[routerlink*='myorders']").last().click();

    await page.locator("tbody").waitFor();

    const row = page.locator("tbody tr");

    for(let i=0; i< await row.count(); ++i)
    {
       const text2=await row.nth(i).locator("th").textContent();
       if(text2.includes(orderId))
       {
        await row.nth(i).locator("button").click();
        break;
       }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

})