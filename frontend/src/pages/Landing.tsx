import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useGsap } from "../lib/gsap";

const DAILY_FLOW = [
  { time: "Morning", program: "Kayakalp", purpose: "Focus", freq: "14 Hz · Beta" },
  { time: "Evening", program: "Sanjeevani", purpose: "Relax", freq: "8 Hz · Alpha" },
  { time: "Night", program: "Dhyana Nidra", purpose: "Sleep", freq: "3 Hz · Delta" },
  { time: "Anytime", program: "Dosha Sync", purpose: "Wellness", freq: "Circadian" }
];

const PILLARS = [
  {
    title: "Ayurvedic Diagnostics",
    body: "A short dosha assessment maps your constitution to the sound frequencies most likely to bring you back to balance."
  },
  {
    title: "Binaural Sound Engine",
    body: "Each track is tuned to a target brainwave band — delta for sleep, alpha for calm, beta for focus — layered under real instrumentation."
  },
  {
    title: "AI Session Guide",
    body: "A conversational agent, grounded in a retrieval index of your program library, recommends and explains what to listen to and why."
  },
  {
    title: "Adaptive Scheduling",
    body: "Morning, evening, and night sessions are sequenced automatically around your circadian rhythm, not a generic playlist."
  }
];

const CHAKRA_RINGS = [
  { r: 46, color: "#d9a441", dash: 289 },
  { r: 74, color: "#4f7c8d", dash: 465 },
  { r: 102, color: "#2f5e4e", dash: 641 },
  { r: 130, color: "#e6c67a", dash: 817 }
];

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<SVGSVGElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = useGsap();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero-eyebrow]", { opacity: 0, y: 16, duration: 0.6 })
        .from("[data-hero-line]", { opacity: 0, y: 36, stagger: 0.12, duration: 0.8 }, "-=0.3")
        .from("[data-hero-sub]", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .from("[data-hero-cta]", { opacity: 0, y: 16, stagger: 0.08, duration: 0.5 }, "-=0.3")
        .from("[data-hero-rings] circle", { scale: 0, transformOrigin: "center", stagger: 0.1, duration: 0.7 }, "-=0.9");

      gsap.to("[data-hero-rings] circle", {
        rotate: 360,
        transformOrigin: "center",
        duration: 40,
        repeat: -1,
        ease: "none",
        stagger: { each: 6, from: "center" }
      });

      gsap.from("[data-flow-item]", {
        scrollTrigger: { trigger: flowRef.current, start: "top 80%" },
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.6,
        ease: "power2.out"
      });

      gsap.from("[data-pillar]", {
        scrollTrigger: { trigger: pillarsRef.current, start: "top 80%" },
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out"
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef}>
      <section className="relative px-8 pt-16 pb-24 grid gap-12 lg:grid-cols-2 items-center overflow-hidden">
        <div className="space-y-6 relative z-10">
          <p data-hero-eyebrow className="uppercase tracking-[0.35em] text-ocean text-xs font-semibold">
            Ayurveda · Neuroscience · Sound
          </p>
          <h1 className="font-heading text-5xl lg:text-6xl text-ink leading-[1.05]">
            <span data-hero-line className="block">Sound tuned to</span>
            <span data-hero-line className="block text-sage">your constitution,</span>
            <span data-hero-line className="block">not a playlist.</span>
          </h1>
          <p data-hero-sub className="text-ink/70 text-lg max-w-md">
            Tarang maps your dosha and daily rhythm to binaural frequencies, then an AI
            guide explains why each session is right for you today.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link data-hero-cta to="/chat" className="btn-primary">
              Start AI Session
            </Link>
            <Link data-hero-cta to="/library" className="btn-outline">
              Explore Library
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center items-center min-h-[320px]">
          <svg
            ref={ringsRef}
            data-hero-rings
            viewBox="0 0 320 320"
            className="w-full max-w-[380px] opacity-90"
            aria-hidden="true"
          >
            {CHAKRA_RINGS.map((ring) => (
              <circle
                key={ring.r}
                cx="160"
                cy="160"
                r={ring.r}
                fill="none"
                stroke={ring.color}
                strokeWidth="1.5"
                strokeDasharray={ring.dash * 0.72}
                strokeLinecap="round"
                opacity={0.55}
              />
            ))}
            <circle cx="160" cy="160" r="18" fill="#d9a441" opacity="0.85" />
          </svg>
        </div>
      </section>

      <section ref={flowRef} className="px-8 py-16 border-t border-sage/10">
        <h2 className="font-heading text-3xl text-ink mb-2">Today's Highlight</h2>
        <p className="text-ink/60 mb-8">Saptachakra Yatra · 60 min · progressive theta journey</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DAILY_FLOW.map((item) => (
            <div data-flow-item key={item.time} className="card-ambient glass rounded-3xl p-6">
              <p className="uppercase tracking-widest text-ocean text-xs font-semibold">{item.time}</p>
              <p className="font-heading text-xl text-ink mt-2">{item.program}</p>
              <p className="text-ink/60 text-sm">{item.purpose}</p>
              <p className="text-ink/40 text-xs mt-3">{item.freq}</p>
            </div>
          ))}
        </div>
      </section>

      <section ref={pillarsRef} className="px-8 py-16 border-t border-sage/10">
        <h2 className="font-heading text-3xl text-ink mb-8 max-w-xl">
          Four systems, working from the same signal.
        </h2>
        <div className="auto-grid">
          {PILLARS.map((pillar) => (
            <div data-pillar key={pillar.title} className="card">
              <h3 className="font-heading text-xl text-sage mb-2">{pillar.title}</h3>
              <p className="text-ink/70 text-sm leading-relaxed">{pillar.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
