"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";
import { useRef, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  status: "draft" | "verified";
  role?: string;
  avatarSrc?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "PurePic helps us simplify photo selection and spend more time on editing and delivering beautiful memories to our clients.",
    name: "Gokul Studio",
    status: "draft",
  },
];
const demoVideoUrl = process.env.NEXT_PUBLIC_PUREPIC_DEMO_VIDEO_URL ?? "";
const hasDemoVideo = /^(?:\/|https:\/\/).+\.(?:mp4|webm)(?:\?.*)?$/i.test(demoVideoUrl);

function TestimonialArea() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonial = testimonials[activeIndex];

  return (
    <aside id="testimonials" className="testimonial-area" aria-labelledby="testimonials-heading">
      <h2 id="testimonials-heading" className="demo-eyebrow">What Photographers Say</h2>
      {testimonial ? (
        <div className="testimonial-content" aria-live="polite">
          {testimonial.status === "draft" && (
            <span className="testimonial-draft">Proposed quote</span>
          )}
          <blockquote>“{testimonial.quote}”</blockquote>
          <div className="testimonial-bottom">
            <div className="testimonial-person">
              {testimonial.avatarSrc && testimonial.status === "verified" && (
                <Image src={testimonial.avatarSrc} alt="" width={54} height={54} />
              )}
              <p>
                <strong>{testimonial.name}</strong>
                {testimonial.role && <span>{testimonial.role}</span>}
              </p>
            </div>
            {testimonials.length > 1 && (
              <div className="testimonial-controls" aria-label="Testimonial controls">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => setActiveIndex((index) => (index - 1 + testimonials.length) % testimonials.length)}
                >
                  <ArrowLeft aria-hidden="true" size={21} />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => setActiveIndex((index) => (index + 1) % testimonials.length)}
                >
                  <ArrowRight aria-hidden="true" size={21} />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </aside>
  );
}

export default function ProductDemo() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function closeVideo() {
    videoRef.current?.pause();
    dialogRef.current?.close();
  }

  return (
    <section className="product-demo-section" aria-labelledby="product-demo-heading">
      <div className="demo-container demo-layout">
        <div className="demo-panel">
          <div className="demo-thumbnail">
            <Image
              src="/images/demo/photographer-demo-thumbnail.webp"
              alt="Photographer working with a camera on a tripod"
              fill
              sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1199px) 42vw, 330px"
            />
            <span className={`demo-play ${hasDemoVideo ? "" : "demo-play-unavailable"}`} aria-hidden="true">
              <Play size={27} fill="currentColor" />
            </span>
            {!hasDemoVideo && <span className="demo-coming-soon">Coming Soon</span>}
          </div>
          <div className="demo-panel-copy">
            <p className="demo-eyebrow">Product Demo</p>
            <h2 id="product-demo-heading">See PurePic in Action.</h2>
            <p>
              Watch how PurePic helps transform a large photo folder into a manageable shortlist.
            </p>
            <button
              ref={triggerRef}
              type="button"
              className="demo-watch-button"
              disabled={!hasDemoVideo}
              aria-describedby={!hasDemoVideo ? "demo-unavailable-note" : undefined}
              onClick={() => dialogRef.current?.showModal()}
            >
              {hasDemoVideo ? "Watch Demo" : "Demo Coming Soon"} <ArrowRight aria-hidden="true" size={19} />
            </button>
            {!hasDemoVideo && (
              <span id="demo-unavailable-note" className="demo-unavailable-note">
                Video preview will be available here.
              </span>
            )}
          </div>
        </div>
        <TestimonialArea />
      </div>

      {hasDemoVideo && (
        <dialog
          ref={dialogRef}
          className="demo-dialog"
          aria-label="PurePic product demo video"
          onClose={() => {
            videoRef.current?.pause();
            triggerRef.current?.focus();
          }}
        >
          <button type="button" className="demo-dialog-close" aria-label="Close video" onClick={closeVideo}>
            <X aria-hidden="true" size={23} />
          </button>
          <video ref={videoRef} src={demoVideoUrl} controls playsInline preload="none">
            Your browser does not support video playback.
          </video>
        </dialog>
      )}
    </section>
  );
}
