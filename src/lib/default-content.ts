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
    { href: "/companies", label: "Companies" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/calculator", label: "Calculator" },
    { href: "/contact", label: "Contact" },
  ],
  productsNav: {
    label: "Products",
    items: [
      { label: "Solar Panels", href: "/products#panels" },
      { label: "Inverters", href: "/products#inverters" },
      { label: "Batteries", href: "/products#batteries" },
    ],
  },
  hero: {
    badge: "Group of Companies — Powering Tomorrow",
    slides: [
      {
        id: uid(),
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1280&q=75&auto=format&fit=crop",
        showcase: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
        title: "Harness the",
        highlight: "Power of Sun",
        subtitle: "Premium solar solutions across Pakistan — cut electricity bills by up to 90%.",
      },
      {
        id: uid(),
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1280&q=75&auto=format&fit=crop",
        showcase: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
        title: "Mega-Scale",
        highlight: "Solar Parks",
        subtitle: "Utility-scale renewable energy projects powering industries nationwide.",
      },
      {
        id: uid(),
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1280&q=75&auto=format&fit=crop",
        showcase: "https://images.unsplash.com/photo-1558449028-b06a8d0ea4d0?w=800&q=80",
        title: "Smart Rooftop",
        highlight: "Solar Systems",
        subtitle: "Residential installations with net metering, monitoring & 25-year warranty.",
      },
      {
        id: uid(),
        image: "https://images.unsplash.com/photo-1558449028-b06a8d0ea4d0?w=1280&q=75&auto=format&fit=crop",
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
  products: {
    badge: "Our Products",
    heading: "Premium Solar",
    headingHighlight: "Equipment",
    subtitle: "Tier-1 solar panels, high-efficiency inverters, and reliable battery storage — all backed by Nesol Energies warranty and support.",
    categories: [
      {
        id: "cat-panels",
        slug: "panels",
        title: "Solar Panels",
        subtitle: "High-efficiency monocrystalline and polycrystalline panels for residential and commercial use.",
        items: [
          {
            id: "panel-550w-mono-perc",
            name: "550W Mono PERC Panel",
            brand: "Longi / Jinko",
            specs: "550W | 21.3% Efficiency | 25 Year Warranty",
            description:
              "Premium tier-1 monocrystalline panel ideal for rooftop and ground-mount systems across Pakistan. Built for high yield in hot climates with excellent low-light performance.",
            images: [
              "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
              "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
              "https://images.unsplash.com/photo-1497435334941-8c899ee9e9e0?w=800&q=80",
            ],
            features: [
              "21.3% module efficiency",
              "25-year performance warranty",
              "PID resistant & anti-salt corrosion",
              "Half-cut cell technology",
              "Ideal for rooftop & ground mount",
            ],
            availability: "In Stock",
            price: 18500,
            priceNote: "Per panel · Installation extra",
          },
          {
            id: "panel-450w-half-cut",
            name: "450W Half-Cut Panel",
            brand: "Canadian Solar",
            specs: "450W | 20.9% Efficiency | PID Resistant",
            description:
              "Reliable performance in high-temperature climates with excellent low-light output. A trusted choice for residential solar installations.",
            images: [
              "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
              "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
            ],
            features: [
              "20.9% efficiency rating",
              "Excellent low-light performance",
              "Reduced hot-spot risk",
              "Tier-1 bankable brand",
              "12-year product warranty",
            ],
            availability: "In Stock",
            price: 15200,
            priceNote: "Per panel · Bulk discounts available",
          },
        ],
      },
      {
        id: "cat-inverters",
        slug: "inverters",
        title: "Inverters",
        subtitle: "On-grid, hybrid, and off-grid inverters with smart monitoring and net metering support.",
        items: [
          {
            id: "inverter-5kw-hybrid",
            name: "5kW Hybrid Inverter",
            brand: "Growatt / Huawei",
            specs: "5kW | MPPT | WiFi Monitoring",
            description:
              "Smart hybrid inverter with battery-ready design for homes and small businesses. Supports net metering and seamless backup switching.",
            images: [
              "https://images.unsplash.com/photo-1558449028-b06a8d0ea4d0?w=800&q=80",
              "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
              "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
            ],
            features: [
              "Dual MPPT trackers",
              "WiFi app monitoring",
              "Battery-ready hybrid design",
              "98.4% max efficiency",
              "Silent fan cooling system",
            ],
            availability: "In Stock",
            price: 285000,
            priceNote: "Includes 2-year warranty",
          },
          {
            id: "inverter-10kw-on-grid",
            name: "10kW On-Grid Inverter",
            brand: "Sungrow",
            specs: "10kW | Dual MPPT | IP65 Rated",
            description:
              "Commercial-grade on-grid inverter for net metering installations. Rugged IP65 enclosure for outdoor and industrial use.",
            images: [
              "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
              "https://images.unsplash.com/photo-1558449028-b06a8d0ea4d0?w=800&q=80",
            ],
            features: [
              "10kW rated output",
              "Dual MPPT inputs",
              "IP65 weatherproof rating",
              "Net metering compatible",
              "Smart grid monitoring",
            ],
            availability: "In Stock",
            price: 420000,
            priceNote: "Commercial grade · Free delivery in Lahore",
          },
        ],
      },
      {
        id: "cat-batteries",
        slug: "batteries",
        title: "Batteries",
        subtitle: "Lithium-ion and tubular battery solutions for backup power and hybrid solar systems.",
        items: [
          {
            id: "battery-5kwh-lithium",
            name: "5kWh Lithium Battery",
            brand: "Pylontech / Dyness",
            specs: "5kWh | 6000+ Cycles | Wall Mount",
            description:
              "Compact lithium battery pack for hybrid solar backup with fast charging. Stackable design for expanding storage capacity.",
            images: [
              "https://images.unsplash.com/photo-1613665813447-82a78c468028?w=800&q=80",
              "https://images.unsplash.com/photo-1497435334941-8c899ee9e9e0?w=800&q=80",
              "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
            ],
            features: [
              "5kWh usable capacity",
              "6000+ charge cycles",
              "Wall-mount compact design",
              "Fast charge & discharge",
              "BMS safety protection",
            ],
            availability: "In Stock",
            price: 385000,
            priceNote: "Wall-mount kit included",
          },
          {
            id: "battery-200ah-tubular",
            name: "200Ah Tubular Battery",
            brand: "Phoenix / Osaka",
            specs: "200Ah | Deep Cycle | 2 Year Warranty",
            description:
              "Heavy-duty tubular battery for off-grid and UPS backup applications. Proven reliability for Pakistani load-shedding conditions.",
            images: [
              "https://images.unsplash.com/photo-1497435334941-8c899ee9e9e0?w=800&q=80",
              "https://images.unsplash.com/photo-1613665813447-82a78c468028?w=800&q=80",
            ],
            features: [
              "200Ah deep cycle capacity",
              "Long backup runtime",
              "Low maintenance tubular design",
              "High charge acceptance",
              "2-year warranty included",
            ],
            availability: "In Stock",
            price: 52000,
            priceNote: "Per unit · Exchange available",
          },
        ],
      },
    ],
  },
  blog: {
    badge: "Nesol Blog",
    heading: "Solar Insights",
    headingHighlight: "& News",
    subtitle: "Latest updates on solar technology, energy savings tips, and Nesol Energies projects across Pakistan.",
    posts: [
      {
        id: uid(),
        title: "5kW Solar System: Complete Cost Guide for Pakistan 2024",
        excerpt: "Learn how much a 5kW solar system costs in Pakistan, what it includes, and how much you can save on electricity bills.",
        content:
          "A 5kW solar system is the most popular choice for Pakistani homes. It typically includes 9-11 panels, a 5kW inverter, mounting structure, and installation.\n\nAverage savings range from Rs 15,000 to Rs 25,000 per month depending on your electricity tariff and usage patterns.\n\nNesol Energies offers free site surveys and customized quotes. Contact us for an exact price based on your roof and energy needs.",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
        date: "2024-06-15",
        author: "Nesol Energies",
      },
      {
        id: uid(),
        title: "Net Metering in Pakistan: Step-by-Step Process",
        excerpt: "Everything you need to know about applying for net metering with DISCOs in Sindh, Punjab, and across Pakistan.",
        content:
          "Net metering allows you to sell excess solar energy back to the grid. The process involves:\n\n1. System installation by a certified installer\n2. NOC from DISCO\n3. Application submission with required documents\n4. Inspection and meter installation\n\nNesol Energies handles the complete net metering process for our clients.",
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
        date: "2024-05-20",
        author: "Nesol Energies",
      },
      {
        id: uid(),
        title: "Hybrid vs On-Grid Solar: Which is Right for You?",
        excerpt: "Compare hybrid and on-grid solar systems to find the best solution for load shedding and bill savings.",
        content:
          "On-grid systems are ideal if you have reliable grid power and want maximum bill savings through net metering.\n\nHybrid systems add battery backup for load shedding — perfect for areas with frequent power outages.\n\nOur experts at Nesol Energies can recommend the best option after a free consultation.",
        image: "https://images.unsplash.com/photo-1558449028-b06a8d0ea4d0?w=800&q=80",
        date: "2024-04-10",
        author: "Nesol Energies",
      },
    ],
  },
  pageHeaders: {
    about: {
      title: "About",
      highlight: "Nesol Energies",
      subtitle: "Leading the green revolution with 15+ years of renewable energy excellence.",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1280&q=75&auto=format&fit=crop",
    },
    services: {
      title: "Our",
      highlight: "Services",
      subtitle: "From consultation to installation — complete clean energy solutions.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1280&q=75&auto=format&fit=crop",
    },
    companies: {
      title: "Group of",
      highlight: "Companies",
      subtitle: "Nesol (Next Edge Solutions), Nesol Properties, Nesol Energies & Organo Mart — one family, four brands.",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e9e0?w=1280&q=75&auto=format&fit=crop",
    },
    projects: {
      title: "Our",
      highlight: "Projects",
      subtitle: "500+ successful installations powering homes, industries, and communities.",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1280&q=75&auto=format&fit=crop",
    },
    contact: {
      title: "Contact",
      highlight: "Us",
      subtitle: "Our renewable energy experts are ready to power your journey.",
      image: "https://images.unsplash.com/photo-1613665813447-82a78c468028?w=1280&q=75&auto=format&fit=crop",
    },
    calculator: {
      title: "Solar Price",
      highlight: "Calculator",
      subtitle: "Enter kW size and discover your estimated min–max solar installation budget.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1280&q=75&auto=format&fit=crop",
    },
    products: {
      title: "Our",
      highlight: "Products",
      subtitle: "Tier-1 solar panels, inverters, and batteries — backed by Nesol warranty and support.",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1280&q=75&auto=format&fit=crop",
    },
    blog: {
      title: "Solar",
      highlight: "Blog",
      subtitle: "Latest solar news, tips, and insights from Nesol Energies.",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1280&q=75&auto=format&fit=crop",
    },
  },
};
