import puppetteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000); // default puppeteer timeout

describe("popover validator", () => {
    let browser = null;
    let page = null;
    let server = null;
    const baseUrl = "http://localhost:9000";

    beforeAll(async () => {
        server = fork(`${__dirname}/e2e.server.js`);
        await new Promise((resolve, reject) => {
            server.on("error", reject);
            server.on("message", (message) => {
                if (message === "ok") {
                    resolve();
                }
            });
        });

        browser = await puppetteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            // headless: false, // show gui
            // slowMo: 250,
            // devtools: true, // show devTools
        });
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
        server.kill();
    });

    test("should add do something", async () => {
        await page.goto(baseUrl);
        const button = await page.$(".add-popover");
        await button.click();
        let popover = await page.$(".popover");
        expect(popover).not.toBeNull();
        expect(
            await popover.$eval(
                ".popover-header",
                (el) => el.textContent === "Popover title",
            ),
        ).toBeTruthy();
        expect(
            await popover.$eval(
                ".popover-body",
                (el) =>
                    el.textContent ===
                    "And here's some amazing content. It's very engaging. Right?",
            ),
        ).toBeTruthy();
    });
});
