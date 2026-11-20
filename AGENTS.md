# AGENTS.md — Reglas permanentes del proyecto (V5)

## Proyecto y alcance
Presentación documental web e interactiva, en español, sobre **Rusia y Ucrania: conflicto, impacto económico y humanitario**. Se expondrá en una laptop del docente con navegador y avance manual. Hay tres integrantes: historia; economía; humanidad y paz. Cada cual tendrá una conclusión al final. Duración flexible.

## Decisiones aprobadas (obligatorias)
- Escena 1: portada oscura, fotografía auténtica, título «RUSIA Y UCRANIA» y subtítulo «Conflicto, impacto económico y humanitario»; **NO añadir «2014–2026»**. La referencia preferida es `referencias/v2_1_APERTURA_APROBADA.html`.
- Escena 2: «TRES PERSPECTIVAS, UN CONFLICTO», tres paneles HISTORIA / ECONOMÍA / HUMANIDAD iluminados progresivamente con clic. Nombres de expositores pendientes: **no inventarlos**.
- Escena 3: entrada «CAPÍTULO I — EL ORIGEN DE UN CONFLICTO»; mantener transición suave y pausada desde el primer panel de la escena 2; el V2.1 es la referencia preferida.
- V3 es **referencia funcional y contraejemplo**, NO diseño aprobado de escenas 4 en adelante: se rechazaron fondo azul repetido, listas de tres viñetas, escasa contextualización y transiciones iguales.

## Contenido e integridad editorial
- Leer `PROYECTO_MAESTRO_V5.md`, `PLAN_HISTORICO_V4.md` y `FUENTES_PENDIENTES.md` antes de modificar código.
- La **auditoría inicial** debe abarcar **todas las escenas 4–15** y la transición entre ellas, identificando problemas de fondo, no solo detalles estéticos. La **primera implementación, cuando el usuario la autorice**, puede limitarse a las escenas 4–7 para evaluar la calidad antes de programar el resto. No empezar a programar por cuenta propia.
- Mantener **una única cronología narrativa** desde antecedentes medievales hasta noviembre de 2026, con mayor atención a 1991–2026 y sin duplicaciones.
- Cada escena debe ayudar a entender **qué ocurrió, por qué importa y cómo se relaciona con el conflicto contemporáneo**. Breve texto visible; explicación completa en notas editables. No reducir la investigación a eslóganes.
- Diferenciar hechos acreditados, argumentos de actores políticos, disputas historiográficas y valoración jurídica. No equiparar pasado compartido, reivindicaciones históricas o control territorial a soberanía reconocida.
- Respetar contexto de exposición escolar: evitar imágenes gráficas o sensacionalistas de víctimas y escenas bélicas.
- No inventar fechas, estadísticas, citas ni transcripciones de videos; marcar cualquier punto no verificado como pendiente.

## Diseño y animación
- Fotografía documental real, mapas geográficos precisos e históricos fechados. No imágenes que simulen fotografías históricas creadas por IA.
- Estética documental oscura, tipografía editorial con excelente legibilidad y movimiento elegante inspirado en Slides by Sander **sin copiarlo literalmente**.
- Composiciones y transiciones variadas al servicio del significado: zoom cartográfico, cambio de fronteras por época, fotografía y documentos, línea de tiempo discreta, etc. Evitar una diapositiva idéntica por fecha.
- Avance manual por clic, teclado o mando compatible; nunca pasar al siguiente tema automáticamente. Poder retroceder limpiamente; evitar repetición accidental por tecla sostenida; animaciones coherentes y pausables; admitir `prefers-reduced-motion`.

## Ingeniería
- Proyecto web estático reproducible: HTML/CSS/JS o herramientas equivalentes justificadas, rutas relativas compatibles con repositorio de GitHub Pages, recursos y fuentes guardados localmente cuando sus permisos lo permitan, diseño 16:9 adaptable, accesible, carga y rendimiento razonables.
- Documentar fuentes y licencias de fotografías/mapas con enlace, autor, fecha y uso, y pie discreto en escena. Si una imagen no puede licenciarse/verificarse, no incorporarla como recurso definitivo.
- Probar navegación, retroceso, pantalla completa y visualización en navegador; obtener capturas 16:9 para revisión cuando sea posible.
- No publicar GitHub Pages, no hacer merge a `main`, ni compartir información personal de estudiantes sin aprobación del usuario. Trabajar en rama de tarea o propuesta de cambios revisable.
- Si el entorno no permite internet, navegador o capturas, **informar con precisión lo que se probó y lo que quedó pendiente**.

## Proceso por fases
1. En primera tarea: **SOLO AUDITAR Y PLANIFICAR LAS ESCENAS 4–15 COMPLETAS**. No modificar código ni publicar. Leer `CORRECCIONES_04_15_V5_1.md` y usar `PROMPT_01_AUDITORIA_CLOUD.md`.
2. Tras aprobación del usuario: implementar escenas 4–7 y probar. Usar `PROMPT_02_IMPLEMENTACION.md`.
3. Revisar capturas y ajustar; continuar con el resto del bloque histórico después de esa revisión.
