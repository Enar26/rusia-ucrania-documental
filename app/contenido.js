/* Guion del expositor. Cada paso es un estado estable y su nota se edita aquí.
   Los capítulos futuros pueden añadir escenas y quizzes al mismo recorrido. */
const fuentes = {
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
            "La transferencia cambió la adscripción administrativa de la región dentro del mismo Estado. La silueta permite mantener fijo el lugar mientras cambia la relación institucional. La ciudad de Sebastopol tuvo un régimen administrativo particular. La transición posterior a la independencia modificará el significado jurídico de esas fronteras. Aquí termina la primera entrega.",
          ),
        ],
      },
    ],
  },
];
