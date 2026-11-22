const {chromium}=require('playwright'),fs=require('fs'),assert=require('assert/strict'),cp=require('child_process');
const url=process.argv[2]||'http://localhost:8000/',dest='revision/cine/',tmp=require('node:os').tmpdir();
const segmentos=[
 ['introduccion','',[]],['indice-historia','01a',['02a','02b','02c','02d','02e','03a']],
 ['zar-revolucion','06c',['07a','07b','08a','08b']],['atlas','19a',['19b','19c','19d','19e','19f','19e','19d','19c','19b','19a']],
 ['quiz-y-relevo','21a',['21b','21c','21d','21e','21f','22a','22b','22c','23a','23b','24a']]
];
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium'});try{
 for(const [nombre,id,ruta] of segmentos){
  const c=await b.newContext({viewport:{width:1280,height:720},recordVideo:{dir:tmp,size:{width:960,height:540}}}),p=await c.newPage();
  await p.goto(url+(id?'#ver/'+id:''));await p.mouse.move(0,0);await p.evaluate(()=>document.fonts.ready);
  if(!id){await p.waitForFunction(()=>document.querySelector('video').currentTime>6 && document.querySelector('video').loop);await p.screenshot({path:dest+'portal.jpg',quality:85});await p.locator('#presentar').click();await p.waitForTimeout(1100);}
  else{
   await p.waitForTimeout(500);let anterior=id;
   for(const paso of ruta){await p.keyboard.press(paso>anterior?'ArrowRight':'ArrowLeft');assert.equal(await p.locator('.cuadro:not(.sale)').getAttribute('data-id'),paso);
    await p.waitForTimeout(paso==='03a'?2750:paso==='24a'?2200:paso.startsWith('07')?1500:paso==='02a'||paso==='08a'?1250:paso.startsWith('21')?1400:1050);anterior=paso;}
  }
  await c.close();cp.execFileSync('ffmpeg',['-loglevel','error','-y','-i',await p.video().path(),'-an','-vf','fps=25','-c:v','libx264','-preset','fast','-crf','24','-pix_fmt','yuv420p','-movflags','+faststart',dest+nombre+'.mp4']);
 }
 const sinVideo=await b.newContext({viewport:{width:1280,height:720},recordVideo:{dir:tmp,size:{width:960,height:540}}});
 await sinVideo.route('**/umbral.mp4',r=>r.abort());
 const fallback=await sinVideo.newPage();await fallback.goto(url);await fallback.locator('#umbral.lista').waitFor();await fallback.waitForTimeout(800);
 await fallback.locator('#biblioteca').click();await fallback.waitForTimeout(750);await fallback.locator('#cerrar').click();await fallback.locator('#presentar').click();await fallback.waitForTimeout(1000);
 await sinVideo.close();cp.execFileSync('ffmpeg',['-loglevel','error','-y','-i',await fallback.video().path(),'-an','-c:v','libx264','-crf','24','-pix_fmt','yuv420p','-movflags','+faststart',dest+'sin-video.mp4']);
 const c=await b.newContext({viewport:{width:1366,height:768}}),p=await c.newPage(),cdp=await c.newCDPSession(p);
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});await cdp.send('Network.enable');await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:80,downloadThroughput:750000,uploadThroughput:250000});
 await p.goto(url);await p.waitForFunction(()=>document.querySelector('video').currentTime>.1);const meta=await p.evaluate(()=>({tiempoHastaPrimerVideoMs:Math.round(performance.now()),primerPintado:performance.getEntriesByType('paint').map(x=>[x.name,Math.round(x.startTime)]),bytesPrimerPlano:performance.getEntriesByType('resource').reduce((n,r)=>n+r.transferSize,0)}));
 await p.locator('#presentar').click();await p.waitForTimeout(1100);const frames=p.evaluate(()=>new Promise(resolve=>{const t=[];let ultimo=performance.now();function f(ahora){t.push(ahora-ultimo);ultimo=ahora;if(t.reduce((a,b)=>a+b)>1150){t.sort((a,b)=>a-b);resolve({medianaMs:Math.round(t[Math.floor(t.length*.5)]),p95Ms:Math.round(t[Math.floor(t.length*.95)]),muestras:t.length});}else requestAnimationFrame(f);}requestAnimationFrame(f)}));
 await p.keyboard.press('ArrowRight');meta.intervalosDeCuadro=await frames;meta.cpu='4× más lento';meta.red='80 ms; 750 000 bytes/s';meta.video=fs.statSync('assets/cine/umbral.mp4').size;meta.memoriaJS=await p.evaluate(()=>performance.memory?.usedJSHeapSize);
 fs.writeFileSync(dest+'rendimiento.json',JSON.stringify(meta,null,2));await c.close();
}finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
