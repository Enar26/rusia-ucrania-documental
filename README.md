# Rusia y Ucrania

**Conflicto, impacto económico y humanitario** es un documental interactivo para una exposición de Ciencias Sociales. El recorrido contiene 96 estados manuales. Los primeros 71 corresponden a la apertura, Historia y el relevo a Economía. Siguen las diez escenas económicas con 24 estados y, al último clic, la portada de Humanidad.

## Abrir en clase

Descarga el ZIP, extrae **Rusia-y-Ucrania-Economia.html** y ábrelo en un navegador de escritorio. Pulsa **Presentar** para iniciar la exposición. El archivo incluye vídeo, fotografías, atlas, tipografías y fichas documentales. Los enlaces a publicaciones externas requieren conexión. [Descarga offline](https://github.com/Enar26/rusia-ucrania-documental/raw/refs/heads/revision-capitulo-economia-v3/descargas/Rusia-y-Ucrania-Economia.zip)

| Acción | Control |
|---|---|
| Avanzar una revelación o mostrar la respuesta histórica | Clic en el lienzo, →, espacio o Av Pág |
| Volver al paso anterior | ←, Re Pág o flecha inferior |
| Consultar el dato, el autor de la foto y su licencia | **Fuentes**. Cerrar devuelve al mismo paso |
| Salir de pantalla completa | Esc |
| Recuperar el paso guardado | **Inicio** y **Continuar exposición** |
| Pausar o reanudar el bucle de la entrada | Botón inferior del portal |

El portal alterna el estrecho del Bósforo y un campo de trigo. El modo de movimiento reducido ofrece una imagen fija. El presupuesto de exposición de Economía es de **5 min 50 s**, pendiente de ensayo. El expositor controla cada avance.

## Revisar el proyecto

La rama económica parte de `reconstruccion-documental-cine-2026` en `c9ede76`. Para probar el sitio modular, ejecuta `python3 -m http.server 8000` desde la raíz y abre `http://localhost:8000/`. Para generar el HTML autónomo, ejecuta `python3 tools/exportar.py Rusia-y-Ucrania-Economia.html`.

La revisión incluye capturas por estado, grabaciones reales, fuentes y resultados de las pruebas, además de las cifras que quedaron pendientes de cotejo. [Evaluación y evidencias de Economía](revision/economia/README.md) · [Catálogo de fuentes y derechos](fuentes.csv) · [Entrega histórica anterior](revision/cine/README.md)
