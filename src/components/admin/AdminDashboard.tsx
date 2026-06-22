"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Star, GripVertical } from "lucide-react";
import type { SiteContent, HeroSlide, Project, Service, Company, Testimonial, ProcessStep, PricingTier } from "@/lib/content-types";
import AdminShell from "./AdminShell";
import ImageField from "./ImageField";
import ImagesField from "./ImagesField";
import { Field, SectionCard, SaveBar } from "./FormField";

function newId() {
  return crypto.randomUUID();
}

export default function AdminDashboard() {
  const [active, setActive] = useState("overview");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then(setContent)
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    if (!content) return;
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  function update(updater: (prev: SiteContent) => SiteContent) {
    setContent((prev) => (prev ? updater(prev) : prev));
    setSaved(false);
  }

  if (loading || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="h-10 w-10 mx-auto rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
          <p className="mt-3 text-sm text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminShell active={active} onNavigate={setActive}>
      {active === "overview" && <OverviewSection content={content} onNavigate={setActive} />}
      {active === "hero" && <HeroSection content={content} update={update} />}
      {active === "pricing" && <PricingSection content={content} update={update} />}
      {active === "about" && <AboutSection content={content} update={update} />}
      {active === "services" && <ServicesSection content={content} update={update} />}
      {active === "companies" && <CompaniesSection content={content} update={update} />}
      {active === "projects" && <ProjectsSection content={content} update={update} />}
      {active === "process" && <ProcessSection content={content} update={update} />}
      {active === "testimonials" && <TestimonialsSection content={content} update={update} />}
      {active === "pages" && <PageHeadersSection content={content} update={update} />}
      {active === "settings" && <SettingsSection content={content} update={update} />}

      <SaveBar saving={saving} saved={saved} onSave={save} />
    </AdminShell>
  );
}

