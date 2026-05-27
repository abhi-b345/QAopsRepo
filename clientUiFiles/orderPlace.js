class orderPlace{
    constructor(page, pageUrl, selectItem)
        {
            this.page = page;
            this.pageUrl = pageUrl;
            this.selectItem = selectItem;

        }
        async placeOrder(){
            await this.page.goto(this.pageUrl);
            await this.page.locator(".box").nth(0).waitFor();
            const orderNumber = await this.page.locator(".em-spacer-1 .ng-star-inserted").textContent();
            console.log(orderNumber);
            await expect(this.page.locator(".title")).toContainText(this.selectItem);
            console.log(await this.page.locator(".hero-primary").textContent());
            await expect(this.page.locator(".hero-primary")).toContainText(" Thankyou for the order. ");
            await this.page.getByRole('button', { name: 'Sign Out' }).click();


        
        }

}
module.exports = {orderPlace};