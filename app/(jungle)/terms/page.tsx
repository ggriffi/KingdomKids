import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for Kingdom Kids Safari",
};

export default function TermsPage() {
  return (
    <div style={{ padding: "32px 20px", maxWidth: "760px", margin: "0 auto", color: "#fff8e7" }}>

      <h1 style={{ fontSize: "1.8rem", color: "#f5c842", textShadow: "0 2px 8px rgba(0,0,0,0.6)", margin: "0 0 6px", fontFamily: "Georgia, serif", fontWeight: 900 }}>
        📜 Terms of Use
      </h1>
      <p style={{ fontSize: "0.78rem", opacity: 0.6, marginBottom: "28px" }}>Last updated: April 2025</p>

      {[
        {
          title: "1. Use of This Site",
          body: "Kingdom Kids Safari is a children's ministry resource website. By accessing this site you agree to use it only for lawful, family-friendly purposes. Content is intended for churches, educators, parents, and children.",
        },
        {
          title: "2. Intellectual Property",
          body: "All content on this site — including characters, artwork, curriculum materials, music, and videos — is the property of Kingdom Kids Safari. You may not reproduce, sell, or distribute any content without prior written permission.",
        },
        {
          title: "3. Purchases",
          body: "Digital and physical products are sold through our secure Stripe-powered checkout. All sales are final unless the product is defective or not delivered. Contact us at info@kingdomkidssafari.com for any order issues.",
        },
        {
          title: "4. Contact Form",
          body: "Information submitted through the contact form is used solely to respond to your inquiry. We do not sell or share your information with third parties.",
        },
        {
          title: "5. Disclaimer",
          body: "This site is provided \"as is\" without warranties of any kind. Kingdom Kids Safari is not liable for any damages arising from use of the site or its content.",
        },
        {
          title: "6. Changes",
          body: "We may update these terms at any time. Continued use of the site after changes are posted means you accept the updated terms.",
        },
        {
          title: "7. Contact",
          body: "Questions about these terms? Reach us at info@kingdomkidssafari.com",
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
