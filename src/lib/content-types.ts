export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  whatsapp: string;
  address: {
    label: string;
    line1: string;
    line2: string;
    line3: string;
  };
}

export interface HeroSlide {
  id: string;
  image: string;
  showcase: string;
  title: string;
  highlight: string;
  subtitle: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  featured: boolean;
}

export interface CompanySocial {
  icon: string;
  href: string;
  label: string;
}

export interface Company {
  id: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  icon: string;
  featured?: boolean;
  social: CompanySocial[];
}

export interface Project {
  id: string;
  title: string;
  kw: string;
  location: string;
  images: string[];
}

export interface ProcessStep {
  id: string;
  step: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  initials: string;
}

export interface PageHeaderContent {
  title: string;
  highlight?: string;
  subtitle?: string;
  image?: string;
}

export interface AboutFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface PricingTier {
  id: string;
  kw: number;
  minPrice: number;
  maxPrice: number;
  label?: string;
}

export interface SiteContent {
  site: {
    title: string;
    description: string;
    companyProfilePdf: string;
  };
  contact: ContactInfo;
  socialLinks: SocialLink[];
  navLinks: NavLink[];
  hero: {
    badge: string;
    slides: HeroSlide[];
    floatingStats: {
      savings: { value: string; label: string };
      customers: { value: string; label: string };
    };
    primaryButton: string;
    secondaryButton: string;
  };
  stats: Stat[];
  about: {
    badge: string;
    heading: string;
    headingHighlight: string;
    paragraph: string;
    image: string;
    yearsBadge: { value: string; label: string };
    features: AboutFeature[];
  };
  services: {
    badge: string;
    heading: string;
    headingHighlight: string;
    items: Service[];
  };
  companies: {
    badge: string;
    heading: string;
    headingHighlight: string;
    subtitle: string;
    items: Company[];
  };
  projects: {
    badge: string;
    heading: string;
    headingHighlight: string;
    items: Project[];
  };
  process: {
    badge: string;
    heading: string;
    footerText: string;
    items: ProcessStep[];
  };
  testimonials: {
    badge: string;
    heading: string;
    headingHighlight: string;
    items: Testimonial[];
  };
  cta: {
    heading: string;
    subtitle: string;
    buttonText: string;
  };
  footer: {
    tagline: string;
    serviceLinks: string[];
    copyright: string;
  };
  pricingCalculator: {
    badge: string;
    heading: string;
    headingHighlight: string;
    subtitle: string;
    inputLabel: string;
    currency: string;
    minLabel: string;
    maxLabel: string;
    note: string;
    buttonText: string;
    tiers: PricingTier[];
  };
  pageHeaders: Record<string, PageHeaderContent>;
}
