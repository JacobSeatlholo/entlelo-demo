/**
 * Entlelo Group — central site content.
 * Sourced from entlelo.co.za (About, Services, Portfolio, Contact pages)
 * and repositioned for Johannesburg homeowners & developers.
 */

export const company = {
  name: "Entlelo Group",
  legalName: "Entlelo LTD (PTY) Ltd",
  tagline: "Civil Work & Fencing",
  founded: 2019,
  founder: "Nicholas Ndimphiwe Ntshetshe",
  phonePrimary: "083 710 3475",
  phoneSecondary: "071 126 1117",
  email: "info@entlelo.co.za",
  address: "ERF 5445, 6 Proton Street, Chloorkop Industrial, Kempton Park, Gauteng",
  facebook: "https://www.facebook.com/share/p/17bpGXpg2x/",
  hours: "Mon – Fri: 07:00 – 17:00 · Sat: 08:00 – 13:00 · Emergency call-outs 24/7",
  rating: "CIDB 6",
  whatsapp: "27837103475",
} as const;

export const stats = [
  { value: 11, prefix: "", suffix: "+", label: "Years in construction" },
  { value: 240, prefix: "", suffix: "+", label: "Satisfied clients" },
  { value: 2000, prefix: "", suffix: "+", label: "Successful cases" },
  { value: 6, prefix: "CIDB ", suffix: "", label: "Rated contractor" },
] as const;

export type Service = {
  id: string;
  title: string;
  short: string;
  description: string;
  image: string;
  alt: string;
  features: string[];
  icon: "fence" | "scaffold" | "weld" | "civil";
  badge?: string;
};

export const services: Service[] = [
  {
    id: "clear-view-fencing",
    title: "Clear View Fencing",
    short: "Supply & install",
    description:
      "High-visibility welded mesh panels with genuine anti-climb performance — the security fence of choice for estates, schools, logistics yards and homes across Johannesburg. We supply, install and repair Clear Vu fencing rated for residential and industrial perimeters.",
    image: "/images/projects/clear-vu-fence.jpg",
    alt: "Clear Vu welded mesh fencing installation by Entlelo Group",
    features: [
      "Anti-climb welded mesh panels",
      "Residential, estate & industrial perimeters",
      "Repairs, extensions & panel replacement",
      "Powder-coated galvanised steel",
    ],
    icon: "fence",
    badge: "Most requested",
  },
  {
    id: "scaffolding",
    title: "Scaffolding Supply & Fit",
    short: "Hire, erection & inspection",
    description:
      "Temporary access structures supplied, erected, inspected and dismantled for safe construction, maintenance and repair work — from home renovations to mall upgrades like our EastGate project. SANS-compliant erection with tagged inspection handover.",
    image: "/images/projects/scaffolding.jpg",
    alt: "Scaffolding erected on a construction site by Entlelo Group",
    features: [
      "Erection, inspection & dismantling",
      "SANS-compliant tagged handover",
      "Short & long-term hire",
      "Building, painting & maintenance access",
    ],
    icon: "scaffold",
  },
  {
    id: "steel-fabrication",
    title: "Steel Fabrication & Gates",
    short: "In-house welding expertise",
    description:
      "Design, fabrication, installation and maintenance of structural steelwork and custom gate systems. Our own welding teams build sliding gates, security gates, balustrades and steel structures to spec — no middlemen, no delays.",
    image: "/images/projects/steel-gates.jpg",
    alt: "Custom steel gates and fabrication by Entlelo Group",
    features: [
      "Custom sliding & driveway gates",
      "Structural steelwork & carports",
      "On-site welding & repairs",
      "Automation-ready installations",
    ],
    icon: "weld",
    badge: "In-house welding",
  },
  {
    id: "civil-construction",
    title: "Civil Construction — CIDB 6",
    short: "Graded delivery capacity",
    description:
      "Civil construction delivery across infrastructure and built-environment work with the capacity expected from a CIDB 6-rated contractor — warehouses, paving, concrete works and site development for developers and homeowners alike.",
    image: "/images/projects/civil-warehouse.jpg",
    alt: "Civil construction warehouse project delivered by Entlelo Group",
    features: [
      "CIDB 6 graded capacity",
      "Warehouses & industrial buildings",
      "Paving, concrete & siteworks",
      "Developer & principal-contractor experience",
    ],
    icon: "civil",
  },
];

