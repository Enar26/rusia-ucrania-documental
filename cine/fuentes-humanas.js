// La fecha de observación figura en la ficha aunque la publicación sea posterior.
const referenciasHumanitarias = {
  humAcnur: [
    'ACNUR · Ukraine Refugee Situation, Population Movements, ficha n.º 3, mayo de 2026',
    'https://github.com/kikeacosta/ukraine_conflict/blob/832c86af62300c534055d2790db35824117294b0/data_input/migration/references/unhcr_2026_population_movements_factsheet_3.pdf',
    'Documento de ACNUR, p. 4. Al cierre de diciembre de 2025 se estimaban 5,9 millones de personas refugiadas de Ucrania registradas en el mundo. La fecha de publicación es mayo de 2026. La serie procede de registros de países de acogida y tiene salvedades de cobertura. En la p. 1, los cruces fronterizos cuentan movimientos y una persona puede cruzar varias veces.'
  ],
  humOim: [
    'OIM · Ukraine Displacement Data: IDP Estimates, Displacement Tracking Matrix',
    'https://data.humdata.org/dataset/ukraine-idp-estimates',
    'Seguimiento de personas que permanecen desplazadas dentro de Ucrania. Una estimación por encuesta y un registro administrativo utilizan métodos distintos. No se proyecta una estimación nacional fechada en agosto de 2026 sin cotejar la ronda correspondiente.'
  ],
  humServicios: [
    'ACNUR · servicios esenciales en entrevistas de seguimiento fronterizo, ficha n.º 3, p. 1',
    'https://github.com/kikeacosta/ukraine_conflict/blob/832c86af62300c534055d2790db35824117294b0/data_input/migration/references/unhcr_2026_population_movements_factsheet_3.pdf',
    'Publicación de mayo de 2026. Personas entrevistadas a su salida de Ucrania a partir de octubre de 2025 citaron problemas de electricidad, calefacción y agua. Es un testimonio agregado de las personas encuestadas. Las condiciones varían entre hogares y localidades.'
  ],
  humDih: [
    'CICR · Protocolo adicional I a los Convenios de Ginebra, artículo 51',
    'https://ihl-databases.icrc.org/en/ihl-treaties/api-1977/article-51',
    'La población civil y las personas civiles gozan de protección general frente a los peligros de las operaciones militares. El artículo 51 prohíbe los ataques dirigidos contra civiles y los ataques indiscriminados. Los artículos 48 y 57 tratan la distinción y las precauciones.'
  ],
  humVictimas: [
    'ACNUDH · serie mensual Protection of Civilians in Armed Conflict',
    'https://ukraine.ohchr.org/en/reports/protection-of-civilians',
    'La misión contrasta los casos individualmente y actualiza las cifras cuando obtiene nueva información. La cobertura es incompleta. El registro de personas fallecidas y heridas constituye un mínimo documentado. Falta cotejar el total de enero a octubre de 2026 en la edición original de octubre.'
  ],
  humEscuela: [
    'UNICEF Ucrania · Educación',
    'https://www.unicef.org/ukraine/en/education',
    'Apoyo a la continuidad educativa, el aprendizaje a distancia y los espacios de aprendizaje. Las experiencias escolares varían según la localidad y la situación familiar.'
  ],
  humInfancia: [
    'UNICEF · More than a third of Ukraine’s children remain displaced four years into war, 17 de febrero de 2026',
    'https://www.unicef.org/press-releases/more-third-ukraines-children-remain-displaced-four-years-war-unicef',
    'La publicación identifica a la infancia desplazada y permite hablar de más de un tercio. El registro de ReliefWeb 4198888 reproduce el título y la autoría. Se distingue el desplazamiento dentro de Ucrania de la búsqueda de protección fuera del país.'
  ],
  humAlertas: [
    'UNICEF Ucrania · informes de situación humanitaria',
    'https://www.unicef.org/ukraine/en/reports',
    'El calendario de aprendizaje explica cómo se interrumpe una jornada. Una alerta puede afectar parte de un día con clases. No se muestra una tasa si faltan la cobertura y la definición de la observación.'
  ],
  humSalud: [
    'OMS · Attacks on Ukraine’s health care increased by 20% in 2025, 23 de febrero de 2026',
    'https://www.who.int/news/item/23-02-2026-attacks-on-ukraine-s-health-care-increased-by-20-in-2025',
    'Registro de la publicación oficial OMS en ReliefWeb 4199764. Variación anual del número de ataques a la atención sanitaria en Ucrania durante 2025. El indicador mide ataques al sistema sanitario, una categoría que puede incluir personal, transporte, instalaciones y otros recursos.'
  ],
  humApoyo: [
    'OMS Europa · respuesta sanitaria en Ucrania',
    'https://www.who.int/europe/emergencies/situations/ukraine-emergency',
    'Continuidad de la atención, acceso a medicamentos, rehabilitación y salud mental. La escena ilustra posibles necesidades de pacientes, sin formular un diagnóstico individual ni generalizarlo a toda la población.'
  ],
  humPlan: [
    'OCHA · Global Humanitarian Overview 2026, tabla oficial de población por plan',
    'https://github.com/UN-OCHA/gho-prioritized-tracker-BDU/blob/7ec1c5df6914c4da1455f8f0a59725e05c87bd8c/people_data.csv#L20',
    'Plan de Ucrania 2026. La fila Ukraine consigna 10.800.000 personas con necesidades (people_in_need), 4.120.000 como población objetivo (people_targeted) y 3.580.000 en la selección más estrecha (people_prioritized). Las dos primeras se redondean a 10,8 y 4,1 millones. Ninguno de estos campos mide personas efectivamente atendidas.'
  ],
  humRetorno: [
    'ACNUR · Ukraine Refugee Situation, Population Movements, ficha n.º 3, pp. 2, 3 y 5',
    'https://github.com/kikeacosta/ukraine_conflict/blob/832c86af62300c534055d2790db35824117294b0/data_input/migration/references/unhcr_2026_population_movements_factsheet_3.pdf',
    'Las visitas y los cruces repetidos no establecen un retorno duradero. Las decisiones deben ser voluntarias e informadas. Entre las razones mencionadas para los retornos figuran los vínculos familiares. Se distinguen las decisiones del hogar y las condiciones que hacen sostenible el regreso.'
  ]
};
Object.assign(referencias, referenciasHumanitarias);
