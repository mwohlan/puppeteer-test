
const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

exports.handler = async function (event, context) {
    console.time('pdf-service');
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath,
    headless: true,
  });

  const page = await browser.newPage();

   await page.goto('https://timelino.vercel.app/', { waitUntil: 'load' })
  const pdf = await page.pdf({ format: 'A4' })

    await page.close()
    console.timeEnd('pdf-service');



    console.time("stringify")

    const body = JSON.stringify({
          status: 'Ok',
          pdf
    })

    console.timeEnd("stringify")


    return {
      
    statusCode: 200,
      body
  };
} 