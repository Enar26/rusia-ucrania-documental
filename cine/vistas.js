const seguro = s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const img=(id,clase='',alt='',atrib='')=>'<img data-medio="'+seguro(id)+'" draggable="false" class="'+clase+'" src="'+ruta(id)+'" alt="'+seguro(alt)+'" '+atrib+'>';
const credito=(id,alterno='')=>'<small class="credito">'+seguro(alterno||creditos[id]||'Cartografía editorial · Natural Earth')+'</small>';
const copy=(p,ey='')=>'<div class="copy"><p class="sobre">'+seguro(ey||p.fecha)+'</p><h2>'+seguro(p.titulo)+'</h2><p class="bajada">'+seguro(p.texto)+'</p></div>';
const etiqueta=t=>'<p class="sobre">'+seguro(t)+'</p>';
function triptico(s,i) {
 const ret=s.numero===23, elegido=ret?i:foco[i];
 return '<div class="hub-top">'+etiqueta(ret?'Cambio de expositor':'Apertura')+'<h2>Tres perspectivas, un conflicto</h2></div><div class="triptico" style="--cols:'+perspectivas.map((_,n)=>elegido<0?'1fr':n===elegido?'1.65fr':'.72fr').join(' ')+'">'+perspectivas.map(([t,sub,media],n)=>'<div class="ala '+(n===elegido?'activa':'')+'">'+img(media,'',creditos[media],'data-vuelo="'+media+'"')+'<div class="ala-copy"><small>'+ (ret&&n===0?'Historia completada':ret&&n===1?'Segundo expositor':'Expositor '+(n+1))+'</small><h3>'+t+'</h3><p>'+sub+'</p></div></div>').join('')+'</div>';
}
function retrato(s,p,i) {
 return '<div class="teatro '+(i?'cerca':'')+'">'+img('invierno','palacio','Palacio de Invierno, edición de 1909')+img('atlas','papel','')+img('nicolas','zar','Nicolás II en un retrato publicado en 1909')+'<span class="bisagra" data-ancla="1917">1917</span></div>'+copy(p)+credito('nicolas','Retrato y palacio · Singleton, láminas 37 y 27, edición de 1909');
}
function atlas(s,p,i){
 const ley=i<2?'<span><i class="c4"></i>Crimea bajo control ruso</span>'+(i?'<span>◌ Conflicto en partes del Donbás</span>':''):'<strong>Superficie provincial bajo control estimado</strong><div class="escala">'+['&lt;5 %','5–&lt;50 %','50–&lt;75 %','≥75 %'].map((v,k)=>'<span><i class="c'+k+'"></i>'+v+'</span>').join('')+'</div>';
 return '<div class="atlas-fondo"></div>'+img(p.imagen,'atlas-pais',p.texto)+'<div class="atlas-cabe">'+etiqueta('Ucrania · atlas regional')+'<p class="fecha">'+p.fecha+'</p></div><div class="atlas-lado"><h2>'+seguro(p.titulo)+'</h2><p>'+seguro(p.texto)+'</p><div class="ley">'+ley+'<span>━ Frontera internacional reconocida</span></div></div><div class="cinta">'+['2014','2015–21','III 2022','XI 2022','VII 2024','XI 2026'].map((t,k)=>'<span class="'+(k===i?'aqui':'')+'">'+t+'</span>').join('')+'</div>'+credito('',i<2?'Natural Earth · ONU · localización histórica':(i<4?'NZZ / Liveuamap':'DeepState')+' · síntesis provincial / Natural Earth');
}
function quiz(s,p,i) {
 const n=Math.floor(i/2), r=i%2,q=preguntas[n];
 const visual=n===1?'<div class="quiz-fechas"><span>1991</span><i></i><span>2014</span><i></i><span>2022</span></div>':img(n===0?(r?'ucrania':'quiz-peninsula'):'1100','quiz-lamina',n===0?'Localizador de Ucrania en el mar Negro':'Lámina de Europa hacia 1100');
 return '<div class="quiz-medio q'+n+'">'+visual+'</div><div class="quiz-voz">'+etiqueta(p.fecha+(r?' · respuesta':' · participación oral'))+'<h2>'+seguro(q.pregunta)+'</h2><ol class="respuestas">'+q.opciones.map((o,k)=>'<li '+(r&&k===q.correcta?'class="correcta"':'')+'><b>'+String.fromCharCode(65+k)+'</b>'+seguro(o)+'</li>').join('')+'</ol>'+(r?'<p class="explica">'+seguro(q.respuesta)+'</p>':'')+'</div>';
}
function vista(s,p,i){
 switch(s.estilo){
 case 'indice':case 'regreso':return triptico(s,i);
 case 'retrato':return retrato(s,p,i);
 case 'atlas':return atlas(s,p,i);
 case 'preguntas':return quiz(s,p,i);
 case 'cierre':return img('dnieper','rio','El Dniéper en Kiev, lámina publicada en 1909')+'<div class="cierre-luz"></div>'+copy(p,'Conclusión del primer expositor · '+p.fecha)+credito('dnieper');
 case 'economia':return img('trigo','sangre','Espigas de trigo en un campo','data-vuelo="trigo"')+'<div class="ocaso"></div>'+copy(p)+credito('trigo');
 case 'portada':return img('plaza','fotoportada','Estudiantes en una manifestación europeísta en Kiev')+'<div class="portada-tinta"></div><div class="titular">'+etiqueta('Historia · Economía · Humanidad')+'<h1>RUSIA<br>Y UCRANIA</h1><p>Conflicto, impacto económico y humanitario</p></div>'+credito('plaza');
 case 'capitulo':return img('atlas','sangre','El mar Negro, mapa de 1911','data-vuelo="atlas"')+'<div class="ocaso"></div>'+copy(p)+credito('atlas');
 default:return historiaCompuesta(s,p,i);
 }
}
function vistaHistorica(s,p,i){
 const id=p.imagen, doc=['acta1991','decreto','resolucion68','maidan-informe','requisas'].includes(id), geo=medios[id]?.endsWith('.svg');
 const lectura=geo?'cartografica':doc?'documental':'fotografica';
 const fechaMapa={1100:'hacia 1100',1200:'hacia 1200',1500:'hacia 1500',1650:'hacia 1650',1783:'1783'};
 return '<div class="composicion '+lectura+'">'+img(id,geo?'mapa-grande':'pieza',p.titulo)+'<div class="filtro"></div>'+copy(p)+credito(id,fechaMapa[id]?'Historical Basemaps · lámina '+fechaMapa[id]:'')+'</div>';
}
const laminas={1100:'hacia 1100',1200:'hacia 1200',1500:'hacia 1500',1650:'hacia 1650',1783:'1783'};
const tramos={
 8:['1917','1918','1922'],9:['1932–33','1939–45','1944'],11:['1949','1955','1991'],
 12:['Agosto','Diciembre','Fin de la Unión'],14:['1999','2004','2008','2013'],
 15:['La firma','La plaza','El relevo'],17:['2014','2015','2016–21'],18:['2021–22','24 febrero','2 marzo'],20:['2023','2024–25','2026','Síntesis']
};
function eje(s,i){return '<div class="eje">'+(tramos[s.numero]||[]).map((t,n)=>'<span class="'+(n===i?'actual':'')+'">'+t+'</span>').join('')+'</div>';}
function lectura(p,cab,frase,pie){
 return '<div class="lectura-papel">'+etiqueta(cab)+'<div class="raya"></div><h3>'+seguro(frase)+'</h3><small>'+seguro(pie)+'</small></div>'+copy(p);
}
function cartografia(s,p,i) {
 const id=s.numero===4&&i===1?'orientacion':s.numero===10&&i===0?'crimea-rusa':p.imagen;
 const sobre=laminas[id]?'Lámina cartográfica · '+laminas[id]:'Localizador geográfico';
 const mapa=img(id,'mapa-grande',p.titulo);
 let detalle='';
 if(s.numero===6&&i===2)detalle=img('manifiesto','inserto','Edición del manifiesto imperial de 1783');
 if(s.numero===10)detalle=(i?img('decreto','inserto decreto','Decreto de transferencia, edición de consulta'):'')+'<div class="traspaso"><span class="'+(!i?'act':'')+'">RSFS de Rusia</span> → <span class="'+(i?'act':'')+'">RSS de Ucrania</span></div>';
 if(s.numero===16&&i===1)detalle='<div class="clave-mapa">Las provincias resaltadas ubican el Donbás. El control efectivo abarcaba solo partes de ellas.</div>';
 return '<div class="folio">'+etiqueta(sobre)+mapa+detalle+'</div>'+copy(p)+credito(id,laminas[id]?'Historical Basemaps · reconstrucción de referencia / Natural Earth':s.numero===10?'Natural Earth · decreto del 19 de febrero de 1954':'Natural Earth · fronteras reconocidas de Ucrania');
}
function cronista(s,p,i) {
 const a=s.numero;
 if(a===13)return lectura(p,'Memorándum de Budapest · lectura tipográfica',i?'Respetar la independencia, la soberanía y las fronteras existentes de Ucrania.':'Budapest, 5 de diciembre de 1994',i?'Síntesis en español del párrafo 1':'Memorándum de garantías de seguridad')+credito('','Rada · documento 998_158 · transcripción consultable');
 if(a===17&&i<2){
   const medidas=i?['Alto el fuego y verificación','Diálogo sobre elecciones locales']:['Alto el fuego bilateral','Seguimiento por la OSCE'];
   return '<header class="minsk-cab">'+etiqueta(p.fecha)+'<h2>'+seguro(p.titulo)+'</h2></header><div class="minsk-medidas">'+medidas.map(t=>'<span>'+t+'</span>').join('')+'</div><p class="minsk-hecho">'+seguro(p.texto)+'</p>'+eje(s,i)+credito('',i?'S/RES/2202 · anexo I, apartados 1, 3 y 4':'Protocolo del Grupo de Contacto Trilateral · apartados 1 y 2');
 }
 if(a===18&&i===2)return lectura(p,'Asamblea General · 2 marzo 2022','Agresión contra Ucrania','ES-11/1 · lectura del título oficial')+eje(s,i);
 if(a===14&&(i===0||i===2)){
 const texto=[['Praga · Varsovia · Budapest','Primera ampliación de la OTAN tras la Guerra Fría'],['Segunda vuelta','La repetición electoral de diciembre dio la victoria a Víktor Yúshchenko.'],['Bucarest · § 23','Perspectiva de adhesión futura. Ucrania seguía fuera de la Alianza.']][i];
 return '<div class="fecha-gigante">'+(i===0?'1999':'2008')+'</div>'+lectura(p,'Europa · decisiones políticas',texto[0],texto[1])+eje(s,i);
 }
 if(a===20&&(i===1||i===2)){
 const t=i===1?['Bürgenstock','Consejo de Seguridad','2024 → 2025']:['Berlín','Conversaciones futuras','20 noviembre 2026'];
 return '<div class="encuentro">'+etiqueta('Diplomacia')+'<strong>'+t[0]+'</strong><i></i><em>'+t[1]+'</em><small>'+t[2]+'</small></div>'+copy(p)+eje(s,i);
 }
 if(a===8&&i===1)return lectura(p,'Rada Central · IV Universal','República Popular Ucraniana','Enero de 1918 · lectura contextual')+eje(s,i);
 if(a===9&&i===2)return '<div class="isla">'+img('peninsula','', 'Península de Crimea')+'</div>'+copy(p)+eje(s,i)+credito('','Memoria de la deportación · resolución de la Rada 792-VIII');
 if(a===12&&i===1)return '<div class="voto">'+etiqueta('Referéndum · 1 de diciembre')+'<strong>28.804.071</strong><p>votos por el sí</p><div class="barra-voto" role="img" aria-label="De los votos por el sí y el no, el 92,26 por ciento correspondió al sí"></div><p class="no-voto">2.417.544 por el no</p><small>Base de la barra: votos por el sí y el no.</small></div>'+copy(p)+eje(s,i);
 if(a===14&&i===1)return '<div class="urna">'+etiqueta('Elecciones presidenciales')+'<b>II</b><strong>Segunda vuelta</strong><span>21 noviembre → 26 diciembre de 2004</span></div>'+copy(p)+eje(s,i);
 if(a===11)return '<div class="alianza-mapa">'+img('bloques','','Mapa comparativo de los miembros fundadores de 1949 y 1955')+'</div>'+copy(p)+eje(s,i)+credito('bloques');
 if(p.imagen==='bloques')return lectura(p,p.fecha,p.titulo,'Lectura contextual')+eje(s,i);
 return '';
}
function historiaCompuesta(s,p,i) {
 if(['geografia','medieval','imperios','crimea','territorios'].includes(s.estilo)&&p.imagen!=='dnieper'&&p.imagen!=='resolucion68')return cartografia(s,p,i);
 const propia=cronista(s,p,i);if(propia)return propia;
 const base=vistaHistorica(s,p,i);
 return base+eje(s,i);
}
