// Las preguntas comparten el cursor del documental. Elegir una opción nunca lo mueve.
const quizEconomico = [
 {
  pregunta:'¿Qué representaba el 45 % del gas ruso en 2021?',
  opciones:['La proporción rusa de toda la energía consumida en la UE.','La proporción rusa del gas que importaba la UE.'],
  correcta:1, respuesta:'De cada 100 unidades de gas importadas por la Unión Europea, unas 45 procedían de Rusia.',
  tema:'Gas y energía', referencias:'ecoGas ecoGasCopia', grafica:'gas'
 },
 {
  pregunta:'¿Qué función cumple SWIFT?',
  opciones:['Transmitir mensajes financieros entre instituciones.','Fijar el tipo de cambio de las transferencias.'],
  correcta:0, respuesta:'Los bancos utilizan mensajes normalizados para enviarse instrucciones de pago.',
  tema:'Sistema financiero', referencias:'ecoSwift ecoSancion', grafica:'mensajes'
 },
 {
  pregunta:'¿Toda la inflación peruana de 2022 fue causada por la guerra?',
  opciones:['Sí. El conflicto explica por sí solo la subida.','No. Intervinieron factores internos y externos.'],
  correcta:1, respuesta:'Al choque internacional de energía y alimentos se sumaron costos de transporte y condiciones del mercado peruano.',
  tema:'Precios en el Perú', referencias:'ecoIpc ecoUrea', imagen:'lima', pie:'Mercado del centro de Lima, Perú.'
 }
];
const quizHumanitario = [
 {
  pregunta:'¿Qué diferencia hay entre una persona refugiada y una desplazada interna?',
  opciones:['Solo la persona refugiada cruza una frontera internacional.','Ambas tienen que salir de su país.'],
  correcta:0, respuesta:'Quien busca protección en otro país ha cruzado una frontera. El desplazamiento interno ocurre dentro del propio país.',
  tema:'Desplazamiento', referencias:'humAcnur humOim', grafica:'frontera'
 },
 {
  pregunta:'¿Que 10,8 millones de personas necesiten ayuda significa que todas fueron atendidas?',
  opciones:['Sí. La estimación cuenta la ayuda ya entregada.','No. Identifica necesidades que persisten.'],
  correcta:1, respuesta:'En Ucrania, el plan de 2026 estimó 10,8 millones de personas con necesidades y fijó una meta de 4,1 millones. La atención efectiva se mide por separado.',
  tema:'Respuesta humanitaria', referencias:'humPlan', grafica:'plan'
 },
 {
  pregunta:'¿Por qué no basta con reconstruir una vivienda para el regreso de una familia?',
  opciones:['Porque también hacen falta seguridad, servicios y medios de vida.','Porque una casa habitable garantiza el acceso a esos servicios.'],
  correcta:0, respuesta:'Una familia necesita poder desplazarse con seguridad, atender su salud, estudiar y sostenerse.',
  tema:'Retorno voluntario', referencias:'humRetorno', imagen:'plaza-lviv', pie:'Plaza del Mercado de Leópolis, Ucrania.'
 }
];
function registrarConsulta(numero,nombre,preguntas,codigos){
 const pasos=preguntas.flatMap((q,n)=>['Pregunta','Respuesta'].map(tipo=>[
  tipo+' '+(n+1)+' de '+preguntas.length,q.pregunta,'',q.imagen||'',q.referencias
 ]));
 escena(numero,'consulta',nombre,pasos);
 const s=escenas[escenas.length-1];
 s.preguntas=preguntas;
 s.pasos.forEach((p,i)=>p.codigo=codigos[i]);
}
registrarConsulta(35,'Quiz económico',quizEconomico,['EQ1A','EQ1B','EQ2A','EQ2B','EQ3A','EQ3B']);
registrarConsulta(47,'Quiz humanitario',quizHumanitario,['H09A','H09B','H09C','H09D','H09E','H09F']);
const balancesEco=[
 ['Un sistema conectado','Energía, comercio y finanzas','El precio del gas llega al campo a través del fertilizante. El grano necesita transporte y los exportadores necesitan cobrar.','trigo-lviv','ecoInsumos ecoComercio ecoSwift'],
 ['Después del choque','Los mercados se adaptaron','Cambiar de proveedor o de ruta alivió algunas presiones. En Ucrania siguieron haciendo falta inversiones para reconstruir.','hangar','ecoCorredores ecoRdna'],
 ['De los mercados a los hogares','Detrás de cada cifra hay personas','¿Qué cambia para una familia cuando sube el precio de los alimentos o deja de llegar un servicio?','plaza-lviv','ecoPrecios ecoRdna']
];
escena(36,'balance-economico','Conclusión económica',balancesEco);
escenas[escenas.length-1].pasos.forEach((p,i)=>p.codigo='EC'+(i+1));

