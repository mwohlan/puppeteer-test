import puppeteer from 'puppeteer'

let browser: puppeteer.Browser

export default defineEventHandler(async () => {
  console.time('puppeteer')

  const browser = await launchBrowser()

  const page = await browser.newPage()
  await page.goto('https://timelino.vercel.app/', { waitUntil: 'load' })
  const pdf = await page.pdf({ format: 'A4' })

  await page.close()

  console.timeEnd('puppeteer')
  return pdf
})

async function launchBrowser() {
  return await puppeteer.launch({ headless: true })
}
