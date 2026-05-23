const {test, expect} = require('@playwright/test');
const{excel} = require('../javaScripts/excelManu');

test("upload download excel validation", async({page})=>
{
    const filePath = 'C:/Users/Tyagi/Downloads/exceldownloadTest.xlsx';
    const textSearch = 'Mango';
    const replaceText = 'Iphone';
    const output = {row:-1,column:-1};
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole("button", {name: "Download"}).click();
    const download = await downloadPromise;
    const fileHandling = new excel(filePath,textSearch,replaceText,output);
    await fileHandling.writeExcel();
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:/Users/Tyagi/Downloads/exceldownloadTest.xlsx");



})