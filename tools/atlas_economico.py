"""Construye el mapa local desde países, provincias y relieve de Natural Earth.
Uso: /usr/bin/python3 tools/atlas_economico.py countries.json states10.json relieve.tif
"""
import json
import sys
from pathlib import Path
import numpy as np
from osgeo import gdal, ogr
from PIL import Image, ImageDraw

destino = Path(__file__).resolve().parents[1] / "assets/economia"
paises, regiones, relieve = sys.argv[1:]
ogr.UseExceptions()
datos = ogr.Open(paises)
pueblos = {f["ADM0_A3"]: f.GetGeometryRef().Clone() for f in datos.GetLayer()}
# Natural Earth traza control de facto. Reasignar la península por el litoral
# del mismo mapa evita dibujar una línea de soberanía dentro de Ucrania.
rusia = pueblos["RUS"]
caja = ogr.CreateGeometryFromWkt("POLYGON ((32 44,36.7 44,36.7 46.3,32 46.3,32 44))")
provincias = ogr.Open(regiones)
for f in provincias.GetLayer():
    if f["name"] in ("Crimea", "Sevastopol"):
        trozo = f.GetGeometryRef().MakeValid()
        caja = caja.Union(trozo)
# La parte rusa del estrecho está unida al Cáucaso, la península a Ucrania.
# Cortar solo los polígonos rusos completos situados en la caja.
partes = [p.Clone() for p in rusia]
for p in partes:
    if caja.Contains(p.Centroid()) and p.Area() > 0.005:
        pueblos["RUS"] = pueblos["RUS"].Difference(p)
        pueblos["UKR"] = pueblos["UKR"].Union(p)
def anillos(g):
    if g.GetGeometryName() == "POLYGON":
        yield [r.GetPoints() for r in g]
    elif g.GetGeometryName() in ("MULTIPOLYGON", "GEOMETRYCOLLECTION"):
        for part in g:
            yield from anillos(part)
def render(nombre, oeste, norte, este, sur, ancho, alto):
    cuenca = ogr.CreateGeometryFromWkt(f"POLYGON (({oeste} {sur},{este} {sur},{este} {norte},{oeste} {norte},{oeste} {sur}))")
    fondo = Image.new("RGB", (ancho, alto), (25, 53, 61))
    tinta = ImageDraw.Draw(fondo)
    for cod, forma in pueblos.items():
        if not cuenca.Intersects(forma): continue
        for rings in anillos(forma):
            for j, ring in enumerate(rings):
                puntos = [((x-oeste)*ancho/(este-oeste), (norte-y)*alto/(norte-sur)) for x,y,*_ in ring]
                tinta.polygon(puntos, fill=(89,101,87) if j==0 else (25,53,61), outline=(144,151,126))
    dem = gdal.Translate("", relieve, format="MEM", projWin=[oeste,norte,este,sur], width=ancho,height=alto,resampleAlg="bilinear").ReadAsArray()
    rgb = np.asarray(fondo).astype(np.float32)
    tierra = rgb[:,:,0] > 45
    # El relieve modula únicamente la tinta de tierra.
    rgb[tierra] *= np.clip(1+(dem[tierra].astype(float)-216)/116,.42,1.20)[:,None]
    Image.fromarray(np.clip(rgb,0,255).astype("uint8")).save(destino/(nombre+".webp"),quality=83,method=5)
render("planisferio", -180,90,180,-90,4320,2160)
render("mar-negro", 10,60,54,33,2200,1350)
focos = {}
for cod in ["RUS","UKR","PER"]:
    focos[cod]="".join("M"+"L".join(f"{p[0]:.2f},{-p[1]:.2f}" for p in ring)+"Z" for rings in anillos(pueblos[cod].SimplifyPreserveTopology(.11)) for ring in rings)
(Path(__file__).resolve().parents[1]/"cine/contornos.js").write_text("// Natural Earth · dominio público. Generado por tools/atlas_economico.py\nconst contornosEco = "+json.dumps(focos,separators=(",",":"))+";\n")