export type Project = {
  id: string;
  client: string;
  title: string;
  category: "Fencing" | "Scaffolding" | "Steel" | "Civil";
  service: string;
  image: string;
  alt: string;
  location: string;
  summary: string;
  scope: string[];
};

export const projects: Project[] = [
  {
    id: "klipfontein-view",
    client: "Klipfontein View",
    title: "Clear Vu Fence",
    category: "Fencing",
    service: "Steel fabrication and gates",
    image: "/images/projects/steel-gates.jpg",
    alt: "Clear Vu fence and steel gates at Klipfontein View",
    location: "Klipfontein View, Gauteng",
    summary:
      "Full perimeter Clear Vu fencing with matching steel access gates for a residential development — fabricated and installed by our own welding teams.",
    scope: ["Perimeter Clear Vu fencing", "Custom steel gates", "Welded posts & brackets"],
  },
  {
    id: "munyaka",
    client: "Munyaka",
    title: "Scaffolding",
    category: "Scaffolding",
    service: "Scaffolding supply and fit",
    image: "/images/projects/scaffolding.jpg",
    alt: "Scaffolding supply and fit at Munyaka",
    location: "Munyaka, Gauteng",
    summary:
      "Multi-level scaffolding supplied and fitted for safe exterior construction and maintenance access on the Munyaka development.",
    scope: ["Supply & fit", "Tagged inspection handover", "Progressive dismantling"],
  },
  {
    id: "sasol",
    client: "Sasol",
    title: "Clear Vu Fence",
    category: "Fencing",
    service: "Clear view fencing supply and install",
    image: "/images/projects/clear-vu-fence.jpg",
    alt: "Clear view fencing supplied and installed for Sasol",
    location: "Sasol site, Gauteng",
    summary:
      "High-security anti-climb welded mesh fencing supplied and installed to industrial specification for Sasol.",
    scope: ["Industrial Clear Vu supply", "Anti-climb mesh install", "Compliance line & level"],
  },
  {
    id: "kempton-park",
    client: "Kempton Park",
    title: "Warehouse",
    category: "Civil",
    service: "Civil constructions with CIDB 6",
    image: "/images/projects/civil-warehouse.jpg",
    alt: "Warehouse civil construction in Kempton Park",
    location: "Kempton Park, Gauteng",
    summary:
      "Warehouse construction delivered with the capacity expected of a CIDB 6 contractor — from siteworks through to handover.",
    scope: ["Siteworks & foundations", "Structural build", "CIDB 6 graded delivery"],
  },
  {
    id: "balwin",
    client: "Balwin",
    title: "Civil Work",
    category: "Civil",
    service: "Civil constructions with CIDB 6",
    image: "/images/projects/civil-balwin.jpg",
    alt: "Civil works for Balwin property development",
    location: "Balwin development, Gauteng",
    summary:
      "Civil works package supporting a large residential property developer — delivered on programme with tight quality control.",
    scope: ["Bulk earthworks support", "Concrete & paving", "Developer programme compliance"],
  },
  {
    id: "eastgate-mall",
    client: "Germiston",
    title: "EastGate Mall",
    category: "Scaffolding",
    service: "Scaffolding supply and fit",
    image: "/images/projects/eastgate-mall.jpg",
    alt: "Scaffolding at EastGate Mall, Germiston",
    location: "EastGate Mall, Germiston",
    summary:
      "Scaffolding supply and fit for retail maintenance and upgrade works at EastGate Mall — erected around trading hours.",
    scope: ["Retail-hour compliant erection", "Facade access", "Daily safety inspection"],
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Tell us what you need",
    description:
      "Call, WhatsApp or send the quote form. Share your site location, the service you need, and any timing or size details — photos help.",
  },
  {
    step: "02",
    title: "Site visit & fixed quote",
    description:
      "We assess the site in person across Johannesburg, confirm measurements and conditions, then issue a clear, itemised quote — no surprises.",
  },
  {
    step: "03",
    title: "Fabricate & install",
    description:
      "Our in-house teams fabricate, erect and install on the agreed programme, with safety files, supervision and daily site housekeeping.",
  },
  {
    step: "04",
    title: "Inspect & hand over",
    description:
      "We walk the work with you, snag and sign off, and leave you with workmanship you can rely on — plus support long after handover.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "Entlelo fenced our entire home perimeter with Clear Vu and built the gates. The team arrived when they said they would, the welding is neat, and the quote never changed. Our estate neighbours have since used them too.",
    name: "Thandi M.",
    role: "Homeowner",
    area: "Roodepoort, Johannesburg",
  },
  {
    quote:
      "As a developer we need contractors who hold a programme. Entlelo delivered our fencing and scaffolding packages across phases without holding up other trades. Their CIDB 6 grading and safety file made our principal contractor's job easy.",
    name: "Johan v.d. Berg",
    role: "Development Manager",
    area: "Midrand, Gauteng",
  },
  {
    quote:
      "Scaffolding was up on time, tagged, and inspected daily. When we needed an extra lift for the painters they sorted it within 24 hours. Professional outfit from quote to dismantle.",
    name: "Sipho K.",
    role: "Facilities Manager",
    area: "Germiston, East Rand",
  },
  {
    quote:
      "They replaced our shopfront roller gate and welded new security brackets the same week we called. Honest pricing and the finish is excellent. Proud to support a black-owned business that delivers like this.",
    name: "Aisha R.",
    role: "Business Owner",
    area: "Soweto, Johannesburg",
  },
] as const;

