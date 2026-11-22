// Uso: node tools/aceptar-economia.cjs URL HTML_EXTRAIDO DIRECTORIO
const { chromium } = require('playwright');
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const [url, archivo, dest] = process.argv.slice(2);
const econ = [2,2,3,2,3,2,2,3,3,2].flatMap((n,j)=>Array.from({length:n},(_,i)=>'E'+String(j+1).padStart(2,'0')+String.fromCharCode(65+i)));
const hist = [1,5,1,2,3,3,2,3,3,2,3,3,2,4,3,3,3,3,6,4,6,3,2,1].flatMap((n,j)=>Array.from({length:n},(_,i)=>String(j+1).padStart(2,'0')+String.fromCharCode(97+i)));
const todos = [...hist,...econ,'III'], casos=[], errores=[], fichas=[];
const estado = p=>p.locator('.cuadro:not(.sale)').getAttribute('data-id');
function guardar(nombre,datos){fs.writeFileSync(path.join(dest,nombre),JSON.stringify(datos,null,2)+'\n')}
function vigilar(p){p.on('pageerror',e=>errores.push(e.message));p.on('response',r=>{if(r.status()>=400)errores.push(r.status()+' '+r.url().slice(0,160))})}
async function instantanea(p,sub,id){
 const carpeta=path.join(dest,sub);fs.mkdirSync(carpeta,{recursive:true});
 await p.screenshot({path:path.join(carpeta,id+'.jpg'),quality:83});
}
async function geometria(p){
 return p.locator('.cuadro:not(.sale)').evaluate(el=>{
  const marco=el.getBoundingClientRect(),fallos=[];
  const t=el.querySelector('.eco-texto'),d=el.querySelector('.eco-cifra'), foto=el.querySelector('.detalle');
  function cajas(n,m){if(!n||!m)return false;const a=n.getBoundingClientRect(),b=m.getBoundingClientRect();return Math.min(a.right,b.right)-Math.max(a.left,b.left)>2&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>2}
  if(cajas(t,d))fallos.push('Texto y dato superpuestos');if(cajas(d,foto))fallos.push('Dato y foto superpuestos');
  for(const n of el.querySelectorAll('.eco-texto,.eco-cadena b,.eco-cifra,.eco-foto figcaption,.eco-cartela,.eco-extremos,.eco-sintesis span')){
   const r=n.getBoundingClientRect();if(r.left<marco.left-1||r.right>marco.right+1||r.bottom>marco.bottom-.045*marco.height||n.scrollWidth>n.clientWidth+2)fallos.push(n.className||n.tagName);
  }
  return {fallos,imagenes:[...el.querySelectorAll('img')].every(i=>i.complete&&i.naturalWidth>0),ratio:marco.width/marco.height};
 });
}
async function probarArchivo(p){
 const prueba=await p.context().newPage(), local=pathToFileURL(path.resolve(archivo)).href;
 try{
  await prueba.goto(local);if(await prueba.title()!=='Rusia y Ucrania · Documental')throw Error('Archivo no abierto');
 }catch(e){
  const motivo=e.message.split('\n')[0];await p.setContent(fs.readFileSync(archivo,'utf8'),{waitUntil:'load'});
  return 'Documento autocontenido en memoria. Apertura directa: '+motivo;
 }finally{await prueba.close()}
 await p.goto(local);return 'file://';
}
(async()=>{
 fs.mkdirSync(dest,{recursive:true});const b=await chromium.launch({executablePath:process.env.BROWSER_PATH||'/usr/bin/chromium'});
 try{
  const gctx=await b.newContext({reducedMotion:'reduce'}),geo=await gctx.newPage();await geo.goto(url+'#ver/E01A');
  const ubicacion=await geo.evaluate(()=>{const ctx=document.createElement('canvas').getContext('2d');return Object.fromEntries([['Crimea',34,-45,'UKR'],['Moscú',37.6,-55.75,'RUS'],['Lima',-77,12,'PER']].map(([ciudad,x,y,pais])=>[ciudad,ctx.isPointInPath(new Path2D(contornosEco[pais]),x,y,'evenodd')]))});
  assert.ok(Object.values(ubicacion).every(Boolean));casos.push({prueba:'Contornos de Natural Earth y soberanía reconocida de Crimea',resultado:'PASS',ubicacion});await gctx.close();
  const matriz=[];
  for(const [width,height] of [[1280,720],[1366,768],[1920,1080],[1024,768]]){
   const c=await b.newContext({viewport:{width,height},reducedMotion:'reduce'}),p=await c.newPage();vigilar(p);
   await p.goto(url+'#ver/24a');await p.evaluate(()=>document.fonts.ready);
   for(const id of [...econ,'III']){
    await p.keyboard.press('ArrowRight');assert.equal(await estado(p),id);
    await p.locator('.cuadro:not(.sale)').evaluate(async e=>{await Promise.all([...e.querySelectorAll('img')].map(i=>i.decode()))});
    const g=await geometria(p);matriz.push({id,width,height,...g});
    assert.ok(g.imagenes);assert.ok(Math.abs(g.ratio-16/9)<.004);
    if(width===1280||['E03C','E04A','E08B','E09C','E10B','III'].includes(id))await instantanea(p,width+'x'+height,id);
    if(width===1280){
     await p.locator('#fuentes').click();assert.equal(await p.locator('#seleccion').inputValue(),id);
     const refs=await p.locator('#lista-fuentes article a').evaluateAll(a=>a.map(n=>({titulo:n.textContent,url:n.href})));
     assert.ok(refs.length>0);const textos=await p.locator('#lista-fuentes').innerText();
     assert.ok(!textos.includes('undefined'));fichas.push({id,afirmacion:await p.locator('.cuadro:not(.sale) h2').innerText(),fichas:textos,enlaces:refs});
     await p.keyboard.press('ArrowRight');assert.equal(await estado(p),id);await p.keyboard.press('Escape');
    }
   }
   await p.keyboard.press('ArrowRight');assert.equal(await estado(p),'III');
   for(const id of [...econ].reverse().concat(['24a'])){await p.keyboard.press('ArrowLeft');assert.equal(await estado(p),id)}
   await c.close();
  }
  guardar('composicion.json',matriz);guardar('fuentes-por-estado.json',fichas);
  assert.deepEqual(matriz.filter(x=>x.fallos.length).map(x=>[x.id,x.width,x.fallos]),[]);
  casos.push({prueba:'24 estados adelante y atrás, acceso a Fuentes, límites, imágenes y 16:9',resultado:'PASS',formatos:4});
  const c=await b.newContext({reducedMotion:'reduce'}),p=await c.newPage();vigilar(p);await p.goto(url);await p.locator('#presentar').click();
  assert.ok(await p.evaluate(()=>!!document.fullscreenElement));await p.keyboard.press('Escape');assert.equal(await estado(p),'01a');
  for(let j=0;j<todos.length;j++){
    const id=todos[j];assert.equal(await estado(p),id);
    if(id.startsWith('21'))assert.equal(await p.locator('.explica').count(),(id.charCodeAt(2)-97)%2);
    if(id==='22c')assert.match(await p.locator('.copy h2').innerText(),/Comprender/i);
    if(id==='E01A'){await p.locator('#fuentes').click();await p.locator('#seleccion').selectOption('E09C');assert.match(await p.locator('#lista-fuentes').innerText(),/8,46/);await p.keyboard.press('Escape');assert.equal(await estado(p),id)}
    if(j===todos.length-1)break;
    if(j%4===0)await p.locator('#siguiente').click();
    else if(j%4===1){await p.waitForTimeout(218);await p.mouse.click(456,254)}
    else{await p.locator('#lienzo').focus();await p.keyboard.press(j%4===2?'Space':'PageDown')}
  }
  await p.keyboard.press('ArrowLeft');await p.reload();assert.equal(await estado(p),'E10B');
  await p.locator('#volver').click();await p.locator('#reanudar').click();assert.equal(await estado(p),'E10B');
  await p.locator('#lienzo').focus();await p.keyboard.down('ArrowLeft');const anterior=await estado(p);await p.keyboard.down('ArrowLeft');await p.keyboard.up('ArrowLeft');assert.equal(await estado(p),anterior);
  await p.keyboard.press('ArrowLeft');await p.mouse.dblclick(410,235);assert.equal(await estado(p),anterior);
  for(const id of todos.slice(0,todos.indexOf(anterior)).reverse()){await p.keyboard.press('PageUp');assert.equal(await estado(p),id)}
  casos.push({prueba:'Ruta integral, quiz, tres conclusiones históricas, clic, espacio, mando PageDown/PageUp, fullscreen, Esc, reanudar, repetición y doble clic',resultado:'PASS',estados:todos.length});await c.close();
  const usb=await b.newContext({offline:true,reducedMotion:'no-preference',viewport:{width:1280,height:720}}),off=await usb.newPage(),red=[];vigilar(off);
  off.on('request',r=>{if(/^https?:/.test(r.url()))red.push(r.url())});
  const modo=await probarArchivo(off);await off.waitForFunction(()=>document.querySelector('video')?.currentTime>.2);
  const video=await off.locator('video').evaluate(v=>({ancho:v.videoWidth,alto:v.videoHeight,segundos:v.duration,loop:v.loop}));
  assert.ok(video.loop&&video.ancho>0);
  await off.emulateMedia({reducedMotion:'reduce'});await off.locator('#presentar').click();
  for(const id of todos){
   assert.equal(await estado(off),id);await off.locator('.cuadro:not(.sale)').evaluate(async e=>{await Promise.all([...e.querySelectorAll('img')].map(i=>i.decode()))});
   if(id==='E04A'){await off.locator('#fuentes').click();assert.match(await off.locator('#lista-fuentes').innerText(),/UNCTAD/);await off.keyboard.press('Escape')}
   if(id!=='III')await off.keyboard.press('ArrowRight');
  }
  assert.deepEqual(red,[]);assert.ok(await off.evaluate(()=>document.fonts.check('16px Cuaderno')&&document.fonts.check('16px Lectura')));
  casos.push({prueba:'ZIP extraído, 96 estados sin conexión, vídeo decodificado, fuentes y fotos locales',resultado:'PASS',modo,video,solicitudesHttp:red.length});await usb.close();
  assert.deepEqual(errores,[]);guardar('aceptacion.json',{navegador:b.version(),casos,errores});
 }finally{await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
