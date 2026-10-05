/* Mapa interactivo de salas · Abrelatam / ConDatos 2026 */
'use strict';
const TYPE = {
  sala1:{fill:'var(--n1-soft)', stroke:'var(--n1)', text:'#0a5f60'},
  sala2:{fill:'var(--n2-soft)', stroke:'var(--n2)', text:'#4b2c97'},
  common:{fill:'var(--common-soft)', stroke:'var(--common)', text:'#7a5600'},
  ext:{fill:'var(--ext-soft)', stroke:'var(--ext)', text:'#1d6331'},
  main:{fill:'url(#gsala)', stroke:'#1d1a52', text:'#ffffff'},
};

/* ---------- drawing helpers ---------- */
const NS = 'http://www.w3.org/2000/svg';
function el(tag, attrs={}, parent){ const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent && parent.appendChild(e); return e; }
function label(parent, x, y, lines, o={}){
  const size = o.size || 20, lh = o.lh || size*1.12;
  const t = el('text', {x, y: y - (lines.length-1)*lh/2, 'text-anchor':'middle', 'dominant-baseline':'middle',
    'font-size':size, 'font-weight':o.weight||800, fill:o.fill||'#262262', 'letter-spacing':o.ls||0}, parent);
  if (o.op) t.setAttribute('opacity', o.op);
  lines.forEach((ln,i) => { const ts = el('tspan', {x, dy: i ? lh : 0}, t); ts.textContent = ln;
    if (o.subFrom !== undefined && i >= o.subFrom){ ts.setAttribute('font-size', size*0.68); ts.setAttribute('font-weight', 600); ts.setAttribute('opacity', .85); } });
  return t;
}
function staticRect(p, x,y,w,h, a={}){ return el('rect', Object.assign({x,y,width:w,height:h,rx:12}, a), p); }

/* ---------- geometría base ----------
 * Lienzo de 1000 × 1100. El mapa está orientado como lo ve quien llega:
 * la entrada (Plaza Principal, lado norte) abajo y el escenario (Plaza Sur) arriba.
 */
const SHAPES = {
  outline: 'M300 60 H700 Q730 60 730 90 V330 H890 Q920 330 920 360 V842 Q920 860 902 861 L500 886 L98 861 Q80 860 80 842 V360 Q80 330 110 330 H270 V90 Q270 60 300 60 Z',
  stage: 'M312 78 H688 Q700 78 700 90 V250 H300 V90 Q300 78 312 78 Z',
  hall: 'M330 262 H670 L712 520 Q500 594 288 520 Z',
  lobby: 'M95 578 H905 V838 L500 866 L95 838 Z',
};
const C = {navy:'#262262', wall:'#262262', floor:'#fbf8f1', floor2:'#f6f3fb', muted:'#9a9cb0'};

function stairs(g, x, y, w, h, vertical){
  const n = 6, grp = el('g', {}, g);
  staticRect(grp, x, y, w, h, {rx:6, fill:'#fff', stroke:'#c9c3b4', 'stroke-width':2});
  for (let i=1;i<n;i++){
    if (vertical) el('line', {x1:x+4, x2:x+w-4, y1:y+h*i/n, y2:y+h*i/n, stroke:'#d8d2c3', 'stroke-width':2}, grp);
    else el('line', {y1:y+4, y2:y+h-4, x1:x+w*i/n, x2:x+w*i/n, stroke:'#d8d2c3', 'stroke-width':2}, grp);
  }
  return grp;
}
function lamp(g, cx, cy, r, op=1){
  const grp = el('g', {opacity:op}, g);
  el('circle', {cx, cy, r:r+8, fill:'#fff5d6', opacity:.8}, grp);
  for (let ring=0; ring<3; ring++){
    const rr = r - ring*(r/3.2), n = 18 - ring*5;
    for (let i=0;i<n;i++){ const a = i/n*Math.PI*2 + ring*.3; el('circle', {cx:cx+Math.cos(a)*rr, cy:cy+Math.sin(a)*rr, r:2.6, fill:'#f6b915'}, grp); }
  }
  el('circle', {cx, cy, r:4, fill:'#e8a400'}, grp);
  return grp;
}
function chip(g, x, y, text, fill='#262262'){
  const w = text.length*8.2 + 22;
  const grp = el('g', {}, g);
  staticRect(grp, x - w/2, y - 15, w, 30, {rx:15, fill});
  label(grp, x, y + 1, [text], {size:13, fill:'#fff', ls:1.2});
  return grp;
}
function plazaStrip(g, entrance){
  staticRect(g, 60, 912, 880, 170, {rx:30, fill:'url(#paving)', stroke:'#cfd8c8', 'stroke-width':2});
  label(g, 500, 1048, ['PLAZA PRINCIPAL'], {size:16, weight:800, fill:'#6b7a63', ls:3});
  if (entrance){
    el('path', {d:'M500 1010 V 892', stroke:C.navy, 'stroke-width':5, 'stroke-linecap':'round', 'marker-end':'url(#arrow)'}, g);
    chip(g, 600, 962, 'ENTRADA · 21 CALLE');
  }
}

