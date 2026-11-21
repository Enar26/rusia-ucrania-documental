"""Genera las láminas locales. Uso con GDAL: python3 tools/generar_mapas.py DIRECTORIO_DATOS.
Los enlaces a las capas originales y sus licencias están en fuentes.csv.
Proyección cilíndrica equidistante con paralelo de referencia en el centro de cada vista.
"""
import math
import sys
from pathlib import Path
from xml.sax.saxutils import escape
from osgeo import ogr

ogr.UseExceptions()
DATA = Path(sys.argv[1])
DEST = Path(__file__).resolve().parents[1] / "assets" / "mapas"
W, H = 860, 560
DARK = dict(sea="#162b2d", land="#35433d", accent="#917b50", second="#727e62", line="#657061", ink="#f0e6cb", river="#87a9a1")
PAPER = dict(sea="#b7c5ba", land="#e3d9b9", accent="#ba975d", second="#b5ae86", line="#9e9379", ink="#393827", river="#648b86")

def plate(name, center, span, layer, colors, labels, focus=None, relieve=None):
    lon, lat = center
    k = W / span
    ky = k / math.cos(math.radians(lat))
    def xy(x, y):
        return (x-lon)*k+W/2, (lat-y)*ky+H/2
    def point(x,y):
        a,b=xy(x,y)
        return f"{a:.1f},{b:.1f}"
    west,east=lon-span/2,lon+span/2
    south,north=lat-H/2/ky,lat+H/2/ky
    box=ogr.CreateGeometryFromWkt(f"POLYGON (({west} {south},{east} {south},{east} {north},{west} {north},{west} {south}))")
    def paths(g):
        kind=g.GetGeometryName()
        if kind in ("LINEARRING","LINESTRING"):
            return "M"+"L".join(point(p[0],p[1]) for p in g.GetPoints())+("Z" if kind=="LINEARRING" else "")
        return "".join(paths(ch) for ch in g if not ch.IsEmpty())
    out=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}"><rect width="100%" height="100%" fill="{colors["sea"]}"/>']
    def shape(g,fill,stroke,width):
        if not g or g.IsEmpty(): return
        clipped=g.Intersection(box)
        if not clipped or clipped.IsEmpty(): return
        path=paths(clipped.SimplifyPreserveTopology(span/2100))
        if path: out.append(f'<path d="{path}" fill="{fill}" fill-rule="evenodd" stroke="{stroke}" stroke-width="{width}" stroke-linejoin="round"/>')
    def features(filename):
        ds=ogr.Open(str(DATA/filename)); ls=ds.GetLayer();ls.SetSpatialFilter(box)
        yield from ls
    def tone(n):
        if focus and n in focus: return colors["accent"]
        return colors["land"]
    if layer.startswith("world_"):
        for f in features(layer):
            g=f.GetGeometryRef()
            if g and g.GetGeometryName() in ("POLYGON","MULTIPOLYGON"):
                shape(g.MakeValid(),tone(f.GetField("NAME")),colors["line"],0.95)
    else:
        # Disolver las provincias evita que el límite de facto de la fuente se lea como soberanía.
        groups={}
        for f in features("states10.json"):
            n=f.GetField("name"); admin=f.GetField("admin")
            if n in ("Crimea","Sevastopol"): admin="Ukraine"
            # En 1991 solo se tematiza la frontera de Ucrania. Se omiten
            # divisiones contemporáneas entre terceros países.
            key=admin if layer=="actual" or (layer=="soberania" and admin=="Ukraine") else "Tierra"
            groups.setdefault(key,[]).append(f.GetGeometryRef().Clone())
        for key,geoms in groups.items():
            coll=ogr.Geometry(ogr.wkbMultiPolygon)
            for geom in geoms:
                good=geom.MakeValid()
                if good.GetGeometryName()=="POLYGON": coll.AddGeometry(good)
                else:
                    for part in good:
                        if part.GetGeometryName()=="POLYGON": coll.AddGeometry(part)
            shape(coll.UnionCascaded(),tone(key),colors["line"],1)
        if layer=="actual" and name=="donbas":
            for f in features("states10.json"):
                if f.GetField("name") in ("Donets'k","Luhans'k"):
                    shape(f.GetGeometryRef(),colors["second"],colors["ink"],1.5)
        if name.startswith("crimea-"):
            for f in features("states10.json"):
                if f.GetField("name") in ("Crimea","Sevastopol"):
                    shape(f.GetGeometryRef(),colors["accent"],colors["accent"],0.7)
    if relieve:
        # El sombreado y los vectores comparten exactamente ventana y proyección.
        import base64
        from osgeo import gdal
        grid = gdal.Warp("", str(relieve), format="MEM", dstSRS="EPSG:4326",
                         outputBounds=(west, south, east, north), width=W, height=H,
                         resampleAlg="bilinear")
        name_png = "/vsimem/relieve.png"
        gdal.Translate(name_png, grid, format="PNG")
        data = base64.b64encode(gdal.VSIGetMemFileBuffer_unsafe(name_png)).decode()
        gdal.Unlink(name_png)
        out.append(f'<image width="{W}" height="{H}" href="data:image/png;base64,{data}" style="mix-blend-mode:multiply" opacity=".85"/>')
    for f in features("rivers.json"):
        if f.GetField("name") in ("Dnipro","Danube","Dniester","Don"):
            shape(f.GetGeometryRef(),"none",colors["river"],1.2)
    # Retícula geográfica. Las etiquetas son anotaciones editoriales, en grados.
    for x in range(math.ceil(west/5)*5,math.ceil(east),5):
        a,_=xy(x,lat)
        out.append(f'<path d="M{a:.1f},0v{H}" stroke="{colors["line"]}" opacity=".28" stroke-dasharray="2 5"/><text x="{a+4:.1f}" y="17" fill="{colors["ink"]}" opacity=".65" font-family="sans-serif" font-size="11">{x}° E</text>')
    for y in range(math.ceil(south/5)*5,math.ceil(north),5):
        _,b=xy(lon,y)
        out.append(f'<path d="M0,{b:.1f}h{W}" stroke="{colors["line"]}" opacity=".28" stroke-dasharray="2 5"/>')
    for x,y,title,kind in labels:
        a,b=xy(x,y); dot=kind=="city"
        if dot: out.append(f'<circle cx="{a:.1f}" cy="{b:.1f}" r="4" fill="{colors["ink"]}" stroke="{colors["line"]}" stroke-width="2"/>')
        size={"city":19,"state":26,"sea":21,"small":17}[kind]
        out.append(f'<text x="{a+(9 if dot else 0):.1f}" y="{b-(7 if dot else 0):.1f}" text-anchor="{"start" if dot else "middle"}" font-family="Georgia,serif" font-style="{"italic" if kind=="sea" else "normal"}" font-size="{size}" fill="{colors["ink"]}" stroke="{colors["land"] if colors==PAPER else colors["sea"]}" stroke-width="2.6" paint-order="stroke">{escape(title)}</text>')
    out.append('</svg>');(DEST/(name+'.svg')).write_text('\n'.join(out))
