const { useState, useRef, useEffect, useCallback, useMemo } = React;

/* ----------------------------- icons ----------------------------- */
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
const IcoPalette = () => (
  <svg className="ico" viewBox="0 0 24 24" {...stroke}>
    <path d="M12 3a9 9 0 1 0 0 18c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1-.24-.27-.39-.62-.39-1 0-.83.67-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4.42-4.03-8-9-8Z"/>
    <circle cx="7.5" cy="10.5" r="1.1" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="7.5" r="1.1" fill="currentColor" stroke="none"/>
    <circle cx="16.5" cy="10.5" r="1.1" fill="currentColor" stroke="none"/>
  </svg>
);
const IcoChevron = () => (<svg className="chev" viewBox="0 0 24 24" {...stroke}><path d="m6 15 6-6 6 6"/></svg>);
const IcoChevL = () => (<svg viewBox="0 0 24 24" {...stroke}><path d="m15 18-6-6 6-6"/></svg>);
const IcoChevR = () => (<svg viewBox="0 0 24 24" {...stroke}><path d="m9 18 6-6-6-6"/></svg>);
const IcoX = () => (<svg className="ico" viewBox="0 0 24 24" {...stroke}><path d="M18 6 6 18M6 6l12 12"/></svg>);
const IcoEye = () => (<svg className="ico" viewBox="0 0 24 24" {...stroke}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>);
const IcoReset = () => (<svg className="ico" viewBox="0 0 24 24" {...stroke}><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>);
const IcoSun = () => (<svg className="ico" viewBox="0 0 24 24" {...stroke}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>);
const IcoMoon = () => (<svg className="ico" viewBox="0 0 24 24" {...stroke}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>);
const IcoPaint = () => (
  <svg className="ico" viewBox="0 0 24 24" {...stroke}>
    <rect x="8" y="3" width="8" height="12.5" rx="2"/>
    <path d="M8 6.5h8"/>
    <path d="M10.2 15.5h3.6v2.2h-3.6z"/>
    <rect x="9.4" y="17.7" width="5.2" height="3" rx="0.8"/>
  </svg>
);

// Opacity glyph — paint-tube convention: filled square = opaque, half = semi, open = transparent
function OpacityIcon({ kind, size=14 }){
  const k = (kind||"").toLowerCase();
  const opaque = k.startsWith("opaque");
  const semi = k.startsWith("semi");
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{display:"block"}}>
      {semi && <path d="M2.4 13.6 L13.6 13.6 L2.4 2.4 Z" fill="currentColor" />}
      <rect x="2.4" y="2.4" width="11.2" height="11.2" rx="1"
        fill={opaque ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/* ----------------------------- color math ----------------------------- */
function rgb(hex){ const n=parseInt(hex.slice(1),16); return [(n>>16)&255,(n>>8)&255,n&255]; }
function lin(c){ c/=255; return c<=0.04045 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); }
function lumY(hex){ const [r,g,b]=rgb(hex); return 0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b); }
function Lstar(hex){ const Y=lumY(hex); return Y<=0.008856 ? 903.3*Y : 116*Math.cbrt(Y)-16; }
function greyOf(hex){
  const Y=lumY(hex);
  const inv = Y<=0.0031308 ? 12.92*Y : 1.055*Math.pow(Y,1/2.4)-0.055;
  const v=Math.max(0,Math.min(255,Math.round(inv*255)));
  return `rgb(${v},${v},${v})`;
}
// CIE L* (0–100) → neutral-gray rgb string, for the painter's value scale
function grayFromL(L){
  const Y = L>8 ? Math.pow((L+16)/116,3) : L/903.3;
  const inv = Y<=0.0031308 ? 12.92*Y : 1.055*Math.pow(Y,1/2.4)-0.055;
  const v=Math.max(0,Math.min(255,Math.round(inv*255)));
  return `rgb(${v},${v},${v})`;
}
const TEMP_COLOR = { Warm:"var(--primary)", Cool:"var(--accent)", Neutral:"var(--parris-taupe)" };
// group the four opacity values into the three painter filters
function opacityCat(opacity){
  const k = (opacity||"").toLowerCase();
  if(k.startsWith("opaque")) return "Opaque";
  if(k.startsWith("semi")) return "Semi";
  return "Transparent";
}

