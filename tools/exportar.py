"""Crea un HTML autónomo con los recursos y licencias locales. Uso: python tools/exportar.py salida.html"""
import base64
import json
import mimetypes
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
def uri(path):
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    return f"data:{mime};base64," + base64.b64encode(path.read_bytes()).decode()

html = (ROOT / "index.html").read_text()
css = (ROOT / "app/presentacion.css").read_text()
css = re.sub(r"url\(\.\./([^)]*)\)", lambda m: f"url({uri(ROOT / m[1])})", css)
html = re.sub(r'<link rel="stylesheet"[^>]*>', lambda _: "<style>"+css+"</style>", html)
scripts = [ROOT / name for name in re.findall(r'<script defer src="\./([^"]+)"></script>', html)]
html = re.sub(r'<script defer src="[^"]+"></script>', '', html)
assets = {str(p.relative_to(ROOT)):uri(p) for p in (ROOT/"assets").rglob("*") if p.suffix in (".webp",".svg")}
assets["fuentes.csv"] = uri(ROOT / "fuentes.csv")
bundle = "globalThis.recursosIntegrados="+json.dumps(assets)+";\n"
bundle += "\n".join(script.read_text() for script in scripts)
licenses = "\n\n".join(p.name+"\n"+p.read_text() for p in sorted((ROOT/"assets").rglob("*.txt")))
html = html.replace("</body>", '<script type="text/plain" id="licencias">'+licenses+'</script><script>'+bundle+"</script></body>")
Path(sys.argv[1]).write_text(html)
