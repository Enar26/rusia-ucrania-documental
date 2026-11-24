// Cada observación conserva su población y su propia fecha. Una ficha sin
// cifra documenta el concepto sin dibujar una escala o un porcentaje ficticio.
const observacionesHumanas = {
  internos: {nombre:'Desplazamiento interno', alcance:'Personas que han dejado su hogar y permanecen en Ucrania.', fuente:'OIM'},
  refugiados: {nombre:'Refugio en el extranjero', valor:'5,9 millones', alcance:'Personas refugiadas de Ucrania registradas en el mundo.', fecha:'Diciembre de 2025', fuente:'ACNUR'},
  infancia: {nombre:'Infancia desplazada', valor:'Más de un tercio', alcance:'De la infancia de Ucrania seguía desplazada cuatro años después de la invasión a gran escala.', fecha:'17 de febrero de 2026', fuente:'UNICEF'},
  salud: {valor:'+20 %', alcance:'Aumento de los ataques contra la atención sanitaria en Ucrania.', fecha:'2025'},
  necesidades: {nombre:'Necesidad estimada', valor:'10,8 millones', fecha:'Plan de 2026', millones:10.8, alcance:'Personas que necesitan asistencia humanitaria en Ucrania.', fuente:'OCHA'},
  prioridad: {nombre:'Población objetivo', valor:'4,1 millones', fecha:'Plan de 2026', millones:4.12, alcance:'Personas a las que el plan se propone llegar.', fuente:'OCHA'}
};

const relatosHumanos = [
  ['Detrás de cada cifra hay personas', [
    ['Járkiv · invierno de 2022–2023', 'Un árbol de Navidad en casa', 'Una familia recoge su árbol de Navidad. Entre decisiones sobre dónde vivir o cómo pasar el invierno, también importan los objetos que alguien quiere conservar.', 'humAcnur humServicios', 'hum-vida'],
    ['Ucrania', '¿Cómo cambió la vida de las personas?', 'La respuesta empieza en cada lugar que alguien ha tenido que dejar y en cada comunidad que lo recibe.', 'humOim humAcnur', 'planisferio', [32,49.1,23], 'territorioCivil']
  ]],
  ['Millones de personas desplazadas', [
    ['Desde febrero de 2022', 'Salir de casa', 'La invasión a gran escala obligó a muchas familias a buscar protección en otras partes de Ucrania o en el extranjero.', 'humOim humAcnur', 'planisferio', [27.6,49.6,41], 'vecindad'],
    ['Dos situaciones', '¿Dónde se busca protección?', 'La frontera internacional distingue las dos situaciones.', 'humOim humAcnur', 'planisferio'],
    ['Dos poblaciones', 'Cómo se cuenta el desplazamiento', 'Cada organismo observa una población y un momento. Sumar los dos registros distorsionaría la comparación.', 'humOim humAcnur', 'planisferio']
  ]],
  ['Hogares y servicios básicos', [
    ['Saltivka, Járkiv · diciembre de 2022', 'Al dejar una vivienda', 'También se pierde la cercanía de los vecinos, de la escuela y de las personas que comparten los cuidados.', 'humServicios humOim', 'hum-hogar'],
    ['Servicios esenciales', 'Pasar el invierno', 'Cuando falta electricidad pueden fallar las bombas de agua y la calefacción. El efecto depende de la red de cada localidad.', 'humServicios', 'hum-hogar']
  ]],
  ['Protección de la población civil', [
    ['Espacio civil · Ópera de Odesa, 2016', 'Proteger a la población civil', 'Las partes deben distinguir entre civiles y combatientes, y entre bienes civiles y objetivos militares. Deben tomar precauciones para evitar o reducir el daño a la población civil.', 'humDih', 'hum-civil'],
    ['Documentación de Naciones Unidas', 'El registro del daño civil', 'La misión de derechos humanos de la ONU contrasta los casos. Las dificultades de acceso y verificación pueden dejar víctimas fuera del recuento.', 'humVictimas', 'hum-civil']
  ]],
  ['Infancia y educación interrumpida', [
    ['Escuela Logos de Kiev · archivo de 2018', 'Un lugar para aprender y encontrarse', 'Esta era la entrada de la escuela antes de la invasión a gran escala. Cuando una familia se desplaza, lo que cambia incluye el camino a clase y el contacto con los compañeros.', 'humEscuela humInfancia', 'hum-escuela'],
    ['Infancia desplazada', 'Cambiar de casa, cambiar de aula', 'Para un niño desplazado, retomar las clases puede significar llegar a otra escuela, seguir a distancia o aprender en otro idioma.', 'humInfancia humEscuela', 'hum-escuela'],
    ['Tiempo escolar · Ucrania', 'Cuando suena una alerta', 'El grupo puede pasar del aula al refugio y reanudar la clase cuando cesa la alerta. Un día afectado puede incluir horas de enseñanza.', 'humAlertas humEscuela', 'hum-escuela']
  ]],
  ['Salud física y mental', [
    ['Policlínico n.º 10, Járkiv · enero de 2023', 'Mantener abierta la consulta', 'Los daños a la atención sanitaria dificultan traslados, interrumpen tratamientos y añaden presión sobre el personal que sigue atendiendo.', 'humSalud', 'hum-salud'],
    ['Continuidad de los cuidados', 'Cuidar también después', 'Recibir medicamentos, recuperar movilidad y encontrar apoyo psicológico forman parte de una misma recuperación. Cada persona puede necesitar una combinación distinta.', 'humSalud humApoyo', 'hum-salud']
  ]],
  ['Respuesta humanitaria', [
    ['Asistencia', 'De la necesidad a la respuesta', 'En Saltivka, Vitalii encontró un lugar para calentarse. El tipo de ayuda cambia según la necesidad.', 'humPlan', 'hum-ayuda'],
    ['Plan de respuesta · Ucrania, 2026', 'A quién se propone llegar', 'El plan fija una meta a partir de las necesidades. Para saber cuántas personas recibieron ayuda hay que consultar los resultados de la respuesta.', 'humPlan', 'hum-ayuda']
  ]],
  ['El difícil camino de regreso', [
    ['Retorno voluntario', '¿Se puede volver?', 'Cada familia decide si quiere y puede regresar. La seguridad y la posibilidad de vivir con dignidad condicionan esa decisión.', 'humRetorno humAcnur', 'planisferio', [30.9,49.0,29], 'retornoCivil'],
    ['Recuperación', 'Lo que hace posible quedarse', 'Una vivienda habitable es un comienzo. Para rehacer la vida cotidiana hacen falta servicios accesibles y una forma de sostener el hogar.', 'humRetorno humServicios', 'hum-regreso']
  ]]
];

