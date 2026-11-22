# Revisión del documental

La aplicación parte de `3697243` y se revisó en Chromium 156.0.8078.79. El corte del relato es el 20 de noviembre de 2026. La proyección tiene 24 escenas y 71 estados manuales. El vídeo de entrada se reproduce antes de la proyección.

## Evidencia visual

| Secuencia | Grabación |
|---|---|
| Primera visita, vídeo completo e inicio por gesto | [Portal](introduccion.mp4) |
| Fallo de vídeo, consulta de créditos e inicio en ventana | [Respaldo](sin-video.mp4) |
| Portada, los cinco focos del índice y expansión del atlas | [Índice → Historia](indice-historia.mp4) |
| Último mapa imperial, retrato en planos y revolución | [Nicolás II → Petrogrado](zar-revolucion.mp4) |
| Seis cortes en ambos sentidos | [Atlas con flechas](atlas.mp4) |
| Tres preguntas, tres respuestas, conclusión, regreso y portada II | [Quiz → Economía](quiz-y-relevo.mp4) |

[Comparación V8, post-V8 y edición cinematográfica](comparacion.jpg) · [Todas las capturas por ID](estados) · [Hoja 1](hoja-1.jpg) · [Hoja 2](hoja-2.jpg) · [Hoja 3](hoja-3.jpg) · [Hoja 4](hoja-4.jpg)

## Aceptación

| ID | Estado | Comprobación y límite |
|---|---|---|
| R01 | PASS | `git merge-base 3697243 HEAD` identifica la base. Se preservan «RUSIA Y UCRANIA», «Conflicto, impacto económico y humanitario», los nombres y subtítulos de las tres perspectivas, «Capítulo I · Historia y evolución», «El origen de un conflicto», «Una historia que precede a 2014.» y «Capítulo II · Consecuencias económicas». Se verificaron las referencias remotas. |
| R02 | PASS | Tres fragmentos de movimiento real, montaje H.264 de 1280×720 y 7,6 s, sin pista de audio. La toma del Bósforo está localizada; el trigo y la vida civil llevan identificación ilustrativa. [Procedencia](../../fuentes.csv) |
| R03 | PASS | El botón adquiere protagonismo en el último plano, permite iniciar desde el principio y responde a omisión, error y movimiento reducido. Las fuentes cierran en el mismo paso. [Portal](introduccion.mp4) · [Fallo de vídeo](sin-video.mp4) |
| R04 | PASS | El sitio y la exportación usan el portal, la proyección y el diálogo de fuentes. La guía de ensayo nueva se entregó aparte. Los módulos de estudio y exportaciones anteriores siguen recuperables en la rama de partida. |
| R05 | PASS | El itinerario enlaza los antecedentes medievales, decisiones imperiales y soviéticas, agencia ucraniana, Guerra Fría, 1991, 2014, 2022 y diplomacia hasta el corte. Las razones del Kremlin se identifican por autor. [Hechos por paso](hechos.json) |
| R06 | BLOCKED | Se cotejaron las fuentes accesibles, entre ellas cifras del referéndum, resolución de 1932, decreto de 1954, procedencia de las imágenes y despachos archivados de Berlín. Quedan sin corroboración completa algunas páginas primarias externas, fechas de rodaje y autor personal de la toma del Bósforo. El catálogo declara las condiciones conocidas de las series cartográficas consultadas. [Catálogo](../../fuentes.csv) |
| R07 | PASS | Hay una ficha proyectada por cada una de las 24 escenas. En 14 y 17 las fechas, los compromisos y el orden electoral sustituyen las fotos de las reuniones. En 18 y 20 se distinguen cartografía, declaración, información de prensa y resolución. No se consiguió una fotografía acreditada de cada acontecimiento. [71 estados](estados) |
| R08 | PASS | Cinco estados detenidos. El foco vuelve a Historia antes de que la lámina se expanda durante 2,55 s. [Grabación](indice-historia.mp4) |
| R09 | PASS | Palacio de Invierno y Nicolás II se separan en profundidad; el archivo de Petrogrado introduce la revolución. La edición de 1909 identifica por separado las láminas del palacio y del zar. [Grabación](zar-revolucion.mp4) |
| R10 | PASS | Láminas fechadas de 1100, 1200, 1500, 1650 y 1783; fecha del evento en la columna narrativa. En 1954 cambia el marco administrativo con el mismo contorno físico. Las agrupaciones fundadoras de la Guerra Fría están fechadas. [1954 antes](estados/10a.jpg) · [1954 después](estados/10b.jpg) |
| R11 | PASS | Dos referencias cualitativas y cuatro observaciones agregadas por provincia. Se diferencian ocupación estimada y soberanía. Al pasar de julio de 2024 a noviembre de 2026, Donetsk cambia de intervalo. [Atlas](atlas.mp4) · [Método reproducible](../../tools/atlas_provincias.py) |
| R12 | PASS | El público responde oralmente. El mapa de 21a usa una interrogación; la respuesta y su explicación aparecen en 21b. Los tres pares se recorrieron y retrocedieron. [Secuencia](quiz-y-relevo.mp4) |
| R13 | PASS | Tres ideas del primer expositor, Historia completada, foco Economía y última portada estable tras cinco avances adicionales. [Grabación](quiz-y-relevo.mp4) |
| R14 | PASS | Flechas derecha e izquierda recorrieron los 71 estados en orden y regresaron a 01a. [IDs observados](pruebas.json) |
| R15 | PASS | Recorridos por clic primario, espacio y Av Pág. Se probó Re Pág y se comprobaron también los botones de flecha. [Pruebas](pruebas.json) |
| R16 | PASS | Doble clic, tecla sostenida, pulsaciones durante la transición, inversión de sentido y límites. Se comprobaron selección y cierre del diálogo de fuentes en cada estado. [Prueba reproducible](../../tools/aceptar-cine.cjs) |
| R17 | PASS | Gesto Presentar, salida con Escape, continuidad del paso y pantalla completa denegada. El modo ventana indica F11. [Registro](pruebas.json) |
| R18 | PASS | Se recuperaron 19d y 21b después de recargar. La reproducción comenzó con almacenamiento denegado y se mantuvo el cursor mientras se consultaba otra fuente. [Registro](pruebas.json) |
| R19 | PASS | Capturas de los 71 estados en 1280×720, recorrido en 1920×1080 y comprobación del lienzo en cuatro resoluciones. En 4:3 aparecen márgenes. [1024×768](atlas-1024.jpg) · [1366×768](atlas-1366.jpg) · [1920×1080](atlas-1920.jpg) |
| R20 | PASS | Exportación autónoma en contexto nuevo sin red, con imágenes decodificadas, tipografías cargadas y película reproducida hasta el final. Chromium administrado bloqueó el acceso directo por file://; se cargaron en el navegador los bytes del mismo archivo. [Rendimiento](rendimiento.json) · [Registro](pruebas.json) |
| R21 | PASS | Movimiento normal grabado, reducción de movimiento probada en todo el recorrido, foco accesible y estados estables. Comprobaciones de geometría, errores JS y recursos. [Capturas](estados) |
| R22 | PASS | Guion privado con locución para los 71 pasos, transiciones, 18 preguntas de preparación y recortes. Los tiempos presupuestados suman 780 segundos. El tiempo real de la exposición depende del ensayo. |
| R23 | PASS | Comparación de tres ediciones, rama revisable, exportación, grabaciones y valoración documentada. [Comparación](comparacion.jpg) |
| R24 | NOT TESTED | Quedan para el equipo escolar la prueba con mando, portátil y proyector del aula y el ensayo oral grupal. |

