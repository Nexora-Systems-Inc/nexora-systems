/**
 * Equipment listing: 2011 HANKWANG FL3015 4 kW CO₂ laser cutting system.
 * Public asking price only — never store or display an internal floor price.
 */

/** @type {import('../types.js').EquipmentListing} */
const hankwangFl3015 = {
  slug: 'hankwang-fl3015',
  status: 'available',
  manufacturer: 'HANKWANG',
  model: 'FL3015 CO₂',
  year: 2011,
  serial: 'FL-285',
  title: '2011 HANKWANG FL3015',
  subtitle: '4 kW CO₂ Laser Cutting System',
  cardSummary:
    'Industrial CO₂ laser cutting system with Siemens 840D control, dual 5′ × 10′ shuttle tables, and documented operating hours. Located in Ontario, Canada.',
  price: {
    amount: 69500,
    currency: 'CAD',
    display: 'C$69,500 OBO',
    negotiable: true,
  },
  location: {
    region: 'Ontario',
    country: 'Canada',
    display: 'Ontario, Canada',
  },
  conditionStatus: 'Decommissioned — stored',
  heroHighlights: [
    { label: 'CNC Control', value: 'Siemens 840D' },
    { label: 'Tables', value: 'Dual 5′ × 10′ Shuttle' },
    { label: 'Hours', value: '15,797 Operating Hours' },
    { label: 'Location', value: 'Ontario, Canada' },
    { label: 'Asking Price', value: 'C$69,500 OBO' },
  ],
  keyFacts: [
    { label: 'Manufacturer', value: 'HANKWANG' },
    { label: 'Model', value: 'FL3015 CO₂' },
    { label: 'Serial', value: 'FL-285' },
    { label: 'Year', value: '2011' },
    { label: 'Laser Output', value: '4,000 W / 4 kW CO₂' },
    { label: 'Resonator', value: 'PRC' },
    { label: 'CNC Control', value: 'Siemens 840D SINUMERIK' },
    { label: 'Table Format', value: 'Dual 5′ × 10′ shuttle tables' },
    { label: 'Sheet Capacity', value: 'Approx. 1,524 × 3,048 mm' },
    { label: 'Operating Hours', value: '15,797.2' },
    { label: 'Location', value: 'Ontario, Canada' },
    { label: 'Asking Price', value: 'C$69,500 OBO' },
  ],
  overview: [
    'This 2011 HANKWANG FL3015 is a 4 kW industrial CO₂ laser cutting system configured for approximately 5′ × 10′ sheet work, with dual shuttle tables and Siemens 840D SINUMERIK CNC control.',
    'Documented operating hours stand at 15,797.2. The package includes a Keller dust collector, Accu water chiller, high-pressure assist gas system, and 5″ and 7.5″ FL quick-change cutting head cartridges.',
    'The machine is located in Ontario, Canada. It is currently decommissioned and stored in a heated, low-moisture building. The seller reports that the machine was operating properly when removed from production. Sale is as-is.',
  ],
  specifications: [
    { label: 'Manufacturer', value: 'HANKWANG' },
    { label: 'Model', value: 'FL3015 CO₂' },
    { label: 'Serial Number', value: 'FL-285' },
    { label: 'Year of Manufacture', value: '2011' },
    { label: 'Laser Resonator', value: 'PRC' },
    { label: 'Laser Output', value: '4,000 W / 4 kW CO₂' },
    { label: 'CNC Control', value: 'Siemens 840D SINUMERIK' },
    { label: 'Table Configuration', value: 'Dual 5′ × 10′ shuttle tables' },
    { label: 'Sheet Capacity', value: 'Approximately 1,524 × 3,048 mm' },
    { label: 'Cutting Heads', value: '5″ and 7.5″ FL quick-change cartridges' },
    { label: 'Operating Hours', value: '15,797.2' },
    { label: 'Rapid Traverse', value: '6,700 IPM' },
    { label: 'Approximate Dimensions', value: '15′ × 35′' },
    { label: 'Approximate Weight', value: '27,000 lb' },
    { label: 'Assist Gas', value: 'High-pressure assist gas system' },
    { label: 'Dust Collection', value: 'Keller dust collector' },
    { label: 'Chiller', value: 'Accu water chiller' },
    { label: 'Location', value: 'Ontario, Canada' },
    { label: 'Current Status', value: 'Decommissioned; stored in heated, low-moisture building' },
    { label: 'Sale Condition', value: 'As-is' },
  ],
  includedEquipment: [
    'Keller dust collector',
    'Accu water chiller',
    'Dual 5′ × 10′ shuttle tables',
    'High-pressure assist gas system',
    '5″ and 7.5″ FL quick-change cutting head cartridges',
  ],
  condition: {
    summary:
      'The machine is currently decommissioned and stored in a heated, low-moisture building in Ontario, Canada.',
    details: [
      'Seller reports that the machine was operating properly when removed from production.',
      'Sale condition is as-is.',
      'The machine is not currently demonstrated under power. Prospective buyers should arrange inspection and independently verify condition.',
    ],
  },
  logistics: {
    approximateWeight: '27,000 lb',
    approximateDimensions: '15′ × 35′',
    notes: [
      'Prospective buyers should independently confirm dimensions, transportation requirements, and rigging requirements before committing to purchase or scheduling removal.',
      'Buyer is responsible for professional removal, rigging, and transport unless separately negotiated with the seller.',
    ],
  },
  /**
   * Photography slots. Populate `src` with files under /public/equipment/hankwang-fl3015/
   * when machine photographs are available. Do not manipulate images to misrepresent condition.
   */
  images: [
    {
      id: 'hero-overview',
      src: null,
      alt: '2011 HANKWANG FL3015 4 kW CO₂ laser cutting system — overall machine view',
      caption: 'Overall machine view (hero)',
      role: 'hero',
      required: true,
    },
    {
      id: 'control-console',
      src: null,
      alt: 'Siemens 840D SINUMERIK CNC control console on HANKWANG FL3015',
      caption: 'Siemens 840D control console',
      role: 'gallery',
      required: true,
    },
    {
      id: 'cutting-head',
      src: null,
      alt: 'Cutting head and cartridge detail on HANKWANG FL3015',
      caption: 'Cutting head / cartridge detail',
      role: 'gallery',
      required: true,
    },
    {
      id: 'shuttle-tables',
      src: null,
      alt: 'Dual 5 by 10 foot shuttle tables on HANKWANG FL3015',
      caption: 'Dual shuttle tables',
      role: 'gallery',
      required: true,
    },
    {
      id: 'resonator-chiller',
      src: null,
      alt: 'Laser resonator and Accu water chiller with HANKWANG FL3015',
      caption: 'Resonator / chiller area',
      role: 'gallery',
      required: false,
    },
    {
      id: 'dust-collector',
      src: null,
      alt: 'Keller dust collector included with HANKWANG FL3015',
      caption: 'Keller dust collector',
      role: 'gallery',
      required: false,
    },
    {
      id: 'nameplate',
      src: null,
      alt: 'HANKWANG FL3015 nameplate showing serial FL-285',
      caption: 'Nameplate / serial FL-285',
      role: 'gallery',
      required: true,
    },
    {
      id: 'storage-context',
      src: null,
      alt: 'HANKWANG FL3015 stored in heated building in Ontario',
      caption: 'Current storage context',
      role: 'gallery',
      required: false,
    },
  ],
  faqs: [
    {
      question: 'Is the machine currently under power?',
      answer:
        'No. The machine is currently decommissioned and stored. It is not demonstrated under power at this time. Request an inspection through the inquiry form for next steps.',
    },
    {
      question: 'Why was it removed from production?',
      answer: null,
      requiresInquiry: true,
      inquiryPrompt: 'Ask the seller why the machine was removed from production.',
    },
    {
      question: 'Where is it located?',
      answer: 'Ontario, Canada. Exact address is shared with qualified buyers arranging inspection.',
    },
    {
      question: 'Can it be inspected?',
      answer:
        'Yes — inspections can be arranged for qualified buyers. Use the inquiry form and select “Request Inspection.”',
    },
    {
      question: 'What equipment is included?',
      answer:
        'Included items identified for this listing: Keller dust collector, Accu water chiller, dual 5′ × 10′ shuttle tables, high-pressure assist gas system, and 5″ and 7.5″ FL quick-change cutting head cartridges.',
    },
    {
      question: 'Are maintenance records available?',
      answer: null,
      requiresInquiry: true,
      inquiryPrompt: 'Request maintenance records from the seller.',
    },
    {
      question: 'Is operating video available?',
      answer: null,
      requiresInquiry: true,
      inquiryPrompt: 'Ask whether operating video is available from the seller.',
    },
    {
      question: 'Who handles rigging and transportation?',
      answer:
        'The buyer is responsible for professional removal, rigging, and transport unless separately negotiated. Approximate machine weight is 27,000 lb with approximate dimensions of 15′ × 35′ — buyers should verify independently.',
    },
    {
      question: 'Are offers considered?',
      answer:
        'Yes. The asking price is C$69,500 OBO. Use “Make an Offer” on the inquiry form to submit an offer amount.',
    },
    {
      question: 'Can the machine be sold outside Ontario?',
      answer:
        'Sale outside Ontario may be possible. Buyer remains responsible for rigging and transportation unless separately negotiated. Contact us with destination details through the inquiry form.',
    },
  ],
  representation:
    'Equipment listing professionally presented by Nexora Systems on behalf of the seller. Nexora does not own this equipment and does not provide mechanical certification, warranty, inspection services, or equipment guarantees.',
  seo: {
    title: '2011 HANKWANG FL3015 4 kW CO₂ Laser for Sale | Ontario, Canada',
    description:
      'Used 2011 HANKWANG FL3015 4 kW CO₂ laser cutting system for sale in Ontario, Canada. Siemens 840D, dual 5×10 shuttle tables, 15,797 hours. Asking C$69,500 OBO. Inquire via Nexora Systems.',
    ogTitle: '2011 HANKWANG FL3015 — 4 kW CO₂ Laser Cutting System for Sale',
    ogDescription:
      'Industrial HANKWANG FL3015 CO₂ laser (4 kW) in Ontario, Canada. Siemens 840D · Dual 5′ × 10′ shuttle tables · 15,797 hours · C$69,500 OBO.',
  },
};

export default hankwangFl3015;
