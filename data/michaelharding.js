/* Michael Harding — Handmade Artists' Oil Colours reference dataset.
   Colour names and `code` (MH colour numbers) transcribed from the official range
   at michaelharding.co.uk/oil-colours (Oct 2025), including the new Tunbridge Wells,
   Brick Lane and Whitechapel collections. `light` follows MH's published
   lightfastness wording (Excellent / Very Good / Good / Low); `series` is MH's
   pricing series (1–7). Hex values approximate each colour's masstone (tube colour)
   from its pigment; treat as a guide only. Reference dataset. */
window.MH_FAMILIES = [
  {
    name: "Whites",
    colors: [
      { name: "Titanium White No. 1", code: "101", hex: "#FCFBF7", pigment: "PW 6", series: 1, light: "Excellent", opacity: "Opaque", temp: "Neutral", note: "Made with safflower oil — the standard bright, opaque white." },
      { name: "Foundation White", code: "225", hex: "#F8F5EC", pigment: "PW 6, PW 4", series: 1, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A fast-drying, dense white for grounds and underpainting." },
      { name: "Cremnitz White No. 1", code: "308", hex: "#F9F6EE", pigment: "PW 1", series: 4, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "Genuine lead white in linseed oil — stringy, warm, the old-master white." },
      { name: "Warm White Lead Alternative", code: "137", hex: "#F8F3E6", pigment: "PW 6, PY 42", series: 2, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A lead-free white that handles with lead-white warmth." },
      { name: "Unbleached Titanium", code: "117", hex: "#E7D9BE", pigment: "PW 6:1", series: 2, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A soft, putty-toned natural off-white." }
    ]
  },
  {
    name: "Yellows",
    colors: [
      { name: "Lemon Yellow", code: "108", hex: "#F4E24A", pigment: "PY 175", series: 2, light: "Excellent", opacity: "Semi-transparent", temp: "Cool", note: "A clean, cool, transparent primary lemon." },
      { name: "Lead Tin Yellow Lemon", code: "514", hex: "#F3DE5C", pigment: "PY 41", series: 6, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "Reconstructed historic lead-tin yellow, lemon shade." },
      { name: "Lead Tin Yellow Light", code: "512", hex: "#F6D43A", pigment: "PY 41", series: 6, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "The luminous opaque yellow of the old masters." },
      { name: "Cadmium Yellow Lemon", code: "401", hex: "#F6E200", pigment: "PY 35", series: 4, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "The palest, coolest cadmium yellow." },
      { name: "Cadmium Yellow", code: "402", hex: "#FEC100", pigment: "PY 35", series: 4, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "The classic dense mid cadmium yellow." },
      { name: "Cadmium Golden Yellow", code: "403", hex: "#FBB400", pigment: "PY 35", series: 4, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A rich, warm golden cadmium." },
      { name: "Cadmium Yellow Deep", code: "404", hex: "#FAA400", pigment: "PY 35", series: 4, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A deep cadmium leaning to orange." },
      { name: "Cobalt Yellow (Aureolin)", code: "501", hex: "#EEC11E", pigment: "PY 40", series: 6, light: "Very Good", opacity: "Transparent", temp: "Cool", note: "Genuine aureolin — a clear, transparent cobalt yellow." },
      { name: "Yellow Lake", code: "110", hex: "#F3CE1E", pigment: "PY 153", series: 3, light: "Very Good", opacity: "Transparent", temp: "Cool", note: "A glowing transparent lake yellow." },
      { name: "Indian Yellow", code: "203", hex: "#EE9A12", pigment: "PY 110, PY 139", series: 3, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A deep, luminous, transparent amber-yellow." },
      { name: "Indian Yellow Red Shade", code: "204", hex: "#E27D10", pigment: "PY 110, PO 71", series: 3, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A warmer, redder transparent Indian yellow." },
      { name: "Quinacridone Gold", code: "411", hex: "#C9821A", pigment: "PO 49, PY 150", series: 3, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A transparent golden glaze colour." },
      { name: "New Gamboge", code: "244", hex: "#F0A81C", pigment: "PY 153, PY 110", series: 3, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A bright, transparent modern gamboge. (Brick Lane)" },
      { name: "Turner's Yellow", code: "235", hex: "#F2C234", pigment: "PY 35, PW 6", series: 3, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A soft, opaque, sunlit yellow. (Tunbridge Wells)" },
      { name: "Naples Yellow", code: "218", hex: "#ECC97A", pigment: "PW 6, PY 42, PR 101", series: 2, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A pink-warm opaque pale yellow blend." },
      { name: "Genuine Naples Yellow Light", code: "605", hex: "#EBD08A", pigment: "PY 41 (lead antimonate)", series: 6, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "True lead-antimonate Naples yellow, light." },
      { name: "Genuine Naples Yellow Dark", code: "606", hex: "#E0B05A", pigment: "PY 41 (lead antimonate)", series: 6, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "True lead-antimonate Naples yellow, deep." },
      { name: "Warm Light Yellow", code: "226", hex: "#F7E07C", pigment: "PY 35, PW 6", series: 3, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A soft, opaque, creamy light yellow." }
    ]
  },
  {
    name: "Oranges",
    colors: [
      { name: "Cadmium Orange", code: "502", hex: "#F26E1C", pigment: "PO 20", series: 4, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A pure, dense cadmium orange." },
      { name: "Permanent Orange", code: "222", hex: "#F0641E", pigment: "PO 62, PO 73", series: 3, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A bright, lightfast modern orange." },
      { name: "Brilliant Orange", code: "246", hex: "#F4571C", pigment: "PO 73", series: 3, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A vivid, high-chroma orange. (Tunbridge Wells)" },
      { name: "Orange Benzimidazolone", code: "234", hex: "#EE7212", pigment: "PO 62", series: 3, light: "Excellent", opacity: "Semi-transparent", temp: "Warm", note: "A clean, transparent-leaning benzimidazolone orange. (Brick Lane)" },
      { name: "Orange Sunset", code: "245", hex: "#E8541F", pigment: "PO 73, PR 255", series: 3, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A glowing red-orange. (Whitechapel)" }
    ]
  },
  {
    name: "Reds",
    colors: [
      { name: "Cadmium Red Light", code: "503", hex: "#E23720", pigment: "PR 108", series: 4, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A hot, opaque orange-red cadmium." },
      { name: "Cadmium Red", code: "504", hex: "#CE2027", pigment: "PR 108", series: 4, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "The classic opaque mid red." },
      { name: "Cadmium Red Deep", code: "505", hex: "#A81B22", pigment: "PR 108", series: 4, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "A deep, slightly cooler cadmium red." },
      { name: "Pyrrole Red", code: "230", hex: "#CE1F22", pigment: "PR 254", series: 3, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A clean, strong, modern fire-engine red." },
      { name: "Scarlet Lake", code: "205", hex: "#D62A26", pigment: "PR 188", series: 3, light: "Very Good", opacity: "Semi-transparent", temp: "Warm", note: "A brilliant warm scarlet." },
      { name: "Naphthol Red", code: "301", hex: "#C21F2A", pigment: "PR 170", series: 2, light: "Very Good", opacity: "Semi-transparent", temp: "Warm", note: "A bright, slightly transparent crimson-red." },
      { name: "Genuine Chinese Vermilion", code: "701", hex: "#D33A1F", pigment: "PR 106 (mercuric sulphide)", series: 7, light: "Very Good", opacity: "Opaque", temp: "Warm", note: "True vermilion — the historic, brilliant scarlet." },
      { name: "Alizarin Crimson", code: "302", hex: "#7A1C28", pigment: "PR 83", series: 2, light: "Low", opacity: "Transparent", temp: "Cool", note: "The traditional transparent cool crimson lake." },
      { name: "Crimson Lake", code: "406", hex: "#8A1C30", pigment: "PR 176", series: 3, light: "Very Good", opacity: "Transparent", temp: "Cool", note: "A deep, transparent blue-red lake." },
      { name: "Rose Madder", code: "608", hex: "#B4435A", pigment: "NR 9 (genuine madder)", series: 6, light: "Good", opacity: "Transparent", temp: "Cool", note: "Delicate natural madder lake — soft and transparent." },
      { name: "Quinacridone Rose", code: "311", hex: "#C71E5A", pigment: "PV 19", series: 3, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "A clean, transparent cool rose." },
      { name: "Magenta", code: "303", hex: "#9C1C56", pigment: "PR 122", series: 3, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "A vivid transparent quinacridone magenta." },
      { name: "Brilliant Pink", code: "207", hex: "#E7A0B6", pigment: "PR 122, PW 6", series: 3, light: "Very Good", opacity: "Opaque", temp: "Cool", note: "An opaque, soft tint pink." },
      { name: "Rose Dore", code: "319", hex: "#C44A54", pigment: "PR 179", series: 3, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A warm, glowing transparent rose. (Tunbridge Wells)" },
      { name: "Opera Rose", code: "247", hex: "#E5247E", pigment: "PR 122, fluor.", series: 3, light: "Good", opacity: "Transparent", temp: "Cool", note: "An electric, fluorescent pink-rose. (Brick Lane)" },
      { name: "Herculane Red", code: "138", hex: "#9A2B26", pigment: "PR 101", series: 2, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A deep, earthy brick red. (Whitechapel)" }
    ]
  },
  {
    name: "Violets",
    colors: [
      { name: "Cobalt Violet Light", code: "601", hex: "#9A5AA0", pigment: "PV 14", series: 6, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A pure, pale mineral violet that cannot be mixed." },
      { name: "Cobalt Violet Dark", code: "602", hex: "#6E3A82", pigment: "PV 14", series: 6, light: "Excellent", opacity: "Semi-opaque", temp: "Cool", note: "A deep, pure cobalt violet." },
      { name: "Manganese Violet", code: "304", hex: "#6A3A6E", pigment: "PV 16", series: 2, light: "Excellent", opacity: "Semi-transparent", temp: "Cool", note: "A muted, granular mineral violet." },
      { name: "Ultramarine Violet", code: "208", hex: "#4C3A78", pigment: "PV 15", series: 2, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "A soft, transparent mineral violet." },
      { name: "Amethyst", code: "309", hex: "#7A4E86", pigment: "PV 15, PR 122", series: 3, light: "Very Good", opacity: "Transparent", temp: "Cool", note: "A jewel-like transparent violet." },
      { name: "Perylene Violet", code: "314", hex: "#4A2326", pigment: "PV 29", series: 3, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A deep, dark transparent red-violet for shadows." },
      { name: "Deep Purple", code: "312", hex: "#3A2150", pigment: "PV 23", series: 3, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "A powerful, dark dioxazine purple." },
      { name: "Quinacridone Purple", code: "322", hex: "#6A1E52", pigment: "PV 19", series: 3, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "A deep transparent magenta-purple. (Brick Lane)" },
      { name: "Ultramarine Pink", code: "233", hex: "#B07AA0", pigment: "PV 15", series: 2, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "A delicate transparent pink-violet. (Brick Lane)" },
      { name: "Wisteria", code: "242", hex: "#8E7AB0", pigment: "PV 15, PW 6", series: 3, light: "Excellent", opacity: "Semi-opaque", temp: "Cool", note: "A soft, opaque lilac. (Tunbridge Wells)" },
      { name: "Lavender", code: "243", hex: "#A9A6C8", pigment: "PV 15, PW 6, PB 29", series: 3, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "A pale, opaque grey-lavender. (Tunbridge Wells)" }
    ]
  },
  {
    name: "Blues",
    colors: [
      { name: "Cerulean Blue", code: "603", hex: "#1C77AE", pigment: "PB 35", series: 5, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "An opaque, granular sky blue." },
      { name: "Cobalt Blue", code: "506", hex: "#1E3C8C", pigment: "PB 28", series: 6, light: "Excellent", opacity: "Semi-transparent", temp: "Warm", note: "A pure, unmixable mineral blue." },
      { name: "Ultramarine Blue", code: "113", hex: "#20307E", pigment: "PB 29", series: 2, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A warm, transparent classic ultramarine." },
      { name: "Lapis Lazuli", code: "702", hex: "#2A4A8E", pigment: "PB 29 (genuine lapis)", series: 7, light: "Excellent", opacity: "Semi-transparent", temp: "Warm", note: "Genuine natural ultramarine ground from lapis — soft and luminous." },
      { name: "Phthalocyanine Blue Lake", code: "209", hex: "#123A54", pigment: "PB 15", series: 2, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "Phthalo blue — intense, transparent, huge tinting strength." },
      { name: "Phthalo Blue Red Shade", code: "231", hex: "#14304E", pigment: "PB 15:1", series: 2, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A warmer, redder phthalo blue. (Tunbridge Wells)" },
      { name: "Prussian Blue", code: "112", hex: "#14303C", pigment: "PB 27", series: 2, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "A deep, transparent green-leaning dark blue." },
      { name: "Indanthrone Blue", code: "313", hex: "#1B2A4E", pigment: "PB 60", series: 3, light: "Excellent", opacity: "Semi-transparent", temp: "Warm", note: "A deep, dependable blue with a smoky glaze." },
      { name: "Indigo", code: "228", hex: "#1E2A38", pigment: "PB 15, PBk 7", series: 2, light: "Excellent", opacity: "Semi-transparent", temp: "Cool", note: "A deep, muted denim-dark blue." },
      { name: "Kings Blue Light", code: "211", hex: "#7AA0C8", pigment: "PW 6, PB 29, PB 15", series: 3, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "A soft, opaque pale sky blue." },
      { name: "Kings Blue Deep", code: "212", hex: "#4E78AE", pigment: "PW 6, PB 29", series: 3, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "A deeper opaque cloud blue." },
      { name: "Vivid Blue", code: "240", hex: "#1556C8", pigment: "PB 15:3, PB 29", series: 3, light: "Excellent", opacity: "Semi-transparent", temp: "Cool", note: "A high-chroma electric blue. (Tunbridge Wells)" },
      { name: "Blue Verditer", code: "318", hex: "#2E7AA8", pigment: "PB 35, PW 6", series: 3, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "A historic opaque sky blue-green. (Brick Lane)" }
    ]
  },
  {
    name: "Greens",
    colors: [
      { name: "Viridian", code: "511", hex: "#0F7A5C", pigment: "PG 18", series: 5, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "Genuine viridian — a cool, transparent blue-green." },
      { name: "Phthalo Green Lake", code: "213", hex: "#0B4D3E", pigment: "PG 7", series: 2, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "Phthalo green — cool, intense, transparent." },
      { name: "Phthalo Green Yellow Shade", code: "214", hex: "#0E6A4C", pigment: "PG 36", series: 2, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A warmer, yellower phthalo green." },
      { name: "Permanent Green Light", code: "215", hex: "#4FA52E", pigment: "PG 36, PY 3", series: 3, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A bright, fresh spring green." },
      { name: "Permanent Sap Green", code: "217", hex: "#4A6A24", pigment: "PG 36, PY 150", series: 3, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A natural transparent foliage green." },
      { name: "Cobalt Green Deep", code: "508", hex: "#1E6A4E", pigment: "PG 26", series: 6, light: "Excellent", opacity: "Semi-opaque", temp: "Cool", note: "A deep, muted cobalt green mineral." },
      { name: "Cadmium Green", code: "412", hex: "#3E8A3A", pigment: "PG 36, PY 35", series: 4, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "An opaque, dense cadmium-based green. (Tunbridge Wells)" },
      { name: "Emerald Green", code: "216", hex: "#1E8A66", pigment: "PG 7, PY 3", series: 3, light: "Excellent", opacity: "Semi-opaque", temp: "Cool", note: "A bright jewel green." },
      { name: "Terre Verte", code: "115", hex: "#5C6B4A", pigment: "PG 23", series: 2, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "Green earth — soft, transparent, historic." },
      { name: "Oxide of Chromium", code: "305", hex: "#5A6E45", pigment: "PG 17", series: 2, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A muted, opaque, earthy green." },
      { name: "Green Gold", code: "410", hex: "#7A7A1E", pigment: "PY 129", series: 3, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A glowing transparent yellow-green." },
      { name: "Phthalo Turquoise", code: "210", hex: "#0E6A78", pigment: "PB 16", series: 2, light: "Excellent", opacity: "Transparent", temp: "Cool", note: "A clean transparent blue-green." },
      { name: "Cobalt Turquoise Deep", code: "507", hex: "#0E7A78", pigment: "PG 50", series: 6, light: "Excellent", opacity: "Semi-opaque", temp: "Cool", note: "A deep opaque turquoise mineral." },
      { name: "Hookers Green", code: "238", hex: "#2E5A2A", pigment: "PG 36, PY 110", series: 3, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A deep, transparent traditional landscape green. (Whitechapel)" },
      { name: "Olive Green", code: "237", hex: "#585A2A", pigment: "PY 150, PG 7, PR 101", series: 3, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A deep, muted transparent olive. (Whitechapel)" },
      { name: "Moss Green", code: "239", hex: "#6E7A3A", pigment: "PG 36, PY 42", series: 3, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A soft, earthy yellow-green. (Tunbridge Wells)" },
      { name: "Aqua Green", code: "251", hex: "#2E9A82", pigment: "PG 7, PB 16, PW 6", series: 3, light: "Excellent", opacity: "Semi-opaque", temp: "Cool", note: "A bright, fresh aqua. (Brick Lane)" }
    ]
  },
  {
    name: "Earths",
    colors: [
      { name: "Yellow Ochre", code: "119", hex: "#C68B2C", pigment: "PY 43", series: 2, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "The indispensable natural earth yellow." },
      { name: "Yellow Ochre Deep", code: "118", hex: "#A8701E", pigment: "PY 43", series: 2, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A deeper, richer ochre." },
      { name: "French Yellow Ochre", code: "133", hex: "#BC8A3A", pigment: "PY 43", series: 2, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A clean, bright French-mined ochre." },
      { name: "Transparent Oxide Yellow", code: "219", hex: "#B5781A", pigment: "PY 42", series: 3, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A glowing transparent iron-oxide yellow." },
      { name: "Raw Sienna", code: "120", hex: "#9A6A2E", pigment: "PBr 7", series: 2, light: "Excellent", opacity: "Semi-transparent", temp: "Warm", note: "A warm, transparent earth yellow." },
      { name: "Italian Brown Ochre", code: "223", hex: "#8A5A24", pigment: "PBr 7", series: 2, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A deep, golden natural ochre." },
      { name: "Burnt Sienna", code: "125", hex: "#7E3B23", pigment: "PBr 7", series: 2, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A warm transparent red-brown." },
      { name: "Transparent Oxide Red", code: "220", hex: "#7A2E1A", pigment: "PR 101", series: 3, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A glowing transparent iron-oxide red." },
      { name: "Venetian Red", code: "122", hex: "#8E3B2C", pigment: "PR 101", series: 2, light: "Excellent", opacity: "Opaque", temp: "Warm", note: "A warm brick-red earth with great covering power." },
      { name: "Indian Red", code: "123", hex: "#6E322E", pigment: "PR 101", series: 2, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "A dense, cool purple-brown earth." },
      { name: "Red Umber", code: "124", hex: "#5E2E20", pigment: "PBr 7", series: 2, light: "Excellent", opacity: "Semi-transparent", temp: "Warm", note: "A deep, warm red-brown umber." },
      { name: "Raw Umber", code: "121", hex: "#4F3E28", pigment: "PBr 7", series: 2, light: "Excellent", opacity: "Semi-transparent", temp: "Cool", note: "A cool, quiet earth brown." },
      { name: "Burnt Umber", code: "126", hex: "#4A3122", pigment: "PBr 7", series: 2, light: "Excellent", opacity: "Semi-transparent", temp: "Warm", note: "A deep warm brown, useful for darks." },
      { name: "Transparent Oxide Brown", code: "224", hex: "#4A2A18", pigment: "PBr 7", series: 3, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A rich transparent glazing brown." },
      { name: "Vandyke Brown", code: "134", hex: "#3A2A1E", pigment: "NBr 8, PBk 7", series: 2, light: "Very Good", opacity: "Transparent", temp: "Warm", note: "A deep, transparent earthy brown." },
      { name: "Italian Green Umber", code: "132", hex: "#4A4A2E", pigment: "PBr 7", series: 2, light: "Excellent", opacity: "Semi-transparent", temp: "Cool", note: "A cool, greenish natural umber." },
      { name: "Madder Brown", code: "317", hex: "#5A2A22", pigment: "PR 206", series: 3, light: "Excellent", opacity: "Transparent", temp: "Warm", note: "A deep transparent madder-toned brown. (Whitechapel)" },
      { name: "Permanent Brown", code: "232", hex: "#4E2E1E", pigment: "PBr 25", series: 3, light: "Excellent", opacity: "Semi-transparent", temp: "Warm", note: "A dependable deep brown. (Whitechapel)" }
    ]
  },
  {
    name: "Blacks & Greys",
    colors: [
      { name: "Neutral Grey N7", code: "140", hex: "#9A9A98", pigment: "PBk 7, PW 6", series: 2, light: "Excellent", opacity: "Opaque", temp: "Neutral", note: "A pre-mixed light value-7 neutral grey. (Tunbridge Wells)" },
      { name: "Neutral Grey N5", code: "136", hex: "#6E6E6C", pigment: "PBk 7, PW 6", series: 2, light: "Excellent", opacity: "Opaque", temp: "Neutral", note: "A pre-mixed mid value-5 neutral grey." },
      { name: "Neutral Tint", code: "139", hex: "#34383E", pigment: "PBk 6, PB 29, PV 19", series: 2, light: "Excellent", opacity: "Semi-transparent", temp: "Cool", note: "A deep, transparent neutral darkener. (Brick Lane)" },
      { name: "Payne's Grey", code: "127", hex: "#2A3340", pigment: "PB 29, PBk 6", series: 2, light: "Excellent", opacity: "Semi-transparent", temp: "Cool", note: "A deep blue-grey, softer than black." },
      { name: "Vine Black", code: "135", hex: "#1A1A1C", pigment: "PBk 8", series: 2, light: "Excellent", opacity: "Semi-transparent", temp: "Cool", note: "A soft, slightly blue transparent black." },
      { name: "Lamp Black", code: "128", hex: "#16160F", pigment: "PBk 6", series: 1, light: "Excellent", opacity: "Opaque", temp: "Cool", note: "A dense, slightly blue-leaning black." },
      { name: "Ivory Black", code: "129", hex: "#1C1C1A", pigment: "PBk 9", series: 1, light: "Excellent", opacity: "Semi-opaque", temp: "Warm", note: "A slightly warm, all-purpose black." }
    ]
  }
];