function registrarRelatoHumano(numero, capitulo, nombre, filas) {
  escena(numero, 'relato-humano', nombre, filas.map(([fecha,titulo,texto,refs,medio]) => [fecha,titulo,texto,medio,refs]));
  const relato = escenas[escenas.length-1];
  relato.tono = 'humanidad';
  relato.pasos.forEach((p,i) => {
    p.codigo = 'H'+String(capitulo).padStart(2,'0')+String.fromCharCode(65+i);
    if (filas[i][5]) {
      p.camara = filas[i][5];
      p.tipo = filas[i][6];
    }
  });
}

relatosHumanos.forEach(([nombre,filas],i) => registrarRelatoHumano(39+i,i+1,nombre,filas));

function agregarConclusionHumana() {
  registrarRelatoHumano(48,10,'Conclusión del documental',[
    ['Desplazamiento', 'Lo que una familia lleva consigo', 'La distancia cambia cómo se cuida, se estudia y se trabaja. Algunas familias vuelven; otras rehacen su vida en el lugar de acogida.', 'humOim humAcnur humRetorno', 'hum-vida'],
    ['Vida cotidiana', 'Hogar, educación y salud', 'La recuperación se reconoce en cosas concretas: poder habitar una casa, continuar aprendiendo y recibir atención cuando se necesita.', 'humServicios humEscuela humSalud', 'hum-hogar'],
    ['Historia · Economía · Humanidad', 'Muchas gracias por su atención', 'Conocer el pasado y seguir sus efectos nos devuelve a las personas. Su seguridad y su dignidad dan sentido a la recuperación.', 'humRetorno humPlan', 'hum-vida']
  ]);
}
agregarConclusionHumana();
