import Image from "next/image";
import Link from "next/link";

type Variant = "nav" | "footer" | "hero";
type Theme = "light" | "dark";

const sizes: Record<
  Variant,
  { icon: string; title: string; subtitle: string; gap: string }
> = {
  nav: {
    icon: "h-8 w-auto sm:h-[1.9rem] md:h-[2.05rem]",
    title: "text-sm sm:text-[1.05rem] md:text-[1.15rem]",
    subtitle: "hidden min-[400px]:block text-[0.5rem] sm:text-[0.58rem] md:text-[0.62rem]",
    gap: "gap-2 sm:gap-2.5",
  },
  footer: {
    icon: "h-[2.05rem] w-auto",
    title: "text-[1.15rem]",
    subtitle: "text-[0.62rem]",
    gap: "gap-2.5",
  },
  hero: {
    icon: "h-[3.4rem] w-auto sm:h-[4rem]",
    title: "text-3xl sm:text-4xl",
    subtitle: "text-sm sm:text-base",
    gap: "gap-3",
  },
};

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
      <Image
        src="/logo-icon.png"
        alt=""
        width={52}
        height={48}
        className={`shrink-0 object-contain ${s.icon}`}
        aria-hidden
        priority={variant === "nav"}
      />
      <div className="flex min-w-0 flex-1 flex-col justify-center leading-none overflow-hidden">
        <span
          className={`font-heading font-bold uppercase tracking-[0.06em] truncate ${s.title} ${titleColor}`}
        >
          Nesol Energies
        </span>
        <span
          className={`mt-0.5 sm:mt-1 font-heading font-semibold uppercase tracking-[0.22em] truncate ${s.subtitle} ${subtitleColor}`}
        >
          Group of Companies
        </span>
      </div>
    </div>
  );

  return href ? (
    <Link href={href} className="inline-flex min-w-0 max-w-[58vw] sm:max-w-none shrink" aria-label="Nesol Energies — Home">
      {content}
    </Link>
  ) : (
    content
  );
}
