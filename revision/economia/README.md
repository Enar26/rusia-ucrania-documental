# Evaluación del Capítulo II

La portada económica heredada da paso a E01A. Desde allí, 24 estados manuales recorren diez escenas. Después de E10B, un clic abre la portada de Humanidad y la navegación hacia delante se detiene. Las flechas permiten regresar desde esa portada hasta la apertura.

[Contacto de los 24 estados](contacto.jpg) · [Capturas a 1280 × 720](1280x720) · [Fuentes consultables por estado](fuentes-por-estado.json)

## Movimiento grabado en Chromium

| Grabación | Qué se puede comprobar |
|---|---|
| [Portal y entrada](portal-y-entrada.mp4) | Dos vueltas del Bósforo y el trigo. Al pulsar Presentar, el vídeo continúa bajo el empalme con la portada. |
| [Economía completa](economia-completa.mp4) | Desde la portada II, cada pulsación mueve la cámara o revela una capa. Final en la portada III. Grabación técnica con pausas breves. |
| [De la energía a los puertos](energia-puertos.mp4) | Descenso de Europa hacia la costa del mar Negro, localización de los tres puertos, retroceso e inversión a mitad del movimiento. |
| [De Rusia al Perú](rusia-peru.mp4) | Alejamiento hasta el Atlántico y aproximación a Sudamérica en el mismo lienzo geográfico. Se repite el viaje en sentido inverso. |

## Resultados

| Comprobación | Resultado | Evidencia |
|---|---|---|
| Apertura, 71 estados históricos, 24 económicos, portada III y retroceso completo | PASS | [Recorrido integral](aceptacion.json) |
| Clic, flechas, espacio, Av Pág/Re Pág, doble clic y tecla sostenida | PASS | [Controles comprobados en Chromium](aceptacion.json) |
| Quiz, tres revelaciones de conclusión, Fuentes por estado, Esc, recarga y reanudación | PASS | [Resultados funcionales](aceptacion.json) |
| Imágenes decodificadas, tipografías locales, movimiento reducido y marco 16:9 | PASS | [Comprobaciones de composición](composicion.json) |
| Texto y gráfica a 1280 × 720, 1366 × 768, 1920 × 1080 y con bandas en 1024 × 768 | PASS | [1366 × 768](1366x768) · [1920 × 1080](1920x1080) · [1024 × 768](1024x768) |
| Ida, retroceso y cambio de sentido durante el viaje de cámara | PASS | Los píxeles del atlas en la posición de regreso coincidieron con los de partida. [Mediciones](movimiento.json) |
| Vídeo en bucle, entrada a pantalla completa y portada alternativa si falla el vídeo | PASS | 192 fotogramas a 24 fps. Cero fotogramas consecutivos idénticos, incluida la unión final. [Análisis del archivo](costura.json) · [Reproducción real](movimiento.json) |
| ZIP extraído, reproducción sin red y 96 estados sin solicitudes HTTP | PASS | HTML autocontenido cargado en memoria, con vídeo decodificado. [Prueba offline](aceptacion.json) |
| Doble clic sobre el HTML en Windows, Opera o Edge | BLOCKED | Chromium administrado rechazó la navegación local con ERR_BLOCKED_BY_ADMINISTRATOR. El equipo de clase queda por probar. |
| Cotejo directo de dos magnitudes del encargo | BLOCKED | Se mantienen los mecanismos económicos de E04B y E09A con sus referencias institucionales. |

## Criterios documentales

- **E03.** Una misma barra compara la proporción rusa en las importaciones de gas de la UE. El registro fechado en junio de 2026 confirma aproximadamente 45 % en 2021 y 13 % en 2025.
- **E04A.** La intervención de Türkiye ante la Asamblea General en 2023 sitúa en **unos 33 millones de toneladas** el volumen transportado durante la iniciativa. El registro del Centro Conjunto de Coordinación reproducido por UNCTAD llega al 17 de mayo de 2023 y suma 30.282.396 toneladas. La proyección usa el balance completo con la precisión del discurso. El mapa sitúa los puertos ucranianos. La foto de Montana ilustra el almacenamiento ferroviario y está identificada como tal. Sigue pendiente una fotografía de terminal cerealera ucraniana con licencia confirmada.
- **E04B y E09A.** La investigación entregada atribuye 111 Mt acumuladas de productos agrícolas a los corredores hasta octubre de 2026 y aproximadamente 70 % de la urea importada por el Perú a Rusia en el período estudiado por el BCRP. El acceso a los originales quedó bloqueado. Las pantallas presentan los modos de transporte y la dependencia del insumo en términos cualitativos. En Fuentes figuran la publicación de la Comisión Europea y la Nota de Estudios n.º 32 del BCRP.
- **E05.** Los valores nominales de febrero y marzo de 2022 proceden de la misma extracción del índice FAO. La observación de octubre de 2026 se cotejó con una transcripción fechada del boletín de noviembre. Son dos capturas documentales de la serie revisada. El gráfico marca observaciones discretas y muestra la base 2014–2016 = 100.
- **E08 y E09C.** La copia de la serie WEO registra −28,80 % de PIB real de Ucrania en 2022. RDNA5 estima necesidades de recuperación y reconstrucción en diez años. Para Lima, la composición de las doce tasas mensuales dio 8,45916 %, que se muestra como **8,46 %**. La pantalla identifica el alcance multicausal.

Las fichas del reproductor separan el respaldo del dato y la licencia de la imagen. Los originales cuyo acceso quedó restringido se identifican en esta revisión. Las terrazas fotografiadas por J. Thompson sitúan la agricultura peruana. El archivo de YoTuT documenta un mercado de Lima. La foto de Hostómel corresponde a abril de 2022. [Catálogo de obras y enlaces](../../fuentes.csv) · [Condiciones de reutilización](../../assets/economia/LICENCIAS.txt)

## Hallazgos de la revisión

La comprobación de los fotogramas detectó un tramo repetido al principio del primer montaje. Al normalizar el origen temporal de cada fragmento se recuperó el movimiento continuo. También se separó la cifra de E04A de los nombres de los puertos, y se colocaron los créditos fotográficos delante del sombreado. El recorte del USDA permite reconocer el tractor y la aplicación de amoníaco, aunque pierde nitidez al ocupar una pantalla de 1080p.

En Historia, la fotografía de Kiev publicada en 1909 llevó una aclaración de época en el estado medieval. Se sustituyeron la foto de Yalta en la explicación de la ocupación nazi y la foto de la manifestación reutilizada para el relevo político de 2014 por lecturas contextuales. La fotografía de protesta se conserva donde muestra participación ciudadana. La imagen urbana de Leópolis enlaza la perspectiva de Humanidad con su portada.

En la prueba de cámara a 1366 × 768 con CPU simulada cuatro veces más lenta, la mediana del intervalo entre cuadros fue de 17 ms, el percentil 95 de 33 ms y el máximo de 100 ms. Puede percibirse un tirón puntual en un equipo lento. El ensayo oral de 5 min 50 s y la prueba en el proyector físico continúan pendientes.

## Repetir las pruebas

Desde la raíz, inicia el servidor con `python3 -m http.server 8000` y extrae el HTML del ZIP. Con Chromium, Playwright y FFmpeg disponibles, estas órdenes reproducen las comprobaciones.

```sh
node tools/aceptar-economia.cjs http://localhost:8000/ Rusia-y-Ucrania-Economia.html revision/economia
node tools/grabar-economia.cjs http://localhost:8000/ revision/economia
node tools/verificar-bucle.cjs assets/cine/umbral.mp4 revision/economia/costura.json
```
