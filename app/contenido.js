/* Guion del expositor. Cada paso es un estado estable y su nota se edita aquí.
   Los capítulos futuros pueden añadir escenas y quizzes al mismo recorrido. */
const fuentes = {
  constitucion: [
    "Verjovna Rada · Constitución de Ucrania, preámbulo (1996)",
    "https://zakon.rada.gov.ua/laws/show/254%D0%BA/96-%D0%B2%D1%80",
    "El preámbulo identifica el Acta del 24 de agosto y la votación del 1 de diciembre de 1991. Fragmento cotejado con la transcripción ucraniana de la colección Ukrainian Laws in Time. Traducción propia. La composición es una lectura tipográfica.",
  ],
  diplomacia: [
    "Christopher Morrison · Office of the Historian, 2008",
    "https://github.com/HistoryAtState/rdcr/blob/e9b08f8950f184f1b5c38ecb1da208161d180eb7/articles/ukraine.xml",
    "Ficha oficial sobre Ucrania. Documenta el reconocimiento estadounidense del 25 de diciembre de 1991.",
  ],
  budapest: [
    "Memorándum de Budapest · 5 de diciembre de 1994",
    "https://zakon.rada.gov.ua/laws/show/998_158",
    "Preámbulo y párrafos 1, 2 y 6. Cotejados con la transcripción de la ficha ucraniana 998_158. Traducción del fragmento al español propia.",
  ],
  transcripcion: [
    "Transcripciones consultadas · Ukrainian Laws in Time",
    "https://github.com/skivol/ukrainian-laws-in-time/tree/1b82e6d6ad42b454605330d5e89dfe45782df546",
    "Copia de consulta de los textos de la Rada. Constitución 254к/96-ВР y memorándum 998_158. Las referencias oficiales se incluyen por separado.",
  ],
  sombreado: [
    "Natural Earth · Shaded Relief, 1:50m, versión 2.0.0",
    "https://github.com/nvkelso/natural-earth-raster/tree/master/50m_rasters/SR_50M",
    "Dominio público. Recorte del sombreado físico en la misma ventana geográfica que los vectores. El color delimita la soberanía reconocida. El relieve es una referencia física contemporánea.",
  ],
  frus: [
    "Foreign Relations of the United States · telegrama 2094, Petrogrado, 12 de diciembre de 1917",
    "https://history.state.gov/historicaldocuments/frus1918Russiav02/d771",
    "Documento 771. Francis retransmite la comunicación de Shulgin sobre la Rada. Fragmento cotejado con la edición digital oficial.",
  ],
  archivo: [
    "Esther Singleton (ed.), Russia as Seen and Described by Famous Writers, edición de 1909",
    "https://www.gutenberg.org/ebooks/19534",
    "Láminas 19, 20 y 23. Dominio público en EE. UU. Autor de las tomas sin identificar.",
  ],
  mar: [
    "William Eleroy Curtis, Around the Black Sea, 1911",
    "https://www.gutenberg.org/ebooks/64843",
    "Láminas 37 y 38 y mapa desplegable. Dominio público en EE. UU. La fecha corresponde a la edición.",
  ],
  ne: [
    "Natural Earth · cartografía física y administrativa",
    "https://github.com/nvkelso/natural-earth-vector",
    "Dominio público. Selección, proyección y rótulos propios. Ríos como referencias físicas actuales.",
  ],
  onu: [
    "Asamblea General de la ONU · Integridad territorial de Ucrania, 68/262, 2014",
    "https://docs.un.org/es/A/RES/68/262",
    "Referencia jurídica para distinguir fronteras reconocidas de control efectivo.",
  ],
  atlas: [
    "Historical Basemaps · colección de Andrej Ourednik y colaboradores",
    "https://github.com/aourednik/historical-basemaps",
    "GPL-3.0. Cortes 1100, 1200, 1500, 1650 y 1783. Recortes y colores editoriales. Contornos aproximados a escala regional.",
  ],
  yale: [
    "Yale MacMillan Center · How Ukraine’s history differs from Putin’s version",
    "https://macmillan.yale.edu/stories/how-ukraines-history-differs-putins-version",
    "Historiografía sobre la Rus y los usos actuales de su memoria.",
  ],
  oxford: [
    "Reuters Institute, Oxford · How to report on Ukraine’s history",
    "https://reutersinstitute.politics.ox.ac.uk/news/how-report-ukraines-history-guidelines-oxford-historian",
    "Orientaciones para distinguir relatos nacionales y categorías históricas.",
  ],
  pere: [
    "Internet Encyclopedia of Ukraine · Pereiaslav Treaty of 1654",
    "https://www.encyclopediaofukraine.com/display.asp?lang=en&linkpath=pages%5CP%5CE%5CPereiaslavTreatyof1654.htm",
    "Contexto del acuerdo y debate sobre su alcance.",
  ],
  plokhy: [
    "Serhii Plokhy · The Gates of Europe: A History of Ukraine, 2015",
    "",
    "Bibliografía de contraste para la estepa, el Hetmanato, el Kanato y la expansión imperial.",
  ],
  state: [
    "Internet Encyclopedia of Ukraine · Ukrainian National Republic",
    "https://www.encyclopediaofukraine.com/",
    "Consultar también Central Rada y Union of Soviet Socialist Republics.",
  ],
  crimea: [
    "Mark Kramer · Why Did Russia Give Away Crimea Sixty Years Ago?, Wilson Center, 2014",
    "https://www.wilsoncenter.org/publication/why-did-russia-give-away-crimea-sixty-years-ago",
    "Contexto institucional de la transferencia de 1954.",
  ],
  tatar: [
    "Greta Lynn Uehling · Beyond Memory: The Crimean Tatars’ Deportation and Return, 2004",
    "",
    "Investigación sobre deportación, exilio y memoria de la comunidad tártara.",
  ],
};
const paso = (fecha, titulo, texto, recurso, nota) => ({
  fecha,
  titulo,
  texto,
  recurso,
  nota,
});
const capitulos = [
  {
    id: "apertura",
    titulo: "Apertura",
    escenas: [
      {
        id: "portada",
        tipo: "portada",
        titulo: "Rusia y Ucrania",
        fuentes: ["archivo"],
        pasos: [
          paso(
            "Edición de 1909",
            "Rusia y Ucrania",
            "Conflicto, impacto económico y humanitario",
            "kiev",
            "La fotografía de la Lavra de Kiev fue publicada en 1909. La usamos para situar la mirada en una ciudad con historia propia. Presenta la pregunta de la exposición: ¿cómo se relacionan el pasado de estos territorios, las decisiones de los gobiernos y las consecuencias de la guerra para la población? Deja que la clase observe la imagen antes de avanzar.",
          ),
        ],
      },
      {
        id: "perspectivas",
        tipo: "paneles",
        titulo: "Tres perspectivas, un conflicto",
        fuentes: ["mar", "archivo"],
        pasos: [
          paso(
            "",
            "",
            "",
            "",
            "Explica el orden de las tres intervenciones. Cada clic ilumina una perspectiva. Las láminas son imágenes de archivo y las fechas de sus pies corresponden a la edición.",
          ),
          paso(
            "",
            "Historia",
            "",
            "",
            "Historia reconstruye los cambios de poder y las decisiones que ayudan a explicar cómo se llegó a la guerra. El mapa histórico procede de un atlas publicado en 1911.",
          ),
          paso(
            "",
            "Economía",
            "",
            "",
            "Economía examinará cómo se transmiten los efectos de la guerra a través de mercados, energía y alimentos, incluido el Perú. La Cámara de Comercio de Odesa representa esa perspectiva.",
          ),
          paso(
            "",
            "Humanidad",
            "",
            "",
            "La tercera intervención estudiará desplazamiento, derecho internacional y perspectivas de paz. La fotografía de una plaza de Odesa introduce la vida civil. Es una imagen histórica de la ciudad. Cede la palabra a quien expone Historia.",
          ),
        ],
      },
      {
        id: "capitulo",
        tipo: "capitulo",
        titulo: "El origen de un conflicto",
        fuentes: ["mar"],
        pasos: [
          paso(
            "Capítulo I",
            "El origen de un conflicto",
            "Historia y evolución",
            "atlas",
            "El mapa que se amplía desde el panel es una pieza de archivo publicada en 1911. Sus rótulos reflejan aquella época. En la escena siguiente cambiaremos al mapa de orientación actual para ubicar los lugares que necesitaremos durante todo el capítulo.",
          ),
        ],
      },
    ],
  },
  {
    id: "historia",
    titulo: "Historia y evolución",
    escenas: [
      {
        id: "geografia",
        tipo: "geografia",
        titulo: "Dónde ocurre todo",
        fuentes: ["ne", "onu"],
        pasos: [
          paso(
            "Europa oriental",
            "Dónde ocurre todo",
            "Entre la cuenca del Dniéper y la costa del mar Negro se sitúan los lugares de esta historia.",
            "region",
            "Pide a alguien que localice Ucrania respecto de Rusia y del mar Negro. El mapa representa la soberanía internacionalmente reconocida. Crimea aparece dentro del contorno de Ucrania. Los colores de país no describen posiciones militares.",
          ),
          paso(
            "Dos Estados vecinos",
            "Ucrania y Rusia",
            "Kiev se encuentra a orillas del Dniéper, en el norte de Ucrania.",
            "ucrania",
            "Recorre el Dniéper desde Kiev hacia el sur. El río vuelve a aparecer al hablar de la etapa medieval. Un mismo referente físico permite comparar épocas aunque cambien las entidades políticas.",
          ),
          paso(
            "La costa meridional",
            "Crimea y el mar Negro",
            "La península conecta la historia del litoral con la de sus puertos y poblaciones.",
            "peninsula",
            "Identifica la península por su forma y distingue el mar Negro del mar de Azov. El litoral facilita intercambios marítimos. Separa esa función geográfica de su estatus jurídico. Rusia ocupó y se anexionó Crimea en 2014. La ONU reafirmó la integridad territorial de Ucrania. La cronología desarrollará ese cambio en su momento.",
          ),
          paso(
            "El este de Ucrania",
            "Las regiones del Donbás",
            "Las áreas sombreadas son las provincias de Donetsk y Lugansk. Los puntos son sus capitales.",
            "donbas",
            "Donbás es una denominación histórica y económica vinculada a la cuenca del Donets. Estas dos provincias ayudan a situar los acontecimientos desde 2014. El mapa destaca límites administrativos completos. Explica por qué esos límites y las áreas bajo control de los distintos actores son conceptos diferentes.",
          ),
        ],
      },
      {
        id: "rus",
        tipo: "atlas",
        titulo: "La Rus de Kiev",
        fuentes: ["atlas", "ne", "archivo", "yale", "oxford"],
        pasos: [
          paso(
            "Siglos IX–XIII",
            "La Rus de Kiev",
            "Una red de ciudades, centros principescos y rutas fluviales.",
            "1100",
            "Invita a buscar Kiev en el Dniéper. El mapa se sitúa hacia 1100 y sintetiza una realidad que cambió durante varios siglos. La comunicación por los ríos facilitó intercambio, vínculos dinásticos y contactos religiosos. Presenta la Rus como una entidad política medieval con varios centros.",
          ),
          paso(
            "Hacia 1200",
            "Varios centros de poder",
            "Los principados adquirieron autonomía. Kiev siguió siendo una referencia política y cultural.",
            "1200",
            "Compara las dos láminas. Galicia-Volinia, Kiev y Nóvgorod ilustran la pluralidad de centros. Los tonos señalan una selección de principados. Evita leer líneas aproximadas como fronteras nacionales precisas. La fragmentación precedió a las conquistas mongolas del siglo XIII.",
          ),
          paso(
            "Memoria histórica",
            "¿Quién hereda este pasado?",
            "El legado medieval ocupa un lugar en las historias de Ucrania, Bielorrusia y Rusia.",
            "1200",
            "Distingue lo que indica el atlas de las interpretaciones posteriores. Las sociedades modernas construyen relatos distintos a partir de una herencia compartida. El parentesco cultural por sí solo no concede soberanía sobre otro Estado. Retomaremos el uso político de ese pasado al llegar a 2021.",
          ),
        ],
      },
      {
        id: "imperios",
        tipo: "imperios",
        titulo: "Territorios que cambiaron de poder",
        fuentes: ["atlas", "ne", "pere", "plokhy"],
        pasos: [
          paso(
            "Hacia 1500",
            "Un territorio, varios poderes",
            "Lituania y Polonia, Moscovia y el Kanato de Crimea organizaban espacios políticos diferentes.",
            "1500",
            "El mapa ofrece un corte temporal después de los cambios de los siglos XIV y XV. Señala la unión dinástica entre Polonia y Lituania y distingue sus instituciones. En la península, el Kanato tenía gobernantes y una sociedad tártara propios, vinculados al mundo otomano.",
          ),
          paso(
            "1654",
            "El acuerdo de Pereyáslav",
            "El Hetmanato cosaco buscó apoyo del zar en su lucha contra la Mancomunidad polaco-lituana.",
            "1650",
            "El mapa proporciona el contexto de 1650; el punto localiza la ciudad del acuerdo de 1654. Explica el levantamiento cosaco iniciado en 1648 y el interés de Bohdán Jmelnitski en conseguir protección y apoyo militar. El juramento y las negociaciones posteriores dejaron asuntos de autoridad y autonomía sujetos a interpretaciones divergentes.",
          ),
          paso(
            "Interpretación de 1654",
            "¿Alianza o subordinación?",
            "Las obligaciones del zar y el alcance de la autonomía cosaca siguen en el centro del debate histórico.",
            "1650",
            "Compara las interpretaciones de alianza, protectorado y subordinación. Pregunta quién podía decidir sobre impuestos, representación y política exterior. Las relaciones evolucionaron después del acuerdo. Evita convertir una decisión de determinados actores del siglo XVII en una cesión de la Ucrania actual.",
          ),
          paso(
            "1783",
            "La anexión de Crimea",
            "El Imperio ruso se anexionó la península después de décadas de expansión hacia el mar Negro.",
            "1783",
            "Recupera el Kanato que apareció en el primer mapa. La anexión imperial alteró el gobierno de Crimea y las condiciones de vida de la población tártara. La historia de esta comunidad continuará durante la etapa soviética. Explica la diferencia entre dominio imperial en 1783 y soberanía reconocida en el presente.",
          ),
        ],
      },
      {
        id: "sovietica",
        tipo: "archivo",
        titulo: "Ucrania en la etapa soviética",
        fuentes: ["frus", "state", "crimea", "tatar", "ne", "mar", "plokhy"],
        pasos: [
          paso(
            "1917–1921",
            "Proyectos de independencia",
            "La caída del Imperio ruso abrió una disputa por la forma de gobierno y por el territorio.",
            "telegrama",
            "Primer cuadro: estatalidad. En Kiev, la Rada Central reclamó autonomía y la República Popular Ucraniana proclamó la independencia en 1918. En las guerras posteriores compitieron varios gobiernos y fuerzas. La república soviética ucraniana se consolidó en buena parte del territorio. Lee el fragmento enviado desde Petrogrado en diciembre de 1917. Retransmite lo que un representante ucraniano comunicó sobre la Rada. El telegrama corresponde a una etapa anterior a la declaración de independencia de 1918.",
          ),
          paso(
            "1922",
            "Una república fundadora",
            "La república soviética ucraniana participó en la fundación de la URSS.",
            "union-1922",
            "Señala sus respectivas capitales de la época: Moscú, Járkiv, Minsk y Tiflis. Explica que cuatro unidades fundaron la Unión: las repúblicas soviéticas rusa, ucraniana y bielorrusa, y la Federación Transcaucásica. La república ucraniana tenía instituciones propias dentro de un sistema cuyo poder se concentraba en la dirección del partido. Sus límites de 1922 diferían de los actuales.",
          ),
          paso(
            "1944",
            "Una comunidad deportada",
            "El Estado soviético deportó en masa a los tártaros de Crimea, principalmente a Asia Central.",
            "balaklava",
            "Segundo cuadro: Crimea. Cuenta que la deportación de 1944 afectó a familias y comunidades enteras bajo una acusación colectiva de colaboración. Observa la lámina de Balaklava publicada en 1911: documenta el lugar décadas antes. La deportación supuso la pérdida de hogares y restricciones al retorno. Esta experiencia da contexto humano a una península que hasta aquí podía parecer solo una superficie coloreada.",
          ),
          paso(
            "1954",
            "Crimea cambia de república",
            "La región de Crimea pasó de la república soviética rusa a la ucraniana dentro de la URSS.",
            "crimea-1954",
            "La transferencia cambió la adscripción administrativa de la región dentro del mismo Estado. La silueta permite mantener fijo el lugar mientras cambia la relación institucional. La ciudad de Sebastopol tuvo un régimen administrativo particular. La transición posterior a la independencia modificará el significado jurídico de esas fronteras. Al avanzar, pregunta qué significado adquirió ese límite al independizarse Ucrania.",
          ),
        ],
      },
      {
        id: "independencia",
        tipo: "independencia",
        titulo: "La independencia de Ucrania",
        fuentes: ["constitucion", "diplomacia", "budapest", "transcripcion", "ne", "sombreado", "onu"],
        pasos: [
          paso("1991", "Ucrania decide", "La ciudadanía ratificó en referéndum el Acta de Independencia aprobada por el Parlamento.", "",
            "24 de agosto: el Parlamento ucraniano proclama la independencia. 1 de diciembre: la ciudadanía vota sobre esa decisión y la aprueba. Separa los dos actos y sus protagonistas. El fragmento que vemos procede del preámbulo constitucional de 1996, que recuerda la decisión popular de 1991. Lee la traducción y pregunta quién da legitimidad a la declaración."),
          paso("Diciembre de 1991", "Fronteras de un Estado", "Al disolverse la URSS, Crimea quedó dentro de las fronteras de la Ucrania independiente.", "soberania",
            "Localiza Kiev y recorre con la mirada el territorio hasta Crimea. En 1954 cambió una división interna de la URSS. En 1991 ese territorio formaba parte del Estado ucraniano que obtuvo reconocimiento internacional. Estados Unidos, por ejemplo, reconoció su independencia el 25 de diciembre. El color representa soberanía reconocida, sin representar posiciones militares ni resultados electorales regionales."),
          paso("5 de diciembre de 1994", "El compromiso de Budapest", "Rusia, Estados Unidos y el Reino Unido reafirmaron el respeto a la soberanía y a las fronteras existentes de Ucrania.", "",
            "Tras la disolución soviética quedaron armas nucleares en territorio ucraniano. El memorándum acompañó la adhesión de Ucrania al Tratado sobre la No Proliferación como Estado sin armas nucleares. El primer párrafo se refiere a independencia, soberanía y fronteras existentes. El segundo aborda la amenaza o el uso de la fuerza. El sexto prevé consultas. Explica la diferencia entre estos compromisos y una obligación automática de defensa militar colectiva, que el texto no establece. Esta distinción importará al estudiar 2014."),
        ],
      },
    ],
  },
];

// Se ensaya desde el índice hasta que estén listas la historia, el quiz y la conclusión.
const puenteEconomia = [
  {
    id: "regreso", tipo: "regreso", capitulo: "Transición de capítulo",
    titulo: "Tres perspectivas, un conflicto", fuentes: ["archivo", "mar"],
    pasos: [paso("", "Cambio de expositor", "", "", "Vista de revisión del futuro regreso tras el quiz y la conclusión de Historia. Avanza para entregar la palabra al segundo expositor.")],
  },
  {
    id: "portada-economia", tipo: "portadaEconomia", capitulo: "Capítulo II",
    titulo: "Consecuencias económicas", fuentes: ["mar"],
    pasos: [paso("", "Capítulo II", "", "", "La imagen conserva el encuadre de la Cámara de Comercio de Odesa. Aquí termina la vista de revisión.")],
  },
];
