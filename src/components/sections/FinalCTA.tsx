import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { DemoTrigger } from "../demo/DemoModal";

const supportNumber = process.env.PUREPIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";
const supportHref = /^\d{10,15}$/.test(supportNumber) ? `https://wa.me/${supportNumber}` : null;

export default function FinalCTA() {
  return (
    <section className="final-cta" aria-labelledby="final-cta-heading">
      <Image
        src="/images/cta/photographer-sunset.webp"
        alt="Photographer silhouetted against a mountain sunset"
        fill
        sizes="100vw"
        className="final-cta-image"
      />
      <div className="final-cta-shade" aria-hidden="true" />
      <div className="demo-container final-cta-inner">
        <div className="final-cta-copy">
          <h2 id="final-cta-heading">Your Time Belongs Behind the Camera.</h2>
          <p>
            Let PurePic handle repetitive photo selection work so you can focus on shooting,
            editing, and delivering unforgettable memories.
          </p>
        </div>
        <div className="final-cta-actions">
          <DemoTrigger className="final-cta-button final-cta-primary">
            Get Free Demo <ArrowRight aria-hidden="true" size={21} />
          </DemoTrigger>
          {supportHref ? (
            <a href={supportHref} className="final-cta-button final-cta-whatsapp" target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden="true" size={20} /> WhatsApp Us
            </a>
          ) : (
            <button type="button" className="final-cta-button final-cta-whatsapp final-cta-unavailable" disabled>
              <MessageCircle aria-hidden="true" size={20} /> WhatsApp Us
              <span>Coming soon</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
