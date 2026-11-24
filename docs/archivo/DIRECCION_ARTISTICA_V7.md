# DIRECCIÓN ARTÍSTICA V7 · Rusia y Ucrania — documental interactivo

**Estado:** guía visual prioritaria para rediseño; no reemplaza investigación histórica ni licencia de materiales. El prototipo V2.1 es la referencia estética más apreciada por el usuario. V3 y cualquier implementación poco convincente son contraejemplos, no diseños a copiar. Este documento actualiza los criterios visuales de AGENTS.md y V4–V6 si difieren.

## 0. Qué resultado queremos

**NO**: PowerPoint convencional con fondo azul y tres cajas numeradas; interfaz de videojuego, dashboard o plantilla SaaS; texto pequeño; fotos aleatorias; transiciones con el mismo fade/slide; ornamento 3D sin función; videos de guerra impactantes; secuencias que avancen sin permiso; IA que simule fotografías históricas.

**SÍ**: Documental editorial de calidad, sobrio, memorable, humano y preciso. Un espectador que mira desde el fondo del salón comprende el relato con una mirada. Una idea central por estado visual. La cámara se mueve porque cambia la geografía, el período o la interpretación, no para lucir un efecto.

**Referencia emocional**: V2.1 abre con portada fotográfica dramática, serif editorial, el titular «RUSIA Y UCRANIA», tres tarjetas Historia / Economía / Humanidad, y una tarjeta que se expande hacia el capítulo. Mantener su identidad; mejorarla solo si la comparación visual justifica el cambio.

## 1. Identidad gráfica y composición

- **Base cromática** extraída de V2.1: carbón #090D13, azul-negruzco #121B27, hueso #F4EFE6, oro viejo #C4A47B; grises desaturados. El oro debe orientar la mirada, no llenar superficies. No usar un bloque azul o degradado idéntico en todas las escenas.
- **Tipografía**: títulos elegantes de carácter editorial (Cormorant Garamond o alternativa serif con licencia local); textos y leyendas con sans clara (DM Sans o similar). Diferenciar titulares, fechas, mapas y fuentes con jerarquía, no con decenas de etiquetas.
- **Tamaños orientativos para un lienzo 1920 × 1080**: título principal 78–122 px, títulos de escena 60–88 px, palabra-frase foco 36–52 px, texto explicativo 27–36 px, etiquetas y créditos 16–22 px. Ajustar a la longitud real y comprobar en 1280 × 720 y proyector; nunca confiar en 8–11 px como contenido legible.
- **Aire**: márgenes de seguridad de 5–7 %; máximo 2 zonas de atención simultánea; un recurso visual dominante (a menudo 60–80 % de la escena), sin fijar todas las escenas a una cuadrícula 53/47.
- **Textura**: capas discretas y creíbles (grano leve, papel de archivo con moderación, sombra de fotografía y máscaras de luz); evitar brillos de neón, tarjetas redondeadas por doquier y globos decorativos.
- **Geografía**: usar mapas auténticos, georreferenciados o atlas con fecha y límites revisados. No dibujar fronteras históricas inventadas. Distinguir ciudad vs óblast, soberanía reconocida vs control de facto. La procedencia y fechas deben permanecer disponibles, con créditos discretos pero legibles.
- **Fotografía**: archivo real, con sujeto/fecha/fuente/autor/licencia. Preferir una foto poderosa por estado a un collage saturado. Reencuadrar respetando contexto. No usar captura de video de creadores externos como recurso final sin derechos. No imágenes gráficas.

## 2. Sistema de movimiento: vocabulario limitado pero expresivo

1. **Zoom geográfico orientado**: Europa → Ucrania → Crimea/Donbás manteniendo puntos de referencia y leyenda fija. Un zoom lleva al siguiente *lugar*, no a un número.
2. **Atlas / cambio de época**: sostener la base geográfica, cambiar capas territoriales y fecha tras pausa; no interpolar fronteras de períodos para los que no hay datos.
3. **Documento editorial**: acercar una fecha/título/firma identificable con máscara y luz; texto explicativo entra en pocas palabras. Mostrar documento real, no falsificación.
4. **Archivo fotográfico**: foto a gran formato; leve parallax y cambio de encuadre; siguiente imagen se relaciona por espacio/fecha; no slideshow automático.
5. **Línea de tiempo espacial**: eje o carril de fechas que se mueve solo al cambiar de acontecimiento; las imágenes y mapas cambian con la fecha. Evitar 10 miniaturas simultáneas.
6. **Diagrama causal**: conexiones creadas por relaciones verbales, no cinco tarjetas sin interacción semántica.
7. **Transformación entre capítulos (hero/shared-element)**: volver al hub «TRES PERSPECTIVAS, UN CONFLICTO» después del quiz y conclusión; Historia figura completada, Economía se ilumina; su propia fotografía se expande hacia «CAPÍTULO II — CONSECUENCIAS ECONÓMICAS». No repetir simplemente el wipe inicial.

