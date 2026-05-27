const { expect, test } = require('@playwright/test');
const { loginPage } = require('../clientUiFiles/loginPage');
const { dashboard } = require('../clientUiFiles/dashboard');
const { checkoutPage } = require('../clientUiFiles/checkoutPage');
const { orderPlace } = require('../clientUiFiles/orderPlace');

test("test to validate client order", async ({ page }) => {
    const email = "tyagi.b345@gmail.com";
    const password = "Abhishek@123";
    const selectItem = "ZARA COAT 3";
    const pageUrl = "https://rahulshettyacademy.com/client/#/auth/login";
    const loginPageOperation = new loginPage(page, email, password, pageUrl);
    await loginPageOperation.loginOpe();
    await page.waitForLoadState('networkidle');

    const dashboardSelectItem = new dashboard(page, pageUrl, selectItem);
    await dashboardSelectItem.selectItem();
    const cartItem = await dashboardSelectItem.cartCheck();
    await expect(cartItem).toContain(selectItem);

    const checkoutLogic = new checkoutPage(page, pageUrl, email);
    await checkoutLogic.checkout();

    const placeOrderLogic = new orderPlace(page, pageUrl, selectItem);
    await placeOrderLogic.placeOrder();
});