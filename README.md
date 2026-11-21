# Rusia y Ucrania · Atlas documental

Experiencia para la exposición de Ciencias Sociales. El menú abre la presentación, la guía del primer expositor y la biblioteca de fuentes. El recorrido tiene 21 escenas y 63 pasos y termina en la portada de Economía. El guion propone 19 min 45 s de ensayo, incluida la participación del público.

## Abrir y ensayar

- Con el ZIP descargado, extrae la carpeta y abre **Atlas-Rusia-y-Ucrania.html** con doble clic en un navegador de escritorio. El archivo integra imágenes, mapas, tipografías, guion, catálogo y licencias. Los enlaces a instituciones externas requieren conexión.
- Para usar la edición modular, abre **index.html** junto a sus carpetas. Para servirla por HTTP desde la raíz del proyecto puedes ejecutar `python3 -m http.server 8000` y abrir `http://localhost:8000/`. Usa rutas relativas, también bajo el subdirectorio del repositorio.
- Pulsa **Presentar**. Avanza con clic, →, espacio o Av Pág. Retrocede con ← o Re Pág. **F** alterna la pantalla completa, **H** oculta o muestra los controles y **P** pausa el movimiento. Cada opción del quiz queda seleccionada hasta que el expositor revela la explicación.
- En **Zona del expositor**, elige el capítulo, la escena y el paso. Desde **Fuentes** puedes consultar el documento citado o descargar el catálogo CSV. Al abrir la guía desde el reproductor, **Volver a la presentación** recupera el paso de partida.

## Edición y fuentes

En `app/`, `contenido.js`, `historia-reciente.js` y `atlas-temporal.js` describen las escenas. `estudio.js` enlaza cada paso con la narración y las referencias. Las fotografías, tipografías y mapas están en `assets/`. Las versiones y evidencias anteriores se conservan en sus carpetas originales del repositorio.

Los cortes del atlas corresponden al 30 de marzo y al 14 de noviembre de 2022, al 10 de julio de 2024 y al 20 de noviembre de 2026. El color ocre indica mayoría de superficie terrestre bajo control ruso estimado en una celda de 65 km. La línea exterior conserva las fronteras ucranianas reconocidas internacionalmente. Las fichas explican los cambios de fuente y la inclusión de Crimea. [Catálogo de datos y créditos](fuentes.csv)

Para regenerar el archivo autónomo, ejecuta `python3 tools/exportar.py Atlas-Rusia-y-Ucrania.html`. Para repetir las pruebas con Node, Playwright y Chromium instalados, inicia el servidor local y ejecuta `node tools/revisar-edicion.cjs http://localhost:8000 Atlas-Rusia-y-Ucrania.html revision/post-v8`. La variable opcional `BROWSER_PATH` permite elegir el ejecutable de Chromium.

[Comparación de cinco escenas](revision/post-v8/comparacion.jpg) · [Apertura antes y después (vídeo)](revision/post-v8/apertura.mp4) · [Revisión en navegador](revision/post-v8/REVISION.md)
