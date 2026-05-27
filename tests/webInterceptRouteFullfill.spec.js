const {test, expect, request} = require("@playwright/test");
const loginPayLoad = {userEmail:"tyagi.b345@gmail.com",userPassword:"Abhishek@123"};
let token;

test.beforeAll(async()=>
{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: loginPayLoad,
        headers:{
            'content-type' : "application/json"
        },
    });
    const loginResponseJson = await loginResponse.json();
     token= loginResponseJson.token;

});

const fakePayloadOrder = {id: "6a0393e2965c23b43b144d11"};

test('intercept/mocking of API with route.fulfill()', async ({page})=>
{
    await page.addInitScript(value =>
    {
        window.localStorage.setItem('token', value);
    }, token);
    
    await page.goto("https://rahulshettyacademy.com/api/ecom/order/orders");
    await page.getByRole("button", {name: "ORDERS"}).click();
    
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", async route =>
    {
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayloadOrder);

        await route.fulfill(
            {
                response,
                body,
            }
        );
    });
    
    await page.getByRole("button", {name: "View"}).first().click();
});

test.only('intercept with abort method', async({page})=>
{
    await page.addInitScript(value=>
    {
        window.localStorage.setItem('token', value);
    }, token);

    await page.route('**/*.css', route => route.abort());

    page.on('request', request =>
    {
        console.log(request.url());
    });

    page.on('response', response =>
    {
        console.log(response.url(), response.status());
    });

    await page.goto("https://rahulshettyacademy.com/client");
});