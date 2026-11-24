# Pruebas de la interfaz final

Chromium recorrió los 132 estados en ambos sentidos, con los dos menús intermedios y las nueve preguntas. Se verificaron el primer bucle del portal, las pulsaciones separadas por 110 ms, la cancelación al retroceder, el índice, las fuentes, la posibilidad de retomar y el cierre estable. Se probó la copia que se sirve en un subdirectorio, con las mismas rutas relativas que GitHub Pages. [Resultados de navegación](aceptacion-portal-navegacion-cola-indices.json)

El HTML del ZIP recorrió los 132 estados con la red desactivada. Chromium administrado bloqueó el acceso por `file://`, por lo que se cargaron esos mismos bytes en memoria para la prueba. La revisión de tamaños usó cinco configuraciones de Chromium, incluidas tablet y móvil simulados. [Pruebas offline y de tamaños](aceptacion-adaptacion-offline.json)

[Portal](portal.jpg) · [Menú](capitulos.jpg) · [Índice](indice.jpg) · [Modo cine](modo-cine.jpg) · [Móvil](movil.jpg)
