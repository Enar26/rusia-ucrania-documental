// Gráficos propios. Las conexiones son conceptuales y las marcas estadísticas
// representan únicamente observaciones, nunca se trazan puntos intermedios.
const iconosEco={
 gas:'<path d="M17 40V26h9V13h13v10h-7v15h12"/><path d="M14 29h14m7-19v12m-5-6h12"/>',
 grano:'<path d="M18 44l22-33M29 27q-11 1-11-10 10 0 11 10zm6-8q-7-3-5-13 8 3 5 13zm-9 15q-8 3-13-5 9-4 13 5zm5-7q11 2 13-8-10-1-13 8zm-7 11q10 2 14-7-10-2-14 7z"/>',
 frasco:'<path d="M22 9h12m-9 0v15L13 42h30L31 24V9M19 33h18"/>',
 tren:'<rect x="15" y="9" width="27" height="29" rx="6"/><path d="M16 24h25M28 13v11m-8 10h3m11 0h3m-18 10 4-6m10 0 5 6"/>',
 agua:'<path d="M9 33l7 7h26l6-7-19-7zM18 29V18h20v11m-15-11v-6h9v6M9 44q5 4 10 0t10 0 10 0 9 0"/>',
 via:'<path d="M18 45l5-35m15 35-5-35m-5 26v6m0-18v6m0-17v5"/>',
 hoja:'<path d="M13 40C9 20 28 12 45 10c-1 19-12 33-29 30m-4 6 23-25"/>',
 banco:'<path d="M10 19l18-10 18 10H10zm5 5v12m9-12v12m9-12v12m9-12v12M10 41h36"/>'
};
const iconoEco=id=>'<svg viewBox="0 0 56 54" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">'+iconosEco[id]+'</svg>';
function fotoEco(id,clase='',pie=creditos[id]){
 return '<figure class="eco-foto '+clase+'">'+img(id,'',pie)+'<figcaption>'+seguro(pie)+'</figcaption></figure>';
}
function cifraEco(valor,unidad,nota=''){
 return '<div class="eco-cifra"><strong>'+valor+'</strong><span>'+unidad+'</span>'+(nota?'<small>'+nota+'</small>':'')+'</div>';
}
function secuenciaEco(items){
 return '<div class="eco-cadena">'+items.map(([icono,texto])=>'<div>'+iconoEco(icono)+'<b>'+texto+'</b></div>').join('<i aria-hidden="true">→</i>')+'</div>';
}
function barrasGas(antes){
 const valor=antes?45:13;
 return '<div class="eco-gas" role="img" aria-label="'+valor+' por ciento del gas importado por la UE procedía de Rusia">'+cifraEco(valor+'<em> %</em>','del gas importado por la UE')+
  '<div class="eco-regla"><i style="--valor:'+valor+'%"></i>'+(antes?'':'<span style="left:45%">2021</span>')+'</div><div class="eco-extremos"><span>0 %</span><span>100 % de las importaciones</span></div></div>';
}
function indiceFao(dos){
 const fila=(mes,valor,y)=>'<g class="fao-marca"><text x="0" y="'+(y-13)+'">'+mes+'</text><path d="M0 '+y+'H480" class="fao-guia"/><path d="M0 '+y+'H'+(valor/180*480)+'" class="fao-valor"/><circle cx="'+(valor/180*480)+'" cy="'+y+'" r="6"/><text class="fao-n" x="475" y="'+(y-13)+'" text-anchor="end">'+valor.toFixed(1).replace('.',',')+'</text></g>';
 return '<div class="eco-fao" role="img" aria-label="Índice FAO en puntos, base 2014–2016 igual a cien">'+
  '<div class="eco-graf-titulo">Índice FAO <span>2014–2016 = 100</span></div><svg viewBox="0 0 500 209">'+
  '<path d="M267 11V174" class="fao-base"/>'+fila('Marzo de 2022',160.2,59)+(dos?fila('Octubre de 2026',133.9,143):'')+
  '<text class="fao-eje" x="0" y="197">0</text><text class="fao-eje" x="267" y="197" text-anchor="middle">100</text><text class="fao-eje" x="480" y="197" text-anchor="end">180 puntos</text></svg></div>';
}
function redEco(){
 const nodos=[[74,54],[221,35],[377,66],[35,155],[187,147],[337,163],[127,245],[274,253]];
 const aristas=[[0,1],[0,3],[0,4],[1,2],[1,4],[2,5],[3,4],[3,6],[4,5],[4,6],[4,7],[5,7],[6,7]];
 return '<div class="eco-red"><svg viewBox="0 0 415 295" aria-label="Red esquemática con dos nodos restringidos">'+aristas.map(([a,b])=>'<path class="'+([a,b].some(n=>n===2||n===5)?'limitada':'activa')+'" d="M'+nodos[a]+'L'+nodos[b]+'"/>').join('')+nodos.map(([x,y],n)=>'<g transform="translate('+x+' '+y+')" class="'+([2,5].includes(n)?'aislado':'conectado')+'"><circle r="15"/>'+([2,5].includes(n)?'<path d="M-5-5L5 5m0-10L-5 5"/>':'<circle r="3"/>')+'</g>').join('')+'</svg><span>Red ilustrativa · × entidad restringida</span></div>';
}
function graficoEco(p){
 switch(p.tipo){
 case 'umbral':return '';
 case 'mundo':return '<div class="eco-pregunta">Destino de la pregunta <i>·</i> Perú</div>';
 case 'productores':return '<div class="eco-pareja">'+'<div class="eco-productor">'+fotoEco('abono','','Uso agrícola · foto ilustrativa')+'<strong>Rusia</strong><span>Gas y fertilizantes</span></div><div class="eco-productor">'+fotoEco('trigo-lviv','','Trigal en Leópolis, Ucrania')+'<strong>Ucrania</strong><span>Cereales y aceites</span></div></div>';
 case 'mercancias':return '<div class="eco-rubros">'+iconoEco('grano')+'<span>Trigo</span><i>·</i><span>Aceite de girasol</span></div>';
 case 'gasAntes':case 'gasDespues':return barrasGas(p.tipo==='gasAntes');
 case 'industria':return fotoEco('red','ventana','Red eléctrica de Eutingen, Alemania · Zonk43')+'<div class="eco-pie-frase">Precios de la energía → costos industriales</div>';
 case 'puerto':return cifraEco('30,3 <em>Mt</em>','de alimentos hasta el 17 de mayo de 2023','Balance parcial · registro JCC / UNCTAD')+fotoEco('silo','detalle','Almacenamiento de grano · Montana, EE. UU.');
 case 'corredores':return secuenciaEco([['tren','Ferrocarril'],['via','Carretera'],['agua','Vía fluvial']])+'<div class="eco-pie-frase">Corredores de solidaridad · conexiones esquemáticas</div>';
 case 'faoPico':case 'faoDos':return indiceFao(p.tipo==='faoDos');
 case 'mercado':return fotoEco('mercado','ventana','Mercado de Kaolack, Senegal · archivo ilustrativo');
 case 'cadena':return secuenciaEco([['gas','Gas natural'],['frasco','Fertilizante nitrogenado'],['hoja','Cultivo']]);
 case 'abonar':return fotoEco('abono','ventana','Aplicación de amoníaco · USDA / NRCS')+'<div class="eco-pie-frase">Costo del insumo → decisión de uso → posible efecto en la oferta</div>';
 case 'swift':return redEco();
 case 'reservas':return '<div class="eco-libro"><div><span>Activos</span><b>Reservas inmovilizadas</b></div><div><span>Operaciones</span><b>Sanciones selectivas</b></div><div><span>Intercambios</span><b>Reorganización comercial</b></div></div>';
 case 'pib':return cifraEco('−28,8 <em>%</em>','PIB real · variación respecto de 2021')+'<div class="eco-pib" aria-hidden="true"><i></i></div>';
 case 'reconstruir':return cifraEco('≈ 588','mil millones de dólares estadounidenses','Necesidades estimadas a diez años')+fotoEco('hangar','detalle','Hostómel, abril de 2022 · O. Ratushniak');
 case 'rusia':return '<div class="eco-comercio-ruso"><span>Ventas al exterior</span><i>↗</i><strong>Reorientación comercial</strong></div>';
 case 'peru':return '<div class="eco-origen">'+iconoEco('frasco')+'<span>Importaciones peruanas</span><strong>Urea</strong></div>';
 case 'campo':return fotoEco('andenes','ventana','Cultivo en terrazas, Perú · J. Thompson')+'<div class="eco-pie-frase">Fertilizante → costo del cultivo → posible presión sobre alimentos</div>';
 case 'lima':return cifraEco('+8,46 <em>%</em>','IPC de Lima Metropolitana','Diciembre de 2022 respecto de diciembre de 2021')+fotoEco('lima','detalle','Mercado del centro de Lima · YoTuT');
 case 'balance':return '<div class="eco-sintesis"><div>'+iconoEco('gas')+'<span>Más proveedores de energía</span></div><div>'+iconoEco('agua')+'<span>Rutas comerciales reorganizadas</span></div><div>'+iconoEco('hoja')+'<span>Reconstrucción pendiente</span></div></div>';
 case 'civil':return fotoEco('plaza','civil','Estudiantes en una manifestación europeísta, Kiev · Ivan Bandura');
 }
}
function escenaEconomica(s,p,i){
 const fuente=p.refs.map(k=>ecoFirmas[k]).filter(Boolean).filter((v,j,a)=>a.indexOf(v)===j).join(' · ');
 return '<div class="eco-vista tono-'+s.tono+' modo-'+p.tipo+'"><div class="eco-veladura"></div><header class="eco-cab"><span>Capítulo II <i>/</i> Economía</span><span>'+seguro(s.nombre)+'</span></header>'+
 '<div class="eco-texto"><p class="eco-fecha">'+seguro(p.fecha)+'</p><h2>'+seguro(p.titulo)+'</h2>'+(p.texto?'<p class="eco-explica">'+seguro(p.texto)+'</p>':'')+'</div>'+
 '<div class="eco-instrumentos">'+graficoEco(p)+'</div><div class="eco-cartela"><span>'+seguro(fuente)+'</span><span>'+p.codigo+' <i></i> '+s.pasos.map((_,n)=>'<b class="'+(i===n?'llena':'')+'"></b>').join('')+'</span></div></div>';
}
