import Link from "next/link";

type Variant = "nav" | "footer" | "hero";
type Theme = "light" | "dark";

const sizes: Record<
  Variant,
  { icon: string; title: string; subtitle: string; gap: string }
> = {
  nav: {
    icon: "h-9 w-9 xl:h-10 xl:w-10 2xl:h-11 2xl:w-11",
    title: "text-xs xl:text-[1rem] 2xl:text-[1.1rem]",
    subtitle: "text-[0.45rem] min-[400px]:text-[0.5rem] xl:text-[0.55rem] 2xl:text-[0.6rem]",
    gap: "gap-1",
  },
  footer: {
    icon: "h-14 w-14 sm:h-[3.75rem] sm:w-[3.75rem]",
    title: "text-[1.15rem]",
    subtitle: "text-[0.62rem]",
    gap: "gap-1.5",
  },
  hero: {
    icon: "h-[3.4rem] w-[3.4rem] sm:h-16 sm:w-16",
    title: "text-3xl sm:text-4xl",
    subtitle: "text-sm sm:text-base",
    gap: "gap-3",
  },
};

function LogoMark({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo-icon.png"
      alt=""
      width={192}
      height={192}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className={`shrink-0 object-contain ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}

export default function Logo({
  variant = "nav",
  href = "/",
  theme = "dark",
}: {
  variant?: Variant;
  href?: string;
  theme?: Theme;
}) {
  const s = sizes[variant];
  const resolvedTheme = variant === "footer" ? "dark" : theme;
  const titleColor = resolvedTheme === "light" ? "text-[#0a1628]" : "text-white";
  const subtitleColor = "text-[#f37021]";

  const content = (
    <div className={`inline-flex items-center ${s.gap}`}>
      <LogoMark className={`shrink-0 ${s.icon}`} priority={variant === "nav"} />
      <div className="flex min-w-0 flex-1 flex-col justify-center overflow-hidden leading-none">
        <span
          className={`truncate font-heading font-bold uppercase tracking-[0.06em] ${s.title} ${titleColor}`}
        >
          Nesol Energies
        </span>
        <span
          className={`mt-0.5 truncate font-heading font-semibold uppercase tracking-[0.22em] sm:mt-1 ${s.subtitle} ${subtitleColor}`}
        >
          Group of Companies
        </span>
      </div>
    </div>
  );

  return href ? (
    <Link href={href} className="inline-flex min-w-0 max-w-[48vw] shrink-0 xl:max-w-[220px] 2xl:max-w-none" aria-label="Nesol Energies — Home">
      {content}
    </Link>
  ) : (
    content
  );
}
