"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const HERO_VIDEO = "/videos/solar-hero.mp4";

export default function HeroVideo({ poster }: { poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoVisible, setVideoVisible] = useState(false);
  const posterSrc =
    poster ?? "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80";

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !window.matchMedia("(min-width: 1024px)").matches) return;

    const showVideo = () => setVideoVisible(true);
    const hideVideo = () => setVideoVisible(false);

    video.addEventListener("loadeddata", showVideo);
    video.addEventListener("canplay", showVideo);
    video.addEventListener("error", hideVideo);

    video.load();
    video.play().catch(hideVideo);

    return () => {
      video.removeEventListener("loadeddata", showVideo);
      video.removeEventListener("canplay", showVideo);
      video.removeEventListener("error", hideVideo);
    };
  }, [posterSrc]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0a1628]">
      <Image
        src={posterSrc}
        alt=""
        fill
        className={`object-cover transition-opacity duration-300 ${videoVisible ? "opacity-0" : "opacity-100"}`}
        sizes="320px"
        priority
        unoptimized={posterSrc.startsWith("/uploads/")}
      />
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={posterSrc}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          videoVisible ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Solar panel installation video"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
    </div>
  );
}
