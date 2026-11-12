import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  HardDrive,
  Instagram,
  Linkedin,
  LockKeyhole,
  Monitor,
  Youtube,
} from "lucide-react";

function validHttpsUrl(value: string | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

const socialLinks = [
  { label: "YouTube", Icon: Youtube, href: validHttpsUrl(process.env.PUREPIC_YOUTUBE_URL) },
  { label: "Instagram", Icon: Instagram, href: validHttpsUrl(process.env.PUREPIC_INSTAGRAM_URL) },
  { label: "Facebook", Icon: Facebook, href: validHttpsUrl(process.env.PUREPIC_FACEBOOK_URL) },
  { label: "LinkedIn", Icon: Linkedin, href: validHttpsUrl(process.env.PUREPIC_LINKEDIN_URL) },
].flatMap(({ href, ...item }) => (href ? [{ ...item, href }] : []));

const supportNumber = process.env.PUREPIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";
const whatsappUrl = /^\d{10,15}$/.test(supportNumber) ? `https://wa.me/${supportNumber}` : null;
const supportUrl = validHttpsUrl(process.env.PUREPIC_SUPPORT_URL) ?? whatsappUrl;
const contactUrl = validHttpsUrl(process.env.PUREPIC_CONTACT_URL) ?? whatsappUrl;
const userGuideUrl = validHttpsUrl(process.env.PUREPIC_USER_GUIDE_URL);

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-columns">
          <div className="footer-column footer-brand">
            <Link href="/" className="footer-logo-link" aria-label="PurePic home">
              <Image
                src="/images/brand/purepic-logo.png"
                alt="PurePic AI Photo Selection"
                width={300}
                height={93}
              />
            </Link>
            <p>
              AI-powered photo selection for photographers. Shortlist faster, maintain quality, and
              deliver more.
            </p>
            {socialLinks.length > 0 && (
              <div className="footer-social" aria-label="PurePic social media">
                {socialLinks.map(({ label, Icon, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon aria-hidden="true" size={21} strokeWidth={2} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <nav className="footer-column footer-links" aria-labelledby="footer-product-heading">
            <h2 id="footer-product-heading">Product</h2>
            <a href="/#features">Features</a>
            <a href="/#how-it-works">How It Works</a>
            <a href="/#use-cases">Use Cases</a>
            <a href="/#benefits">Benefits</a>
          </nav>

          <nav className="footer-column footer-links" aria-labelledby="footer-resources-heading">
            <h2 id="footer-resources-heading">Resources</h2>
            <a href="/#product-demo">Product Demo</a>
            {userGuideUrl && <a href={userGuideUrl} target="_blank" rel="noopener noreferrer">User Guide</a>}
            {supportUrl && <a href={supportUrl} target="_blank" rel="noopener noreferrer">Support</a>}
          </nav>

          <nav className="footer-column footer-links" aria-labelledby="footer-company-heading">
            <h2 id="footer-company-heading">Company</h2>
            <a href="/#about-purepic">About PurePic</a>
            {contactUrl && <a href={contactUrl} target="_blank" rel="noopener noreferrer">Contact Us</a>}
          </nav>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} PurePic. All rights reserved.</p>
          <ul className="footer-trust" aria-label="PurePic trust highlights">
            <li><Monitor aria-hidden="true" size={21} /> Windows Desktop App</li>
            <li><HardDrive aria-hidden="true" size={21} /> Local Processing</li>
            <li><LockKeyhole aria-hidden="true" size={21} /> Your Photos Stay with You</li>
          </ul>
        </div>
      </div>
      <svg className="footer-wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 46C219 1 449 18 690 64C891 101 1097 80 1239 49C1323 30 1381 33 1440 42V90H0Z" fill="var(--purepic-soft-peach)" />
      </svg>
    </footer>
  );
}
