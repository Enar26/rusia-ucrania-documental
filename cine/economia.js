// Cámaras: longitud y latitud del punto de interés, amplitud horizontal en grados.
// Cada fila es una parada editorial. El tiempo de una animación nunca mueve el cursor.
const capitulosEco = [
 ['Un choque que atraviesa mercados','comercio',[
  ['Mar Negro','Cuando cambian las rutas, cambian los precios','','ecoComercio',[34,44,28],'umbral'],
  ['Interdependencia','¿Cómo llega el choque hasta el Perú?','La energía, los alimentos y los pagos conectan mercados distantes.','ecoComercio ecoUrea',[-3,18,235],'mundo']]],
 ['Dos países, mercados específicos','agricultura',[
  ['Antes de febrero de 2022','¿Qué vendía cada país?','','ecoComercio ecoGas',[39,49,70],'productores'],
  ['Comercio internacional','Mercados clave, no toda la economía mundial','El peso de ambos países era especialmente importante en el comercio de trigo y aceite de girasol.','ecoComercio',[34,47,46],'mercancias']]],
 ['La energía que unía a Rusia con Europa','energia',[
  ['Unión Europea · 2021','Un proveedor dominante','Del gas importado por la UE, esta era la proporción que procedía de Rusia.','ecoGas ecoGasCopia',[14,52,79],'gasAntes'],
  ['Europa · desde 2021','La presión llegó a la industria','El gas ya se encarecía antes de la invasión. La crisis aceleró el ahorro y la búsqueda de otros suministros.','ecoEnergia ecoGas',[9,48.5,39],'industria'],
  ['Unión Europea · 2025','Cambió la mezcla de proveedores','La cuota rusa cayó. La barra conserva la misma base de comparación.','ecoGas ecoGasCopia',[17,50,76],'gasDespues']]],
 ['El mar Negro y las rutas comerciales','comercio',[
  ['Julio de 2022 – julio de 2023','Una salida por el mar Negro','La iniciativa permitió que cargamentos de alimentos volvieran a salir de tres puertos ucranianos.','ecoGrano ecoAsamblea ecoDiscurso ecoJcc',[31,46,19],'puerto'],
  ['Mayo de 2022 – octubre de 2026','Otras salidas hacia Europa','Los corredores de solidaridad combinaron ferrocarril, carretera y vías fluviales para exportar productos agrícolas.','ecoCorredores',[23,49,42],'corredores']]],
 ['Del puerto al precio de los alimentos','presion',[
  ['Marzo de 2022','El salto de los alimentos','El índice FAO reúne precios internacionales de cinco grupos de alimentos, ponderados por su comercio.','ecoFao ecoSerie',[21,40,110],'faoPico'],
  ['Marzo de 2022 y octubre de 2026','Después del máximo','Dos observaciones del índice nominal de la FAO. Cada punto representa un mes.','ecoFao ecoSerie ecoOctubre',[12,37,132],'faoDos'],
  ['Del comercio al hogar','¿Cuánto cuesta en el mercado?','El precio al por menor también incorpora transporte, tipo de cambio y costos locales.','ecoFao ecoPrecios',[9,34,128],'mercado']]],
 ['El fertilizante antes de la cosecha','agricultura',[
  ['Producción agrícola','Antes del grano está el gas','El gas natural aporta materia prima y energía para fabricar amoníaco, base de muchos fertilizantes nitrogenados.','ecoInsumos',[25,48,62],'cadena'],
  ['Decisiones de siembra','Cuando se encarece el insumo','El agricultor puede reducir la dosis. El rendimiento y el precio de los alimentos quedan expuestos a más factores.','ecoInsumos ecoUrea',[27,49,35],'abonar']]],
 ['Sanciones y sistema financiero','comercio',[
  ['Unión Europea · marzo de 2022','Una red con restricciones selectivas','La UE restringió el acceso a SWIFT de determinados bancos rusos. SWIFT transmite mensajes entre entidades.','ecoSwift ecoSancion',[23,52,109],'swift'],
  ['Desde 2022','¿Qué ocurre con las reservas?','Inmovilizar limita el uso de los activos. La titularidad y la capacidad de comerciar son cuestiones distintas.','ecoActivos ecoSancion ecoRusia',[32,51,85],'reservas']]],
 ['Dos economías, consecuencias diferentes','presion',[
  ['Ucrania · 2022','La producción se contrajo','Variación anual del producto interno bruto real, ajustado por precios.','ecoPib ecoWEO',[32,49,30],'pib'],
  ['Evaluación RDNA5 · febrero de 2026','El costo de reconstruir','Necesidades de recuperación y reconstrucción en diez años. Evaluación con datos al 31 de diciembre de 2025.','ecoRdna ecoRdnaCopia',[31,50,24],'reconstruir'],
  ['Rusia · desde 2022','El comercio buscó otros destinos','La reorientación de las ventas convivió con restricciones de financiación y de acceso a tecnología.','ecoRusia ecoSancion',[54,55,77],'rusia']]],
 ['Perú · el efecto cercano','agricultura',[
  ['Perú · BCRP, mayo de 2022','Un insumo que venía de lejos','El BCRP identificó la dependencia de las importaciones peruanas de urea procedentes de Rusia.','ecoUrea',[-75,-9,58],'peru'],
  ['Agricultura peruana','Del fertilizante al alimento','Un insumo más caro eleva los costos del cultivo. La presión sobre la oferta depende de cómo responda cada productor.','ecoUrea',[-72,-13,26],'campo'],
  ['Lima Metropolitana · 2022','¿Qué pasó con los precios?','El IPC recogió múltiples presiones sobre la canasta familiar. La cifra anual incluye factores internos y externos.','ecoIpc ecoIpcSerie',[-77.04,-12.05,21],'lima']]],
 ['Balance de 2026 · mercados y vidas','comercio',[
  ['Balance · noviembre de 2026','Los mercados se adaptan','Los costos de la guerra persisten aun cuando cambian los proveedores y las rutas.','ecoGas ecoCorredores ecoRdna',[0,25,222],'balance'],
  ['Del intercambio a la vida cotidiana','Detrás de cada cifra hay personas','','ecoRdna',[30.5,50.4,57],'civil']]]
];
capitulosEco.forEach(([nombre,tono,filas], j)=>{
 const numero=25+j;
 escena(numero,'economica',nombre,filas.map(([fecha,titulo,texto,refs])=>[fecha,titulo,texto,'planisferio',refs]));
 const escenaEco=escenas[escenas.length-1];
 escenaEco.tono=tono;
 escenaEco.pasos.forEach((p,i)=>Object.assign(p,{camara:filas[i][4],tipo:filas[i][5],
  codigo:'E'+String(j+1).padStart(2,'0')+String.fromCharCode(65+i)}));
});
escena(35,'humanidad','Consecuencias humanitarias',[['Capítulo III','Consecuencias humanitarias','','plaza-lviv','urbana']]);