function OverviewSection({ content, onNavigate }: { content: SiteContent; onNavigate: (id: string) => void }) {
  const cards = [
    { id: "pricing", label: "Price Calculator", count: content.pricingCalculator.tiers.length, color: "from-green-500 to-emerald-400" },
    { id: "hero", label: "Hero Banners", count: content.hero.slides.length, color: "from-orange-500 to-amber-400" },
    { id: "projects", label: "Projects", count: content.projects.items.length, color: "from-blue-600 to-cyan-500" },
    { id: "services", label: "Services", count: content.services.items.length, color: "from-teal-500 to-emerald-400" },
    { id: "companies", label: "Companies", count: content.companies.items.length, color: "from-indigo-500 to-purple-500" },
    { id: "testimonials", label: "Testimonials", count: content.testimonials.items.length, color: "from-pink-500 to-rose-400" },
  ];

  return (
    <div className="space-y-6">
      <SectionCard title="Welcome to Nesol Admin">
        <p className="text-sm text-gray-600 leading-relaxed">
          Yahan se aap website ki har cheez easily edit kar sakte hain — hero banners, projects, services, text, images aur zyada. 
          Changes save karne ke baad website par refresh karein.
        </p>
      </SectionCard>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => onNavigate(card.id)}
            className="group rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} text-white mb-3`}>
              <span className="font-heading text-lg font-bold">{card.count}</span>
            </div>
            <h3 className="font-heading font-bold text-gray-900 group-hover:text-orange-500 transition-colors">{card.label}</h3>
            <p className="text-xs text-gray-500 mt-1">Click to manage</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function HeroSection({ content, update }: { content: SiteContent; update: (fn: (p: SiteContent) => SiteContent) => void }) {
  function updateSlide(id: string, patch: Partial<HeroSlide>) {
    update((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        slides: prev.hero.slides.map((s) => (s.id === id ? { ...s, ...patch } : s)),
      },
    }));
  }

  function addSlide() {
    update((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        slides: [
          ...prev.hero.slides,
          {
            id: newId(),
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80",
            showcase: "",
            title: "New Slide",
            highlight: "Title",
            subtitle: "Slide description here",
          },
        ],
      },
    }));
  }

  function deleteSlide(id: string) {
    update((prev) => ({
      ...prev,
      hero: { ...prev.hero, slides: prev.hero.slides.filter((s) => s.id !== id) },
    }));
  }

  return (
    <div className="space-y-5">
      <SectionCard title="Hero Settings">
        <Field label="Badge Text" value={content.hero.badge} onChange={(v) => update((p) => ({ ...p, hero: { ...p.hero, badge: v } }))} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Primary Button" value={content.hero.primaryButton} onChange={(v) => update((p) => ({ ...p, hero: { ...p.hero, primaryButton: v } }))} />
          <Field label="Secondary Button" value={content.hero.secondaryButton} onChange={(v) => update((p) => ({ ...p, hero: { ...p.hero, secondaryButton: v } }))} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Floating Stat 1 Value" value={content.hero.floatingStats.savings.value} onChange={(v) => update((p) => ({ ...p, hero: { ...p.hero, floatingStats: { ...p.hero.floatingStats, savings: { ...p.hero.floatingStats.savings, value: v } } } }))} />
          <Field label="Floating Stat 1 Label" value={content.hero.floatingStats.savings.label} onChange={(v) => update((p) => ({ ...p, hero: { ...p.hero, floatingStats: { ...p.hero.floatingStats, savings: { ...p.hero.floatingStats.savings, label: v } } } }))} />
          <Field label="Floating Stat 2 Value" value={content.hero.floatingStats.customers.value} onChange={(v) => update((p) => ({ ...p, hero: { ...p.hero, floatingStats: { ...p.hero.floatingStats, customers: { ...p.hero.floatingStats.customers, value: v } } } }))} />
          <Field label="Floating Stat 2 Label" value={content.hero.floatingStats.customers.label} onChange={(v) => update((p) => ({ ...p, hero: { ...p.hero, floatingStats: { ...p.hero.floatingStats, customers: { ...p.hero.floatingStats.customers, label: v } } } }))} />
        </div>
      </SectionCard>

      <SectionCard title="Stats Strip">
        {content.stats.map((stat, i) => (
          <div key={i} className="grid gap-3 sm:grid-cols-3 p-3 rounded-xl bg-gray-50">
            <Field label="Value" value={String(stat.value)} type="number" onChange={(v) => update((p) => { const stats = [...p.stats]; stats[i] = { ...stats[i], value: Number(v) || 0 }; return { ...p, stats }; })} />
            <Field label="Suffix" value={stat.suffix} onChange={(v) => update((p) => { const stats = [...p.stats]; stats[i] = { ...stats[i], suffix: v }; return { ...p, stats }; })} />
            <Field label="Label" value={stat.label} onChange={(v) => update((p) => { const stats = [...p.stats]; stats[i] = { ...stats[i], label: v }; return { ...p, stats }; })} />
          </div>
        ))}
      </SectionCard>

      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold">Hero Slides ({content.hero.slides.length})</h3>
        <button type="button" onClick={addSlide} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2 text-xs font-bold text-white">
          <Plus size={14} /> Add Slide
        </button>
      </div>

      {content.hero.slides.map((slide, index) => (
        <SectionCard key={slide.id} title={`Slide ${index + 1}`}>
          <div className="flex justify-end">
            <button type="button" onClick={() => deleteSlide(slide.id)} className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700">
              <Trash2 size={14} /> Delete
            </button>
          </div>
          <ImageField label="Background Image" value={slide.image} onChange={(v) => updateSlide(slide.id, { image: v })} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Title" value={slide.title} onChange={(v) => updateSlide(slide.id, { title: v })} />
            <Field label="Highlight" value={slide.highlight} onChange={(v) => updateSlide(slide.id, { highlight: v })} />
          </div>
          <Field label="Subtitle" value={slide.subtitle} type="textarea" onChange={(v) => updateSlide(slide.id, { subtitle: v })} />
        </SectionCard>
      ))}
    </div>
  );
}

