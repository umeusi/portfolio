/* ============================================================
   Munsell color solid — Hue · Value · Chroma
   A rotating 3-D color tree + single-hue page, built from a
   CIE-Lab → sRGB gamut search so the silhouette is true:
   each hue reaches its strongest chroma at a different value.
   ============================================================ */
const { useState, useRef, useEffect, useMemo, useCallback } = React;

/* ----------------------------- color math (Lab/LCh ↔ sRGB, D65) ----------------------------- */
function lab2lin(L, a, b) {
  const fy = (L + 16) / 116, fx = fy + a / 500, fz = fy - b / 200;
  const e = 0.008856, k = 903.3;
  const f3 = (f) => f * f * f;
  const xr = f3(fx) > e ? f3(fx) : (116 * fx - 16) / k;
  const yr = L > k * e ? f3((L + 16) / 116) : L / k;
  const zr = f3(fz) > e ? f3(fz) : (116 * fz - 16) / k;
  const X = xr * 0.95047, Y = yr, Z = zr * 1.08883;
  return [
    X * 3.2406 + Y * -1.5372 + Z * -0.4986,
    X * -0.9689 + Y * 1.8758 + Z * 0.0415,
    X * 0.0557 + Y * -0.2040 + Z * 1.0570,
  ];
}
const inGamut = (lin) => lin.every((c) => c >= -0.0008 && c <= 1.0008);
function lin2b(c) {
  c = Math.min(1, Math.max(0, c));
  const s = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  return Math.round(s * 255);
}
function lch2hex(L, C, hDeg) {
  const h = (hDeg * Math.PI) / 180;
  const lin = lab2lin(L, C * Math.cos(h), C * Math.sin(h));
  const [r, g, b] = [lin2b(lin[0]), lin2b(lin[1]), lin2b(lin[2])];
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}
function maxChroma(L, hDeg) {
  const h = (hDeg * Math.PI) / 180, cs = Math.cos(h), sn = Math.sin(h);
  let lo = 0, hi = 170;
  for (let i = 0; i < 24; i++) {
    const m = (lo + hi) / 2;
    if (inGamut(lab2lin(L, m * cs, m * sn))) lo = m; else hi = m;
  }
  return lo;
}
// sRGB hex → CIE-Lab, for matching real tube colors to a Munsell coordinate
function hex2lab(hex) {
  const n = parseInt(hex.slice(1), 16);
  const lin = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const r = lin(((n >> 16) & 255) / 255), g = lin(((n >> 8) & 255) / 255), b = lin((n & 255) / 255);
  let X = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  const Y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  let Z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : (903.3 * t + 16) / 116);
  const fx = f(X), fy = f(Y), fz = f(Z);
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

/* ----------------------------- real pigment library (all four brands) ----------------------------- */
const PIGMENTS = (() => {
  const sources = [
    ["Gamblin", window.GAMBLIN_FAMILIES],
    ["Winsor & Newton", window.WN_FAMILIES],
    ["Michael Harding", window.MH_FAMILIES],
    ["Old Holland", window.OH_FAMILIES],
  ];
  const out = [];
  sources.forEach(([brand, fams]) =>
    (fams || []).forEach((f) =>
      (f.colors || []).forEach((c) =>
        out.push({ name: c.name, hex: c.hex, pigment: c.pigment, opacity: c.opacity, brand, lab: hex2lab(c.hex) })
      )
    )
  );
  return out;
})();
function nearestPigments(lab, n) {
  return PIGMENTS
    .map((p) => {
      const dl = p.lab[0] - lab[0], da = p.lab[1] - lab[1], db = p.lab[2] - lab[2];
      return { p, de: Math.sqrt(dl * dl + da * da + db * db) };
    })
    .sort((a, b) => a.de - b.de)
    .slice(0, n);
}

