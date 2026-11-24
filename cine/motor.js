(() => {
 const el=id=>document.getElementById(id), sala=el('sala'), portal=el('umbral'), escenario=el('pantallas'), lienzo=el('lienzo'), dialogo=el('archivo');
 const reducido=matchMedia('(prefers-reduced-motion: reduce)'), video=el('pelicula');
 const estados=escenas.sort((a,b)=>a.numero-b.numero).flatMap(s=>s.pasos.map((p,i)=>({s,p,i,id:p.codigo||String(s.numero).padStart(2,'0')+String.fromCharCode(97+i)})));
 const clave='cine-ucrania-2026-v1', ease='cubic-bezier(.22,.78,.18,1)';
 const menu=el('menu-capitulos'), indicePanel=el('indice-capitulo'), archivoGeneral=el('archivo-general');
 const mandos=el('controles-cine');
 const memoria=new Map();
 let cursor=0, animaciones=[], bloqueo=0, avisoTimer, pendientes=[], timerCola, timerFin;
 let retorno=null, accesoMenu=null, siguienteGrupo=gruposDocumental[0], reproducido=false, anteriorVideo=-1;
 let progreso;
 function recuperar(){
   try{return JSON.parse(leer(clave+'-progreso'))||{}}catch{return {}}
 }
 function actualizarProgreso(){
   el('progreso-capitulos').innerHTML=gruposDocumental.map(g=>{
     const total=estados.filter(x=>grupoEstado(x)===g).length;
     const vistos=new Set((progreso[g.id]||[]).filter(id=>grupoEstado(estados[indice(id)]||estados[0])===g && indice(id)>=0)).size;
     return '<progress max="'+total+'" value="'+vistos+'" aria-label="'+g.titulo+'" style="--color:'+g.color+'"></progress>';
   }).join('');
 }
 const guardar=(k,v)=>{memoria.set(k,v);try{localStorage.setItem(k,v)}catch{}};
 const leer=k=>{try{return memoria.get(k)??localStorage.getItem(k)}catch{return memoria.get(k)??null}};
 const indice=id=>estados.findIndex(x=>x.id===id);
 function url(hash){try{history.replaceState(null,'',hash)}catch{}}
 progreso=recuperar();
 let pasoPortal=null;
 function revelarPortal(){reproducido=true;portal.classList.add('lista');el('saltar-intro').hidden=true;}
 el('saltar-intro').onclick=revelarPortal;
 function pausarPortal(){
   video.pause();revelarPortal();el('omitir').textContent='Reproducir vídeo';
   if(!portal.classList.contains('filmando'))el('plano').textContent='Járkiv · Saltivka del Norte, reportaje de 2023';
 }
 function reproducirPortal(){
   if(!video.getAttribute('src'))video.src=ruta('umbral');
   video.muted=true;video.loop=true;video.play().catch(pausarPortal);
 }
 function presentarPortal(regreso=false){
   pasoPortal?.cancel();pasoPortal=null;portal.classList.remove('saliendo');portal.inert=false;
   sala.hidden=true;menu.hidden=true;portal.hidden=false;limpiarCola();cancelar();clearTimeout(timerFin);camaraEconomica.parar();
   el('reanudar').hidden=indice(leer(clave))<0;if(regreso||reproducido)revelarPortal();
   if(reducido.matches)pausarPortal();else reproducirPortal();
 }
 el('poster').src=ruta('poster');
 video.addEventListener('error',()=>{portal.classList.remove('filmando');pausarPortal()});
 video.addEventListener('playing',()=>{portal.classList.add('filmando');el('omitir').textContent='Pausar vídeo'});
 video.addEventListener('timeupdate',()=>{
   const t=video.currentTime;
   if(t+.35<anteriorVideo)revelarPortal();anteriorVideo=t;
   el('plano').textContent=t<2.90||t>=9.94?'Járkiv · Saltivka del Norte, reportaje de 2023':t<6.42?'Río Desná · extracción de arena, 2017':'Járkiv · vecinos junto al manantial, reportaje de 2023';
 });
 if(video.requestVideoFrameCallback){
   let anterior=-1;
   function fotograma(_,f){
     if(f.mediaTime+.35<anterior)revelarPortal();
     anterior=f.mediaTime;
     if(!reproducido)video.requestVideoFrameCallback(fotograma);
   }
   video.requestVideoFrameCallback(fotograma);
 }
 if(globalThis.integrados)document.querySelector('.descarga-web').hidden=true;
 el('omitir').onclick=()=>video.paused?reproducirPortal():pausarPortal();
 function cancelar(){animaciones.forEach(a=>a.cancel());animaciones=[];escenario.querySelectorAll('.sale,.vuelo').forEach(n=>n.remove());bloqueo=0;}
 function anim(n,k,d){if(!n)return;const a=n.animate(k,{duration:d,easing:ease,fill:'backwards'});animaciones.push(a);return a;}
 function mueve(n,a,b,d){return anim(n,[{transform:a},{transform:b}],d)}
 function transicion(anterior,nuevo,prev,x,dir) {
   if(reducido.matches||!anterior){anterior?.remove();return 0;}
   const {s,i}=x, esCambio=prev.s.numero!==s.numero, dur=esCambio?720:530;
   anterior.classList.add('sale');anterior.setAttribute('aria-hidden','true');
   const mediosViaje=(s.numero===3&&prev.s.numero===2)||(s.numero===2&&prev.s.numero===3)?'atlas':(s.numero===24&&prev.s.numero===23)||(s.numero===23&&prev.s.numero===24)?'trigo':null;
   const sal=mediosViaje&&anterior.querySelector('[data-vuelo="'+mediosViaje+'"]'), llegada=mediosViaje&&nuevo.querySelector('[data-vuelo="'+mediosViaje+'"]');
   let total=dur;
   if(s.estilo==='economica'){
     total=prev.s.estilo==='economica'?830:1000;
     const relacion=[prev.p.tipo,x.p.tipo].sort().join('/');
     const viajePeru=relacion==='peru/rusia';
     if(viajePeru)total=2250;
     if(prev.s.estilo==='economia'){
       anim(nuevo,[{clipPath:'ellipse(0% 0% at 68% 47%)'},{clipPath:'ellipse(145% 150% at 68% 47%)'}],total);
     }else{
       const texto=nuevo.querySelector('.eco-texto');
       if(viajePeru)anim(texto,[{opacity:0},{opacity:0,offset:.53},{opacity:1}],total);
       else anim(texto,[{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'none'}],640);
       const instrumental=nuevo.querySelector('.eco-instrumentos');
       anim(instrumental,viajePeru?[{opacity:0},{opacity:0,offset:.66},{opacity:1}]:[{opacity:0},{opacity:1}],total);
       if(!viajePeru&&instrumental.querySelector('.ventana')){
         anim(instrumental.querySelector('.ventana'),[{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0)'}],total);
       }
       if(relacion==='gasDespues/puerto'){
         const puente=document.createElement('span');puente.className='eco-enlace';puente.textContent=dir>0?'Del suministro al transporte':'Del transporte al suministro';nuevo.append(puente);
         anim(puente,[{opacity:0},{opacity:1,offset:.22},{opacity:1,offset:.75},{opacity:0}],1000).finished.then(()=>puente.remove()).catch(()=>puente.remove());
       }
       const enlaces={
         'corredores/faoPico':['.eco-cadena>div:last-child svg','.fao-marca circle'],
         'abonar/swift':['.eco-pie-frase','.eco-red .conectado circle'],
         'pib/reservas':['.eco-libro div:last-child','.eco-pib i']
       };
       if(enlaces[relacion]){
         const [a,b]=enlaces[relacion];
         const origen=anterior.querySelector(a)||anterior.querySelector(b),destino=nuevo.querySelector(b)||nuevo.querySelector(a);
         if(origen&&destino){
           const marca=document.createElement('i'),limite=nuevo.getBoundingClientRect();
           const posicion=n=>{const r=n.getBoundingClientRect();return 'translate('+((r.left+r.width/2)-limite.left)+'px,'+((r.top+r.height/2)-limite.top)+'px)'};
           marca.className='eco-testigo';nuevo.append(marca);
           anim(marca,[{transform:posicion(origen),opacity:0},{opacity:1,offset:.18},{opacity:1,offset:.75},{transform:posicion(destino),opacity:0}],total).finished.then(()=>marca.remove()).catch(()=>marca.remove());
         }
       }
     }
     if(x.p.tipo==='gasDespues'||x.p.tipo==='gasAntes'){
       const barra=nuevo.querySelector('.eco-regla i'),fin=x.p.tipo==='gasDespues'?13:45;
       anim(barra,[{width:(x.p.tipo==='gasDespues'?45:13)+'%'},{width:fin+'%'}],850);
     }
   }else if(s.estilo==='relato-humano'){
     total=transicionHumana(nuevo,prev,x,dir,anim);
   }else if(s.estilo==='consulta'){
     if(esCambio || prev.s.estilo!=='consulta' || Math.floor(i/2)!==Math.floor(prev.i/2)){
       anim(nuevo,[{opacity:0},{opacity:1}],dur);
       mueve(nuevo.querySelector('.consulta-figura'),'translateX('+(-dir*3)+'%)','none',dur);
     }else{
       anim(nuevo.querySelector('.consulta-explicacion'),[{opacity:0,translate:'0 8px'},{opacity:1,translate:'0 0'}],400);
     }
   }else if(s.estilo==='balance-economico'){
     total=800;
     anim(nuevo,[{opacity:0},{opacity:1}],total);
     mueve(nuevo.querySelector('figure img'),'scale(1.035)','scale(1)',total);
   }else if(s.estilo==='humanidad'){
     anim(nuevo,[{opacity:0},{opacity:1}],920);total=920;
   }else if(sal&&llegada){
     const origen=sal.getBoundingClientRect(),dest=llegada.getBoundingClientRect(),frame=escenario.getBoundingClientRect(),volador=sal.cloneNode();
     const rect=b=>({left:(b.x-frame.x)+'px',top:(b.y-frame.y)+'px',width:b.width+'px',height:b.height+'px'});
     volador.className='vuelo';volador.alt='';Object.assign(volador.style,rect(dest));escenario.append(volador);sal.style.visibility='hidden';
     total=mediosViaje==='atlas'?2550:2000;
     anim(volador,[{...rect(origen),opacity:1},{...rect(dest),opacity:1,offset:.77},{...rect(dest),opacity:0}],total).finished.then(()=>volador.remove()).catch(()=>{});
     anim(nuevo,[{opacity:0},{opacity:1,offset:.58},{opacity:1}],total);
     anim(nuevo.querySelector('.copy'),[{opacity:0,clipPath:'inset(0 100% 0 0)'},{opacity:0,offset:.5},{opacity:1,clipPath:'inset(0)'}],total);
   }else if(!esCambio&&['indice','regreso'].includes(s.estilo)){
     anim(nuevo.querySelector('.triptico'),[{gridTemplateColumns:getComputedStyle(anterior.querySelector('.triptico')).gridTemplateColumns},{gridTemplateColumns:getComputedStyle(nuevo.querySelector('.triptico')).gridTemplateColumns}],720);total=720;
   }else if(s.numero===7){
     total=1250;
     mueve(nuevo.querySelector('.palacio'),'translateX('+(-dir*3)+'%) scale(1.04)','none',total);
     mueve(nuevo.querySelector('.papel'),'translateX('+(dir*6)+'%)','none',total);
     mueve(nuevo.querySelector('.zar'),'translateX('+(dir*10)+'%) scale(.94)','none',total);
     anim(nuevo.querySelector('.bisagra'),[{opacity:0,translate:'0 22%'},{opacity:1,translate:'0 0'}],total);
   }else if(prev.s.numero===7&&s.numero===8){
     total=1050;anim(nuevo,[{clipPath:'inset(0 0 0 100%)'},{clipPath:'inset(0)'}],total);mueve(anterior.querySelector('.zar'),'none','translateX(-12%) scale(1.12)',total);mueve(anterior.querySelector('.bisagra'),'none','translateX(-25%) scale(1.3)',total);
   }else if(!esCambio&&s.numero===19){
     anim(nuevo.querySelector('.atlas-pais'),[{opacity:0},{opacity:1}],610);anim(nuevo.querySelector('.atlas-lado'),[{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0)'}],610);total=610;
   }else if(!esCambio&&s.numero===21&&i%2){
     anim(nuevo.querySelector('.explica'),[{opacity:0,translate:'0 12px'},{opacity:1,translate:'0 0'}],dur);
     anim(nuevo.querySelector('.correcta'),[{outlineColor:'transparent'},{outlineColor:'#bb8b43'}],dur);
   }else if(s.numero===2&&prev.s.numero===1){
     [...nuevo.querySelectorAll('.ala')].forEach((a,j)=>anim(a,[{clipPath:'inset('+(j*17)+'% 0 100% 0)'},{clipPath:'inset(0)'}],750+j*140));total=1030;
   }else if(['geografia','medieval','imperios','crimea','territorios'].includes(s.estilo)){
     const hoja=nuevo.querySelector('.mapa-grande');if(hoja)anim(hoja,[{clipPath:dir>0?'inset(0 100% 0 0)':'inset(0 0 0 100%)'},{clipPath:'inset(0)'}],dur);
     anim(nuevo.querySelector('.copy'),[{opacity:0},{opacity:1}],dur);
   }else if(['revolucion','alianzas','rumbo','diplomacia'].includes(s.estilo)){
     anim(nuevo,[{clipPath:dir>0?'inset(0 0 0 95%)':'inset(0 95% 0 0)'},{clipPath:'inset(0)'}],dur);
   }else{anim(nuevo,[{opacity:0},{opacity:1}],dur);anim(nuevo.querySelector('.copy'),[{translate:'0 14px'},{translate:'0 0'}],dur);}
   anim(anterior,[{opacity:1},{opacity:0}],total).finished.then(()=>anterior.remove()).catch(()=>{});
   return total;
 }
 function dibujar(n,dir=0){
   const prev=estados[cursor],x=estados[n];cancelar();
   const anterior=escenario.querySelector('.cuadro'),nuevo=document.createElement('section');
   nuevo.className='cuadro '+x.s.estilo;nuevo.dataset.id=x.id;nuevo.dataset.paso=x.i;nuevo.setAttribute('aria-label',x.s.nombre);
   nuevo.innerHTML=vista(x.s,x.p,x.i);escenario.append(nuevo);cursor=n;
   const durCam=x.p.camara?camaraEconomica.mostrar(nuevo.querySelector('.eco-vista'),x.p,x.s.tono,prev,dir&&!reducido.matches):0;
   if(!x.p.camara)camaraEconomica.parar();
   const dur=dir?transicion(anterior,nuevo,prev,x,dir):(anterior?.remove(),0);
   bloqueo=performance.now()+Math.max(dur,durCam);
   el('anterior').disabled=n===0;el('siguiente').disabled=n===estados.length-1;
   const g=grupoEstado(x).id;
   progreso[g]=[...new Set([...(progreso[g]||[]),x.id])];
   guardar(clave+'-progreso',JSON.stringify(progreso));actualizarProgreso();el('retomar-cine').hidden=retorno===null;
   if(retorno===null)guardar(clave,x.id);
   url('#ver/'+x.id);
   clearTimeout(timerFin);el('salida-cine').hidden=true;
   if(n===estados.length-1)timerFin=setTimeout(()=>{if(cursor===n&&!sala.hidden)el('salida-cine').hidden=false},5000);
 }
 const abierto=()=>[dialogo,indicePanel,archivoGeneral].some(p=>p.open);
 const pasoQuiz=x=>['consulta','preguntas'].includes(x.s.estilo);
 function limpiarCola(){pendientes=[];clearTimeout(timerCola);}
 function ejecutar(dir){
   const n=cursor+dir, x=estados[n];
   if(!x)return;
   const cruza=['24a','III'].includes(dir>0?x.id:estados[cursor].id);
   if(cruza){
     const siguiente=dir>0?n:cursor;
     mostrarMenu(grupoEstado(estados[siguiente]),siguiente);
     return;
   }
   dibujar(n,dir);
   if(pasoQuiz(x))limpiarCola();
 }
 function despachar(){
   clearTimeout(timerCola);
   if(!pendientes.length||abierto()||sala.hidden)return;
   const espera=bloqueo-performance.now();
   if(espera>0){timerCola=setTimeout(despachar,Math.ceil(espera));return;}
   ejecutar(pendientes.shift());
   if(pendientes.length)despachar();
 }
 function avanzar(dir){
   if(abierto())return;
   if(!menu.hidden){
     if(dir<0){
       if(accesoMenu!==null)iniciar(accesoMenu-1);
       else if(!el('menu-retomar').hidden)retomar();
       else volverPortal();
     } else iniciar(accesoMenu??indice(siguienteGrupo.inicio));
     return;
   }
   if(sala.hidden)return;
   if(dir<0){
     limpiarCola();ejecutar(dir);return;
   }
   if(pasoQuiz(estados[cursor])&&pendientes.length)return;
   pendientes.push(dir);despachar();
 }
 function mostrarControles(visible){
   mandos.hidden=!visible;
   el('pestana-cine').setAttribute('aria-expanded',String(visible));
   if(!visible&&!sala.hidden)lienzo.focus({preventScroll:true});
 }
 function ocultarPortal(destino){
   pasoPortal?.cancel();portal.classList.remove('saliendo');
   if(portal.hidden)return;
   portal.inert=true;
   if(reducido.matches){portal.hidden=true;video.pause();return;}
   portal.classList.add('saliendo');
   pasoPortal=portal.animate([{opacity:1,clipPath:'inset(0)'},{opacity:.9,offset:.3},{opacity:0,clipPath:'inset(0 0 0 70%)'}],{duration:880,easing:ease,fill:'forwards'});
   destino.animate([{opacity:.25},{opacity:1}],{duration:880,easing:ease});
   pasoPortal.finished.then(()=>{portal.hidden=true;video.pause();portal.classList.remove('saliendo');pasoPortal?.cancel();pasoPortal=null}).catch(()=>{});
 }
 function mostrarMenu(grupo=grupoEstado(estados[cursor]),limite=null){
   limpiarCola();clearTimeout(timerFin);accesoMenu=limite;siguienteGrupo=grupo;
   sala.hidden=true;menu.hidden=false;ocultarPortal(menu);url('#capitulos');
   el('menu-retomar').hidden=retorno===null;
   el('menu-continuar').textContent='Continuar con '+grupo.titulo+' →';
   menu.querySelectorAll('[data-capitulo]').forEach(b=>b.classList.toggle('destacado',b.dataset.capitulo===grupo.id));
   menu.focus({preventScroll:true});
 }
 function iniciar(n,desdeIndice=false){
   limpiarCola();if(indicePanel.open)indicePanel.close();
   sala.hidden=false;menu.hidden=true;ocultarPortal(sala);dibujar(n);mostrarControles(false);
   lienzo.focus({preventScroll:true});
   if(desdeIndice&&!reducido.matches){
     escenario.animate([{opacity:.2,clipPath:'inset(0 0 15% 0)'},{opacity:1,clipPath:'inset(0)'}],{duration:880,easing:ease});
   }
 }
 function consultarCapitulos(){
   if(!sala.hidden&&retorno===null)retorno=cursor;
   mostrarMenu();
 }
 function retomar(){
   if(retorno===null)return;
   const n=retorno;retorno=null;iniciar(n);
 }
 function abrirIndice(g,origen){
   limpiarCola();
   mostrarIndice(indicePanel,g,estados.filter(x=>grupoEstado(x)===g),sala.hidden?null:estados[cursor].id,(id,nuevo)=>{
     if(nuevo){retorno=null;}
     else if(retorno===null&&!sala.hidden)retorno=cursor;
     iniciar(indice(id),true);
   },retorno!==null?retomar:null,consultarCapitulos,!reducido.matches,origen);
 }
 function alternarPantalla(){
   const prom=document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.();
   prom?.catch(()=>{el('aviso').textContent='Puedes usar F11 para entrar en pantalla completa.';clearTimeout(avisoTimer);avisoTimer=setTimeout(()=>el('aviso').textContent='',3500)});
 }
 function volverPortal(){
   limpiarCola();
   if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});
   url('#inicio');presentarPortal(true);el('presentar').focus();
 }
 mostrarPaneles(menu,abrirIndice);
 el('presentar').onclick=()=>{
   seleccionReset();mostrarMenu(gruposDocumental[0]);
 };
 function seleccionReset(){
   retorno=null;seleccionesConsulta.clear();progreso={};guardar(clave,'');guardar(clave+'-progreso','{}');
 }
 el('reanudar').onclick=()=>{retorno=null;iniciar(Math.max(0,indice(leer(clave))))};
 el('volver').onclick=el('menu-inicio').onclick=el('fin-inicio').onclick=volverPortal;
 el('menu-cine').onclick=el('fin-menu').onclick=consultarCapitulos;
 el('indice-cine').onclick=()=>abrirIndice(grupoEstado(estados[cursor]));
 el('retomar-cine').onclick=el('menu-retomar').onclick=retomar;
 el('menu-continuar').onclick=()=>avanzar(1);
 el('pantalla-cine').onclick=alternarPantalla;
 el('pestana-cine').onclick=()=>mostrarControles(mandos.hidden);
 el('ocultar-cine').onclick=()=>mostrarControles(false);
 el('anterior').onclick=()=>avanzar(-1);
 el('siguiente').onclick=e=>{if(e.detail<2)avanzar(1)};
 menu.addEventListener('click',e=>{if(e.detail<2&&!e.target.closest('button,a'))avanzar(1)});
 lienzo.addEventListener('click',e=>{
   const opcion=e.target.closest('button[data-opcion]');
   if(opcion){marcarOpcion(opcion,estados[cursor]);return;}
   if(e.button===0&&e.detail<2&&!e.target.closest('button,a,footer')){lienzo.focus();avanzar(1);}
 });
 document.addEventListener('keydown',e=>{
   if(abierto()||e.repeat||e.altKey||e.ctrlKey||e.metaKey||e.target.closest('input,select,textarea,[contenteditable]'))return;
   if(sala.hidden&&menu.hidden)return;
   if(e.target.closest('button,a')&&['Enter',' '].includes(e.key))return;
   const tecla=e.key.toLowerCase();
   if(tecla==='f'){e.preventDefault();alternarPantalla();return;}
   if(!sala.hidden&&tecla==='m'){e.preventDefault();mostrarControles(mandos.hidden);return;}
   if(!sala.hidden&&tecla==='i'){e.preventDefault();abrirIndice(grupoEstado(estados[cursor]));return;}
   const d=['ArrowRight','PageDown',' '].includes(e.key)?1:['ArrowLeft','PageUp'].includes(e.key)?-1:0;
   if(d){e.preventDefault();avanzar(d);}
 });
 document.addEventListener('fullscreenchange',()=>{el('pantalla-cine').textContent=document.fullscreenElement?'Salir de pantalla completa':'Pantalla completa'});
 for(const panel of [indicePanel,archivoGeneral])panel.addEventListener('close',()=>{
   if(!sala.hidden)lienzo.focus();else if(!menu.hidden)menu.focus();
 });
 function fichar(id){
   const x=estados[indice(id)];
   const refs=new Set(x?x.p.refs:[]),med=new Set(x?[]:['umbral']);
   if(x){
     let contenido=escenario.querySelector('.cuadro:not(.sale)');
     if(contenido?.dataset.id!==x.id){
       const plantilla=document.createElement('template');plantilla.innerHTML=vista(x.s,x.p,x.i);contenido=plantilla.content;
     }
     for(const n of contenido.querySelectorAll('[data-medio]'))med.add(n.dataset.medio);
     if(x.p.camara)med.add('planisferio');
   }
   const enlace=k=>{const v=referencias[k];return '<a rel="noreferrer" target="_blank" href="'+seguro(v[1])+'">'+seguro(v[0])+' ↗</a><p>'+seguro(v[2])+'</p>'};
   const documentos=[...refs].map(k=>'<article>'+enlace(k)+'</article>').join('');
   const medios=[...med].map(m=>{
     const [ids,fecha,licencia,edicion]=fichaMedio[m];
     return '<article>'+ids.split(' ').map(enlace).join('')+'<small>'+seguro([fecha,licencia,edicion].join(' · '))+'</small></article>';
   }).join('');
   el('lista-fuentes').innerHTML=(documentos?'<h3>Documentación del paso</h3>'+documentos:'')+(medios?'<h3>Imágenes y cartografía</h3>'+medios:'');

 }
 function abrirFuentes(){
   limpiarCola();
   const id=sala.hidden?'portal':estados[cursor].id;
   el('fichas').innerHTML='<label for="seleccion">Escena y paso</label><select id="seleccion"><option value="portal">Introducción web</option>'+estados.map(x=>'<option value="'+x.id+'">'+seguro(x.p.titulo)+'</option>').join('')+'</select><div id="lista-fuentes"></div>';
   el('seleccion').value=id;fichar(id);el('seleccion').onchange=e=>fichar(e.target.value);
   dialogo.showModal();el('cerrar').focus();
 }
 el('fuentes').onclick=abrirFuentes;
 el('menu-archivo').onclick=el('biblioteca').onclick=()=>{limpiarCola();mostrarArchivo(archivoGeneral,estados)};el('cerrar').onclick=()=>dialogo.close();
 dialogo.addEventListener('close',()=>{if(!sala.hidden)lienzo.focus()});
 reducido.addEventListener('change',()=>{cancelar();camaraEconomica.parar();if(reducido.matches)pausarPortal()});
 window.addEventListener('hashchange',()=>{
   const n=indice(location.hash.replace('#ver/',''));
   if(n>=0)iniciar(n,false);else if(location.hash==='#inicio')presentarPortal(true);
 });
 const inicial=indice(location.hash.replace('#ver/',''));if(inicial>=0)iniciar(inicial,false);else presentarPortal();
})();
