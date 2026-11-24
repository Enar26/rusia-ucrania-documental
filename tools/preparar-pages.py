"""Construye el directorio de GitHub Pages a partir de la edición probada."""
import re
import shutil
import sys
from pathlib import Path

raiz = Path(__file__).resolve().parents[1]
destino = Path(sys.argv[1]).resolve()
destino.mkdir(parents=True, exist_ok=True)
if any(destino.iterdir()):
    sys.exit("El directorio de salida debe estar vacío.")

html = (raiz / "index.html").read_text()
componentes = set(re.findall(r'(?:href|src)="\./(cine/[^"]+)"', html))
archivos = componentes | {"index.html", "fuentes.csv", "descargas/Rusia-y-Ucrania.zip", "assets/cine/umbral.mp4"}
for nombre in componentes:
    contenido = (raiz / nombre).read_text()
    archivos.update(re.findall(r"url\(\.\./(assets/[^)]*)\)", contenido))
    for carpeta, extension, nombres in re.findall(r"registrar\('([^']+)','([^']+)','([^']+)'\)", contenido):
        archivos.update(f"assets/{carpeta}/{medio}.{extension}" for medio in nombres.split())
archivos.update(p.relative_to(raiz).as_posix() for p in (raiz / "assets").rglob("*.txt"))
archivos.update(p.relative_to(raiz).as_posix() for p in (raiz / "assets/miniaturas").glob("*.webp"))
for nombre in sorted(archivos):
    salida = destino / nombre
    salida.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(raiz / nombre, salida)
(destino / ".nojekyll").touch()
print(f"{len(archivos)} archivos del sitio.")
