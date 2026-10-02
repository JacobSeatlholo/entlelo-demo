import { SiteHeader } from "@/components/entlelo/site-header";
import { Hero } from "@/components/entlelo/hero";
import { LogoMarquee } from "@/components/entlelo/logo-marquee";
import { Services } from "@/components/entlelo/services";
import { WhyUs } from "@/components/entlelo/why-us";
import { Projects } from "@/components/entlelo/projects";
import { Process } from "@/components/entlelo/process";
import { Testimonials } from "@/components/entlelo/testimonials";
import { Faq } from "@/components/entlelo/faq";
import { QuoteSection } from "@/components/entlelo/quote-section";
import { SiteFooter } from "@/components/entlelo/site-footer";
import { FloatingActions } from "@/components/entlelo/floating-actions";
import { company, services, serviceAreas } from "@/lib/site-data";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: company.legalName,
  alternateName: company.name,
  description:
    "CIDB 6-rated, 100% black-owned contractor in Gauteng specialising in clear view fencing, scaffolding supply and fit, steel fabrication with in-house welding, and civil construction for homeowners and developers across Johannesburg.",
  url: "https://entlelo.co.za",
  telephone: `+27${company.phonePrimary.replace(/\s/g, "").slice(1)}`,
  email: company.email,
  foundingDate: String(company.founded),
  founder: {
    "@type": "Person",
    name: company.founder,
    jobTitle: "Founder & CEO",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "ERF 5445, 6 Proton Street, Chloorkop Industrial",
    addressLocality: "Kempton Park",
    addressRegion: "Gauteng",
    addressCountry: "ZA",
  },
  areaServed: serviceAreas.map((a) => ({ "@type": "Place", name: a })),
  openingHours: "Mo-Fr 07:00-17:00, Sa 08:00-13:00",
  sameAs: [company.facebook],
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.title, description: s.short },
  })),
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <LogoMarquee />
        <Services />
        <WhyUs />
        <Projects />
        <Process />
        <Testimonials />
        <Faq />
        <QuoteSection />
      </main>
      <SiteFooter />
      <FloatingActions />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
