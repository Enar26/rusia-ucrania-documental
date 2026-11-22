(() => {
 const el=id=>document.getElementById(id), sala=el('sala'), portal=el('umbral'), escenario=el('pantallas'), lienzo=el('lienzo'), dialogo=el('archivo');
 const reducido=matchMedia('(prefers-reduced-motion: reduce)'), video=el('pelicula');
 const estados=escenas.sort((a,b)=>a.numero-b.numero).flatMap(s=>s.pasos.map((p,i)=>({s,p,i,id:String(s.numero).padStart(2,'0')+String.fromCharCode(97+i)})));
 const clave='cine-ucrania-2026-v1', ease='cubic-bezier(.22,.78,.18,1)';
 let cursor=0, animaciones=[], bloqueo=0,ultimoClic=-Infinity, ocultar, timerVideo, avisoTimer;
 const guardar=(k,v)=>{try{localStorage.setItem(k,v)}catch{}};
 const leer=k=>{try{return localStorage.getItem(k)}catch{return null}};
 const indice=id=>estados.findIndex(x=>x.id===id);
 function url(hash){try{history.replaceState(null,'',hash)}catch{}}
 function finIntro() {clearTimeout(timerVideo);portal.classList.add('lista');el('omitir').hidden=true;video.pause();el('plano').textContent='Territorio, trabajo y vida civil · metraje ilustrativo';}
 function presentarPortal(inicial=false){
   sala.hidden=true;portal.hidden=false;cancelar();
   const guardado=leer(clave);el('reanudar').hidden=indice(guardado)<0;
   if(!inicial||sessionLeida()||reducido.matches){finIntro();return;}
   video.src=ruta('umbral');video.muted=true;video.play().catch(finIntro);
   timerVideo=setTimeout(()=>{if(video.readyState<2)finIntro()},2700);
 }
 function sessionLeida(){try{const k=clave+'-portal';const vista=sessionStorage.getItem(k);sessionStorage.setItem(k,'1');return vista;}catch{return false}}
 el('poster').src=ruta('vida');video.addEventListener('error',finIntro);video.addEventListener('ended',finIntro);
 video.addEventListener('playing',()=>portal.classList.add('filmando'));
 video.addEventListener('timeupdate',()=>{const t=video.currentTime;el('plano').textContent=t<2.4?'Estambul · estrecho del Bósforo':t<4.6?'Trigo · plano ilustrativo':'Vida civil · plano ilustrativo';if(t>=4.6)portal.classList.add('lista')});
 el('omitir').onclick=()=>{portal.classList.remove('filmando');finIntro();el('presentar').focus()};
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
   if(sal&&llegada){
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
   const dur=dir?transicion(anterior,nuevo,prev,x,dir):(anterior?.remove(),0);
   bloqueo=performance.now()+dur;el('pos').textContent=x.id.slice(0,2)+' / 24  ·  '+(x.i+1)+' / '+x.s.pasos.length;
   guardar(clave,x.id);url('#ver/'+x.id);
 }
 function avanzar(dir){
   if(sala.hidden||dialogo.open||(dir>0&&performance.now()<bloqueo))return;
   const n=Math.max(0,Math.min(estados.length-1,cursor+dir));if(n!==cursor)dibujar(n,dir);
 }
 function iniciar(n,gesto){
   finIntro();portal.hidden=true;sala.hidden=false;
   if(gesto&&!document.fullscreenElement){
    const prom=document.documentElement.requestFullscreen?.();
    if(prom)prom.catch(alternativa);else alternativa();
   }
   dibujar(n);lienzo.focus({preventScroll:true});despertar();
   if(!reducido.matches&&n===0)anim(escenario.querySelector('.titular'),[{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0)'}],900);
 }
 function alternativa(){el('aviso').textContent='Modo ventana · En escritorio puedes usar F11.';clearTimeout(avisoTimer);avisoTimer=setTimeout(()=>el('aviso').textContent='',4500);}
 function despertar(){sala.classList.remove('quieta');clearTimeout(ocultar);ocultar=setTimeout(()=>sala.classList.add('quieta'),1800)}
 lienzo.addEventListener('pointermove',despertar);
 el('presentar').onclick=()=>iniciar(0,true);el('reanudar').onclick=()=>iniciar(Math.max(0,indice(leer(clave))),true);
 el('volver').onclick=()=>{if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});url('#inicio');presentarPortal();el('presentar').focus()};
 lienzo.addEventListener('click',e=>{if(e.button!==0||e.target.closest('button,a')||e.detail>1)return;const now=performance.now();if(now-ultimoClic<210)return;ultimoClic=now;lienzo.focus();avanzar(1)});
 document.addEventListener('keydown',e=>{
   if(sala.hidden||dialogo.open||e.altKey||e.ctrlKey||e.metaKey||e.target.matches('input,select,textarea'))return;
   if(e.target.closest('button,a')&&['Enter',' '].includes(e.key))return;
   const d=['ArrowRight','PageDown',' '].includes(e.key)?1:['ArrowLeft','PageUp'].includes(e.key)?-1:0;
   if(d){e.preventDefault();if(!e.repeat)avanzar(d);}
 });
 function fichar(id){
   const x=estados[indice(id)], refs=x?x.p.refs:['bosforo','puertoFicha','trigo','trigoFicha','vida','vidaFicha','coleccion'];
   const f=el('lista-fuentes'); f.innerHTML=refs.map(k=>{const v=referencias[k];return '<article><a rel="noreferrer" target="_blank" href="'+seguro(v[1])+'">'+seguro(v[0])+' ↗</a><p>'+seguro(v[2])+'</p></article>'}).join('');
 }
 function abrirFuentes(){
   const id=sala.hidden?'portal':estados[cursor].id;
   el('fichas').innerHTML='<label for="seleccion">Escena y paso</label><select id="seleccion"><option value="portal">Introducción web</option>'+estados.map(x=>'<option value="'+x.id+'">'+x.id+' · '+seguro(x.p.titulo)+'</option>').join('')+'</select><div id="lista-fuentes"></div>';
   el('seleccion').value=id;fichar(id);el('seleccion').onchange=e=>fichar(e.target.value);
   dialogo.showModal();el('cerrar').focus();
 }
 el('fuentes').onclick=el('biblioteca').onclick=abrirFuentes;el('cerrar').onclick=()=>dialogo.close();
 dialogo.addEventListener('close',()=>{if(!sala.hidden)lienzo.focus()});
 reducido.addEventListener('change',()=>{cancelar();if(reducido.matches)finIntro()});
 const inicial=indice(location.hash.replace('#ver/',''));if(inicial>=0)iniciar(inicial,false);else presentarPortal(true);
})();
