// node tools/aceptar-cine.cjs URL HTML-autonomo carpeta-de-evidencia
const {chromium}=require('playwright');
const assert=require('node:assert/strict'), fs=require('node:fs'), path=require('node:path');
const {pathToFileURL}=require('node:url');
const [url,archivo,dir]=process.argv.slice(2);
const esperado=[1,5,1,2,3,3,2,3,3,2,3,3,2,4,3,3,3,3,6,4,6,3,2,1].flatMap((n,j)=>Array.from({length:n},(_,i)=>String(j+1).padStart(2,'0')+String.fromCharCode(97+i)));
const estado=p=>p.locator('.cuadro:not(.sale)').getAttribute('data-id');
const captura=(p,nombre)=>p.screenshot({path:path.join(dir,nombre+'.jpg'),quality:80});
const pruebas=[],errores=[],choques=[],hechos=[];
let videoOffline;
fs.mkdirSync(path.join(dir,'estados'),{recursive:true});
(async()=>{const browser=await chromium.launch({executablePath:process.env.BROWSER_PATH||'/usr/bin/chromium'});
try{
 for(const modo of ['ArrowRight','click','Space','PageDown','offline']){
  const offline=modo==='offline',ctx=await browser.newContext({offline,reducedMotion:'reduce',viewport:modo==='Space'?{width:1920,height:1080}:{width:1280,height:720}});
  let fileOK=true;
  if(offline){const probe=await ctx.newPage();try{await probe.goto(pathToFileURL(path.resolve(archivo)).href)}catch(err){if(!err.message.includes('ERR_BLOCKED_BY_ADMINISTRATOR'))throw err;fileOK=false}await probe.close();}
  const p=await ctx.newPage();p.on('pageerror',e=>errores.push(e.message));p.on('console',m=>{if(m.type()==='error')errores.push(m.text())});
  p.on('requestfailed',r=>errores.push(r.url().slice(0,100)));p.on('request',r=>{if(offline&&/^https?:/.test(r.url()))errores.push(r.url().slice(0,100))});
  if(offline&&!fileOK)await p.setContent(fs.readFileSync(archivo,'utf8'));else await p.goto(offline?pathToFileURL(path.resolve(archivo)).href:url);
  await p.locator('#presentar').click();await p.waitForFunction(()=>!!document.fullscreenElement);await p.evaluate(()=>document.exitFullscreen());await p.evaluate(()=>document.fonts.ready);
  const ids=[],atras=[];
  for(let k=0;k<esperado.length;k++){
   const actual=await estado(p);ids.push(actual);assert.equal(actual,esperado[k],modo);
   if(modo==='ArrowRight'||offline){
    await p.locator('.cuadro img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));
    assert.ok(await p.evaluate(()=>[...document.fonts].every(f=>f.status==='loaded')));
   }
   if(modo==='ArrowRight'){
    await captura(p,'estados/'+actual);
    const item=await p.evaluate(()=>{
     const a=document.querySelector('.cuadro:not(.sale)'),b=a.getBoundingClientRect(),fin=b.y+b.height*.954;
     const textos=[...a.querySelectorAll('h1,h2,h3,p,small,li,.ley,.eje,.cinta')];
     const fuera=textos.filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.height&&(r.left<b.left-2||r.right>b.right+2||r.top<b.top-2||r.bottom>fin+1)}).map(e=>e.textContent.slice(0,55));
     const id=a.dataset.id,s=escenas.find(s=>s.numero===Number(id.slice(0,2))),p=s.pasos[Number(a.dataset.paso)];
     return {id,fecha:p.fecha,titulo:p.titulo,hecho:p.texto,fuentes:p.refs,recursos:[...new Set([...a.querySelectorAll('img')].map(n=>new URL(n.src).pathname.split('/').pop()))],fuera};
    });hechos.push(item);if(item.fuera.length)choques.push(item);
    await p.locator('#fuentes').click();assert.equal(await p.locator('#seleccion').inputValue(),actual);assert.ok(await p.locator('#lista-fuentes article').count());await p.keyboard.press('Escape');assert.equal(await estado(p),actual);
    if(actual==='21a'){
      const nombre=await p.locator('.quiz-lamina').getAttribute('data-medio');
      assert.equal(nombre,'quiz-peninsula');
      assert.ok(!fs.readFileSync(path.join(__dirname,'../assets/cine/quiz-peninsula.svg'),'utf8').includes('>Crimea<'));
    }
    if(actual==='12b')assert.ok((await p.locator('.voto').innerText()).includes('28.804.071'));
    if(actual.startsWith('21'))assert.equal(await p.locator('.explica').count(),(actual.charCodeAt(2)-97)%2);
   }
   if(k===esperado.length-1)break;
   if(modo==='click'){await p.waitForTimeout(215);await p.mouse.click(500,370);}
   else await p.keyboard.press(offline?'ArrowRight':modo);
  }
  await p.keyboard.press('ArrowRight');assert.equal(await estado(p),'E01A');await p.keyboard.press('ArrowLeft');assert.equal(await estado(p),'24a');
  for(let k=esperado.length-2;k>=0;k--){await p.keyboard.press(modo==='PageDown'?'PageUp':'ArrowLeft');const id=await estado(p);atras.push(id);assert.equal(id,esperado[k]);}
  pruebas.push({modo,fileOK:offline?fileOK:undefined,ida:ids,vuelta:atras});await ctx.close();
 }
 const sinRed=await browser.newContext({offline:true,reducedMotion:'no-preference'});
 const usb=await sinRed.newPage();const salidas=[];
 usb.on('request',r=>{if(/^https?:/.test(r.url()))salidas.push(r.url())});
 await usb.setContent(fs.readFileSync(archivo,'utf8'));
 await usb.waitForFunction(()=>document.querySelector('video').currentTime>6 && document.querySelector('video').loop,null,{timeout:15000});
 videoOffline=await usb.locator('video').evaluate(v=>({segundos:v.duration,ancho:v.videoWidth,alto:v.videoHeight,terminado:v.ended}));
 assert.ok(videoOffline.segundos>=6&&videoOffline.segundos<=8&&videoOffline.ancho>0);assert.deepEqual(salidas,[]);await sinRed.close();
 const ctx=await browser.newContext({viewport:{width:1366,height:768}}),p=await ctx.newPage();await p.goto(url);await p.waitForFunction(()=>document.querySelector('video').currentTime>.15);await p.locator('#omitir').click();await p.locator('#presentar').click();await p.waitForFunction(()=>!!document.fullscreenElement);
 await p.keyboard.down('ArrowRight');await p.keyboard.down('ArrowRight');await p.keyboard.up('ArrowRight');await p.mouse.dblclick(450,360);assert.equal(await estado(p),'02a');await p.keyboard.press('ArrowLeft');assert.equal(await estado(p),'01a');
 await p.keyboard.press('Escape');await p.waitForFunction(()=>!document.fullscreenElement);assert.equal(await estado(p),'01a');
 for(const id of ['19d','21b']){await p.goto(url+'#ver/'+id);await p.reload();assert.equal(await estado(p),id);await p.locator('#fuentes').click();await p.locator('#seleccion').selectOption('03a');await p.locator('#cerrar').click();assert.equal(await estado(p),id);await p.locator('#volver').click();await p.reload();await p.locator('#reanudar').click();assert.equal(await estado(p),id);await p.evaluate(()=>document.fullscreenElement&&document.exitFullscreen());}
 const tabla=[];
 for(const [width,height] of [[1024,768],[1280,720],[1366,768],[1920,1080]]){
  await p.setViewportSize({width,height});await p.goto(url+'#ver/19f');await p.reload();await p.locator('.atlas-pais').evaluate(e=>e.decode());const r=await p.locator('#lienzo').boundingBox();assert.ok(Math.abs(r.width/r.height-16/9)<.006);await captura(p,'atlas-'+width);tabla.push({width,height,lienzo:r});
 }
 await ctx.close();
 const otro=await browser.newContext();await otro.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('denegado')}});Element.prototype.requestFullscreen=()=>Promise.reject(Error('denegado'));});await otro.route('**/umbral.mp4',r=>r.abort());const q=await otro.newPage();await q.goto(url);await q.locator('#umbral.lista').waitFor();await captura(q,'respaldo');await q.locator('#presentar').click();await q.locator('#aviso').filter({hasText:'F11'}).waitFor();assert.equal(await estado(q),'01a');await q.keyboard.press('ArrowRight');assert.equal(await estado(q),'02a');await otro.close();
 const res={videoOffline,fecha:'2026-11-21',navegador:browser.version(),pruebas,resoluciones:tabla,errores,desbordes:choques.map(x=>[x.id,x.fuera]),exportBytes:fs.statSync(archivo).size};
 fs.writeFileSync(path.join(dir,'pruebas.json'),JSON.stringify(res,null,2));fs.writeFileSync(path.join(dir,'hechos.json'),JSON.stringify(hechos,null,2));assert.deepEqual(errores,[]);assert.deepEqual(res.desbordes,[]);console.log('71 estados × cinco recorridos de ida y vuelta. Cero errores o desbordes.');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1;});
