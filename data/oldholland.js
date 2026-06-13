/* Old Holland — Classic Oil Colours reference dataset.
   Colour names and `code` (Old Holland's letter+number) transcribed from the
   official range at oldholland.com/oil-colours (Dec 2025). The letter prefix is
   Old Holland's price series (A–F); `series` maps that A=1 … F=6. `light` follows
   Old Holland's reputation for maximum lightfastness ("Excellent" for genuine
   mineral / cadmium / earth pigments; lower where a fugitive lake is named).
   `opacity` uses Old Holland's four classes (Opaque / Semi-opaque /
   Semi-transparent / Transparent). Hex values approximate each colour's masstone
   (tube colour) from its pigment; treat as a guide only. Reference dataset. */
window.OH_FAMILIES = [
  {
    name: "Whites",
    colors: [
      { name: "Titanium White", code: "A1", hex: "#FCFBF7", pigment: "PW 6", series: 1, light: "Excellent", opacity: "Opaque", temp: "Neutral", note: "The brightest, most opaque white — highest tinting strength." },
      { name: "Zinc White", code: "A2", hex: "#FBFAF5", pigment: "PW 4", series: 1, light: "Excellent", opacity: "Semi-transparent", temp: "Cool", note: "A cool, transparent white for glazing and clean tints." },
      { name: "Cremnitz White", code: "3", hex: "#F9F6EE", pigment: "PW 1", series: 4, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "Genuine lead white — stringy, warm, the old-master white." },
      { name: "Flake White No. 1", code: "4", hex: "#F8F5EC", pigment: "PW 1, PW 6", series: 1, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A dense, warm lead-bearing white." },
      { name: "Mixed White No. 2", code: "A5", hex: "#FAF8F2", pigment: "PW 6, PW 4", series: 1, light: "Excellent", opacity: "Opaque", temp: "Neutral", note: "A balanced titanium-zinc mixed white." }
    ]
  },
  {
    name: "Yellows",
    colors: [
      { name: "Old Holland Yellow Light", code: "A6", hex: "#F6E24A", pigment: "PY 3, PW 6", series: 1, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "A bright, opaque house-blend pale yellow." },
      { name: "Old Holland Yellow Medium", code: "B7", hex: "#FBD42A", pigment: "PY 74, PY 42", series: 2, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A clean mid yellow, the studio standard." },
      { name: "Old Holland Yellow Deep", code: "B8", hex: "#FAB818", pigment: "PY 65, PY 42", series: 2, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A deep, golden house yellow." },
      { name: "Brilliant Yellow Light", code: "B103", hex: "#F7E882", pigment: "PY 3, PW 6", series: 2, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "A pale, opaque tint yellow." },
      { name: "Brilliant Yellow", code: "B106", hex: "#F8DA48", pigment: "PY 74, PW 6", series: 2, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A soft, creamy opaque yellow." },
      { name: "Brilliant Yellow Reddish", code: "B109", hex: "#F6C23A", pigment: "PY 65, PW 6", series: 2, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A warm, slightly orange brilliant yellow." },
      { name: "Naples Yellow Reddish Extra", code: "B112", hex: "#EDB964", pigment: "PBr 24, PW 6", series: 2, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A warm, pink-leaning opaque Naples yellow." },
      { name: "Nickel Titanium Yellow", code: "C121", hex: "#EAD24E", pigment: "PY 53", series: 3, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "A muted, lightfast opaque primrose yellow." },
      { name: "Cadmium Yellow Lemon", code: "D9", hex: "#F6E200", pigment: "PY 35", series: 4, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "The palest, coolest cadmium yellow." },
      { name: "Scheveningen Yellow Lemon", code: "B10", hex: "#F2E22A", pigment: "PY 175", series: 2, light: "Excellent", opacity: "Semi-transparent", temp: "Cool", note: "A clean, transparent lemon — a cadmium-free hue." },
      { name: "Cadmium Yellow Light", code: "D11", hex: "#FFCD00", pigment: "PY 35", series: 4, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "A pale, opaque cadmium yellow." },
      { name: "Scheveningen Yellow Light", code: "B12", hex: "#FBD41E", pigment: "PY 154", series: 2, light: "Excellent", opacity: "Semi-transparent", temp: "Cool", note: "A bright, clean modern yellow." },
      { name: "Cadmium Yellow Medium", code: "D13", hex: "#FEC100", pigment: "PY 35", series: 4, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "The classic dense mid cadmium yellow." },
      { name: "Scheveningen Yellow Medium", code: "C14", hex: "#FBB712", pigment: "PY 83", series: 3, light: "Excellent", opacity: "Semi-transparent", temp: "Warm", note: "A warm, transparent golden yellow." },
      { name: "Cadmium Yellow Deep", code: "D16", hex: "#FAA400", pigment: "PY 35", series: 4, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A deep cadmium leaning toward orange." },
      { name: "Scheveningen Yellow Deep", code: "D15", hex: "#F59A0E", pigment: "PY 110", series: 4, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A deep, transparent warm yellow." },
      { name: "Cobalt Yellow Lake (Aureolin)", code: "E119", hex: "#EEC11E", pigment: "PY 40", series: 5, light: "Very Good", opacity: "Transparent", temp: "Cool", note: "Genuine aureolin — a clear, transparent cobalt yellow." },
      { name: "Naples Yellow Extra", code: "A313", hex: "#ECC97A", pigment: "PBr 24, PW 6", series: 1, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A soft, opaque, historic Naples yellow." },
      { name: "Naples Yellow Deep Extra", code: "B316", hex: "#E0AC52", pigment: "PBr 24, PW 6", series: 2, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A deeper, richer Naples yellow." },
      { name: "Gamboge Lake Extra", code: "B124", hex: "#F0A81C", pigment: "PY 153, PY 110", series: 2, light: "Very Good", opacity: "Transparent", temp: "Warm", note: "A bright, transparent modern gamboge." },
      { name: "Indian Yellow-Green Lake Extra", code: "B118", hex: "#D9B41E", pigment: "PY 150, PG 36", series: 2, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "A transparent green-gold glaze yellow." }
    ]
  },
  {
    name: "Oranges",
    colors: [
      { name: "Cadmium-Yellow Extra Deep", code: "E139", hex: "#F8920A", pigment: "PY 35", series: 5, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "The deepest cadmium yellow, edging into orange." },
      { name: "Cadmium Yellow Orange", code: "E142", hex: "#F57E12", pigment: "PO 20", series: 5, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A glowing cadmium yellow-orange." },
      { name: "Cadmium Orange", code: "E17", hex: "#F26E1C", pigment: "PO 20", series: 5, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A pure, dense cadmium orange." },
      { name: "Scheveningen Orange", code: "C18", hex: "#F0641E", pigment: "PO 73", series: 3, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A bright, modern lightfast orange." },
      { name: "Coral Orange", code: "C145", hex: "#F05A3E", pigment: "PO 73, PR 188", series: 3, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A soft, pink-warm coral." },
      { name: "Mars Orange Red", code: "A337", hex: "#C2502A", pigment: "PR 101", series: 1, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "An opaque iron-oxide orange-red." }
    ]
  },
  {
    name: "Reds",
    colors: [
      { name: "Cadmium Red Scarlet", code: "E20", hex: "#E83C22", pigment: "PR 108", series: 5, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A hot orange-red cadmium." },
      { name: "Scheveningen Red Scarlet", code: "C19", hex: "#E2331F", pigment: "PR 255", series: 3, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A clean, modern scarlet." },
      { name: "Vermilion Extra", code: "D148", hex: "#D33A1F", pigment: "PR 108, PR 255", series: 4, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A brilliant scarlet recalling genuine vermilion." },
      { name: "Old Holland Bright Red", code: "D151", hex: "#D2241F", pigment: "PR 254", series: 4, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A vivid, strong house red." },
      { name: "Cadmium Red Light", code: "E21", hex: "#CE2027", pigment: "PR 108", series: 5, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "The classic opaque mid cadmium red." },
      { name: "Cadmium Red Medium (Vermilioned)", code: "E154", hex: "#BE1F26", pigment: "PR 108", series: 5, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A slightly deeper, dense cadmium red." },
      { name: "Scarlet Lake Extra", code: "C157", hex: "#C42130", pigment: "PR 188", series: 3, light: "Very Good", opacity: "Semi-transparent", temp: "Warm", note: "A brilliant, transparent scarlet lake." },
      { name: "Cadmium Red Deep", code: "E23", hex: "#A81B22", pigment: "PR 108", series: 5, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "A deep, slightly cooler cadmium red." },
      { name: "Cadmium Red Purple", code: "E25", hex: "#7E1C2A", pigment: "PR 108", series: 5, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "A dark, cool cadmium edging to purple." },
      { name: "Carmin Lake Extra", code: "D160", hex: "#9E1F3C", pigment: "PR 176", series: 4, light: "Very Good", opacity: "Transparent", temp: "Cool", note: "A deep, transparent blue-red carmine." },
      { name: "Alizarin Crimson Lake Extra", code: "C163", hex: "#7C1E2A", pigment: "PR 83", series: 3, light: "Good", opacity: "Transparent", temp: "Cool", note: "The traditional transparent cool crimson lake." },
      { name: "Madder (Crimson) Lake Deep Extra", code: "C28", hex: "#8A2236", pigment: "PR 83, PR 176", series: 3, light: "Very Good", opacity: "Transparent", temp: "Cool", note: "A deep, transparent madder-crimson glaze." },
      { name: "Burgundy Wine Red", code: "D166", hex: "#5E1E2A", pigment: "PR 179", series: 4, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "A dark, glowing wine red." },
      { name: "Scheveningen Red Deep", code: "C24", hex: "#9D1A25", pigment: "PR 264", series: 3, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "A deep, transparent cool red." },
      { name: "Scheveningen Red Light", code: "B22", hex: "#D62A26", pigment: "PR 188", series: 2, light: "Very Good", opacity: "Semi-transparent", temp: "Warm", note: "A bright warm red." },
      { name: "Scheveningen Red Medium", code: "B169", hex: "#C81D24", pigment: "PR 254", series: 2, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A clean, strong mid red." },
      { name: "Brilliant Pink", code: "B175", hex: "#E7A0B6", pigment: "PR 122, PW 6", series: 2, light: "Very Good", opacity: "Opaque", temp: "Cool", note: "An opaque, soft tint pink." },
      { name: "Scheveningen Rose Deep", code: "E29", hex: "#C71E5A", pigment: "PV 19", series: 5, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "A clean, transparent cool rose." },
      { name: "Old Holland Magenta", code: "D181", hex: "#9C1C56", pigment: "PR 122", series: 4, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "A vivid transparent quinacridone magenta." }
    ]
  },
  {
    name: "Violets",
    colors: [
      { name: "Scheveningen Violet", code: "E30", hex: "#5A2A6E", pigment: "PV 23", series: 5, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "A powerful, dark transparent dioxazine violet." },
      { name: "Manganese Violet-Reddish", code: "C190", hex: "#7A3A6E", pigment: "PV 16", series: 3, light: "Excellent", opacity: "Semi-transparent", temp: "Warm", note: "A muted, granular red-violet." },
      { name: "Cobalt Violet Light", code: "E31", hex: "#9A5AA0", pigment: "PV 14", series: 5, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A pure, pale mineral violet that cannot be mixed." },
      { name: "Old Holland Bright Violet", code: "C193", hex: "#6E3A82", pigment: "PV 23, PV 19", series: 3, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "A vivid, clean house violet." },
      { name: "Manganese Violet Blueness", code: "C196", hex: "#5A3A78", pigment: "PV 16", series: 3, light: "Excellent", opacity: "Semi-transparent", temp: "Cool", note: "A cooler, bluer manganese violet." },
      { name: "Cobalt Violet Dark", code: "F32", hex: "#5E2A70", pigment: "PV 14", series: 6, light: "Excellent", opacity: "Semi-opaque", temp: "Cool", note: "A deep, pure cobalt violet." },
      { name: "Ultramarine Violet", code: "B199", hex: "#4C3A78", pigment: "PV 15", series: 2, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "A soft, transparent mineral violet." },
      { name: "Dioxazine Mauve", code: "C202", hex: "#4A2A60", pigment: "PV 23", series: 3, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "A deep, transparent mauve." },
      { name: "Old Holland Blue Violet", code: "C205", hex: "#3A2A68", pigment: "PV 23, PB 29", series: 3, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "A dark blue-leaning violet." },
      { name: "Royal Purper Lake", code: "C184", hex: "#6A1E52", pigment: "PR 122, PV 19", series: 3, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "A deep, regal magenta-purple lake." }
    ]
  },
  {
    name: "Blues",
    colors: [
      { name: "Old Delft Blue", code: "C220", hex: "#1B355E", pigment: "PB 15, PB 29", series: 3, light: "Excellent", opacity: "Semi-transparent", temp: "Warm", note: "A deep, characterful house blue." },
      { name: "Parisian (Prussian) Blue Extra", code: "A34", hex: "#14303C", pigment: "PB 27", series: 1, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "A deep, transparent green-leaning dark blue." },
      { name: "Old Holland Blue", code: "C223", hex: "#19345C", pigment: "PB 15:3, PB 29", series: 3, light: "Excellent", opacity: "Semi-transparent", temp: "Cool", note: "The studio's all-round blue." },
      { name: "Scheveningen Blue Deep", code: "B226", hex: "#152C50", pigment: "PB 15:1", series: 2, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A deep, warm phthalo blue." },
      { name: "Scheveningen Blue", code: "B35", hex: "#123A54", pigment: "PB 15:3", series: 2, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "Phthalo blue — intense, transparent, high tinting strength." },
      { name: "Indigo Extra", code: "B33", hex: "#1E2A38", pigment: "PB 15, PBk 7", series: 2, light: "Excellent", opacity: "Semi-transparent", temp: "Cool", note: "A deep, muted denim-dark blue." },
      { name: "Cobalt Blue Turquoise", code: "E42", hex: "#147A9E", pigment: "PB 36", series: 5, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "An intense opaque blue-green mineral." },
      { name: "Cerulean Blue", code: "F39", hex: "#1C77AE", pigment: "PB 35", series: 6, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "An opaque, granular sky blue." },
      { name: "Manganese Blue Extra", code: "C41", hex: "#0E7EA8", pigment: "PB 15", series: 3, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "A bright, transparent green-blue (hue)." },
      { name: "Ultramarine Blue Deep", code: "A244", hex: "#1E2C76", pigment: "PB 29", series: 1, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A deep, warm, transparent ultramarine." },
      { name: "Ultramarine Blue", code: "A36", hex: "#20307E", pigment: "PB 29", series: 1, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "The classic transparent ultramarine." },
      { name: "French Ultramarine Light Extra", code: "B37", hex: "#2A3E8E", pigment: "PB 29", series: 2, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "A lighter, cooler French ultramarine." },
      { name: "Cobalt Blue Deep", code: "E38", hex: "#1A2E78", pigment: "PB 73", series: 5, light: "Excellent", opacity: "Semi-transparent", temp: "Warm", note: "A deep, slightly violet cobalt." },
      { name: "Cobalt Blue", code: "E250", hex: "#1E3C8C", pigment: "PB 28", series: 5, light: "Excellent", opacity: "Semi-transparent", temp: "Warm", note: "A pure, unmixable mineral blue." },
      { name: "King's Blue Deep", code: "B253", hex: "#4E78AE", pigment: "PW 6, PB 29", series: 2, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "A deep opaque cloud blue." },
      { name: "King's Blue Light", code: "B256", hex: "#7AA0C8", pigment: "PW 6, PB 29", series: 2, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "A soft, opaque pale sky blue." }
    ]
  },
  {
    name: "Greens",
    colors: [
      { name: "Cobalt Green Deep", code: "E267", hex: "#1E6A4E", pigment: "PG 26", series: 5, light: "Excellent", opacity: "Semi-opaque", temp: "Cool", note: "A deep, muted cobalt green mineral." },
      { name: "Cobalt Green", code: "E268", hex: "#2E8060", pigment: "PG 19", series: 5, light: "Excellent", opacity: "Semi-opaque", temp: "Cool", note: "A soft, muted mineral green." },
      { name: "Viridian Green Deep", code: "D47", hex: "#0E6A4C", pigment: "PG 18", series: 4, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "Genuine viridian — a cool, transparent blue-green." },
      { name: "Viridian Green Light", code: "D46", hex: "#0F7A5C", pigment: "PG 18", series: 4, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "A lighter, brighter genuine viridian." },
      { name: "Scheveningen Green Deep", code: "C49", hex: "#0B4D3E", pigment: "PG 7", series: 3, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "Phthalo green — cool, intense, transparent." },
      { name: "Scheveningen Green", code: "C48", hex: "#0E6A4C", pigment: "PG 7", series: 3, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A warmer phthalo green." },
      { name: "Permanent Green Deep", code: "B271", hex: "#1E6A3A", pigment: "PG 7, PY 83", series: 2, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A deep, rich foliage green." },
      { name: "Emerald Green", code: "B274", hex: "#1E8A66", pigment: "PG 7, PY 3", series: 2, light: "Excellent", opacity: "Semi-opaque", temp: "Cool", note: "A bright jewel green." },
      { name: "Permanent Green Light", code: "B277", hex: "#4FA52E", pigment: "PG 7, PY 3", series: 2, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A bright, fresh spring green." },
      { name: "Cadmium Green Deep", code: "D45", hex: "#2E6A2A", pigment: "PG 36, PY 35", series: 4, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A dense, opaque deep cadmium green." },
      { name: "Cadmium Green Light", code: "D44", hex: "#5A9A34", pigment: "PG 36, PY 35", series: 4, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A bright opaque cadmium green." },
      { name: "Old Holland Yellow Green", code: "B283", hex: "#7A9A2E", pigment: "PY 3, PG 7", series: 2, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A fresh yellow-green." },
      { name: "Permanent Green", code: "B289", hex: "#2E7A3A", pigment: "PG 7, PY 83", series: 2, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A balanced mid landscape green." },
      { name: "Sap Green Lake Extra", code: "B292", hex: "#4A6A24", pigment: "PG 36, PY 150", series: 2, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A natural transparent foliage green." },
      { name: "Old Holland Golden Green", code: "C295", hex: "#7A7A1E", pigment: "PY 129", series: 3, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A glowing transparent yellow-green." },
      { name: "Chromium Oxide Green", code: "C50", hex: "#5A6E45", pigment: "PG 17", series: 3, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A muted, opaque, earthy green." },
      { name: "Hooker's Green Lake Deep Extra", code: "C301", hex: "#2E5A2A", pigment: "PG 36, PY 110", series: 3, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A deep, transparent traditional landscape green." },
      { name: "Olive Green Dark", code: "B307", hex: "#4A4A1E", pigment: "PY 150, PG 7", series: 2, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A deep, muted transparent olive." },
      { name: "Green Earth", code: "A52", hex: "#5C6B4A", pigment: "PG 23", series: 1, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "Green earth — soft, transparent, historic." },
      { name: "Green Umber", code: "A310", hex: "#4A4A2E", pigment: "PG 23, PBr 7", series: 1, light: "Excellent", opacity: "Semi-transparent", temp: "Cool", note: "A cool, greenish natural earth." }
    ]
  },
  {
    name: "Earths",
    colors: [
      { name: "Mars Yellow", code: "A319", hex: "#C2871E", pigment: "PY 42", series: 1, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "An opaque synthetic iron-oxide yellow." },
      { name: "Yellow Ochre Light", code: "A53", hex: "#C68B2C", pigment: "PY 43", series: 1, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "The indispensable natural earth yellow." },
      { name: "Yellow Ochre Deep", code: "A54", hex: "#A8701E", pigment: "PY 43", series: 1, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A deeper, richer ochre." },
      { name: "Gold Ochre", code: "A55", hex: "#B07A1E", pigment: "PY 42, PBr 7", series: 1, light: "Excellent", opacity: "Semi-transparent", temp: "Warm", note: "A glowing, deeper ochre." },
      { name: "Italian Earth", code: "A322", hex: "#9A5A2A", pigment: "PBr 7", series: 1, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A warm, golden natural earth." },
      { name: "Raw Sienna Light", code: "A56", hex: "#9A6A2E", pigment: "PBr 7", series: 1, light: "Excellent", opacity: "Semi-transparent", temp: "Warm", note: "A warm, transparent earth yellow." },
      { name: "Raw Sienna Dark", code: "A57", hex: "#7E5424", pigment: "PBr 7", series: 1, light: "Excellent", opacity: "Semi-transparent", temp: "Warm", note: "A deeper, richer raw sienna." },
      { name: "Old Holland Yellow Brown", code: "C325", hex: "#8A5A24", pigment: "PBr 7", series: 3, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A deep, golden house brown." },
      { name: "Transparent Oxide Yellow Lake", code: "B328", hex: "#B5781A", pigment: "PY 42", series: 2, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A glowing transparent iron-oxide yellow." },
      { name: "Transparent Oxide-Red Lake", code: "B334", hex: "#7A2E1A", pigment: "PR 101", series: 2, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A glowing transparent iron-oxide red." },
      { name: "Burnt Sienna", code: "A61", hex: "#7E3B23", pigment: "PBr 7", series: 1, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A warm transparent red-brown." },
      { name: "Old Holland Light Red", code: "A340", hex: "#A84A34", pigment: "PR 101", series: 1, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "An opaque warm earth red." },
      { name: "Red Ochre", code: "A62", hex: "#8E3B2C", pigment: "PR 102", series: 1, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A natural opaque red earth." },
      { name: "English Red", code: "A63", hex: "#9A3A2A", pigment: "PR 101", series: 1, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A warm, brick-red earth." },
      { name: "Venetian Red", code: "A64", hex: "#8E3B2C", pigment: "PR 101", series: 1, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A warm brick-red earth with great covering power." },
      { name: "Persian Red (Indian)", code: "A65", hex: "#6E322E", pigment: "PR 101", series: 1, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "A dense, cool purple-brown earth." },
      { name: "Caput Mortuum Violet (Mars)", code: "A66", hex: "#5A2E30", pigment: "PR 101", series: 1, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "A deep, cool violet-brown earth." },
      { name: "Mars Brown", code: "A346", hex: "#5E3622", pigment: "PR 101, PBk 11", series: 1, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A dense, opaque synthetic brown." },
      { name: "Red Umber", code: "A349", hex: "#5E2E20", pigment: "PBr 7", series: 1, light: "Excellent", opacity: "Semi-transparent", temp: "Warm", note: "A deep, warm red-brown umber." },
      { name: "Brown Ochre Deep", code: "A67", hex: "#6E4A1E", pigment: "PBr 7", series: 1, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A deep, earthy golden brown." },
      { name: "Deep Ochre", code: "A68", hex: "#7A5418", pigment: "PY 42, PBr 7", series: 1, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A rich, deep golden ochre." },
      { name: "Burned Umber", code: "A70", hex: "#4A3122", pigment: "PBr 7", series: 1, light: "Excellent", opacity: "Semi-transparent", temp: "Warm", note: "A deep warm brown, useful for darks." },
      { name: "Raw Umber", code: "A69", hex: "#4F3E28", pigment: "PBr 7", series: 1, light: "Excellent", opacity: "Semi-transparent", temp: "Cool", note: "A cool, quiet earth brown." },
      { name: "Warm Sepia Extra", code: "A71", hex: "#3E2A1C", pigment: "PBr 7, PBk 11", series: 1, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A deep, warm transparent sepia." },
      { name: "Sepia Extra", code: "A355", hex: "#3A2A20", pigment: "PBr 7, PBk 9", series: 1, light: "Excellent", opacity: "Transparent", temp: "Neutral", note: "A deep, neutral transparent sepia." },
      { name: "Van Dyck Brown Extra (Cassel)", code: "A72", hex: "#3A2A1E", pigment: "NBr 8, PBk 7", series: 1, light: "Very Good", opacity: "Transparent", temp: "Warm", note: "A deep, transparent earthy brown." },
      { name: "Old Holland Ochre", code: "A352", hex: "#9A6A24", pigment: "PY 42, PBr 7", series: 1, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "The studio's signature golden ochre." }
    ]
  },
  {
    name: "Blacks & Greys",
    colors: [
      { name: "Davy's Grey", code: "A358", hex: "#6E7066", pigment: "PBk 19, PG 17", series: 1, light: "Excellent", opacity: "Semi-opaque", temp: "Neutral", note: "A soft, muted neutral grey." },
      { name: "Old Holland Warm Grey Light", code: "A361", hex: "#9A938A", pigment: "PW 6, PBk 11, PBr 7", series: 1, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A pre-mixed warm light grey." },
      { name: "Scheveningen Warm Grey", code: "A73", hex: "#6E665C", pigment: "PBk 11, PW 6", series: 1, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A mid warm neutral grey." },
      { name: "Old Holland Cold Grey", code: "A364", hex: "#6E7276", pigment: "PW 6, PBk 7", series: 1, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "A pre-mixed cool neutral grey." },
      { name: "Old Holland Blue Grey", code: "B259", hex: "#5A6470", pigment: "PW 6, PB 29, PBk 6", series: 2, light: "Excellent", opacity: "Semi-opaque", temp: "Cool", note: "A soft, blue-leaning grey." },
      { name: "Old Holland Violet-Grey", code: "B208", hex: "#6A6068", pigment: "PW 6, PV 15, PBk 7", series: 2, light: "Excellent", opacity: "Semi-opaque", temp: "Cool", note: "A muted violet-leaning grey." },
      { name: "Neutral Tint", code: "A211", hex: "#34383E", pigment: "PBk 6, PB 29, PV 19", series: 1, light: "Excellent", opacity: "Semi-transparent", temp: "Cool", note: "A deep, transparent neutral darkener." },
      { name: "Payne's Grey", code: "B214", hex: "#2A3340", pigment: "PB 29, PBk 6", series: 2, light: "Excellent", opacity: "Semi-transparent", temp: "Cool", note: "A deep blue-grey, softer than black." },
      { name: "Vine Black", code: "A367", hex: "#1A1A1C", pigment: "PBk 8", series: 1, light: "Excellent", opacity: "Semi-transparent", temp: "Cool", note: "A soft, slightly blue transparent black." },
      { name: "Ivory Black", code: "A74", hex: "#1C1C1A", pigment: "PBk 9", series: 1, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A slightly warm, all-purpose black." },
      { name: "Scheveningen Black", code: "A75", hex: "#16160F", pigment: "PBk 7", series: 1, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "A dense, deep, slightly cool black." },
      { name: "Mars Black", code: "A370", hex: "#161614", pigment: "PBk 11", series: 1, light: "Excellent", opacity: "Opaque", temp: "Neutral", note: "An opaque, strong, quick-drying black." }
    ]
  }
];