/* ----------------------------- sphere materials ----------------------------- */
/* Each ramp runs highlight → core shadow, keeping the same value structure as
   the neutral sphere so form-modeling reads identically across skin tones. */
const SPHERE_MATERIALS = {
  gray:   { label:"Gray",   kind:"matte", swatch:"#9A968D", refl:"196,192,184",
            ramp:["#FFFFFC","#F2F0EA","#D2CFC7","#ABA79E","#7E7A71","#565249","#403C35","#322E28"] },
};
const MATERIAL_ORDER = ["gray"];
// material-specific cast-shadow recipe: opaque metal throws a darker, crisper shadow;
// transparent glass throws a pale shadow with a bright refracted caustic.
const SHADOW_FX = {
  matte: { core:"16,12,8",  a:[0.92,0.74,0.40,0.12], blur:7,  occ:0.66 },
  metal: { core:"6,5,3",    a:[0.97,0.82,0.46,0.14], blur:4,  occ:0.74 },
  glass: { core:"44,40,30", a:[0.34,0.25,0.13,0.04], blur:10, occ:0.28 },
};

/* ----------------------------- geometry ----------------------------- */
function geo(w,h,light){
  const R = Math.max(78, Math.min(232, Math.min(w,h)*0.215));
  const cx = w*0.5, cy = h*0.40;
  const contactY = cy + R;
  const lp = { x: light.x*w, y: light.y*h };
  let vx = lp.x-cx, vy = lp.y-cy;
  let len = Math.hypot(vx,vy) || 1;
  const ux = vx/len, uy = vy/len;
  const hx = 50+ux*36, hy = 50+uy*36;            // highlight within sphere (%)
  const rlx = 50-ux*26, rly = 84;                 // reflected light within sphere (%)
  const e = Math.max(0.05, Math.min(0.98, -uy));  // light elevation
  const shadowLen = R*(1.15 + (1-e)*2.4);
  return { R, cx, cy, contactY, lp, ux, uy, hx, hy, rlx, rly, e, shadowLen };
}

function sphereBg(g, mat){
  const r = mat.ramp;
  const k = mat.kind || "matte";
  const mainRamp = `radial-gradient(circle at ${g.hx}% ${g.hy}%,`
    + `${r[0]} 0%, ${r[1]} 3.5%, ${r[2]} 13%, ${r[3]} 27%,`
    + `${r[4]} 42%, ${r[5]} 56%, ${r[6]} 71%, ${r[7]} 100%)`;
  const refl = `radial-gradient(circle at ${g.rlx}% ${g.rly}%, rgba(${mat.refl},0.42) 0%, rgba(${mat.refl},0) 32%)`;
  // cool skylight cast on the lit pole — blue highlight over the local color
  const sky = `radial-gradient(circle at ${g.hx}% ${g.hy}%,`
    + `rgba(206,226,255,0.62) 0%, rgba(196,219,255,0.30) 16%, rgba(186,212,255,0.10) 34%, rgba(186,212,255,0) 52%)`;

  if(k==="metal"){
    // razor specular + environment bands (dark equator horizon, bright ground bounce)
    const spec = `radial-gradient(circle at ${g.hx}% ${g.hy}%, #ffffff 0%, rgba(255,255,255,0.96) 2%, rgba(255,255,255,0) 7%)`;
    const horizon = `linear-gradient(180deg, rgba(16,20,26,0) 36%, rgba(14,18,24,0.52) 50%, rgba(16,20,26,0) 64%)`;
    const groundband = `linear-gradient(180deg, rgba(210,224,240,0) 67%, rgba(208,222,238,0.44) 80%, rgba(210,224,240,0) 93%)`;
    const rimrefl = `radial-gradient(circle at ${g.rlx}% ${g.rly}%, rgba(${mat.refl},0.6) 0%, rgba(${mat.refl},0) 24%)`;
    return spec + "," + sky + "," + rimrefl + "," + groundband + "," + horizon + "," + mainRamp;
  }
  if(k==="glass"){
    // razor specular + a bright spot low where light focuses through the glass body
    const spec = `radial-gradient(circle at ${g.hx}% ${g.hy}%, #ffffff 0%, rgba(255,255,255,0.92) 2.5%, rgba(255,255,255,0) 10%)`;
    const focus = `radial-gradient(circle at ${50 - g.ux*14}% 76%, rgba(255,250,236,0.85) 0%, rgba(255,250,236,0) 30%)`;
    return spec + "," + sky + "," + focus + "," + mainRamp;
  }
  // matte (gray / skin tones)
  return sky + "," + refl + "," + mainRamp;
}

