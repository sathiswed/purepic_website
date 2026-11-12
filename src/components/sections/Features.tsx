import Image from "next/image";
import {
  EyeOff,
  FolderOpen,
  Layers3,
  LayoutGrid,
  ListChecks,
  Monitor,
  Scan,
  ScanFace,
} from "lucide-react";

const features = [
  {
    title: "Duplicate Detection",
    description: "Identify similar photos and reduce repetitive selection.",
    Icon: Layers3,
  },
  {
    title: "Sharpness & Blur Analysis",
    description: "Compare image clarity and prioritize stronger photos.",
    Icon: Scan,
  },
  {
    title: "Closed-Eye Detection",
    description: "Flag potential closed-eye expressions.",
    Icon: EyeOff,
  },
  {
    title: "Two-Step Selection",
    description: "Preliminary quality selection followed by eye-quality refinement.",
    Icon: ListChecks,
  },
  {
    title: "Face Quality Review",
    description: "Inspect face-related selection results when needed.",
    Icon: ScanFace,
  },
  {
    title: "Organized Export",
    description: "Keep shortlisted and rejected photos in separate folders.",
    Icon: FolderOpen,
  },
  {
    title: "Local Processing",
    description: "Analyze photos on your Windows computer without uploading.",
    Icon: Monitor,
  },
  {
    title: "Project Management",
    description: "Manage selections separately for each event.",
    Icon: LayoutGrid,
  },
];

export default function Features() {
  return (
    <section id="features" className="features-section" aria-labelledby="features-heading">
      <div className="features-light" aria-hidden="true" />
      <div className="features-container">
        <div className="features-intro">
          <p className="features-eyebrow">Core Features</p>
          <h2 id="features-heading">Smart Features for Smarter Photo Selection</h2>
          <p className="features-description">
            AI-powered tools designed around real photography workflows.
          </p>
          <div className="features-lens" aria-hidden="true">
            <Image
              src="/images/features/cinematic-dslr-lens.webp"
              alt=""
              width={1440}
              height={720}
              sizes="(max-width: 767px) 360px, (max-width: 1199px) 440px, 720px"
            />
          </div>
        </div>

        <div className="features-grid">
          {features.map(({ title, description, Icon }) => (
            <article className="feature-card" key={title}>
              <Icon className="feature-card-icon" aria-hidden="true" size={42} strokeWidth={1.9} />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