kyiv=(30.52,50.45,"Kiev","city")
sea=(34,43.4,"Mar Negro","sea")
ukr=(30.6,48.6,"Ucrania","state")
crimea=(34.1,45.35,"Crimea","small")
for name,c,span,labels in [
    ("region",(31.4,49),38,[kyiv,ukr,sea,crimea,(39,53,"Rusia","state"),(20.6,52,"Polonia","small"),(26,46.1,"Rumanía","small")]),
    ("ucrania",(31.7,49),25,[kyiv,ukr,crimea,(40,51.4,"Rusia","state"),(30,44.2,"Mar Negro","sea")]),
    ("peninsula",(34,45.9),14,[crimea,(32,44.1,"Mar Negro","sea"),(36.8,46.25,"Mar de Azov","sea"),(32.5,47.5,"Ucrania","state")]),
    ("donbas",(37.4,48.8),12,[(37.805,48.015,"Donetsk","city"),(39.3,48.57,"Lugansk","city"),(34.1,49.6,"Ucrania","state"),(40.7,50.2,"Rusia","state"),(36.8,46.45,"Mar de Azov","sea")])]:
    plate(name,c,span,"actual",DARK,labels,["Ukraine"])
for y,c,span,focus,labels in [
    (1100,(32,53),39,["Kievan Rus"],[kyiv,(31,55,"Rus de Kiev","state"),(40,48,"Estepa","small")]),
    (1200,(32,53),39,["Principality of Kyiv","Principality of Galicia-Volhynia","Principality of Novgorod"],[kyiv,(26,49.7,"Galicia-Volinia","small"),(32,58,"Nóvgorod","state")]),
    (1500,(32,50),35,["Crimean Khanate","Grand Duchy of Moscow"],[(25,52,"Polonia y Lituania","small"),(40,54,"Moscovia","state"),(34,46.5,"Kanato de Crimea","small"),kyiv]),
    (1650,(31,50),30,["Polish–Lithuanian Commonwealth"],[(24.7,52,"Mancomunidad","small"),(31.45,50.07,"Pereyáslav","city"),(40,53,"Moscovia","state")]),
    (1783,(33,47),29,["Russian Empire"],[(38,49.5,"Imperio ruso","state"),crimea,(30,43,"Mar Negro","sea")])]:
    plate(str(y),c,span,f"world_{y}.geojson",PAPER,labels,focus)
plate('crimea-1954',(34,45.6),9,'fisico',PAPER,[crimea,(32.2,44.6,"Mar Negro","sea"),(36.6,46,"Mar de Azov","sea")])
plate('union-1922',(38,49),40,'fisico',PAPER,[
    (27.56,53.9,"Minsk","city"), (37.62,55.75,"Moscú","city"),
    (36.23,49.99,"Járkiv","city"), (44.8,41.7,"Tiflis","city"),
    (33,43,"Mar Negro","sea")])

# Pase opcional con el sombreado SR_50M v2.0.0 de Natural Earth.
if len(sys.argv) > 2:
    W, H = 1200, 675
    tinta = dict(sea="#284044", land="#676858", accent="#d5b47b", second="#938975",
                 line="#92917c", ink="#fff5dc", river="#516e72")
    plate("soberania", (26.5, 48.9), 37, "soberania", tinta,
          [kyiv, (32.4, 48.35, "Ucrania", "state"), crimea, (37.2, 43.7, "Mar Negro", "sea"),
           (39.5, 51.7, "Rusia", "state"), (28.4, 53.5, "Bielorrusia", "small"),
           (23.7, 46.2, "Rumanía", "small")], ["Ukraine"], sys.argv[2])
