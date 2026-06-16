/* masters.jsx — Old Masters palette reference tab */
const { useState, useRef, useEffect } = React;

/* ── colour helpers ── */
function mLin(c){ c/=255; return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4); }
function mLumY(hex){ const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16); return 0.2126*mLin(r)+0.7152*mLin(g)+0.0722*mLin(b); }
function mLstar(hex){ const Y=mLumY(hex); return Y<=0.008856?903.3*Y:116*Math.cbrt(Y)-16; }
function mGrey(hex){ const Y=mLumY(hex),inv=Y<=0.0031308?12.92*Y:1.055*Math.pow(Y,1/2.4)-0.055,v=Math.round(Math.max(0,Math.min(255,inv*255))); return `rgb(${v},${v},${v})`; }
const mStr = { fill:"none", stroke:"currentColor", strokeWidth:1.6, strokeLinecap:"round", strokeLinejoin:"round" };

/* ── pigment hue-order sort ──
   Order: yellows → oranges → reds → violets → blues → greens → earths → blacks/greys → whites */
function pigmentRank(hex) {
  const r=parseInt(hex.slice(1,3),16)/255, g=parseInt(hex.slice(3,5),16)/255, b=parseInt(hex.slice(5,7),16)/255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b), delta=max-min;
  const l=(max+min)/2;
  const s=delta===0?0:(l<0.5?delta/(max+min):delta/(2-max-min));
  let h=0;
  if(delta>0){
    if(max===r) h=((g-b)/delta+(g<b?6:0))*60;
    else if(max===g) h=((b-r)/delta+2)*60;
    else h=((r-g)/delta+4)*60;
  }
  if(l>0.82) return 8;           // whites
  if(l<0.18||s<0.12) return 7;  // blacks & greys
  // earths: warm hue, muted saturation, mid lightness
  if(h>=10&&h<=65&&s<0.65&&l<0.72) return 6;
  if(h>=45&&h<=70) return 0;    // yellows
  if(h>=20&&h<45)  return 1;    // oranges
  if(h<20||h>=340) return 2;    // reds
  if(h>=280&&h<340) return 3;   // violets
  if(h>=185&&h<280) return 4;   // blues
  if(h>=70&&h<185)  return 5;   // greens
  return 6;
}
function sortPigments(arr){ return [...arr].sort((a,b)=>pigmentRank(a.c)-pigmentRank(b.c)); }

/* force Wikimedia to serve a resized thumbnail instead of full-res */
function thumbUrl(url, w=900) {
  if (!url) return url;
  if (url.includes('Special:FilePath')) return url + (url.includes('?') ? '&' : '?') + 'width=' + w;
  return url;
}
const MBack = () => <svg viewBox="0 0 24 24" {...mStr} style={{width:16,height:16}}><path d="m15 18-6-6 6-6"/></svg>;
const MChev = () => <svg className="chev" viewBox="0 0 24 24" {...mStr}><path d="m6 15 6-6 6 6"/></svg>;