const seleccionesConsulta=new Map();
function marcarOpcion(boton,{p}){
 if(boton.closest('.sale'))return;
 seleccionesConsulta.set(p.codigo,Number(boton.dataset.opcion));
 boton.closest('.consulta-opciones').querySelectorAll('button').forEach(b=>{
   b.setAttribute('aria-pressed',String(b===boton));
 });
}
function figuraConsulta(q){
 if(q.imagen)return img(q.imagen,'',q.pie)+'<figcaption>'+seguro(q.pie)+'</figcaption>';
 if(q.grafica==='gas')return '<div class="consulta-porcentaje"><strong>45<small> %</small></strong><span>2021</span><i></i></div>';
 if(q.grafica==='mensajes')return '<div class="consulta-swift"><span>SWIFT</span><div aria-hidden="true"><i></i><b>⇄</b><i></i></div></div>';
 if(q.grafica==='frontera')return img('region','consulta-region','Mapa de referencia de Ucrania y su entorno')+'<figcaption>Ucrania y sus vecinos · Natural Earth</figcaption>';
 return '<div class="consulta-plan"><span>Plan humanitario</span><strong>2026</strong><i></i></div>';
}
function vistaConsulta(s,p,i){
 const n=Math.floor(i/2),revelada=i%2===1,q=s.preguntas[n],clave=s.pasos[2*n].codigo;
 const clase=s.numero===47?'hum':'eco';
 const opciones=q.opciones.map((t,j)=>{
   const letra='<span class="consulta-letra">'+String.fromCharCode(65+j)+'</span>';
   if(revelada)return '<li class="'+(j===q.correcta?'correcta':'')+'">'+letra+'<span>'+seguro(t)+'</span></li>';
   return '<li><button data-opcion="'+j+'" aria-pressed="'+(seleccionesConsulta.get(clave)===j)+'">'+letra+'<span>'+seguro(t)+'</span></button></li>';
 }).join('');
 return '<div class="consulta-edicion '+clase+'"><figure class="consulta-figura grafica-'+(q.grafica||'foto')+'">'+figuraConsulta(q)+'</figure>'+
 '<div class="consulta-columna"><p class="consulta-cap">'+seguro(s.nombre)+' <span>·</span> '+seguro(p.fecha)+'</p><h2>'+seguro(q.pregunta)+'</h2>'+
 '<ol class="consulta-opciones '+(revelada?'resuelta':'')+'">'+opciones+'</ol>'+
 (revelada?'<p class="consulta-explicacion"><strong>Respuesta '+String.fromCharCode(65+q.correcta)+'</strong> '+seguro(q.respuesta)+'</p>':'<p class="consulta-indicacion">Puedes elegir una opción. Avanza para revelar la respuesta.</p>')+
 '</div></div>';
}
function vistaBalance(p,i){
 const pies=['Campo de trigo en la región de Leópolis, Ucrania.','Hangar de Hostómel, Ucrania · abril de 2022.','Plaza del Mercado de Leópolis, Ucrania.'];
 return '<div class="balance-plano balance-'+i+'"><figure>'+img(p.imagen,'',pies[i])+'<figcaption>'+seguro(pies[i])+'</figcaption></figure>'+
 '<div class="balance-palabra"><p class="consulta-cap">Conclusión económica <span>·</span> '+(i+1)+' / 3</p><h2>'+seguro(p.titulo)+'</h2><p>'+seguro(p.texto)+'</p></div></div>';
}
