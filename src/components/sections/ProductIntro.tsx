import Image from "next/image";
import { Layers3, SlidersHorizontal, Zap } from "lucide-react";

const benefits = [
  {
    title: "Faster Shortlisting",
    description: "Spend less time on manual comparisons.",
    Icon: Zap,
  },
  {
    title: "Better Photo Quality",
    description: "Focus on the best moments.",
    Icon: Layers3,
  },
  {
    title: "You Stay in Control",
    description: "Review and choose your final selection.",
    Icon: SlidersHorizontal,
  },
];

export default function ProductIntro() {
  return (
    <section className="product-intro" aria-labelledby="product-intro-heading">
      <div className="section-container product-intro-grid">
        <div className="product-visual">
          <Image
            src="/images/product/purepic-wedding-dashboard.webp"
            alt="PurePic dashboard showing the Rahul_Anitha wedding photo selection workflow on a laptop"
            width={1774}
            height={887}
            sizes="(max-width: 900px) calc(100vw - 40px), (max-width: 1280px) 48vw, 620px"
            className="product-dashboard"
          />
        </div>
        <div className="product-copy">
          <p className="section-eyebrow section-eyebrow-left">Meet PurePic</p>
          <h2 id="product-intro-heading">Your Intelligent Photo Selection Assistant</h2>
          <p className="product-description">
            A Windows desktop application designed for photographers. Use AI-powered analysis to
            identify duplicates, find sharper photos, and flag closed-eye expressions — all in a
            simple workflow you control.
          </p>
          <div className="product-benefits">
            {benefits.map(({ title, description, Icon }) => (
              <div className="product-benefit" key={title}>
                <span className="product-benefit-icon">
                  <Icon aria-hidden="true" size={29} strokeWidth={2.2} />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
