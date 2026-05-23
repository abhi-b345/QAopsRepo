const {test,expect,request} = require('@playwright/test');
const loginPayLoad = {email:"tyagi.b345@gmail.com",password:"Abhishek@123"};
let token;

test.beforeAll(async()=>
{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",{
    data: loginPayLoad,
    headers : {
        'content-type' : 'application/json'
    },
});

    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
});

test('check refund is visible on 1 ticket', async({page})=>
{
    await page.addInitScript(value=>
    {
        window.localStorage.setItem('token', value);
    }, token)

    await page.goto("https://eventhub.rahulshettyacademy.com/");
    await page.waitForLoadState('networkidle');
    await page.locator("[data-testid='event-card']").first().waitFor();
    await page.locator("[data-testid='event-card']").filter({hasText: 'Hollywood Monsoon Night — Los Angeles'}).getByTestId("book-now-btn").click();
    await page.waitForLoadState('networkidle');
    await page.locator("div [class*='flex items-star']").first().waitFor();
    await expect(page.getByText("Hollywood Monsoon Night — Los Angeles").isVisible()).toBeTruthy();
    await expect(page.getByTestId("ticket-count")).toHaveText("1");
    await page.getByTestId("customerName").fill("Abhishek Tyagi");
    await page.getByTestId("customer-email").fill("tyagi.b345@gmail.com");
    await page.getByRole("textbox", {name : "Phone Number"}).fill("9267949438");
    await console.log(getByText('Total$'));
    await page.getByRole("button", {name: "Confirm Booking"}).click();
    await page.waitForLoadState('networkidle');
    const bookingRef = page.locator("span [class*='booking-ref']").textContent();
    console.log(page.locator("div h3").first().textContent());
    await page.getByRole("button", {name: "View My Bookings"}).click();
    const bookingId = await page.getByTestId("booking-id").textContent();
    await page.getByRole("button", {name: "View Details"}).click();
    await page.waitForLoadState('networkidle');
    await page.locator("div h2").getByTestId("check-refund-btn").waitFor();
    await expect(page.getByText('#').textContent()).toHaveText(bookingId);
    await page.getByTestId("check-refund-btn").click();
    await page.getByTestId("refund-result").waitFor();
    console.log(page.getByTestId("refund-result").textContent());
    // await expect(page.getByText('Eligible for refund. Single-')).toBeVisible();



})