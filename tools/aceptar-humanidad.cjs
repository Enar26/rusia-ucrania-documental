// node tools/aceptar-humanidad.cjs URL HTML_EXTRAIDO DIRECTORIO [web|offline|filmar|todo]
// En las instalaciones Playwright sin Chromium empaquetado puede usarse BROWSER_PATH.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { pathToFileURL } = require('node:url');
const { createHash } = require('node:crypto');
const { execFileSync } = require('node:child_process');

const [url, archivo, salida, modo = 'todo'] = process.argv.slice(2);
const historial = [1,5,1,2,3,3,2,3,3,2,3,3,2,4,3,3,3,3,6,4,6,3,2,1];
const economico = [2,2,3,2,3,2,2,3,3,2];
const humanitario = [2,3,2,2,3,2,2,2,6,3];
function serie(prefijo, cantidades, letraA) {
  return cantidades.flatMap((n, escena) => Array.from({length:n}, (_,i) =>
    prefijo + String(escena+1).padStart(2,'0') + String.fromCharCode(letraA.charCodeAt(0)+i)));
}
const cierreEco = ['EQ1A','EQ1B','EQ2A','EQ2B','EQ3A','EQ3B','EC1','EC2','EC3'];
const humanidad = serie('H',humanitario,'A');
const ruta = [...serie('',historial,'a'), ...serie('E',economico,'A'), ...cierreEco, 'III', ...humanidad];
const incorporados = [...cierreEco, ...humanidad];
const ult = ruta.at(-1);
const cuadro = p => p.locator('.cuadro:not(.sale)');
const estado = p => cuadro(p).getAttribute('data-id');
const guardar = (nombre, datos) => fs.writeFileSync(path.join(salida,nombre),JSON.stringify(datos,null,2)+'\n');
const esperarFuentes = p => p.evaluate(async () => { await document.fonts.ready; });
const vigente = p => cuadro(p).evaluate(async e => {
  await Promise.all([...e.querySelectorAll('img')].map(i => i.decode()));
  return e.textContent.trim().length > 0;
});
const nucleo = p => cuadro(p).evaluate(e => e.innerText);
function vigilar(p, errores) {
  p.on('pageerror', e => errores.push(e.message));
  p.on('response', r => { if(r.status() >= 400) errores.push(r.status()+' '+r.url().slice(0,150)); });
  p.on('requestfailed', r => {
    if(r.failure()?.errorText !== 'net::ERR_ABORTED') errores.push(r.method()+' '+r.url().slice(0,150)+' '+r.failure()?.errorText);
  });
}
async function avanzar(p, i, mixto) {
  if(!mixto) { await p.keyboard.press('ArrowRight'); return; }
  switch(i % 4) {
    case 0: await p.locator('#siguiente').click(); break;
    case 1:
      await p.waitForTimeout(220); // El motor ignora el segundo clic de un doble clic.
      await p.locator('#lienzo').click({position:{x:14,y:12}});
      break;
    case 2: await p.locator('#lienzo').focus(); await p.keyboard.press('Space'); break;
    case 3: await p.keyboard.press('PageDown'); break;
  }
}
async function comprobarQuiz(p, id, seleccionar) {
  const pregunta = /^21[ace]$|^EQ[123]A$|^H09[ACE]$/.test(id);
  const respuesta = /^21[bdf]$|^EQ[123]B$|^H09[BDF]$/.test(id);
  if(!(pregunta || respuesta)) return;
  const explicacion = cuadro(p).locator('.explica,.consulta-explicacion');
  assert.equal(await explicacion.count(),respuesta?1:0, id+' revelación');
  if(respuesta) {
    assert.ok((await explicacion.innerText()).trim().length>12,id+' explicación vacía');
    assert.equal(await cuadro(p).locator('.correcta').count(),1,id+' opción correcta');
  }
  if(pregunta && !id.startsWith('21') && seleccionar) {
    const opciones = cuadro(p).locator('button[aria-pressed]');
    assert.ok(await opciones.count() >= 2,id+' alternativas');
    const opcion = opciones.nth(1);
    await opcion.click();
    assert.equal(await estado(p),id,id+' clic en respuesta avanzó');
    assert.equal(await opcion.getAttribute('aria-pressed'),'true');
    assert.equal(await explicacion.count(),0,id+' respuesta revelada al votar');
    await opciones.first().focus(); await p.keyboard.press('Space');
    assert.equal(await estado(p),id,id+' elegir con teclado avanzó');
    assert.equal(await opciones.first().getAttribute('aria-pressed'),'true');
  }
}
async function recorrido(p, mixto) {
  for(let i=0;i<ruta.length;i++) {
    const id=ruta[i];
    assert.equal(await estado(p),id,'ida a '+id);
    assert.ok(await vigente(p),id+' vacío');
    await comprobarQuiz(p,id,mixto);
    if(i+1<ruta.length) await avanzar(p,i,mixto);
  }
  const cierre=await nucleo(p);
  assert.match(cierre,/Muchas gracias por su atención/i);
  assert.ok(await p.locator('#siguiente').isDisabled());
  await p.keyboard.press('ArrowRight');
  await p.waitForTimeout(1000);
  assert.equal(await estado(p),ult);
  for(const id of ruta.slice(0,-1).reverse()) {
    await p.keyboard.press(mixto?'PageUp':'ArrowLeft');
    assert.equal(await estado(p),id,'retroceso a '+id);
    await comprobarQuiz(p,id,false);
    if(mixto && /^EQ[123]A$|^H09[ACE]$/.test(id)) {
      assert.equal(await cuadro(p).locator('button[aria-pressed]').first().getAttribute('aria-pressed'),'true',id+' pérdida del voto al retroceder');
    }
  }
  assert.ok(await p.locator('#anterior').isDisabled());
}
async function medir(p) {
  return cuadro(p).evaluate(el=>{
    const rect = el.getBoundingClientRect(), pie=document.querySelector('footer').getBoundingClientRect();
    const sobrepasa=[];
    const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
    while(walker.nextNode()) {
      const node=walker.currentNode, contenido=node.textContent.trim();
      if(!contenido || !node.parentElement || node.parentElement.closest('svg,script,style,[aria-hidden=true],.sr-only')) continue;
      const rango=document.createRange();rango.selectNodeContents(node);
      const css=getComputedStyle(node.parentElement);
      if(css.display==='none'||css.visibility==='hidden')continue;
      for(const r of rango.getClientRects()){
        if(r.width<1||r.height<1)continue;
        if(r.left<rect.left-2 || r.top<rect.top-2 || r.right>rect.right+2 || r.bottom>pie.top+2) {
          sobrepasa.push(contenido.slice(0,84));break;
        }
      }
    }
    return {ancho:Math.round(rect.width),alto:Math.round(rect.height),recortes:[...new Set(sobrepasa)],
      fotos:[...el.querySelectorAll('img[data-medio]')].map(i=>({id:i.dataset.medio,ancho:i.naturalWidth,alto:i.naturalHeight})),
      lienzos:el.querySelectorAll('canvas').length};
  });
}
async function captura(p,carpeta,id) {
  const dir=path.join(salida,carpeta);fs.mkdirSync(dir,{recursive:true});
  await p.screenshot({path:path.join(dir,id+'.jpg'),quality:85});
}
async function composicion(b) {
  const matriz=[],fichas=[],errores=[];
  for(const [width,height] of [[1280,720],[1920,1080],[1024,768]]) {
    const c=await b.newContext({viewport:{width,height},reducedMotion:'reduce'});
    const p=await c.newPage();vigilar(p,errores);
    await p.goto(url+'#ver/E10B');await esperarFuentes(p);
    const muestras=new Set(['EQ2B','EC3','III','H01A','H02C','H03B','H04B','H05C','H06A','H07B','H08B','H09D','H10C']);
    for(const id of [...cierreEco,'III',...humanidad]) {
      await p.keyboard.press('ArrowRight'); assert.equal(await estado(p),id);
      assert.ok(await vigente(p));
      const medida=await medir(p);
      assert.ok(Math.abs(medida.ancho/medida.alto-16/9)<.003);
      matriz.push({id,width,height,...medida});
      if(width===1280||muestras.has(id)) await captura(p,width+'x'+height,id);
      if(width===1280) {
        await p.locator('#fuentes').click();
        assert.equal(await p.locator('#seleccion').inputValue(),id);
        const refs=await p.locator('#lista-fuentes article a').evaluateAll(ns=>ns.map(n=>({titulo:n.textContent,url:n.href})));
        const detalle=await p.locator('#lista-fuentes').innerText();
        assert.ok(refs.length>0 && !/\b(undefined|null)\b/.test(detalle),id+' fichas');
        fichas.push({id,referencias:refs.length,fichas:detalle});
        await p.keyboard.press('ArrowRight');assert.equal(await estado(p),id);
        await p.keyboard.press('Escape');assert.ok(!await p.locator('#archivo').isVisible());
      }
    }
    await c.close();
  }
  guardar('composicion.json',matriz);guardar('fichas-por-estado.json',fichas);
  assert.deepEqual(errores,[]);
  assert.deepEqual(matriz.filter(m=>m.recortes.length).map(({id,width,recortes})=>({id,width,recortes})),[]);
}
async function web(b) {
  const ctx=await b.newContext({viewport:{width:1280,height:720},reducedMotion:'reduce'});
  const p=await ctx.newPage(),errores=[];vigilar(p,errores);
  await p.goto(url);await esperarFuentes(p);
  await p.locator('#biblioteca').click();assert.equal(await p.locator('#seleccion').inputValue(),'portal');
  assert.ok((await p.locator('#lista-fuentes article a').count())>0);
  await p.keyboard.press('Escape');await p.locator('#presentar').click();
  assert.ok(await p.evaluate(()=>!!document.fullscreenElement));
  await p.keyboard.press('Escape');assert.equal(await estado(p),'01a');
  await recorrido(p,true);
  await p.keyboard.down('ArrowRight');const uno=await estado(p);
  await p.keyboard.down('ArrowRight');await p.keyboard.up('ArrowRight');assert.equal(await estado(p),uno);
  await p.reload();assert.equal(await estado(p),uno);
  await p.locator('#volver').click();assert.ok(await p.locator('#presentar').isVisible());
  await p.locator('#reanudar').click();assert.equal(await estado(p),uno);
  await ctx.close();assert.deepEqual(errores,[]);
  await composicion(b);
  guardar('navegacion.json',{resultado:'PASS',navegador:b.version(),estados:ruta,total:ruta.length,
    comprobaciones:['Ida completa por clic, flechas de pantalla, espacio y Av Pág','Retroceso completo por Re Pág',
    'Nueve preguntas y nueve respuestas por separado','Seis preguntas nuevas con selección por clic y teclado sin avance',
    'Cierre estable y límites','Fuentes por paso y foco de diálogo','Pantalla completa, Esc, regreso al portal, recarga y reanudación',
    'Tecla sostenida','Sin errores JavaScript ni recursos ausentes'],errores});
}
async function offline(b) {
  const ctx=await b.newContext({offline:true,reducedMotion:'no-preference'});
  const p=await ctx.newPage(),solicitudes=[],errores=[];
  vigilar(p,errores);
  p.on('request',r=>{if(/^https?:/.test(r.url())) solicitudes.push(r.url());});
  const local=pathToFileURL(path.resolve(archivo)).href;
  const bytes=fs.readFileSync(archivo);
  let metodo='file://',limitacion=null;
  const probe=await ctx.newPage();
  try {
    await probe.goto(local);
    assert.equal(await probe.title(),'Rusia y Ucrania · Documental');
  } catch(e) {
    limitacion=e.message.split('\n')[0];
    metodo='HTML extraído del ZIP, cargado en un documento en memoria sin red';
  } finally {await probe.close();}
  if(limitacion) await p.setContent(bytes.toString('utf8'),{waitUntil:'load'});
  else await p.goto(local);
  await p.waitForFunction(()=>document.querySelector('video')?.currentTime>.3);
  const metraje=await p.locator('video').evaluate(v=>({ancho:v.videoWidth,alto:v.videoHeight,segundos:v.duration,bucle:v.loop}));
  assert.ok(metraje.bucle && metraje.ancho>0 && metraje.segundos>=7.95 && metraje.segundos<12.1);
  await esperarFuentes(p);
  assert.ok(await p.evaluate(()=>document.fonts.check('16px Cuaderno')&&document.fonts.check('16px Lectura')));
  await p.emulateMedia({reducedMotion:'reduce'});await p.locator('#presentar').click();
  await recorrido(p,false);
  await ctx.close();assert.deepEqual(errores,[]);assert.deepEqual(solicitudes,[]);
  guardar('offline.json',{resultado:'PASS',metodo,aperturaDirecta:limitacion||'Probada con Chromium',sha256:createHash('sha256').update(bytes).digest('hex'),
    bytes:bytes.length,metraje,ida:ruta.length,retroceso:ruta.length,solicitudesHttp:solicitudes,errores});
}
async function filmar(b,nombre,id,accion) {
  const ctx=await b.newContext({viewport:{width:1280,height:720},reducedMotion:'no-preference',
    recordVideo:{dir:os.tmpdir(),size:{width:1280,height:720}}});
  const p=await ctx.newPage(),errores=[];vigilar(p,errores);
  try {
    await p.goto(url+(id?'#ver/'+id:''));await esperarFuentes(p);await p.mouse.move(1,1);
    await accion(p);assert.deepEqual(errores,[]);
  } finally {await ctx.close();}
  const video=p.video();
  try{
    execFileSync('ffmpeg',['-v','error','-y','-threads','2','-i',await video.path(),'-an','-c:v','libx264','-threads','2',
      '-crf','24','-preset','fast','-pix_fmt','yuv420p','-movflags','+faststart',path.join(salida,nombre+'.mp4')]);
  }finally{await video.delete();}
}
async function pulso(p,tecla,id,ms=1700) {
  await p.keyboard.press(tecla);assert.equal(await estado(p),id);
  await p.waitForTimeout(ms);assert.equal(await estado(p),id,id+' avanzó automáticamente');
}
async function movimiento(b) {
  let bucle,empalme;
  await filmar(b,'portal-y-presentar',null,async p=>{
    await p.waitForFunction(()=>document.querySelector('video').currentTime>.1);
    await p.locator('#omitir').click();assert.ok(await p.locator('video').evaluate(v=>v.paused));
    await p.locator('#omitir').click();
    bucle=await p.locator('video').evaluate(v=>new Promise((ok,fallo)=>{
      let ant=-1,t0=0;const vueltas=[];
      const limite=setTimeout(()=>fallo(Error('Dos vueltas del portal incompletas')),Math.ceil(2300*v.duration+3000));
      function comprobar(t,f){
        if(f.mediaTime<ant)vueltas.push({ultimo:ant,primero:f.mediaTime,intervaloMs:Math.round(t-t0)});
        t0=t;ant=f.mediaTime;
        if(vueltas.length===2){clearTimeout(limite);ok({duracion:v.duration,ancho:v.videoWidth,alto:v.videoHeight,vueltas});}
        else v.requestVideoFrameCallback(comprobar);
      }
      v.requestVideoFrameCallback(comprobar);
    }));
    assert.ok(bucle.vueltas.every(v=>v.intervaloMs<500));
    await p.locator('#presentar').click();
    empalme=await p.evaluate(()=>({portal:!document.querySelector('#umbral').hidden,portada:!document.querySelector('#sala').hidden,
      reproduciendo:!document.querySelector('video').paused,pantallaCompleta:!!document.fullscreenElement}));
    assert.ok(Object.values(empalme).every(Boolean));
    await p.waitForTimeout(1150);assert.ok(await p.locator('#umbral').isHidden());assert.equal(await estado(p),'01a');
  });
  await filmar(b,'de-economia-al-atlas','EQ3A',async p=>{
    await p.waitForTimeout(650);await cuadro(p).locator('button[aria-pressed]').first().click();
    for(const id of ['EQ3B','EC1','EC2','EC3','III','H01A','H01B','H02A','H02B','H02C']) await pulso(p,'ArrowRight',id);
    await pulso(p,'ArrowLeft','H02B');
  });
  await filmar(b,'vida-cotidiana-y-asistencia','H02C',async p=>{
    await p.waitForTimeout(900);
    for(const id of ['H03A','H03B','H04A','H04B','H05A','H05B','H05C','H06A','H06B','H07A','H07B','H08A']) await pulso(p,'ArrowRight',id);
  });
  await filmar(b,'del-retorno-al-cierre','H08A',async p=>{
    await p.waitForTimeout(750);
    for(const id of ['H08B',...humanidad.filter(id=>id.startsWith('H09')||id.startsWith('H10'))]) await pulso(p,'ArrowRight',id);
    await p.keyboard.press('ArrowRight');assert.equal(await estado(p),ult);await p.waitForTimeout(1450);
  });
  const normal=await b.newContext({viewport:{width:1280,height:720},reducedMotion:'no-preference'});
  const ensayo=await normal.newPage();await ensayo.goto(url+'#ver/H02A');await esperarFuentes(ensayo);
  const inicial=await nucleo(ensayo);await ensayo.keyboard.press('ArrowRight');await ensayo.waitForTimeout(110);
  const primera=await estado(ensayo);await ensayo.keyboard.press('ArrowRight');const segunda=await estado(ensayo);
  await ensayo.keyboard.press('ArrowLeft');await ensayo.waitForTimeout(1800);
  const regreso=await estado(ensayo);
  assert.equal(regreso,ruta[ruta.indexOf(segunda)-1]);
  if(regreso==='H02A') assert.equal(await nucleo(ensayo),inicial);
  await ensayo.locator('#volver').click();await ensayo.locator('#presentar').click();
  async function accesoAlInicio(){
    return ensayo.locator('#volver').evaluate(e=>{
      const r=e.getBoundingClientRect(), objetivo=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);
      return objetivo===e||e.contains(objetivo);
    });
  }
  const inicioDuranteEmpalme=await accesoAlInicio();await ensayo.waitForTimeout(1050);
  const inicioTrasEmpalme=await accesoAlInicio();
  await ensayo.mouse.move(40,705);await ensayo.locator('#volver').click();assert.ok(await ensayo.locator('#presentar').isVisible());
  await normal.close();
  guardar('movimiento.json',{resultado:'PASS',bucle,empalme,
    dosPulsacionesCon110ms:{primera,segunda,retrocesoDuranteAnimacion:regreso},
    botonInicio:{duranteEmpalme:inicioDuranteEmpalme,trasEmpalme:inicioTrasEmpalme,regresoAlPortal:true},
    secuencias:['portal-y-presentar','de-economia-al-atlas','vida-cotidiana-y-asistencia','del-retorno-al-cierre']});
}
(async()=>{
  assert.ok(url&&archivo&&salida && ['web','offline','filmar','todo'].includes(modo),'URL HTML_EXTRAIDO DIRECTORIO [web|offline|filmar|todo]');
  assert.equal(ruta.length,132);assert.equal(new Set(ruta).size,132);assert.equal(incorporados.length,36);
  fs.mkdirSync(salida,{recursive:true});
  const b=await chromium.launch({executablePath:process.env.BROWSER_PATH||'/usr/bin/chromium'});
  try{
    if(modo==='todo'||modo==='web')await web(b);
    if(modo==='todo'||modo==='offline')await offline(b);
    if(modo==='todo'||modo==='filmar')await movimiento(b);
  }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
