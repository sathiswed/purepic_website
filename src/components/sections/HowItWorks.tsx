import { ArrowRight, Check, Folder, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const steps: { title: string; description: string; Icon: LucideIcon }[] = [
  {
    title: "Choose Your Photos",
    description: "Select the source folder from your wedding, event or studio session.",
    Icon: Folder,
  },
  {
    title: "Run Intelligent Analysis",
    description: "Identify duplicates, evaluate quality, and refine selection with eye-quality analysis.",
    Icon: Sparkles,
  },
  {
    title: "Review and Export",
    description: "Review the suggested selections and access organized output folders.",
    Icon: Check,
  },
];

function WorkflowCard({
  step,
  number,
  isLast,
}: {
  step: (typeof steps)[number];
  number: number;
  isLast: boolean;
}) {
  const { title, description, Icon } = step;

  return (
    <li className="how-step">
      <div className="how-step-card">
        <div className="how-step-top">
          <span className="how-step-number" aria-label={`Step ${number}`}>
            {number}
          </span>
          <Icon className="how-step-icon" size={48} strokeWidth={1.8} aria-hidden="true" />
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {!isLast && <ArrowRight className="how-step-arrow" size={30} strokeWidth={2.5} aria-hidden="true" />}
    </li>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-section" aria-labelledby="how-heading">
      <div className="how-container">
        <div className="how-intro">
          <p className="how-eyebrow">How It Works</p>
          <h2 id="how-heading">From Thousands of Photos to a Smarter Shortlist.</h2>
        </div>
        <ol className="how-steps">
          {steps.map((step, index) => (
            <WorkflowCard
              key={step.title}
              step={step}
              number={index + 1}
              isLast={index === steps.length - 1}
            />
          ))}
        </ol>
      </div>
      <svg className="how-wave" viewBox="0 0 1440 180" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 36C214 10 325 113 612 125C864 135 1054 125 1440 48V180H0Z" fill="#e9f4ff" />
        <path d="M0 98C221 69 350 150 621 158C929 168 1131 132 1440 91V180H0Z" fill="url(#how-wave-fade)" />
        <defs>
          <linearGradient id="how-wave-fade" x1="0" x2="0" y1="0" y2="1">
            <stop stopColor="#f7fbff" stopOpacity="0.72" />
            <stop offset="1" stopColor="#ffffff" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
}
