// Fechas de situación y lectura oral. Cada paso queda quieto hasta el siguiente clic.
Object.assign(fuentes, {
  acta91: ["Acta de Independencia · Verjovna Rada, 24 de agosto de 1991","https://zakon.rada.gov.ua/laws/show/1427-12","Resolución 1427-XII. Se reproduce la segunda página de la edición de consulta en el archivo Decolonial, transcripción del documento oficial."],
  archivo91: ["Copia consultada · Acta de Independencia","https://github.com/decolonial-ist/archive/tree/5ea3b662888d722ab18046a5bb115d5c0b7dcc1e/175","Texto oficial ucraniano. Página renderizada localmente, sin simular el manuscrito."],
  archivo68: ["Copia de la resolución 68/262 · Asamblea General","https://github.com/decolonial-ist/archive/tree/5ea3b662888d722ab18046a5bb115d5c0b7dcc1e/202","Primera página de la edición inglesa del documento adoptado el 27 de marzo de 2014."],
  satelite: ["Copernicus Sentinel-2 · Bajo Dniéper, 18 de junio de 2023","https://github.com/Vante52/kakhovka-postevent-satellite-ml-classification/tree/e2ce1270e0ee86c8e533638250638271643484ce","Imagen Sentinel-2 modificada, 2023. Falso color y polígonos del estudio de S. Chitiva, V. Caycedo, S. Campos, E. Salazar y J. E. Díaz. Figura training_polygons_falsecolor, Apache 2.0. Conversión a WebP."],
  osce04: ["OSCE/ODIHR · Elección presidencial de Ucrania, 2004", "https://www.osce.org/odihr/elections/ukraine/14674", "Informe final de observación electoral, 2005."],
  bucarest: ["OTAN · Declaración de Bucarest, 3 de abril de 2008", "https://www.nato.int/cps/en/natolive/official_texts_8443.htm", "Párrafo 23. Declaración de los aliados sobre Ucrania y Georgia."],
  maidan: ["Consejo de Europa · International Advisory Panel, 2015", "https://www.coe.int/en/web/portal/international-advisory-panel", "Informe sobre las investigaciones de la violencia durante las protestas del Maidán."],
  minsk: ["Consejo de Seguridad · resolución 2202 (2015)", "https://docs.un.org/es/S/RES/2202(2015)", "El anexo reproduce el paquete de medidas para la aplicación de los acuerdos de Minsk."],
  kremlin: ["Presidencia rusa · ensayo del 12 de julio de 2021", "http://en.kremlin.ru/events/president/news/66181", "Fuente primaria del argumento histórico de Vladímir Putin. Expresa su posición política."],
  discurso: ["Comunicación de Rusia al Consejo de Seguridad · 24 de febrero de 2022", "https://docs.un.org/S/2022/154", "Incluye el discurso de Putin como anexo. Se cita para atribuir las justificaciones de la invasión."],
  onu22: ["Asamblea General · Agresión contra Ucrania, 2 de marzo de 2022", "https://docs.un.org/es/A/RES/ES-11/1", "La Asamblea deploró la agresión y exigió la retirada de las fuerzas rusas."],
  anexion: ["Asamblea General · Integridad territorial de Ucrania, octubre de 2022", "https://docs.un.org/es/A/RES/ES-11/4", "Condena los intentos de anexión de cuatro regiones."],
  cereal: ["Naciones Unidas · Iniciativa del Mar Negro", "https://www.un.org/en/black-sea-grain-initiative", "Acuerdo de julio de 2022 y fin de la participación rusa en julio de 2023."],
  suiza: ["Consejo Federal suizo · Cumbre sobre la paz en Ucrania", "https://www.eda.admin.ch/eda/en/fdfa/fdfa/aktuell/dossiers/konferenz-zum-frieden-ukraine.html", "Comunicado conjunto de Bürgenstock, 16 de junio de 2024."],
  onu25: ["Consejo de Seguridad · resolución 2774, 24 de febrero de 2025", "https://docs.un.org/es/S/RES/2774(2025)", "Llamamiento a un fin rápido del conflicto y a una paz duradera."],
  berlin: ["BBC y Deutsche Welle · reunión de Berlín, noviembre de 2026", "https://github.com/ihelfrich/worldscope/blob/6424a74b5395521d65476ebcf2fa997c4e27b725/lake/sections/foreign_news/2026-11-20/raw.jsonl", "Despachos originales de los medios en el archivo RSS del 20 de noviembre. Se cotejaron los titulares y entradillas de BBC, DW y France 24."],
  dw: ["Deutsche Welle · European leaders present united front in push for peace in Ukraine", "https://www.dw.com/en/european-leaders-present-united-front-in-push-for-peace-in-ukraine/live-79986520", "Crónica de la reunión de Berlín. Los aliados europeos solicitaron representación en las negociaciones futuras."],
  alertas: ["Registro de alertas oficiales · archivo de Vadimkin", "https://github.com/Vadimkin/ukrainian-air-raid-sirens-dataset/blob/61b78be02013d3fc3f7f875bdb2781f38d76404f/datasets/official_data_en.csv", "Consulta del CSV en UTC. El 7 de septiembre de 2026 registra avisos en los distritos de Konotop y Kamianske. Una alerta acredita un aviso de protección civil."],
});
const escenaHistorica = (id, tipo, titulo, fuentes, filas) => ({
  id, tipo, titulo, fuentes, pasos: filas.map(([fecha,titulo,texto,nota,recurso]) => paso(fecha,titulo,texto,recurso,nota)),
});
const historiaReciente = [
  escenaHistorica("elecciones","carril","¿Quién decide el rumbo?",["osce04","bucarest"],[
    ["2004","Una elección disputada","Las denuncias de fraude movilizaron a la oposición. El Tribunal Supremo ordenó repetir la segunda vuelta.","La Revolución Naranja reunió a quienes exigían que se respetara su voto. Víktor Yúshchenko ganó la repetición frente a Víktor Yanukóvich. La disputa por las reglas electorales tuvo consecuencias para quién podía orientar la política exterior."],
    ["2008","La promesa de Bucarest","Los aliados declararon que Ucrania y Georgia llegarían a ser miembros de la OTAN.","La declaración dejó abierta la cuestión del calendario. Ucrania seguía fuera de la Alianza y de su defensa colectiva. Moscú describía la ampliación como una amenaza, mientras que gobiernos vecinos la buscaban como protección."],
    ["2013","Una firma suspendida","El gobierno de Yanukóvich suspendió los preparativos del acuerdo de asociación con la Unión Europea.","Yanukóvich había llegado a la presidencia en 2010. Las presiones rusas, las relaciones comerciales y las preferencias de distintos sectores ucranianos pesaban sobre la decisión. La suspensión de noviembre trasladó el debate a la calle."],
  ]),
  escenaHistorica("maidan","plaza","La plaza se convierte en protesta",["maidan"],[
    ["Noviembre de 2013","La plaza de la Independencia","En Kiev, la protesta por el acuerdo europeo creció tras la violencia policial.","Maidán significa plaza. Estudiantes y otros manifestantes se reunieron tras la suspensión del acuerdo. La represión de finales de noviembre amplió la protesta hacia el abuso de poder y la responsabilidad de las autoridades."],
    ["Febrero de 2014","Una ruptura política","Tras jornadas de violencia mortal, Yanukóvich abandonó Kiev. El Parlamento convocó elecciones anticipadas.","Participaron grupos con proyectos distintos y la movilización tuvo apoyos desiguales. Rusia calificó el cambio de poder de golpe de Estado. Esa caracterización política no resuelve la cuestión jurídica de las fronteras ucranianas."],
  ]),
  escenaHistorica("crimea-donbas","doblefoco","Dos territorios, dos procesos",["ne","onu","archivo68","minsk"],[
    ["Marzo de 2014","Crimea","Fuerzas rusas tomaron el control de la península. Rusia anunció su anexión tras una consulta bajo ese control.","La Asamblea General afirmó la integridad territorial de Ucrania y señaló que la consulta carecía de validez para cambiar el estatus de Crimea. Distingue quién ejercía el control de qué Estado tenía soberanía reconocida.","peninsula"],
    ["27 marzo 2014","La frontera reconocida","La Asamblea General reafirmó la integridad territorial de Ucrania dentro de sus fronteras internacionalmente reconocidas.","Lee el título y la fecha de la resolución 68/262. La Asamblea subrayó que el referéndum en Crimea carecía de validez para alterar el estatus de la península. El siguiente mapa desplaza la atención al este continental.","resolucion68"],
    ["Primavera de 2014","El Donbás","Grupos armados separatistas respaldados por Rusia se enfrentaron a las fuerzas ucranianas en partes de Donetsk y Lugansk.","Aquí comenzó una guerra prolongada. Las provincias coloreadas ubican la región entera. El área ocupada cambió y nunca fue idéntica al contorno administrativo de ambas provincias.","donbas"],
    ["2014–2015","Los acuerdos de Minsk","Al alto el fuego de septiembre de 2014 le siguió un paquete de medidas en febrero de 2015.","El paquete vinculaba cese del fuego, retirada de armamento pesado, supervisión y disposiciones políticas. Las partes discrepaban sobre el orden de los pasos y los combates continuaron. Minsk trataba el conflicto en el este de Ucrania.","donbas"],
  ]),
  escenaHistorica("argumentos","testimonio","La justificación del Kremlin",["kremlin","discurso","yale","onu22"],[
    ["Julio de 2021 · Historia","Un pasado reivindicado","Putin presentó a rusos y ucranianos como un solo pueblo en un ensayo presidencial.","Es una interpretación política del pasado. Recuerda los distintos poderes que ocuparon estos territorios y el voto ucraniano de 1991. Una historia compartida no concede jurisdicción sobre un Estado vecino."],
    ["2021–2022 · Seguridad","Alianzas y fronteras","El Kremlin describió la ampliación de la OTAN como una amenaza a la seguridad rusa.","La preocupación alegada ayuda a explicar el discurso de Moscú. Los Estados que solicitaban ingresar también tomaban decisiones de seguridad propias. En febrero de 2022 Ucrania seguía sin ser miembro de la OTAN."],
    ["Febrero de 2022 · Política","Una acusación contra Kiev","Putin invocó la protección del Donbás y la llamada «desnazificación» de Ucrania.","Atribuye ambos términos al discurso presidencial ruso. La presencia de grupos ultranacionalistas no caracteriza a toda la sociedad ni demuestra las acusaciones contra el Estado ucraniano. Distingue el argumento del actor de la decisión de invadir."],
  ]),
  escenaHistorica("invasion","umbral","La invasión a gran escala",["onu22","discurso"],[
    ["24 febrero 2022","La guerra cambia de escala","Rusia lanzó una invasión a gran escala de Ucrania desde varias direcciones.","La guerra ya llevaba ocho años en el Donbás. En febrero de 2022 ciudades alejadas del frente anterior quedaron expuestas y millones de personas tuvieron que buscar seguridad. Evita confundir el comienzo de esta invasión con el origen de todo el conflicto."],
    ["2 marzo 2022","La respuesta de la Asamblea","La Asamblea General de la ONU deploró la agresión y exigió la retirada de las fuerzas rusas.","La resolución ES-11/1 identifica al Estado agresor y reafirma la soberanía de Ucrania. Permite contrastar la versión del Kremlin con la respuesta de la comunidad internacional. Su aprobación no puso fin a las hostilidades."],
  ]),
  escenaHistorica("mar-negro","carril","Territorio y negociación",["anexion","cereal","satelite"],[
    ["Julio de 2022","Un acuerdo en plena guerra","La Iniciativa del Mar Negro permitió reanudar exportaciones agrícolas desde puertos ucranianos.","La ONU y Turquía facilitaron el acuerdo. La negociación sobre un problema concreto pudo avanzar sin que hubiera un acuerdo de paz. Sitúa esos puertos en el mar Negro."],
    ["Octubre de 2022","Cuatro anexiones rechazadas","La Asamblea General condenó el intento ruso de anexionar Donetsk, Lugansk, Jersón y Zaporiyia.","Las proclamaciones rusas abarcaban territorios que sus fuerzas ni siquiera controlaban por completo. La resolución ES-11/4 pidió a los Estados que no reconocieran la alteración de las fronteras. Vuelve a separar control y soberanía."],
    ["Junio de 2023","El bajo Dniéper","La destrucción de la presa de Kajovka el 6 de junio inundó poblaciones río abajo y vació gran parte del embalse.","La toma del 18 de junio permite localizar agua y vegetación en falso color. El agua aparece oscura y la vegetación, rojiza. Los polígonos blancos delimitan muestras del estudio. Una sola imagen posterior permite situar el paisaje, pero no medir por sí sola cuánto cambió ni establecer responsabilidad.","kajovka"],
    ["Julio de 2023","Se interrumpe la iniciativa","Rusia puso fin a su participación en el acuerdo del mar Negro.","La interrupción mostró la fragilidad de un acuerdo parcial cuando continuaba la guerra. Distingue el fin de este mecanismo concreto del conjunto de la navegación y de las conversaciones diplomáticas."],
  ]),
  escenaHistorica("hasta-2026","carril","¿Qué llegó a negociarse?",["suiza","onu25","alertas","berlin","dw"],[
    ["Junio de 2024","La cumbre de Suiza","La reunión de Bürgenstock abordó seguridad nuclear, alimentos y cuestiones humanitarias.","Ucrania participó y Rusia estuvo ausente. El comunicado incluyó el intercambio de prisioneros y el regreso de menores trasladados. El encuentro definió asuntos para la diplomacia sin cerrar un tratado entre los beligerantes."],
    ["Febrero de 2025","Un llamamiento del Consejo","La resolución 2774 del Consejo de Seguridad instó a un fin rápido del conflicto y a una paz duradera.","Distingue una resolución diplomática de la firma y aplicación de un alto el fuego. El Consejo podía formular un llamamiento incluso cuando sus miembros discrepaban sobre cómo describir responsabilidades."],
    ["7 septiembre 2026","La guerra en el registro civil","El archivo de alertas consigna avisos a la población en los distritos de Konotop y Kamianske.","Son dos entradas fechadas de una recopilación de avisos oficiales. Permiten documentar la persistencia de medidas de protección civil. Una alerta por sí sola no acredita un impacto ni permite contar víctimas."],
    ["20 noviembre 2026","Berlín y la mesa de negociación","Los aliados europeos de Ucrania reunidos en Berlín pidieron participar en futuras conversaciones de paz.","Corte al 20 de noviembre. BBC informó de la posición negociadora común anunciada en Berlín y Deutsche Welle documentó la petición de representación europea. France 24 recogió el día 19 la propuesta de Macron de reabrir la cuestión de la adhesión ucraniana a la OTAN. Distingue las propuestas de los gobiernos de un acuerdo firmado."],
  ]),
  escenaHistorica("sintesis","causal","Cómo se relacionan las causas",["constitucion","bucarest","kremlin","onu","onu22"],[
    ["Memoria → legitimación","El uso político del pasado","El Kremlin convirtió una memoria compartida en argumento sobre el presente.","Recupera la Rus de Kiev como herencia medieval plural. La relación causal aquí es el uso de la historia por un dirigente contemporáneo. Un origen cultural no determina una frontera jurídica."],
    ["Seguridad → disputa","Proyectos de seguridad","La búsqueda de alianzas de Ucrania chocó con la pretensión rusa de limitar esas opciones.","Las rivalidades estratégicas influyeron en decisiones de gobiernos concretos. La sociedad ucraniana también intervino mediante elecciones y movilizaciones. Ninguna de esas tensiones hacía inevitable una invasión."],
    ["Decisión → responsabilidad","La decisión de usar la fuerza","Rusia optó por la invasión. La Asamblea General la calificó de agresión.","Diferencia las condiciones de largo plazo, las justificaciones expresadas por un actor y la responsabilidad por una decisión. Pide al público que aplique esta distinción a las tres preguntas siguientes."],
  ]),
  {id:"quiz-historia",tipo:"quiz",titulo:"Tres preguntas de historia",fuentes:["onu","bucarest","onu22"],preguntas:[
    {pregunta:"¿Qué península quedó dentro de la Ucrania independiente en 1991?",opciones:["Crimea","Kamchatka","Kola"],correcta:0,explicacion:"La transferencia interna de 1954 precedió a la independencia. La ONU reafirmó después la integridad territorial de Ucrania.",fuente:"AGNU 68/262"},
    {pregunta:"¿Qué decidió la OTAN en Bucarest en 2008?",opciones:["Admitir inmediatamente a Ucrania","Declarar una futura adhesión","Fijar una fecha de ingreso"],correcta:1,explicacion:"La declaración expresó una perspectiva de adhesión sin calendario ni defensa colectiva para Ucrania.",fuente:"Declaración de Bucarest, § 23"},
    {pregunta:"¿Qué distingue una explicación histórica de una autorización jurídica?",opciones:["El control militar otorga soberanía","Un pasado común autoriza la anexión","Las motivaciones explican decisiones sin legalizarlas"],correcta:2,explicacion:"La Asamblea General deploró la agresión de 2022 y reafirmó la soberanía ucraniana.",fuente:"AGNU ES-11/1"},
  ]},
  escenaHistorica("conclusion","cierre","Conclusión del primer expositor",["mar","constitucion","onu22"],[
    ["Conclusión · Historia","El pasado compartido deja abierta la elección del futuro.","La soberanía de Ucrania también se entiende escuchando las decisiones de su propia sociedad.","Para cerrar mi intervención, vuelvo al voto de 1991. Conocer los imperios, las alianzas y los discursos ayuda a entender las presiones sobre Ucrania. Reconocer a quienes tomaron decisiones permite explicar la guerra sin presentarla como un destino inevitable.","atlas"],
  ]),
];
capitulos[1].escenas.push(...historiaReciente, puenteEconomia[0]);
capitulos.push({id:"economia",titulo:"Capítulo II",escenas:[puenteEconomia[1]]});

