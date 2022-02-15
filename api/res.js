const chromium = require("chrome-aws-lambda");
const playwright = require("playwright-core");
module.exports = async (req, res) => {
  if (req.query.url) {
    (async () => {
      const path = await chromium.executablePath;
      const browser = await playwright.chromium.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
      });
      const context = await browser.newContext({
        viewport: {
          width: 700,
          height: 401,
        },
      });
      const page = await context.newPage();
      await page.goto(decodeURIComponent(req.query.url));
      page.on("domcontentloaded", async () => {
        setTimeout(async () => {
          const buffer = await page.screenshot({
            fullPage: true,
            type: "jpeg",
          });
          res.setHeader("Content-Type", "text/plain");
          res.setHeader(
            "Cache-Control",
            "s-maxage=86400, stale-while-revalidate"
          );
          res
            .status(200)
            .send(`data:image/jpeg;base64,${buffer.toString("base64")}`);
          await browser.close();
        }, 1500);
      });
    })();
  } else {
    res.status(400).send(400);
  }
};
