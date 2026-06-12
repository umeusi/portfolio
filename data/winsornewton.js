/* Winsor & Newton — Artists' Oil Colour reference dataset.
   Fields transcribed from W&N's "Artists' Oil Colour" Colour Chart (July 2025,
   7655394): `code` = the W&N colour number, `perm` = W&N Permanence class
   (AA Extremely permanent / A Permanent / B Moderately durable), `series` (1–5),
   `light` = ASTM lightfastness (I / II / III, "—" where unrated), and `opacity`
   (Opaque / Semi-opaque / Semi-transparent / Transparent). Hex values approximate
   each colour's masstone (tube colour). Reference only. */
window.WN_FAMILIES = [
  {
    name: "Yellows",
    colors: [
      { name: "Lemon Yellow Hue", code: "347", hex: "#F4E24A", pigment: "PY 175", perm: "A — Permanent", series: 1, light: "I", opacity: "Opaque", temp: "Cool", note: "A clean, cool primary yellow — a lightfast hue replacement." },
      { name: "Bismuth Yellow", code: "025", hex: "#F2D63E", pigment: "PY 184", perm: "AA — Extremely permanent", series: 3, light: "II", opacity: "Opaque", temp: "Cool", note: "Bright opaque cool yellow from bismuth vanadate." },
      { name: "Cadmium Lemon", code: "086", hex: "#F6E200", pigment: "PY 37", perm: "AA — Extremely permanent", series: 4, light: "I", opacity: "Opaque", temp: "Cool", note: "The coolest, palest of the cadmium yellows." },
      { name: "Winsor Lemon", code: "722", hex: "#F1DC2A", pigment: "PY 175", perm: "A — Permanent", series: 2, light: "II", opacity: "Semi-transparent", temp: "Cool", note: "A bright, transparent lemon — clean in tint and glaze." },
      { name: "Winsor Yellow", code: "730", hex: "#FBD200", pigment: "PY 154", perm: "A — Permanent", series: 2, light: "I", opacity: "Semi-transparent", temp: "Cool", note: "A mid yellow with a clean, strong tint." },
      { name: "Cadmium Yellow Pale", code: "118", hex: "#FFCD00", pigment: "PY 35", perm: "AA — Extremely permanent", series: 4, light: "I", opacity: "Opaque", temp: "Cool", note: "Pale opaque cadmium, dependable in natural light." },
      { name: "Cadmium Yellow", code: "108", hex: "#FEC100", pigment: "PY 35", perm: "AA — Extremely permanent", series: 4, light: "I", opacity: "Opaque", temp: "Warm", note: "The classic mid cadmium yellow — dense and opaque." },
      { name: "Cadmium Yellow Deep", code: "111", hex: "#FAA400", pigment: "PY 35", perm: "AA — Extremely permanent", series: 4, light: "I", opacity: "Opaque", temp: "Warm", note: "A warm, deep cadmium leaning toward orange." },
      { name: "Transparent Yellow", code: "653", hex: "#E79E1A", pigment: "PY 150", perm: "A — Permanent", series: 4, light: "I", opacity: "Transparent", temp: "Warm", note: "A glowing transparent yellow for glazes." },
      { name: "Indian Yellow", code: "319", hex: "#EE9A12", pigment: "PY 139, PY 110", perm: "A — Permanent", series: 2, light: "I", opacity: "Transparent", temp: "Warm", note: "A deep, luminous warm yellow with amber transparency." },
      { name: "Naples Yellow", code: "422", hex: "#ECC97A", pigment: "PBr 24, PW 6", perm: "AA — Extremely permanent", series: 1, light: "I", opacity: "Opaque", temp: "Warm", note: "A soft, opaque, slightly pink-warm pale yellow." }
    ]
  },
  {
    name: "Oranges",
    colors: [
      { name: "Cadmium Orange", code: "089", hex: "#F26E1C", pigment: "PO 20", perm: "AA — Extremely permanent", series: 4, light: "I", opacity: "Opaque", temp: "Warm", note: "A pure, dense cadmium orange." },
      { name: "Winsor Orange", code: "724", hex: "#F15A1E", pigment: "PO 73", perm: "A — Permanent", series: 2, light: "III", opacity: "Semi-opaque", temp: "Warm", note: "A bright modern orange with strong tinting strength." },
      { name: "Transparent Orange", code: "650", hex: "#E8631C", pigment: "PO 71", perm: "A — Permanent", series: 4, light: "I", opacity: "Transparent", temp: "Warm", note: "A clear warm orange, glowing in glazes." },
      { name: "Cadmium Scarlet", code: "106", hex: "#E83C22", pigment: "PR 108", perm: "AA — Extremely permanent", series: 4, light: "I", opacity: "Opaque", temp: "Warm", note: "A hot orange-red cadmium." }
    ]
  },
  {
    name: "Reds",
    colors: [
      { name: "Scarlet Lake", code: "603", hex: "#D62A26", pigment: "PR 188, PR 255", perm: "A — Permanent", series: 2, light: "—", opacity: "Semi-transparent", temp: "Warm", note: "A brilliant warm scarlet." },
      { name: "Cadmium Red", code: "094", hex: "#CE2027", pigment: "PR 108", perm: "AA — Extremely permanent", series: 4, light: "I", opacity: "Opaque", temp: "Warm", note: "The classic opaque mid red." },
      { name: "Cadmium Red Deep", code: "097", hex: "#A81B22", pigment: "PR 108", perm: "AA — Extremely permanent", series: 4, light: "I", opacity: "Opaque", temp: "Warm", note: "A deep, slightly cooler cadmium red." },
      { name: "Winsor Red", code: "726", hex: "#C81D24", pigment: "PR 254", perm: "A — Permanent", series: 2, light: "III", opacity: "Semi-opaque", temp: "Warm", note: "A clean, strong modern red." },
      { name: "Winsor Red Deep", code: "725", hex: "#9D1A25", pigment: "PR 264", perm: "A — Permanent", series: 2, light: "I", opacity: "Transparent", temp: "Cool", note: "A deep transparent cool red." },
      { name: "Permanent Alizarin Crimson", code: "468", hex: "#7C1E2A", pigment: "PR 177", perm: "A — Permanent", series: 4, light: "I", opacity: "Transparent", temp: "Cool", note: "A lightfast cool crimson with a smoky glaze." },
      { name: "Alizarin Crimson", code: "004", hex: "#7A1C28", pigment: "PR 83", perm: "B — Moderately durable", series: 2, light: "—", opacity: "Transparent", temp: "Cool", note: "The traditional cool crimson lake — less permanent." },
      { name: "Permanent Rose", code: "502", hex: "#C71E5A", pigment: "PV 19", perm: "A — Permanent", series: 2, light: "I", opacity: "Transparent", temp: "Cool", note: "A clean transparent rose, quinacridone-based." },
      { name: "Rose Madder Genuine", code: "587", hex: "#B4435A", pigment: "NR 9", perm: "B — Moderately durable", series: 5, light: "II", opacity: "Transparent", temp: "Cool", note: "The delicate natural madder lake — soft and transparent." },
      { name: "Permanent Carmine", code: "479", hex: "#9E1F3C", pigment: "PR 176", perm: "A — Permanent", series: 2, light: "I", opacity: "Transparent", temp: "Cool", note: "A deep blue-red, lightfast carmine." }
    ]
  },
  {
    name: "Violets",
    colors: [
      { name: "Winsor Violet (Dioxazine)", code: "733", hex: "#3A2150", pigment: "PV 23", perm: "A — Permanent", series: 2, light: "I", opacity: "Transparent", temp: "Cool", note: "Dioxazine violet — deep, transparent, powerful in tint." },
      { name: "Cobalt Violet", code: "192", hex: "#6E3A82", pigment: "PV 14", perm: "AA — Extremely permanent", series: 5, light: "I", opacity: "Semi-opaque", temp: "Warm", note: "A pure mineral violet that cannot be mixed." },
      { name: "Ultramarine Violet", code: "672", hex: "#4C3A78", pigment: "PV 15", perm: "AA — Extremely permanent", series: 2, light: "I", opacity: "Transparent", temp: "Cool", note: "A soft, transparent mineral violet." },
      { name: "Permanent Mauve", code: "491", hex: "#5A2A6E", pigment: "PV 16, PV 23", perm: "A — Permanent", series: 4, light: "I", opacity: "Transparent", temp: "Cool", note: "A rich transparent mauve." },
      { name: "Magenta", code: "380", hex: "#9C1C56", pigment: "PR 122", perm: "A — Permanent", series: 2, light: "I", opacity: "Transparent", temp: "Cool", note: "A vivid transparent quinacridone magenta." }
    ]
  },
  {
    name: "Blues",
    colors: [
      { name: "Cerulean Blue", code: "137", hex: "#1C77AE", pigment: "PB 35", perm: "AA — Extremely permanent", series: 4, light: "I", opacity: "Opaque", temp: "Cool", note: "An opaque, granular sky blue." },
      { name: "Cobalt Blue", code: "178", hex: "#1E3C8C", pigment: "PB 28", perm: "AA — Extremely permanent", series: 4, light: "I", opacity: "Semi-transparent", temp: "Warm", note: "A pure, unmixable mineral blue." },
      { name: "Cobalt Blue Deep", code: "180", hex: "#1A2E78", pigment: "PB 73", perm: "AA — Extremely permanent", series: 5, light: "III", opacity: "Semi-transparent", temp: "Warm", note: "A deeper, slightly violet cobalt." },
      { name: "French Ultramarine", code: "263", hex: "#20307E", pigment: "PB 29", perm: "A — Permanent", series: 2, light: "I", opacity: "Transparent", temp: "Warm", note: "A warm, transparent classic ultramarine." },
      { name: "Ultramarine (Green Shade)", code: "667", hex: "#213A86", pigment: "PB 29", perm: "A — Permanent", series: 1, light: "I", opacity: "Transparent", temp: "Cool", note: "A cooler, greener ultramarine." },
      { name: "Winsor Blue (Green Shade)", code: "707", hex: "#123A54", pigment: "PB 15:3", perm: "A — Permanent", series: 2, light: "I", opacity: "Transparent", temp: "Cool", note: "Phthalo blue — intense, transparent, high tinting strength." },
      { name: "Winsor Blue (Red Shade)", code: "706", hex: "#14304E", pigment: "PB 15:1", perm: "A — Permanent", series: 2, light: "I", opacity: "Transparent", temp: "Warm", note: "A warmer phthalo blue." },
      { name: "Prussian Blue", code: "538", hex: "#14303C", pigment: "PB 27", perm: "A — Permanent", series: 1, light: "I", opacity: "Transparent", temp: "Cool", note: "A deep, transparent, slightly green dark blue." },
      { name: "Indanthrene Blue", code: "321", hex: "#1B2A4E", pigment: "PB 60", perm: "A — Permanent", series: 4, light: "I", opacity: "Semi-transparent", temp: "Warm", note: "A deep, dependable blue with a smoky glaze." },
      { name: "Cobalt Turquoise", code: "190", hex: "#178A9E", pigment: "PB 36", perm: "AA — Extremely permanent", series: 5, light: "I", opacity: "Opaque", temp: "Cool", note: "An intense opaque blue-green mineral." },
      { name: "Manganese Blue Hue", code: "379", hex: "#0E7EA8", pigment: "PB 15", perm: "A — Permanent", series: 1, light: "I", opacity: "Transparent", temp: "Cool", note: "A bright transparent green-blue." }
    ]
  },
  {
    name: "Greens",
    colors: [
      { name: "Winsor Green (Blue Shade)", code: "720", hex: "#0B4D3E", pigment: "PG 7", perm: "A — Permanent", series: 2, light: "I", opacity: "Transparent", temp: "Cool", note: "Phthalo green — cool, intense, transparent." },
      { name: "Winsor Green (Yellow Shade)", code: "721", hex: "#0E6A4C", pigment: "PG 36", perm: "A — Permanent", series: 2, light: "I", opacity: "Transparent", temp: "Warm", note: "A warmer, yellower phthalo green." },
      { name: "Viridian Hue", code: "696", hex: "#0F7A5C", pigment: "PG 7", perm: "A — Permanent", series: 2, light: "I", opacity: "Transparent", temp: "Cool", note: "A transparent blue-green hue replacing genuine Viridian for glazing." },
      { name: "Cobalt Green", code: "184", hex: "#2E8060", pigment: "PG 19", perm: "AA — Extremely permanent", series: 5, light: "II", opacity: "Semi-opaque", temp: "Cool", note: "A soft, muted mineral green." },
      { name: "Sap Green", code: "599", hex: "#4A6A24", pigment: "PG 36, PY 150", perm: "A — Permanent", series: 2, light: "I", opacity: "Transparent", temp: "Warm", note: "A natural transparent foliage green." },
      { name: "Oxide of Chromium", code: "459", hex: "#5A6E45", pigment: "PG 17", perm: "AA — Extremely permanent", series: 4, light: "I", opacity: "Opaque", temp: "Warm", note: "A muted, opaque, earthy green." },
      { name: "Terre Verte", code: "637", hex: "#5C6B4A", pigment: "PG 23", perm: "AA — Extremely permanent", series: 1, light: "I", opacity: "Transparent", temp: "Warm", note: "Green earth — soft, transparent, historic." },
      { name: "Permanent Green Light", code: "483", hex: "#4FA52E", pigment: "PG 36, PY 150", perm: "A — Permanent", series: 2, light: "I", opacity: "Semi-transparent", temp: "Warm", note: "A bright, fresh spring green." },
      { name: "Olive Green", code: "447", hex: "#585A2A", pigment: "PY 150, PG 7, PR 101", perm: "A — Permanent", series: 2, light: "I", opacity: "Transparent", temp: "Warm", note: "A deep, transparent olive." }
    ]
  },
  {
    name: "Earths",
    colors: [
      { name: "Raw Sienna", code: "552", hex: "#9A6A2E", pigment: "PBr 7", perm: "AA — Extremely permanent", series: 1, light: "I", opacity: "Transparent", temp: "Warm", note: "A warm, transparent earth yellow." },
      { name: "Burnt Sienna", code: "074", hex: "#7E3B23", pigment: "PBr 7", perm: "AA — Extremely permanent", series: 1, light: "I", opacity: "Transparent", temp: "Warm", note: "A warm transparent red-brown." },
      { name: "Raw Umber", code: "554", hex: "#4F3E28", pigment: "PBr 7", perm: "AA — Extremely permanent", series: 1, light: "I", opacity: "Semi-transparent", temp: "Cool", note: "A cool, quiet earth brown." },
      { name: "Burnt Umber", code: "076", hex: "#4A3122", pigment: "PBr 7", perm: "AA — Extremely permanent", series: 1, light: "I", opacity: "Semi-transparent", temp: "Warm", note: "A deep warm brown, useful for darks." },
      { name: "Light Red", code: "362", hex: "#A84A34", pigment: "PR 101", perm: "AA — Extremely permanent", series: 1, light: "I", opacity: "Opaque", temp: "Warm", note: "An opaque warm earth red." },
      { name: "Indian Red", code: "317", hex: "#6E322E", pigment: "PR 101", perm: "AA — Extremely permanent", series: 2, light: "I", opacity: "Opaque", temp: "Cool", note: "A dense, cool purple-brown earth." },
      { name: "Venetian Red", code: "678", hex: "#8E3B2C", pigment: "PR 101", perm: "AA — Extremely permanent", series: 1, light: "I", opacity: "Opaque", temp: "Warm", note: "A warm brick-red earth with great covering power." },
      { name: "Gold Ochre", code: "285", hex: "#B07A1E", pigment: "PY 42, PBr 7", perm: "AA — Extremely permanent", series: 1, light: "I", opacity: "Semi-transparent", temp: "Warm", note: "A glowing, deeper ochre." },
      { name: "Yellow Ochre", code: "744", hex: "#C68B2C", pigment: "PY 43", perm: "AA — Extremely permanent", series: 1, light: "I", opacity: "Semi-transparent", temp: "Warm", note: "The indispensable natural earth yellow." },
      { name: "Brown Madder", code: "056", hex: "#6E2A24", pigment: "PR 206", perm: "A — Permanent", series: 1, light: "I", opacity: "Transparent", temp: "Warm", note: "A deep transparent brown-red." },
      { name: "Transparent Maroon", code: "657", hex: "#5A1E1C", pigment: "PR 206", perm: "A — Permanent", series: 2, light: "III", opacity: "Transparent", temp: "Warm", note: "A dark, glowing maroon glaze colour." }
    ]
  },
  {
    name: "Blacks & Greys",
    colors: [
      { name: "Ivory Black", code: "331", hex: "#1C1C1A", pigment: "PBk 9", perm: "AA — Extremely permanent", series: 1, light: "I", opacity: "Semi-opaque", temp: "Cool", note: "A slightly warm, all-purpose black." },
      { name: "Lamp Black", code: "337", hex: "#16160F", pigment: "PBk 7", perm: "AA — Extremely permanent", series: 1, light: "I", opacity: "Opaque", temp: "Cool", note: "A dense, slightly blue-leaning black." },
      { name: "Mars Black", code: "386", hex: "#161614", pigment: "PBk 11", perm: "AA — Extremely permanent", series: 2, light: "I", opacity: "Opaque", temp: "Neutral", note: "An opaque, strong, quick-drying black." },
      { name: "Blue Black", code: "034", hex: "#1A2028", pigment: "PBk 6", perm: "A — Permanent", series: 1, light: "I", opacity: "Semi-transparent", temp: "Cool", note: "A cool, blue-leaning black." },
      { name: "Payne's Gray", code: "465", hex: "#2A3340", pigment: "PB 29, PBk 6", perm: "AA — Extremely permanent", series: 1, light: "I", opacity: "Transparent", temp: "Cool", note: "A deep blue-grey, softer than black." },
      { name: "Davy's Gray", code: "217", hex: "#6E7066", pigment: "PBk 19, PG 17", perm: "AA — Extremely permanent", series: 2, light: "I", opacity: "Semi-opaque", temp: "Neutral", note: "A soft, muted neutral grey." }
    ]
  },
  {
    name: "Whites",
    colors: [
      { name: "Titanium White", code: "644", hex: "#FBFAF6", pigment: "PW 6", perm: "AA — Extremely permanent", series: 1, light: "I", opacity: "Opaque", temp: "Neutral", note: "The most opaque white, with the highest tinting strength." },
      { name: "Underpainting White", code: "674", hex: "#FAF8F2", pigment: "PW 6, PW 4", perm: "AA — Extremely permanent", series: 1, light: "I", opacity: "Semi-opaque", temp: "Neutral", note: "A fast-drying white for blocking in the underpainting." },
      { name: "Zinc White", code: "748", hex: "#FBFAF5", pigment: "PW 4", perm: "AA — Extremely permanent", series: 1, light: "I", opacity: "Semi-transparent", temp: "Cool", note: "A cool, transparent white for glazing and tints." },
      { name: "Flake White Hue", code: "242", hex: "#F8F5EC", pigment: "PW 6, PW 4", perm: "AA — Extremely permanent", series: 1, light: "I", opacity: "Opaque", temp: "Warm", note: "A warm, lead-free alternative to flake white." },
      { name: "Warm White", code: "429", hex: "#F8F4E8", pigment: "PW 6, PY 42", perm: "AA — Extremely permanent", series: 1, light: "II", opacity: "Opaque", temp: "Warm", note: "A warm white for warm-light passages — sunrise and sunset." }
    ]
  }
];