/* ----------------------------- zone labels ----------------------------- */
function zones(g, w, h){
  const { R, cx, cy, ux, uy, contactY, shadowLen } = g;
  const perpx = -uy, perpy = ux;
  const pt = (fx,fy)=>({x:fx,y:fy});
  const onSphere = (du,dp)=> pt(cx+ux*R*du+perpx*R*dp, cy+uy*R*du+perpy*R*dp);
  // anchor = true feature point on the form; lang = fixed label angle so labels never collide
  const feats = [
    { k:"Highlight",       n:"value 9", a: onSphere(0.60, 0),     lang:-58 },
    { k:"Halftone",        n:"5–6",     a: onSphere(0.10, 0.34),  lang:-6 },
    { k:"Terminator",      n:"",        a: onSphere(-0.04, 0.88), lang:40 },
    { k:"Core shadow",     n:"value 3", a: onSphere(-0.60, 0.12), lang:212 },
    { k:"Reflected light", n:"4",       a: pt(cx+(g.rlx-50)/50*R, cy+(g.rly-50)/50*R), lang:158 },
  ];
  // phone: the stage is narrow, so push the top labels higher and the ground
  // labels lower to open up vertical breathing room and stop them crowding
  const phone = w < 480;
  const ring = feats.map(f=>{
    const rad = f.lang*Math.PI/180;
    let lx = cx+Math.cos(rad)*R*1.78;
    let ly = cy+Math.sin(rad)*R*1.48;
    if(phone && (f.k==="Highlight" || f.k==="Core shadow")) ly -= R*0.5;
    // Core shadow sits at far left; on phone its centred label runs off the
    // edge, so give it a wider left margin to pull it inward
    const lxMin = (phone && f.k==="Core shadow") ? 124 : 72;
    lx=Math.max(lxMin, Math.min(w-72, lx));
    ly=Math.max(phone?38:56, Math.min(h-24, ly));
    return { ...f, lx, ly };
  });
  // ground features get dedicated spots (below the contact, spread apart)
  const groundLy = contactY + R*(phone?0.66:0.34);
  ring.push({ k:"Cast shadow", n:"", a: pt(cx-ux*shadowLen*0.52, contactY+R*0.16),
              lx: Math.max(72, cx-R*0.95), ly: groundLy });
  ring.push({ k:"Occlusion", n:"value 1", a: pt(cx, contactY),
              lx: Math.min(w-72, cx+R*0.62), ly: groundLy });
  return ring;
}