La tecnología es libre si el resultado es sólido. Evaluar GSAP Flip o View Transitions para elementos compartidos, con fallback y pruebas reales:
- https://gsap.com/docs/v3/Plugins/Flip/
- https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API

**Ritmo sugerido, NO rígido**: aparición 0,35–0,8 s; movimiento de cámara/atlas 1–2,4 s; hub → capítulo 1,8–2,7 s; microinteracciones 0,18–0,4 s. Al finalizar, la escena debe permanecer quieta para explicar. Cada paso por clic/teclado; retroceso restaura posiciones y contenido, no solo hace reverse de un fade. Respetar reducción de movimiento.

## 3. Storyboard artístico: decisiones POR MOMENTO, no plantilla única

| Momento | Layout principal | Transición con significado | Prohibición específica |
|---|---|---|---|
| 1 Portada | Fotografía real amplia, velo oscuro, gran titular serif y subtítulo limpio | Aparición editorial en capas, slow push sutil | Collage bélico sensacionalista, fecha “2014–2026” |
| 2 Tres perspectivas | Tres fotografías verticales distintas; solo una toma protagonismo al clic | Luces que despiertan paneles; sin salto de layout | Tres tarjetas de software corporativo |
| 3 Cap. I | Tarjeta Historia crece a gran atlas lateral con título protagonista | Transformación espacial lenta, similar V2.1 pero más refinada | Wipe genérico |
| 4 Geografía | Mapa verificado casi completo, leyenda y etiquetas ancladas | Cámara viaja Europa→Ucrania→Crimea→Donbás; pausa entre focos | 53/47 y tres viñetas |
| 5 Rus de Kiev | Atlas medieval de fecha legible en gran formato; ciudad y río reconocibles | Cambio de escala geográfica; breve *eco* documental de 2021 claramente identificado como adelanto, luego regresar al año medieval | Confundir la Rus con Rusia moderna |
| 6 Cosacos/Imperios | Atlas a doble exposición de épocas + detalle de documento de Pereyáslav | Las capas reemplazan fronteras con etiquetas «1654», «1783» y explicación de cambios | Mapa inventado o excesivo texto |
| 7 Etapa soviética | Archivo fotográfico/doc. auténtico, un lienzo diferente del mapa; se puede desdoblar | Cortes de archivo con match-cut de fecha; luego comparación de Crimea 1954 | Comprimir 1917–1954 en un único card de tres puntos |
| 8 Independencia | Declaración/referéndum de 1991 con foto histórica; mapa de fronteras reconocidas | El documento se acerca y da paso al mapa independiente; Budapest 1994 en otro estado | Hacer parecer Budapest garantía automática de defensa |
| 9 2004–2014 | Dos fotos de movilización separadas temporalmente, documento OTAN 2008, contexto de UE | Timeline se desplaza 2004 → 2008 → 2013–14; pocos elementos simultáneos | Etiquetar a toda Ucrania como posición homogénea |
| 10 Crimea/Donbás | Mapa doble foco con capas: estatus territorial y control, documentos Minsk | Mapa conserva escala; cámara cambia entre península y Donbás; aparece documento | Confundir Crimea y Donbás como un mismo proceso |
| 11 2021–2022 | Documento político fechado frente a imagen de noticia fechada | Papel 2021 → material documental 24-02-2022; pausa significativa | Convertir declaraciones en hechos probados |
| 12 2022–23 | Cronología horizontal con cartografía por fecha y una foto documental | El hito desplaza el foco; mapa se reemplaza solo con evidencia | Mapa de 2014 como si fuera 2022 |
| 13 2024–26 | Dossier cronológico de 3 o 4 hitos *verificados* con fecha, fuente y estado | Encadre/fotografía cambia en cada hito; 2026 claramente fechado | Frases vagas «la guerra continúa» como contenido completo |
| 14 Síntesis | Red causal editorial, pocas palabras y verbos en líneas | Conexiones se revelan tras la cronología, sin repetirla | Cinco tarjetas genéricas sin relaciones |
| 15 Quiz I | Pantalla de evento académico elegante, pregunta en grande, tres opciones reconocibles | Opciones aparecen, la respuesta se revela SOLO al clic del expositor; sin salto de escena | UI de juego con puntos, confeti, ruido visual |
| 16 Conclusión I | Fotografía documental contemplativa, titular en una frase, espacio para orador | Lentitud y silencio visual; conclusión al propio ritmo | Recontar fechas o empezar tema económico |
| 17 Hub → Economía | Vuelve exactamente al universo visual de las tres tarjetas; Historia completada, Economía destacada, Humanidad atenuada | Zoom de tarjeta Economía a portada del Capítulo II (elemento compartido) | Salto a nueva plantilla o diapositiva de contenido económico |
| 18 Portada II | Fotografía auténtica comercio/energía, gran titular «CAPÍTULO II / CONSECUENCIAS ECONÓMICAS» | Zoom termina, texto entra, queda en reposo | Crear escenas explicativas del Capítulo II ahora |

