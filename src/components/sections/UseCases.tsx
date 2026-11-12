import Image from "next/image";

const useCases = [
  {
    title: "Wedding Photographers",
    description: "Quickly shortlist the best shots from large wedding folders.",
    image: "/images/use-cases/wedding-photographers.webp",
    alt: "Indian bride and groom together in a sunlit garden",
  },
  {
    title: "Event & Candid Photographers",
    description: "Find sharp, expressive photos from events, parties and celebrations.",
    image: "/images/use-cases/event-candid-photographers.webp",
    alt: "Friends laughing and dancing at an evening celebration",
  },
  {
    title: "Studio Photographers",
    description: "Speed up client selection from studio shoots and family portraits.",
    image: "/images/use-cases/studio-photographers.webp",
    alt: "Family of three smiling for a studio portrait",
  },
  {
    title: "Photo & Media Teams",
    description: "Manage high-volume images with consistent, quality-focused selection.",
    image: "/images/use-cases/photo-media-teams.webp",
    alt: "Photography team reviewing images together at an event",
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="use-cases-section" aria-labelledby="use-cases-heading">
      <div className="uc-container use-cases-layout">
        <div className="use-cases-intro">
          <p className="uc-eyebrow">Use Cases</p>
          <h2 id="use-cases-heading">Built for Photographers Who Capture More.</h2>
        </div>
        <div className="use-cases-grid">
          {useCases.map(({ title, description, image, alt }) => (
            <article className="use-case-card" key={title}>
              <div className="use-case-image">
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 1100px) calc((100vw - 64px) / 2), 230px"
                />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
