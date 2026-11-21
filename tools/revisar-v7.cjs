/* Uso: node tools/revisar-v7.cjs URL directorio [HTML-autonomo] */
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const [base, output, offlineFile] = process.argv.slice(2);

(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.BROWSER_PATH || "/usr/bin/chromium",
  });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", e => errors.push(e.message));
    const state = () => page.locator(".scene:not([data-salida])");
    const capture = async (dir, name) => {
      await page.evaluate(() => document.fonts.ready);
      await state().locator("img").evaluateAll(imgs => Promise.all(imgs.map(img => img.decode())));
      await page.screenshot({path: path.join(dir, name + ".jpg"), quality: 89});
    };
    for (const [width, height] of [[1920,1080], [1280,720], [1366,768]]) {
      const dir = path.join(output, width + "x" + height);
      fs.mkdirSync(dir, {recursive:true});
      await page.setViewportSize({width,height});
      await page.goto(base + "/#independencia");
      await page.emulateMedia({reducedMotion:"reduce"});
      await capture(dir, "referendum");
      await page.locator("#stage").click();
      assert.equal(await state().getAttribute("data-paso"), "1");
      await capture(dir, "fronteras");
      await page.keyboard.press("Space");
      await capture(dir, "budapest");
      assert.ok(await page.locator("#next").isDisabled());
      await page.locator("[data-panel=notas]").click();
      assert.match(await page.locator("#dialog-body").innerText(), /defensa militar colectiva/);
      await page.keyboard.press("Escape");
      await page.locator("[data-panel=indice]").click();
      await page.locator('a[href="#revision-economia"]').click();
      await page.locator('.scene[data-escena="regreso"]').waitFor();
      await capture(dir, "regreso");
      await page.emulateMedia({reducedMotion:"no-preference"});
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      const rect = await page.locator('[data-shared=comercio]').boundingBox();
      await page.keyboard.press("ArrowRight");
      const flight = page.locator(".flight");
      await flight.waitFor();
      await page.waitForTimeout(430);
      await page.keyboard.press("p");
      const mid = await flight.boundingBox();
      assert.ok(mid, "La fotografía compartida debe seguir visible durante el vuelo");
      assert.ok(mid.width > rect.width && mid.width < (await page.locator("#stage").boundingBox()).width);
      assert.equal(await flight.evaluate(el => el.getAnimations()[0].playState), "paused");
      await capture(dir, "transicion");
      await page.keyboard.press("p");
      await flight.waitFor({state:"detached"});
      await capture(dir, "economia");
      assert.ok(await page.locator("#next").isDisabled());
      await page.keyboard.press("ArrowLeft");
      await page.keyboard.press("ArrowRight");
      await page.keyboard.press("ArrowLeft");
      await flight.waitFor({state:"detached"});
      assert.equal(await state().getAttribute("data-escena"), "regreso");
      assert.equal(await page.locator("[data-salida]").count(), 0);
      await page.emulateMedia({reducedMotion:"reduce"});
      await page.keyboard.press("ArrowRight");
      assert.equal(await flight.count(),0);
      await page.locator("[data-panel=indice]").click();
      await page.locator('a[href="#independencia"]').click();
      await page.locator('.scene[data-escena="independencia"]:not([data-salida])').waitFor();
    }
    if (offlineFile) {
      await page.goto("about:blank");
      await page.context().setOffline(true);
      // Misma distribución autónoma que abre el docente, sin recursos remotos.
      await page.setContent(fs.readFileSync(offlineFile, "utf8"));
      await page.locator("[data-panel=indice]").click();
      await page.locator('a[href="#revision-economia"]').click();
      await page.locator('.scene[data-escena="regreso"]').waitFor();
      await page.keyboard.press("ArrowRight");
      assert.equal(await state().getAttribute("data-escena"), "portada-economia");
      await state().locator("img").evaluate(el => el.decode());
    }
    assert.deepEqual(errors, []);
    console.log("Escena 8 y puente de Economía verificados. Tres tamaños, pausa, reversión, movimiento reducido y fotos locales.");
  } finally { await browser.close(); }
})().catch(e => {console.error(e); process.exitCode = 1;});