/* ---------- niveles del edificio ---------- */
function drawBuilding(g, lv){
  plazaStrip(g, lv === 'n1');
  el('path', {d:SHAPES.outline, fill:'#ffffff', stroke:C.wall, 'stroke-width':5, 'stroke-linejoin':'round', filter:'url(#shadow)'}, g);
  // piso del lobby
  el('path', {d:SHAPES.lobby, fill: lv === 'n1' ? C.floor : C.floor2}, g);

  if (lv === 'n1'){
    // alas laterales junto a la sala: camerinos y servicios
    staticRect(g, 95, 345, 175, 218, {fill:'url(#hatch)'});
    staticRect(g, 730, 345, 175, 218, {fill:'url(#hatch)'});
    label(g, 182, 452, ['Camerinos', 'sin acceso'], {size:14, weight:700, fill:C.muted, subFrom:1});
    label(g, 818, 452, ['Servicios', 'sin acceso'], {size:14, weight:700, fill:C.muted, subFrom:1});
    // puertas de la Gran Sala
    [[392,575],[500,592],[608,575]].forEach(([x,y]) => { el('rect', {x:x-22, y:y-6, width:44, height:12, rx:3, fill:'#fff', stroke:C.navy, 'stroke-width':2.5}, g); });
    // fachada: puertas de ingreso
    el('path', {d:'M440 862 L560 862', stroke:'#fff', 'stroke-width':9}, g);
    el('path', {d:'M440 862 L560 862', stroke:C.navy, 'stroke-width':2, 'stroke-dasharray':'6 6'}, g);
    // gradas al museo (costado derecho, nivel inferior)
    const mu = el('g', {}, g);
    stairs(mu, 690, 752, 70, 72, false);
    label(mu, 832, 778, ['Gradas al', 'Museo Efraín', 'Recinos ↓'], {size:13, weight:700, fill:'#8a7f63', lh:15});
  } else {
    // vacío sobre la Gran Sala (balcones)
    const gh = el('g', {}, g);
    el('path', {d:SHAPES.stage, fill:'#efeef8', stroke:'#cfcbe9', 'stroke-width':2, 'stroke-dasharray':'8 6'}, gh);
    el('path', {d:SHAPES.hall, fill:'#efeef8', stroke:'#cfcbe9', 'stroke-width':2, 'stroke-dasharray':'8 6'}, gh);
    label(gh, 500, 420, ['Gran Sala', 'balcones · entrada por el nivel 1'], {size:22, fill:'#9b98c8', subFrom:1});
    // laterales
    staticRect(g, 95, 345, 175, 45, {fill:'url(#hatch)'});
    staticRect(g, 730, 345, 175, 45, {fill:'url(#hatch)'});
    // vacío del lobby con la lámpara de 999 focos
    const v = el('g', {}, g);
    staticRect(v, 382, 628, 236, 150, {rx:22, fill:'#fff', stroke:'#d9cfb5', 'stroke-width':2.5, 'stroke-dasharray':'9 7'});
    lamp(v, 500, 690, 38, .9);
    label(v, 500, 760, ['Vacío sobre el lobby'], {size:12.5, weight:700, fill:'#a3957a'});
  }
}

