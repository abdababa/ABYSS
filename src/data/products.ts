import { Product } from '@/types'

export const products: Product[] = [
  {
    id: 1,
    slug: 'charcoal-sovereign-suit',
    name: 'The Charcoal Sovereign',
    category: 'Menswear',
    price: 2850,
    images: [
      '/assets/mens_wool_suit_1775376502201.png',
      '/assets/classic_longcoat_1775376253908.png',
    ],
    shortDescription: 'Full-canvas two-piece tailored in Milan from pure Highland wool.',
    description:
      'Draped in heritage and tailored for the modern aristocrat, the Charcoal Sovereign is a study in understated authority. Born from the finest Highland wool sourced in the Scottish uplands and delivered to the ateliers of Milan, every stitch reflects a centuries-old commitment to craft. The full-canvas construction breathes with the body, molds over time, and ages with a distinction no fused garment could ever achieve. This is not merely a suit — it is a statement of lineage.',
    details: [
      'Full canvas construction, hand-basted chest piece',
      'Two-button single-breasted jacket',
      'Flat-front trousers with side adjusters',
      'Four working cuff buttons per sleeve',
      'Hand-finished buttonholes',
      'Lined in ABYSS signature cream silk',
    ],
    origin: 'Meticulously tailored in Milan, Italy',
    fabric: '100% Pure Highland Wool, 280g/m² — Super 130s',
    sizes: ['36R', '38R', '40R', '42R', '44R', '46R', '38L', '40L', '42L'],
    colors: ['Charcoal', 'Midnight Navy'],
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    slug: 'cream-cashmere-sweater',
    name: 'The Cream Cashmere',
    category: 'Womenswear',
    price: 980,
    images: [
      '/assets/womens_cashmere_sweater_1775376520474.png',
      '/assets/silk_scarf_1775376536545.png',
    ],
    shortDescription: 'Featherlight V-neck sculpted from Grade-A Mongolian cashmere.',
    description:
      'There is a warmth that transcends temperature — the warmth of something made entirely right. The Cream Cashmere is constructed from Grade-A fibres combed from the inner belly of Mongolian goats during the spring moult. Each fibre measures no more than 15 microns in diameter, yielding a handle so delicate it seems to dissolve against the skin. Worn alone as a statement or layered beneath the Sovereign Longcoat, it is the cornerstone of any considered wardrobe.',
    details: [
      'V-neck silhouette with ribbed cuffs and hem',
      'Relaxed fit, true to size',
      'Grade-A Mongolian cashmere, 2-ply construction',
      'Hand-wash or dry clean only',
      'Available in Ivory Cream and Mushroom Taupe',
    ],
    origin: 'Knitted in the Scottish Borders, United Kingdom',
    fabric: '100% Grade-A Mongolian Cashmere, 2-ply, 15 micron',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Ivory Cream', 'Mushroom Taupe'],
    inStock: true,
    featured: true,
  },
  {
    id: 3,
    slug: 'burgundy-silk-scarf',
    name: 'The Burgundy Foulard',
    category: 'Accessories',
    price: 420,
    images: [
      '/assets/silk_scarf_1775376536545.png',
      '/assets/womens_cashmere_sweater_1775376520474.png',
    ],
    shortDescription: 'Hand-rolled 12mm silk twill in signature ABYSS burgundy.',
    description:
      'Woven in Lyon — the undisputed silk capital of the Western world — the Burgundy Foulard is 90 centimetres of pure narrative. The hand-painted motif of interlocking geometric crests draws upon the heraldic imagery of European old money, rendered in the deep burgundy that defines the ABYSS chromatic identity. Each edge is hand-rolled by a single artisan, a process requiring over forty minutes of focused attention per scarf. Worn at the neck, the wrist, or knotted through the handle of a leather bag, it is the quiet flourish of the irreproachably dressed.',
    details: [
      '90 × 90 cm square format',
      'Hand-painted print, 12mm silk twill',
      'Hand-rolled and hand-stitched hem',
      'Dry clean only',
      'Comes in ABYSS branded silk envelope',
    ],
    origin: 'Woven and finished in Lyon, France',
    fabric: '100% Pure Silk Twill, 12mm weight',
    sizes: ['One Size'],
    colors: ['Burgundy & Ivory', 'Navy & Gold'],
    inStock: true,
    featured: false,
  },
  {
    id: 4,
    slug: 'sovereign-longcoat',
    name: 'The Sovereign Longcoat',
    category: 'Menswear',
    price: 3400,
    originalPrice: 3800,
    images: [
      '/assets/classic_longcoat_1775376253908.png',
      '/assets/mens_wool_suit_1775376502201.png',
    ],
    shortDescription: 'Knee-length topcoat in double-faced camel wool, fully canvassed.',
    description:
      'The Sovereign Longcoat is ABYSS rendered in its most commanding form. Cut to fall just below the knee, its double-faced camel wool requires no lining — the inner face is as immaculate as the outer. Silhouette-first design philosophy meets the rigour of traditional Neapolitan tailoring: the pronounced shoulder, the clean lapel, the single-vented back that allows passage without distortion. Wear it over the Charcoal Sovereign for a complete look that communicates without uttering a word.',
    details: [
      'Single-breasted, 4-button front',
      'Double-faced wool, no lining required',
      'Hand-stitched lapels, spalla camicia shoulder',
      'Single back vent, elongated silhouette',
      'Interior grosgrain loop and single welt pocket',
    ],
    origin: 'Crafted in Naples, Italy',
    fabric: 'Double-faced 100% Camel Wool, 600g/m²',
    sizes: ['36R', '38R', '40R', '42R', '44R', '46R'],
    colors: ['Camel', 'Charcoal'],
    inStock: true,
    featured: true,
  },
  {
    id: 5,
    slug: 'silk-evening-dress',
    name: 'The Obsidian Dress',
    category: 'Womenswear',
    price: 1650,
    images: [
      '/assets/elegant_womens_dress_1775376237419.png',
      '/assets/womens_cashmere_sweater_1775376520474.png',
    ],
    shortDescription: 'Bias-cut silk charmeuse evening gown with couture drape.',
    description:
      'Conceived in the tradition of Madeleine Vionnet, the Obsidian Dress is bias-cut from a single length of silk charmeuse, allowing the fabric to fall along the body\'s natural contours with a liquidity impossible in conventionally cut garments. The deep ivory lining provides structure without imposing it; the back cowl cascades from the shoulders like water over polished stone. It is a dress that does not announce itself — it simply is, and that is precisely the point.',
    details: [
      'Bias-cut construction, floor-length silhouette',
      'Open back with adjustable silk halter tie',
      'Back cowl drape, minimal front',
      'Full silk charmeuse lining',
      'Hand-finished hem and seams',
    ],
    origin: 'Designed in Paris, sewn in Florence',
    fabric: '100% Silk Charmeuse, 19mm weight',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Obsidian Black', 'Ivory Sand'],
    inStock: true,
    featured: true,
  },
  {
    id: 6,
    slug: 'old-money-polo',
    name: 'The Merino Polo',
    category: 'Menswear',
    price: 395,
    images: [
      '/assets/old_money_polo_1775376221252.png',
      '/assets/mens_wool_suit_1775376502201.png',
    ],
    shortDescription: 'Long-piqué polo knitted from extra-fine Merino, 18.5 micron.',
    description:
      'The Merino Polo occupies a rare register: casual enough for weekend leisure, refined enough to stand beneath the Sovereign Longcoat. Knitted from extra-fine Merino wool at 18.5 microns — finer than the finest cashmere blends at many competing houses — it achieves a piqué texture that holds its structure across seasons and washes. The three-button placket is faced in grosgrain, the collar interlining is horsehair-stiffened, and the tipping detail echoes the ABYSS house code in tone-on-tone burgundy.',
    details: [
      'Long-body piqué construction',
      '3-button grosgrain-faced placket',
      'Horsehair-interlining collar for structure',
      'Tone-on-tone burgundy tipping on collar and cuffs',
      'Available in three colourways',
    ],
    origin: 'Knitted in Hawick, Scottish Borders',
    fabric: '100% Extra-Fine Merino Wool, 18.5 micron',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Ivory', 'Slate', 'Forest'],
    inStock: true,
    featured: false,
  },
]

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug) ?? null

export const getFeaturedProducts = () => products.filter((p) => p.featured)

export const getProductsByCategory = (category: string) =>
  products.filter((p) => p.category === category)

export const shippingMethods = [
  {
    id: 'standard',
    name: 'ABYSS Standard',
    description: 'Signature packaging, tracked delivery',
    price: 0,
    days: '5–7 business days',
  },
  {
    id: 'express',
    name: 'ABYSS Express',
    description: 'Priority handling, signature required',
    price: 35,
    days: '2–3 business days',
  },
  {
    id: 'overnight',
    name: 'ABYSS White Glove',
    description: 'Same-day or overnight, personal courier',
    price: 95,
    days: 'Next business day by noon',
  },
]
