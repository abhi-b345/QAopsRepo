class checkoutPage {
    constructor(page, pageUrl, email) {
        this.page = page;
        this.pageUrl = pageUrl;
        this.email = email;
    }
    async checkout() {
        await this.page.goto(this);
        await this.page.getByRole('textbox').nth(1).fill('221');
        await this.page.getByRole('textbox').nth(1).fill('Abhishek');
        await this.page.locator("[name*='coupon']").fill("rahulcoupon");
        await this.page.locator("[class*='input ddl']").first().selectOption("01");
        await this.page.locator("[class*='input ddl']").nth(1).selectOption("11");
        await this.page.getByRole('button', { name: 'Apply Coupon' }).click();
        const dropdown = await this.page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
        await dropdown.waitFor();
        const count = await dropdown.locator("[type*='button']").count();
        for (let i = 0; i < count; i++) {
            const text = await dropdown.locator("[type*='button']").nth(i).textContent();
            if (text === " India") {
                await text.click();
                break;
            }
        }
        await expect(this.page.getByRole('textbox').nth(4)).toHaveValue(this.email);
        await this.page.getByText('Place Order').click();

    }

}
module.exports = { checkoutPage };