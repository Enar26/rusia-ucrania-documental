const firmasHumanas = {
  humOim:'OIM',humAcnur:'ACNUR',humServicios:'ACNUR',humDih:'CICR',
  humVictimas:'ACNUDH',humEscuela:'UNICEF',humInfancia:'UNICEF',humAlertas:'UNICEF',
  humSalud:'OMS',humApoyo:'OMS',humPlan:'OCHA',humRetorno:'ACNUR'
};
const trazosHumanos = {
  hogar:'M3 12 12 4l9 8 M5 11v10h14V11 M10 21v-7h4v7',
  agua:'M12 3C10 7 5 11 5 15a7 7 0 0 0 14 0c0-4-5-8-7-12z M8 15a4 4 0 0 0 4 4',
  luz:'M13 2 5 14h6l-1 8 9-14h-7z',
  calor:'M5 15c-4-4 3-6 0-10 M12 15c-4-4 3-6 0-10 M19 15c-4-4 3-6 0-10 M3 20h18',
  escuela:'M2 5c4-1 7 0 10 2 3-2 6-3 10-2v14c-4-1-7 0-10 2-3-2-6-3-10-2z M12 7v14',
  salud:'M9 3h6v6h6v6h-6v6H9v-6H3V9h6z',
  seguro:'M12 3l8 3v6c0 4-3 7-8 10-5-3-8-6-8-10V6z M8 12l3 3 5-6',
  trabajo:'M3 8h18v12H3z M8 8V5h8v3 M3 12c6 3 12 3 18 0',
  alimento:'M4 13h16c0 4-3 7-8 7s-8-3-8-7z M2 13h20 M7 9c-2-2 2-3 0-5 M13 9c-2-2 2-3 0-5',
  apoyo:'M3 5h18v11H10l-5 4v-4H3z M7 10h10',
  alerta:'M6 16h12l-2-3V9a4 4 0 0 0-8 0v4z M10 19a2 2 0 0 0 4 0',
  tiempo:'M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20 M12 6v6l4 2',
  rehabilitar:'M11 4a2 2 0 1 0 4 0 2 2 0 1 0-4 0 M7 12l4-4 3 1 4 4 M11 10l-2 5 4 2 1 4 M9 15l-4 6',
  medicamento:'M5 16l7-10a4 4 0 0 1 7 5l-7 10a4 4 0 0 1-7-5z M9 11l7 5'
};
function iconoHumano(id) {
  return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round"><path d="'+trazosHumanos[id]+'"/></svg>';
}
function fotoHumana(id, clase='') {
  const descripcion = piesHumanos[id] || creditos[id];
  return '<figure class="hum-foto '+clase+'">'+img(id,'',descripcion)+'<figcaption>'+seguro(creditos[id])+'</figcaption></figure>';
}
function textoHumano(p) {
  return '<div class="hum-copy"><p class="hum-fecha">'+seguro(p.fecha)+'</p><h2>'+seguro(p.titulo)+'</h2><p class="hum-bajada">'+seguro(p.texto)+'</p></div>';
}
function fichaObservacion(o) {
  return '<div class="hum-observacion"><h3>'+seguro(o.nombre)+'</h3>'+
    (o.valor?'<strong>'+seguro(o.valor)+'</strong>':'')+'<p>'+seguro(o.alcance)+'</p><small>'+seguro(o.fuente)+(o.fecha?' · '+seguro(o.fecha):'')+'</small></div>';
}
function conceptosHumanos(pares) {
  return pares.map(([id,t])=>'<div class="hum-concepto">'+iconoHumano(id)+'<span>'+seguro(t)+'</span></div>').join('');
}
function almanaqueHumano() {
  const meses = ['Septiembre','Octubre'];
  const dias = ['L','M','X','J','V','S','D'];
  const hojas = meses.map((nombre,i) => {
    const mes = 8+i;
    const primero = (new Date(Date.UTC(2026,mes,1)).getUTCDay()+6)%7;
    const ultimo = new Date(Date.UTC(2026,mes+1,0)).getUTCDate();
    const fechas = Array.from({length:ultimo},(_,n)=>'<span'+(n===0?' style="grid-column:'+(primero+1)+'"':'')+'>'+(n+1)+'</span>').join('');
    return '<section><h4>'+nombre+'</h4><div class="hum-mes">'+dias.map(d=>'<b>'+d+'</b>').join('')+fechas+'</div></section>';
  });
  return '<div class="hum-calendario" aria-label="Calendario de septiembre y octubre de 2026, sin observaciones por día">'+hojas.join('')+'</div>';
}
function escenaHumana(s,p,i) {
  const codigo=p.codigo, fuente=[...new Set(p.refs.map(k=>firmasHumanas[k]).filter(Boolean))].join(' · ');
  const foto=(clase='')=>fotoHumana(p.imagen,clase);
  const copy=textoHumano(p);
  let composicion;
  switch(codigo){
    case 'H01A': case 'H10A':
      composicion=foto('hum-paisaje')+copy;
      if(codigo==='H01A')composicion+='<div class="hum-recuerdo" aria-hidden="true">'+img('mar-negro','','Atlas del mar Negro')+'</div>';
      break;
    case 'H01B': case 'H02A': case 'H08A':
      composicion='<div class="hum-sombra-atlas"></div>'+copy+
       '<div class="hum-leyenda"><i></i><span>Ucrania · fronteras internacionalmente reconocidas</span></div>';break;
    case 'H02B':
      composicion=copy+'<div class="hum-frontera"><section><small>En el propio país</small><h3>Desplazamiento interno</h3><p>La persona se desplaza dentro de Ucrania.</p></section><section><small>En otro país</small><h3>Refugio en el extranjero</h3><p>La persona cruza una frontera internacional en busca de protección.</p></section><span>Frontera internacional</span></div>';break;
    case 'H02C':
      composicion=copy+'<div class="hum-par">'+fichaObservacion(observacionesHumanas.internos)+fichaObservacion(observacionesHumanas.refugiados)+'</div>';break;
    case 'H03A': case 'H04A': case 'H05A':
      composicion=foto('hum-lamina')+copy;break;
    case 'H03B':
      composicion=foto('hum-franja')+copy+'<div class="hum-servicios">'+conceptosHumanos([['luz','Electricidad'],['agua','Agua corriente'],['calor','Calefacción']])+'</div>';break;
    case 'H04B':{
      const casos=observacionesHumanas.victimas;
      const registro=casos?'<div class="hum-registro"><em>'+seguro(casos.fecha)+'</em><div><strong>'+seguro(casos.fallecidos)+'</strong> civiles fallecidos</div><div><strong>'+seguro(casos.heridos)+'</strong> civiles heridos</div><small>Casos verificados · ACNUDH · Ucrania</small></div>':
       '<div class="hum-registro"><em>ACNUDH · Ucrania</em><div>Casos verificados</div><small>Personas civiles fallecidas o heridas cuya situación pudo documentarse.</small></div>';
      composicion=foto('hum-tira')+copy+registro;break;
    }
    case 'H05B':
      composicion=foto('hum-franja')+copy+'<div class="hum-recuadro">'+fichaObservacion(observacionesHumanas.infancia)+'</div>';break;
    case 'H05C':{
      const alertas=observacionesHumanas.alertas;
      composicion=copy+'<div class="hum-agenda">'+(alertas?'<div class="hum-indice"><strong>'+seguro(alertas.valor)+'</strong><span>'+seguro(alertas.alcance)+'<small>'+seguro(alertas.fecha)+'</small></span></div>':'')+
        almanaqueHumano()+'<small>Calendario de referencia · 2026</small><div class="hum-jornada">'+conceptosHumanos([['escuela','Aula'],['seguro','Refugio'],['tiempo','Reanudación posible']])+'</div></div>';break;
    }
    case 'H06A':{
      const salud=observacionesHumanas.salud;
      composicion=foto('hum-lamina')+copy+(salud?'<div class="hum-dato-salud"><strong>'+seguro(salud.valor)+'</strong><span>'+seguro(salud.alcance)+'<small>'+seguro(salud.fecha)+' · OMS</small></span></div>':'');break;
    }
    case 'H06B':
      composicion=foto('hum-franja')+copy+'<div class="hum-cuidados">'+conceptosHumanos([['medicamento','Medicamentos'],['rehabilitar','Rehabilitación'],['apoyo','Apoyo psicológico']])+'</div>';break;
    case 'H07A':{
      const pares=[['alimento','Alimentación','Alimentos o transferencias'],['hogar','Alojamiento','Refugio y reparaciones'],['salud','Salud','Atención y medicamentos'],['escuela','Educación','Acceso a clases'],['seguro','Protección','Orientación y apoyo']];
      composicion=foto('hum-lamina')+copy+'<dl class="hum-respuestas">'+pares.map(([m,n,a])=>'<div><dt>'+iconoHumano(m)+seguro(n)+'</dt><dd>'+seguro(a)+'</dd></div>').join('')+'</dl>';break;
    }
    case 'H07B':{
      const a=observacionesHumanas.necesidades,b=observacionesHumanas.prioridad;
      const regla=a.millones&&b.millones?'<div class="hum-proporcion"><small>Objetivo respecto a la necesidad estimada</small><i style="width:'+100*b.millones/a.millones+'%"></i></div>':'';
      composicion=copy+'<div class="hum-par">'+fichaObservacion(a)+fichaObservacion(b)+regla+'</div>';break;
    }
    case 'H08B':
      composicion=foto('hum-lamina')+copy+'<div class="hum-regreso-servicios">'+conceptosHumanos([['seguro','Seguridad'],['hogar','Vivienda'],['escuela','Escuela'],['salud','Salud'],['trabajo','Sustento']])+'</div>';break;
    case 'H10B':
      composicion=copy+'<div class="hum-triptico">'+[['hum-hogar','Hogar'],['hum-escuela','Educación'],['hum-salud','Salud']].map(([id,t])=>'<div>'+fotoHumana(id)+'<h3>'+t+'</h3></div>').join('')+'</div>';break;
    case 'H10C':
      composicion='<div class="hum-apertura-final">'+[['atlas','Historia'],['trigo-lviv','Economía'],['hum-vida','Humanidad']].map(([id,t])=>'<div>'+img(id,'',creditos[id]||({atlas:'Mapa del mar Negro, 1911','trigo-lviv':'Campos de trigo de la región de Leópolis'})[id])+'<span>'+t+'</span></div>').join('')+'</div>'+
       '<div class="hum-copy"><p class="hum-bajada">'+seguro(p.texto)+'</p><h2>'+seguro(p.titulo)+'</h2></div>';break;
  }
  const atlas = p.camara?' eco-vista':'';
  return '<div class="humana '+codigo.toLowerCase()+atlas+'">'+composicion+
    '<header class="hum-cab"><span>Capítulo III <i>/</i> Humanidad</span><span>'+seguro(s.nombre)+'</span></header>'+
    '<div class="hum-pie"><span>'+seguro(fuente)+'</span><span>'+codigo+'<i></i>'+s.pasos.map((_,j)=>'<b class="'+(i===j?'activo':'')+'"></b>').join('')+'</span></div></div>';
}

