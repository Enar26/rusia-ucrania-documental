const baseHistoria='https://github.com/openstax/osbooks-world-history/blob/c0dd82697bc2c7cd355c942e778f215762768c43/';
const basePolitica='https://github.com/openstax/osbooks-introduction-political-science/blob/61afbf50d27ba833feb64b66ba06a5384e9f371c/';
const gida='https://github.com/GITenberg/RussiaAs-Seen-and-Described-by-Famous-Writers_19534/blob/master/19534-h/';
Object.assign(referencias,{
 bosforo:['Estambul · estrecho del Bósforo, Pexels 28800680','https://www.pexels.com/video/28800680/','Metraje de contexto geográfico. Licencia Pexels. Fecha de toma y autor personal sin identificar en la ficha de la copia. Montaje y corrección de color.'],
 puertoFicha:['Procedencia del metraje del Bósforo','https://github.com/KhudorKhan/istanbul-smartcity-os/blob/d3b6578237084ecc10ef3e07b75ed5285aa7f925/README.md#license','La ficha separa la licencia Pexels de la licencia del código e identifica el vídeo original.'],
 trigo:['†reny aleksa · Golden wheat field swaying in the breeze','https://www.pexels.com/video/golden-wheat-field-swaying-in-the-breeze-30178060/','Pexels License. Fragmento en sentido normal y fotograma del trigo. Lugar y fecha de toma sin documentar. Ilustración de la actividad agrícola.'],
 trigoFicha:['Créditos del fragmento de trigo','https://github.com/gevasaf/mindfulness-action-26/blob/9f45b84ff795d260a4aa3c40f74d7e8674ed30c3/site/about.html','Identifica a la autora y la página original. El montaje escolar usa el tramo de avance.'],
 vida:['Joshua Santos · People spending time inside a mall','https://www.pexels.com/video/people-spending-time-inside-a-mall-2985409/','Pexels License. Movimiento cotidiano en un espacio civil. Fecha y localidad de toma sin confirmar. Contexto ilustrativo; el montaje no atribuye identidades o experiencias bélicas a estas personas.'],
 vidaFicha:['Ficha de la copia del plano civil','https://github.com/mefake10000-debug/ADLabs-dev/blob/5de866f0e4adfb88472a0bf48bb8744722257b8f/data/sample_videos/SOURCES.md','Identifica a Joshua Santos, el vídeo 2985409 y la transcodificación de la copia.'],
 plaza:['Ivan Bandura · Students are shouting out for the EU',basePolitica+'modules/m00001/index.cnxml','Manifestación europeísta en Kiev. Flickr, CC BY 2.0. Copia de OpenStax, encuadre y conversión WebP. Fecha exacta de la toma sin confirmar.'],
 palacio:['El Palacio de Invierno, San Petersburgo · lámina 27',gida+'images/fig027.jpg','Edición E. Singleton, 1909. Fotógrafo sin identificar. Dominio público en EE. UU. Fondo del montaje con el zar.'],
 petrogrado:['Manifestación de febrero en Petrogrado · 1917',baseHistoria+'modules/m00032/index.cnxml','Foto de archivo publicada por socialist.memo.ru, dominio público según la ficha de OpenStax. Foto de la revolución y contexto de la caída imperial.'],
 hambre:['OpenStax · The Soviet Union under Stalin',baseHistoria+'modules/m00023/index.cnxml','Colectivización, requisas, hambre en Ucrania y Holodomor. Se prescinde de una cifra de mortalidad sin un denominador y ámbito precisos.'],
 yalta:['NARA · Churchill, Roosevelt y Stalin en Yalta · febrero de 1945',baseHistoria+'modules/m00048/index.cnxml','Archivo Nacional estadounidense. Dominio público. Imagen de la reunión en Crimea; se usa también para situar el período anterior a las alianzas de posguerra.'],
 decreto:['Presídium del Sóviet Supremo · decreto de 19 de febrero de 1954','https://github.com/decolonial-ist/archive/tree/5ea3b662888d722ab18046a5bb115d5c0b7dcc1e/169','Edición de consulta del texto oficial soviético sobre la transferencia de Crimea. Primera página renderizada, identificada como edición de lectura.'],
 fria:['OpenStax · La división política de Europa',baseHistoria+'modules/m00048/index.cnxml','Posguerra y formación del orden bipolar. Complemento a los textos de las alianzas.'],
 otan:['Tratado del Atlántico Norte · 4 de abril de 1949','https://www.nato.int/cps/en/natohq/official_texts_17120.htm','Texto fundacional. El artículo 5 desarrolla el principio de defensa colectiva.'],
 varsovia:['Office of the Historian · The Warsaw Treaty Organization, 1955','https://history.state.gov/milestones/1953-1960/warsaw-treaty','Creación en 1955 y disolución en 1991.'],
 ingreso:['OTAN · Ampliación y artículo 10','https://www.nato.int/cps/en/natohq/topics_49212.htm','Adhesión en 1999 de Polonia, Hungría y la República Checa. La declaración de Bucarest se cita por separado.'],
 repop:['IV Universal de la Rada Central, enero de 1918','https://zakon.rada.gov.ua/laws/show/n0001300-18','Declaración de independencia de la República Popular Ucraniana, en medio de proyectos políticos rivales.'],
 voto:['Comisión de Helsinki de EE. UU. · informe de observación del referéndum del 1 de diciembre de 1991','https://www.csce.gov/publications/ukraines-referendum-independence-and-presidential-election/','Observación internacional del referéndum de independencia. La consulta se distingue de la declaración aprobada en agosto.'],
 estatuto:['Resolución ES-11/1 · preámbulo y párrafos 2–5','https://docs.un.org/es/A/RES/ES-11/1','Distingue el reconocimiento ruso del 21 de febrero de 2022 de la invasión a gran escala del día 24.'],
 coleccion:['Pexels · condiciones de uso','https://www.pexels.com/license/','Montaje educativo con material transformado en contexto. Los audiovisuales conservan sus propias condiciones.']
});
const medios = {};
function registrar(grupo,ext,nombres){ for(const n of nombres.split(' ')) medios[n]='assets/'+grupo+'/'+n+'.'+ext; }
registrar('archivo','webp','atlas nicolas acta1991 resolucion68 dnieper kiev maidan-informe kajovka');
registrar('mapas','svg','1100 1200 1500 1650 1783 region ucrania soberania donbas peninsula union-1922 crimea-1954');
registrar('cine','webp','invierno petrogrado yalta decreto trigo vida bosforo plaza');
registrar('cine','svg','region-2014 region-2015-21 region-2022-03-30 region-2022-11-15 region-20240710 region-20261120');
medios.umbral='assets/cine/umbral.mp4';
const ruta = id=>globalThis.integrados?.[medios[id]] || './'+medios[id];
const creditos={
 atlas:'W. E. Curtis · mapa del mar Negro, ed. 1911',nicolas:'Esther Singleton, ed. 1909 · lámina 37',invierno:'Palacio de Invierno · ed. Singleton, 1909',
 plaza:'Kiev · I. Bandura / CC BY 2.0',petrogrado:'Petrogrado, 1917 · dominio público',yalta:'Yalta, febrero de 1945 · NARA',decreto:'Decreto de 1954 · edición de consulta',
 trigo:'Trigo · †reny aleksa / Pexels',vida:'Escena civil ilustrativa · J. Santos / Pexels',bosforo:'Bósforo, Estambul · Pexels 28800680',dnieper:'El Dniéper en Kiev · ed. Singleton, 1909',kiev:'Lavra de Kiev · ed. Singleton, 1909',acta1991:'Rada · Acta de 1991, edición de consulta',resolucion68:'ONU · A/RES/68/262', 'maidan-informe':'ACNUDH · informe de junio de 2014',kajovka:'Copernicus Sentinel-2 modificado · junio de 2023'
};
registrar('cine','webp','bloques manifiesto');
creditos.bloques='Miembros fundadores, 1949 y 1955 · OpenStax';
creditos.manifiesto='Manifiesto imperial de 1783 · edición de consulta';
Object.assign(referencias,{
 mapaFrio:['OpenStax · Miembros fundadores de las alianzas, 1949 y 1955',baseHistoria+'modules/m00033/index.cnxml','World History, volumen 2. Base de Maciej Jaros (dominio público), composición de OpenStax CC BY-NC-SA 4.0. Conversión de formato bajo la misma licencia. El verde distingue a China, fuera de las dos agrupaciones.'],
 imp1783:['Manifiesto imperial de anexión de Crimea · 1783','https://github.com/decolonial-ist/archive/tree/5ea3b662888d722ab18046a5bb115d5c0b7dcc1e/148','Acto imperial en edición de lectura de la colección de fuentes.'],
 leyHambre:['Rada de Ucrania · Ley sobre el Holodomor de 1932–1933','https://zakon.rada.gov.ua/laws/show/376-16','Ley de memoria de 28 de noviembre de 2006. El estudio de las políticas y de la hambruna remite a OpenStax.'],
 bando:['Grzegorz Rossoliński-Liebe · Stepan Bandera: The Life and Afterlife of a Ukrainian Nationalist','https://cup.columbia.edu/book/stepan-bandera-the-life-and-afterlife-of-a-ukrainian-nationalist/9783838206844/','Estudio sobre OUN, nacionalismo radical y políticas de memoria. La atribución colectiva a la Ucrania contemporánea carece de fundamento.'],
 tatLey:['Rada · Reconocimiento de la deportación del pueblo tártaro de Crimea, resolución 792-VIII','https://zakon.rada.gov.ua/laws/show/792-19','Resolución de memoria de 12 de noviembre de 2015 sobre la deportación soviética de mayo de 1944.']
});
referencias.plokhy[1]='https://search.worldcat.org/search?q=Serhii+Plokhy+The+Gates+of+Europe';referencias.tatar[1]='https://search.worldcat.org/search?q=Greta+Uehling+Beyond+Memory';
referencias.protocolo=['OSCE · Protocolo de Minsk, 5 de septiembre de 2014','https://www.osce.org/home/123257','Documento del Grupo de Contacto Trilateral que precedió al paquete de medidas de febrero de 2015.'];
referencias.informe19=['ACNUDH · informes periódicos sobre los derechos humanos en Ucrania','https://www.ohchr.org/en/countries/ukraine','Documentación periódica sobre el conflicto desde 2014. Alcance temporal del paso 2016–2021.'];