/* ----------------------------- Munsell hue scaffold ----------------------------- */
// 10 principal hues, with the approximate CIE-Lab hue angle of each 5-step.
const FAMILIES = ["R", "YR", "Y", "GY", "G", "BG", "B", "PB", "P", "RP"];
const ANCHOR = [34, 53, 86, 121, 158, 197, 230, 270, 312, 348];
const STEP_LABEL = ["2.5", "5", "7.5", "10"];
// 40 hues (each family × 2.5/5/7.5/10). labAngle = color; dispAngle = even wheel placement.
const HUES = (() => {
  const ctrl = [{ idx: -3, ang: ANCHOR[9] - 360 }];
  ANCHOR.forEach((ang, f) => ctrl.push({ idx: f * 4 + 1, ang }));
  ctrl.push({ idx: 41, ang: ANCHOR[0] + 360 });
  const angleAt = (i) => {
    for (let k = 0; k < ctrl.length - 1; k++) {
      const a = ctrl[k], b = ctrl[k + 1];
      if (i >= a.idx && i <= b.idx) {
        const t = (i - a.idx) / (b.idx - a.idx);
        return (a.ang + t * (b.ang - a.ang) + 360) % 360;
      }
    }
    return 0;
  };
  const out = [];
  for (let i = 0; i < 40; i++) {
    const fam = Math.floor(i / 4), step = i % 4;
    out.push({
      i, fam, step,
      notation: STEP_LABEL[step] + FAMILIES[fam],
      labAngle: angleAt(i),
      dispAngle: (i / 40) * Math.PI * 2,
    });
  }
  return out;
})();

const VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const RING = 11.5;          // Lab chroma per Munsell-2 chroma step
const MAX_RINGS = 9;

// representative swatch for a family selector chip
function familySwatch(fam) {
  const ang = ANCHOR[fam];
  return lch2hex(58, maxChroma(58, ang) * 0.74, ang);
}

/* ----------------------------- build the 3-D chip cloud (once) ----------------------------- */
const V_UNIT = 1.5, R_UNIT = 0.72, HS = 0.36;
const SOLID = (() => {
  const chips = [];
  HUES.forEach((hue) => {
    VALUES.forEach((v) => {
      const L = v * 10;
      const mc = maxChroma(L, hue.labAngle);
      const rings = Math.min(MAX_RINGS, Math.floor(mc / RING));
      for (let r = 1; r <= rings; r++) {
        const C = r * RING;
        const rad = r * R_UNIT;
        chips.push({
          fam: hue.fam, notation: hue.notation, v, chroma: r * 2,
          hex: lch2hex(L, C, hue.labAngle),
          cx: rad * Math.cos(hue.dispAngle),
          cz: rad * Math.sin(hue.dispAngle),
          cy: (v - 5) * V_UNIT,
          tnx: -Math.sin(hue.dispAngle), tnz: Math.cos(hue.dispAngle),
          rdx: Math.cos(hue.dispAngle), rdz: Math.sin(hue.dispAngle),
        });
      }
    });
  });
  // neutral axis (chroma 0) — the trunk
  const neutral = VALUES.map((v) => ({
    v, hex: lch2hex(v * 10, 0, 0), cy: (v - 5) * V_UNIT,
  }));
  return { chips, neutral };
})();

// hue-page model for one family (rows = value, cols = chroma)
function huePage(fam) {
  const ang = ANCHOR[fam];
  let maxR = 0;
  const rowsByV = {};
  VALUES.forEach((v) => {
    const rings = Math.min(MAX_RINGS, Math.floor(maxChroma(v * 10, ang) / RING));
    rowsByV[v] = rings;
    if (rings > maxR) maxR = rings;
  });
  return { fam, ang, maxR, rowsByV };
}