function AboutSection({ content, update }: { content: SiteContent; update: (fn: (p: SiteContent) => SiteContent) => void }) {
  return (
    <div className="space-y-5">
      <SectionCard title="About Section Text">
        <Field label="Badge" value={content.about.badge} onChange={(v) => update((p) => ({ ...p, about: { ...p.about, badge: v } }))} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Heading" value={content.about.heading} onChange={(v) => update((p) => ({ ...p, about: { ...p.about, heading: v } }))} />
          <Field label="Heading Highlight" value={content.about.headingHighlight} onChange={(v) => update((p) => ({ ...p, about: { ...p.about, headingHighlight: v } }))} />
        </div>
        <Field label="Paragraph" value={content.about.paragraph} type="textarea" rows={4} onChange={(v) => update((p) => ({ ...p, about: { ...p.about, paragraph: v } }))} />
        <ImageField label="About Image" value={content.about.image} onChange={(v) => update((p) => ({ ...p, about: { ...p.about, image: v } }))} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Years Badge Value" value={content.about.yearsBadge.value} onChange={(v) => update((p) => ({ ...p, about: { ...p.about, yearsBadge: { ...p.about.yearsBadge, value: v } } }))} />
          <Field label="Years Badge Label" value={content.about.yearsBadge.label} onChange={(v) => update((p) => ({ ...p, about: { ...p.about, yearsBadge: { ...p.about.yearsBadge, label: v } } }))} />
        </div>
      </SectionCard>

      <SectionCard title="Features">
        {content.about.features.map((f, i) => (
          <div key={f.id} className="p-3 rounded-xl bg-gray-50 space-y-3">
            <Field label="Title" value={f.title} onChange={(v) => update((p) => { const features = [...p.about.features]; features[i] = { ...features[i], title: v }; return { ...p, about: { ...p.about, features } }; })} />
            <Field label="Description" value={f.description} type="textarea" onChange={(v) => update((p) => { const features = [...p.about.features]; features[i] = { ...features[i], description: v }; return { ...p, about: { ...p.about, features } }; })} />
          </div>
        ))}
      </SectionCard>
    </div>
  );
}