/* ---------- exteriores ---------- */
function drawExterior(g){
  staticRect(g, 0, 0, 1000, 1100, {rx:40, fill:'#e3efdf'});
  // caminos
  // calles: 24 calle (arriba, lado de la Plaza Sur) y 21 calle (abajo, lado de la Plaza Principal)
  el('path', {d:'M-20 1052 Q 500 1010 1020 1066', fill:'none', stroke:'#ffffff', 'stroke-width':44, 'stroke-linecap':'round'}, g);
  el('path', {d:'M-20 26 Q 500 46 1020 22', fill:'none', stroke:'#ffffff', 'stroke-width':40, 'stroke-linecap':'round'}, g);
  label(g, 150, 1045, ['21 CALLE'], {size:15, weight:800, fill:'#8e93a8', ls:3});
  label(g, 150, 34, ['24 CALLE'], {size:15, weight:800, fill:'#8e93a8', ls:3});
  el('path', {d:'M500 1030 V 905 M300 50 Q 250 60 250 200 V 640 M700 50 Q 760 60 770 200 V 620 Q 780 700 740 760', fill:'none', stroke:'#f3eee2', 'stroke-width':18, 'stroke-linecap':'round'}, g);
  // árboles
  let seed = 11; const rnd = () => (seed = (seed*9301 + 49297) % 233280) / 233280;
  const avoid = [[0,0,1000,64],[400,985,210,70],[690,40,220,170],[280,190,440,470],[310,60,380,140],[110,660,600,240],[50,860,280,150],[20,630,100,220],[720,290,140,130],[0,1015,1000,85],[460,880,80,140]];
  const trees = el('g', {}, g);
  for (let i=0, n=0; i<1400 && n<110; i++){
    const x = 30 + rnd()*940, y = 30 + rnd()*990, r = 9 + rnd()*12;
    if (avoid.some(([ax,ay,aw,ah]) => x>ax-r && x<ax+aw+r && y>ay-r && y<ay+ah+r)) continue;
    n++; el('circle', {cx:x, cy:y, r, fill: rnd()>.5 ? '#9fcf98' : '#b7dbb0', stroke:'#86bf7e', 'stroke-width':1.5}, trees);
  }
  // Gran Sala (edificio)
  const b = el('g', {}, g);
  el('path', {d:'M380 200 H620 Q640 200 640 220 V380 H690 Q712 380 712 402 V615 Q712 632 695 634 L500 650 L305 634 Q288 632 288 615 V402 Q288 380 310 380 H360 V220 Q360 200 380 200 Z',
    fill:'#dcdaf2', stroke:C.navy, 'stroke-width':5, 'stroke-linejoin':'round', filter:'url(#shadow)'}, b);
  staticRect(b, 376, 214, 248, 118, {rx:12, fill:'#2c4fa8'});
  for (let i=0;i<5;i++) for (let j=0;j<12;j++) if ((i+j)%3) el('rect', {x:388+j*19.5, y:226+i*19, width:15, height:15, rx:2, fill:['#3d6fd0','#4a86e0','#2f5cba'][(i*7+j)%3], opacity:.9}, b);
  chip(b, 500, 273, 'CUBO ESCÉNICO', '#1d1a52');
  el('path', {d:'M378 345 H622 L650 500 Q500 545 350 500 Z', fill:'url(#gsala)'}, b);
  label(b, 500, 446, ['Gran Sala', 'Efraín Recinos'], {size:22, fill:'#ffffff'});
  label(b, 500, 588, ['LOBBY'], {size:14, weight:800, fill:'#6d68b0', ls:3});
  // Teatro de Cámara (bajo la Gran Sala, acceso por 24 calle)
  const tc = el('g', {}, g);
  staticRect(tc, 728, 300, 120, 110, {rx:14, fill:'#d3eff1', stroke:'#2a9da3', 'stroke-width':2.5});
  label(tc, 788, 345, ['Teatro de', 'Cámara'], {size:15, weight:800, fill:'#1f7479'});
  label(tc, 788, 388, ['acceso 24 calle'], {size:11.5, weight:600, fill:'#1f7479'});
  el('path', {d:'M712 355 H728', stroke:'#2a9da3', 'stroke-width':3, 'stroke-dasharray':'3 4'}, tc);
  // Plaza Mujeres
  const pm = el('g', {}, g);
  staticRect(pm, 120, 670, 160, 150, {rx:22, fill:'url(#paving)', stroke:'#cfd8c8', 'stroke-width':2});
  label(pm, 200, 745, ['Plaza', 'Mujeres'], {size:15, weight:800, fill:'#6b7a63'});
  // Teatro al Aire Libre (lado norte)
  const ta = el('g', {}, g);
  el('path', {d:'M60 1000 A 130 130 0 0 1 320 1000 Z', fill:'#cfe7c9', stroke:'#7fb878', 'stroke-width':2.5}, ta);
  for (let k=1;k<4;k++){ const r = 130 - k*26; el('path', {d:`M${190-r} 1000 A ${r} ${r} 0 0 1 ${190+r} 1000`, fill:'none', stroke:'#a9d3a2', 'stroke-width':2}, ta); }
  label(ta, 190, 968, ['Teatro al', 'Aire Libre'], {size:15, weight:800, fill:'#4f7d4a'});
  // Escuela Nacional de Marimba (este)
  const mb = el('g', {}, g);
  staticRect(mb, 30, 640, 76, 200, {rx:12, fill:'#efe6d5', stroke:'#b9a684', 'stroke-width':2});
  const tm = label(mb, 68, 740, ['Escuela Nacional de Marimba'], {size:12.5, weight:700, fill:'#7a6a4c'});
  tm.setAttribute('transform', 'rotate(-90 68 740)');
  // accesos (las entradas se dibujan como espacios en datos.js)
  el('path', {d:'M500 998 V 914', stroke:C.navy, 'stroke-width':5, 'stroke-linecap':'round', 'marker-end':'url(#arrow)'}, g);
  el('path', {d:'M795 56 Q 790 120 772 196', fill:'none', stroke:C.navy, 'stroke-width':5, 'stroke-linecap':'round', 'marker-end':'url(#arrow)'}, g);
  // brújula: el norte queda hacia abajo (vista desde la entrada)
  const cp = el('g', {transform:'translate(930 470)'}, g);
  el('circle', {r:34, fill:'#fff', stroke:'#d5d8e6', 'stroke-width':2}, cp);
  el('path', {d:'M0 24 L-10 -6 L0 0 L10 -6 Z', fill:'#e8443a'}, cp);
  el('path', {d:'M0 -24 L-10 -6 L0 0 L10 -6 Z', fill:'#c9cbd8'}, cp);
  label(cp, 0, -48, ['S'], {size:13, fill:'#9a9cb0'});
  label(cp, 0, 50, ['N'], {size:14, fill:'#e8443a'});
}

