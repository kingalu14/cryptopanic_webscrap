const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

//const apiUrl = 'https://cryptopanic.com/news/8626791/Bitcoin-has-a-future-say-two-thirds-of-Europeans';

   const getPostDetail=async (apiUrl) => {
            try {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto(apiUrl);
                await page.waitForSelector('.app-layout');
            
                const body = await page.evaluate(() => {
                    return document.querySelector('#detail_pane').innerHTML;
                });
            
                const $ = cheerio.load(body)
                descr=$('.description-body p').html();
                await browser.close();
                return descr;

            } 
            catch (error) {
                console.log(error);
            }
     } 

     module.exports=getPostDetail;