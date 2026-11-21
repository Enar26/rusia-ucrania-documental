// node tools/revisar-v8.cjs URL HTML-autonomo directorio-capturas
const {chromium} = require("playwright");
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const [base,html,dir] = process.argv.slice(2);
(async()=>{
  const browser=await chromium.launch({executablePath:process.env.BROWSER_PATH || "/usr/bin/chromium"});
  try {
    fs.mkdirSync(dir,{recursive:true});
    const errors=[], states=[];
    for(const offline of [false,true]){
      const ctx=await browser.newContext({offline,reducedMotion:"reduce",viewport:offline?{width:1920,height:1080}:{width:1280,height:720}});
      const p=await ctx.newPage();
      p.on("pageerror",e=>errors.push(e.message));
      p.on("requestfailed",r=>errors.push(r.url().slice(0,100)));
      p.on("request",r=>{if(offline && /^https?:/.test(r.url()))errors.push("Solicitud externa");});
      if(offline)await p.setContent(fs.readFileSync(html,"utf8"));else await p.goto(base);
      await p.evaluate(()=>document.fonts.ready);
      const state=p.locator(".scene:not([data-salida])");
      const pos=()=>state.evaluate(e=>[e.dataset.escena,Number(e.dataset.paso)]);
      const key=k=>p.keyboard.press(k);
      const trace=[];
      while(true){
        const [id,step]=await pos();trace.push([id,step]);assert.ok(trace.length<100);
        await state.locator("img").evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));
        const bounds=await state.evaluate(el=>{
          const b=el.getBoundingClientRect();
          return Array.from(el.querySelectorAll("h2,p,.options button,.caption")).filter(n=>{const r=n.getBoundingClientRect();return r.bottom>b.bottom+2||r.right>b.right+2}).map(n=>n.innerText);
        });
        assert.deepEqual(bounds,[],id+" "+step);
        if(!offline && [["maidan",0],["mar-negro",2],["sintesis",2]].some(([a,b])=>a===id&&b===step))await p.screenshot({path:path.join(dir,id+".jpg"),quality:88});
        if(step===0){
          for(const panel of ["notas","fuentes"]){await p.locator("[data-panel="+panel+"]").click();assert.ok((await p.locator("#dialog-body").innerText()).length>20);await key("Escape");}
        }
        if(id==="quiz-historia" && step%2===0){
          const choice=state.locator("[data-option]").nth(step/2);
          assert.equal(await state.locator("p").count(),0);
          await choice.click();assert.deepEqual(await pos(),[id,step]);await state.locator("[data-reveal]").click();
          assert.ok(await state.locator("p").isVisible());continue;
        }
        if(await p.locator("#next").isDisabled())break;
        if(id==="portada")await p.locator("#stage").click();else await key("PageDown");
      }
      assert.deepEqual(trace.at(-1),["portada-economia",0]);
      assert.equal(trace.filter(([id])=>id==="quiz-historia").length,6);
      assert.deepEqual([...new Set(trace.map(s=>s[0]))].slice(-4),["quiz-historia","conclusion","regreso","portada-economia"]);
      for(const expected of trace.slice(0,-1).reverse()){await key("PageUp");assert.deepEqual(await pos(),expected);}
      if(offline)assert.deepEqual(trace,states);
      else{
        states.push(...trace);
        await key("f");await p.waitForFunction(()=>!!document.fullscreenElement);await key("f");
        await p.goto(base+"/#conclusion");await p.emulateMedia({reducedMotion:"no-preference"});
        await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
        for(const id of ["regreso","portada-economia"]){
          await key("ArrowRight");assert.equal((await pos())[0],id);
          await p.locator(".flight").waitFor();await key("p");assert.ok(await p.locator(".flight").evaluate(e=>e.getAnimations()[0].playState==="paused"));await key("p");await p.locator(".flight").waitFor({state:"detached"});
        }
        await key("ArrowLeft");await key("ArrowRight");await p.waitForTimeout(2200);assert.equal(await p.locator("[data-salida]").count(),0);
        await p.goto(base+"/#elecciones");await p.keyboard.down("ArrowRight");await p.keyboard.down("ArrowRight");await p.keyboard.up("ArrowRight");assert.deepEqual(await pos(),["elecciones",1]);
      }
      await ctx.close();
    }
    assert.deepEqual(errors,[]);
    console.log(new Set(states.map(s=>s[0])).size+" escenas, "+states.length+" pasos. Ida y vuelta en web y HTML sin conexión. Quiz y dos transiciones comprobados.");
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