/* ---------- salas ---------- */
function drawRoom(g, r){
  const t = TYPE[r.type];
  const grp = el('g', {class:'room', id:'room-'+r.id, tabindex:0, role:'button', 'aria-label':r.name, 'data-id':r.id}, g);
  const common = {class:'shape', fill:t.fill, stroke:t.stroke, 'stroke-width':3, 'stroke-dasharray':r.dashed?'10 6':'none', 'fill-rule':'evenodd'};
  if (r.d){ el('path', Object.assign({d:r.d}, common), grp); el('path', {d:r.d, class:'ring', 'fill-rule':'evenodd'}, grp); }
  else { el('rect', Object.assign({x:r.x, y:r.y, width:r.w, height:r.h, rx:r.rx ?? 16}, common), grp); el('rect', {x:r.x, y:r.y, width:r.w, height:r.h, rx:r.rx ?? 16, class:'ring'}, grp); }
  if (r.deco) r.deco(el('g', {class:'deco'}, grp), r);
  const sz = r.size||19, lh = r.lh || sz*1.15;
  label(grp, r.lx, r.ly, r.lines, {size:sz, fill:t.text, subFrom:r.subFrom, lh});
  if (r.kicker) label(grp, r.lx, r.ly - (r.lines.length-1)*lh/2 - sz*0.98, [r.kicker], {size:11.5, weight:800, ls:2, fill:t.text, op:.75});
  const bd = el('g', {class:'badge'}, grp);
  el('circle', {cx:r.bx, cy:r.by, r:17, fill:r.type==='main' ? '#ffffff' : t.stroke, stroke:'#fff', 'stroke-width':3}, bd);
  const nt = el('text', {x:r.bx, y:r.by+1, 'text-anchor':'middle', 'dominant-baseline':'middle', 'font-size':15, 'font-weight':900, fill:r.type==='main' ? C.navy : '#fff'}, bd);
  nt.textContent = r.n;
  return grp;
}

