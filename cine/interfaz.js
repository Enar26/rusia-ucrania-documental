const miniaturasIndice = ['01a', '02a', '02b', '02c', '02d', '02e', '03a', '04a', '04b', '05a', '05b', '05c', '06a', '06b', '06c', '07a', '07b', '08a', '08b', '08c', '09a', '09b', '09c', '10a', '10b', '11a', '11b', '11c', '12a', '12b', '12c', '13a', '13b', '14a', '14b', '14c', '14d', '15a', '15b', '15c', '16a', '16b', '16c', '17a', '17b', '17c', '18a', '18b', '18c', '19a', '19b', '19c', '19d', '19e', '19f', '20a', '20b', '20c', '20d', '21a', '21b', '21c', '21d', '21e', '21f', '22a', '22b', '22c', '23a', '23b', '24a', 'E03C', 'E04A', 'E08B', 'E09C', 'E10B', 'III', 'E01A', 'E01B', 'E02A', 'E02B', 'E03A', 'E03B', 'E04B', 'E05A', 'E05B', 'E05C', 'E06A', 'E06B', 'E07A', 'E07B', 'E08A', 'E08C', 'E09A', 'E09B', 'E10A', 'EC3', 'EQ2B', 'H01A', 'H02C', 'H03B', 'H04B', 'H05C', 'H06A', 'H07B', 'H08B', 'H09D', 'H10C', 'EC1', 'EC2', 'EQ1A', 'EQ1B', 'EQ2A', 'EQ3A', 'EQ3B', 'H01B', 'H02A', 'H02B', 'H03A', 'H04A', 'H05A', 'H05B', 'H06B', 'H07A', 'H08A', 'H09A', 'H09B', 'H09C', 'H09E', 'H09F', 'H10A', 'H10B'];
const gruposDocumental = [
 {id:'historia', titulo:'Historia', romano:'I', inicio:'01a', foto:'plaza', color:'#c9a064', resumen:'El origen del conflicto y sus momentos decisivos.'},
 {id:'economia', titulo:'Economía', romano:'II', inicio:'24a', foto:'trigo-lviv', color:'#62acd6', resumen:'Energía, comercio y precios en un mundo interconectado.'},
 {id:'humanidad', titulo:'Humanidad', romano:'III', inicio:'III', foto:'hum-vida', color:'#cf8b6e', resumen:'El impacto en las familias, los servicios y el regreso a casa.'}
];
const grupoEstado = x => gruposDocumental[x.s.numero<24?0:x.s.numero<38?1:2];
const normalizarIndice = s => s.normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase();
function mostrarPaneles(menu, seleccionar){
 const paneles=menu.querySelector('#paneles-capitulos');
 paneles.innerHTML=gruposDocumental.map(g=>'<button data-capitulo="'+g.id+'" style="--color:'+g.color+'">'+img(g.foto)+'<span class="cap-copy"><small>Capítulo '+g.romano+'</small><strong>'+g.titulo+'</strong><span>'+g.resumen+'</span><i aria-hidden="true">↗</i></span></button>').join('');
 paneles.onclick=e=>{
   const boton=e.target.closest('[data-capitulo]');
   if(boton)seleccionar(gruposDocumental.find(g=>g.id===boton.dataset.capitulo),boton);
 };
}
function mostrarIndice(dialogo,g,estados,actual,abrir,retomar,menu,movimiento,origen){
 const grupos=new Map();
 for(const x of estados){if(!grupos.has(x.s))grupos.set(x.s,[]);grupos.get(x.s).push(x);}
 const lista=[...grupos];
 dialogo.innerHTML='<header class="indice-portada" style="--color:'+g.color+'">'+img(g.foto)+'<div><button data-volver>‹ Capítulos</button><button data-cerrar>Cerrar ×</button><p>Capítulo '+g.romano+'</p><h2>'+g.titulo+'</h2><button data-comenzar>Comenzar capítulo →</button>'+(retomar?'<button data-retomar>Retomar exposición</button>':'')+'</div></header><div class="indice-cuerpo"><section><label for="buscar-escena">Buscar escenas</label><input id="buscar-escena" type="search" placeholder="Tema o lugar" autocomplete="off"><div id="escenas-indice" aria-label="Escenas y temas"></div></section><section id="detalle-indice"></section></div>';
 const listaEl=dialogo.querySelector('#escenas-indice'),detalle=dialogo.querySelector('#detalle-indice'),buscar=dialogo.querySelector('input');
 let elegida=lista.findIndex(([,xs])=>xs.some(x=>x.id===actual)), filtro='';
 if(elegida<0)elegida=0;
 const archivo=id=> 'assets/miniaturas/'+id+'.webp';
 function render(){
   const visibles=lista.map(([s,xs],i)=>({s,xs,i})).filter(({s,xs})=>
     normalizarIndice([s.nombre,...xs.flatMap(x=>[x.p.titulo,x.p.texto,x.p.fecha])].join(' ')).includes(filtro));
   if(!visibles.some(v=>v.i===elegida))elegida=visibles[0]?.i??-1;
   listaEl.innerHTML=visibles.map(({s,i})=>'<button data-escena="'+i+'" aria-pressed="'+(i===elegida)+'">'+seguro(s.nombre)+'</button>').join('')||'<p>Sin escenas para esta búsqueda.</p>';
   if(elegida<0){detalle.replaceChildren();return;}
   const [s,xs]=lista[elegida];
   detalle.innerHTML='<h3>'+seguro(s.nombre)+'</h3><p>'+seguro(xs[0].p.texto||xs[0].p.fecha)+'</p><div class="revelaciones">'+xs.map(x=>{
     const media=medios[x.p.imagen]?x.p.imagen:g.foto;
     const fichero=archivo(x.id);
     const mini=miniaturasIndice.includes(x.id)?'<img loading="lazy" src="'+(globalThis.integrados?.[fichero]||'./'+fichero)+'" alt="">':img(media,'','','loading="lazy"');
     return '<button data-estado="'+x.id+'">'+mini+'<span>'+seguro(x.p.titulo)+'</span></button>';
   }).join('')+'</div>';
 }
 buscar.oninput=()=>{filtro=normalizarIndice(buscar.value.trim());render()};
 dialogo.onclick=e=>{
   const b=e.target.closest('button');if(!b)return;
   if(b.hasAttribute('data-cerrar'))dialogo.close();
   if(b.hasAttribute('data-volver')){dialogo.close();menu();}
   if(b.hasAttribute('data-comenzar'))abrir(g.inicio,true);
   if(b.hasAttribute('data-retomar'))retomar();
   if(b.dataset.escena){elegida=Number(b.dataset.escena);render();listaEl.querySelector('[aria-pressed="true"]')?.focus();}
   if(b.dataset.estado)abrir(b.dataset.estado,false);
 };
 render();
 if(!dialogo.open)dialogo.showModal();
 if(movimiento){
   const cab=dialogo.querySelector('header');
   cab.animate([{clipPath:'inset(0 0 65% 0)',opacity:.65},{clipPath:'inset(0)',opacity:1}],{duration:780,easing:'ease-out'});
   if(origen){
     const a=origen.getBoundingClientRect(),b=cab.getBoundingClientRect();
     cab.querySelector('img').animate([{transformOrigin:'0 0',transform:'translate('+(a.left-b.left)+'px,'+(a.top-b.top)+'px) scale('+a.width/b.width+','+Math.min(1.25,a.height/b.height)+')'},{transform:'none'}],{duration:780,easing:'ease-out'});
   }
 }
 buscar.focus();
}
function mostrarArchivo(dialogo,estados){
 let capitulo=gruposDocumental[0].id,tema='Todo';
 const categorias=['Todo','Documentos y estudios','Estadísticas','Cartografía','Imágenes y vídeo','Licencias'];
 const clasificar=(id,ref)=>{
   const texto=normalizarIndice(ref[0]+' '+id);
   if(/natural earth|cartograf|atlas|frontera/.test(texto))return 'Cartografía';
   if(/indice|pib|oim|acnur|ocha|fao|estadistic|ine[i]|wEO|census|oms|unicef/.test(texto))return 'Estadísticas';
   return 'Documentos y estudios';
 };
 function render(){
   const g=gruposDocumental.find(x=>x.id===capitulo), refs=new Set(), mediosGrupo=new Set();
   for(const x of estados.filter(x=>grupoEstado(x)===g)){
     x.p.refs.forEach(k=>refs.add(k));
     const plantilla=document.createElement('template');
     plantilla.innerHTML=vista(x.s,x.p,x.i);
     plantilla.content.querySelectorAll('[data-medio]').forEach(n=>mediosGrupo.add(n.dataset.medio));
     if(x.p.camara)mediosGrupo.add('planisferio');
   }
   mediosGrupo.add('umbral');
   const enlace=ref=>'<a target="_blank" rel="noreferrer" href="'+seguro(ref[1])+'">'+seguro(ref[0])+' ↗</a><p>'+seguro(ref[2])+'</p>';
   const documentos=[...refs].filter(k=>referencias[k]&&(tema==='Todo'||clasificar(k,referencias[k])===tema)).map(k=>'<article>'+enlace(referencias[k])+'</article>');
   const recursos=[...mediosGrupo].filter(k=>fichaMedio[k]&&(
     ['Todo','Licencias'].includes(tema)||(tema==='Cartografía'&&(/mapas|planisferio|region-/.test(medios[k])))||
     (tema==='Imágenes y vídeo'&&!/mapas|planisferio|region-/.test(medios[k]))
   )).map(k=>{
     const [ids,fecha,licencia,edicion]=fichaMedio[k];
     return '<article>'+ids.split(' ').filter(id=>referencias[id]).map(id=>enlace(referencias[id])).join('')+'<small>'+seguro([fecha,licencia,edicion].join(' · '))+'</small></article>';
   });
   dialogo.innerHTML='<header><h2>Archivo documental</h2><button data-cerrar>Cerrar ×</button></header><div class="archivo-filtros"><label>Capítulo <select data-grupo>'+gruposDocumental.map(x=>'<option value="'+x.id+'" '+(x===g?'selected':'')+'>'+x.titulo+'</option>').join('')+'</select></label><label>Tipo de fuente <select data-tipo>'+categorias.map(x=>'<option '+(x===tema?'selected':'')+'>'+x+'</option>').join('')+'</select></label></div><div class="archivo-resultados">'+(documentos.length?'<h3>Referencias</h3>'+documentos.join(''):'')+(recursos.length?'<h3>Créditos y derechos</h3>'+recursos.join(''):'')+'</div>';
 }
 dialogo.onclick=e=>{if(e.target.closest('[data-cerrar]'))dialogo.close()};
 dialogo.onchange=e=>{
   if(e.target.hasAttribute('data-grupo'))capitulo=e.target.value;
   if(e.target.hasAttribute('data-tipo'))tema=e.target.value;
   const selector=e.target.hasAttribute('data-grupo')?'[data-grupo]':'[data-tipo]';render();dialogo.querySelector(selector).focus();
 };
 render();dialogo.showModal();
}
