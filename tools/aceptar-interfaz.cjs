// node tools/aceptar-interfaz.cjs URL HTML_EXTRAIDO [portal,navegacion,indices,cola,adaptacion,offline]
const {chromium} = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const {createHash} = require('node:crypto');
const assert = require('node:assert/strict');
const [url, html, suites] = process.argv.slice(2);
const repo = path.resolve(__dirname, '..');
const salida = path.join(repo, 'revision/interfaz-final');
const ruta = JSON.parse(fs.readFileSync(path.join(repo,'revision/humanidad/navegacion.json'))).estados;
const cuadro = '.cuadro:not(.sale)';
const menu = '#menu-capitulos', indice = '#indice-capitulo';
const visible = (p, s) => p.locator(s).isVisible();
async function enCine(p,id){
  await p.locator('#sala:not([hidden]) '+cuadro+'[data-id="'+id+'"]').waitFor();
}
async function actual(p){return p.locator(cuadro).last().getAttribute('data-id')}
async function pulsar(p,tecla='ArrowRight'){await p.keyboard.press(tecla)}
async function estado(p,id){await p.goto(url+'#ver/'+id); await enCine(p,id)}
async function foto(p,id){await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:path.join(salida,id+'.jpg'),quality:84,animations:'allow'})}
async function contexto(b,opts={}){
  const c=await b.newContext({viewport:{width:1280,height:720}, reducedMotion:'reduce',...opts});
  const p=await c.newPage(), errores=[];
  p.setDefaultTimeout(6000);
  p.on('pageerror',e=>errores.push(e.message));
  p.on('response',r=>{if(r.status()>=400)errores.push(r.status()+' '+r.url().slice(0,120))});
  return {c,p,errores,async cerrar(){await c.close();assert.deepEqual(errores,[])}};
}
async function disponible(p,s){
 return p.locator(s).evaluate(e=>{
   for(let n=e;n;n=n.parentElement){const c=getComputedStyle(n);
     if(n.hidden||n.inert||c.visibility==='hidden'||c.display==='none'||Number(c.opacity)<.04)return false;}
   return true;
 });
}
async function controles(p,abiertos){
 if(await disponible(p,'#controles-cine')!==abiertos){
   await p.locator('#lienzo').focus();await pulsar(p,'m');
   await p.waitForFunction(({abiertos})=>{
     const e=document.querySelector('#controles-cine');
     return ([...function*(n){while(n){yield n;n=n.parentElement}}(e)].every(n=>!n.hidden&&!n.inert&&getComputedStyle(n).visibility!=='hidden'&&Number(getComputedStyle(n).opacity)>.04)===abiertos);
   },{abiertos});
 }
}
async function iniciarMenu(p){
 await p.locator('#presentar').click();await p.locator(menu).waitFor();
}
async function sesion(p){
 await iniciarMenu(p);await pulsar(p);await enCine(p,ruta[0]);
}
async function quiz(p,id){
 const pregunta=/^21[ace]$|^EQ[123]A$|^H09[ACE]$/.test(id);
 const respuesta=/^21[bdf]$|^EQ[123]B$|^H09[BDF]$/.test(id);
 if(!pregunta&&!respuesta)return;
 const escena=p.locator(cuadro);
 assert.equal(await escena.locator('.explica,.consulta-explicacion').count(),respuesta?1:0,id);
 assert.equal(await escena.locator('.correcta').count(),respuesta?1:0,id);
 if(pregunta&&!id.startsWith('21')){
   const primera=escena.locator('button[data-opcion]').first();await primera.click();
   assert.equal(await actual(p),id);assert.equal(await primera.getAttribute('aria-pressed'),'true');
   await p.locator('#lienzo').focus();
 }
}
async function recorrido(p){
 let menus=0;
 for(let i=0;i<ruta.length;i++){
   const id=ruta[i];await enCine(p,id);await quiz(p,id);
   if(i===ruta.length-1)break;
   const destino=ruta[i+1];
   await pulsar(p,['ArrowRight','Space','PageDown'][i%3]);
   if(destino==='24a'||destino==='III'){
     await p.locator(menu).waitFor();await pulsar(p);menus++;
   }
 }
 await p.keyboard.press('ArrowRight');await enCine(p,'H10C');
 assert.match(await p.locator(cuadro).innerText(),/Muchas gracias por su atención/i);
 assert.equal(menus,2);return menus;
}
async function portal(b){
 const e=await contexto(b,{reducedMotion:'no-preference'}),{p}=e;
 await p.goto(url);
 await p.waitForFunction(()=>document.querySelector('#pelicula').currentTime>.18);
 assert.equal(await disponible(p,'#presentar'),false,'La interfaz aparece antes de la primera vuelta');
 const datos=await p.locator('#pelicula').evaluate(v=>new Promise((ok,fail)=>{
   let anterior=-1,max=0,visAntes=0;const timeout=setTimeout(()=>fail(Error('El vídeo no cerró la primera vuelta')),17000);
   function frame(t,f){
     const op=Number(getComputedStyle(document.querySelector('.entrada')).opacity);
     if(f.mediaTime<v.duration-.6&&f.mediaTime>=anterior&&f.mediaTime>1&&op>.2&&!document.querySelector('#presentar').closest('[hidden],[inert]'))visAntes++;
     max=Math.max(max,f.mediaTime);
     if(f.mediaTime+.35<anterior){clearTimeout(timeout);ok({duracion:v.duration,antesDelBucle:max,primerCuadro:f.mediaTime,visAntes});}
     else{anterior=f.mediaTime;v.requestVideoFrameCallback(frame)}
   }v.requestVideoFrameCallback(frame);
 }));
 assert.ok(datos.antesDelBucle>datos.duracion-.6);assert.equal(datos.visAntes,0);
 await p.locator('#presentar').click({trial:true});await p.waitForTimeout(350);
 await foto(p,'portal');assert.equal(await p.locator('#pelicula').evaluate(v=>v.paused),false);
 await p.locator('#omitir').click();assert.ok(await p.locator('#pelicula').evaluate(v=>v.paused));
 await p.locator('#omitir').click();
 await iniciarMenu(p);await p.waitForTimeout(1100);await foto(p,'capitulos');
 await p.locator('#menu-inicio').click();await p.locator('#presentar').click({trial:true,timeout:2300});
 await e.cerrar();
 const salto=await contexto(b,{reducedMotion:'no-preference'});
 await salto.p.goto(url);await salto.p.locator('#saltar-intro').click();await salto.p.locator('#presentar').click({trial:true,timeout:2000});await salto.cerrar();
 const fallo=await contexto(b,{reducedMotion:'no-preference'});
 await fallo.c.addInitScript(()=>{HTMLMediaElement.prototype.play=()=>Promise.reject(new DOMException('Prueba de autoplay bloqueado','NotAllowedError'))});
 await fallo.p.goto(url);await fallo.p.locator('#presentar').click({trial:true});assert.ok(await fallo.p.locator('#poster').evaluate(i=>i.complete&&i.naturalWidth>0));await fallo.cerrar();
 return {...datos,pausa:true,salto:true,retornoInmediato:true,autoplayBloqueado:true};
}
async function navegacion(b){
 const e=await contexto(b),{p}=e;await p.goto(url);await sesion(p);
 const menus=await recorrido(p);
 await p.getByRole('button',{name:/explorar capítulos/i}).waitFor({timeout:7000});
 await enCine(p,'H10C');await pulsar(p,'ArrowLeft');await enCine(p,'H10B');
 for(let i=ruta.length-3;i>=0;i--){
   await pulsar(p,'PageUp');
   if(ruta[i]==='23b'||ruta[i]==='EC3'){await p.locator(menu).waitFor();await pulsar(p,'ArrowLeft')}
   await enCine(p,ruta[i]);
 }
 await p.mouse.move(150,201);assert.equal(await disponible(p,'#controles-cine'),false);
 await p.locator('#lienzo').click({position:{x:20,y:24}});await enCine(p,'02a');assert.equal(await disponible(p,'#controles-cine'),false);
 await controles(p,true);await p.locator('#anterior').click();await enCine(p,'01a');await controles(p,false);
 await e.cerrar();return {estados:ruta.length,retroceso:ruta.length,quizzes:9,menusIntermedios:menus,cierreEstable:true,controlesOcultos:true};
}
async function cola(b){
 const e=await contexto(b,{reducedMotion:'no-preference'}),{p}=e;
 await estado(p,'H02A');
 await pulsar(p);await enCine(p,'H02B');await p.waitForTimeout(110);await pulsar(p);
 const antes=await actual(p);await enCine(p,'H02C');assert.equal(antes,'H02B');
 await p.waitForTimeout(1250);await pulsar(p,'ArrowLeft');await enCine(p,'H02B');
 await p.waitForTimeout(1250);await pulsar(p);await p.waitForTimeout(110);await pulsar(p);await pulsar(p,'ArrowLeft');
 await enCine(p,'H02B');await p.waitForTimeout(1600);await enCine(p,'H02B');
 await p.keyboard.down('ArrowRight');await enCine(p,'H02C');await p.keyboard.down('ArrowRight');await p.keyboard.up('ArrowRight');await p.waitForTimeout(1500);await enCine(p,'H02C');
 await estado(p,'H08B');await pulsar(p);await enCine(p,'H09A');
 // A deliberate post-appearance key may reveal a question. Queued keys from its predecessor must stop at it.
 await estado(p,'H08A');await pulsar(p);await p.waitForTimeout(110);await pulsar(p);await p.waitForTimeout(110);await pulsar(p);
 await enCine(p,'H09A');await p.waitForTimeout(1300);await enCine(p,'H09A');await quiz(p,'H09A');
 await estado(p,'H02A');await pulsar(p);await p.waitForTimeout(110);await pulsar(p);await pulsar(p,'i');
 await p.locator(indice).waitFor();await p.keyboard.press('Escape');await enCine(p,'H02B');await p.waitForTimeout(1400);await enCine(p,'H02B');
 await e.cerrar();return {dosOrdenesA110ms:['H02B','H02C'],cambioSentido:'H02B',mantenida:'H02C',barreraPregunta:'H09A',indiceLimpiaCola:true};
}
async function indices(b){
 const e=await contexto(b),{p}=e;
 await estado(p,'H06B');
 assert.deepEqual(await p.locator('progress').evaluateAll(nodes=>nodes.map(x=>x.value)),[0,0,1]);
 await pulsar(p,'m');await p.locator('#menu-cine').click();
 await p.locator('#menu-archivo').click();await p.locator('#archivo-general article').first().waitFor();
 await p.locator('#archivo-general [data-grupo]').selectOption('humanidad');
 await p.locator('#archivo-general [data-tipo]').selectOption('Licencias');
 assert.ok(await p.locator('#archivo-general article small').count()>0);
 await pulsar(p,'Escape');
 await p.locator('[data-capitulo=historia]').click();
 await p.locator('#buscar-escena').fill('Crimea');
 assert.ok(await p.locator('[data-escena]').count()>0);
 await foto(p,'indice');const destino=await p.locator('[data-estado]').first().getAttribute('data-estado');
 await p.locator('[data-estado]').first().click();await enCine(p,destino);
 await controles(p,true);await p.locator('#fuentes').click();await p.locator('#lista-fuentes article').first().waitFor();await pulsar(p,'Escape');
 await p.locator('#retomar-cine').click();await enCine(p,'H06B');
 await pulsar(p,'i');await p.locator(indice).waitFor();await pulsar(p,'Escape');await enCine(p,'H06B');
 await controles(p,true);await p.locator('#volver').click();await p.getByRole('button',{name:'Continuar exposición'}).click();await enCine(p,'H06B');
 await pulsar(p,'f');assert.ok(await p.evaluate(()=>document.fullscreenElement!==null));await pulsar(p,'f');
 await controles(p,true);await foto(p,'modo-cine');await e.cerrar();
 return {salto:destino,retorno:'H06B',fuentes:true,reanudacion:true,pantallaCompleta:true};
}
async function adaptacion(b){
 for(const [width,height] of [[1440,900],[1280,720],[1024,768],[820,1180],[390,844]]){
  const e=await contexto(b,{viewport:{width,height},hasTouch:width<=820}),{p}=e;
  await p.goto(url);await iniciarMenu(p);
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await p.locator('[data-capitulo=economia]').click();await p.locator('#buscar-escena').fill('fertilizantes');
  assert.ok(await p.locator('[data-estado]').count()>0);
  if(width===390)await foto(p,'movil');
  await p.locator('[data-cerrar]').click();await p.locator('#menu-continuar').click();await enCine(p,'01a');
  const caja=await p.locator('#lienzo').boundingBox();assert.ok(Math.abs(caja.width/caja.height-16/9)<.01);
  await p.locator('#pestana-cine').click();assert.equal(await disponible(p,'#controles-cine'),true);
  await e.cerrar();
 }
 return {formatos:5};
}
async function offline(b){
 const e=await contexto(b,{offline:true}),{p}=e;
 const bytes=fs.readFileSync(html);
 const solicitudes=[];p.on('request',r=>{if(/^https?:/.test(r.url()))solicitudes.push(r.url())});
 let apertura='file://';
 const prueba=await e.c.newPage();
 try{await prueba.goto(pathToFileURL(path.resolve(html)).href);await prueba.locator('#presentar').waitFor({timeout:2000})}
 catch(err){apertura=err.message.split('\n')[0]}
 finally{await prueba.close()}
 if(apertura==='file://')await p.goto(pathToFileURL(path.resolve(html)).href);
 else await p.setContent(bytes.toString());
 await sesion(p);await recorrido(p);
 await controles(p,true);await p.locator('#indice-cine').click();await p.locator('.revelaciones img').first().evaluate(im=>im.decode());
 assert.deepEqual(solicitudes,[]);
 await e.cerrar();return {apertura,estados:132,sha256:createHash('sha256').update(bytes).digest('hex'),solicitudes};
}
const pruebas={portal,navegacion,cola,indices,adaptacion,offline};
(async()=>{
 fs.mkdirSync(salida,{recursive:true});
 const b=await chromium.launch({executablePath:process.env.BROWSER_PATH||'/usr/bin/chromium'});
 try{
   const resultados={};
   for(const nombre of suites?suites.split(','):Object.keys(pruebas)){
     resultados[nombre]=await pruebas[nombre](b);console.log(nombre,'OK');
   }
   fs.writeFileSync(path.join(salida,'aceptacion'+(suites?'-'+suites.replaceAll(',','-'):'')+'.json'),JSON.stringify(resultados,null,2)+'\n');
 }finally{await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
