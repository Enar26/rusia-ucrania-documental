// El cursor recorre estados completos. Cada escena conserva su número editorial.
const escenas = [];
function escena(numero, estilo, nombre, pasos) {
  escenas.push({numero, estilo, nombre, pasos:pasos.map(([fecha,titulo,texto,imagen,refs]) =>
    ({fecha,titulo,texto,imagen,refs:refs.split(' ')}))});
}
const perspectivas=[
  ['Historia','Origen y evolución','atlas'],
  ['Economía','Intercambios y recursos','trigo'],
  ['Humanidad','Vida civil y paz','plaza-lviv']
];
const foco=[-1,0,1,2,0];
escena(2,'indice','Tres perspectivas, un conflicto',foco.map(i=>['Apertura','Tres perspectivas, un conflicto',i<0?'':perspectivas[i][0],'atlas','mar trigo urbana']));
escena(7,'retrato','El zar abdica',[
 ['1914–1917','Un imperio bajo presión','La guerra mundial agravó la escasez y la crisis de autoridad del zar.','nicolas','zar palacio revolucion petrogrado'],
 ['Marzo de 1917','El zar abdica','La revolución acabó con la monarquía. En Petrogrado y en Kiev se abrió la disputa por el poder.','nicolas','zar palacio revolucion frus']
]);
escena(19,'atlas','Atlas de una guerra prolongada',[
 ['Marzo de 2014','La península','Rusia pasó a controlar Crimea. La Asamblea General reafirmó las fronteras de Ucrania.','region-2014','ne onu'],
 ['2015–2021','Dos situaciones distintas','Crimea siguió bajo control ruso. En partes del Donbás actuaron las entidades separatistas respaldadas por Rusia.','region-2015-21','ne onu minsk'],
 ['30 marzo 2022','La invasión alcanza el norte','La ocupación afectó también sectores de provincias del norte, incluida la de Kiev.','region-2022-03-30','ne control-2022-03-30 onu22'],
 ['14 noviembre 2022','El peso vuelve al este y al sur','La comparación con marzo muestra la retirada rusa de las provincias del norte.','region-2022-11-15','ne control-2022-11-15 anexion'],
 ['10 julio 2024','Un arco meridional','La ocupación alcanzaba partes de las provincias continentales junto al mar de Azov y la península de Crimea.','region-20240710','ne control-20240710 onu'],
 ['20 noviembre 2026','El territorio al corte','En Donetsk, la proporción provincial estimada pasó del intervalo 50–74 % al de 75 % o más. La frontera reconocida sigue siendo la misma.','region-20261120','ne control-20261120 onu']
]);
const preguntas=[
 {pregunta:'¿Qué península localizamos al sur de Ucrania?',opciones:['Anatolia','Crimea','Balcanes'],correcta:1,respuesta:'Crimea se adentra en el mar Negro. En 1991 quedó dentro de las fronteras de Ucrania.',imagen:'peninsula',refs:'ne onu'},
 {pregunta:'¿Qué secuencia respeta la cronología?',opciones:['Independencia · Crimea · invasión a gran escala','Crimea · independencia · invasión a gran escala','Independencia · invasión a gran escala · Crimea'],correcta:0,respuesta:'Ucrania declaró su independencia en 1991. La anexión rusa de Crimea data de 2014 y la invasión a gran escala comenzó en 2022.',imagen:'acta1991',refs:'acta91 onu onu22'},
 {pregunta:'¿Qué permite concluir la herencia de la Rus de Kiev?',opciones:['Que la frontera de 1991 fue la misma que la medieval','Que solo un Estado puede heredar aquella cultura','Que varias sociedades comparten parte de su historia'],correcta:2,respuesta:'Un pasado relacionado ayuda a entender las memorias actuales. La soberanía contemporánea se examina en su propio marco jurídico.',imagen:'1100',refs:'yale onu'}
];
escena(21,'preguntas','Tres preguntas de historia',preguntas.flatMap((q,i)=>[false,true].map(r=>['Pregunta '+(i+1)+' de 3',q.pregunta,r?q.respuesta:'',q.imagen,q.refs])));
escena(22,'cierre','Conclusión del primer expositor',[
 ['Memoria','Un pasado, varias historias','La Rus dejó herencias compartidas. En 1991 la sociedad ucraniana decidió su futuro político.','dnieper','archivo constitucion yale'],
 ['Decisiones','La guerra tuvo autores','Las tensiones de seguridad ayudan a explicar el contexto. Invadir en 2022 fue una decisión del Gobierno ruso.','dnieper','archivo discurso onu22'],
 ['Soberanía','Comprender abre una pregunta','A mi juicio, una salida duradera exige escuchar a quienes viven con las consecuencias y tomar en serio su soberanía.','dnieper','archivo onu22 onu25']
]);
escena(23,'regreso','Tres perspectivas, un conflicto',[['Historia completada','Tres perspectivas, un conflicto','Historia','atlas','mar trigo urbana'],['Cambio de expositor','Tres perspectivas, un conflicto','Economía','trigo','mar trigo urbana']]);
escena(24,'economia','Consecuencias económicas',[['Capítulo II','Consecuencias económicas','','trigo','trigo']]);
