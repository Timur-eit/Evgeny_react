const puppeteer = require('puppeteer')

const mode = {
  headless: false,
  slowMo: 250,
  devtools: true
}

describe("smoke tests", () => {

  let browser
  let page

  beforeAll( async () => {
    browser = await puppeteer.launch(mode)
    page = await browser.newPage()

    await page.emulate({
      viewport: {
        width: 1280,
        height: 1024
      },
      userAgent: ''
    })
  })

  afterAll( async () => {
    await browser.disconnect()
    await browser.close()
  })

  test('main logo has found', async () => {
    await page.goto('http://localhost:3000/')
    const html = await page.$eval('.App > a', target => target.innerHTML)
    await expect(html).toBe('Языкы программирования')
  }, 15000)

  test('main logo has found on page /table', async () => {
    await page.goto('http://localhost:3000')
    await page.click('.App > a')
    const html = await page.$eval('.App > a', target => target.innerHTML)
    await expect(html).toBe('Языкы программирования')
  }, 25000)
})