/* ----------------------------- Stage ----------------------------- */
function Stage({ light, setLight, labelsOn, material, bgDark }){
  const ref = useRef(null);
  const [size, setSize] = useState({ w: 1000, h: 600 });
  const [dragging, setDragging] = useState(false);

  useEffect(()=>{
    const el = ref.current; if(!el) return;
    const ro = new ResizeObserver(()=>{ const r=el.getBoundingClientRect(); setSize({w:r.width,h:r.height}); });
    ro.observe(el);
    const r=el.getBoundingClientRect(); setSize({w:r.width,h:r.height});
    return ()=>ro.disconnect();
  },[]);

  const place = useCallback((clientX, clientY)=>{
    const r = ref.current.getBoundingClientRect();
    let x=(clientX-r.left)/r.width, y=(clientY-r.top)/r.height;
    x=Math.max(0.04, Math.min(0.96, x));
    y=Math.max(0.03, Math.min(0.52, y));
    setLight({x,y});
  },[setLight]);

  const onDown = (e)=>{ setDragging(true); ref.current.setPointerCapture?.(e.pointerId); place(e.clientX,e.clientY); };
  const onMove = (e)=>{ if(dragging) place(e.clientX,e.clientY); };
  const onUp   = (e)=>{ setDragging(false); ref.current.releasePointerCapture?.(e.pointerId); };

  const g = useMemo(()=>geo(size.w,size.h,light),[size,light]);
  const horizonY = g.contactY - g.R*0.5;

  const matObj = SPHERE_MATERIALS[material] || SPHERE_MATERIALS.gray;
  const kind = matObj.kind || "matte";
  const fx = SHADOW_FX[kind] || SHADOW_FX.matte;

  const occ = { w:g.R*1.55, h:g.R*0.42, x:g.cx, y:g.contactY-g.R*0.02 };
  const denseX = 50 + g.ux*22;
  const cast = { w:g.shadowLen, h:g.R*0.6, x:g.cx-g.ux*g.shadowLen*0.34, y:g.contactY+g.R*0.02 };

  const z = labelsOn ? zones(g,size.w,size.h) : [];

  return (
    <div className="stage" ref={ref} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}>
      <div className="wall" style={{ background: bgDark ? grayFromL(20) : grayFromL(90) }} />
      <div className="ground" style={{ top: horizonY }} />
      <div className="horizon" style={{ top: horizonY }} />

      {/* painter's value scale 1–10 */}
      <div className="valuescale" aria-label="Value scale, 1 darkest to 10 lightest">
        <div className="vs-title">Value</div>
        <div className="vs-cells">
          {[10,9,8,7,6,5,4,3,2,1].map(n=>(
            <div key={n} className="vs-cell" style={{ background: grayFromL(n*10) }}>
              <span style={{ color: n>=6 ? "rgba(20,20,20,0.78)" : "rgba(244,244,244,0.92)" }}>{n}</span>
            </div>
          ))}
        </div>
      </div>

      {/* cast shadow + occlusion — recipe varies by material */}
      <div className="castshadow" style={{
        left: cast.x-cast.w/2, top: cast.y-cast.h/2, width: cast.w, height: cast.h,
        transform: `skewX(${g.ux*12}deg)`, filter:`blur(${fx.blur}px)`,
        background:`radial-gradient(ellipse at ${denseX}% 46%, rgba(${fx.core},${fx.a[0]}) 0%, rgba(${fx.core},${fx.a[1]}) 34%, rgba(${fx.core},${fx.a[2]}) 58%, rgba(${fx.core},${fx.a[3]}) 72%, rgba(${fx.core},0) 82%)`
      }} />
      <div className="occlusion" style={{
        left: occ.x-occ.w/2, top: occ.y-occ.h/2, width: occ.w, height: occ.h, filter:"blur(4px)",
        background:`radial-gradient(ellipse at 50% 50%, rgba(10,8,6,${fx.occ}) 0%, rgba(10,8,6,${fx.occ*0.27}) 56%, rgba(10,8,6,0) 72%)`
      }} />

      {/* metal: polished surface bounces a cool reflected light onto the ground (lit side) */}
      {kind==="metal" && (
        <div className="castshadow" style={{
          left: (g.cx + g.ux*g.R*0.5) - g.R*0.55, top: g.contactY - g.R*0.06,
          width: g.R*1.1, height: g.R*0.4, filter:"blur(7px)",
          background:`radial-gradient(ellipse at 50% 50%, rgba(204,219,240,0.55) 0%, rgba(204,219,240,0.18) 46%, rgba(204,219,240,0) 72%)`
        }} />
      )}

      {/* glass: light refracts through the body and focuses to a bright caustic inside the shadow */}
      {kind==="glass" && (
        <div className="castshadow" style={{
          left: (g.cx - g.ux*g.R*0.34) - g.R*0.46, top: g.contactY + g.R*0.05,
          width: g.R*0.92, height: g.R*0.46, filter:"blur(5px)",
          background:`radial-gradient(ellipse at 50% 50%, rgba(255,247,226,0.96) 0%, rgba(255,243,212,0.5) 32%, rgba(255,243,212,0.12) 56%, rgba(255,243,212,0) 74%)`
        }} />
      )}

      {/* sphere */}
      <div className="sphere" style={{
        left: g.cx-g.R, top: g.cy-g.R, width: g.R*2, height: g.R*2,
        background: sphereBg(g, matObj)
      }} />

      {/* light rays */}
      <svg className="raypath" width={size.w} height={size.h}>
        <line x1={g.lp.x} y1={g.lp.y} x2={g.cx+g.ux*g.R} y2={g.cy+g.uy*g.R}
          stroke="rgba(12,56,234,0.22)" strokeWidth="1" strokeDasharray="2 5" />
      </svg>

      {/* light handle */}
      <div className={"light"+(dragging?" drag":"")} style={{ left: g.lp.x, top: g.lp.y }}>
        <div className="ring" /><div className="core" />
      </div>

      {/* zone labels */}
      {labelsOn && (
        <div className="labels">
          <svg width={size.w} height={size.h} style={{position:"absolute",inset:0}}>
            {z.map((f,i)=>(
              <g key={i}>
                <line x1={f.a.x} y1={f.a.y} x2={f.lx} y2={f.ly} stroke="rgba(17,17,17,0.32)" strokeWidth="1" />
                <circle cx={f.a.x} cy={f.a.y} r="3" fill="none" stroke="var(--accent)" strokeWidth="1.4" />
                <circle cx={f.a.x} cy={f.a.y} r="1" fill="var(--accent)" />
              </g>
            ))}
          </svg>
          {z.map((f,i)=>(
            <div key={i} className="zlabel" style={{ left:f.lx, top:f.ly }}>
              {f.k}{f.n && <span className="num">{f.n}</span>}
            </div>
          ))}
        </div>
      )}

      {!labelsOn && (
        <div className="hint">
          <span>◐</span> Drag to move the light
        </div>
      )}
    </div>
  );
}

