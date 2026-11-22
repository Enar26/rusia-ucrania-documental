# Rusia y Ucrania

**Conflicto, impacto económico y humanitario** · Documental interactivo en español para la exposición de Ciencias Sociales. El Capítulo I llega al 20 de noviembre de 2026. Sus 24 escenas y 71 estados incluyen la síntesis histórica, tres preguntas con respuesta oral, la conclusión y el relevo al segundo expositor. La proyección termina en «Capítulo II · Consecuencias económicas».

## Abrir en clase

Descarga el ZIP, extrae **Rusia-y-Ucrania-Cine.html**, ábrelo en el navegador y pulsa **Presentar**. El archivo lleva dentro el vídeo, las imágenes, los mapas, las tipografías y las fichas de fuentes. Las páginas de las instituciones citadas requieren Internet. [Descarga para el aula](https://github.com/Enar26/rusia-ucrania-documental/raw/refs/heads/reconstruccion-documental-cine-2026/descargas/Rusia-y-Ucrania-Cine.zip)

| Acción | Control |
|---|---|
| Avanzar una revelación o mostrar la respuesta | Clic en el lienzo, →, espacio o Av Pág |
| Volver al estado anterior | ←, Re Pág o flecha inferior |
| Consultar procedencia, crédito y fecha | **Fuentes**. Al cerrar se recupera el mismo paso |
| Salir de pantalla completa | Escape |
| Reiniciar o recuperar el paso guardado | **Inicio**, luego **Presentar** o **Continuar exposición** |

El portal reproduce una vez 7,6 segundos de metraje ilustrativo. **Omitir introducción** lleva al fotograma de reposo. Con movimiento reducido se entra desde la imagen fija. El equipo dispone de un guion de ensayo privado entregado por separado. El objetivo de 13 minutos incluye la participación del público.

## Proyecto y comprobación

La rama parte de `redisenio-documental-post-v8` en `3697243`. Para probar el sitio modular desde la raíz, ejecuta `python3 -m http.server 8000` y abre `http://localhost:8000/`. Para exportarlo, ejecuta `python3 tools/exportar.py Rusia-y-Ucrania-Cine.html`. Para repetir la aceptación con Chromium y Playwright instalados, ejecuta `node tools/aceptar-cine.cjs http://localhost:8000/ Rusia-y-Ucrania-Cine.html revision/cine`. La variable `BROWSER_PATH` permite indicar otro ejecutable de Chromium.

En `cine/`, las fichas históricas proporcionan los pasos y el motor controla la navegación. El atlas representa intervalos de superficie provincial y distingue control estimado y soberanía. El referéndum de 1991 compara los votos por el sí y el no registrados por el Centre for Democracy Studies Aarau. [Fuentes y derechos](fuentes.csv) · [Revisión, capturas y grabaciones](revision/cine/README.md)
