/**
 * Entlelo Group — language-neutral site data.
 *
 * All human-readable copy lives in src/lib/i18n/en.ts (and its
 * translations). This file only carries identifiers, media, contact
 * details and values that are identical across languages.
 *
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
  rating: "CIDB 6",
  whatsapp: "27837103475",
} as const;

export const stats = [
  { id: "years", value: 11, prefix: "", suffix: "+" },
  { id: "clients", value: 240, prefix: "", suffix: "+" },
  { id: "cases", value: 2000, prefix: "", suffix: "+" },
  { id: "graded", value: 6, prefix: "CIDB ", suffix: "" },
] as const;

export type StatId = (typeof stats)[number]["id"];

export type ServiceId = "clearVu" | "scaffolding" | "steel" | "civil";
export type ServiceIconName = "fence" | "scaffold" | "weld" | "civil";

export type ServiceMeta = {
  id: ServiceId;
  /** Canonical English title — used for the quote API payload and JSON-LD. */
  apiTitle: string;
  icon: ServiceIconName;
  image: string;
  hasBadge: boolean;
};

export const services: ServiceMeta[] = [
  {
    id: "clearVu",
    apiTitle: "Clear View Fencing",
    icon: "fence",
    image: "/images/projects/clear-vu-fence.jpg",
    hasBadge: true,
  },
  {
    id: "scaffolding",
    apiTitle: "Scaffolding Supply & Fit",
    icon: "scaffold",
    image: "/images/projects/scaffolding.jpg",
    hasBadge: false,
  },
  {
    id: "steel",
    apiTitle: "Steel Fabrication & Gates",
    icon: "weld",
    image: "/images/projects/steel-gates.jpg",
    hasBadge: true,
  },
  {
    id: "civil",
    apiTitle: "Civil Construction — CIDB 6",
    icon: "civil",
    image: "/images/projects/civil-warehouse.jpg",
    hasBadge: false,
  },
];

export type ProjectCategory = "Fencing" | "Scaffolding" | "Steel" | "Civil";
export type ProjectId =
  | "klipfonteinView"
  | "munyaka"
  | "sasol"
  | "kemptonPark"
  | "balwin"
  | "eastgateMall";

export type ProjectMeta = {
  id: ProjectId;
  /** Client / estate name — proper noun, not translated. */
  client: string;
  /** Location — proper noun, not translated. */
  location: string;
  category: ProjectCategory;
  image: string;
};

export const projectCategories: ProjectCategory[] = [
  "Fencing",
  "Scaffolding",
  "Steel",
  "Civil",
];

export const projects: ProjectMeta[] = [
  {
    id: "klipfonteinView",
    client: "Klipfontein View",
    location: "Klipfontein View, Gauteng",
    category: "Fencing",
    image: "/images/projects/steel-gates.jpg",
  },
  {
    id: "munyaka",
    client: "Munyaka",
    location: "Munyaka, Gauteng",
    category: "Scaffolding",
    image: "/images/projects/scaffolding.jpg",
  },
  {
    id: "sasol",
    client: "Sasol",
    location: "Sasol site, Gauteng",
    category: "Fencing",
    image: "/images/projects/clear-vu-fence.jpg",
  },
  {
    id: "kemptonPark",
    client: "Kempton Park",
    location: "Kempton Park, Gauteng",
    category: "Civil",
    image: "/images/projects/civil-warehouse.jpg",
  },
  {
    id: "balwin",
    client: "Balwin",
    location: "Balwin development, Gauteng",
    category: "Civil",
    image: "/images/projects/civil-balwin.jpg",
  },
  {
    id: "eastgateMall",
    client: "Germiston",
    location: "EastGate Mall, Germiston",
    category: "Scaffolding",
    image: "/images/projects/eastgate-mall.jpg",
  },
];

export type ProcessStepId = "s1" | "s2" | "s3" | "s4";

export const processSteps: { id: ProcessStepId; num: string }[] = [
  { id: "s1", num: "01" },
  { id: "s2", num: "02" },
  { id: "s3", num: "03" },
  { id: "s4", num: "04" },
];

export type TestimonialId = "t1" | "t2" | "t3" | "t4";

export const testimonials: { id: TestimonialId; name: string; area: string }[] = [
  { id: "t1", name: "Thandi M.", area: "Roodepoort, Johannesburg" },
  { id: "t2", name: "Johan v.d. Berg", area: "Midrand, Gauteng" },
  { id: "t3", name: "Sipho K.", area: "Germiston, East Rand" },
  { id: "t4", name: "Aisha R.", area: "Soweto, Johannesburg" },
];

export const faqIds = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"] as const;

export type FaqId = (typeof faqIds)[number];

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

export type NavLinkId = "services" | "whyUs" | "projects" | "process" | "faq" | "contact";

export const navLinks: { id: NavLinkId; href: string }[] = [
  { id: "services", href: "#services" },
  { id: "whyUs", href: "#why-us" },
  { id: "projects", href: "#projects" },
  { id: "process", href: "#process" },
  { id: "faq", href: "#faq" },
  { id: "contact", href: "#quote" },
];