/* ── era + artist data ── */
const MDATA = [
  {
    id:'northern', label:'Netherlandish', full:'Early Netherlandish & Northern Renaissance', period:'c. 1420–1555',
    artists:[
      { name:'Jan van Eyck', dates:'c. 1380–1441',
        note:'Van Eyck\'s oil technique produced a luminosity no earlier medium could approach. Working on chalk-primed oak panels, he built paintings in multiple transparent layers over meticulous underdrawing, each film allowing light to penetrate to the white ground before returning through the paint above. His blues are azurite in shadows, lapis lazuli reserved only for the highest-value sky and robe passages — cost-controlled with extraordinary precision. Lead tin yellow creates the concentrated brilliance in the most illuminated drapery folds.',
        pigments:[
          {n:'Lead white',c:'#EDE6D8'},{n:'Lapis lazuli',c:'#1B3B8C'},{n:'Azurite',c:'#3A5FA0'},
          {n:'Vermilion',c:'#CC3030'},{n:'Red madder',c:'#BF4040'},{n:'Malachite',c:'#3A7A3A'},
          {n:'Lead tin yellow',c:'#D4C025'},{n:'Green earth',c:'#5A7A4A'},{n:'Bone black',c:'#282828'},
        ]},
      { name:'Hans Holbein the Younger', short:'Holbein', dates:'c. 1497–1543',
        note:'Holbein\'s portrait surfaces are among the most precisely rendered in European painting — individual hairs, textile weaves, and jewel facets resolved with equal attention. He worked on chalk-primed oak with underdrawings transferred from careful preparatory studies. Flesh is built over a cool grey ground with warm glazes above; smalt provides the characteristic blue in costume and sky passages. Technical analysis reveals surprisingly little blending — the illusion of smooth surface arises from extraordinary control of thin paint application.',
        pigments:[
          {n:'Lead white',c:'#EDE6D8'},{n:'Smalt',c:'#4A6CA0'},{n:'Azurite',c:'#3A5FA0'},
          {n:'Vermilion',c:'#CC3030'},{n:'Carmine',c:'#C53030'},{n:'Yellow ochre',c:'#C89A3A'},
          {n:'Lead tin yellow',c:'#D4C025'},{n:'Green earth',c:'#5A7A4A'},{n:'Bone black',c:'#282828'},
        ]},
    ]
  },
  {
    id:'venetian', label:'Venetian', full:'Venetian Renaissance', period:'c. 1460–1580',
    artists:[
      { name:'Giovanni Bellini', dates:'c. 1430–1516',
        note:'Bellini\'s career spanned the entire transition from tempera to oil in Venice — his early works are egg tempera on panel, his late masterpieces fully realised oils. His defining contribution was placing the Madonna not against gold ground but within a specific Veneto landscape at a specific hour of day: light became the true subject. His lapis lazuli is among the richest blue in all of Venetian painting; he never substituted cheaper azurite where he considered the passage important. He was Titian\'s teacher, and the landscape vision he established shaped the entire school that followed.',
        pigments:[
          {n:'Lead white',c:'#EDE6D8'},{n:'Lapis lazuli',c:'#1B3B8C'},{n:'Vermilion',c:'#CC3030'},
          {n:'Red madder',c:'#BF4040'},{n:'Yellow ochre',c:'#C89A3A'},{n:'Lead tin yellow',c:'#D4C025'},
          {n:'Malachite',c:'#3A7A3A'},{n:'Green earth',c:'#5A7A4A'},{n:'Bone black',c:'#282828'},
        ]},
      { name:'Giorgione', dates:'c. 1477–1510',
        note:'Giorgione invented the pastoral mood in European painting — landscape not as setting but as atmosphere, charged with psychological tension that resists narrative resolution. The Tempest has defied interpretation for five centuries. Technically he was among the first to work directly on the canvas without preparatory drawing, building form through tone and colour rather than line — a method Titian inherited and carried further. He died at around thirty, and the body of work definitively attributed to him remains small.',
        pigments:[
          {n:'Lead white',c:'#EDE6D8'},{n:'Lapis lazuli',c:'#1B3B8C'},{n:'Azurite',c:'#3A5FA0'},
          {n:'Vermilion',c:'#CC3030'},{n:'Red madder',c:'#BF4040'},{n:'Yellow ochre',c:'#C89A3A'},
          {n:'Lead tin yellow',c:'#D4C025'},{n:'Malachite',c:'#3A7A3A'},{n:'Bone black',c:'#282828'},
        ]},
      { name:'Tiziano Vecelli (Titian)', short:'Titian', dates:'c. 1488–1576',
        note:'Titian built luminous flesh by layering transparent glazes of red madder and burnt sienna over a warm red ochre ground. X-ray analysis reveals a red-orange imprimatura beneath every skin passage — a warmth no optical mixture can replicate. His late works dissolved into near-transparent films, the weave of the canvas becoming part of the surface.',
        pigments:[
          {n:'Lead white',c:'#EDE6D8'},{n:'Lapis lazuli',c:'#1B3B8C'},{n:'Red madder',c:'#BF4040'},
          {n:'Red ochre',c:'#C05A30'},{n:'Orpiment',c:'#D4A827'},{n:'Realgar',c:'#E8821A'},
          {n:'Burnt sienna',c:'#9B5E3A'},{n:'Malachite',c:'#3A7A3A'},{n:'Bone black',c:'#282828'},
        ]},
      { name:'Paolo Veronese', dates:'c. 1528–1588',
        note:'Veronese was the supreme colorist of Venice — pale lemon yellows against deep azurite blues, cool silvers beside warm ochres. He worked more opaquely than Titian, in thin confident strokes rather than built-up glazes. His clarity of temperature reads as almost modern: more decorator than illusionist.',
        pigments:[
          {n:'Azurite',c:'#3A5FA0'},{n:'Malachite',c:'#3A7A3A'},{n:'Orpiment',c:'#D4A827'},
          {n:'Venetian red',c:'#B5413A'},{n:'Lead white',c:'#EDE6D8'},{n:'Realgar',c:'#E8821A'},
          {n:'Red ochre',c:'#C05A30'},
        ]},
    ]
  },
  {
    id:'baroque', label:'Baroque', full:'Baroque', period:'c. 1600–1680',
    artists:[
      { name:'Caravaggio', dates:'c. 1571–1610',
        note:'Caravaggio\'s tenebrism demanded an earth-heavy palette. He worked on dark grounds of raw umber and ivory black, reserving light entirely for faces and hands. His shadows are unmodified black — not coloured brown, not glazed. Technical analysis reveals almost no cool blues; drama is controlled entirely through value, not temperature.',
        pigments:[
          {n:'Ivory black',c:'#1A1A1A'},{n:'Raw umber',c:'#7A5230'},{n:'Yellow ochre',c:'#C89A3A'},
          {n:'Red ochre',c:'#C05A30'},{n:'Azurite',c:'#3A5FA0'},{n:'Vermilion',c:'#CC3030'},
          {n:'Lead white',c:'#EDE6D8'},
        ]},
      { name:'Georges de La Tour', short:'La Tour', dates:'c. 1593–1652',
        note:'De La Tour\'s candlelit tenebrism reduced the palette to its extreme: warm light built from lead white, yellow ochre, and vermilion, pushed against deep darkness in ivory black and raw umber. His forms are far more radically simplified than Caravaggio\'s — curves near-geometric, faces reduced to essential volumes. Technical analysis reveals thin, extraordinarily smooth paint with little visible brushwork; the meditative surface conceals the construction beneath. Blues are almost entirely absent. His world is earth, fire, and shadow.',
        pigments:[
          {n:'Ivory black',c:'#1A1A1A'},{n:'Raw umber',c:'#7A5230'},{n:'Burnt sienna',c:'#9B5E3A'},
          {n:'Red ochre',c:'#C05A30'},{n:'Yellow ochre',c:'#C89A3A'},{n:'Vermilion',c:'#CC3030'},
          {n:'Lead white',c:'#EDE6D8'},{n:'Van Dyke brown',c:'#6B3A1A'},{n:'Bone black',c:'#282828'},
        ]},
      { name:'Peter Paul Rubens', dates:'c. 1577–1640',
        note:'Rubens worked methodically on white grounds with a warm imprimatura, building form through a thin dead-color layer before rich glazes. His flesh is renowned for layering: a cool gray underlayer reads through warm glazes above, creating the optical effect of blood beneath skin. Cochineal lake provided his most vibrant reds.',
        pigments:[
          {n:'Cochineal lake',c:'#C53030'},{n:'Red ochre',c:'#C05A30'},{n:'Lapis lazuli',c:'#1B3B8C'},
          {n:'Yellow ochre',c:'#C89A3A'},{n:'Van Dyke brown',c:'#6B3A1A'},{n:'Lead white',c:'#EDE6D8'},
          {n:'Bone black',c:'#282828'},
        ]},
      { name:'Diego Velázquez', dates:'c. 1599–1660',
        note:'Velázquez is the painter\'s painter — Manet called him the painter of painters. His technique evolved from tight Sevillian naturalism to the extraordinary atmospheric freedom of his maturity: Las Meninas shows lead white impasto built to near-relief in the most illuminated passages, thinning to translucent glazes in shadow. He worked on a restricted Spanish palette of earth tones with minimal blue — smalt for cool distance, natural ultramarine reserved for the finest costumes. His brushwork dissolves at close range and coheres at distance, the earliest systematic use of optical mixture.',
        pigments:[
          {n:'Lead white',c:'#EDE6D8'},{n:'Ivory black',c:'#1A1A1A'},{n:'Raw umber',c:'#7A5230'},
          {n:'Red ochre',c:'#C05A30'},{n:'Yellow ochre',c:'#C89A3A'},{n:'Vermilion',c:'#CC3030'},
          {n:'Smalt',c:'#4A6CA0'},{n:'Red madder',c:'#BF4040'},{n:'Burnt sienna',c:'#9B5E3A'},
        ]},
      { name:'Rembrandt van Rijn', short:'Rembrandt', dates:'c. 1606–1669',
        note:'Rembrandt\'s palette contracted dramatically in his later years — youthful experiments gave way to earth tones and ivory black. He built focal points in thick creamy lead white impasto while leaving shadows as thin transparent glazes of raw and burnt umber. The fastest-drying pigment, raw umber, structured every underpainting.',
        pigments:[
          {n:'Yellow ochre',c:'#C89A3A'},{n:'Red ochre',c:'#C05A30'},{n:'Raw umber',c:'#7A5230'},
          {n:'Vermilion',c:'#CC3030'},{n:'Lead tin yellow',c:'#D4C025'},{n:'Smalt',c:'#4A6CA0'},
          {n:'Lead white',c:'#EDE6D8'},{n:'Van Dyke brown',c:'#6B3A1A'},
        ]},
    ]
  },
  {
    id:'dutch', label:'Dutch', full:'Dutch Golden Age', period:'c. 1620–1750',
    artists:[
      { name:'Johannes Vermeer', dates:'c. 1632–1675',
        note:'Vermeer used natural ultramarine lavishly — even in flesh tones and shadow passages where others would substitute. His characteristic cool grays are simply ultramarine mixed with lead white in varying proportions. X-ray studies reveal yellow passages underpainted in pure lead white to maximise luminosity, with warm glazes applied over the cured surface.',
        pigments:[
          {n:'Natural ultramarine',c:'#1B3B8C'},{n:'Smalt',c:'#4A6CA0'},{n:'Lead white',c:'#EDE6D8'},
          {n:'Yellow ochre',c:'#C89A3A'},{n:'Vermilion',c:'#CC3030'},{n:'Red madder',c:'#BF4040'},
          {n:'Green earth',c:'#5A7A4A'},{n:'Raw umber',c:'#7A5230'},{n:'Ivory black',c:'#1A1A1A'},
        ]},
      { name:'Rachel Ruysch', dates:'c. 1664–1750',
        note:'Ruysch was the most celebrated flower painter in Europe for decades — court painter to the Elector Palatine, commanding prices that rivalled history painters. She trained under Willem van Aelst and surpassed her teacher, developing compositional freedom and chromatic intensity that would define the genre. Her paintings are distinguished from van Huysum\'s by a deeper, richer ground — blooms sculpted against dark shadow rather than lighter tones — and by a more dramatic diagonal compositional thrust. She remained productive into her eighties, an exceptional career by any measure.',
        pigments:[
          {n:'Lead white',c:'#EDE6D8'},{n:'Smalt',c:'#4A6CA0'},{n:'Red madder',c:'#BF4040'},
          {n:'Carmine',c:'#C53030'},{n:'Vermilion',c:'#CC3030'},{n:'Yellow ochre',c:'#C89A3A'},
          {n:'Lead tin yellow',c:'#D4C025'},{n:'Malachite',c:'#3A7A3A'},{n:'Bone black',c:'#282828'},
        ]},
      { name:'Jan van Huysum', dates:'c. 1682–1749',
        note:'Van Huysum\'s flower pieces commanded the highest prices of any living Dutch painter — he refused to admit visitors to his studio to protect his technique. Each painting was assembled from specimens gathered across multiple seasons; a single canvas might take two years to complete. He worked wet-into-wet in thin layers over a light ground, exploiting the transparency of madder lake and smalt to produce luminous shadow passages in petals. Prussian blue — available only from 1704 — appears in his later canvases as a technical signature invisible to his contemporaries.',
        pigments:[
          {n:'Lead white',c:'#EDE6D8'},{n:'Smalt',c:'#4A6CA0'},{n:'Prussian blue',c:'#1A3560'},
          {n:'Red madder',c:'#BF4040'},{n:'Carmine',c:'#C53030'},{n:'Vermilion',c:'#CC3030'},
          {n:'Yellow ochre',c:'#C89A3A'},{n:'Lead tin yellow',c:'#D4C025'},{n:'Malachite',c:'#3A7A3A'},
          {n:'Bone black',c:'#282828'},
        ]},
    ]
  },
  {
    id:'hudson', label:'Hudson River', full:'Hudson River School', period:'c. 1825–1880',
    artists:[
      { name:'Thomas Cole', dates:'c. 1801–1848',
        note:'Cole founded the Hudson River School as much through criticism and philosophy as through paint. His canvases were programmatic — the wilderness as moral drama, untouched nature as divine text. He worked on warm ochre imprimaturas, building deep shadows in raw and burnt umber before applying sky and atmospheric passages above. Chrome yellow, new to the American market just as his career began, gave him the most concentrated warm highlights in American painting to that date. His greens are invariably constructed over warm earth underpaint — there is no optical coolness in his foliage, only the warmth of conviction.',
        pigments:[
          {n:'Lead white',c:'#EDE6D8'},{n:'Chrome yellow',c:'#D4A827'},{n:'Yellow ochre',c:'#C89A3A'},
          {n:'Raw sienna',c:'#C4873A'},{n:'Raw umber',c:'#7A5230'},{n:'Burnt sienna',c:'#9B5E3A'},
          {n:'Prussian blue',c:'#1A3560'},{n:'Vermilion',c:'#CC3030'},{n:'Ivory black',c:'#1A1A1A'},
        ]},
      { name:'Asher B. Durand', dates:'c. 1796–1886',
        note:'Durand came to landscape from engraving, and the approach to foliage retained a precision native to printmaking — individual leaves, bark textures, and mossy surfaces built in thin, careful glazes over a light ground. He advised a generation in Letters on Landscape Painting (1855): sit before nature, study what is before you, make no concession to convenience. The palette is more restrained than Cole — less theatrical contrast, more patient accumulation of specific observation. Prussian blue thinned to near-transparency creates the characteristic aerial distance; warm raw sienna glazes over lead white give sunlit foliage passages their distinctive warmth.',
        pigments:[
          {n:'Lead white',c:'#EDE6D8'},{n:'Prussian blue',c:'#1A3560'},{n:'Chrome yellow',c:'#D4A827'},
          {n:'Yellow ochre',c:'#C89A3A'},{n:'Raw sienna',c:'#C4873A'},{n:'Burnt sienna',c:'#9B5E3A'},
          {n:'Raw umber',c:'#7A5230'},{n:'Vermilion',c:'#CC3030'},{n:'Ivory black',c:'#1A1A1A'},
        ]},
      { name:'Frederic Church', dates:'c. 1826–1900',
        note:'Church studied directly under Cole and became the most ambitious painter the school produced. His panoramic canvases — Niagara, Heart of the Andes, Cotopaxi — required colour to do work no previous American painter had attempted: the exact chromatic identity of tropical light, volcanic sky, Arctic atmosphere. He worked from meticulous oil field studies annotated with colour notes, then translated them to studio canvases of extraordinary scale. The sunset skies he painted in the months after the 1883 Krakatoa eruption are among the most extraordinary atmospheric records in Western painting — the sky itself made strange, documented with scientific fidelity.',
        pigments:[
          {n:'Lead white',c:'#EDE6D8'},{n:'Cobalt blue',c:'#3A75C4'},{n:'Prussian blue',c:'#1A3560'},
          {n:'Chrome yellow',c:'#D4A827'},{n:'Cadmium yellow',c:'#E8C830'},{n:'Vermilion',c:'#CC3030'},
          {n:'Raw sienna',c:'#C4873A'},{n:'Burnt sienna',c:'#9B5E3A'},{n:'Ivory black',c:'#1A1A1A'},
        ]},
      { name:'Albert Bierstadt', dates:'c. 1830–1902',
        note:'Bierstadt brought Düsseldorf academic training to American subject matter at heroic scale. His Rocky Mountain and Sierra Nevada paintings arrived in Eastern cities like matter like despatches from another world — the light so unlike anything the audience knew that many refused to believe it accurate. He worked from field sketches made during Western Survey expeditions, synthesising them in his New York studio into canvases measuring up to fifteen feet. The characteristic effect — golden light raking across snow-capped peaks above deeply shadowed valley floors — demanded precise chromatic temperature control: warm chrome yellows in light, cool cobalt blues in shadow, the contrast pushed to the edge of credibility.',
        pigments:[
          {n:'Lead white',c:'#EDE6D8'},{n:'Cobalt blue',c:'#3A75C4'},{n:'Chrome yellow',c:'#D4A827'},
          {n:'Cadmium yellow',c:'#E8C830'},{n:'Raw sienna',c:'#C4873A'},{n:'Burnt sienna',c:'#9B5E3A'},
          {n:'Yellow ochre',c:'#C89A3A'},{n:'Vermilion',c:'#CC3030'},{n:'Ivory black',c:'#1A1A1A'},
        ]},
    ]
  },
  {
    id:'academic', label:'Academic', full:'Academic Realism', period:'c. 1850–1905',
    artists:[
      { name:'William-Adolphe Bouguereau', dates:'c. 1825–1905',
        note:'Bouguereau\'s flesh was constructed over a cool gray grisaille underpainting — the French academic method — then glazed in warm tones of yellow ochre, vermilion, and rose madder. His surfaces appear brushwork-free, achieved by blending obsessively into wet paint. Blues always serve as a foil to flesh; they never compete.',
        pigments:[
          {n:'Lead white',c:'#EDE6D8'},{n:'Naples yellow',c:'#E0C870'},{n:'Yellow ochre',c:'#C89A3A'},
          {n:'Viridian',c:'#2E7D5A'},{n:'Cobalt blue',c:'#3A75C4'},{n:'Vermilion',c:'#CC3030'},
          {n:'Rose madder',c:'#C03060'},{n:'Burnt sienna',c:'#9B5E3A'},{n:'Ivory black',c:'#1A1A1A'},
        ]},
      { name:'Jean-Léon Gérôme', dates:'c. 1824–1904',
        note:'Gérôme was the archetypal Second Empire academic painter — technically immaculate, narratively theatrical, phenomenally productive. He worked on smooth, lightly primed canvas, building surfaces through layered glazes over a dead-colour foundation that erased all visible brushwork. His Orientalist subjects demanded documentary accuracy in architectural detail, costume, and light; he made multiple research expeditions to Egypt, Syria, and Turkey, sketching and photographing on site. The flesh in his paintings follows the same layered grisaille method as Bouguereau but with a harder, more enamel-like finish. Shadows are notably cool, the temperature shift from light to shadow more pronounced than in most contemporaries.',
        pigments:[
          {n:'Lead white',c:'#EDE6D8'},{n:'Naples yellow',c:'#E0C870'},{n:'Yellow ochre',c:'#C89A3A'},
          {n:'Vermilion',c:'#CC3030'},{n:'Rose madder',c:'#C03060'},{n:'Cobalt blue',c:'#3A75C4'},
          {n:'Burnt sienna',c:'#9B5E3A'},{n:'Raw umber',c:'#7A5230'},{n:'Ivory black',c:'#1A1A1A'},
        ]},
      { name:'Lawrence Alma-Tadema', dates:'c. 1836–1912',
        note:'Alma-Tadema made a speciality of ancient Roman and Greek domestic life rendered with Victorian archaeological precision and the surface control of a Flemish master. His marble is the most convincing in the history of painting — he understood that marble is translucent, that light penetrates and scatters within the stone before returning, exactly as in flesh. He maintained a reference library of hundreds of photographs of ancient artefacts and made multiple visits to excavation sites. His whites are among the most optically complex in academic painting: zinc white mixed with small quantities of cobalt and rose madder to capture the specific temperature of sunlit Mediterranean marble at midday.',
        pigments:[
          {n:'Lead white',c:'#EDE6D8'},{n:'Zinc white',c:'#F0F0E8'},{n:'Cobalt blue',c:'#3A75C4'},
          {n:'Cadmium yellow',c:'#E8C830'},{n:'Vermilion',c:'#CC3030'},{n:'Rose madder',c:'#C05A7A'},
          {n:'Viridian',c:'#2E7D5A'},{n:'Burnt sienna',c:'#9B5E3A'},{n:'Ivory black',c:'#1A1A1A'},
        ]},
    ]
  },
  {
    id:'impressionist', label:'Impressionist', full:'Impressionism', period:'c. 1860–1900',
    artists:[
      { name:'Claude Monet', dates:'c. 1840–1926',
        note:'Monet banned black from his palette and worked on white grounds, building colour optically through adjacent strokes. He systematically exploited new synthetic pigments — cobalt blue, viridian, chrome yellow — for cleaner hues than earth colours could offer. His late water-lily series became almost entirely cool, cobalt violet competing with cerulean for atmospheric dominance.',
        pigments:[
          {n:'Cobalt blue',c:'#3A75C4'},{n:'Viridian',c:'#2E7D5A'},{n:'Chrome yellow',c:'#D4A827'},
          {n:'Zinc white',c:'#F0F0E8'},{n:'Fr. ultramarine',c:'#3060A0'},{n:'Cobalt violet',c:'#7060B0'},
          {n:'Red ochre',c:'#C05A30'},
        ]},
      { name:'Pierre-Auguste Renoir', dates:'c. 1841–1919',
        note:'Renoir briefly abandoned Impressionism in the 1880s to study old masters in Italy, emerging with a warmer palette. His signature pinks are vermilion mixed with lead white; his shadows, transparent madder lake over cobalt blue. He distrusted black almost entirely, seeking deep value through colour saturation rather than neutral darks.',
        pigments:[
          {n:'Chrome orange',c:'#D4601A'},{n:'Vermilion',c:'#CC3030'},{n:'Crimson lake',c:'#BF4040'},
          {n:'Cobalt blue',c:'#3A75C4'},{n:'Lead white',c:'#EDE6D8'},{n:'Yellow ochre',c:'#C89A3A'},
          {n:'Viridian',c:'#2E7D5A'},
        ]},
      { name:'Édouard Manet', dates:'c. 1832–1883',
        note:'Manet eliminated the transitional half-tones academics used to model form, placing light against dark in abrupt value jumps. His darks were ivory black — not glazed umber — his lights lead white barely mixed. Critics called it crude; painters recognised it as radical. He was among the first to paint consistently on white grounds.',
        pigments:[
          {n:'Cobalt blue',c:'#3A75C4'},{n:'Cerulean',c:'#4A90C0'},{n:'Chrome yellow',c:'#D4A827'},
          {n:'Natural madder',c:'#BF4040'},{n:'Emerald green',c:'#2A6A2A'},{n:'Lead white',c:'#EDE6D8'},
          {n:'Ivory black',c:'#1A1A1A'},
        ]},
      { name:'Edgar Degas', dates:'c. 1834–1917',
        note:'Degas resisted the Impressionist label throughout his career, calling himself a Realist — the distinction mattered because he worked largely in the studio from memory and drawing rather than in front of the motif. What he shared with the Impressionists was the rejection of historical subject matter: the ballet, the racetrack, the café, the laundry, the bath. His draughtsmanship was perhaps the finest of his generation, and drawing always structured his colour decisions. In later decades, failing eyesight pushed him increasingly toward pastel, where the powdery medium allowed colour to be built in hatched layers of pure pigment — a technique that parallels Pointillist optical mixture but with a physical intimacy no oil painting can match.',
        pigments:[
          {n:'Lead white',c:'#EDE6D8'},{n:'Yellow ochre',c:'#C89A3A'},{n:'Vermilion',c:'#CC3030'},
          {n:'Cobalt blue',c:'#3A75C4'},{n:'Fr. ultramarine',c:'#3060A0'},{n:'Viridian',c:'#2E7D5A'},
          {n:'Burnt sienna',c:'#9B5E3A'},{n:'Alizarin',c:'#A02840'},{n:'Ivory black',c:'#1A1A1A'},
        ]},
    ]
  },
  {
    id:'postimpr', label:'Post-Impr.', full:'Post-Impressionism', period:'c. 1880–1920',
    artists:[
      { name:'John Singer Sargent', dates:'c. 1856–1925',
        note:'Sargent painted at extraordinary speed — his bravura brushwork required committing instantly with minimal mixing. He kept a large palette of high-quality pigments and relied on direct juxtaposition. His whites were always the highest value on the canvas; he never scumbled or glazed. The mark is the final statement.',
        pigments:[
          {n:'Lead white',c:'#EDE6D8'},{n:'Cadmium yellow',c:'#E8C830'},{n:'Vermilion',c:'#CC3030'},
          {n:'Fr. ultramarine',c:'#3060A0'},{n:'Cobalt blue',c:'#3A75C4'},{n:'Viridian',c:'#2E7D5A'},
          {n:'Ivory black',c:'#1A1A1A'},{n:'Van Dyke brown',c:'#6B3A1A'},{n:'Cobalt violet',c:'#7060B0'},
        ]},
      { name:'Anders Zorn', dates:'c. 1860–1920',
        note:'Zorn worked with a famously restricted four-pigment palette — lead white, yellow ochre, vermilion, and ivory black — demonstrating that every necessary colour can be derived from these fundamentals alone. Mixed together they yield warm and cool greys, olive greens, warm ochres, and the full range of flesh from cool shadow to incandescent highlight. His brushwork was applied in single decisive strokes, never reworked; particularly effective in capturing the shimmer of water and sunlit skin. The Zorn palette has become a pedagogical method in its own right, still taught in ateliers today.',
        pigments:[
          {n:'Lead white',c:'#EDE6D8'},{n:'Yellow ochre',c:'#C89A3A'},{n:'Vermilion',c:'#CC3030'},
          {n:'Ivory black',c:'#1A1A1A'},
        ]},
      { name:'Joaquín Sorolla', dates:'c. 1863–1923',
        note:'Sorolla\'s Mediterranean light demanded pure, high-key colours applied with confidence. Working outdoors in full sun, his shadows are never neutral — they are intense cobalt violet and French ultramarine, making the sunlit whites appear incandescent by contrast. Earth colours disappear entirely from his sunlit passages.',
        pigments:[
          {n:'Lead white',c:'#EDE6D8'},{n:'Cobalt blue',c:'#3A75C4'},{n:'Fr. ultramarine',c:'#3060A0'},
          {n:'Cadmium yellow',c:'#E8C830'},{n:'Vermilion',c:'#CC3030'},{n:'Cobalt violet',c:'#7060B0'},
          {n:'Rose madder',c:'#C05A7A'},{n:'Viridian',c:'#2E7D5A'},{n:'Cadmium orange',c:'#D4601A'},
        ]},
      { name:'Santiago Rusiñol', dates:'c. 1861–1931',
        note:'Rusiñol is the defining painter of Catalan Modernisme — poet, playwright, and collector who treated the garden as a philosophical subject. His paintings from Aranjuez, Granada, and Sitges use a cool, Symbolist-inflected palette: viridian and cobalt in the greens, French ultramarine for deep shadow passages, pale zinc white for filtered Mediterranean light. Unlike Sorolla\'s exuberance, his gardens are contemplative — still air, silence made visible through restrained colour. He was among the first Spanish painters to absorb Symbolist ideas directly from his years in Montmartre.',
        pigments:[
          {n:'Zinc white',c:'#F0F0E8'},{n:'Viridian',c:'#2E7D5A'},{n:'Cobalt blue',c:'#3A75C4'},
          {n:'Fr. ultramarine',c:'#3060A0'},{n:'Yellow ochre',c:'#C89A3A'},{n:'Cadmium yellow',c:'#E8C830'},
          {n:'Rose madder',c:'#C05A7A'},{n:'Raw umber',c:'#7A5230'},{n:'Ivory black',c:'#1A1A1A'},
        ]},
      { name:'Édouard Vuillard', dates:'c. 1868–1940',
        note:'Vuillard\'s Nabis palette was systematically anti-naturalistic — colours chosen for decorative and emotional resonance rather than descriptive accuracy. His interiors flatten into tapestry-like patterns of Prussian blue, cobalt violet, and alizarin. He sometimes worked in distemper, achieving a chalky matte surface impossible to replicate in oil.',
        pigments:[
          {n:'Zinc white',c:'#F0F0E8'},{n:'Prussian blue',c:'#1A3560'},{n:'Fr. ultramarine',c:'#3060A0'},
          {n:'Cobalt violet',c:'#7060B0'},{n:'Cadmium yellow',c:'#E8C830'},{n:'Yellow ochre',c:'#C89A3A'},
          {n:'Viridian',c:'#2E7D5A'},{n:'Alizarin',c:'#A02840'},{n:'Bone black',c:'#282828'},
        ]},
      { name:'Pierre Bonnard', dates:'c. 1867–1947',
        note:'Bonnard worked from memory and pencil notations rather than life, freeing colour from descriptive obligation. His late interiors use cadmium orange against cobalt violet, cadmium red against viridian — near-complementary pairings at full saturation. He reportedly kept finished canvases for years, revisiting them to add dabs of colour.',
        pigments:[
          {n:'Zinc white',c:'#F0F0E8'},{n:'Cadmium yellow',c:'#E8C830'},{n:'Cadmium orange',c:'#D4601A'},
          {n:'Cadmium red',c:'#CC2200'},{n:'Cobalt violet',c:'#7060B0'},{n:'Fr. ultramarine',c:'#3060A0'},
          {n:'Viridian',c:'#2E7D5A'},{n:'Yellow ochre',c:'#C89A3A'},{n:'Ivory black',c:'#1A1A1A'},
        ]},
    ]
  },
  {
    id:'modernist', label:'Modernist', full:'Early Modernism', period:'c. 1890–1920',
    artists:[
      { name:'Gustav Klimt', dates:'c. 1862–1918',
        note:'Klimt\'s fusion of fine art and applied ornament required pigments that could coexist with physical gold and silver leaf. His paint film is often surprisingly thin — the gold does the visual work, oil paint provides figurative anchors. The defining quality of a Klimt palette is the orchestration of metallic and chromatic colour in tension.',
        pigments:[
          {n:'Gold leaf',c:'#D4AF37'},{n:'Silver leaf',c:'#C0C0C0'},{n:'Lead white',c:'#EDE6D8'},
          {n:'Cobalt blue',c:'#3A75C4'},{n:'Cadmium yellow',c:'#E8C830'},{n:'Vermilion',c:'#CC3030'},
          {n:'Viridian',c:'#2E7D5A'},{n:'Alizarin',c:'#A02840'},{n:'Ivory black',c:'#1A1A1A'},
        ]},
      { name:'Fernand Khnopff', dates:'c. 1858–1921',
        note:'Khnopff was the quintessential Belgian Symbolist — obsessively private, technically meticulous, working within a narrow emotional register of stillness and controlled remoteness. He worked in oil and pastel, sometimes combined, producing surfaces of cool porcelain finish. His characteristic palette — zinc white, Prussian blue, muted blue-greens, faded rose — creates the frozen, timeless quality his figures inhabit. He used photography extensively as a compositional tool, the objective distance of the camera transferred to the canvas. A close reader of Maeterlinck; his Brussels studio was designed as a total artwork. He met Klimt in 1898 and maintained a regular correspondence; his influence on the Vienna Secession visual program was direct.',
        pigments:[
          {n:'Zinc white',c:'#F0F0E8'},{n:'Prussian blue',c:'#1A3560'},{n:'Cobalt blue',c:'#3A75C4'},
          {n:'Viridian',c:'#2E7D5A'},{n:'Rose madder',c:'#C05A7A'},{n:'Yellow ochre',c:'#C89A3A'},
          {n:'Burnt sienna',c:'#9B5E3A'},{n:'Raw umber',c:'#7A5230'},{n:'Ivory black',c:'#1A1A1A'},
        ]},
    ]
  },
];

