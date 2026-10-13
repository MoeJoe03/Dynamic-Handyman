"""Preserve original contours; spatially partition only where traces are joined.

Run from the repository root. No raster data is embedded in the deliverables.
"""
import re
import json
import copy
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
HERE = Path(__file__).resolve().parent
NS = 'http://www.w3.org/2000/svg'
ET.register_namespace('', NS)
def tag(name): return '{' + NS + '}' + name

regions = json.loads((HERE / 'regions.json').read_text())
source = ET.parse(HERE / 'source.svg').getroot()

def inside(x, y, polygon):
    hit = False
    for (ax, ay), (bx, by) in zip(polygon, polygon[1:] + polygon[:1]):
        if (ay > y) != (by > y) and x < (bx - ax) * (y - ay) / (by - ay) + ax:
            hit = not hit
    return hit

def bounds(points):
    xs, ys = zip(*points)
    return min(xs), min(ys), max(xs), max(ys)

def overlap(a, b):
    return a[0] <= b[2] and a[2] >= b[0] and a[1] <= b[3] and a[3] >= b[1]

def contained(box, polygon):
    x0,y0,x1,y1 = box
    # A box with all corners inside and no polygon edge crossing its interior
    # cannot cross the region boundary. Conservative rejection is harmless.
    if not all(inside(x,y,polygon) for x,y in [(x0,y0),(x1,y0),(x1,y1),(x0,y1)]): return False
    for a,b in zip(polygon,polygon[1:]+polygon[:1]):
        if overlap(bounds([a,b]),box): return False
    return True

def touches(box, polygon):
    x0,y0,x1,y1 = box
    if any(inside(x,y,polygon) for x,y in [(x0,y0),(x1,y0),(x1,y1),(x0,y1)]): return True
    for (ax,ay),(bx,by) in zip(polygon,polygon[1:]+polygon[:1]):
        low, high = 0., 1.
        for start,delta,minimum,maximum in [(ax,bx-ax,x0,x1),(ay,by-ay,y0,y1)]:
            if delta == 0:
                if start < minimum or start > maximum: high = -1; break
            else:
                t0,t1 = sorted(((minimum-start)/delta,(maximum-start)/delta))
                low,high = max(low,t0),min(high,t1)
        if low <= high: return True
    return False

for region in regions:
    region['bounds'] = bounds(region['polygon'])

layers = []
for path in source.findall(tag('path')):
    contours = []
    for d in re.findall(r'M[^M]+', path.get('d')):
        points = [tuple(map(float, p)) for p in re.findall(r'([\d.]+),([\d.]+)', d)]
        contours.append((d, points, bounds(points)))
    layers.append((path.get('fill'), contours))

root = ET.Element(tag('svg'), dict(source.attrib))
defs = ET.SubElement(root, tag('defs'))
original_defs = source.find(tag('defs'))
for node in original_defs: defs.append(node)

def polygon_d(points):
    return 'M' + 'L'.join(f'{x},{y}' for x, y in points) + 'Z'

for r in regions:
    clip = ET.SubElement(defs, tag('clipPath'), {'id': r['id'] + '-clip', 'clipPathUnits':'userSpaceOnUse'})
    ET.SubElement(clip, tag('path'), {'d': polygon_d(r['polygon'])})

for r in regions:
    outside = ET.SubElement(defs, tag('clipPath'), {'id':r['id']+'-outside','clipPathUnits':'userSpaceOnUse'})
    ET.SubElement(outside, tag('path'), {'d':'M0,0H2171V724H0Z'+polygon_d(r['polygon']), 'clip-rule':'evenodd','fill-rule':'evenodd'})
background = ET.SubElement(root, tag('g'), {'id':'stationary-blueprint'})
for rect in source.findall(tag('rect')): background.append(rect)
background_details = background
for r in regions:
    background_details = ET.SubElement(background_details, tag('g'), {'clip-path':'url(#'+r['id']+'-outside)'})
for color, contours in layers:
    selected = [d for d,_,box in contours if not any(contained(box,r['polygon']) for r in regions)]
    ET.SubElement(background_details, tag('path'), {'fill':color,'fill-rule':'evenodd','d': ''.join(selected)})

for index, r in enumerate(regions):
    px,py = r['pivot']
    position = ET.SubElement(root, tag('g'), {'id':r['id'] + '-position','transform':f'translate({px} {py})'})
    motion = ET.SubElement(position, tag('g'), {'id':r['id'], 'class':'hand-tool'})
    restored = ET.SubElement(motion, tag('g'), {'transform':f'translate({-px} {-py})'})
    clipped = ET.SubElement(restored, tag('g'), {'clip-path':'url(#' + r['id'] + '-clip)'})
    for prior in regions[:index]:
        if overlap(prior['bounds'],r['bounds']):
            clipped = ET.SubElement(clipped,tag('g'),{'clip-path':'url(#'+prior['id']+'-outside)'})
    for color, contours in layers:
        selected = [d for d,_,box in contours if overlap(box,r['bounds']) and touches(box,r['polygon']) and not any(contained(box,prior['polygon']) for prior in regions[:index])]
        ET.SubElement(clipped, tag('path'), {'fill':color,'fill-rule':'evenodd','d': ''.join(selected)})

out = ROOT / 'public/images/dynamic-handyman-footer-layered.svg'
ET.ElementTree(root).write(out, encoding='utf-8', xml_declaration=True)
print('Wrote',out)

animated = copy.deepcopy(root)
durations = [5.2,6.1,4.6,6.8,5.7,4.9,6.4,5.4,4.3,6.9]
delays = [-1.1,-3.4,-.6,-4.7,-2.3,-3.8,-1.9,-4.1,-.8,-5.3]
css = ['.hand-tool{transform-box:view-box;transform-origin:0 0;animation:hand-sway 6s ease-in-out infinite;}']
for r,duration,delay in zip(regions,durations,delays):
    css.append('#'+r['id']+'{animation-duration:'+str(duration)+'s;animation-delay:'+str(delay)+'s;}')
css += ['@keyframes hand-sway{0%,100%{transform:rotate(-1.2deg)}50%{transform:rotate(1.2deg)}}',
        '@media(prefers-reduced-motion:reduce){.hand-tool{animation:none;transform:none}}']
ET.SubElement(animated.find(tag('defs')),tag('style')).text='\n'.join(css)
if '--animate' in sys.argv:
    ET.ElementTree(animated).write(ROOT / 'public/images/dynamic-handyman-animated-footer.svg',encoding='utf-8',xml_declaration=True)

for angle in ([-1.2,1.2] if '--inspect' in sys.argv else []):
    extreme=copy.deepcopy(root)
    for el in extreme.iter(tag('g')):
        if el.get('class')=='hand-tool': el.set('transform',f'rotate({angle})')
    ET.ElementTree(extreme).write(HERE / f'extreme-{angle}.svg',encoding='utf-8')

if '--inspect' in sys.argv:
    # Inspection version labels spatial boundaries. Never used by the website.
    for r in regions:
        ET.SubElement(root, tag('path'), {'d':polygon_d(r['polygon']),'fill':'none','stroke':'#ff5050','stroke-width':'2'})
        label = ET.SubElement(root, tag('text'), {'x':str(r['bounds'][0]+5),'y':str(r['bounds'][1]-5),'fill':'#ff5050','font-size':'16'})
        label.text = r['id']
    ET.ElementTree(root).write(HERE / 'regions-preview.svg', encoding='utf-8')