registrar('cine','webp','requisas');
registrar('cine','svg','orientacion quiz-peninsula crimea-rusa');
creditos.requisas='6 diciembre 1932 · edición de lectura de la resolución soviética';
referencias.requisas=['Gobierno soviético ucraniano y comité central del partido · 6 diciembre 1932','https://github.com/decolonial-ist/archive/tree/5ea3b662888d722ab18046a5bb115d5c0b7dcc1e/239','Resolución que incluyó aldeas en listas de castigo por las entregas de grano. Documento oficial en edición de consulta, primera página.'];
const fichaMedio={
 atlas:['mar','1911','Dominio público en EE. UU.','Detalle de mapa impreso'],
 nicolas:['zar','Edición de 1909','Dominio público en EE. UU.','Recorte de silueta con alfa'],
 kiev:['archivo','Edición de 1909','Dominio público en EE. UU.','Copia WebP'],
 dnieper:['archivo','Edición de 1909','Dominio público en EE. UU.','Recorte y conversión WebP'],
 acta1991:['archivo91','24 agosto 1991','Texto oficial ucraniano; edición de consulta','Página renderizada'],
 resolucion68:['archivo68','27 marzo 2014','Documento oficial ONU; atribución de la edición','Página renderizada'],
 'maidan-informe':['ohchr14','15 junio 2014','Documento público del ACNUDH, fragmento atribuido','Recorte del párrafo 24'],
 kajovka:['satelite','18 junio 2023','Copernicus Sentinel-2 modificado; Apache 2.0 para la figura','Falso color en la figura del estudio; WebP'],
 invierno:['palacio','Edición de 1909','Dominio público en EE. UU.','Lámina 27 convertida en plano de fondo'],
 plaza:['plaza','Fecha exacta de toma pendiente','CC BY 2.0','Reencuadre y conversión WebP de la copia de OpenStax'],
 yalta:['yalta','4–11 febrero 1945','Dominio público, NARA','Conversión WebP'],
 petrogrado:['petrogrado','Revolución de febrero de 1917','Dominio público según crédito de OpenStax','Conversión WebP'],
 trigo:['trigo','Toma sin fechar','Pexels License','Fotograma de secuencia real, uso ilustrativo'],
 bosforo:['bosforo','Toma sin fechar','Pexels License','Fotograma del estrecho'],
 vida:['vida','Toma sin fechar','Pexels License','Fotograma del plano civil'],
 decreto:['decreto','19 febrero 1954','Texto oficial soviético; edición de consulta','Primera página en WebP'],
 requisas:['requisas','6 diciembre 1932','Texto oficial soviético; edición de consulta','Página renderizada'],
 manifiesto:['imp1783','1783','Texto oficial; edición de consulta','Primera página en WebP'],
 bloques:['mapaFrio','Datos de 1949 y 1955','OpenStax CC BY-NC-SA 4.0; base de dominio público','Conversión WebP con la misma licencia'],
 umbral:['bosforo trigo vida','Fechas de rodaje sin especificar','Pexels License por sus tres planos','Selección, montaje de 7,6 s, ajuste tonal y supresión del sonido']
};
referencias.escrutinio=['Centre for Democracy Studies Aarau · Referendum Database, registro ua011991','https://github.com/zdaarau/rdb/blob/02ba3f1ca68ff9cb2841f8dd250b36a12040815c/data-raw/backups/rdb.rds','Consulta del registro 5bbbf32692a21351232e24af. Ucrania, 1 diciembre 1991. Votos por el sí: 28.804.071; por el no: 2.417.544. La barra compara únicamente ambas respuestas. El registro no desglosa votos en blanco o inválidos.'];
for (const id of Object.keys(medios)) {
 if (fichaMedio[id]) continue;
 const historico=['1100','1200','1500','1650','1783'].includes(id);
 const corte=cortesFuente(id);
 fichaMedio[id]=historico?['atlas ne',id,'Historical Basemaps, GPL-3.0; Natural Earth, dominio público','Selección, proyección y rótulos']:
 corte?[corte,'Fecha indicada en la ficha','Base Natural Earth de dominio público; ver atribución de la observación consultada','Generalización provincial; línea internacional fija']:
 ['ne'+(id==='soberania'?' sombreado':''),'Geografía física; período indicado en la escena','Natural Earth, dominio público','Localizador editorial; proyección, rotulación y realce de la región'];
}
function cortesFuente(id){
 if(id==='region-2014')return 'ne onu';
 if(id==='region-2015-21')return 'ne onu minsk';
 if(id.startsWith('region-'))return 'ne control-'+id.slice(7);
}