/* ── per-pigment historical notes ── */
const MNOTES = {
  'Lead white':        { period:'Ancient – 19th c.',    origin:'Corroded lead sheets',        note:'The foundational warm-toned white for six centuries of European painting. Its unique opacity, body, and slow-drying quality shaped how every old master built paint structure. Toxic, yet irreplaceable — its warm cream tone still cannot be matched by titanium white.' },
  'Lapis lazuli':      { period:'13th – 18th c.',        origin:'Semi-precious stone, Afghanistan', note:'Ground from the gemstone, it cost more than gold. Painters reserved it for the Virgin\'s robe and the highest skies. Its warm violet undertone distinguishes it from synthetic ultramarine; individual stone particles scatter light in a way no ground pigment replicates.' },
  'Red madder':        { period:'Ancient – present',     origin:'Root of Rubia tinctorum',     note:'A transparent lake from the dried madder root, used almost exclusively in glazes. Layered over opaque underpaint, it creates depths of crimson impossible in a single application — the cornerstone of Venetian red drapery.' },
  'Red ochre':         { period:'Prehistoric – present', origin:'Iron oxide mineral',           note:'The oldest pigment used by humans. Warm, opaque, absolutely lightfast. Mixed with lead white it yields the classic Venetian flesh mid-tone; in shadow passages it provides the warm undertone that distinguishes southern-school darks from northern ones.' },
  'Orpiment':          { period:'Ancient – 18th c.',     origin:'Arsenic trisulfide mineral',   note:'A brilliant arsenic-based yellow from antiquity. Highly toxic and incompatible with lead white and copper pigments — turns black on contact. Painters handled it carefully but prized its pure yellow tone, unmatched until cadmium arrived in the 19th century.' },
  'Realgar':           { period:'Ancient – 17th c.',     origin:'Arsenic monosulfide mineral',  note:'A warm orange-red arsenic mineral used alongside orpiment. Like its sister pigment, unstable in light and incompatible with many others. The Venetians used it for the fiery oranges in drapery and landscape that give their work such warmth.' },
  'Burnt sienna':      { period:'Ancient – present',     origin:'Roasted raw sienna, iron oxide', note:'Raw sienna calcined to a deeper, more transparent warm brown. Its transparency makes it ideal for glazing the shadow side of flesh — Titian applied it in thin veils over darker underpaint to create the impression of warmth glowing from within.' },
  'Raw sienna':        { period:'Ancient – present',     origin:'Hydrated iron oxide clay',      note:'A warm, transparent golden-brown iron oxide — the unroasted counterpart to burnt sienna. Valued by the Hudson River School painters for its glazing transparency: thin applications over white create luminous warm passages in foliage and atmospheric distance that opaque yellow ochre cannot achieve. Prussian blue added for aerial recession reads cooler and more convincing laid over a raw sienna undertone than over bare white ground.' },
  'Malachite':         { period:'Ancient – 17th c.',     origin:'Basic copper carbonate',       note:'A vibrant emerald green ground from the copper mineral. Coarse grinding yields deep green; fine grinding yields pale turquoise. Replaced by verdigris, then viridian — its warm, slightly gritty texture is distinctive in early Venetian panel paintings.' },
  'Bone black':        { period:'Ancient – present',     origin:'Calcined animal bones',        note:'Produced by burning animal bones in a closed container. Slightly brownish-black with limited tinting strength but excellent permanence. Used in shadow passages and to modify other colours — never the only black, always a collaborator.' },
  'Carmine':           { period:'16th c. – present',     origin:'Cochineal insect extract',     note:'A brilliant crimson lake. When cochineal arrived from the New World it replaced older kermes-based carmine and offered deeper, purer reds. Used almost exclusively in glazes; on its own, one of the most luminous reds ever available to painters.' },
  'Venetian red':      { period:'16th c. – present',     origin:'Iron oxide, calcined vitriol', note:'A warm brownish-red iron oxide distinct from modern formulations. Tintoretto used it as the dominant warm note in both flesh passages and drapery, building a low-saturation warmth that reads as richly colourful in raking light.' },
  'Azurite':           { period:'13th – 17th c.',        origin:'Basic copper carbonate',       note:'The blue of northern Europe before affordable ultramarine. Cool, slightly greenish, and opaque. Azurite often darkens to muddy green over time as the copper oxidises — many "gray" skies in old northern paintings were once brilliant azurite blue.' },
  'Yellow ochre':      { period:'Prehistoric – present', origin:'Hydrated iron oxide clay',     note:'The most universally used pigment in the history of painting — from cave walls to academic ateliers. Warm, opaque, and absolutely lightfast. Mixed with white it yields the classic warm flesh mid-tone used by every school from Venice to Paris.' },
  'Ivory black':       { period:'Ancient – present',     origin:'Calcined ivory or bone',       note:'The most refined black in the traditional palette. Deep, slightly bluish, with strong tinting power. Caravaggio used it structurally — not as a shadow modifier but as the foundation of the entire dark half of his value scale.' },
  'Raw umber':         { period:'Ancient – present',     origin:'Hydrated iron/manganese oxide', note:'A cool dark brown earth used for underpainting and shadow glazes. Its manganese content makes it the fastest-drying pigment on the traditional palette — Rembrandt and others relied on it to build workable surfaces with remarkable speed.' },
  'Vermilion':         { period:'Ancient – 19th c.',     origin:'Mercuric sulfide',             note:'The standard red for six centuries. Made from ground cinnabar or synthesised from mercury and sulfur. Brilliant and opaque but potentially unstable — it can darken to near-black. Cadmium red largely replaced it after the 1850s.' },
  'Lead tin yellow':   { period:'14th – 18th c.',        origin:'Lead-tin oxide compound',      note:'A warm opaque yellow of extraordinary brightness. Its recipe was lost after the 18th century and only rediscovered through 20th-century technical analysis of paintings. Rembrandt used it for the most brilliantly illuminated passages of fabric and face.' },
  'Smalt':             { period:'15th – 18th c.',        origin:'Ground cobalt glass',          note:'Made from cobalt-rich potassium glass ground to a blue pigment. It loses colour over time as the binding oil polymerises around the glass particles — many smalt passages are now nearly colourless. Under UV restoration light, the original blue is still visible.' },
  'Van Dyke brown':    { period:'17th c. – present',     origin:'Peat and organic matter',      note:'A rich, transparent brown of complex organic composition. Extremely slow-drying and prone to cracking — Turner avoided it; Rembrandt used it fearlessly. Its warm depth in glazes is nearly impossible to replicate with modern transparent brown pigments.' },
  'Natural ultramarine':{ period:'13th – 19th c.',       origin:'Lapis lazuli stone',           note:'Ground from the gemstone. Vermeer used it in extraordinary quantities — even in flesh tones where others would have substituted. The blue-gray of his domestic interiors is simply ultramarine mixed with lead white in varying proportions.' },
  'Green earth':       { period:'Ancient – present',     origin:'Celadonite clay mineral',      note:'A cool transparent khaki-green used as a flesh underpainting in the Italian tradition. Visible where upper layers are thin, it creates the characteristic greenish half-tone in early Italian panel paintings that distinguishes southern from northern flesh.' },
  'Naples yellow':     { period:'16th – 19th c.',        origin:'Lead antimonate',              note:'A warm opaque lead-based yellow with the body and temperature ideal for flesh highlights in academic painting. Bouguereau used it for the highest lights on cheekbones and foreheads. Modern Naples yellow is a mixture formulation with different handling qualities.' },
  'Viridian':          { period:'1838 – present',        origin:'Hydrated chromium oxide',      note:'Synthesised in the 1830s, viridian offered what no previous green could: a cool, transparent, bright green fully stable and compatible with all other pigments. The Impressionists seized on it for cool shadow passages and atmospheric greens.' },
  'Cobalt blue':       { period:'1802 – present',        origin:'Cobalt aluminate',             note:'The first major synthetic pigment. Clean, mid-range blue with a slightly violet cast — neither as warm as ultramarine nor as cold as Prussian blue. Remains among the most permanent and stable blues available; the Impressionists used it for skies and clean mixing.' },
  'Rose madder':       { period:'Ancient – present',     origin:'Madder root lake',             note:'More delicate and pink-toned than red madder, used for cooler reds and pinks in flesh. Its transparency makes it ideal for glazing over lead or zinc white to create luminous pink passages in academic flesh — particularly in lights and reflected lights.' },
  'Chrome yellow':     { period:'1809 – late 19th c.',   origin:'Lead chromate',                note:'The first bright yellow of the modern era. Brilliant but prone to darkening to a greenish-brown — van Gogh\'s sunflowers are thought to have shifted from a warmer original tone. Replaced by cadmium yellow as permanence standards tightened.' },
  'Zinc white':        { period:'1834 – present',        origin:'Zinc oxide',                   note:'A cooler, more transparent white than lead white. The Impressionists favoured it for adding white without losing colour temperature. However, it is brittle and prone to cracking in thick applications — a practical limitation that defined how they applied it.' },
  'Fr. ultramarine':   { period:'1826 – present',        origin:'Synthetic lapis lazuli',       note:'Synthesised in 1826, French ultramarine made the richest blue in painting history affordable. Slightly warmer than cobalt blue with a reddish undertone. Every painter from Delacroix onward used it freely where previously they would have rationed it carefully.' },
  'Cobalt violet':     { period:'1859 – present',        origin:'Cobalt phosphate',             note:'The only clean, permanent violet available to the Impressionists. Early formulations contained arsenic. Used to push the blue-violet temperature of shadows in contrast with warm orange-yellow complementary lights — a defining move in Sorolla\'s sunlit palette.' },
  'Chrome orange':     { period:'1809 – late 19th c.',   origin:'Basic lead chromate',          note:'A warm orange-red chromate pigment offering some of the most brilliant warm options available before cadmium. Prone to the same darkening as chrome yellow. Renoir used it alongside vermilion for the deepest saturated oranges in sunlit flesh.' },
  'Crimson lake':      { period:'16th – 19th c.',        origin:'Cochineal extract',            note:'A warm transparent lake from cochineal. Beautifully luminous in glazes but of limited permanence — most crimson lake passages in 18th-century paintings have faded to a near-transparent ghost of their original saturated crimson.' },
  'Cerulean':          { period:'1860 – present',        origin:'Cobalt stannate',              note:'A sky-blue with a distinctly greenish, slightly dusty cast — unlike cobalt or ultramarine. Introduced commercially in the 1860s, it gave painters a new option for clear atmospheric blues and remains a distinctive presence in 19th-century sky painting.' },
  'Natural madder':    { period:'Ancient – 19th c.',     origin:'Madder root',                  note:'The mordant-dyed colorant used as a pigment lake. More orange-warm than later alizarin. Manet and Delacroix used it alongside vermilion for warm glazed passages in drapery — a subtle warmth in the reds that distinguishes their flesh from colder painters.' },
  'Emerald green':     { period:'1814 – 20th c.',        origin:'Copper acetoarsenite',         note:'Intensely brilliant and slightly blue-green. Highly toxic — suspected in 19th-century poisonings. Its incompatibility with many pigments limited use, but its pure green intensity was unmatched for certain passages before viridian became universal.' },
  'Cadmium yellow':    { period:'1846 – present',        origin:'Cadmium sulfide',              note:'One of the most important 19th-century introductions — warm, opaque, and fully permanent. Available in lemon, medium, and deep varieties. Replaced chrome yellow as permanence standards tightened; the Impressionists used it for the most luminous sunlit yellows.' },
  'Prussian blue':     { period:'1704 – present',        origin:'Iron hexacyanoferrate',        note:'The first synthetic pigment, accidentally discovered in Berlin in 1704. Deep, slightly greenish blue with extraordinary tinting strength — a little goes a very long way. Vuillard used it for the deepest architectural shadows in his Nabis interiors.' },
  'Alizarin':          { period:'1868 – present',        origin:'Synthetic anthracene derivative', note:'The first synthetic organic pigment, producing the same colorant as madder lake in pure form. Transparent, brilliant crimson with a cold blue undertone. A fundamental transparent red in the studio palette, though lightfastness in thin washes is limited.' },
  'Gold leaf':         { period:'Ancient – present',     origin:'Beaten gold metal',            note:'Not a pigment but fundamental to Klimt\'s program. Applied over a mordant, burnished, then painted over. The contrast between warm gold and cooler oil colours gives his work its characteristic shimmering tension between decoration and figuration.' },
  'Silver leaf':       { period:'Ancient – present',     origin:'Beaten silver metal',          note:'Provides a cooler metallic note than gold. In Klimt\'s work it suggests moonlight or water surfaces. Unlike gold, silver tarnishes — many silver-leaf passages in his paintings have oxidised to a grayish-brown over the past century.' },
  'Cadmium red':       { period:'1910 – present',        origin:'Cadmium sulfoselenide',        note:'Available commercially from around 1910, cadmium red gave the Fauves a warm fully opaque red of extraordinary permanence. Its opacity differs from vermilion — it holds intensity in mixtures where vermilion tends to deaden and grey.' },
  'Madder lake':       { period:'Ancient – 19th c.',     origin:'Madder root lake',             note:'A warm transparent crimson — the predecessor of alizarin. Matisse used it for the deepest, most transparent red passages, glazing it over opaque underpaint to achieve a luminous depth impossible in a single opaque application.' },
  'Cadmium orange':    { period:'1875 – present',        origin:'Cadmium sulfoselenide',        note:'A clean, fully opaque orange with extraordinary permanence — unlike the chrome oranges it replaced, it does not darken. Bonnard and Sorolla used it at full intensity, contrasting it against cobalt violet to create the most energetic passages of early 20th-century painting.' },
  'Cochineal lake':    { period:'16th c. – present',     origin:'Cochineal insect extract',     note:'Introduced from the New World in the 16th century, quickly replacing older carmine sources. Rubens used it for his most vibrant reds — in the glazed shadows of drapery, its transparency creates a depth that opaque vermilion alone could never achieve.' },
};

