import { Browser, PuppeteerNode } from "puppeteer-core";


const chromium = require('chrome-aws-lambda');
const puppeteer : PuppeteerNode  = require('puppeteer-core');

exports.handler = async function (event, context) {
    console.time('pdf-service');
  const browser : Browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath,
    headless: true,

  });

  const page = await browser.newPage();

  await page.goto('https://www.madewithsupabase.com/', { waitUntil: 'load' })
   
  const pdf = await page.pdf({
    format: 'a4',
    printBackground: true,
    margin:{
      top: '1cm',
      right: '1cm',
      bottom: '1cm',
      left: '1cm'
    },
  })

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