/* decoraciones de cada sala */
function screen(g, x, y, w){ // pantalla + filas de sillas: "sala de charlas"
  el('rect', {x:x-w/2, y, width:w, height:7, rx:3.5, fill:'currentColor', opacity:.55}, g);
  for (let row=0; row<2; row++) for (let i=0;i<5;i++) el('rect', {x:x-w/2+4+i*(w-8)/5, y:y+14+row*10, width:(w-8)/5-5, height:5, rx:2.5, fill:'currentColor', opacity:.3}, g);
}
const deco = {
  sala: (g, r) => { g.setAttribute('color', TYPE[r.type].stroke); screen(g, r.x + r.w - 52, r.y + 16, 64); },
  seats: g => { label(g, 500, 165, ['ESCENARIO'], {size:13, fill:'#ffffff', ls:3, op:.55}); for (let k=0;k<6;k++){ const y=290+k*36; const sp=(y-262)/258*42; el('path', {d:`M${338-sp+6} ${y} Q500 ${y+26+k*5} ${662+sp-6} ${y}`, fill:'none', stroke:'#ffffff', 'stroke-opacity':.15, 'stroke-width':10, 'stroke-linecap':'round'}, g); } },
  lobby: g => { lamp(g, 500, 640, 30); },
  stands: (g, r) => { [[0,0],[46,0]].forEach(([dx]) => el('rect', {x:r.x+r.w-96+dx, y:r.y+14, width:40, height:28, rx:5, fill:'#fff', stroke:'#e2b84a', 'stroke-width':2}, g)); },
  postits: g => { [[560,598],[580,606],[600,598],[620,606]].forEach(([x,y],i) => el('rect', {x, y, width:16, height:16, rx:3, fill:['#f6b915','#e8443a','#3aa655','#2f6fd6','#e8443a','#f6b915'][i], transform:`rotate(${(i%2?7:-6)} ${x+8} ${y+8})`}, g)); },
  dorado: (g, r) => { g.setAttribute('color', TYPE[r.type].stroke); screen(g, r.x + r.w - 52, r.y + 16, 64);
    for (let i=0;i<5;i++) el('line', {x1:r.x+20+i*22, x2:r.x+30+i*22, y1:r.y+r.h-4, y2:r.y+r.h-4, stroke:'#9ad0f0', 'stroke-width':5, 'stroke-linecap':'round'}, g); },
  tents: g => { for (let i=0;i<4;i++){ const x=362+i*80; el('path', {d:`M${x} 176 L${x+28} 144 L${x+56} 176 Z`, fill:'#fff', stroke:'#2b8f45', 'stroke-width':2.5, 'stroke-linejoin':'round'}, g); } },
  plaza: g => {
    el('path', {d:'M372 822 q40 -30 90 -8 q30 14 10 34 q-40 26 -100 -26z', fill:'#bfe3f2', stroke:'#7cc3df', 'stroke-width':2}, g);
    el('path', {d:'M540 830 q50 -38 100 -6 q24 18 -4 36 q-50 20 -96 -30z', fill:'#bfe3f2', stroke:'#7cc3df', 'stroke-width':2}, g);
    el('circle', {cx:338, cy:760, r:19, fill:'#fff', stroke:'#e8443a', 'stroke-width':3}, g);
    el('path', {d:'M338 750 V770 M328 760 H348', stroke:'#e8443a', 'stroke-width':5, 'stroke-linecap':'round'}, g);
    el('path', {d:'M640 780 L662 750 L684 780 Z', fill:'#fff', stroke:'#2b8f45', 'stroke-width':3, 'stroke-linejoin':'round'}, g);
    el('path', {d:'M500 828 l7 14 15 2 -11 10 3 15 -14 -7 -14 7 3 -15 -11 -10 15 -2z', fill:'#f6b915', stroke:'#c78f00', 'stroke-width':1.5}, g);
    label(g, 500, 878, ['Escultura de Efraín Recinos'], {size:11.5, weight:700, fill:'#1d6331', op:.8});
  },
};

/* ---------- construir ---------- */
const svg = document.getElementById('svg');
const G = {n1:document.getElementById('lv-n1'), n2:document.getElementById('lv-n2'), ext:document.getElementById('lv-ext')};
drawBuilding(G.n1,'n1'); drawBuilding(G.n2,'n2'); drawExterior(G.ext);
ROOMS.forEach(r => { if (r.decoKey) r.deco = deco[r.decoKey]; drawRoom(G[r.level], r); });

