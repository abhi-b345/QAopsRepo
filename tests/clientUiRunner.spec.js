const { expect, test } = require('@playwright/test');
const { loginPage } = require('../clientUiFiles/loginPage');
const { dashboard } = require('../clientUiFiles/dashboard');
const { checkoutPage } = require('../clientUiFiles/checkoutPage');
const { orderPlace } = require('../clientUiFiles/orderPlace');

const dataSet = JSON.parse(
    JSON.stringify(require('../utils/uiAppData.json'))
);

for (const data of dataSet) {

    test(`test to validate client order ${data.selectItem}`, async ({ page }) => {

        const pageUrl = "https://rahulshettyacademy.com/client/#/auth/login";

        const loginPageOperation = new loginPage(
            page,
            data.email,
            data.password,
            pageUrl
        );

        await loginPageOperation.loginOpe();
        await page.waitForLoadState('networkidle');

        const dashboardSelectItem = new dashboard(
            page,
            pageUrl,
            data.selectItem
        );

        await dashboardSelectItem.selectItem();

        const cartItem = await dashboardSelectItem.cartCheck();

        await expect(cartItem).toContain(data.selectItem);

        const checkoutLogic = new checkoutPage(
            page,
            pageUrl,
            data.email
        );

        await checkoutLogic.checkout();

        const placeOrderLogic = new orderPlace(
            page,
            pageUrl,
            data.selectItem
        );

        await placeOrderLogic.placeOrder();
    });
}