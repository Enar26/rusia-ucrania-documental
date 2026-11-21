/* Uso: node tools/revisar.cjs URL directorio-capturas HTML-autonomo
   Requiere playwright y Chromium. BROWSER_PATH permite seleccionar otro ejecutable. */
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const path = require("node:path");
const fs = require("node:fs");
const [base, output, standalone] = process.argv.slice(2);
const states = [
  [0, 0],
  [1, 3],
  [2, 0],
  [3, 3],
  [4, 1],
  [5, 2],
  [6, 1],
];
const shots = [
  "portada",
  "perspectivas",
  "capitulo",
  "geografia",
  "rus",
  "imperios",
  "sovietica",
];
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.BROWSER_PATH || "/usr/bin/chromium",
  });
  try {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const failed = [],
      errors = [],
      external = [];
    await ctx.route(/^https?:/, (route) => {
      if (new URL(route.request().url()).origin !== new URL(base).origin) {
        external.push(route.request().url());
        return route.abort();
      }
      return route.continue();
    });
    const pg = await ctx.newPage();
    pg.on("pageerror", (err) => errors.push(err.message));
    pg.on("response", (r) => {
      if (r.status() >= 400) failed.push(r.status() + " " + r.url());
    });
    await pg.goto(base);
    await pg.evaluate(() => document.fonts.ready);
    const state = () =>
      pg
        .locator("#stage section:not([data-salida])")
        .evaluate((el) => [el.dataset.escena, +el.dataset.paso]);
    const go = async (i) => {
      await pg.locator("[data-panel=indice]").click();
      await pg.locator('[data-ir="' + i + '"]').click();
    };
    const key = (k) => pg.keyboard.press(k);
    // Todos los estados deben renderizarse igual al volver, incluidos texto y recursos.
    const trace = [];
    while (true) {
      const st = await state();
      trace.push(st);
      await pg.locator("#stage img").evaluateAll(async (imgs) => {
        await Promise.all(imgs.map((img) => img.decode()));
      });
      if (await pg.locator("#next").isDisabled()) break;
      await key("PageDown");
      assert.ok(trace.length < 80);
    }
    for (const expected of trace.slice(0, -1).reverse()) {
      await key("PageUp");
      assert.deepEqual(await state(), expected);
    }
    assert.ok(await pg.locator("#prev").isDisabled());
    await pg.locator("#stage").click();
    await pg.keyboard.down("ArrowRight");
    await pg.keyboard.down("ArrowRight");
    await pg.keyboard.up("ArrowRight");
    assert.deepEqual(await state(), ["perspectivas", 1]);
    await pg.locator("#prev").focus();
    await key("Enter");
    assert.deepEqual(await state(), ["perspectivas", 0]);
    await pg.locator("[data-panel=notas]").click();
    await key("ArrowRight");
    assert.deepEqual(await state(), ["perspectivas", 0]);
    await key("Escape");
    await pg.locator("#stage").click();
    await pg.locator("#stage").click();
    await pg.locator("#stage").click();
    await pg.emulateMedia({ reducedMotion: "no-preference" });
    await key("PageDown");
    await key("PageUp");
    await pg.waitForTimeout(2200);
    assert.deepEqual(await state(), ["perspectivas", 3]);
    assert.equal(await pg.locator(".flight").count(), 0);
    await go(3);
    await key("ArrowRight");
    await key("p");
    assert.ok(await pg.locator(".geo-window").evaluate(el =>
      el.getAnimations({subtree:true}).some(animation=>animation.playState==="paused")));
    await key("p");
    await key("ArrowLeft");
    await pg.waitForTimeout(1000);
    assert.deepEqual(await state(), ["geografia", 0]);
    assert.equal(await pg.locator(".superpuesta").count(), 0);
    await key("f");
    await pg.waitForFunction(() => !!document.fullscreenElement);
    assert.ok(await pg.locator("#next").isVisible());
    await key("h");
    assert.ok(await pg.locator("#restore").isVisible());
    await pg.locator("#restore").click();
    await key("f");
    await pg.emulateMedia({ reducedMotion: "reduce" });
    for (const [width, height] of [
      [1280, 720],
      [1920, 1080],
      [1366, 768],
    ]) {
      await pg.setViewportSize({ width, height });
      let dir = path.join(output, width + "x" + height);
      fs.mkdirSync(dir, { recursive: true });
      for (const [i, n] of states) {
        await go(i);
        for (let k = 0; k < n; k++) await key("PageDown");
        await pg
          .locator("#stage img")
          .evaluateAll((imgs) => Promise.all(imgs.map((img) => img.decode())));
        await pg.mouse.move(1, 1);
        await pg.screenshot({
          path: path.join(dir, i + 1 + "-" + shots[i] + ".jpg"),
          type: "jpeg",
          quality: 85,
        });
      }
    }
    for (const [i, n, title] of [
      [4, 2, "memoria"],
      [5, 3, "crimea-imperial"],
      [6, 0, "telegrama"],
      [6, 2, "deportacion"],
      [6, 3, "transferencia"],
    ]) {
      await go(i);
      for (let k = 0; k < n; k++) await key("PageDown");
      await pg
        .locator("#stage img")
        .evaluateAll((imgs) => Promise.all(imgs.map((img) => img.decode())));
      await pg.screenshot({
        path: path.join(output, "1366x768", title + ".jpg"),
        quality: 85,
      });
    }
    assert.deepEqual(failed, []);
    assert.deepEqual(errors, []);
    assert.deepEqual(external, []);
    console.log(
      trace.length +
        " estados comprobados en ambos sentidos. Tres resoluciones. Sin errores ni solicitudes externas.",
    );
    // Inyectar una ficha de prueba solo en memoria, antes de que se inicie el motor.
    await pg.route("**/app/contenido.js", async (route) => {
      const res = await route.fetch();
      await route.fulfill({
        response: res,
        body:
          (await res.text()) +
          "\ncapitulos[1].escenas.push({id:'prueba',tipo:'quiz',titulo:'Prueba',fuentes:[],preguntas:[{pregunta:'Prueba',opciones:['A','B'],correcta:1,explicacion:'Explicación de prueba',fuente:'Fuente de prueba'}]});",
      });
    });
    await pg.reload();
    await go(new Set(trace.map(([id]) => id)).size);
    await pg.locator('[data-option="1"]').click();
    assert.deepEqual(await state(), ["prueba", 0]);
    assert.equal(
      await pg.getByText("Fuente de prueba", { exact: true }).count(),
      0,
    );
    await pg.locator("[data-reveal]").click();
    assert.deepEqual(await state(), ["prueba", 1]);
    assert.ok(
      await pg.getByText("Fuente de prueba", { exact: true }).isVisible(),
    );
    await key("PageUp");
    assert.equal(
      await pg.locator('[data-option="1"]').getAttribute("aria-pressed"),
      "true",
    );
    console.log(
      "Quiz de prueba en memoria: selección, revelación, fuente y retroceso correctos.",
    );
    await ctx.close();
    const off = await browser.newContext({
      offline: true,
      reducedMotion: "reduce",
    });
    const op = await off.newPage();
    const req = [],
      err = [];
    op.on("request", (r) => {
      if (/^https?:/.test(r.url())) req.push(r.url());
    });
    op.on("pageerror", (e) => err.push(e.message));
    await op.setContent(fs.readFileSync(standalone, "utf8"));
    await op.evaluate(() => document.fonts.ready);
    assert.ok(await op.evaluate(() => [...document.fonts].every(f=>f.status==="loaded")));
    await op.locator("[data-panel=fuentes]").click();
    assert.match(await op.locator("#dialog-body [download]").getAttribute("href"), /^data:text\/csv/);
    await op.keyboard.press("Escape");
    for (const [id, n] of trace) {
      assert.equal(await op.locator(".scene").getAttribute("data-escena"), id);
      assert.equal(
        await op.locator(".scene").getAttribute("data-paso"),
        String(n),
      );
      await op
        .locator(".scene img")
        .evaluateAll((imgs) => Promise.all(imgs.map((img) => img.decode())));
      await op.keyboard.press("PageDown");
    }
    assert.deepEqual(req, []);
    assert.deepEqual(err, []);
    console.log(
      "HTML autónomo: todos los pasos sin red, fuentes e imágenes locales.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
