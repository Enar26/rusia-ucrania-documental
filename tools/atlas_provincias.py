"""Genera únicamente resúmenes provinciales de cuatro cortes históricos.
Uso con GDAL: python3 tools/atlas_provincias.py states10.json carpeta_de_cortes
Las URLs fijadas figuran en cine/referencias.js. Las geometrías de observación son insumos externos.
"""
import json
import sys
from pathlib import Path
from osgeo import ogr, osr

root = Path(__file__).resolve().parents[1]
wgs, equal = osr.SpatialReference(), osr.SpatialReference()
wgs.ImportFromEPSG(4326)
equal.ImportFromEPSG(3035)
for ref in (wgs, equal):
    ref.SetAxisMappingStrategy(osr.OAMS_TRADITIONAL_GIS_ORDER)
project = osr.CoordinateTransformation(wgs, equal)
def shape(f):
    g = ogr.CreateGeometryFromJson(json.dumps(f["geometry"])).MakeValid()
    g.Transform(project)
    return g

regions = {f["properties"]["name"]: shape(f) for f in json.loads(Path(sys.argv[1]).read_text())["features"]
           if f["properties"]["admin"] == "Ukraine" or f["properties"]["name"] in {"Crimea","Sevastopol"}}
regions["Crimea"] = regions["Crimea"].Union(regions.pop("Sevastopol"))
regions["Kiev"] = regions["Kiev"].Union(regions.pop("Kiev City"))
country = ogr.Geometry(ogr.wkbMultiPolygon)
def polygons(g):
    if g.GetGeometryName() == "POLYGON":
        yield g
    else:
        for child in g: yield from polygons(child)
for r in regions.values():
    for part in polygons(r): country.AddGeometry(part)
country = country.UnionCascaded()
left,right,bottom,top = country.GetEnvelope()
def xy(x,y): return ((x-left)/1000+35,(top-y)/1000+47)
def path(g):
    if g.GetGeometryName() in ("LINEARRING","LINESTRING"):
        return "M"+"L".join("%.1f %.1f"%xy(x,y) for x,y,*_ in g.GetPoints())+"Z"
    return "".join(path(c) for c in g)
paths={k:path(v.SimplifyPreserveTopology(1400)) for k,v in regions.items()}
for name in ("2014","2015-21","2022-03-30","2022-11-15","20240710","20261120"):
    qualitative=name in ("2014","2015-21")
    if not qualitative:
        snap=json.loads((Path(sys.argv[2])/(name+".json")).read_text())
        shapes=[shape(f) for f in snap.get("value",snap)["features"] if f["properties"].get("type")!="losses"]
        if "value" in snap: shapes.append(regions["Crimea"])
        observed=shapes[0]
        for g in shapes[1:]: observed=observed.Union(g)
    svg=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {xy(right,bottom)[0]+50:.0f} {xy(right,bottom)[1]+72:.0f}">']
    for key,r in regions.items():
        if qualitative: color="#b88160" if key=="Crimea" else "#536d78"
        else:
            share = observed.Intersection(r).GetArea()/r.GetArea() if observed.Intersects(r) else 0
            color = "#944e38" if share >= .75 else "#bb805c" if share >= .5 else "#dec09b" if share >= .05 else "#536d78"
        if not qualitative and key in ("Donets'k","Kharkiv","Kiev","Kherson"):
            print(name,key,round(share*10)*10)
        svg.append(f'<path d="{paths[key]}" fill="{color}" stroke="#b4c3bc" stroke-width="1.6"/>')
    svg.append(f'<path d="{path(country.SimplifyPreserveTopology(1600))}" fill="none" stroke="#f1e8d5" stroke-width="3.5"/>')
    for lon,lat,label in [(30.52,50.45,"Kiev"),(35.0,44.8,"Crimea"),(37.6,48.2,"Donbás"),(30.8,45.4,"Mar Negro"),(38.5,51.7,"Rusia")]:
        x,y=xy(*project.TransformPoint(lon,lat)[:2])
        if label=="Donbás" and name=="2015-21":
            svg.append(f'<circle cx="{x}" cy="{y}" r="17" fill="none" stroke="#f4cd91" stroke-width="5" stroke-dasharray="5 5"/>')
        svg.append(f'<text x="{x}" y="{y+26}" text-anchor="middle" font-family="sans-serif" font-size="26" fill="#fff3d6" stroke="#263f4a" stroke-width="5" paint-order="stroke">{label}</text>')
    (root/"assets/cine"/("region-"+name+".svg")).write_text("\n".join(svg+["</svg>"]))
