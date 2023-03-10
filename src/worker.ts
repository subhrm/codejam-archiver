import puppeteer, { ElementHandle, NodeFor } from "puppeteer";
import fs from "fs";

const URL = "https://codingcompetitions.withgoogle.com/codejam/archive/"

export async function run(destination:string="archive") {
    console.info("Strating process ");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);
    await page.waitForNetworkIdle();
    let _= page.waitForSelector(".card-body");
    const allYears:Array<ElementHandle> = await page.$$(".card-body");
    const numOfYears=allYears.length;
    console.log("Number of years : ", numOfYears);

    // To get arround "Error: Node is detached from document" issue 
    for (let i=0; i<numOfYears; i++){
        let _= page.waitForSelector(".card-body");
        const card = await (await page.$$(".card-body")).at(i);
        console.log("card : ", card)
        await card?.click();
        await page.waitForNetworkIdle();
        const h = await page.waitForSelector(".headline-2");
        const value = await h?.evaluate(el => el.textContent);
        console.log("Header", value);
        await page.goBack();
        await page.waitForNetworkIdle();
    }
    browser.close();
}

async function process_year(year_url:string){

}

async function process_event(event_url:string){

}

async function process_problem(problem_url:string){

}