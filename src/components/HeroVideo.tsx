"use client";

import { useEffect, useRef } from "react";

const HERO_VIDEO = "/videos/solar-hero.mp4";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => undefined);
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      src={HERO_VIDEO}
      className="absolute inset-0 h-full w-full object-cover"
      aria-label="Solar panel installation video"
    />
  );
}