La numeración es conceptual, adaptable. Toda la parte histórica y el quiz deben caber aproximadamente en 20 minutos; el capítulo II solo una portada.

## 4. Dirección de los recursos 3D y video

Si un clip silencioso de una ciudad o de una infraestructura aporta contexto, probar un bucle leve y pausado en portada/puente. **Nunca** utilizar video de narración externa como sustituto del expositor, ni fragmentos de documentales ajenos sin licencia. Hacer mapa con relieve real si aporta orientación; no animar un falso 3D que deforme fronteras o simule precisión geográfica inexistente. Verificar autoplay silencioso, fallback estático y offline.

## 5. Cómo deben trabajar las referencias

- LEER y ABRIR en navegador: \`referencias/v2_1_APERTURA_APROBADA.html\`. Esta es la vara de identidad visual, no un mero enlace de consulta.
- COMPARAR con \`referencias/v3_REFERENCIA_no_final.html\`. Lo que se rechaza: panel 53/47 constante, fondo azul uniforme, texto sin contexto, 1–2–3 con el mismo desplazamiento.
- Estudiar el análisis de Rose Bennet, Academia Play, Armapedia y Slides by Sander que haya disponible y haya sido realmente consultado. De Rose: contexto histórico e imágenes de archivo; de Academia Play: mapas y construcciones progresivas; de Armapedia: justificaciones atribuidas; de Slides by Sander: continuidad espacial. No copiar clips, diseños o textos protegidos.

## 6. Puertas de calidad obligatorias

Para cada nueva familia de escenas:
1. **Mostrar 2–3 fotogramas a 1920×1080** (reposo inicial, estado intermedio, final) y uno a 1280×720.
2. **Demostrar 1 transición real en navegador**, no solo prometer «cinematic».
3. **Comparar con referencia V2.1**: qué se conserva y qué es objetivamente mejor. Si se modifican escenas 1–3, conservar capturas antes y después.
4. **Comprobar desde lejos**: una idea central legible, mapa con leyenda comprensible, no textos microscópicos ni overlays que oscurezcan demasiado las fotos.
5. **Pasos de clic**: cada clic tiene función narrativa, el retroceso funciona, no hay avances involuntarios.
6. **Citar el recurso**: foto/mapa real, fecha, licencia, origen y correspondiente atribución. Si no hay material verificado, usar marcador visual de trabajo claramente rotulado; no publicar como definitivo.
7. **No avanzar al siguiente conjunto de escenas** si falla la calidad visual de la anterior. Informar las decisiones con 5–10 líneas, no informes kilométricos.

## 7. Primera demostración que hay que exigir

Antes de producir más escenas planas, presentar una *prueba de dirección artística ejecutable* con tres composiciones distintas: **mapa geográfico ampliado**, **documento/archivo con foco visual** y **hub con transición de tarjeta Historia a Economía**. Estas pruebas son de estética/movimiento y no requieren adelantar contenido del Capítulo II. Una vez que su calidad se apruebe, emplear esas técnicas para completar el Capítulo I.

## 8. Mantener el alcance

Apertura → Historia hasta noviembre de 2026 → síntesis → quiz de 3–5 preguntas (por defecto 3) → conclusión de Expositor I → hub tres perspectivas → solo portada de Economía. El quiz y conclusión van al final de CADA capítulo. Humanidad y Economía no se desarrollan por ahora. No publicar GitHub Pages ni hacer merge a main sin aprobación.