/* ---------- UI ---------- */
const $ = s => document.querySelector(s);
const map = $('#map'), stage = $('#stage');
const natW = 1000, natH = 1100;
let level = null, current = null, s = 1, tx = 0, ty = 0;

const tabs = $('.tabs');
LEVELS.forEach(l => {
  const b = document.createElement('button');
  b.className = 'tab'; b.setAttribute('role','tab'); b.id = 'tab-' + l.id;
  b.style.setProperty('--c', l.color);
  b.innerHTML = `<span class="dot"></span>${l.short}`;
  b.onclick = () => { select(null); showLevel(l.id); fit(true); };
  tabs.appendChild(b);
});

const LEGENDS = {
  n1:[['Salas de charlas','var(--n1-soft)','var(--n1)'],['Gran Sala','#3a3592','#1d1a52'],['Registro, lobby y stands','var(--common-soft)','var(--common)'],['Sin acceso','#eceef4','#d0d3de']],
  n2:[['Salas de charlas','var(--n2-soft)','var(--n2)'],['Lobby y agenda','var(--common-soft)','var(--common)'],['Sin acceso','#eceef4','#d0d3de']],
  ext:[['Espacios del evento','var(--ext-soft)','var(--ext)'],['Gran Sala','#dcdaf2','#262262'],['Otros espacios','#efe6d5','#b9a684']],
};
function showLevel(id){
  if (level === id) return;
  level = id;
  const L = LEVELS.find(l => l.id === id);
  document.querySelectorAll('.tab').forEach(t => t.setAttribute('aria-selected', t.id === 'tab-' + id));
  Object.entries(G).forEach(([k,g]) => g.style.display = k === id ? '' : 'none');
  const note = $('#note'); note.style.setProperty('--c', L.color);
  note.innerHTML = `<span class="lvtag">${L.name}</span><br>${L.note}`;
  $('#legend').innerHTML = LEGENDS[id].map(([t,f,s]) => `<span><i style="--f:${f};--s:${s}"></i>${t}</span>`).join('');
}

/* pan / zoom */
function ins(){ return {t: $('#note').offsetHeight + 22, b: $('#legend').offsetHeight + 22}; }
function fitScale(){ const I = ins(); return Math.min(map.clientWidth / natW, (map.clientHeight - I.t - I.b) / natH) * 0.97; }
function apply(anim){
  stage.style.transition = anim ? 'transform .5s cubic-bezier(.2,.7,.2,1)' : 'none';
  stage.style.transform = `translate(${tx}px,${ty}px) scale(${s})`;
}
function clamp(){
  const I = ins(), W = natW*s, H = natH*s, mw = map.clientWidth, mh = map.clientHeight, pad = 60;
  tx = W <= mw ? (mw - W)/2 : Math.min(pad, Math.max(mw - W - pad, tx));
  ty = H <= mh - I.t - I.b ? I.t + (mh - I.t - I.b - H)/2 : Math.min(I.t, Math.max(mh - H - I.b, ty));
}
function fit(anim){ s = fitScale(); clamp(); apply(anim); }
function zoomAt(f, cx, cy, anim){
  const min = fitScale(), max = min * 5;
  const ns = Math.min(max, Math.max(min, s * f));
  tx = cx - (cx - tx) * ns / s; ty = cy - (cy - ty) * ns / s; s = ns; clamp(); apply(anim);
}
function focusRoom(id){
  const shape = document.querySelector('#room-' + id + ' .shape'); if (!shape) return;
  const I = ins(), bb = shape.getBBox(), min = fitScale(), vh = map.clientHeight - I.t - I.b;
  s = Math.max(min, Math.min(map.clientWidth*.55/bb.width, vh*.6/bb.height, min*1.9));
  tx = map.clientWidth/2 - (bb.x + bb.width/2)*s; ty = I.t + vh/2 - (bb.y + bb.height/2)*s; clamp(); apply(true);
}
$('#zin').onclick = () => zoomAt(1.4, map.clientWidth/2, map.clientHeight/2, true);
$('#zout').onclick = () => zoomAt(1/1.4, map.clientWidth/2, map.clientHeight/2, true);
$('#zfit').onclick = () => fit(true);

