import Image from "next/image";
import { Clock3, EyeOff, Images, Layers3 } from "lucide-react";

const challenges = [
  {
    title: "Too Many Photos",
    description: "Large event folders take time to review.",
    Icon: Images,
  },
  {
    title: "Repeated Shots",
    description: "Similar frames make selection repetitive.",
    Icon: Layers3,
  },
  {
    title: "Missed Expressions",
    description: "Closed eyes may be overlooked.",
    Icon: EyeOff,
  },
  {
    title: "Delivery Pressure",
    description: "Manual selection delays the editing workflow.",
    Icon: Clock3,
  },
];

export default function Challenges() {
  return (
    <section className="challenges-section" aria-labelledby="challenges-heading">
      <div className="section-container">
        <div className="challenges-panel">
          <div className="challenge-glow" aria-hidden="true" />
          <Image
            src="/images/sections/challenge-camera.webp"
            alt=""
            width={720}
            height={480}
            sizes="(max-width: 767px) 150px, (max-width: 1023px) 220px, 300px"
            className="challenge-camera"
            aria-hidden="true"
          />
          <div className="challenges-heading-wrap">
            <p className="section-eyebrow section-eyebrow-centered">The Challenge</p>
            <h2 id="challenges-heading">
              You Capture the Memories.
              <br />
              {" "}
              But Who Sorts the Thousands of Photos?
            </h2>
          </div>
          <div className="challenge-cards">
            {challenges.map(({ title, description, Icon }) => (
              <article className="challenge-card" key={title}>
                <Icon aria-hidden="true" className="challenge-card-icon" size={43} strokeWidth={2.1} />
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
