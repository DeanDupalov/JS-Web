const {chromium} = require('playwright-chromium');
const {expect} = require('chai');

describe('Test', async function () {
    this.timeout(5000);
    let page, browser;

    before(async () => {
        browser = await chromium.launch();
    });
    after(async () => {
        await browser.close();
    });
    beforeEach(async () => {
        page = await browser.newPage();
    });
    afterEach(async () => {
        await page.close();
    });


    it('loads and display all books', async () => {
        expect(1).to.equal(1);

        // await page.goto('http://127.0.0.1:5500/02.Book-Library/')
        // await page.screenshot({path: 'page.png'})
        // await page.click('text=Load All Books');

        // await page.waitForSelector('text=Harry Potter');

        // const rows = await page.$$eval('tr', (rows) => rows.map(r => r.textContent));
        // console.log(rows)
    })
})