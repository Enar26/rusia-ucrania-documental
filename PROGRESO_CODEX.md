# Progreso del documental

- **Etapa 1 lista para revisión.** La rama local `etapa-1-documental` parte de `main` en `4ce54c5` y contiene la apertura, las escenas históricas 4–7, las notas por paso y el motor de navegación. La última sesión recuperó estos archivos del árbol de trabajo y cerró la escena 7.
- **Escena 7.** La secuencia conecta los proyectos de estatalidad, la fundación de la URSS, la deportación de 1944 y la transferencia de 1954. Se precisaron los rótulos del localizador de 1922 y la denominación de la RSFS de Rusia. El telegrama de 1917 se cotejó con FRUS. La fotografía de Balaklava procede de una edición de 1911 y el mapa de 1954 es un localizador físico. Véase el [catálogo de fuentes y consultas pendientes](fuentes.csv).
- **Verificación.** Chromium comprobó avance por clic y teclado, retroceso entre 6 y 7 y dentro de la 7, tecla sostenida, notas, pantalla completa y la escena 7 en la exportación sin red. Los cuatro pasos se revisaron a 1280×720, 1920×1080 y 1366×768. [Captura de 1922](revision/1280x720/7-sovietica.jpg) · [Captura de 1954](revision/1280x720/transferencia.jpg) · [Comparación de apertura y geografía](revision/comparacion.jpg).
- **Prueba y continuación.** Servir `index.html` desde un servidor estático o generar el HTML autónomo con `python tools/exportar.py salida.html`. Queda pendiente el cotejo directo de las referencias externas indicadas en el catálogo y la prueba con un mando físico. Tras revisar esta entrega, la siguiente escena es la 8, dedicada a la independencia y a los compromisos de seguridad de 1991–1994, según V6.

## Revisión artística V7

- Recuperados los avances de `48f7818` e incorporado `origin/main` en `360886d` a la rama local `revision-artistica-v7`. La siguiente escena del recorrido principal era la 8.
- **Escena 8, 1991–1994.** El público distingue la declaración parlamentaria del voto popular, localiza Crimea dentro de Ucrania y lee la cláusula de Budapest sobre las fronteras. Cada clic tiene notas y fuentes. Se cotejaron el preámbulo constitucional de 1996 y el memorándum en transcripciones ucranianas, y el reconocimiento estadounidense en la edición del Office of the Historian. Quedan pendientes una fotografía licenciada del referéndum y el cotejo con los originales firmados.
- **Ensayo del cambio de expositor.** Desde el índice, «Ensayar el regreso a Economía» abre los tres paneles. Un clic amplía la fotografía de la Cámara de Comercio de Odesa (edición de 1911) hasta la portada del capítulo II. El ensayo es accesible también mediante `#revision-economia`. La escena histórica abre directamente con `#independencia`. El enlace definitivo al ensayo corresponde al futuro final del capítulo, después del quiz y la conclusión.
- **Tres defectos observados.** Las fotografías remotas de V2.1 quedaron vacías en este entorno. El nuevo puente conserva su composición y emplea copias acreditadas locales. La base cartográfica incluía divisiones actuales ajenas a 1991. La lámina aísla la frontera de Ucrania sobre relieve Natural Earth. El zoom duplicaba la fachada durante el movimiento. Ahora una sola fotografía cambia de encuadre hasta que entra el título. [Comparación visual](revision/v7/comparacion.jpg) · [Movimiento grabado en Chromium](revision/v7/puente-economia.mp4).
- **Pruebas.** Chromium recorrió los 24 estados históricos y de apertura en ambos sentidos y en el HTML autónomo sin red. Se comprobó el paso 1954 → 1991, pausa, cambios rápidos de sentido, fuentes, notas, pantalla completa, teclado, controles y movimiento reducido. El puente se probó por separado, incluida la vuelta al documental. Capturas de [1920×1080](revision/v7/1920x1080), [1280×720](revision/v7/1280x720) y [1366×768](revision/v7/1366x768). Mando físico y proyección en aula pendientes.
- **Siguiente entrega.** Escena 9, con una cronología de 2004, 2008 y 2013–2014 sustentada en fotografías fechadas y el documento de Bucarest. Después siguen Crimea, Donbás, la invasión de 2022 y la evolución hasta el corte de noviembre de 2026. Faltan síntesis, quiz, conclusión y ensayo cronometrado de los 20 minutos.

