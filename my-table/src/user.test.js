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
    const links = await page.$$eval('a', links => links.map(item => item.id));
    // console.log(links)
    // const html = await page.$eval('a', target => target.innerHTML)
    expect(links.includes('prog-languages')).toBe(true)
  }, 15000)

  test('main logo has found on page /table', async () => {
    await page.goto('http://localhost:3000')
    await page.click('a#prog-languages')
    const html = await page.$eval('.App > a#prog-languages', target => target.innerHTML)
    expect(html).toBe('Языкы программирования')
  }, 25000)

  test('form with 4 fields was found on page /table', async () => {
    await page.goto('http://localhost:3000')
    await page.click('#prog-languages')
    const form = await page.$('form')
    const fieldNum = form ? await page.$eval('form', elem => {
      return Array.from(elem.children)
        .map(x => x.className)
        .filter(x => x === 'field').
        length
     }) : null
    expect(form).toBeTruthy()
    expect(fieldNum).toBe(4)

  }, 15000)
})