## Lectura del atlas

Los dos primeros estados identifican episodios documentados en Crimea y el Donbás. Para los cuatro cortes posteriores se calculó la proporción del área de cada provincia incluida en las geometrías históricas de observación, en proyección equivalente EPSG:3035. Las bandas son menos de 5 %, de 5 a menos de 50 %, de 50 a menos de 75 % y 75 % o más. Esos colores describen una provincia entera mediante un intervalo. En los dos archivos de NZZ la fuente excluía Crimea, que el cálculo restituye bajo control ruso dentro de Ucrania. El archivo rotulado 15 de noviembre identifica el día 14 como fecha de observación. Las dos fechas finales proceden de la serie DeepState archivada. La escala provincial y el cambio de fuente limitan la interpretación de diferencias pequeñas.

## Revisión editorial y visual

| Aspecto | Valoración / 5 | Observación |
|---|---:|---|
| Narrativa y causalidad | 4 | 10a–12c conecta el límite administrativo con la decisión de independencia. 17 y 18 distinguen la guerra del Donbás de la invasión a gran escala. La cronología diplomática comprime varios años. |
| Autenticidad | 4 | Los documentos de 1932, 1954, 1991 y 2014 y el retrato tienen procedencia consultable. El portal incorpora dos planos ilustrativos sin lugar confirmado. |
| Composición | 4 | Tríptico, retrato, escrutinio y mapa provincial identifican un protagonista claro. Las escenas medievales conservan una disposición parecida para facilitar la comparación. |
| Legibilidad | 4 | Se mantuvo una columna de texto separada del mapa de 1954 y se retiró el rótulo que anticipaba el quiz. Los créditos pequeños requieren comprobar distancia física. |
| Variedad | 4 | Fotoperiodismo, cartografía, edición tipográfica y cine real cumplen funciones distintas. En la secuencia diplomática predominan texto y fechas. |
| Transiciones | 4 | Se ve el viaje del atlas y el relevo de la foto de trigo. El cambio de corte provincial reemplaza la observación sin inventar una trayectoria entre fechas. |
| Control | 5 | Todas las revelaciones responden a la misma entrada manual. Las respuestas y las tres ideas del cierre se restauran al retroceder. |

El perfil de rendimiento usa Chromium a 1366×768, CPU limitada 4×, latencia de 80 ms y transferencia de 750.000 bytes/s. Los bytes de recursos completados antes del primer plano no incluyen necesariamente todo el vídeo en curso. Los tiempos de cuadro corresponden a una muestra de la primera transición. [Medición](rendimiento.json)
