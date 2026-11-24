# Primer encargo a Codex Cloud — Auditoría completa de escenas 4 a 15 (sin programar)

Actúa como ingeniero front-end sénior, diseñador de motion graphics para documentales interactivos y revisor editorial de presentaciones históricas. Sé crítico y no valides por defecto el diseño existente.

Estamos trabajando en `Enar26/rusia-ucrania-documental`, una presentación web en español sobre Rusia y Ucrania. **Antes de proponer nada**, lee completos: `AGENTS.md`, `PROYECTO_MAESTRO_V5.md`, `PLAN_HISTORICO_V4.md`, `CORRECCIONES_04_15_V5_1.md` y `FUENTES_PENDIENTES.md`. Inspecciona los HTML y capturas en `referencias/`.

### Qué conservar
- **Escena 1:** portada «RUSIA Y UCRANIA» con subtítulo «Conflicto, impacto económico y humanitario»; fotografía real, tono oscuro y tipografía elegante; sin «2014–2026».
- **Escena 2:** «Tres perspectivas, un conflicto», tres paneles que se iluminan por clic.
- **Escena 3:** entrada del capítulo histórico con movimiento suave, pausado y conectado a la segunda escena.
- El HTML V2.1 es la referencia aprobada para estas tres escenas. El V3 **NO** es plantilla aprobada para escenas 4–15.

### Qué hay que rediseñar
**TODAS las escenas 4–15**, no solamente las 4–7. Problemas del V3: fondo azul constante, misma composición repetida, revelado de viñetas 1/2/3, fotos y mapas poco satisfactorios y escasez de contexto histórico. No resuelvas la falta de profundidad colocando párrafos enormes en pantalla: especifica el contenido central visible y lo que explicará el presentador en las notas orales.

### Entregables de ESTA PRIMERA TAREA, EN ESPAÑOL
1. Auditoría del código y del recorrido completo: qué conservar, qué falla, riesgos de navegación/animación/carga de imágenes, accesibilidad y funcionamiento en GitHub Pages.
2. Arquitectura web concreta y sobria (archivos, rutas, mapas, bibliografía y notas del presentador); justificar tecnología y experiencia con clic, flechas, retroceso y mando compatible.
3. **Storyboard de TODAS las escenas 4–15**, en orden, sin repetir la cronología. Para cada escena entregar: propósito histórico, vínculo explícito con la guerra, información actual insuficiente, composición visual, recurso real requerido, transición singular con justificación, pasos de clic estimados, notas del expositor y fuentes por verificar. Utiliza `CORRECCIONES_04_15_V5_1.md` como lista obligatoria de problemas a responder.
4. Propuesta de línea de tiempo continua y atractiva desde los antecedentes medievales hasta noviembre de 2026, separada visualmente por capítulos pero sin recapitulaciones redundantes. Más profundidad desde 1991, sobre todo 2014–2026. Indica qué sucesos deben ir en pantalla y cuáles en guion.
5. Catálogo de necesidades visuales: fotos auténticas y mapas geográficos correctos, históricos fechados, licencia y atribución, recursos locales para que funcionen en GitHub Pages. No inventes una fotografía ni uses mapas anacrónicos.
6. Identifica afirmaciones que requieren verificación, disputas historiográficas, discursos políticos y estatus jurídico, separando esas categorías. Los videos de YouTube son referencias, no fuentes finales verificadas.
7. Plan en sprints con criterios de aceptación: primero escenas 4–7, después 8–11, después 12–15, **siempre después de mi aprobación**. No programes todavía.

### RESTRICCIÓN ABSOLUTA
Esta primera tarea es **solo análisis**. No edites ni crees archivos del repositorio, no ejecutes implementación, no abras PR, no hagas commits ni publiques GitHub Pages. Si alguna fuente o archivo no es accesible desde Cloud, indica exactamente cuál y continúa con lo verificable, sin fingir que lo has revisado. Termina con una propuesta concreta para que yo la revise antes de programar.
