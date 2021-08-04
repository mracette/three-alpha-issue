const puppeteer = require("puppeteer");

const URL = "http://localhost:8080";

const launch = async () => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-gpu",
      "--swiftshader",
      "--webgl-antialiasing-mode",
      "implicit",
    ],
    defaultViewport: {
      width: 520,
      height: 520,
    },
    headless: false,
    devtools: false,
  });

  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: "networkidle0", timeout: 0 });
};

launch();