const ptrs = new Map(); let last = null, pinchD = 0, downAt = null, moved = false, downTarget = null;
map.addEventListener('pointerdown', e => {
  if (e.target.closest('.zoom,.mapnote,.legend')) return;
  ptrs.set(e.pointerId, {x:e.clientX, y:e.clientY});
  last = {x:e.clientX, y:e.clientY};
  if (ptrs.size === 1){ downAt = {x:e.clientX, y:e.clientY}; moved = false; downTarget = e.target; }
  else { moved = true; const [a,b] = [...ptrs.values()]; pinchD = Math.hypot(a.x-b.x, a.y-b.y); }
});
map.addEventListener('pointermove', e => {
  if (!ptrs.has(e.pointerId)) return;
  ptrs.set(e.pointerId, {x:e.clientX, y:e.clientY});
  if (!moved && Math.hypot(e.clientX-downAt.x, e.clientY-downAt.y) > 6){ moved = true; map.classList.add('dragging'); try{ map.setPointerCapture(e.pointerId); }catch(_){} }
  if (!moved) return;
  if (ptrs.size === 2){
    const [a,b] = [...ptrs.values()], d = Math.hypot(a.x-b.x, a.y-b.y), rc = map.getBoundingClientRect();
    if (pinchD) zoomAt(d/pinchD, (a.x+b.x)/2 - rc.left, (a.y+b.y)/2 - rc.top, false);
    pinchD = d; return;
  }
  tx += e.clientX - last.x; ty += e.clientY - last.y; last = {x:e.clientX, y:e.clientY}; clamp(); apply(false);
});
function up(e){
  if (!ptrs.has(e.pointerId)) return;
  const wasTap = !moved && ptrs.size === 1;
  ptrs.delete(e.pointerId); pinchD = 0;
  if (!ptrs.size) map.classList.remove('dragging'); else last = [...ptrs.values()][0];
  if (wasTap && e.type === 'pointerup'){
    const room = downTarget && downTarget.closest && downTarget.closest('.room');
    select(room ? room.dataset.id : null);
  }
}
map.addEventListener('pointerup', up); map.addEventListener('pointercancel', up);
map.addEventListener('wheel', e => {
  if (!(e.ctrlKey || e.metaKey)) return; // no secuestra el scroll de la página donde se incrusta
  e.preventDefault(); const rc = map.getBoundingClientRect();
  zoomAt(e.deltaY < 0 ? 1.12 : 1/1.12, e.clientX - rc.left, e.clientY - rc.top, false);
}, {passive:false});
map.addEventListener('dblclick', e => { if (e.target.closest('.room,.zoom')) return; const rc = map.getBoundingClientRect(); zoomAt(1.7, e.clientX-rc.left, e.clientY-rc.top, true); });
svg.addEventListener('keydown', e => { const r = e.target.closest && e.target.closest('.room'); if (r && (e.key === 'Enter' || e.key === ' ')){ e.preventDefault(); select(r.dataset.id); } });
let rz; window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => current ? focusRoom(current) : fit(false), 120); });

/* list */
const norm = t => t.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function renderList(q=''){
  const nq = norm(q.trim()), list = $('#list'); list.innerHTML = '';
  LEVELS.forEach(L => {
    const rs = ROOMS.filter(r => r.level === L.id && (!nq || norm(r.name + ' ' + r.where + ' ' + (r.tags||'')).includes(nq)));
    if (!rs.length) return;
    const g = document.createElement('div'); g.className = 'group'; g.style.setProperty('--c', L.color); g.textContent = L.name; list.appendChild(g);
    rs.forEach(r => {
      const b = document.createElement('button'); b.className = 'item' + (r.id === current ? ' on' : ''); b.id = 'item-' + r.id;
      b.style.setProperty('--c', L.color);
      b.innerHTML = `<span class="num">${r.n}</span><span><b>${r.name}</b><small>${r.where}</small></span>`;
      b.onclick = () => select(r.id, true);
      list.appendChild(b);
    });
  });
  if (!list.children.length) list.innerHTML = '<p style="color:var(--muted);font-size:14px;padding:8px">Sin resultados.</p>';
}
$('#q').addEventListener('input', e => renderList(e.target.value));

