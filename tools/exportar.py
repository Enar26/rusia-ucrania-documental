"""Exporta la edición pública con recursos locales: python3 tools/exportar.py salida.html."""
import base64
import json
import mimetypes
import re
import sys
from pathlib import Path

root = Path(__file__).resolve().parents[1]
def uri(p):
    mime = mimetypes.guess_type(p.name)[0] or "application/octet-stream"
    return "data:"+mime+";base64,"+base64.b64encode(p.read_bytes()).decode()

def estilo(m):
    css = (root/m[1]).read_text()
    css = re.sub(r"url\(\.\./([^)]*)\)", lambda v: "url("+uri(root/v[1])+")", css)
    return "<style>"+css+"</style>"

html = (root/"index.html").read_text()
html = re.sub(r'<link rel="stylesheet" href="\./([^"]+)">', estilo, html)
rutas = re.findall(r'<script defer src="\./([^"]+)"></script>', html)
html = re.sub(r'<script defer src="\./[^"]+"></script>',"",html)
catalogo = (root/"cine/recursos.js").read_text()
archivos = {"assets/cine/umbral.mp4"}
for carpeta, extension, nombres in re.findall(r"registrar\('([^']+)','([^']+)','([^']+)'\)",catalogo):
    archivos.update(f"assets/{carpeta}/{nombre}.{extension}" for nombre in nombres.split())
integrados = {ruta:uri(root/ruta) for ruta in sorted(archivos)}
script = "globalThis.integrados="+json.dumps(integrados)+";\n"+"\n".join((root/ruta).read_text() for ruta in rutas)
licencias = "\n\n".join(p.name+"\n"+p.read_text() for p in sorted((root/"assets").rglob("*.txt")))
html = html.replace("</body>",'<script type="text/plain" id="licencias">'+licencias+'</script><script>'+script+'</script></body>')
Path(sys.argv[1]).write_text(html)
