# Rusia y Ucrania

Documental interactivo para Ciencias Sociales. Historia, Economía y Humanidad recorren 132 estados manuales, con tres preguntas y una conclusión por capítulo.

## Abrir la exposición

Pulsa **Presentar** para comenzar en el menú de capítulos o **Continuar exposición** para recuperar la posición guardada. Para trabajar sin conexión, descarga el ZIP, extrae `Rusia-y-Ucrania.html` y abre el archivo en un navegador de escritorio. [ZIP offline de la edición final](https://github.com/Enar26/rusia-ucrania-documental/raw/refs/heads/interfaz-web-final/descargas/Rusia-y-Ucrania.zip)

| Acción | Control |
|---|---|
| Avanzar | Clic en una zona libre, →, espacio o Av Pág |
| Retroceder | ← o Re Pág |
| Mostrar u ocultar los mandos | M o el botón ☰ |
| Consultar una escena | I abre el índice. **Retomar exposición** recupera el punto donde comenzó la consulta. |
| Alternar pantalla completa | F |
| Cerrar un diálogo | Escape |
| Consultar referencias y créditos | **Fuentes** en modo cine o **Archivo documental** desde Inicio y Capítulos |

## Archivos

- `index.html` es la entrada. `cine/interfaz.*` contiene el portal, los índices y el archivo. `cine/motor.js` coordina el reproductor y usa las escenas y animaciones existentes de `cine/`.
- `assets/` contiene fotografías, vídeo, fuentes, miniaturas y cartografía. Los créditos también se consultan por escena. [Catálogo de fuentes](fuentes.csv)
- `docs/archivo/` conserva la planificación anterior. `revision/` conserva las evidencias por edición. [Pruebas de la interfaz](revision/interfaz-final/)
- `tools/exportar.py` genera el HTML autónomo. `tools/preparar-pages.py` selecciona los archivos que se sirven en Pages. [Preparación de GitHub Pages](docs/publicacion.md)

Sirve la raíz con `python3 -m http.server 8000` durante el desarrollo. Genera la edición autónoma con `python3 tools/exportar.py Rusia-y-Ucrania.html`.
