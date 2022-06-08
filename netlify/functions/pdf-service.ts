
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

   await page.setContent(`<body>
 <h1>An example static HTML to PDF</h1>
 </body>`)
  const pdf = await page.pdf({ format: 'A4' })

    await page.close()
    console.timeEnd('pdf-service');



    console.time("stringify")
    
    const data = pdf.toString('base64')
    const body = JSON.stringify({
          status: 'Ok',
          data
    })

    console.timeEnd("stringify")


    return {
      
    statusCode: 200,
      body
  };
} 