function ServicesSection({ content, update }: { content: SiteContent; update: (fn: (p: SiteContent) => SiteContent) => void }) {
  const icons = ["sun", "wind", "battery", "building", "wrench", "chart"];

  function updateService(id: string, patch: Partial<Service>) {
    update((prev) => ({
      ...prev,
      services: { ...prev.services, items: prev.services.items.map((s) => (s.id === id ? { ...s, ...patch } : s)) },
    }));
  }

  return (
    <div className="space-y-5">
      <SectionCard title="Section Headings">
        <Field label="Badge" value={content.services.badge} onChange={(v) => update((p) => ({ ...p, services: { ...p.services, badge: v } }))} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Heading" value={content.services.heading} onChange={(v) => update((p) => ({ ...p, services: { ...p.services, heading: v } }))} />
          <Field label="Highlight" value={content.services.headingHighlight} onChange={(v) => update((p) => ({ ...p, services: { ...p.services, headingHighlight: v } }))} />
        </div>
      </SectionCard>

      {content.services.items.map((service, index) => (
        <SectionCard key={service.id} title={`Service ${index + 1}`}>
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={service.featured} onChange={(e) => updateService(service.id, { featured: e.target.checked })} className="rounded border-gray-300 text-orange-500 focus:ring-orange-400" />
              <Star size={14} className="text-orange-400" /> Featured
            </label>
            <button type="button" onClick={() => update((p) => ({ ...p, services: { ...p.services, items: p.services.items.filter((s) => s.id !== service.id) } }))} className="text-xs text-red-500 flex items-center gap-1"><Trash2 size={14} /> Delete</button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Title" value={service.title} onChange={(v) => updateService(service.id, { title: v })} />
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">Icon</label>
              <select value={service.icon} onChange={(e) => updateService(service.id, { icon: e.target.value })} className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm">
                {icons.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
              </select>
            </div>
          </div>
          <Field label="Description" value={service.description} type="textarea" onChange={(v) => updateService(service.id, { description: v })} />
        </SectionCard>
      ))}

      <button type="button" onClick={() => update((p) => ({ ...p, services: { ...p.services, items: [...p.services.items, { id: newId(), icon: "sun", title: "New Service", description: "Description", featured: false }] } }))} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-xs font-bold text-white">
        <Plus size={14} /> Add Service
      </button>
    </div>
  );
}

function CompaniesSection({ content, update }: { content: SiteContent; update: (fn: (p: SiteContent) => SiteContent) => void }) {
  function updateCompany(id: string, patch: Partial<Company>) {
    update((prev) => ({
      ...prev,
      companies: { ...prev.companies, items: prev.companies.items.map((c) => (c.id === id ? { ...c, ...patch } : c)) },
    }));
  }

  return (
    <div className="space-y-5">
      <SectionCard title="Section Headings">
        <Field label="Badge" value={content.companies.badge} onChange={(v) => update((p) => ({ ...p, companies: { ...p.companies, badge: v } }))} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Heading" value={content.companies.heading} onChange={(v) => update((p) => ({ ...p, companies: { ...p.companies, heading: v } }))} />
          <Field label="Highlight" value={content.companies.headingHighlight} onChange={(v) => update((p) => ({ ...p, companies: { ...p.companies, headingHighlight: v } }))} />
        </div>
        <Field label="Subtitle" value={content.companies.subtitle} type="textarea" onChange={(v) => update((p) => ({ ...p, companies: { ...p.companies, subtitle: v } }))} />
      </SectionCard>

      {content.companies.items.map((company, index) => (
        <SectionCard key={company.id} title={`Company ${index + 1}`}>
          <div className="flex justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={!!company.featured} onChange={(e) => updateCompany(company.id, { featured: e.target.checked })} className="rounded" />
              Featured on site
            </label>
            <button type="button" onClick={() => update((p) => ({ ...p, companies: { ...p.companies, items: p.companies.items.filter((c) => c.id !== company.id) } }))} className="text-xs text-red-500 flex items-center gap-1"><Trash2 size={14} /> Delete</button>
          </div>
          <Field label="Name" value={company.name} onChange={(v) => updateCompany(company.id, { name: v })} />
          <Field label="Tagline" value={company.tagline} onChange={(v) => updateCompany(company.id, { tagline: v })} />
          <Field label="Description" value={company.description} type="textarea" onChange={(v) => updateCompany(company.id, { description: v })} />
        </SectionCard>
      ))}

      <button type="button" onClick={() => update((p) => ({ ...p, companies: { ...p.companies, items: [...p.companies.items, { id: newId(), name: "New Company", tagline: "Tagline", description: "Description", color: "from-blue-600 to-cyan-500", icon: "building", social: [] }] } }))} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-xs font-bold text-white">
        <Plus size={14} /> Add Company
      </button>
    </div>
  );
}

function ProjectsSection({ content, update }: { content: SiteContent; update: (fn: (p: SiteContent) => SiteContent) => void }) {
  function updateProject(id: string, patch: Partial<Project>) {
    update((prev) => ({
      ...prev,
      projects: { ...prev.projects, items: prev.projects.items.map((p) => (p.id === id ? { ...p, ...patch } : p)) },
    }));
  }

  return (
    <div className="space-y-5">
      <SectionCard title="Section Headings">
        <Field label="Badge" value={content.projects.badge} onChange={(v) => update((p) => ({ ...p, projects: { ...p.projects, badge: v } }))} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Heading" value={content.projects.heading} onChange={(v) => update((p) => ({ ...p, projects: { ...p.projects, heading: v } }))} />
          <Field label="Highlight" value={content.projects.headingHighlight} onChange={(v) => update((p) => ({ ...p, projects: { ...p.projects, headingHighlight: v } }))} />
        </div>
      </SectionCard>

      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold flex items-center gap-2"><GripVertical size={16} className="text-gray-400" /> Projects ({content.projects.items.length})</h3>
        <button type="button" onClick={() => update((p) => ({ ...p, projects: { ...p.projects, items: [...p.projects.items, { id: newId(), title: "New Project", kw: "50 kW", location: "Karachi, Pakistan", images: ["https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80"] }] } }))} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2 text-xs font-bold text-white">
          <Plus size={14} /> Add Project
        </button>
      </div>

      {content.projects.items.map((project, index) => (
        <SectionCard key={project.id} title={`Project ${index + 1}: ${project.title}`}>
          <div className="flex justify-end">
            <button type="button" onClick={() => update((p) => ({ ...p, projects: { ...p.projects, items: p.projects.items.filter((pr) => pr.id !== project.id) } }))} className="text-xs text-red-500 flex items-center gap-1"><Trash2 size={14} /> Delete Project</button>
          </div>
          <Field label="Title" value={project.title} onChange={(v) => updateProject(project.id, { title: v })} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="kW" value={project.kw} onChange={(v) => updateProject(project.id, { kw: v })} />
            <Field label="Location" value={project.location} onChange={(v) => updateProject(project.id, { location: v })} />
          </div>
          <ImagesField
            label="Project Pictures"
            value={project.images ?? []}
            onChange={(images) => updateProject(project.id, { images })}
          />
        </SectionCard>
      ))}
    </div>
  );
}

function ProcessSection({ content, update }: { content: SiteContent; update: (fn: (p: SiteContent) => SiteContent) => void }) {
  function updateStep(id: string, patch: Partial<ProcessStep>) {
    update((prev) => ({
      ...prev,
      process: { ...prev.process, items: prev.process.items.map((s) => (s.id === id ? { ...s, ...patch } : s)) },
    }));
  }

  return (
    <div className="space-y-5">
      <SectionCard title="Process Section">
        <Field label="Badge" value={content.process.badge} onChange={(v) => update((p) => ({ ...p, process: { ...p.process, badge: v } }))} />
        <Field label="Heading" value={content.process.heading} onChange={(v) => update((p) => ({ ...p, process: { ...p.process, heading: v } }))} />
        <Field label="Footer Text" value={content.process.footerText} onChange={(v) => update((p) => ({ ...p, process: { ...p.process, footerText: v } }))} />
      </SectionCard>

      {content.process.items.map((step, index) => (
        <SectionCard key={step.id} title={`Step ${index + 1}`}>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Step Number" value={step.step} onChange={(v) => updateStep(step.id, { step: v })} />
            <Field label="Title" value={step.title} onChange={(v) => updateStep(step.id, { title: v })} />
          </div>
          <Field label="Description" value={step.description} type="textarea" onChange={(v) => updateStep(step.id, { description: v })} />
        </SectionCard>
      ))}
    </div>
  );
}

function TestimonialsSection({ content, update }: { content: SiteContent; update: (fn: (p: SiteContent) => SiteContent) => void }) {
  function updateTestimonial(id: string, patch: Partial<Testimonial>) {
    update((prev) => ({
      ...prev,
      testimonials: { ...prev.testimonials, items: prev.testimonials.items.map((t) => (t.id === id ? { ...t, ...patch } : t)) },
    }));
  }

  return (
    <div className="space-y-5">
      <SectionCard title="Section Headings">
        <Field label="Badge" value={content.testimonials.badge} onChange={(v) => update((p) => ({ ...p, testimonials: { ...p.testimonials, badge: v } }))} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Heading" value={content.testimonials.heading} onChange={(v) => update((p) => ({ ...p, testimonials: { ...p.testimonials, heading: v } }))} />
          <Field label="Highlight" value={content.testimonials.headingHighlight} onChange={(v) => update((p) => ({ ...p, testimonials: { ...p.testimonials, headingHighlight: v } }))} />
        </div>
      </SectionCard>

      {content.testimonials.items.map((t, index) => (
        <SectionCard key={t.id} title={`Testimonial ${index + 1}`}>
          <div className="flex justify-end">
            <button type="button" onClick={() => update((p) => ({ ...p, testimonials: { ...p.testimonials, items: p.testimonials.items.filter((item) => item.id !== t.id) } }))} className="text-xs text-red-500 flex items-center gap-1"><Trash2 size={14} /> Delete</button>
          </div>
          <Field label="Quote" value={t.quote} type="textarea" rows={4} onChange={(v) => updateTestimonial(t.id, { quote: v })} />
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Author" value={t.author} onChange={(v) => updateTestimonial(t.id, { author: v })} />
            <Field label="Role" value={t.role} onChange={(v) => updateTestimonial(t.id, { role: v })} />
            <Field label="Initials" value={t.initials} onChange={(v) => updateTestimonial(t.id, { initials: v })} />
          </div>
        </SectionCard>
      ))}

      <button type="button" onClick={() => update((p) => ({ ...p, testimonials: { ...p.testimonials, items: [...p.testimonials.items, { id: newId(), quote: "Great service!", author: "Client Name", role: "CEO, Company", initials: "CN" }] } }))} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2 text-xs font-bold text-white">
        <Plus size={14} /> Add Testimonial
      </button>
    </div>
  );
}

function PageHeadersSection({ content, update }: { content: SiteContent; update: (fn: (p: SiteContent) => SiteContent) => void }) {
  const pages = Object.entries(content.pageHeaders);

  return (
    <div className="space-y-5">
      <SectionCard title="Page Banner Images & Text">
        <p className="text-sm text-gray-600">Har page ka top banner yahan se edit karein — title, subtitle aur background image.</p>
      </SectionCard>

      {pages.map(([key, header]) => (
        <SectionCard key={key} title={`${key.charAt(0).toUpperCase() + key.slice(1)} Page`}>
          <ImageField label="Banner Image" value={header.image || ""} onChange={(v) => update((p) => ({ ...p, pageHeaders: { ...p.pageHeaders, [key]: { ...p.pageHeaders[key], image: v } } }))} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Title" value={header.title} onChange={(v) => update((p) => ({ ...p, pageHeaders: { ...p.pageHeaders, [key]: { ...p.pageHeaders[key], title: v } } }))} />
            <Field label="Highlight" value={header.highlight || ""} onChange={(v) => update((p) => ({ ...p, pageHeaders: { ...p.pageHeaders, [key]: { ...p.pageHeaders[key], highlight: v } } }))} />
          </div>
          <Field label="Subtitle" value={header.subtitle || ""} type="textarea" onChange={(v) => update((p) => ({ ...p, pageHeaders: { ...p.pageHeaders, [key]: { ...p.pageHeaders[key], subtitle: v } } }))} />
        </SectionCard>
      ))}

      <SectionCard title="CTA Banner">
        <Field label="Heading" value={content.cta.heading} onChange={(v) => update((p) => ({ ...p, cta: { ...p.cta, heading: v } }))} />
        <Field label="Subtitle" value={content.cta.subtitle} onChange={(v) => update((p) => ({ ...p, cta: { ...p.cta, subtitle: v } }))} />
        <Field label="Button Text" value={content.cta.buttonText} onChange={(v) => update((p) => ({ ...p, cta: { ...p.cta, buttonText: v } }))} />
      </SectionCard>
    </div>
  );
}

function PricingSection({ content, update }: { content: SiteContent; update: (fn: (p: SiteContent) => SiteContent) => void }) {
  const { pricingCalculator: pc } = content;

  function updateTier(id: string, patch: Partial<PricingTier>) {
    update((p) => ({
      ...p,
      pricingCalculator: {
        ...p.pricingCalculator,
        tiers: p.pricingCalculator.tiers.map((t) => (t.id === id ? { ...t, ...patch } : t)),
      },
    }));
  }

  function addTier() {
    update((p) => ({
      ...p,
      pricingCalculator: {
        ...p.pricingCalculator,
        tiers: [
          ...p.pricingCalculator.tiers,
          { id: newId(), kw: 5, minPrice: 5000, maxPrice: 10000, label: "New Tier" },
        ],
      },
    }));
  }

  function deleteTier(id: string) {
    update((p) => ({
      ...p,
      pricingCalculator: {
        ...p.pricingCalculator,
        tiers: p.pricingCalculator.tiers.filter((t) => t.id !== id),
      },
    }));
  }

  const sorted = [...pc.tiers].sort((a, b) => a.kw - b.kw);

  return (
    <div className="space-y-5">
      <SectionCard title="Calculator Page">
        <p className="text-sm text-gray-600">
          Website par calculator yahan dikhega:{" "}
          <a href="/calculator" target="_blank" rel="noopener noreferrer" className="font-bold text-orange-500 hover:underline">
            /calculator
          </a>
          {" "}(home page par bhi section hai)
        </p>
        <Field label="Badge" value={pc.badge} onChange={(v) => update((p) => ({ ...p, pricingCalculator: { ...p.pricingCalculator, badge: v } }))} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Heading" value={pc.heading} onChange={(v) => update((p) => ({ ...p, pricingCalculator: { ...p.pricingCalculator, heading: v } }))} />
          <Field label="Highlight" value={pc.headingHighlight} onChange={(v) => update((p) => ({ ...p, pricingCalculator: { ...p.pricingCalculator, headingHighlight: v } }))} />
        </div>
        <Field label="Subtitle" value={pc.subtitle} type="textarea" onChange={(v) => update((p) => ({ ...p, pricingCalculator: { ...p.pricingCalculator, subtitle: v } }))} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Currency Symbol" value={pc.currency} onChange={(v) => update((p) => ({ ...p, pricingCalculator: { ...p.pricingCalculator, currency: v } }))} />
          <Field label="Input Label" value={pc.inputLabel} onChange={(v) => update((p) => ({ ...p, pricingCalculator: { ...p.pricingCalculator, inputLabel: v } }))} />
          <Field label="Min Budget Label" value={pc.minLabel} onChange={(v) => update((p) => ({ ...p, pricingCalculator: { ...p.pricingCalculator, minLabel: v } }))} />
          <Field label="Max Budget Label" value={pc.maxLabel} onChange={(v) => update((p) => ({ ...p, pricingCalculator: { ...p.pricingCalculator, maxLabel: v } }))} />
        </div>
        <Field label="Note / Disclaimer" value={pc.note} type="textarea" onChange={(v) => update((p) => ({ ...p, pricingCalculator: { ...p.pricingCalculator, note: v } }))} />
        <Field label="Button Text" value={pc.buttonText} onChange={(v) => update((p) => ({ ...p, pricingCalculator: { ...p.pricingCalculator, buttonText: v } }))} />
      </SectionCard>

      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold">kW Price Tiers ({pc.tiers.length})</h3>
        <button
          type="button"
          onClick={addTier}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 px-4 py-2 text-xs font-bold text-white"
        >
          <Plus size={14} /> Add kW Rate
        </button>
      </div>

      <SectionCard title="Quick Reference Table">
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-xs uppercase text-gray-500">
                <th className="px-4 py-2">kW</th>
                <th className="px-4 py-2">Min</th>
                <th className="px-4 py-2">Max</th>
                <th className="px-4 py-2">Label</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((t) => (
                <tr key={t.id} className="border-t border-gray-100">
                  <td className="px-4 py-2 font-bold">{t.kw} kW</td>
                  <td className="px-4 py-2 text-green-700">{pc.currency} {t.minPrice.toLocaleString()}</td>
                  <td className="px-4 py-2 text-orange-700">{pc.currency} {t.maxPrice.toLocaleString()}</td>
                  <td className="px-4 py-2 text-gray-500">{t.label || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {sorted.map((tier, index) => (
        <SectionCard key={tier.id} title={`${tier.kw} kW — ${tier.label || `Tier ${index + 1}`}`}>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => deleteTier(tier.id)}
              className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Field
              label="System Size (kW)"
              value={String(tier.kw)}
              type="number"
              onChange={(v) => updateTier(tier.id, { kw: Number(v) || 0 })}
            />
            <Field
              label="Minimum Price"
              value={String(tier.minPrice)}
              type="number"
              onChange={(v) => updateTier(tier.id, { minPrice: Number(v) || 0 })}
            />
            <Field
              label="Maximum Price"
              value={String(tier.maxPrice)}
              type="number"
              onChange={(v) => updateTier(tier.id, { maxPrice: Number(v) || 0 })}
            />
            <Field
              label="Label (optional)"
              value={tier.label || ""}
              onChange={(v) => updateTier(tier.id, { label: v })}
              placeholder="e.g. Standard Home"
            />
          </div>
          <p className="text-xs text-gray-500">
            Example: 5 kW → Min {pc.currency} {tier.minPrice.toLocaleString()} | Max {pc.currency} {tier.maxPrice.toLocaleString()}
          </p>
        </SectionCard>
      ))}
    </div>
  );
}

function SettingsSection({ content, update }: { content: SiteContent; update: (fn: (p: SiteContent) => SiteContent) => void }) {
  return (
    <div className="space-y-5">
      <SectionCard title="Site Info">
        <Field label="Site Title (SEO)" value={content.site.title} onChange={(v) => update((p) => ({ ...p, site: { ...p.site, title: v } }))} />
        <Field label="Site Description (SEO)" value={content.site.description} type="textarea" onChange={(v) => update((p) => ({ ...p, site: { ...p.site, description: v } }))} />
        <Field label="Company Profile PDF Path" value={content.site.companyProfilePdf} onChange={(v) => update((p) => ({ ...p, site: { ...p.site, companyProfilePdf: v } }))} />
      </SectionCard>

      <SectionCard title="Contact Info">
        <Field label="Phone" value={content.contact.phone} onChange={(v) => update((p) => ({ ...p, contact: { ...p.contact, phone: v } }))} />
        <Field label="Email" value={content.contact.email} type="email" onChange={(v) => update((p) => ({ ...p, contact: { ...p.contact, email: v } }))} />
        <Field label="WhatsApp Link" value={content.contact.whatsapp} type="url" onChange={(v) => update((p) => ({ ...p, contact: { ...p.contact, whatsapp: v } }))} />
        <Field label="Address Label" value={content.contact.address.label} onChange={(v) => update((p) => ({ ...p, contact: { ...p.contact, address: { ...p.contact.address, label: v } } }))} />
        <Field label="Address Line 1" value={content.contact.address.line1} onChange={(v) => update((p) => ({ ...p, contact: { ...p.contact, address: { ...p.contact.address, line1: v } } }))} />
        <Field label="Address Line 2" value={content.contact.address.line2} onChange={(v) => update((p) => ({ ...p, contact: { ...p.contact, address: { ...p.contact.address, line2: v } } }))} />
        <Field label="Address Line 3" value={content.contact.address.line3} onChange={(v) => update((p) => ({ ...p, contact: { ...p.contact, address: { ...p.contact.address, line3: v } } }))} />
      </SectionCard>

      <SectionCard title="Footer">
        <Field label="Tagline" value={content.footer.tagline} type="textarea" onChange={(v) => update((p) => ({ ...p, footer: { ...p.footer, tagline: v } }))} />
        <Field label="Copyright Text" value={content.footer.copyright} onChange={(v) => update((p) => ({ ...p, footer: { ...p.footer, copyright: v } }))} />
        <Field label="Service Links (comma separated)" value={content.footer.serviceLinks.join(", ")} onChange={(v) => update((p) => ({ ...p, footer: { ...p.footer, serviceLinks: v.split(",").map((s) => s.trim()).filter(Boolean) } }))} />
      </SectionCard>

      <SectionCard title="Social Links">
        {content.socialLinks.map((link, i) => (
          <div key={i} className="grid gap-3 sm:grid-cols-2 p-3 rounded-xl bg-gray-50">
            <Field label="Name" value={link.name} onChange={(v) => update((p) => { const socialLinks = [...p.socialLinks]; socialLinks[i] = { ...socialLinks[i], name: v }; return { ...p, socialLinks }; })} />
            <Field label="URL" value={link.href} type="url" onChange={(v) => update((p) => { const socialLinks = [...p.socialLinks]; socialLinks[i] = { ...socialLinks[i], href: v }; return { ...p, socialLinks }; })} />
          </div>
        ))}
      </SectionCard>
    </div>
  );
}
