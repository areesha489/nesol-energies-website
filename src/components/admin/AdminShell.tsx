"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  ImageIcon,
  Briefcase,
  Building2,
  MessageSquareQuote,
  Settings,
  Zap,
  Users,
  Layers,
  FileText,
  LogOut,
  ExternalLink,
  Calculator,
} from "lucide-react";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "hero", label: "Hero Banners", icon: ImageIcon },
  { id: "pricing", label: "Price Calculator", icon: Calculator },
  { id: "about", label: "About", icon: FileText },
  { id: "services", label: "Services", icon: Zap },
  { id: "companies", label: "Companies", icon: Building2 },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "process", label: "Process", icon: Layers },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { id: "pages", label: "Page Banners", icon: ImageIcon },
  { id: "settings", label: "Site Settings", icon: Settings },
];

export default function AdminShell({
  active,
  onNavigate,
  children,
}: {
  active: string;
  onNavigate: (id: string) => void;
  children: React.ReactNode;
}) {
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-[#0a1628] text-gray-300">
        <div className="border-b border-white/10 px-5 py-5">
          <div className="font-heading text-xl font-bold text-white">
            Nesol <span className="text-orange-400">Admin</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">Website Dashboard</p>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-orange-500/20 to-amber-400/10 text-orange-300"
                    : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={16} className={isActive ? "text-orange-400" : ""} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-white/5 hover:text-white transition-colors"
          >
            <ExternalLink size={16} />
            View Website
          </Link>
          <Link
            href="/calculator"
            target="_blank"
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-white/5 hover:text-white transition-colors"
          >
            <Calculator size={16} />
            View Calculator
          </Link>
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 pl-64">
        <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur-sm px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-xl font-bold text-gray-900">
                {navItems.find((n) => n.id === active)?.label || "Dashboard"}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">Manage your website content easily</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
              <Users size={14} />
              Admin Panel
            </div>
          </div>
        </header>
        <main className="px-6 py-6">{children}</main>
      </div>
    </div>
  );
}

export { navItems };
