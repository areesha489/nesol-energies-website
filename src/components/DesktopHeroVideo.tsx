"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HeroVideo = dynamic(() => import("./HeroVideo"), { ssr: false });

export default function DesktopHeroVideo() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setShow(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!show) return null;

  return <HeroVideo />;
}
