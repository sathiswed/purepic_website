import { BadgeCheck, Clock3, FolderOpen, Monitor, SlidersHorizontal, Wrench } from "lucide-react";

const benefits = [
  {
    title: "Save Time",
    description: "Reduce repetitive shortlisting work.",
    Icon: Clock3,
  },
  {
    title: "Consistent Quality",
    description: "Apply systematic photo-quality analysis.",
    Icon: BadgeCheck,
  },
  {
    title: "Fewer Corrections",
    description: "Identify potential quality issues earlier.",
    Icon: Wrench,
  },
  {
    title: "Organized Results",
    description: "Keep selections simple and structured.",
    Icon: FolderOpen,
  },
  {
    title: "Easy Workflow",
    description: "Straightforward desktop photo selection.",
    Icon: Monitor,
  },
  {
    title: "Stay in Control",
    description: "You make the final selection.",
    Icon: SlidersHorizontal,
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="benefits-section" aria-labelledby="benefits-heading">
      <div className="benefits-panel">
        <div className="uc-container benefits-layout">
          <div className="benefits-intro">
            <p className="uc-eyebrow">Why Photographers Love PurePic</p>
            <h2 id="benefits-heading">Less Manual Work. More Creative Freedom.</h2>
          </div>
          <div className="benefits-grid">
            {benefits.map(({ title, description, Icon }) => (
              <div className="benefit-item" key={title}>
                <Icon aria-hidden="true" size={38} strokeWidth={1.9} />
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