const lectura = p => `<h2>${esc(p.titulo)}</h2><p>${esc(p.texto)}</p>`;
const pieHistorico = s => fig(fuentes[s.fuentes[0]][0], "Capítulo I · Historia");
Object.assign(vistas,{
  carril(s,p,i) {
    if (p.recurso === "kajovka") return `<img class="sat-foto" src="${archivo(p.recurso)}" alt="Imagen Sentinel-2 en falso color. El río aparece oscuro entre tierras de cultivo rojizas."><div class="sat-velo"></div><div class="sat-lectura">${tag("18 junio 2023 · Sentinel-2")}${lectura(p)}</div>${fig("Copernicus · falso color · polígonos de muestreo en blanco","Chitiva et al.")}`;
    return `<div class="carril-cab">${tag(s.titulo)}</div><div class="rail" style="transform:translateX(-${i*21}cqw)">${s.pasos.map((e,n)=>`<time class="${n===i?"activo":""}">${esc(e.fecha)}</time>`).join("")}</div>
      <div class="carril-lectura">${lectura(p)}</div>${pieHistorico(s)}`;
  },
  plaza(s,p,i) {
    return `<div class="plaza-fondo" aria-hidden="true">Майдан</div><div class="plaza-cab">${tag("Kiev · Plaza de la Independencia")}<time>${esc(p.fecha)}</time></div>
      <div class="plaza-lectura">${lectura(p)}</div>${pieHistorico(s)}`;
  },
  doblefoco(s,p) {
    if (p.recurso === "resolucion68") return `<img class="pagina-onu" src="${archivo(p.recurso)}" alt="Primera página de la resolución 68/262 de la Asamblea General"><div class="foco-lectura">${tag(p.fecha)}${lectura(p)}</div>${fig("Naciones Unidas · Asamblea General","A/RES/68/262")}`;
    return `<img class="foco-img" src="${mapa(p.recurso)}" alt="Localizador geográfico de ${esc(p.titulo)}"><div class="foco-sombra"></div><div class="foco-lectura">${tag(p.fecha)}${lectura(p)}</div>
      ${fig("Natural Earth · localizador actual, sin líneas de control", "Crimea y Donbás")}`;
  },
  testimonio(s,p,i) {
    return `<div class="eco-palabra" aria-hidden="true">${["Historia","Seguridad","Política"][i]}</div><div class="testimonio-cab">${tag("Argumentos del Gobierno ruso")}</div><div class="testimonio-lectura"><time>${esc(p.fecha)}</time>${lectura(p)}</div>
      ${fig(i===0?"Ensayo de Putin · julio de 2021":"Discurso de Putin · documento ONU S/2022/154","Paráfrasis atribuida")}`;
  },
  umbral(s,p,i) {
    return `<div class="umbral-fecha">${i?"02":"24"}<span>${i?"MAR":"FEB"} · 2022</span></div><div class="umbral-lectura">${tag(i?"Asamblea General de la ONU":"Ucrania · Invasión a gran escala")}${lectura(p)}</div>${pieHistorico(s)}`;
  },
  causal(s,p,i) {
    return `<div class="causal-head">${tag(s.titulo)}</div><div class="nodos">${["Memoria","Seguridad","Decisión"].map((n,k)=>`<span class="${i===k?"nodo-activo":""}">${n}</span>`).join("<i></i>")}</div><div class="causal-lectura"><small>${esc(p.fecha)}</small>${lectura(p)}</div>${fig("Síntesis del expositor · referencias en Fuentes","Historia")}`;
  },
  cierre(s,p) {
    return `<img class="cierre-foto" data-shared="atlas" src="${archivo(p.recurso)}" alt="Mapa del mar Negro publicado en 1911"><div class="cierre-velo"></div><div class="cierre-lectura">${tag(p.fecha)}${lectura(p)}</div>${fig("Mar Negro · cartografía publicada en 1911","W. E. Curtis")}`;
  }
});
