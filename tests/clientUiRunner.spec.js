const {expect,test} = require('@playwright/test');
const {loginPage} = require('../clientUiFiles/loginPage');
const {dashboard} = require('../clientUiFiles/dashboard');
const {checkoutPage} = require('../clientUiFiles/checkoutPage');

test("test to validate client order", async({page})=>
{
    const email = "tyagi.b345@gmail.com";
    const password = "Abhishek@123";
    const selectItem = "ZARA COAT 3";
    const pageUrl = "https://rahulshettyacademy.com/client/#/auth/login";
    const loginPageOperation = new loginPage(page,email,password,pageUrl); //calling
    await loginPageOperation.loginOpe(); //calling
    page.waitForLoadState('networkidle');

    const dashboardSelectItem = new dashboard(page,pageUrl,selectItem); ////calling
    dashboardSelectItem.selectItem(); //calling
    const cartItem =dashboardSelectItem.cartCheck(); ////calling
    await expect(cartItem).toContain(selectItem);

    const checkoutLogic = new checkoutPage(page);
    await checkoutLogic.checkout();

    

})