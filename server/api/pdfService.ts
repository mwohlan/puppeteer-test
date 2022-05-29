import chromium from 'chrome-aws-lambda'

let browser
export default defineEventHandler(async () => {
  console.time('puppeteer')
  if (!browser)
    browser = await launchBrowser()

  const page = await browser.newPage()
  await page.goto('https://timelino.vercel.app/', { waitUntil: 'load' })
  const pdf = await page.pdf({ format: 'A4' })

  await page.close()

  console.timeEnd('puppeteer')
  return pdf
})

async function launchBrowser() {
  return await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  })
}