/* detail */
function renderDetail(r){
  const d = $('#detail');
  if (!r){
    d.className = 'detail empty';
    d.innerHTML = `<div class="empty-ill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z"/><path d="M9 4v14M15 6v14"/></svg></div>
      <strong>¿A qué sala vas?</strong><p>Toca una sala en el mapa o elígela en la lista para ver dónde está y cómo llegar.</p>`;
    return;
  }
  const L = LEVELS.find(l => l.id === r.level);
  d.className = 'detail'; d.style.setProperty('--c', L.color);
  d.innerHTML = `
    ${r.foto ? `<div class="photo"><img src="${r.foto}" loading="lazy" alt="Referencia visual de ${r.name}"><span>Imagen de referencia</span></div>` : ''}
    <span class="badge-lv">${L.name}</span>
    <h2><span class="n">${r.n}</span>${r.name}</h2>
    <p class="where">${r.where}</p>
    <div class="how"><h3>Cómo llegar</h3><p>${r.how}</p></div>
    ${r.facts ? `<div class="facts">${r.facts.map(f=>`<span>${f}</span>`).join('')}</div>` : ''}
    <div class="actions"><button class="btn" id="share">Copiar enlace</button><button class="btn" id="clear">Ver todo</button></div>`;
  $('#share').onclick = async () => {
    const url = PARENT_URL ? PARENT_URL.split('#')[0] + '#sala=' + r.id   // página donde está incrustado
                           : location.href.split('#')[0] + '#' + r.id;
    try { await navigator.clipboard.writeText(url); $('#share').textContent = '¡Enlace copiado!'; }
    catch(e){ $('#share').textContent = url; }
  };
  $('#clear').onclick = () => { select(null); fit(true); };
}

function select(id, scroll){
  document.querySelectorAll('.room.on,.item.on').forEach(e => e.classList.remove('on'));
  current = id || null;
  const r = ROOMS.find(x => x.id === id);
  svg.classList.toggle('has-sel', !!r);
  if (!r){ renderDetail(null); if (location.hash) history.replaceState(null,'',location.pathname+location.search); notifyParent({type:'mapa-salas:sala', id:null}); return; }
  showLevel(r.level);
  const g = document.getElementById('room-' + id); g.classList.add('on'); g.parentNode.appendChild(g);
  const it = document.getElementById('item-' + id); it && it.classList.add('on');
  renderDetail(r); focusRoom(id);
  history.replaceState(null, '', '#' + id);
  notifyParent({type:'mapa-salas:sala', id});
  if (scroll && window.matchMedia('(max-width:880px)').matches) map.scrollIntoView({behavior:'smooth', block:'start'});
}

/* ---------- integración con la página que incrusta el mapa (embed.js) ---------- */
let PARENT_URL = null;
const EMBEDDED = window.parent !== window;
function notifyParent(msg){ if (EMBEDDED) window.parent.postMessage(msg, '*'); }
function reportHeight(){
  // En móvil el mapa y la lista se apilan: pedimos a la página que ajuste la altura del iframe.
  const stacked = window.matchMedia('(max-width:880px)').matches;
  notifyParent({type:'mapa-salas:height', h: stacked ? document.documentElement.scrollHeight : null});
}
if (EMBEDDED){
  document.documentElement.classList.add('embedded');
  window.addEventListener('message', e => {
    const m = e.data || {};
    if (m.type === 'mapa-salas:parent' && typeof m.url === 'string'){ PARENT_URL = m.url; if (m.sala && ROOMS.some(r => r.id === m.sala)) select(m.sala); }
    if (m.type === 'mapa-salas:select' && ROOMS.some(r => r.id === m.id)) select(m.id);
  });
  new ResizeObserver(reportHeight).observe(document.body);
  window.addEventListener('load', reportHeight);
  notifyParent({type:'mapa-salas:ready'});
}

/* inicio: admite enlaces directos ...#tikal o ?sala=tikal */
renderList();
const start = new URLSearchParams(location.search).get('sala') || location.hash.slice(1);
showLevel('n1'); fit(false);
if (ROOMS.some(r => r.id === start)) requestAnimationFrame(() => select(start)); else renderDetail(null);
window.addEventListener('hashchange', () => { const h = location.hash.slice(1); if (h !== current && ROOMS.some(r=>r.id===h)) select(h); });
