"use client";

import { useRef, useEffect } from "react";

const HERO_VIDEO = "/videos/solar-hero.mp4";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {});
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="https://i.pinimg.com/736x/c1/83/f3/c183f3df41108735f6bff410b097756f.jpg"
      className="h-full w-full object-cover"
      aria-label="Solar panel installation video"
    >
      <source src={HERO_VIDEO} type="video/mp4" />
    </video>
  );
}
