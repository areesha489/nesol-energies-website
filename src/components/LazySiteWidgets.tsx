"use client";

import dynamic from "next/dynamic";

const BackToTop = dynamic(() => import("@/components/BackToTop"), { ssr: false });
const Chatbot = dynamic(() => import("@/components/Chatbot"), { ssr: false });

export default function LazySiteWidgets() {
  return (
    <>
      <BackToTop />
      <Chatbot />
    </>
  );
}
