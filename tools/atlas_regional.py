"""Mapas escolares generalizados. Uso: python3 atlas_regional.py states10.json carpeta_de_cortes
Los cuatro JSON de consulta tienen las URLs indicadas en app/atlas-temporal.js.
Solo se distribuye el resultado por celdas de 65 km, en proyección equivalente EPSG:3035.
"""
import json
import sys
from pathlib import Path
from osgeo import ogr, osr
from xml.sax.saxutils import escape

ogr.UseExceptions()
root = Path(__file__).resolve().parents[1]
wgs, metric = osr.SpatialReference(), osr.SpatialReference()
wgs.ImportFromEPSG(4326)
metric.ImportFromEPSG(3035)
for ref in (wgs, metric):
    ref.SetAxisMappingStrategy(osr.OAMS_TRADITIONAL_GIS_ORDER)
project = osr.CoordinateTransformation(wgs, metric)

def geometry(feature):
    g = ogr.CreateGeometryFromJson(json.dumps(feature["geometry"])).MakeValid()
    g.Transform(project)
    return g

regions = []
peninsula = []
for f in json.loads(Path(sys.argv[1]).read_text())["features"]:
    p = f["properties"]
    if p["admin"] == "Ukraine" or p["name"] in ("Crimea", "Sevastopol"):
        g = geometry(f)
        regions.append(g)
        if p["name"] in ("Crimea", "Sevastopol"):
            peninsula.append(g)

def union(parts):
    out = parts[0].Clone()
    for part in parts[1:]:
        out = out.Union(part)
    return out

country = union(regions)
left, right, bottom, top = country.GetEnvelope()
def xy(x,y):
    return (x-left)/1000+65,(top-y)/1000+55
def path(g):
    if g.GetGeometryName() in ("LINEARRING","LINESTRING"):
        return "M"+"L".join("%.1f,%.1f"%xy(*p[:2]) for p in g.GetPoints())+"Z"
    return "".join(path(child) for child in g if not child.IsEmpty())

cells = []
size = 65000
for x in range(int(left)//size*size,int(right),size):
    for y in range(int(bottom)//size*size,int(top),size):
        rect = ogr.CreateGeometryFromWkt(f"POLYGON (({x} {y},{x+size} {y},{x+size} {y+size},{x} {y+size},{x} {y}))")
        cut = country.Intersection(rect)
        if cut.Area() > 1000000:
            cells.append(cut)
for date in ("2022-03-30","2022-11-15","20240710","20261120"):
    item = json.loads((Path(sys.argv[2])/(date+".json")).read_text())
    obs = [geometry(f) for f in item.get("value",item)["features"] if f["properties"].get("type") != "losses"]
    if "value" in item:
        obs.extend(peninsula)  # La serie NZZ excluye Crimea en estos dos archivos.
    control = union(obs)
    width,height=xy(right,bottom)
    svg=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width+50:.0f} {height+50:.0f}">']
    base = path(country.SimplifyPreserveTopology(2000))
    svg.append(f'<path d="{base}" fill="#344952"/>')
    for cell in cells:
        if control.Intersects(cell) and control.Intersection(cell).Area() >= cell.Area()/2:
            svg.append(f'<path d="{path(cell.SimplifyPreserveTopology(1600))}" fill="#c49661" stroke="#d8b58b" stroke-width=".6"/>')
    for region in regions:
        svg.append(f'<path d="{path(region.SimplifyPreserveTopology(1800))}" fill="none" stroke="#b2c2bc" opacity=".35" stroke-width="1.4"/>')
    svg.append(f'<path d="{base}" fill="none" stroke="#efdfbb" stroke-width="3"/>')
    for lon,lat,label in [(30.52,50.45,"Kiev"),(36.23,50,"Járkiv"),(32.62,46.64,"Jersón"),(37.8,48.02,"Donetsk"),(34.1,44.95,"Crimea")]:
        x,y=xy(*project.TransformPoint(lon,lat)[:2])
        svg.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="5" fill="#fff5e5"/><text x="{x+9:.1f}" y="{y-8:.1f}" fill="#fff5e5" stroke="#25343b" stroke-width="4" paint-order="stroke" font-family="sans-serif" font-size="23">{escape(label)}</text>')
    (root/"assets/mapas"/("control-"+date+".svg")).write_text("\n".join(svg+["</svg>"]))
