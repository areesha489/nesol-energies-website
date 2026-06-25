import Image from "next/image";

interface Props {
  title: string;
  highlight?: string;
  subtitle?: string;
  image?: string;
}

export default function PageHeader({ title, highlight, subtitle, image }: Props) {
  return (
    <section className="relative h-[260px] sm:h-[300px] overflow-hidden bg-[#0a1628]">
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
          fetchPriority="high"
          unoptimized={image.startsWith("/uploads/")}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] to-[#0056b3]" />
      )}
      {image && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/75 to-[#0056b3]/50" />
      )}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 pt-16 lg:px-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {title}{" "}
            {highlight && <span className="shimmer-text">{highlight}</span>}
          </h1>
          {subtitle && <p className="mt-2 max-w-lg text-sm text-gray-300 sm:text-base">{subtitle}</p>}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-cyan-500" />
    </section>
  );
}