/* ----------------------------- 3-D stage ----------------------------- */
function Solid({ focusFam, sel, onPick }) {
  const wrapRef = useRef(null);
  const canRef = useRef(null);
  const stateRef = useRef({ ry: -0.5, rx: 0.34, drag: null, dpr: 1, w: 0, h: 0, proj: [] });
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const focusRef = useRef(focusFam);
  focusRef.current = focusFam;
  const selRef = useRef(sel);
  selRef.current = sel;

  useEffect(() => {
    const wrap = wrapRef.current, can = canRef.current, ctx = can.getContext("2d");
    let raf;
    const resize = () => {
      const r = wrap.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      stateRef.current.dpr = dpr; stateRef.current.w = r.width; stateRef.current.h = r.height;
      can.width = Math.round(r.width * dpr); can.height = Math.round(r.height * dpr);
      can.style.width = r.width + "px"; can.style.height = r.height + "px";
    };
    const ro = new ResizeObserver(resize); ro.observe(wrap); resize();

    const rot = (x, y, z, sY, cY, sX, cX) => {
      const x1 = x * cY + z * sY, z1 = -x * sY + z * cY;
      const y2 = y * cX - z1 * sX, z2 = y * sX + z1 * cX;
      return [x1, y2, z2];
    };

    const renderFrame = () => {
      const S = stateRef.current;
      const w = S.w, h = S.h, dpr = S.dpr;
      if (!w || !h) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // value-9 gallery ground (light warm neutral, soft vignette)
      const bg = ctx.createRadialGradient(w * 0.5, h * 0.42, h * 0.08, w * 0.5, h * 0.62, h * 1.05);
      bg.addColorStop(0, "#ECEAE4"); bg.addColorStop(0.55, "#E2E2E2"); bg.addColorStop(1, "#CFCEC8");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);

      if (!pausedRef.current && !S.drag) S.ry += 0.0042;
      const sY = Math.sin(S.ry), cY = Math.cos(S.ry), sX = Math.sin(S.rx), cX = Math.cos(S.rx);
      const d = 20.5, f = Math.min(w, h) * 1.42, cx = w / 2, cy = h * 0.5;
      const focus = focusRef.current, cur = selRef.current;

      const items = [];
      // contact shadow on ground
      const items0 = [];
      for (const c of SOLID.chips) {
        const [, , zc] = rot(c.cx, c.cy, c.cz, sY, cY, sX, cX);
        const half = HS;
        const corners = [];
        let ok = true;
        for (const [su, sv] of [[1, 1], [-1, 1], [-1, -1], [1, -1]]) {
          const px = c.cx + c.rdx * half * su;
          const pz = c.cz + c.rdz * half * su;
          const py = c.cy + half * sv;
          const [rx, ry2, rz] = rot(px, py, pz, sY, cY, sX, cX);
          const sc = f / (d - rz);
          if (sc <= 0) { ok = false; break; }
          corners.push([cx + rx * sc, cy - ry2 * sc]);
        }
        if (!ok) continue;
        items.push({ z: zc, c, corners });
      }
      for (const n of SOLID.neutral) {
        const half = HS;
        const corners = [];
        for (const [ox, oy] of [[-half, half], [half, half], [half, -half], [-half, -half]]) {
          // billboard-ish: face camera roughly using world x/up then rotate
          const [rx, ry2, rz] = rot(ox, n.cy + oy, 0, sY, cY, sX, cX);
          const sc = f / (d - rz);
          corners.push([cx + rx * sc, cy - ry2 * sc]);
        }
        const [, , zc] = rot(0, n.cy, 0, sY, cY, sX, cX);
        items.push({ z: zc, c: { neutral: true, hex: n.hex, v: n.v }, corners });
      }
      items.sort((a, b) => a.z - b.z);

      S.proj = [];
      for (const it of items) {
        const c = it.c, P = it.corners;
        const dim = focus != null && !c.neutral && c.fam !== focus;
        ctx.beginPath();
        ctx.moveTo(P[0][0], P[0][1]);
        for (let i = 1; i < 4; i++) ctx.lineTo(P[i][0], P[i][1]);
        ctx.closePath();
        ctx.fillStyle = c.hex;
        ctx.globalAlpha = dim ? 0.12 : 1;
        ctx.fill();
        ctx.globalAlpha = dim ? 0.12 : 1;
        ctx.lineWidth = 0.75;
        ctx.strokeStyle = "rgba(0,0,0,0.28)";
        ctx.stroke();
        // selection ring
        if (cur && !c.neutral && c.fam === cur.fam && c.v === cur.v && c.chroma === cur.chroma) {
          ctx.globalAlpha = 1;
          ctx.lineWidth = 3.4; ctx.strokeStyle = "rgba(20,24,34,0.9)"; ctx.stroke();
          ctx.lineWidth = 1.4; ctx.strokeStyle = "#FAF8F4"; ctx.stroke();
        }
        ctx.globalAlpha = 1;
        // hit-test record (center)
        const mx = (P[0][0] + P[2][0]) / 2, my = (P[0][1] + P[2][1]) / 2;
        if (!c.neutral && !dim) S.proj.push({ mx, my, c, r: Math.hypot(P[0][0] - P[2][0], P[0][1] - P[2][1]) / 2 });
      }
    };
    renderFrame();                       // synchronous first paint
    const loop = () => { renderFrame(); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  // pointer: drag to rotate, click to pick
  const onDown = (e) => {
    const S = stateRef.current;
    setPaused(true);                     // tapping/dragging the wheel stops the spin
    S.drag = { x: e.clientX, y: e.clientY, ry: S.ry, rx: S.rx, moved: 0 };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    const S = stateRef.current;
    if (!S.drag) return;
    const dx = e.clientX - S.drag.x, dy = e.clientY - S.drag.y;
    S.drag.moved = Math.max(S.drag.moved, Math.hypot(dx, dy));
    S.ry = S.drag.ry + dx * 0.008;
    S.rx = Math.max(-0.05, Math.min(0.95, S.drag.rx + dy * 0.006));
  };
  const onUp = (e) => {
    const S = stateRef.current;
    const drag = S.drag; S.drag = null;
    if (drag && drag.moved < 5) {
      const r = canRef.current.getBoundingClientRect();
      const mx = e.clientX - r.left, my = e.clientY - r.top;
      let best = null, bd = 1e9;
      for (const p of S.proj) {
        const dd = Math.hypot(p.mx - mx, p.my - my);
        if (dd < p.r && dd < bd) { bd = dd; best = p.c; }
      }
      if (best) onPick({ fam: best.fam, v: best.v, chroma: best.chroma });
    }
  };

  return (
    <div className="m-stage" ref={wrapRef}>
      <canvas
        ref={canRef}
        className="m-canvas"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
      />
      <div className="m-stage-tools">
        <button className="m-toolbtn" onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
          {paused ? (
            <svg viewBox="0 0 24 24" width="15" height="15"><path d="M8 5l11 7-11 7z" fill="currentColor" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="15" height="15"><rect x="7" y="5" width="3.4" height="14" fill="currentColor" /><rect x="13.6" y="5" width="3.4" height="14" fill="currentColor" /></svg>
          )}
          <span>{paused ? "Play" : "Pause"}</span>
        </button>
      </div>
      <div className="m-hint">Drag to turn · click a chip to read it</div>
    </div>
  );
}

/* ----------------------------- hue page (value × chroma) ----------------------------- */
function HuePage({ fam, sel, onPick }) {
  const page = useMemo(() => huePage(fam), [fam]);
  const cols = [];
  for (let r = 1; r <= page.maxR; r++) cols.push(r);
  return (
    <div className="m-page">
      <p className="t-eyebrow">Hue page</p>
      <h3 className="m-page-title">
        {STEP_LABEL[1]}{FAMILIES[fam]} <span className="m-page-sub">{FAM_NAME[fam]}</span>
      </h3>
      <p className="m-page-note">
        Read down a column to see which <em>values</em> a given chroma can reach — the page's
        edge is the gamut. Strongest chroma sits where the silhouette bulges.
      </p>

      <div className="m-grid-wrap">
        <div className="m-vaxis">
          <span className="m-axis-cap">Value</span>
          {[...VALUES].reverse().map((v) => <span key={v} className="m-vtick">{v}</span>)}
        </div>
        <div className="m-grid">
          {[...VALUES].reverse().map((v) => (
            <div className="m-grow" key={v}>
              {cols.map((r) => {
                const on = r <= page.rowsByV[v];
                const isSel = sel.fam === fam && sel.v === v && sel.chroma === r * 2;
                return (
                  <button
                    key={r}
                    className={"m-cell" + (on ? "" : " off") + (isSel ? " sel" : "")}
                    style={on ? { background: lch2hex(v * 10, r * RING, page.ang) } : undefined}
                    onClick={() => on && onPick({ fam, v, chroma: r * 2 })}
                    disabled={!on}
                    aria-label={on ? `Value ${v}, chroma ${r * 2}` : undefined}
                  />
                );
              })}
            </div>
          ))}
          <div className="m-caxis">
            {cols.map((r) => <span key={r} className="m-ctick">{r * 2}</span>)}
            <span className="m-axis-cap m-caxis-cap">Chroma →</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const FAM_NAME = ["Red", "Yellow-red", "Yellow", "Green-yellow", "Green", "Blue-green", "Blue", "Purple-blue", "Purple", "Red-purple"];

/* ----------------------------- suggested pigments ----------------------------- */
function Suggestions({ sel }) {
  const lab = useMemo(() => {
    const ang = ANCHOR[sel.fam], L = sel.v * 10, C = (sel.chroma / 2) * RING, h = (ang * Math.PI) / 180;
    return [L, C * Math.cos(h), C * Math.sin(h)];
  }, [sel]);
  const hits = useMemo(() => nearestPigments(lab, 3), [lab]);
  const word = (de) => (de < 9 ? "Close" : de < 18 ? "Near" : "Nearest");
  return (
    <div className="m-suggest">
      <p className="t-eyebrow">Suggested pigments</p>
      <p className="m-suggest-note">
        Tube colors sitting nearest this hue, value &amp; chroma — drawn from the four brands in the
        pigment library.
      </p>
      <ul className="m-pig-list">
        {hits.map(({ p, de }, i) => (
          <li className="m-pig" key={i}>
            <span className="m-pig-sw" style={{ background: p.hex }} />
            <span className="m-pig-txt">
              <span className="m-pig-name">{p.name}</span>
              <span className="m-pig-meta">{p.brand} · {p.pigment}</span>
            </span>
            <span className={"m-pig-de m-de-" + word(de).toLowerCase()}>{word(de)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ----------------------------- readout ----------------------------- */
function Readout({ sel }) {
  const ang = ANCHOR[sel.fam];
  const L = sel.v * 10;
  const C = (sel.chroma / 2) * RING;
  const hex = lch2hex(L, C, ang);
  const dark = sel.v >= 6;
  return (
    <div className="m-readout">
      <div className="m-swatch" style={{ background: hex }}>
        <span className="m-swatch-not" style={{ color: dark ? "rgba(17,17,17,0.7)" : "rgba(250,248,244,0.9)" }}>
          {STEP_LABEL[1]}{FAMILIES[sel.fam]} {sel.v}/{sel.chroma}
        </span>
      </div>
      <dl className="m-specs">
        <dt>Hue</dt><dd>{STEP_LABEL[1]}{FAMILIES[sel.fam]} · {FAM_NAME[sel.fam]}</dd>
        <dt>Value</dt><dd>{sel.v} <span className="m-dim">of 9</span></dd>
        <dt>Chroma</dt><dd>{sel.chroma} <span className="m-dim">/{sel.chroma}</span></dd>
        <dt>sRGB</dt><dd className="m-mono">{hex.toUpperCase()}</dd>
      </dl>
    </div>
  );
}

/* ----------------------------- horizontal scroll row w/ chevrons ----------------------------- */
function ChevRow({ className, children }) {
  const ref = useRef(null);
  const [navL, setNavL] = useState(false);
  const [navR, setNavR] = useState(false);
  const updateNav = useCallback(() => {
    const el = ref.current; if (!el) return;
    setNavL(el.scrollLeft > 4);
    setNavR(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);
  useEffect(() => { updateNav(); });
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.addEventListener("scroll", updateNav, { passive: true });
    window.addEventListener("resize", updateNav);
    return () => { el.removeEventListener("scroll", updateNav); window.removeEventListener("resize", updateNav); };
  }, [updateNav]);
  const scroll = (dir) => {
    const el = ref.current; if (!el) return;
    const amount = dir * Math.max(160, el.clientWidth * 0.7);
    const start = el.scrollLeft;
    const target = Math.max(0, Math.min(el.scrollWidth - el.clientWidth, start + amount));
    const t0 = performance.now(), dur = 320, ease = (t) => 1 - Math.pow(1 - t, 3);
    const step = (now) => { const p = Math.min(1, (now - t0) / dur); el.scrollLeft = start + (target - start) * ease(p); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  return (
    <div className="families-wrap m-families-wrap">
      <button className={"fam-nav prev" + (navL ? " show" : "")} onClick={() => scroll(-1)} aria-label="Scroll hues left" tabIndex={navL ? 0 : -1}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
      </button>
      <button className={"fam-nav next" + (navR ? " show" : "")} onClick={() => scroll(1)} aria-label="Scroll hues right" tabIndex={navR ? 0 : -1}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </button>
      <div className={className} ref={ref}>{children}</div>
    </div>
  );
}

/* ----------------------------- panel ----------------------------- */
function MunsellPanel({ open, onClose }) {
  const [focusFam, setFocusFam] = useState(0);
  const [sel, setSel] = useState({ fam: 0, v: 4, chroma: 12 });
  const [infoShown, setInfoShown] = useState(false);   // mobile: info overlay raised after a chip tap
  useEffect(() => { if (!open) setInfoShown(false); }, [open]);

  const pickFam = (f) => {
    setFocusFam(f);
    // clamp the current selection's chroma to what this hue actually reaches
    const page = huePage(f);
    const ringsAtV = page.rowsByV[sel.v] || 0;
    const maxCh = Math.max(2, ringsAtV * 2);
    setSel((s) => ({ fam: f, v: s.v, chroma: Math.min(s.chroma, maxCh) }));
  };
  const pick = (next) => {
    setFocusFam(next.fam);
    setSel(next);
    setInfoShown(true);                  // tapping a chip opens the color info (mobile)
  };

  return (
    <div className={"drawer m-drawer" + (open ? " open" : "")} role="dialog" aria-label="Munsell color solid">
      <div className="drawer-head">
        <div className="m-head-l">
          <p className="t-eyebrow">Munsell color theory</p>
          <h3 className="m-title">Hue · Value · Chroma</h3>
        </div>
      </div>

      <ChevRow className="families m-families">
        {FAMILIES.map((fm, i) => (
          <button key={fm} className={"fam" + (focusFam === i ? " active" : "")} onClick={() => pickFam(i)}>
            <span className="seed" style={{ background: familySwatch(i) }} />{STEP_LABEL[1]}{fm}
          </button>
        ))}
      </ChevRow>

      <div className="drawer-body m-body">
        {open && <Solid focusFam={focusFam} sel={sel} onPick={pick} />}
        <div className={"m-side" + (infoShown ? " shown" : "")}>
          <button className="m-back" onClick={() => setInfoShown(false)} aria-label="Back to color wheel">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><path d="m15 18-6-6 6-6" /></svg>
            Color wheel
          </button>
          <HuePage fam={focusFam} sel={sel} onPick={pick} />
          <Readout sel={sel} />
          <Suggestions sel={sel} />
        </div>
      </div>
    </div>
  );
}

window.MunsellPanel = MunsellPanel;
