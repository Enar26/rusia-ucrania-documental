---
name: documentary-presentation-qa
description: Use when implementing, reviewing, or debugging scenes, transitions, historical maps, presenter controls, or interactive quizzes in the Russia-Ukraine documentary web presentation. Perform browser-based visual, interaction, source, and offline checks before claiming a scene is ready.
---

# Documental interactivo: revisión de calidad

## Alcance y criterios
Este skill verifica implementaciones, NO sustituye la investigación histórica ni autoriza crear imágenes de hechos históricos mediante IA. Lee `AGENTS.md` y `DECISIONES_V6_BLOQUES_Y_QUIZZES.md` antes de probar. Conserva como referencia estética las escenas iniciales aprobadas; se permiten mejoras justificadas con comparación antes/después.

## Protocolo por escena
1. Registrar la finalidad didáctica, fecha de situación y una afirmación comprobable de la escena. Indicar explícitamente si una fuente queda pendiente.
2. Iniciar el sitio en un navegador real (Playwright o navegador disponible). No declarar que una pantalla funciona basándose únicamente en el código.
3. Revisar capturas a 1280×720 y 1920×1080 (16:9) y, si es posible, pantalla de portátil 1366×768. Comprobar recortes, contraste, legibilidad desde proyector, créditos y leyendas.
4. Probar avance por clic, barra espaciadora, flechas y retroceso por paso. Mantener pulsada la tecla de avance y comprobar que no se produzcan saltos repetidos. El clic en un control no debe navegar la presentación simultáneamente.
5. Comprobar animación en progreso, cancelación de temporizadores y entrada/salida repetida de escenas. El estado final debe ser reproducible al volver atrás.
6. Probar pantalla completa, resolución variable, ocultar/mostrar controles, notas de presentador y `prefers-reduced-motion`.
7. Verificar que mapas y fotografías están correctamente fechados, acreditados y acompañados de una descripción del estatus territorial cuando corresponda. No confundir etiqueta de ciudad con límite de región; no usar mapas de otras épocas.
8. Detectar enlaces, fuentes, imágenes y tipografías remotas. Señalar los que impiden reproducir la experiencia sin conexión; probar recursos locales y distribución offline cuando exista.
9. Para una escena de quiz, verificar la separación entre selección del público y revelado de la respuesta, las opciones de interacción accesibles, el avance manual y la restauración del estado. No revelar respuestas antes del momento previsto, ni inventar preguntas/datos que aún no se han aprobado.

## Resultado obligatorio de la revisión
Entregar (a) qué se comprobó realmente, (b) capturas o rutas verificables a ellas, (c) fallos detectados con pasos para reproducirlos, (d) estado de fuentes y licencias, (e) cambios que sugieres y (f) qué sigue pendiente por restricciones del entorno.

No afirmar que ejecutaste pruebas de navegador o viste materiales externos si no fue posible. No publicar GitHub Pages ni modificar capítulos futuros sin autorización. Si Playwright no está instalado, comprobar disponibilidad y describir la alternativa disponible; no inventar resultados.