export const faqs = [
  {
    q: "Do you work with homeowners, or only big developers?",
    a: "Both. We install Clear Vu fencing, gates and small civil works for private homes across Johannesburg, and we hold the CIDB 6 grading, safety files and capacity that developers and principal contractors require for larger sites.",
  },
  {
    q: "Which areas do you service?",
    a: "We are based in Chloorkop, Kempton Park and deliver across the Greater Johannesburg area — Sandton, Midrand, Soweto, Roodepoort, Randburg, the East Rand (Germiston, Boksburg, Benoni) and Centurion/Pretoria by arrangement.",
  },
  {
    q: "What should I include in my quote request?",
    a: "Share the service you need, the site location, the type of work involved, and any timing or size details that will help us understand the scope. Photos of the site or existing fence/gate help us quote faster.",
  },
  {
    q: "How long does it take to receive a response?",
    a: "We aim to review quote requests as quickly as possible and respond once we have enough information to prepare the next step — usually the same working day for calls and WhatsApps.",
  },
  {
    q: "Will you contact me before sending a final quote?",
    a: "Yes. If we need more details, we may contact you first to confirm measurements, project requirements, or site conditions. For fencing and gates we prefer to measure on site so the quote is fixed.",
  },
  {
    q: "Is your scaffolding compliant and inspected?",
    a: "Yes. Scaffolding is erected to SANS requirements, handed over with a tagged inspection, and inspected regularly for the duration of the hire. Dismantling is done by the same trained teams.",
  },
  {
    q: "What does CIDB 6 actually mean for me?",
    a: "The Construction Industry Development Board grades contractors by capability. A CIDB 6 rating means Entlelo is formally graded to tender and deliver larger public and private contracts — capacity and compliance you inherit on your own project, big or small.",
  },
  {
    q: "Do you do the welding yourselves?",
    a: "Yes — steel fabrication and welding is in-house. Gates, brackets, posts and structural steel are fabricated by our own coded welders, which keeps quality tight and lead times short.",
  },
] as const;

export const serviceAreas = [
  "Johannesburg CBD",
  "Sandton",
  "Midrand",
  "Soweto",
  "Roodepoort",
  "Randburg",
  "Kempton Park",
  "Germiston",
  "Boksburg",
  "Benoni",
  "Alberton",
  "Centurion",
] as const;

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why Entlelo" },
  { href: "#projects", label: "Projects" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
] as const;
