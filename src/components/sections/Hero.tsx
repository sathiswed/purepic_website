import Image from "next/image";
import { ArrowRight, HardDrive, Monitor, Play, ShieldCheck } from "lucide-react";
import { DemoTrigger } from "../demo/DemoModal";

const highlights = [
  { label: "Windows Desktop App", Icon: Monitor },
  { label: "Local Processing", Icon: HardDrive },
  { label: "Your Photos Stay with You", Icon: ShieldCheck },
];

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-photo">
        <Image
          src="/images/hero/wedding-photographer-purepic.webp"
          alt="PurePic photographer covering an Indian wedding with the selection app open on a laptop"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
      </div>
      <div className="hero-shade" aria-hidden="true" />

      <div className="site-container hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow">AI-Powered Photo Selection</p>
          <h1 id="hero-heading" className="hero-title">
            <span>Capture Every Moment.</span>
            <span>
              Let AI <em>Find the Best.</em>
            </span>
          </h1>
          <p className="hero-description">
            The smarter way to shortlist your photos. PurePic helps professional photographers
            identify duplicates, blurry shots, and closed-eye photos, so you can deliver stunning
            albums faster.
          </p>
          <div className="hero-actions">
            <DemoTrigger className="button button-primary hero-primary">
              Get Free Demo <ArrowRight aria-hidden="true" size={21} />
            </DemoTrigger>
            <a href="#how-it-works" className="button button-outline hero-secondary">
              <Play aria-hidden="true" size={19} fill="currentColor" /> Watch How It Works
            </a>
          </div>
          <ul className="hero-highlights" aria-label="PurePic highlights">
            {highlights.map(({ label, Icon }) => (
              <li key={label}>
                <Icon aria-hidden="true" size={22} strokeWidth={1.8} />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <svg className="hero-wave" viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 160C330 160 570 158 760 154C965 149 1085 130 1220 84C1320 51 1390 26 1440 18V160H0Z" fill="var(--purepic-orange-accent)" />
        <path d="M0 160C380 160 610 160 790 158C1005 154 1140 131 1270 103C1350 86 1395 82 1440 82V160H0Z" fill="var(--purepic-white)" />
      </svg>
    </section>
  );
}
