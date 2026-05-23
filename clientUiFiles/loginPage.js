class loginPage{
    constructor(page,email,password,pageUrl)
    {
        this.page = page;
        this.pageUrl = pageUrl;
        this.email = email;
        this.password = password;
    }

    async loginOpe(){
        await this.page.goto(this.pageUrl);
        await this.page.locator("#userEmail").fill(this.email);
        await this.page.locator("userPassword").fill(this.password);
        await this.page.locator("#login").click();
    
        
    }

}

module.exports = {loginPage};