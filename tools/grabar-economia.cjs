// Vídeo de la salida del navegador mientras el motor responde a pulsaciones reales.
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),cp=require('node:child_process');
const [url,dest,solo]=process.argv.slice(2);
const etapas=[2,2,3,2,3,2,2,3,3,2].flatMap((n,j)=>Array.from({length:n},(_,i)=>'E'+String(j+1).padStart(2,'0')+String.fromCharCode(65+i)));
const pruebas=[];
const pausa=(p,n)=>p.waitForTimeout(n);
async function grabar(b,nombre,id,tarea){
 if(solo&&solo!==nombre)return;
 const c=await b.newContext({viewport:{width:1280,height:720},reducedMotion:'no-preference',recordVideo:{dir:os.tmpdir(),size:{width:1280,height:720}}}),p=await c.newPage();
 try{
  await p.goto(url+(id?'#ver/'+id:''));await p.evaluate(()=>document.fonts.ready);await p.mouse.move(2,2);
  await tarea(p);
 }finally{await c.close()}
 const raw=await p.video().path();
 cp.execFileSync('ffmpeg',['-v','error','-y','-threads','2','-i',raw,'-an','-c:v','libx264','-threads','2','-crf','24','-preset','fast','-pix_fmt','yuv420p','-movflags','+faststart',path.join(dest,nombre+'.mp4')]);
 await p.video().delete();
}
async function paso(p,tecla,esperado,duracion=1210){
 await p.keyboard.press(tecla);assert.equal(await p.locator('.cuadro:not(.sale)').getAttribute('data-id'),esperado);await pausa(p,duracion);
}
(async()=>{
 fs.mkdirSync(dest,{recursive:true});const b=await chromium.launch({executablePath:process.env.BROWSER_PATH||'/usr/bin/chromium'});
 try{
  await grabar(b,'portal-y-entrada','',async p=>{
   await p.waitForFunction(()=>document.querySelector('video').currentTime>.05);
   const costura=await p.locator('video').evaluate(v=>new Promise((resolve,reject)=>{
    let prev=-1,anterior=0,wraps=[],saltos=[],total=0;const max=setTimeout(()=>reject(Error('No completó dos vueltas')),21000);
    function medir(t,m){
     if(prev>=0)saltos.push(t-anterior);if(m.mediaTime<prev)wraps.push({anterior:prev,primero:m.mediaTime,esperaMs:Math.round(t-anterior)});
     prev=m.mediaTime;anterior=t;total++;
     if(wraps.length===2){clearTimeout(max);resolve({vueltas:wraps,fotogramasPresentados:total,esperaMaximaMs:Math.round(Math.max(...saltos)),segundos:v.duration})}
     else v.requestVideoFrameCallback(medir);
    }v.requestVideoFrameCallback(medir);
   }));
   assert.ok(costura.vueltas.every(v=>v.esperaMs<550));await p.locator('#presentar').click();
   const empalme=await p.evaluate(()=>({ambasVisibles:!document.querySelector('#sala').hidden&&!document.querySelector('#umbral').hidden,videoEnMarcha:!document.querySelector('video').paused,fullscreen:!!document.fullscreenElement}));
   assert.ok(empalme.ambasVisibles&&empalme.videoEnMarcha);await pausa(p,1300);assert.ok(await p.locator('#umbral').isHidden());
   pruebas.push({prueba:'Portal, bucle y empalme con reproducción activa',costura,empalme});
  });
  await grabar(b,'economia-completa','24a',async p=>{
   await pausa(p,700);
   for(const id of [...etapas,'III'])await paso(p,'ArrowRight',id,id==='E09A'?2600:1400);
   assert.ok(await p.locator('#siguiente').isDisabled());
  });
  for(const [nombre,ini,fin,ms] of [['energia-puertos','E03C','E04A',1350],['rusia-peru','E08C','E09A',2600]]){
   await grabar(b,nombre,ini,async p=>{
    await pausa(p,620);
    const pixeles=()=>p.locator('.eco-mapa').evaluate(c=>{const m=document.createElement('canvas');m.width=64;m.height=36;const d=m.getContext('2d');d.drawImage(c,0,0,64,36);return m.toDataURL()});
    const inicial=await pixeles();await p.keyboard.press('ArrowRight');await pausa(p,ms*.40);const medio=await pixeles();await pausa(p,ms*.66);
    const final=await pixeles();assert.notEqual(medio,final);assert.notEqual(medio,inicial);
    assert.equal(await p.locator('.cuadro:not(.sale)').getAttribute('data-id'),fin);await paso(p,'ArrowLeft',ini,ms);assert.equal(await pixeles(),inicial);
    await p.keyboard.press('ArrowRight');await pausa(p,180);await paso(p,'ArrowLeft',ini,ms);assert.equal(await pixeles(),inicial);
    pruebas.push({prueba:nombre,intermedioDiferente:true,regresoExacto:true,inversionDuranteViaje:true});
   });
  }
  if(solo)return;
  const c=await b.newContext(),p=await c.newPage();await p.route('**/umbral.mp4',r=>r.abort());await p.goto(url);
  await p.waitForFunction(()=>document.querySelector('video').error!==null);assert.ok(await p.locator('#poster').evaluate(i=>i.complete&&i.naturalWidth>0));await p.locator('#biblioteca').click();await p.locator('#cerrar').click();await p.locator('#presentar').click();await p.waitForTimeout(920);assert.equal(await p.locator('.cuadro').getAttribute('data-id'),'01a');
  pruebas.push({prueba:'Portal sin vídeo, acceso a fuentes y entrada',resultado:'PASS'});await c.close();
  const lento=await b.newContext({viewport:{width:1366,height:768}}),vista=await lento.newPage();await vista.goto(url+'#ver/E08C');await vista.evaluate(()=>document.fonts.ready);
  const cliente=await lento.newCDPSession(vista);await cliente.send('Emulation.setCPUThrottlingRate',{rate:4});
  const reloj=vista.evaluate(()=>new Promise(resolve=>{const intervalos=[];let inicio,prev;
   function leer(t){if(!inicio)inicio=t;if(prev)intervalos.push(t-prev);prev=t;
    if(t-inicio<2500)requestAnimationFrame(leer);else{intervalos.sort((a,b)=>a-b);resolve({fotogramas:intervalos.length,medianaMs:Math.round(intervalos[Math.floor(intervalos.length*.5)]),p95Ms:Math.round(intervalos[Math.floor(intervalos.length*.95)]),maximoMs:Math.round(intervalos[intervalos.length-1])})}}
   requestAnimationFrame(leer)}));await vista.keyboard.press('ArrowRight');pruebas.push({prueba:'Viaje a Perú en Chromium, CPU simulada 4 veces más lenta',...await reloj});await lento.close();
  fs.writeFileSync(path.join(dest,'movimiento.json'),JSON.stringify(pruebas,null,2)+'\n');
 }finally{await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