/* ----------------------------- Drawer ----------------------------- */
function Detail({ c, onBack, shown }){
  if(!c) return (
    <aside className="detail">
      <p className="empty">Touch a color to study its pigment, lightfastness, and where its value would fall on the sphere.</p>
    </aside>
  );
  const Ls = Lstar(c.hex);
  const value = Math.max(0, Math.min(10, Ls/10));
  const grey = greyOf(c.hex);
  const valTextDark = Ls>52;
  return (
    <aside className={"detail"+(shown?" has-sel":"")}>
      <button className="detail-back" onClick={onBack} aria-label="Back to palette">
        <svg viewBox="0 0 24 24" {...stroke} style={{width:16,height:16}}><path d="m15 18-6-6 6-6"/></svg>
        Palette
      </button>
      <div className="big" style={{ background: c.hex }}>
        <div className="valuechip" style={{ color: valTextDark ? "rgba(0,0,0,0.7)":"rgba(255,255,255,0.85)" }}>
          <div className="sq" style={{ background: grey, color: value>5.2 ? "#1a1a1a":"#f4f4f4" }}>{value.toFixed(1)}</div>
          Value
        </div>
      </div>
      <p className="t-eyebrow" style={{ marginBottom: 4 }}>{c.brand || `${c.opacity} · ${c.temp}`}</p>
      <h3><span className="colname">{c.name}</span></h3>
      <dl className="specs">
        <dt>Pigment</dt><dd>{c.pigment}</dd>
        {c.code && (<React.Fragment><dt>Colour no.</dt><dd>{c.code}</dd></React.Fragment>)}
        <dt>Series</dt><dd>{c.series}</dd>
        {c.perm && (<React.Fragment><dt>Permanence</dt><dd>{c.perm}</dd></React.Fragment>)}
        <dt>Lightfastness</dt><dd>{c.light || "—"}</dd>
        <dt>Opacity</dt><dd><span className="opac-dd"><OpacityIcon kind={c.opacity} size={15} />{c.opacity}</span></dd>
        <dt>Temperature</dt><dd><span className="pip" style={{background:TEMP_COLOR[c.temp]||"var(--parris-taupe)"}} />{c.temp}</dd>
      </dl>
      <p className="note">{c.note}</p>
    </aside>
  );
}

