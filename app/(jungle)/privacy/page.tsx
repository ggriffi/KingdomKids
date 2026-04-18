import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Kingdom Kids Safari",
};

export default function PrivacyPage() {
  return (
    <div style={{ padding: "32px 20px", maxWidth: "760px", margin: "0 auto", color: "#fff8e7" }}>

      <h1 style={{ fontSize: "1.8rem", color: "#f5c842", textShadow: "0 2px 8px rgba(0,0,0,0.6)", margin: "0 0 6px", fontFamily: "Georgia, serif", fontWeight: 900 }}>
        🔒 Privacy Policy
      </h1>
      <p style={{ fontSize: "0.78rem", opacity: 0.6, marginBottom: "28px" }}>Last updated: April 2025</p>

      {[
        {
          title: "1. What We Collect",
          body: "When you use our contact form, we collect your name and email address to respond to your message. When you make a purchase, payment information is handled entirely by Stripe — we never see or store your card details.",
        },
        {
          title: "2. How We Use Your Information",
          body: "We use your contact information only to respond to your inquiry or fulfill your order. We do not send marketing emails without your consent, and we never sell your information to anyone.",
        },
        {
          title: "3. Children's Privacy",
          body: "This site is designed for families and children's ministry use. We do not knowingly collect personal information from children under 13 directly. Parents or guardians should supervise any form submissions made by children.",
        },
        {
          title: "4. Cookies",
          body: "This site uses minimal cookies required for basic functionality. We do not use advertising or tracking cookies. Third-party services like Stripe may use their own cookies as required for payment processing.",
        },
        {
          title: "5. Third-Party Services",
          body: "We use Stripe for payment processing and Resend for transactional email. These services have their own privacy policies. We do not share your data with any other third parties.",
        },
        {
          title: "6. Data Security",
          body: "We take reasonable steps to protect your information. All transactions are encrypted via HTTPS. Payment data is handled exclusively by Stripe's PCI-compliant infrastructure.",
        },
        {
          title: "7. Your Rights",
          body: "You may request deletion of any personal data we hold about you by emailing info@kingdomkidssafari.com. We will respond within 30 days.",
        },
        {
          title: "8. Contact",
          body: "Questions about this policy? Email us at info@kingdomkidssafari.com",
        },
      ].map((section, i) => (
        <div key={section.title} style={{
          background: "#fffdf5",
          borderRadius: i % 2 === 0 ? "20px 6px 20px 6px" : "6px 20px 6px 20px",
          border: "2px solid #3d2008",
          boxShadow: "6px 6px 0px rgba(0,0,0,0.25)",
          transform: `rotate(${i % 2 === 0 ? "0.3" : "-0.3"}deg)`,
          padding: "18px 22px",
          marginBottom: "16px",
          color: "#3d2008",
        }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "0.95rem", fontWeight: 900, margin: "0 0 8px", color: "#1a5c22" }}>
            {section.title}
          </h2>
          <p style={{ fontSize: "0.88rem", lineHeight: 1.7, margin: 0 }}>{section.body}</p>
        </div>
      ))}
    </div>
  );
}
