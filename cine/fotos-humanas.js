// El registro editorial de cada fotografía queda separado de las fuentes de las afirmaciones.
registrar('humanidad','webp','hum-vida hum-hogar hum-civil hum-escuela hum-salud hum-ayuda hum-regreso');
const reportajeSaltivka = 'https://texty.org.ua/d/2023/saltivka/';
const originalSaltivka = 'https://github.com/texty/project_saltivka_prod/blob/f0003efd31274d03354e0123e2efb607a8344cba/';
const originalEscuelas = 'https://github.com/texty/schools/blob/9c5edb3fa968ada722206a2a22a598670ed9978f/';
const licenciaTexty = 'Creative Commons Atribución 4.0 Internacional (CC BY 4.0). Según sus principios editoriales, TEXTY solicita enlazar el reportaje original.';
referencias.humPermisoTexty = ['TEXTY · condiciones de reproducción de sus materiales', 'https://github.com/texty/principles/blob/d292a64e446e378540fd78eb8b9c0c3b4ae6fee1/index.html#L320', licenciaTexty];
referencias.humInvierno = ['Texty y Nakypilo · Un invierno en Saltivka norte', reportajeSaltivka,
 'Reportaje de Járkiv publicado en 2023. Los pies identifican a las personas, las viviendas y el centro de apoyo.'];
referencias.humArchivoInvierno = ['Texty y Nakypilo · Pies originales en ucraniano', originalSaltivka+'index.html',
 'Edición de las redacciones conservada con las fotografías y los pies del reportaje.'];
referencias.humArchivoClinica = ['Texty y Nakypilo · ficha del policlínico municipal n.º 10',originalSaltivka+'data/damaged_building_2.geojson',
 'Entrada w89737052 del inventario de Saltivka. Registra los daños en ventanas y fachada y enlaza la fotografía.'];
referencias.humArchivoEscuelas = ['TEXTY · Escuelas de distrito en Kiev, 2018','https://texty.org.ua/d/2018/schools/',
 'Reportaje sobre inscripción escolar firmado por Yaroslava Tymoshchuk, Nadya Kelm y Mykola Dobysh.'];
referencias.humArchivoOdesa = ['Atribución del Teatro de Ópera y Ballet de Odesa',archivoUcrania+'culture.py',
 'El catálogo identifica al fotógrafo George Chernilevsky, la obra en Commons y la dedicación al dominio público.'];

const fotosHumanas = [
 ['hum-vida','Una familia recoge de su casa el árbol de Navidad.',
  'Járkiv · invierno 2022–23 · Texty / Nakypilo', originalSaltivka+'photo/MA203387.jpg',
  'Invierno de 2022–23, Saltivka norte, Járkiv','humInvierno humArchivoInvierno humPermisoTexty'],
 ['hum-hogar','Una inscripción en la fachada de un edificio residencial de Saltivka norte.',
  'Járkiv · 10 dic. 2022 · Andrii Marienko', originalSaltivka+'photo/MA203352.jpg',
  '10 de diciembre de 2022, Saltivka norte, Járkiv. Autor y fecha en los metadatos del original.','humInvierno humArchivoInvierno humPermisoTexty'],
 ['hum-civil','Fachada del Teatro de Ópera y Ballet de Odesa antes de 2022.',
  'Odesa · 2016 · George Chernilevsky', 'https://commons.wikimedia.org/wiki/File:Odessa_Opera_Theatre_2016_G1.jpg',
  '2016, Odesa, Ucrania','humArchivoOdesa','Dominio público según la ficha de la obra.'],
 ['hum-escuela','La entrada de la escuela Logos de Kiev antes de la invasión a gran escala.',
  'Kiev · reportaje de 2018 · TEXTY', originalEscuelas+'index.html',
  'Kiev, publicación de 2018. El pie original identifica la escuela Logos.','humArchivoEscuelas humPermisoTexty'],
 ['hum-salud','Ventanas cegadas y fachada del policlínico municipal n.º 10 de Járkiv.',
  'Járkiv · 18 ene. 2023 · Texty / Nakypilo', originalSaltivka+'photo/vulitsa_Metrobudbvnikiv_19_bolnitsa_%E2%84%9610',
  '18 de enero de 2023, Saltivka norte, Járkiv. Fecha de la toma en el original.','humInvierno humArchivoClinica humPermisoTexty'],
 ['hum-ayuda','Vitalii se calienta en un punto de apoyo comunitario del barrio.',
  'Járkiv · invierno 2022–23 · Texty / Nakypilo', originalSaltivka+'photo/MA207089.JPG',
  'Invierno de 2022–23, Saltivka norte, Járkiv','humInvierno humArchivoInvierno humPermisoTexty'],
 ['hum-regreso','Trabajos de reparación en uno de los edificios residenciales del barrio.',
  'Járkiv · 26 dic. 2022 · Texty / Nakypilo', originalSaltivka+'photo/DSC_8141.JPG',
  '26 de diciembre de 2022, Saltivka norte, Járkiv. Fecha en los metadatos de la imagen.','humInvierno humArchivoInvierno humPermisoTexty']
];
const piesHumanos = {};
for (const [id,pie,credito,enlace,fecha,apoyo,licencia=licenciaTexty] of fotosHumanas) {
 const ref = 'foto-'+id;
 referencias[ref] = [credito,enlace,pie];
 creditos[id] = credito;
 piesHumanos[id] = pie;
 fichaMedio[id] = [ref+' '+apoyo,fecha,licencia,'Fotografía documental. Conversión a WebP. Encuadre de proyección.'];
}
