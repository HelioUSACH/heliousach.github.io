# Generates the schematic SVG illustrations in public/images/illustrations/.
# Run from that folder: python3 ../../../scripts/gen-illustrations.py
import math
W,H=1200,600
C={'cyan':'#6ddeff','violet':'#9384ff','mint':'#a5ffc5','warm':'#ffb454','ink':'#dfe6ff'}
def head(extra=''):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#070b1f"/><stop offset="1" stop-color="#18204a"/></linearGradient>
<radialGradient id="earth" cx="0.38" cy="0.35" r="0.75"><stop offset="0" stop-color="#5fb4ff"/><stop offset="0.6" stop-color="#1e5bb8"/><stop offset="1" stop-color="#0b2556"/></radialGradient>
<radialGradient id="sun" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fff4c2"/><stop offset="0.55" stop-color="#ffb454"/><stop offset="1" stop-color="#ff7a2f" stop-opacity="0"/></radialGradient>
<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10"/></filter>
<filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3"/></filter>
{extra}
</defs>
<rect width="{W}" height="{H}" fill="url(#bg)"/>
'''
def stars(n=90,seed=3):
    import random; r=random.Random(seed); out=[]
    for _ in range(n):
        out.append(f'<circle cx="{r.uniform(0,W):.0f}" cy="{r.uniform(0,H):.0f}" r="{r.choice([0.7,0.9,1.2,1.5])}" fill="#fff" opacity="{r.uniform(0.25,0.8):.2f}"/>')
    return '\n'.join(out)
def dipole(cx,cy,R,L,side=1,n=200,wave=None):
    pts=[]
    th0=math.asin(min(1,math.sqrt(1/L)))
    for i in range(n+1):
        th=th0+(math.pi-2*th0)*i/n
        r=L*math.sin(th)**2
        if wave: r+=wave(th)
        x=cx+side*R*r*math.sin(th); y=cy-R*r*math.cos(th)
        pts.append(f'{x:.1f},{y:.1f}')
    return 'M'+' L'.join(pts)
def earth(cx,cy,R):
    return f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="url(#earth)"/><path d="M{cx-R},{cy} A{R},{R} 0 0,0 {cx+R},{cy}" fill="none" stroke="#9fd4ff" stroke-width="1" opacity=".4"/><circle cx="{cx}" cy="{cy}" r="{R+4}" fill="none" stroke="#7cc8ff" stroke-width="3" opacity=".35" filter="url(#soft)"/>'
def belt(cx,cy,R,L1,L2,color,op):
    # region between two field lines, both sides
    out=[]
    for side in (1,-1):
        a=dipole(cx,cy,R,L2,side); b=dipole(cx,cy,R,L1,side)
        bpts=b[1:].split(' L'); bpts.reverse()
        out.append(f'<path d="{a} L{" L".join(bpts)} Z" fill="{color}" opacity="{op}" filter="url(#glow)"/>')
    return '\n'.join(out)

# 1 radiation belts
cx,cy,R=600,300,46
s=head()+stars()
s+=belt(cx,cy,R,1.35,2.1,C['warm'],0.55)+belt(cx,cy,R,3.2,6.0,C['violet'],0.55)
for L in [1.6,2.4,3.3,4.4,5.6,7.0,8.6]:
    for side in (1,-1):
        s+=f'<path d="{dipole(cx,cy,R,L,side)}" fill="none" stroke="{C["cyan"]}" stroke-width="1.4" opacity=".55"/>'
s+=earth(cx,cy,R)+'</svg>'
open('radiation-belts.svg','w').write(s)

# 2 ULF waves
cx,cy,R=330,300,40
s=head()+stars(seed=5)
for L in [2.5,3.5,4.6,5.8,7.2,8.8]:
    s+=f'<path d="{dipole(cx,cy,R,L,1)}" fill="none" stroke="{C["cyan"]}" stroke-width="1.3" opacity=".35"/>'
    s+=f'<path d="{dipole(cx,cy,R,L,-1)}" fill="none" stroke="{C["cyan"]}" stroke-width="1.3" opacity=".25"/>'
for k,(amp,col,op) in enumerate([(0.45,C['mint'],.95),(-0.45,C['mint'],.35)]):
    s+=f'<path d="{dipole(cx,cy,R,6.2,1,wave=lambda th,a=amp: a*math.sin(2*th))}" fill="none" stroke="{col}" stroke-width="3" opacity="{op}"/>'
# wave train to the right
pts=[]
for i in range(0,501):
    x=620+i*1.1; y=300+60*math.exp(-((i-250)/190)**2)*math.sin(i/18)
    pts.append(f'{x:.1f},{y:.1f}')
s+=f'<path d="M{" L".join(pts)}" fill="none" stroke="{C["mint"]}" stroke-width="3" opacity=".9"/>'
s+=f'<path d="M{" L".join(pts)}" fill="none" stroke="{C["mint"]}" stroke-width="10" opacity=".25" filter="url(#soft)"/>'
s+=f'<ellipse cx="{cx}" cy="{cy}" rx="{R*5.2}" ry="{R*1.2}" fill="none" stroke="{C["warm"]}" stroke-width="2" stroke-dasharray="6 8" opacity=".75"/>'
s+=earth(cx,cy,R)+'</svg>'
open('ulf-waves.svg','w').write(s)

# 3 ML
import random
r=random.Random(7)
s=head()+stars(40,seed=9)
# time series bottom
pts=[];v=0
series=[]
for i in range(0,1101,4):
    v=0.6*v+r.gauss(0,0.5)
    base=18*math.sin(i/55)+10*math.sin(i/23+1)+6*v
    spike= -95*math.exp(-((i-890)/40)**2)
    series.append((50+i, 470+base+spike))
s+='<path d="M'+' L'.join(f'{x:.0f},{y:.1f}' for x,y in series[:190])+f'" fill="none" stroke="{C["cyan"]}" stroke-width="2.2" opacity=".9"/>'
s+='<path d="M'+' L'.join(f'{x:.0f},{y:.1f}' for x,y in series[189:])+f'" fill="none" stroke="{C["warm"]}" stroke-width="2.2" stroke-dasharray="7 6" opacity=".95"/>'
sm=series[189:]
def smooth(k):
    ys=[y for _,y in sm]; return [sum(ys[max(0,j-k):j+k+1])/len(ys[max(0,j-k):j+k+1]) for j in range(len(ys))]
ys=smooth(6)
up=' L'.join(f'{x:.0f},{y-16-0.10*(x-806):.1f}' for (x,_),y in zip(sm,ys)); dn=' L'.join(f'{x:.0f},{y+16+0.10*(x-806):.1f}' for (x,_),y in reversed(list(zip(sm,ys))))
s+=f'<path d="M{up} L{dn} Z" fill="{C["warm"]}" opacity=".13"/>'
s+=f'<line x1="806" y1="330" x2="806" y2="560" stroke="{C["ink"]}" stroke-width="1" stroke-dasharray="3 5" opacity=".5"/>'
# network top
layers=[5,7,7,4]; xs=[260,470,680,890]; nodes=[]
for L,x in zip(layers,xs):
    nodes.append([(x,70+ (220/(L+1))*(j+1)) for j in range(L)])
for a,b in zip(nodes,nodes[1:]):
    for p in a:
        for q in b:
            s+=f'<line x1="{p[0]}" y1="{p[1]:.0f}" x2="{q[0]}" y2="{q[1]:.0f}" stroke="{C["violet"]}" stroke-width="1" opacity=".35"/>'
for li,a in enumerate(nodes):
    col=[C['cyan'],C['violet'],C['violet'],C['warm']][li]
    for p in a:
        s+=f'<circle cx="{p[0]}" cy="{p[1]:.0f}" r="11" fill="#0b1026" stroke="{col}" stroke-width="2.5"/><circle cx="{p[0]}" cy="{p[1]:.0f}" r="4" fill="{col}"/>'
s+='</svg>'
open('ml-space-weather.svg','w').write(s)

# 4 solar wind - magnetosphere
s=head()+stars(60,seed=11)
s+=f'<circle cx="-120" cy="300" r="330" fill="url(#sun)" opacity=".95"/>'
ex,ey,R=860,300,34
nose=ex-95
def w(x):
    return math.sqrt((x-nose)/0.0075) if x>nose else 0.0
for k in range(-7,8):
    if k==0: continue
    y0=300+k*42; dy=y0-ey
    pts=[]
    for x in range(200,1211,8):
        ww=w(x+60)*1.08
        yy=math.copysign(math.sqrt(dy*dy+ww*ww),dy)
        pts.append(f'{x},{ey+yy:.1f}')
    s+=f'<path d="M{" L".join(pts)}" fill="none" stroke="{C["warm"]}" stroke-width="1.4" opacity=".45"/>'
# bow shock
bs=[]; 
for t in [i/40 for i in range(-40,41)]:
    y=ey+t*300; x=ex-190+ 0.0042*(y-ey)**2
    bs.append(f'{x:.1f},{y:.1f}')
s+=f'<path d="M{" L".join(bs)}" fill="none" stroke="{C["mint"]}" stroke-width="3" opacity=".85"/>'
# magnetopause
mp=[]
for t in [i/40 for i in range(-40,41)]:
    y=ey+t*190; x=ex-95+0.0075*(y-ey)**2
    mp.append(f'{x:.1f},{y:.1f}')
s+=f'<path d="M{" L".join(mp)}" fill="none" stroke="{C["cyan"]}" stroke-width="3" opacity=".9"/>'
for L in [2.0,3.0]:
    for side in (1,-1):
        s+=f'<path d="{dipole(ex,ey,R,L,side)}" fill="none" stroke="{C["cyan"]}" stroke-width="1.3" opacity=".5"/>'
for k in [-1,1]:
    for j,off in enumerate([60,100,140]):
        s+=f'<path d="M{ex-10},{ey+k*(R+4)} C{ex-70},{ey+k*(off+40)} {ex+120},{ey+k*off} {W+20},{ey+k*(off-30)}" fill="none" stroke="{C["cyan"]}" stroke-width="1.3" opacity=".45"/>'
s+=earth(ex,ey,R)+'</svg>'
open('solar-wind-magnetosphere.svg','w').write(s)