function ChevScroll({ className, label, role, ariaLabel, children }){
  const ref = useRef(null);
  const [navL, setNavL] = useState(false);
  const [navR, setNavR] = useState(false);
  const updateNav = useCallback(()=>{
    const el = ref.current; if(!el) return;
    setNavL(el.scrollLeft > 4);
    setNavR(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  },[]);
  useEffect(()=>{ updateNav(); });
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    el.addEventListener("scroll", updateNav, { passive:true });
    window.addEventListener("resize", updateNav);
    return ()=>{ el.removeEventListener("scroll", updateNav); window.removeEventListener("resize", updateNav); };
  }, [updateNav]);
  const scroll = (dir)=>{
    const el = ref.current; if(!el) return;
    const amount = dir*Math.max(160, el.clientWidth*0.7);
    const start = el.scrollLeft;
    const target = Math.max(0, Math.min(el.scrollWidth-el.clientWidth, start+amount));
    const t0 = performance.now(), dur = 320, ease = t=>1-Math.pow(1-t,3);
    const step = (now)=>{ const p = Math.min(1,(now-t0)/dur); el.scrollLeft = start+(target-start)*ease(p); if(p<1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  return (
    <div className={"chev-wrap "+className+"-wrap"}>
      <button className={"fam-nav prev"+(navL?" show":"")} onClick={()=>scroll(-1)} aria-label={"Scroll "+label+" left"} tabIndex={navL?0:-1}><IcoChevL/></button>
      <button className={"fam-nav next"+(navR?" show":"")} onClick={()=>scroll(1)} aria-label={"Scroll "+label+" right"} tabIndex={navR?0:-1}><IcoChevR/></button>
      <div className={className} ref={ref} role={role} aria-label={ariaLabel}>{children}</div>
    </div>
  );
}

function Drawer({ open, onClose, brands, brandId, onBrand, families, fam, setFam, sel, setSel, opac, toggleOpac, detailShown, onDetailBack }){
  const active = families.find(f=>f.name===fam) || families[0];
  const total = families.reduce((n,f)=>n+f.colors.length,0);
  const anyOff = !(opac.Opaque && opac.Semi && opac.Transparent);
  const shown = active.colors.filter(c=> opac[opacityCat(c.opacity)]);
  return (
    <div className={"drawer"+(open?" open":"")} role="dialog" aria-label="Oil colour palette">
      <div className="drawer-head">
        <ChevScroll className="brandtabs" label="brands" role="tablist" ariaLabel="Paint brand">
          {brands.map(b=>(
            <button key={b.id} role="tab" aria-selected={b.id===brandId}
              className={"btab"+(b.id===brandId?" active":"")} onClick={()=>onBrand(b.id)}>
              {b.label}<span className="tag">{b.sub}</span>
            </button>
          ))}
        </ChevScroll>
      </div>
      <ChevScroll className="families" label="categories">
        {families.map(f=>{
          const seed = f.colors[Math.floor(f.colors.length/2)].hex;
          return (
            <button key={f.name} className={"fam"+(f.name===fam?" active":"")} onClick={()=>setFam(f.name)}>
              <span className="seed" style={{background:seed}} />{f.name}
            </button>
          );
        })}
        <div className="filterbar">
          {["Opaque","Semi","Transparent"].map(k=>(
            <button key={k} className={"filterchip"+(opac[k]?" on":"")} onClick={()=>toggleOpac(k)}
              aria-pressed={opac[k]} title={k+" colours"}>
              <OpacityIcon kind={k==="Semi"?"Semi-transparent":k} size={13} />{k}
            </button>
          ))}
        </div>
      </ChevScroll>
      <div className="drawer-body">
        <div className="wells">
          {shown.length===0 && <p className="wells-empty">No {active.name.toLowerCase()} match this filter.</p>}
          {shown.map(c=>(
            <button key={c._id||c.name} className={"well"+(sel&&(sel._id||sel.name)===(c._id||c.name)?" sel":"")} onClick={()=>setSel(c)}>
              <div className="chip" style={{ background:c.hex }}>
                <span className="opac-badge" title={c.opacity}><OpacityIcon kind={c.opacity} size={13} /></span>
              </div>
              <div className="nm">{c.name}</div>
              <div className="pg">{brandId==="all" && c.brand ? c.brand : c.pigment}</div>
            </button>
          ))}
        </div>
        <Detail c={sel} shown={detailShown} onBack={onDetailBack} />
      </div>
    </div>
  );
}

/* ----------------------------- nav menu ----------------------------- */
const NAV_ITEMS = [
  { label: "Works",    href: "works.html" },
  { label: "Sketches", href: "sketches.html" },
  { label: "About",    href: "about.html" },
  { label: "Painter's Tool", current: true },
];
function NavMenu({ open, onClose }){
  useEffect(()=>{
    if(!open) return;
    const onKey = (e)=>{ if(e.key==="Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return ()=> window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  return (
    <div className={"navmenu"+(open?" open":"")} aria-hidden={!open}>
      <div className="navmenu-scrim" onClick={onClose} />
      <aside className="navmenu-panel" role="dialog" aria-modal="true" aria-label="Site navigation">
        <button className="navmenu-close" onClick={onClose} aria-label="Close menu"><IcoX/></button>
        <nav className="navmenu-nav">
          {NAV_ITEMS.map((it)=>(
            it.current ? (
              <a key={it.label} className="navmenu-link is-current" href="#" aria-current="page" onClick={(e)=>{e.preventDefault();onClose();}}>{it.label}</a>
            ) : (
              <a key={it.label} className="navmenu-link" href={it.href} onClick={onClose}>{it.label}</a>
            )
          ))}
          <span className="navmenu-rule" aria-hidden="true"></span>
          <a className="navmenu-mail" href="mailto:info@yumiparris.com">info@yumiparris.com</a>
        </nav>
      </aside>
    </div>
  );
}

/* ----------------------------- App ----------------------------- */
function App(){
  const BRANDS = useMemo(()=>{
    const raw = [
      { id:"gamblin", label:"Gamblin", sub:"Artist's Oil Colors", families: window.GAMBLIN_FAMILIES },
      { id:"wn", label:"W&N", sub:"Artists' Oil Colour", families: window.WN_FAMILIES },
      { id:"mh", label:"Michael Harding", sub:"Handmade Oil Colour", families: window.MH_FAMILIES },
      { id:"oh", label:"Old Holland", sub:"Classic Oil Colours", families: window.OH_FAMILIES },
    ];
    // tag every colour with its brand label + a stable id so identity & keys survive merging
    raw.forEach(b=> b.families.forEach(f=> f.colors.forEach(c=>{
      c.brand = b.label; c.brandId = b.id;
      if(!c._id) c._id = b.id+"|"+c.name;
    })));
    // merged "All brands" view: union families by name, in first-seen order
    const order = []; const map = {};
    raw.forEach(b=> b.families.forEach(f=>{
      if(!map[f.name]){ map[f.name] = []; order.push(f.name); }
      map[f.name].push(...f.colors);
    }));
    const allFamilies = order.map(name=>({ name, colors: map[name] }));
    return [{ id:"all", label:"All brands", sub:"every colour", families: allFamilies }, ...raw];
  },[]);
  const [brandId, setBrandId] = useState("gamblin");
  const brand = BRANDS.find(b=>b.id===brandId) || BRANDS[0];
  const families = brand.families;

  const [light, setLight] = useState({ x:0.80, y:0.15 });
  const [labelsOn, setLabelsOn] = useState(false);
  const [material, setMaterial] = useState(()=>{
    try { const m = localStorage.getItem("pt_material"); return SPHERE_MATERIALS[m] ? m : "gray"; } catch(e){ return "gray"; }
  });
  useEffect(()=>{ try { localStorage.setItem("pt_material", material); } catch(e){} },[material]);
  const [bgDark, setBgDark] = useState(()=>{
    try { return localStorage.getItem("pt_bgdark")==="1"; } catch(e){ return false; }
  });
  useEffect(()=>{ try { localStorage.setItem("pt_bgdark", bgDark?"1":"0"); } catch(e){} },[bgDark]);
  const [panel, setPanel] = useState(null); // null | 'pigments' | 'munsell'
  const [detailShown, setDetailShown] = useState(false); // mobile: detail overlay raised only after a chip tap
  const [menuOpen, setMenuOpen] = useState(false);
  const togglePanel = (p)=> { setDetailShown(false); setPanel(cur=> cur===p ? null : p); };
  const [opac, setOpac] = useState({ Opaque:true, Semi:true, Transparent:true });
  const toggleOpac = (k)=> setOpac(o=>({ ...o, [k]: !o[k] }));
  const greyFam = window.GAMBLIN_FAMILIES.find(f=>f.name==="Blacks & Greys");
  const [fam, setFam] = useState("Blacks & Greys");
  const [sel, setSel] = useState(greyFam.colors.find(c=>c.name==="Portland Grey Medium"));

  const selectBrand = (id)=>{
    const b = BRANDS.find(x=>x.id===id);
    if(!b || id===brandId) return;
    setBrandId(id);
    setFam(prev => b.families.some(f=>f.name===prev) ? prev : b.families[0].name);
    setSel(null);
  };
  const selectFam = (n)=>{ setFam(n); };
  const selectColor = (c)=> { setSel(c); setDetailShown(true); };

  return (
    <div className={"app"+(bgDark?" app-dark":"")}>
      <header className="topbar">
        <div aria-hidden="true" />
        <div className="topbar-right">
          <div className={"controls"+(panel?" hidden":"")}>
            <button className={"ctl ctl-bg ctl-icon"+(bgDark?" on":"")} onClick={()=>setBgDark(v=>!v)} aria-pressed={bgDark}
              aria-label={bgDark?"Night backdrop (value 2) — switch to day":"Day backdrop (value 9) — switch to night"}
              title={bgDark?"Night mode · value 2 backdrop":"Day mode · value 9 backdrop"}
              style={{ background: bgDark?grayFromL(20):grayFromL(90), color: bgDark?"#fff":"var(--ink)", borderColor: bgDark?"rgba(255,255,255,0.30)":"rgba(0,0,0,0.18)" }}>
              {bgDark ? <IcoMoon/> : <IcoSun/>}
            </button>
            <button className={"ctl"+(labelsOn?" on":"")} onClick={()=>setLabelsOn(v=>!v)} aria-pressed={labelsOn}>
              <span className="label-text">Value zones</span><span className="sw" />
            </button>
          </div>
          <button className={"menu-btn"+(menuOpen?" on":"")} onClick={()=>setMenuOpen(v=>!v)}
            aria-expanded={menuOpen} aria-label="Open navigation menu" title="Menu">
            <span className="menu-ico"><span /><span /><span /></span>
          </button>
        </div>
      </header>

      <Stage light={light} setLight={setLight} labelsOn={labelsOn} material={material} bgDark={bgDark} />

      <div className={"handlebar"+(panel?" open":"")}>
        <button className={"handle"+(panel==="pigments"?" on":"")} onClick={()=>togglePanel("pigments")} aria-expanded={panel==="pigments"}>
          <span>Pigments</span>
          <IcoChevron/>
        </button>
        <button className={"handle"+(panel==="munsell"?" on":"")} onClick={()=>togglePanel("munsell")} aria-expanded={panel==="munsell"}>
          <span>Munsell</span>
          <IcoChevron/>
        </button>
      </div>

      <Drawer open={panel==="pigments"} onClose={()=>setPanel(null)}
        brands={BRANDS} brandId={brandId} onBrand={selectBrand}
        families={families} fam={fam} setFam={selectFam} sel={sel} setSel={selectColor}
        opac={opac} toggleOpac={toggleOpac}
        detailShown={detailShown} onDetailBack={()=>setDetailShown(false)} />

      {window.MunsellPanel && <window.MunsellPanel open={panel==="munsell"} onClose={()=>setPanel(null)} />}

      <NavMenu open={menuOpen} onClose={()=>setMenuOpen(false)} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