## Entrega V8 · Capítulo I

Rama `capitulo-historico-v8`, construida a partir de V7 `3165f9e` y las instrucciones de `origin/main` en `7349572`. El recorrido principal contiene 20 escenas y 58 pasos. La conclusión conduce directamente al panel de Historia, al relevo con Economía y a la portada II.

[HTML autónomo](descargas/Documental-V8.html) · [Tres capturas de Chromium](revision/v8) · [Catálogo de fuentes](fuentes.csv).

El corte del 20/11/2026 se sustenta en despachos de BBC y Deutsche Welle sobre la reunión de Berlín y la posición europea ante futuras conversaciones. Se cotejaron las entradillas en la captura RSS fechada. El registro de septiembre procede del CSV de avisos oficiales. El Acta de 1991 se muestra en edición de consulta y el informe del ACNUDH documenta la represión del Maidán. No se consiguió confirmar la licencia de la foto de la protesta localizada.

Una ronda de Chromium comprobó todos los estados hacia delante y atrás tanto en la web como en el HTML sin red, las tres preguntas, recursos, notas y créditos. Se probaron pantalla completa, movimiento reducido, pausa y las dos transiciones del relevo. Reproducir con `node tools/revisar-v8.cjs URL descargas/Documental-V8.html revision/v8`. Quedan para el aula la duración oral efectiva y la prueba con mando y proyector físicos.

## Rediseño posterior a V8

Rama `redisenio-documental-post-v8`, desde `e66a010`. Menú, reproductor, guion y fuentes por paso. La nueva escena del fin imperial y cuatro cortes territoriales amplían la V8 a 21 escenas y 63 pasos. La proyección termina en la portada de Economía. [Instrucciones de uso](README.md) · [Pruebas y comparación](revision/post-v8/REVISION.md)

## Reconstrucción cinematográfica desde 3697243

Rama `reconstruccion-documental-cine-2026`. El recorrido contiene 24 escenas y 71 estados y termina en la portada del Capítulo II. Se comprobó la continuidad del portal, las cinco secuencias prioritarias y la exportación sin red. La guía de estudio está en la entrega privada. [Matriz R01–R24 y evidencias](revision/cine/README.md)

## Capítulo II · Consecuencias económicas

La rama `revision-capitulo-economia-v3` parte de `c9ede76`. Se recuperaron sin commit el montaje de entrada, los 24 estados, el atlas y los primeros gráficos. La entrega integra y comprueba el flujo completo de 96 estados, con Fuentes por paso y cierre estable en la portada de Humanidad. Se corrigió una repetición de fotogramas en el montaje y se sustituyó la imagen del centro comercial. El ZIP incluye todos los medios para el aula. Quedan pendientes el cotejo de dos cifras, una foto de terminal ucraniana y la prueba por doble clic en el equipo de exposición. [Evaluación, capturas y películas](revision/economia/README.md)

## Humanidad y cierre de las tres perspectivas

Rama `revision-tres-capitulos-humanidad`, base económica `7e6ba82`. Se recuperaron las escenas y los quizzes que estaban sin commit. La edición integra los 27 estados humanitarios, el quiz y la conclusión económicos y el portal con vídeo documental ucraniano de 10,56 segundos. Se comprobó el recorrido de 132 estados hacia delante y atrás en Chromium y con el HTML extraído del ZIP sin red. Las cifras sin cotejo y los límites de la prueba en el aula figuran en la revisión. [Entrega y evidencias](revision/humanidad/README.md)

## Interfaz web final

Rama `interfaz-web-final` a partir de `1bab09b`. Portal con primera vuelta real, menú por capítulo, índices de escenas, modo cine, archivo y cola de navegación. El sitio y el ZIP reutilizan los 132 estados. [Preparación del despliegue](docs/publicacion.md)
