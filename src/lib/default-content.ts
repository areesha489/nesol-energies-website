import type { SiteContent } from "./content-types";

const uid = () => crypto.randomUUID();

export const defaultSiteContent: SiteContent = {
  site: {
    title: "Nesol Energies | Group of Companies — Renewable Energy Solutions",
    description: "Nesol Energies delivers premium solar, wind, and renewable energy solutions across Pakistan.",
    companyProfilePdf: "/company-profile.pdf",
  },
  contact: {
    phone: "+92 339 0007944",
    email: "info@nesolenergies.com",
    whatsapp:
      "https://wa.me/923390007944?text=Hi%20Nesol%20Energies,%20I%20would%20like%20to%20get%20a%20quote.",
    address: {
      label: "Head Office",
      line1: "Office No. 906, Dominion Business Center",
      line2: "Bahria Town",
      line3: "Karachi, Pakistan",
    },
  },
  socialLinks: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61571937225134",
      icon: "facebook",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/nesolenergies",
      icon: "instagram",
    },
  ],
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/companies", label: "Our Companies" },
    { href: "/projects", label: "Projects" },
    { href: "/calculator", label: "Price Calculator" },
    { href: "/contact", label: "Contact" },
  ],
  hero: {
    badge: "Group of Companies — Powering Tomorrow",
    slides: [
      {
        id: uid(),
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80",
        showcase: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
        title: "Harness the",
        highlight: "Power of Sun",
        subtitle: "Premium solar solutions across Pakistan — cut electricity bills by up to 90%.",
      },
      {
        id: uid(),
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1920&q=80",
        showcase: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
        title: "Mega-Scale",
        highlight: "Solar Parks",
        subtitle: "Utility-scale renewable energy projects powering industries nationwide.",
      },
      {
        id: uid(),
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1920&q=80",
        showcase: "https://images.unsplash.com/photo-1558449028-b06a8d0ea4d0?w=800&q=80",
        title: "Smart Rooftop",
        highlight: "Solar Systems",
        subtitle: "Residential installations with net metering, monitoring & 25-year warranty.",
      },
      {
        id: uid(),
        image: "https://images.unsplash.com/photo-1558449028-b06a8d0ea4d0?w=1920&q=80",
        showcase: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
        title: "Nesol Energies",
        highlight: "Group of Companies",
        subtitle: "Four trusted brands — one Nesol family powering innovation, property, energy, and organic living.",
      },
    ],
    floatingStats: {
      savings: { value: "4K+", label: "Annual Savings" },
      customers: { value: "100+", label: "Happy Customers" },
    },
    primaryButton: "Download Company Profile",
    secondaryButton: "Explore Services",
  },
  stats: [
    { value: 500, suffix: "+", label: "Projects Completed" },
    { value: 15, suffix: "+", label: "Years Experience" },
    { value: 98, suffix: "%", label: "Client Satisfaction" },
    { value: 50, suffix: "MW+", label: "Energy Generated" },
  ],
  about: {
    badge: "About Nesol Energies",
    heading: "Leading the",
    headingHighlight: "Green Revolution",
    paragraph:
      "Nesol Group of Companies brings together Nesol (Next Edge Solutions), Nesol Properties, Nesol Energies, and Organo Mart — delivering innovation, property, clean energy, and organic living across Pakistan.",
    image: "https://images.unsplash.com/photo-1613665813447-82a78c468028?w=800&q=80",
    yearsBadge: { value: "15+", label: "Years of Excellence" },
    features: [
      {
        id: uid(),
        icon: "shield",
        title: "Certified Experts",
        description: "MNRE-approved installers with 500+ trained technicians nationwide.",
      },
      {
        id: uid(),
        icon: "cpu",
        title: "Smart Monitoring",
        description: "Real-time app tracking of energy production and savings on your phone.",
      },
      {
        id: uid(),
        icon: "wallet",
        title: "Easy Financing",
        description: "Zero down payment EMI options with flexible repayment plans.",
      },
    ],
  },
  services: {
    badge: "Our Services",
    heading: "Complete Renewable",
    headingHighlight: "Energy Solutions",
    items: [
      {
        id: uid(),
        icon: "sun",
        title: "Solar Energy Solutions",
        description:
          "End-to-end solar panel installation for residential, commercial, and industrial sectors with net metering support.",
        featured: true,
      },
      {
        id: uid(),
        icon: "wind",
        title: "Wind Power Systems",
        description:
          "Large-scale wind turbine projects and hybrid renewable energy systems for sustainable power generation.",
        featured: false,
      },
      {
        id: uid(),
        icon: "battery",
        title: "Energy Storage",
        description:
          "Advanced lithium-ion battery storage solutions for uninterrupted clean power during outages.",
        featured: false,
      },
      {
        id: uid(),
        icon: "building",
        title: "Commercial EPC",
        description:
          "Engineering, procurement, and construction services for mega-scale renewable energy projects.",
        featured: false,
      },
      {
        id: uid(),
        icon: "wrench",
        title: "O&M Services",
        description:
          "Operations and maintenance contracts with real-time monitoring and performance optimization.",
        featured: false,
      },
      {
        id: uid(),
        icon: "chart",
        title: "Energy Consulting",
        description: "Free site assessments, ROI analysis, and customized energy roadmaps for your business.",
        featured: false,
      },
    ],
  },
  companies: {
    badge: "Group of Companies",
    heading: "Our",
    headingHighlight: "Family of Brands",
    subtitle:
      "Nesol (Next Edge Solutions), Nesol Properties, Nesol Energies & Organo Mart — united under one vision.",
    items: [
      {
        id: uid(),
        name: "Nesol (Next Edge Solutions)",
        tagline: "Technology & Innovation",
        description:
          "The parent brand powering strategy, digital solutions, and business growth across the entire Nesol family.",
        color: "from-blue-600 to-cyan-500",
        icon: "layers",
        social: [
          { icon: "facebook", href: "https://www.facebook.com/nextedgesolution/", label: "Facebook" },
          { icon: "instagram", href: "https://www.instagram.com/nextedgesolution/", label: "Instagram" },
          { icon: "pinterest", href: "https://uk.pinterest.com/nextedgesolution/", label: "Pinterest" },
          { icon: "linkedin", href: "https://www.linkedin.com/company/nesol-uk/?viewAsMember=true", label: "LinkedIn" },
          { icon: "tiktok", href: "https://www.tiktok.com/@nextedgesolution", label: "TikTok" },
          { icon: "youtube", href: "https://www.youtube.com/@nextedgesolution", label: "YouTube" },
        ],
      },
      {
        id: uid(),
        name: "Nesol Properties",
        tagline: "Real Estate & Development",
        description:
          "Premium residential and commercial property development, investment, and asset management in Pakistan.",
        color: "from-indigo-600 to-blue-400",
        icon: "home",
        social: [
          { icon: "facebook", href: "https://www.facebook.com/profile.php?id=61577101181009", label: "Facebook" },
          { icon: "instagram", href: "https://www.instagram.com/nesolproperties/", label: "Instagram" },
          { icon: "linkedin", href: "https://www.linkedin.com/company/nesol-properties/?viewAsMember=true", label: "LinkedIn" },
        ],
      },
      {
        id: uid(),
        name: "Nesol Energies",
        tagline: "Renewable Energy",
        description:
          "Solar and clean energy solutions for homes, businesses, and industries — your partner in Pakistan's green transition.",
        color: "from-orange-500 to-amber-400",
        icon: "zap",
        featured: true,
        social: [
          { icon: "facebook", href: "https://www.facebook.com/profile.php?id=61571937225134", label: "Facebook" },
          { icon: "instagram", href: "https://www.instagram.com/nesolenergies", label: "Instagram" },
        ],
      },
      {
        id: uid(),
        name: "Organo Mart",
        tagline: "Organic & Natural Retail",
        description:
          "Farm-fresh organic and natural products for healthier living — quality essentials delivered with care.",
        color: "from-teal-500 to-emerald-400",
        icon: "leaf",
        social: [
          { icon: "facebook", href: "https://www.facebook.com/profile.php?id=61589835946939", label: "Facebook" },
          { icon: "instagram", href: "https://www.instagram.com/organoo_mart/", label: "Instagram" },
          { icon: "tiktok", href: "https://www.tiktok.com/@organoo_mart", label: "TikTok" },
        ],
      },
    ],
  },
  projects: {
    badge: "Our Projects",
    heading: "Success",
    headingHighlight: "Stories",
    items: [
      {
        id: uid(),
        title: "Solar Park — Sindh",
        kw: "5000 kW",
        location: "Karachi, Pakistan",
        images: [
          "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
          "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
        ],
      },
      {
        id: uid(),
        title: "Tech Campus Solar",
        kw: "500 kW",
        location: "Lahore, Pakistan",
        images: ["https://images.unsplash.com/photo-1497435334941-8c899ee9e9e0?w=800&q=80"],
      },
      {
        id: uid(),
        title: "Industrial Rooftop",
        kw: "1000 kW",
        location: "Islamabad, Pakistan",
        images: [
          "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
          "https://images.unsplash.com/photo-1558449028-b06a8d0ea4d0?w=800&q=80",
        ],
      },
      {
        id: uid(),
        title: "Residential Cluster",
        kw: "300 kW",
        location: "Multan, Pakistan",
        images: ["https://images.unsplash.com/photo-1613665813447-82a78c468028?w=800&q=80"],
      },
      {
        id: uid(),
        title: "Wind-Solar Hybrid",
        kw: "10000 kW",
        location: "Gwadar, Pakistan",
        images: ["https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80"],
      },
      {
        id: uid(),
        title: "Commercial Complex",
        kw: "800 kW",
        location: "Faisalabad, Pakistan",
        images: [
          "https://images.unsplash.com/photo-1558449028-b06a8d0ea4d0?w=800&q=80",
          "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
        ],
      },
    ],
  },
  process: {
    badge: "4 Simple Steps",
    heading: "Effortless Process, Continuous Power",
    footerText: "Join 500+ clients choosing clean energy",
    items: [
      {
        id: uid(),
        step: "01",
        title: "Consultation",
        description: "Free energy audit and customized solution design for your needs.",
      },
      {
        id: uid(),
        step: "02",
        title: "Engineering",
        description: "Detailed system design, permits, and subsidy documentation handled.",
      },
      {
        id: uid(),
        step: "03",
        title: "Installation",
        description: "Professional setup by certified technicians in 1–5 days.",
      },
      {
        id: uid(),
        step: "04",
        title: "Power On",
        description: "Grid connection, monitoring setup, and lifetime support begins.",
      },
    ],
  },
  testimonials: {
    badge: "Testimonials",
    heading: "What Our",
    headingHighlight: "Clients Say",
    items: [
      {
        id: uid(),
        quote:
          "Nesol Energies transformed our factory rooftop into a power plant. Our electricity costs dropped by 70% in the first year alone.",
        author: "Ahmed Khan",
        role: "Director, Khan Industries",
        initials: "AK",
      },
      {
        id: uid(),
        quote:
          "Professional team, transparent pricing, and excellent after-sales support. The best renewable energy partner we've worked with.",
        author: "Fatima Ali",
        role: "CEO, GreenTech Solutions",
        initials: "FA",
      },
      {
        id: uid(),
        quote:
          "From consultation to commissioning, everything was seamless. Nesol's Group of Companies delivers world-class energy solutions.",
        author: "Usman Malik",
        role: "Plant Head, Malik Textiles",
        initials: "UM",
      },
    ],
  },
  cta: {
    heading: "Ready to Switch to Solar?",
    subtitle: "Free site assessment & savings report within 24 hours.",
    buttonText: "Book Free Assessment",
  },
  footer: {
    tagline: "Empowering Pakistan with clean, affordable renewable energy since 2010.",
    serviceLinks: ["Solar Energy", "Wind Power", "Energy Storage", "Commercial EPC"],
    copyright: "Nesol Energies Group of Companies. All rights reserved.",
  },
  pricingCalculator: {
    badge: "Solar Price Calculator",
    heading: "Estimate Your",
    headingHighlight: "Solar Budget",
    subtitle: "Enter your required system size in kW and get an instant min–max price range.",
    inputLabel: "System Size (kW)",
    currency: "Rs",
    minLabel: "Minimum Budget",
    maxLabel: "Maximum Budget",
    note: "Prices are estimates and may vary based on site survey, equipment brand, and installation complexity.",
    buttonText: "Get Exact Quote",
    tiers: [
      { id: uid(), kw: 3, minPrice: 3000, maxPrice: 6000, label: "Small Home" },
      { id: uid(), kw: 5, minPrice: 5000, maxPrice: 10000, label: "Standard Home" },
      { id: uid(), kw: 10, minPrice: 9000, maxPrice: 16000, label: "Large Home" },
      { id: uid(), kw: 20, minPrice: 16000, maxPrice: 28000, label: "Commercial" },
      { id: uid(), kw: 50, minPrice: 35000, maxPrice: 60000, label: "Industrial" },
    ],
  },
  pageHeaders: {
    about: {
      title: "About",
      highlight: "Nesol Energies",
      subtitle: "Leading the green revolution with 15+ years of renewable energy excellence.",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1920&q=80",
    },
    services: {
      title: "Our",
      highlight: "Services",
      subtitle: "From consultation to installation — complete clean energy solutions.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80",
    },
    companies: {
      title: "Group of",
      highlight: "Companies",
      subtitle: "Nesol (Next Edge Solutions), Nesol Properties, Nesol Energies & Organo Mart — one family, four brands.",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e9e0?w=1920&q=80",
    },
    projects: {
      title: "Our",
      highlight: "Projects",
      subtitle: "500+ successful installations powering homes, industries, and communities.",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1920&q=80",
    },
    contact: {
      title: "Contact",
      highlight: "Us",
      subtitle: "Our renewable energy experts are ready to power your journey.",
      image: "https://images.unsplash.com/photo-1613665813447-82a78c468028?w=1920&q=80",
    },
    calculator: {
      title: "Solar Price",
      highlight: "Calculator",
      subtitle: "Enter kW size and discover your estimated min–max solar installation budget.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80",
    },
  },
};
