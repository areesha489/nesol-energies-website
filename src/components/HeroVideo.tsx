"use client";

import { useEffect, useRef } from "react";

const HERO_VIDEO = "/videos/solar-hero.mp4";

export default function HeroVideo({ poster }: { poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !window.matchMedia("(min-width: 1024px)").matches) return;
    video.play().catch(() => {});
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      className="h-full w-full object-cover"
      aria-label="Solar panel installation video"
    >
      <source src={HERO_VIDEO} type="video/mp4" />
    </video>
  );
}
