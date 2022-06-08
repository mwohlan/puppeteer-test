
import { Handler } from '@netlify/functions';
const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

exports.handler = async function(event, context) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath,
    headless: true,
  });

  const page = await browser.newPage();

   await page.goto('https://timelino.vercel.app/', { waitUntil: 'load' })
  const pdf = await page.pdf({ format: 'A4' })

  await page.close()

    return {
      
    statusCode: 200,
      body: JSON.stringify({
          status: 'Ok',
          pdf
      })
  };
} as Handler