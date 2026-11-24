# Primer encargo de implementación V7 — CALIDAD VISUAL PRIORITARIA

Eres director artístico de motion graphics, diseñador editorial documental, desarrollador front-end sénior y editor de narrativa histórica. Continúa el proyecto ya existente sin borrar avances.

## Antes de editar
1. Comprueba la rama, commits y trabajo no integrado. Si los cambios anteriores están en una tarea de Codex y no en main, recupéralos sin hacer reset destructivo ni sobrescribirlos. Indica si no pudiste acceder a ellos.
2. Lee \`AGENTS.md\`, \`DIRECCION_ARTISTICA_V7.md\`, \`DECISIONES_V6_BLOQUES_Y_QUIZZES.md\`, las demás guías y compara en navegador \`referencias/v2_1_APERTURA_APROBADA.html\` (benchmark) con \`referencias/v3_REFERENCIA_no_final.html\` (contraejemplo).
3. Abre e inspecciona \`referencias/ESTUDIO_VISUAL_INTERACTIVO_V7.html\` y comprueba en navegador sus estados: geografía, archivo, quiz y retorno al hub. Es un laboratorio de estilo, NO una plantilla obligatoria ni contenido histórico definitivo; puedes mejorarlo notablemente.

## Gran prioridad: elevar el nivel artístico
El usuario rechaza lo que parece un PowerPoint simple: columnas 53/47 repetidas, viñetas 1–2–3, títulos en cajas idénticas, fotos sin relación, degradados azules uniformes, letras diminutas y transiciones que son solo fades. **La calidad estética está muy por debajo de su expectativa actual**. Tu misión no es cambiar el color de esos elementos: debes rediseñar el lenguaje visual.

Conserva lo que sí gustó de V2.1: carácter documental elegante, carbón/marfil/oro viejo, tipografía editorial, fotografía auténtica, paneles de las tres perspectivas y transformaciones lentas con continuidad espacial. Las escenas 1–3 pueden mejorar, pero demuestra la ventaja mediante capturas comparativas y conserva la identidad.

Composición propia para cada función histórica: mapa geográfico dominante con zoom orientado; atlas con capas fechadas; documento histórico con foco; archivo fotográfico; cronología 2004→2014; mapa dual Crimea/Donbás; investigación documental 2021–2022; línea temporal dinámica 2022–2026; diagrama causal; quiz elegante; conclusión contemplativa; vuelta al hub y expansión de Economía. No hace falta que todas usen la misma transición.

Texto visible breve pero con sentido; explicación completa en notas. Imágenes reales, mapas correctos, autor/fecha/licencia/fuente; no imágenes históricas generadas por IA ni clips de documentales ajenos sin permiso. Videos ambientales y relieve 3D solo si ayudan, con respaldo estático y sin movimiento distractor.

## Alcance FINAL inequívoco
**APERTURA → HISTORIA completa (orígenes relevantes hasta 20/11/2026) → síntesis → quiz histórico de 3–5 preguntas → conclusión del expositor 1 → REGRESO a «TRES PERSPECTIVAS, UN CONFLICTO» → Zoom real de tarjeta Economía → ÚNICAMENTE portada «CAPÍTULO II — CONSECUENCIAS ECONÓMICAS».**

Crea arquitectura para Economía y Humanidad, quizzes y conclusiones posteriores, PERO NO desarrolles ese contenido ahora. Cada integrante termina su propio capítulo con quiz y conclusión; luego regresa al hub para el siguiente. La presentación del bloque I, incluyendo su interacción, debe aspirar a unos 20 minutos; la cantidad de escenas es flexible.

## Ejecución
- Trabaja por etapas revisables en la rama de tarea, **sin publicar ni hacer merge a main**.
- Antes de multiplicar diseños, produce 3 **artframes** genuinamente diferentes para geografía, archivo histórico y retorno al hub y al menos una transición FUNCIONAL entre estados. No te limites a mockups.
- Muestra capturas reales 1920×1080 y 1280×720; informa qué escenas ejecutaste en Chromium/Playwright y qué falló. Respeta navegación manual, retroceso, teclado, full-screen y movimiento reducido. Aporta demo visual verificable.
- El benchmark no es que «el código compile»: cada escena debe verse más elaborada y educar mejor que V3, y sentirse coherente con V2.1. Si tu diseño no supera eso, iterar antes de repetirlo.
- Después desarrolla los conjuntos históricos restantes de forma incremental con el mismo estándar. Los datos de actualidad hasta el corte necesitan fuentes fechadas; justificaciones políticas atribuidas y contrastadas.
- Guarda progreso verificable (archivo de estado sucinto y commits revisables) para continuar con poca cuota. Entrega texto breve; **invierte recursos en el resultado visible**, no en informes kilométricos.

## Entrega de esta ejecución
Completa el siguiente tramo pendiente de la implementación y presenta lo visualmente ejecutado (demo, 3 capturas, 1 transición comprobada), 3 defectos detectados y qué sigue. No declares terminado el bloque completo si falta la historia después de 1954. No uses un resumen textual como sustituto de la presentación funcional.
