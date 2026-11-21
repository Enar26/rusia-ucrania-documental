// Los cortes se insertan en su lugar cronológico y se pueden comparar desde el mapa.
const cortes = [
  {escena:"invasion", insertar:2, fecha:"30 marzo 2022", corto:"Mar 2022", archivo:"2022-03-30", titulo:"La ocupación en el norte", texto:"A finales de marzo, la ocupación rusa se extendía también por sectores del norte de Ucrania.", nota:"Busca Kiev y distingue la capital de las celdas próximas. La ocupación alrededor de la ciudad no equivale a la toma de Kiev. Este es un corte regional de la primera fase de la invasión."},
  {escena:"mar-negro", insertar:2, fecha:"14 noviembre 2022", corto:"Nov 2022", archivo:"2022-11-15", titulo:"Cambia el mapa de la ocupación", texto:"En noviembre, el control ruso se concentraba en partes del este y el sur, además de Crimea.", nota:"Compara con marzo. Las zonas del norte ya no tienen la misma extensión. El archivo del día 15 identifica el 14 como fecha de observación. Las proclamaciones rusas de octubre abarcaban una superficie distinta de la que efectivamente controlaba."},
  {escena:"hasta-2026", insertar:1, fecha:"10 julio 2024", corto:"Jul 2024", archivo:"20240710", titulo:"El este y el sur", texto:"La ocupación seguía abarcando Crimea y partes del territorio continental, conectadas por la costa del mar de Azov.", nota:"El mapa cambia de fuente en este corte. DeepState estima control de hecho. La costa ayuda a ubicar la continuidad territorial a esta escala. Compara configuraciones grandes, pues las diferencias pequeñas también dependen de los criterios de cada fuente."},
  {escena:"hasta-2026", insertar:5, fecha:"20 noviembre 2026", corto:"Nov 2026", archivo:"20261120", titulo:"El territorio al cierre", texto:"El corte del 20 de noviembre sitúa la ocupación estimada en el este y el sur del país, incluida Crimea.", nota:"Lee la fecha antes que el color. La cuadrícula sintetiza el control estimado a escala regional. El mapa no indica qué parte aceptaría cada gobierno en una negociación. Ese es el vínculo con la reunión de Berlín y la distinción entre una posición política y un acuerdo."}
];
const raizNzz = "https://github.com/conflict-investigations/nzz-maps/blob/a9689651280700df0ad80d82856b8c24392e8006/data/";
const raizDeep = "https://github.com/cyterat/deepstate-map-data/blob/ef1738328633f827e9e0996c8f0b7b64846dd78a/data/deepstatemap_data_";
const bloqueHistoria = capitulos.find(c => c.id === "historia");
for (const [indice,corte] of cortes.entries()) {
  const origen = indice < 2 ? "NZZ · Liveuamap" : "DeepState · archivo de cyterat";
  const id = "control-" + corte.archivo;
  fuentes[id] = [origen + " · " + corte.fecha, indice < 2 ? raizNzz + corte.archivo + ".json" : raizDeep + corte.archivo + ".geojson",
    "Consulta del corte el 20/11/2026. Síntesis propia sobre base Natural Earth (dominio público). Celdas equivalentes de 65 km en EPSG:3035, recortadas a Ucrania. Ocre si al menos la mitad del área terrestre de la celda figura ocupada. NZZ excluye Crimea, restituida como territorio ucraniano bajo control ruso. Sin interpolación entre fechas."];
  const escena = bloqueHistoria.escenas.find(s=>s.id===corte.escena);
  escena.fuentes.push(id);
  escena.pasos.splice(corte.insertar,0,{...paso(corte.fecha,corte.titulo,corte.texto,id,corte.nota),corte:indice, fuentes:[id,"ne","onu"]});
}
function vistaCorte(p) {
  const i=p.corte;
  return `<div class="atlas-control"><div class="cut-head">${tag("Atlas territorial")}<span>Ucrania · escala regional</span></div>
  <div class="cut-copy"><time>${esc(p.fecha)}</time><h2>${esc(p.titulo)}</h2><p>${esc(p.texto)}</p></div>
  <figure><img src="${mapa(p.recurso)}" alt="${esc(p.texto)}"><figcaption><i></i> Control ruso estimado <span>—</span> Frontera reconocida</figcaption></figure>
  <div class="cut-dates" role="group" aria-label="Comparar cortes históricos">${cortes.map((c,n)=>`<button data-corte="${n}" aria-pressed="${i===n}">${esc(c.corto)}</button>`).join("")}</div>
  ${fig((i<2?"NZZ / Liveuamap":"DeepState") + " · Natural Earth","Celdas de 65 km · mayoría de superficie")}</div>`;
}
fuentes.zar=["Esther Singleton (ed.) · The Tsar Nicholas, lámina 37","https://github.com/GITenberg/RussiaAs-Seen-and-Described-by-Famous-Writers_19534/blob/master/19534-h/images/fig037.jpg","Publicada en 1909. Autor de la toma y fecha de exposición sin identificar. Dominio público en EE. UU. Fuente Gutenberg 19534. Recorte de la silueta con transparencia; perspectiva editorial."];
fuentes.revolucion=["Office of the Historian · The United States, the Russian Revolution and the Soviet Union","https://history.state.gov/milestones/1914-1920/russian-rev","Contexto de la caída de Nicolás II en marzo de 1917 y el gobierno provisional."];
bloqueHistoria.escenas.splice(bloqueHistoria.escenas.findIndex(s=>s.id==="sovietica"),0,{
  id:"fin-imperial", tipo:"retrato", titulo:"El fin del poder imperial", fuentes:["zar","revolucion","frus"],
  pasos:[paso("Marzo de 1917","El zar abdica","La caída de Nicolás II abrió la disputa sobre quién podía gobernar los territorios del antiguo imperio.","nicolas","En esta lámina publicada en 1909 aún vemos al soberano de un imperio. En marzo de 1917 abdicó. La caída de la monarquía abrió una cuestión concreta en Kiev: ¿quién podía hablar en nombre de Ucrania? En la siguiente escena veremos a la Rada reclamar ese papel.")]
});
vistas.retrato=(s,p)=>`<div class="portrait-set"><div class="portrait-field"></div><img src="${archivo("nicolas")}" alt="Retrato de Nicolás II publicado en 1909"></div><div class="portrait-copy">${tag("Del imperio a la revolución")}<time>${esc(p.fecha)}</time><h2>${esc(p.titulo)}</h2><p>${esc(p.texto)}</p></div>${fig("Nicolás II · edición de 1909", "E. Singleton · lámina 37")}`;
