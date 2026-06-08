import Navbar from "@/sections/Navbar";
import ScrollStage from "@/sections/ScrollStage";
import dynamic from "next/dynamic";

const LiveNetwork     = dynamic(() => import("@/sections/LiveNetwork"));
const Benefits        = dynamic(() => import("@/sections/Benefits"));
const ModulesShowcase = dynamic(() => import("@/sections/ModulesShowcase"));
const Industries      = dynamic(() => import("@/sections/Industries"));
const Trust           = dynamic(() => import("@/sections/Trust"));
const Testimonials    = dynamic(() => import("@/sections/Testimonials"));
const CTASection      = dynamic(() => import("@/sections/CTASection"));
const Footer          = dynamic(() => import("@/sections/Footer"));

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <ScrollStage />
        <LiveNetwork />
        <Benefits />
        <ModulesShowcase />
        <Industries />
        <Trust />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