function transicionHumana(nuevo,prev,x,dir,anim) {
  if(x.p.codigo==='H01A' && dir>0){
    const atlas=nuevo.querySelector('.hum-recuerdo');
    anim(atlas,[{opacity:.65,transform:'scale(1)'},{opacity:0,transform:'scale(1.07)'}],760);
  }
  if(x.p.codigo==='H05C'){
    nuevo.querySelectorAll('.hum-calendario section').forEach((mes,i)=>{
      anim(mes,[{opacity:0,translate:'.7cqw 0'},{opacity:0,offset:.05+i*.12},{opacity:1,translate:'0 0'}],720);
    });
  }
  const foto=nuevo.querySelector('.hum-foto'), copia=nuevo.querySelector('.hum-copy');
  const datos=nuevo.querySelector('.hum-par,.hum-agenda,.hum-registro,.hum-proporcion,.hum-recuadro');
  const fin=x.p.codigo==='H10C', dur=fin?1100:780;
  if(foto){
    if(foto.classList.contains('hum-paisaje')) {
      anim(foto,[{opacity:.15,transform:'scale(1.028)'},{opacity:1,transform:'none'}],dur);
    }else if(prev?.p.imagen!==x.p.imagen){
      anim(foto,[{clipPath:dir>0?'inset(0 13% 0 0)':'inset(0 0 0 13%)',opacity:.2},{clipPath:'inset(0)',opacity:1}],dur);
    }
  }
  if(datos)anim(datos,[{opacity:0,translate:'0 .65cqw'},{opacity:1,translate:'0 0'}],670);
  if(copia)anim(copia,[{opacity:0,translate:dir>0?'0 .8cqw':'0 -.55cqw'},{opacity:1,translate:'0 0'}],dur);
  nuevo.querySelectorAll('.hum-concepto,.hum-respuestas>div,.hum-triptico>div,.hum-apertura-final>div,.hum-frontera section').forEach((n,i)=>{
    const inicio=dir>0?i*.09:0;
    anim(n,[{opacity:0},{opacity:0,offset:inicio+.01},{opacity:1,transform:'none'}],dur);
  });
  return dur;
}
