// El mismo lienzo geográfico pasa de una escena a la siguiente. Todos los puntos
// comparten proyección, tanto en el planisferio como en el recorte de mayor resolución.
const camaraEconomica=(()=>{
 const lienzo=document.createElement('canvas'), ctx=lienzo.getContext('2d',{alpha:false});
 lienzo.setAttribute('aria-hidden','true');
 const formas=Object.fromEntries(Object.entries(contornosEco).map(([k,v])=>[k,new Path2D(v)]));
 const capas={}, colores={energia:'#8dd8d0',comercio:'#edc983',agricultura:'#bbd29a',presion:'#e9a486'};
 const lugares={
  'Mar Negro':[33.5,43.2,'mar'],'Mar Mediterráneo':[16,35.3,'mar'],'Océano Atlántico':[-34,13,'mar'],
  'Rusia':[42,54],'Ucrania':[31,49.3],'Perú':[-75.5,-9.8],'Europa':[15,53],'África':[21,6],
  'América del Sur':[-59,-20],'Odesa':[30.73,46.48,'ciudad'],'Lima':[-77.04,-12.05,'ciudad'],
  'Polonia':[19.3,52.4],'Rumanía':[24.9,45.8],'Turquía':[34.9,39.5],'Mar Báltico':[18.6,57.1,'mar'],
  'Kiev':[30.52,50.45,'ciudad'],'Cusco':[-71.97,-13.52,'ciudad'],'Océano Pacífico':[-88,-15,'mar']
 };
 const etiquetas={
  umbral:['Mar Negro','Ucrania','Turquía'],mundo:['Ucrania','Rusia','África','América del Sur','Océano Atlántico'],
  productores:['Ucrania','Rusia','Mar Negro'],mercancias:['Ucrania','Mar Negro','Rusia'],gasAntes:['Europa','Rusia','Mar Báltico'],
  industria:['Europa','Mar Báltico'],gasDespues:['Europa','Rusia','Mar Báltico'],puerto:['Mar Negro'],
  corredores:['Polonia','Ucrania','Rumanía','Mar Negro'],pib:['Ucrania','Mar Negro'],reconstruir:['Kiev'],
  rusia:['Rusia','Mar Negro'],peru:['Perú','Océano Pacífico'],campo:['Cusco'],lima:['Lima','Océano Pacífico'],
  balance:['Europa','África','América del Sur','Océano Atlántico']
 };
 let cam,parada,tono,frame=0,observador;
 const W=1200,H=675,ancla=815,altura=317;
 function cargar(){
  if(capas.planisferio)return;
  for(const id of ['planisferio','mar-negro']){
   const im=new Image();capas[id]=im;im.onload=()=>{if(cam)dibujar()};im.src=ruta(id);
  }
  observador=new ResizeObserver(()=>{if(cam&&lienzo.isConnected)dibujar()});observador.observe(lienzo);
 }
 function imagen(id,o,n,e,s,x,y,k,ky){
  const im=capas[id];if(!im?.naturalWidth)return;
  // Recortar antes de dibujar ahorra trabajo en las aproximaciones de cámara.
  const x0=Math.max(o,-x/k),x1=Math.min(e,(W-x)/k),y0=Math.max(s,(y-H)/ky),y1=Math.min(n,y/ky);
  if(x1<=x0||y1<=y0)return;
  const dx=im.naturalWidth/(e-o),dy=im.naturalHeight/(n-s);
  ctx.drawImage(im,(x0-o)*dx,(n-y1)*dy,(x1-x0)*dx,(y1-y0)*dy,x+x0*k,y-y1*ky,(x1-x0)*k,(y1-y0)*ky);
 }
 function dibujar(opacidad=1){
  const ancho=Math.min(1700,Math.max(1,Math.round(lienzo.clientWidth*(devicePixelRatio>1?1.25:1))));
  if(lienzo.width!==ancho){lienzo.width=ancho;lienzo.height=Math.round(ancho*H/W)}
  ctx.setTransform(lienzo.width/W,0,0,lienzo.height/H,0,0);
  ctx.fillStyle='#19353d';ctx.fillRect(0,0,W,H);
  const [lon,lat,span]=cam,k=W/span,ky=k/Math.cos(Math.min(55,Math.abs(lat))*Math.PI/180), x=ancla-lon*k,y=altura+lat*ky;
  imagen('planisferio',-180,90,180,-90,x,y,k,ky);if(span<105)imagen('mar-negro',10,60,54,33,x,y,k,ky);
  const marcas=parada.tipo==='mundo'||parada.tipo==='productores'||parada.tipo==='mercancias'?['UKR','RUS']:
   ['peru','campo','lima'].includes(parada.tipo)?['PER']:['pib','reconstruir','puerto','umbral'].includes(parada.tipo)?['UKR']:parada.tipo==='rusia'?['RUS']:[];
  ctx.save();ctx.translate(x,y);ctx.scale(k,ky);ctx.fillStyle=colores[tono];ctx.globalAlpha=.32*opacidad;
  for(const codigo of marcas)ctx.fill(formas[codigo],'evenodd');ctx.restore();
  const salto=span<35?2:span<95?10:30;
  ctx.beginPath();for(let g=-180;g<=180;g+=salto){ctx.moveTo(x+g*k,0);ctx.lineTo(x+g*k,H)}
  for(let g=-90;g<=90;g+=salto){ctx.moveTo(0,y-g*ky);ctx.lineTo(W,y-g*ky)}
  ctx.strokeStyle='#e8e2bd20';ctx.lineWidth=.8;ctx.stroke();
  ctx.globalAlpha=opacidad;
  const usadas=[];
  for(const texto of etiquetas[parada.tipo]||[]){
   const [lo,la,clase]=lugares[texto],cx=x+lo*k,cy=y-la*ky;
   if(cx<30||cx>1170||cy<70||cy>595)continue;
   ctx.font=clase==='mar'?'italic 25px Cuaderno, Georgia':'600 16px Lectura, Arial';
   const rotulo=clase==='mar'?texto:texto.toLocaleUpperCase('es'), largo=ctx.measureText(rotulo).width;
   const tx=clase==='ciudad'?cx+12:cx-largo/2;
   if(usadas.some(([a,b,h])=>Math.abs(cy-h)<22&&tx<b+6&&tx+largo>a-6))continue;
   usadas.push([tx,tx+largo,cy]);ctx.lineWidth=3.5;ctx.strokeStyle='#203439bb';
   ctx.strokeText(rotulo,tx,cy);ctx.fillStyle=clase==='mar'?'#bed5d4':'#fff1d4';ctx.fillText(rotulo,tx,cy);
   if(clase==='ciudad'){ctx.beginPath();ctx.arc(cx,cy-5,4.2,0,2*Math.PI);ctx.fillStyle=colores[tono];ctx.fill()}
  }
  if(parada.tipo==='puerto'){
   // La ampliación separa los nombres de tres puertos cercanos sin inventar rutas.
   const puertos=[['Pivdennyi',31.02,46.62,-50],['Odesa',30.73,46.48,-7],['Chornomorsk',30.65,46.30,34]];
   ctx.font='600 16px Lectura, Arial';ctx.lineWidth=1.2;
   for(const [nombre,lo,la,offset] of puertos){
    const px=x+lo*k,py=y-la*ky,finY=py+offset;
    ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px+30,finY);ctx.lineTo(px+43,finY);ctx.strokeStyle='#f5dfac';ctx.stroke();
    ctx.beginPath();ctx.arc(px,py,3.2,0,Math.PI*2);ctx.fillStyle='#fae5b7';ctx.fill();
    ctx.lineWidth=3;ctx.strokeStyle='#203439';ctx.strokeText(nombre,px+47,finY+5);ctx.fillText(nombre,px+47,finY+5);ctx.lineWidth=1.2;
   }
  }
  ctx.globalAlpha=1;
 }
 function mezcla(a,b,t){
  const u=t*t*(3-2*t);
  return [a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u,Math.exp(Math.log(a[2])*(1-u)+Math.log(b[2])*u)];
 }
 function mostrar(nodo,p,color,prev,mover){
  cancelAnimationFrame(frame);cargar();
  nodo.prepend(lienzo);lienzo.className='eco-mapa';
  const desde=cam&&prev?.p.camara?cam:p.camara,hasta=p.camara;
  const viaje=[p.tipo,prev?.p.tipo].includes('rusia')&&[p.tipo,prev?.p.tipo].includes('peru');
  const dur=!mover?0:viaje?2250:prev?.p.camara?1050:850;
  cam=desde;parada=p;tono=color;const t0=performance.now(), mundo=[-18,29,245];
  function paso(now){
   const t=dur?Math.min(1,(now-t0)/dur):1;
   cam=viaje?(t<.48?mezcla(desde,mundo,t/.48):mezcla(mundo,hasta,(t-.48)/.52)):mezcla(desde,hasta,t);
   dibujar(dur?Math.min(1,.12+1.18*t):1);
   if(t<1)frame=requestAnimationFrame(paso);
  }
  paso(t0);return dur;
 }
 function parar(){cancelAnimationFrame(frame);if(parada){cam=parada.camara;if(lienzo.isConnected)dibujar()}}
 return {mostrar,parar};
})();
