class dashboard{
    constructor(page,pageUrl,selectItem)
    {
        this.page = page;
        this.pageUrl = pageUrl;
        this.selectItem = selectItem;
    }

    async selectItem()
    {
        await this.page.goto(this.pageUrl);
        await this.page.locator("div .card-body").filter({hasText: this.selectItem}).getByRole('button', {name: 'Add To Cart'}).click();
        await this.page.getByRole('button', {name: 'Cart'}).waitFor();
    }

    async cartCheck()
    {
        await this.page.goto(this.pageUrl);
        await this.page.getByRole('button', {name: 'Cart'}).click();
        let cartItem = this.page.getByRole('heading', { name: 'ZARA COAT' }).textContent();
        return cartItem;
        await this.page.getByRole('button', {name: 'Checkout'}).click();

    }
    

}

module.exports = {dashboard};