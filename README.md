# Rusia y Ucrania

**Conflicto, impacto económico y humanitario** es una presentación interactiva de Ciencias Sociales. Cada expositor controla las revelaciones de su capítulo, las tres preguntas del quiz y su conclusión. El recorrido termina con «Muchas gracias por su atención».

## Abrir en clase

Descarga el ZIP, extrae **Rusia-y-Ucrania.html** y abre ese archivo en el navegador. En el portal, pulsa **Presentar**. El HTML incluye el vídeo, las fotografías, el atlas, las tipografías y las fichas documentales. Para visitar los sitios de las instituciones se necesita conexión. [Descargar el ZIP](https://github.com/Enar26/rusia-ucrania-documental/raw/refs/heads/revision-tres-capitulos-humanidad/descargas/Rusia-y-Ucrania.zip)

| Acción | Control |
|---|---|
| Avanzar una revelación o mostrar la respuesta del quiz | Clic en el lienzo, →, espacio o Av Pág |
| Volver un paso | ←, Re Pág o flecha inferior |
| Participar en los quizzes | En Historia se responde en voz alta. En Economía y Humanidad también se puede pulsar una opción. El expositor avanza para revelar la respuesta. |
| Consultar el respaldo de un dato o los créditos de una imagen | **Fuentes**. Al cerrar se recupera el mismo paso. |
| Salir de pantalla completa | Esc |
| Volver al portal y recuperar el punto de lectura | **Inicio**, después **Continuar exposición** |
| Pausar o reanudar el vídeo del portal | Botón inferior del portal |

## Recorrido

| Tramo | Estados |
|---|---:|
| Apertura, Historia, quiz, conclusión y relevo hasta la portada de Economía | 71 |
| Diez escenas económicas | 24 |
| Quiz y conclusión de Economía | 9 |
| Portada de Humanidad | 1 |
| Ocho escenas humanitarias, quiz y conclusión final | 27 |
| **Total** | **132** |

La pantalla **Fuentes** distingue las publicaciones que respaldan cada afirmación de los créditos de los medios proyectados. Los datos humanitarios conservan su fecha, población de referencia y unidad. [Fuentes del capítulo III](revision/humanidad/fuentes.md) · [Catálogo del documental](fuentes.csv)

## Desarrollo y revisión

La rama de los tres capítulos parte de la entrega económica aprobada en `7e6ba82`. Desde la raíz, `python3 -m http.server 8000` sirve la edición modular en `http://localhost:8000/`. Con `python3 tools/exportar.py Rusia-y-Ucrania.html` se genera un archivo autónomo. [Pruebas y capturas de los tres bloques](revision/humanidad/README.md) · [Entrega económica anterior](revision/economia/README.md) · [Entrega histórica anterior](revision/cine/README.md)