/* ── public-domain artwork references (Wikimedia Commons Special:FilePath) ── */
const MARTWORKS = {
  'Tiziano Vecelli (Titian)':     { url:'https://commons.wikimedia.org/wiki/Special:FilePath/Titian_Venus_of_Urbino.jpg',                                          title:'Venus of Urbino',                 year:'1538',      museum:'Uffizi Gallery, Florence' },
  'Paolo Veronese':   { url:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Leda_et_le_cygne_par_Paolo_Veronese_1.jpg/960px-Leda_et_le_cygne_par_Paolo_Veronese_1.jpg', title:'Leda and the Swan', year:'c. 1585', museum:'Musée des Beaux-Arts, Rouen', crop:'center 40%' },
  'Caravaggio': { url:'https://commons.wikimedia.org/wiki/Special:FilePath/Caravaggio%27s_The_Calling_of_St_Matthew.jpg',                            title:'The Calling of Saint Matthew',    year:'1599–1600', museum:'San Luigi dei Francesi, Rome' },
  'Peter Paul Rubens':     { url:'https://commons.wikimedia.org/wiki/Special:FilePath/Peter_Paul_Rubens_-_Venus,_Amor,_Bacchus_and_Ceres.jpg', title:'Venus, Amor, Bacchus and Ceres', year:'c. 1612–13', museum:'Städel Museum, Frankfurt' },
  'Rembrandt van Rijn':  { url:'https://commons.wikimedia.org/wiki/Special:FilePath/Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg',           title:'Self-Portrait',                   year:'1659',      museum:'National Gallery of Art, Washington' },
  'Johannes Vermeer':    { url:'https://commons.wikimedia.org/wiki/Special:FilePath/1665_Girl_with_a_Pearl_Earring.jpg',                                    title:'Girl with a Pearl Earring',       year:'1665',      museum:'Mauritshuis, The Hague' },
  'William-Adolphe Bouguereau': { url:'https://commons.wikimedia.org/wiki/Special:FilePath/William-Adolphe_Bouguereau_(1825-1905)_-_The_Birth_of_Venus_(1879).jpg', title:'The Birth of Venus',              year:'1879',      museum:'Musée d\'Orsay, Paris', crop:'center 28%' },
  'Claude Monet':      { url:'https://commons.wikimedia.org/wiki/Special:FilePath/Claude_Monet,_Impression,_soleil_levant.jpg',                          title:'Impression, Sunrise',             year:'1872',      museum:'Musée Marmottan Monet, Paris' },
  'Pierre-Auguste Renoir':     { url:'https://commons.wikimedia.org/wiki/Special:FilePath/Pierre-Auguste_Renoir,_Le_Moulin_de_la_Galette.jpg',                   title:'Bal du Moulin de la Galette',     year:'1876',      museum:'Musée d\'Orsay, Paris' },
  'Édouard Manet':      { url:'https://commons.wikimedia.org/wiki/Special:FilePath/Edouard_Manet_-_Olympia_-_Google_Art_Project_3.jpg',                   title:'Olympia',                         year:'1863',      museum:'Musée d\'Orsay, Paris' },
  'John Singer Sargent':    { url:'https://commons.wikimedia.org/wiki/Special:FilePath/John_Singer_Sargent_-_Carnation,_Lily,_Lily,_Rose_-_Google_Art_Project.jpg', title:'Carnation, Lily, Lily, Rose', year:'1885–86',  museum:'Tate Britain, London' },
  'Joaquín Sorolla':    { url:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Joaqu%C3%ADn_Sorolla_y_Bastida_-_Strolling_along_the_Seashore_-_Google_Art_Project.jpg/960px-Joaqu%C3%ADn_Sorolla_y_Bastida_-_Strolling_along_the_Seashore_-_Google_Art_Project.jpg', title:'Strolling along the Seashore', year:'1909', museum:'Museo Sorolla, Madrid', crop:'center 8%' },
  'Édouard Vuillard':   { url:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Edouard_Vuillard_-_Interior_-_Belgrade.jpg/960px-Edouard_Vuillard_-_Interior_-_Belgrade.jpg', title:'Interior', year:'c. 1899', museum:'National Museum of Serbia, Belgrade' },
  'Pierre Bonnard':    { url:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/The_dining_room_in_the_country_by_Pierre_Bonnard_%281913%29.jpg/960px-The_dining_room_in_the_country_by_Pierre_Bonnard_%281913%29.jpg', title:'The Dining Room in the Country', year:'1913', museum:'Minneapolis Institute of Art' },
  'Giorgione':             { url:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Giorgione_-_Young_Woman_%28%E2%80%9CLaura%E2%80%9D%29_-_Google_Art_Project.jpg/960px-Giorgione_-_Young_Woman_%28%E2%80%9CLaura%E2%80%9D%29_-_Google_Art_Project.jpg', title:'Laura', year:'1506', museum:'Kunsthistorisches Museum, Vienna' },
  'Giovanni Bellini':       { url:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Giovanni_Bellini_-_Saint_Francis_in_the_Desert_-_Google_Art_Project.jpg/960px-Giovanni_Bellini_-_Saint_Francis_in_the_Desert_-_Google_Art_Project.jpg', title:'Saint Francis in the Desert', year:'c. 1480', museum:'Frick Collection, New York' },
  'Santiago Rusiñol':      { url:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Santiago_Rusi%C3%B1ol_-_Garden_of_Montmartre_-_Google_Art_Project.jpg/960px-Santiago_Rusi%C3%B1ol_-_Garden_of_Montmartre_-_Google_Art_Project.jpg', title:'Garden of Montmartre', year:'c. 1899', museum:'Museu Nacional d\'Art de Catalunya' },
  'Anders Zorn':           { url:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Anders_Zorn_Omnibus.jpg/960px-Anders_Zorn_Omnibus.jpg', title:'Omnibus', year:'1892', museum:'Isabella Stewart Gardner Museum, Boston' },
  'Diego Velázquez':       { url:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg/960px-Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg', title:'Las Meninas', year:'1656', museum:'Museo del Prado, Madrid', crop:'center 72%' },
  'Georges de La Tour':      { url:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/The_Penitent_Magdalen_MET_DT7252.jpg/960px-The_Penitent_Magdalen_MET_DT7252.jpg', title:'The Penitent Magdalene', year:'c. 1640', museum:'Metropolitan Museum of Art' },
  'Jan van Eyck':             { url:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Van_Eyck_-_Arnolfini_Portrait.jpg/960px-Van_Eyck_-_Arnolfini_Portrait.jpg',                                                                                                                                                                                                                                                                        title:'The Arnolfini Portrait',          year:'1434',      museum:'National Gallery, London' },
  'Hans Holbein the Younger': { url:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Hans_Holbein_the_Younger_-_The_Ambassadors_-_Google_Art_Project.jpg/960px-Hans_Holbein_the_Younger_-_The_Ambassadors_-_Google_Art_Project.jpg',                                                                                                                                                                      title:'The Ambassadors',                 year:'1533',      museum:'National Gallery, London' },
  'Rachel Ruysch':         { url:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Den_Haag_-_Mauritshuis_-_Rachel_Ruysch_%281664-1750%29_-_Vase_with_Flowers_1700.jpg/960px-Den_Haag_-_Mauritshuis_-_Rachel_Ruysch_%281664-1750%29_-_Vase_with_Flowers_1700.jpg', title:'Vase with Flowers', year:'1700', museum:'Mauritshuis, The Hague', crop:'center 60%', zoom:1.35 },
  'Jan van Huysum':           { url:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Van_Huysum%2C_Jan_-_Vase_with_Flowers_-_Google_Art_Project.jpg/960px-Van_Huysum%2C_Jan_-_Vase_with_Flowers_-_Google_Art_Project.jpg',                                                                                                                                                                              title:'Vase with Flowers',               year:'c. 1722',   museum:'Hermitage Museum, St Petersburg' },
  'Gustav Klimt':         { url:'https://commons.wikimedia.org/wiki/Special:FilePath/Gustav_Klimt_016.jpg', title:'The Kiss', year:'1908–09', museum:'Österreichische Galerie Belvedere', crop:'center 5%' },
  'Fernand Khnopff': { url:'https://commons.wikimedia.org/wiki/Special:FilePath/Fernand_Khnopff013.jpg', title:'Des caresses', year:'1896', museum:'Royal Museums of Fine Arts of Belgium, Brussels', crop:'center 8%' },
  'Thomas Cole':     { url:'https://commons.wikimedia.org/wiki/Special:FilePath/Thomas_Cole_-_The_Oxbow_(Met).jpg', title:'The Oxbow', year:'1836', museum:'Metropolitan Museum of Art, New York', crop:'center 40%' },
  'Asher B. Durand': { url:'https://commons.wikimedia.org/wiki/Special:FilePath/Kindred_Spirits_-_Asher_Brown_Durand.jpg', title:'Kindred Spirits', year:'1849', museum:'Crystal Bridges Museum, Bentonville' },
  'Frederic Church': { url:'https://commons.wikimedia.org/wiki/Special:FilePath/Cotopaxi_church.jpg', title:'Cotopaxi', year:'1862', museum:'Detroit Institute of Arts', crop:'center 40%' },
  'Albert Bierstadt': { url:'https://commons.wikimedia.org/wiki/Special:FilePath/Albert_Bierstadt_-_Among_the_Sierra_Nevada%2C_California_-_Google_Art_Project.jpg', title:'Among the Sierra Nevada, California', year:'1868', museum:'Smithsonian American Art Museum' },
  'Jean-Léon Gérôme': { url:'https://commons.wikimedia.org/wiki/Special:FilePath/JEAN-L%C3%89ON_G%C3%89R%C3%94ME_-_J%C3%B3venes_griegos_presenciando_una_pelea_de_gallos_(Museo_de_Orsay,_Par%C3%ADs,_1846._%C3%93leo_sobre_lienzo,_143_x_204_cm).jpg', title:'Young Greeks Attending a Cockfight', year:'1846', museum:'Mus\u00e9e d\u2019Orsay, Paris', crop:'center 35%' },
  'Lawrence Alma-Tadema': { url:'https://commons.wikimedia.org/wiki/Special:FilePath/Alma-Tadema_Unconscious_Rivals_1893.jpg', title:'Unconscious Rivals', year:'1893', museum:'Bristol Museum and Art Gallery', crop:'center 30%' },
  'Edgar Degas':          { url:'https://commons.wikimedia.org/wiki/Special:FilePath/Edgar_Degas_-_The_Bellelli_Family_-_Google_Art_Project.jpg', title:'The Bellelli Family', year:'c. 1858–67', museum:'Musée d’Orsay, Paris', crop:'center 20%' },
};

/* ── artwork banner: public-domain painting with colour-dot fallback ── */
function ArtworkBanner({ artist }) {
  const aw = MARTWORKS[artist.name];
  const [err, setErr] = useState(false);

  if (!aw || err) {
    return (
      <div style={{
        height:80, borderRadius:'var(--r-sm)', marginBottom:'var(--s-5)',
        display:'flex', alignItems:'center', justifyContent:'center',
        gap:4, flexWrap:'wrap', padding:'10px 12px',
        background:'linear-gradient(135deg,rgba(26,33,56,0.04) 0%,rgba(26,33,56,0.09) 100%)',
        boxShadow:'inset 0 0 0 1px rgba(0,0,0,0.07)'
      }}>
        {sortPigments(artist.pigments).map(p => (
          <div key={p.n} title={p.n} style={{
            width:22, height:22, borderRadius:'50%', background:p.c,
            boxShadow:'inset 0 0 0 1px rgba(0,0,0,0.18), 0 1px 3px rgba(0,0,0,0.14)'
          }} />
        ))}
      </div>
    );
  }

  return (
    <div style={{marginBottom:'var(--s-5)'}}>
      <div style={{
        height:156, borderRadius:'var(--r-sm)', overflow:'hidden',
        boxShadow:'0 2px 8px rgba(0,0,0,0.16), inset 0 0 0 1px rgba(0,0,0,0.08)',
        background:'#ccc9c3'
      }}>
        <img
          src={thumbUrl(aw.url)}
          alt={aw.title}
          loading="lazy"
          style={{width:'calc(100% + 2px)', height:'100%', objectFit:'cover', objectPosition: aw.crop || 'center 20%', display:'block', marginLeft:'-1px', transform: aw.zoom ? `scale(${aw.zoom})` : undefined, transformOrigin: aw.crop || 'center 20%'}}
          onError={() => setErr(true)}
        />
      </div>
      <div style={{marginTop:8, display:'flex', alignItems:'baseline', gap:5, flexWrap:'wrap'}}>
        <span style={{fontFamily:'var(--font-serif)', fontStyle:'italic', fontSize:13.5, color:'var(--fg1)', lineHeight:1.3}}>{aw.title}</span>
        <span style={{fontFamily:'var(--font-sans)', fontSize:10.5, color:'var(--fg3)', letterSpacing:'0.04em'}}>{aw.year}</span>
      </div>
      <div style={{fontFamily:'var(--font-sans)', fontSize:10, color:'var(--fg3)', letterSpacing:'0.05em', marginTop:2}}>{aw.museum}</div>
    </div>
  );
}

/* ── modern-pigment lookup ── */
const PIGMENT_MAP = {
  'Lead white':       ['lead white','flake white'],
  'Lapis lazuli':     ['ultramarine'],
  'Azurite':          ['cerulean','cobalt blue'],
  'Vermilion':        ['vermil','napthol scarlet'],
  'Red madder':       ['rose madder','alizarin','madder'],
  'Red ochre':        ['venetian red','red ochre','english red','light red'],
  'Orpiment':         ['naples yellow'],
  'Realgar':          ['cadmium orange','transparent orange'],
  'Burnt sienna':     ['burnt sienna'],
  'Raw sienna':       ['raw sienna'],
  'Malachite':        ['viridian','phthalo green'],
  'Bone black':       ['ivory black','bone black','lamp black'],
  'Carmine':          ['alizarin crimson','carmine','crimson lake'],
  'Venetian red':     ['venetian red','english red','light red'],
  'Yellow ochre':     ['yellow ochre'],
  'Ivory black':      ['ivory black'],
  'Raw umber':        ['raw umber'],
  'Lead tin yellow':  ['naples yellow'],
  'Smalt':            ['cobalt blue','smalt'],
  'Van Dyke brown':   ['van dyck','vandyke','warm sepia'],
  'Natural ultramarine':['ultramarine'],
  'Green earth':      ['green earth','terre verte'],
  'Naples yellow':    ['naples yellow'],
  'Viridian':         ['viridian'],
  'Cobalt blue':      ['cobalt blue'],
  'Rose madder':      ['rose madder','quinacridone rose','permanent rose'],
  'Chrome yellow':    ['cadmium yellow','hansa yellow'],
  'Zinc white':       ['zinc white'],
  'Fr. ultramarine':  ['french ultramarine','ultramarine'],
  'Cobalt violet':    ['cobalt violet'],
  'Chrome orange':    ['cadmium orange','transparent orange'],
  'Crimson lake':     ['alizarin crimson'],
  'Cerulean':         ['cerulean'],
  'Natural madder':   ['madder','alizarin'],
  'Emerald green':    ['viridian','phthalo green'],
  'Cadmium yellow':   ['cadmium yellow'],
  'Prussian blue':    ['prussian blue'],
  'Alizarin':         ['alizarin crimson','permanent alizarin'],
  'Cadmium red':      ['cadmium red'],
  'Madder lake':      ['madder','alizarin crimson','rose madder'],
  'Cadmium orange':   ['cadmium orange'],
  'Cochineal lake':   ['alizarin crimson','carmine'],
};

function findModernPigments(historicalName, max=4) {
  const terms = PIGMENT_MAP[historicalName] || [];
  if (!terms.length) return [];
  const brands = [
    { data: window.GAMBLIN_FAMILIES,  brand:'Gamblin' },
    { data: window.WN_FAMILIES,       brand:'W&N' },
    { data: window.MH_FAMILIES,       brand:'M. Harding' },
    { data: window.OH_FAMILIES,       brand:'Old Holland' },
  ];
  const results = []; const seen = new Set();
  for (const { data, brand } of brands) {
    if (!data) continue;
    for (const fam of data) {
      for (const color of fam.colors) {
        const nl = color.name.toLowerCase();
        if (terms.some(t => nl.includes(t))) {
          const key = color.name + brand;
          if (!seen.has(key)) { seen.add(key); results.push({ ...color, brand }); }
          if (results.length >= max) return results;
        }
      }
    }
  }
  return results;
}

/* ── detail panel ── */
function MastersDetail({ artist, era, pigment, onBack, shown }) {
  if (!artist) return (
    <aside className="detail">
      <p className="empty">Select a master to explore their palette and historical context.</p>
    </aside>
  );

  if (pigment) {
    const info = MNOTES[pigment.n] || { period:'', origin:'', note:'Historical notes not available for this pigment.' };
    const Ls = mLstar(pigment.c);
    const value = Math.max(0, Math.min(10, Ls / 10));
    const grey = mGrey(pigment.c);
    const valDark = Ls > 52;
    return (
      <aside className={"detail is-pigment"+(shown?" has-sel":"")}>
        <button className="detail-back" onClick={onBack}>
          <MBack />{artist.name.split(' ').pop()}
        </button>
        <div className="big" style={{background:pigment.c}}>
          <div className="valuechip" style={{color:valDark?"rgba(0,0,0,0.70)":"rgba(255,255,255,0.85)"}}>
            <div className="sq" style={{background:grey,color:value>5.2?"#1a1a1a":"#f4f4f4"}}>{value.toFixed(1)}</div>
            Value
          </div>
        </div>
        <p className="t-eyebrow" style={{marginBottom:4}}>{info.period}</p>
        <h3><span className="colname">{pigment.n}</span></h3>
        <dl className="specs">
          <dt>Origin</dt><dd>{info.origin||'—'}</dd>
          <dt>Era</dt><dd>{era.full}</dd>
          <dt>Master</dt><dd>{artist.name}</dd>
        </dl>
        <p className="note">{info.note}</p>
        {(()=>{
          const matches = findModernPigments(pigment.n);
          if (!matches.length) return null;
          return (
            <div style={{borderTop:'1px solid var(--line)', paddingTop:'var(--s-5)', marginTop:'var(--s-5)'}}>
              <p style={{fontFamily:'var(--font-sans)', fontSize:10.5, fontWeight:500, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--fg3)', marginBottom:'var(--s-3)'}}>Modern Equivalents</p>
              <ul className="m-pig-list">
                {matches.map((m,i) => (
                  <li key={i} className="m-pig">
                    <div className="m-pig-sw" style={{background:m.hex}} />
                    <div className="m-pig-txt">
                      <div className="m-pig-name">{m.name}</div>
                      <div className="m-pig-meta">{m.brand} · {m.opacity}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })()}
      </aside>
    );
  }

  /* artist context — default view */
  return (
    <aside className={"detail"+(shown?" has-sel":"")}>
      <button className="detail-back" onClick={onBack}><MBack />Palette</button>
      <ArtworkBanner key={artist.name} artist={artist} />
      <p className="t-eyebrow" style={{marginBottom:4}}>{era.full}</p>
      <h3 style={{display:'flex', flexDirection:'column', gap:4}}>
        <span className="colname">{artist.name}</span>
        <span style={{fontStyle:'normal',fontSize:13,color:'var(--fg3)',fontFamily:'var(--font-sans)',fontWeight:400,letterSpacing:'0.04em', whiteSpace:'nowrap'}}>{artist.dates}</span>
      </h3>
      <dl className="specs">
        <dt>Pigments</dt><dd>{artist.pigments.length} documented</dd>
        <dt>Period</dt><dd>{era.period}</dd>
      </dl>
      <p className="note" style={{marginTop:'var(--s-4)'}}>{artist.note}</p>
    </aside>
  );
}

/* ── drawer ── */
function MastersDrawer({ open, onClose }) {
  const [eraIdx,    setEraIdx]    = useState(0);
  const [artistIdx, setArtistIdx] = useState(0);
  const [sel,       setSel]       = useState(null);
  const [detailShown, setDetailShown] = useState(false);

  const tabsRef    = useRef(null);
  const artistsRef  = useRef(null);
  const [showEraRight,    setShowEraRight]    = useState(false);
  const [showEraLeft,     setShowEraLeft]     = useState(false);
  const [showArtistRight, setShowArtistRight] = useState(false);
  const [showArtistLeft,  setShowArtistLeft]  = useState(false);

  function makeScroll(ref, setL, setR) {
    return {
      check() { const el = ref.current; if(!el) return; setL(el.scrollLeft > 4); setR(el.scrollLeft + el.clientWidth < el.scrollWidth - 4); },
      right()  { const el = ref.current; if(!el) return; const s=el.scrollLeft, t=Math.min(el.scrollWidth-el.clientWidth,s+el.clientWidth*0.7); scroll(el,s,t); },
      left()   { const el = ref.current; if(!el) return; const s=el.scrollLeft, t=Math.max(0,s-el.clientWidth*0.7); scroll(el,s,t); },
    };
  }
  function scroll(el, start, target) {
    const t0=performance.now(), dur=320, ease=t=>1-Math.pow(1-t,3);
    const step=now=>{ const p=Math.min(1,(now-t0)/dur); el.scrollLeft=start+(target-start)*ease(p); if(p<1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
  const eraScroll    = makeScroll(tabsRef,   setShowEraLeft,    setShowEraRight);
  const artistScroll = makeScroll(artistsRef, setShowArtistLeft, setShowArtistRight);

  useEffect(() => {
    [tabsRef, artistsRef].forEach(ref => {
      const el = ref.current; if(!el) return;
      const s = ref === tabsRef ? eraScroll : artistScroll;
      s.check();
      el.addEventListener('scroll', s.check, { passive: true });
      window.addEventListener('resize', s.check);
    });
    return () => {
      [tabsRef, artistsRef].forEach(ref => {
        const el = ref.current; if(!el) return;
        const s = ref === tabsRef ? eraScroll : artistScroll;
        el.removeEventListener('scroll', s.check);
        window.removeEventListener('resize', s.check);
      });
    };
  }, [open, eraIdx]);

  const era    = MDATA[eraIdx];
  const artist = era.artists[artistIdx];

  const pickEra = (i)    => { setEraIdx(i); setArtistIdx(0); setSel(null); setDetailShown(false); };
  const pickArtist = (i) => { setArtistIdx(i); setSel(null); setDetailShown(true); };
  const pickPigment = (p)=> { setSel(p); setDetailShown(true); };
  const goBack = ()      => { if(sel){ setSel(null); } else { setDetailShown(false); } };

  return (
    <div className={"drawer drawer-masters"+(open?" open":"")} role="dialog" aria-label="Old Masters palette">

      {/* Era tabs */}
      <div className="drawer-head">
        <div className="brandtabs-wrap chev-wrap">
          <button className={"fam-nav prev"+(showEraLeft?" show":"")} onClick={eraScroll.left} aria-label="Scroll eras left" tabIndex={showEraLeft?0:-1}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button className={"fam-nav next"+(showEraRight?" show":"")} onClick={eraScroll.right} aria-label="Scroll eras right" tabIndex={showEraRight?0:-1}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
          <div className="brandtabs" ref={tabsRef}>
            {MDATA.map((e,i) => (
              <button key={e.id} className={"btab"+(i===eraIdx?" active":"")} onClick={()=>pickEra(i)}>
                {e.label}<span className="tag">{e.period}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Artist row */}
      <div className="families-wrap">
        <button className={"fam-nav prev"+(showArtistLeft?" show":"")} onClick={artistScroll.left} aria-label="Scroll artists left" tabIndex={showArtistLeft?0:-1}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg></button>
        <button className={"fam-nav next"+(showArtistRight?" show":"")} onClick={artistScroll.right} aria-label="Scroll artists right" tabIndex={showArtistRight?0:-1}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg></button>
        <div className="families" ref={artistsRef}>
          {era.artists.map((a,i) => {
            const seed = a.pigments[Math.floor(a.pigments.length/2)].c;
            return (
              <button key={a.name} className={"fam"+(i===artistIdx?" active":"")} onClick={()=>pickArtist(i)}>
                <span className="seed" style={{background:seed}} />{a.short || a.name.split(' ').pop()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Body */}
      <div className="drawer-body">
        <div className="wells">
          {sortPigments(artist.pigments).map(p => (
            <button key={p.n} className={"well"+(sel&&sel.n===p.n?" sel":"")} onClick={()=>pickPigment(p)}>
              <div className="chip" style={{background:p.c}} />
              <div className="nm">{p.n}</div>
            </button>
          ))}
        </div>
        <MastersDetail
          artist={artist} era={era} pigment={sel}
          shown={detailShown} onBack={goBack}
        />
      </div>

    </div>
  );
}

window.MastersDrawer = MastersDrawer;
