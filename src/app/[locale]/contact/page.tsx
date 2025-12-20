import { MinimalNavbar } from "@/components/layout/MinimalNavbar";
import { Metadata } from "next";
import { colors, typography } from "@/lib/design-system";
import Footer from "@/components/layout/Footer";
import { navData } from "@/lib/navigation";
import { FaLocationDot, FaPhone, FaEnvelope, FaClock } from "react-icons/fa6";
import { homePageData } from "@/data/home";

export const metadata: Metadata = {
  title: "Contact KCIC - Get in Touch with Our Team",
  description:
    "Contact Kenya Climate Innovation Centre. Reach out to learn about our programs, partnerships, or climate innovation opportunities.",
};

const contactInfo = [
  {
  icon: FaLocationDot,
    title: "Visit Us",
    details: [
      "Kenya Climate Innovation Centre",
      "Strathmore University Campus",
      "Ole Sangale Road, Madaraka",
      "Nairobi, Kenya",
    ],
    color: colors.primary.green.DEFAULT,
  },
  {
  icon: FaPhone,
    title: "Call Us",
    details: [
      "+254 703 034 701",
      "Mon - Fri: 8:00 AM - 5:00 PM",
      "EAT (UTC+3)",
    ],
    color: colors.primary.blue.DEFAULT,
  },
  {
  icon: FaEnvelope,
    title: "Email Us",
    details: [
      "info@kenyacic.org",
      "programs@kenyacic.org",
      "partnerships@kenyacic.org",
      "media@kenyacic.org",
    ],
    color: colors.primary.green.DEFAULT,
  },
  {
  icon: FaClock,
    title: "Office Hours",
    details: [
      "Monday - Friday",
      "8:00 AM - 5:00 PM",
      "East Africa Time (EAT)",
      "UTC+3",
    ],
    color: colors.primary.blue.DEFAULT,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <MinimalNavbar {...navData} />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-32 pb-24 bg-linear-to-b from-green-50 via-white to-white">
        <div className="absolute inset-x-0 top-10 flex justify-center pointer-events-none">
          <div
            className="h-32 w-32 rounded-full blur-3xl opacity-60"
            style={{ backgroundColor: colors.primary.green[200] }}
          />
        </div>
        <div className="max-w-5xl mx-auto text-center relative">
          <span
            className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full text-sm"
            style={{
              backgroundColor: colors.primary.green[100],
              color: colors.primary.green[700],
              fontFamily: typography.fonts.body,
            }}
          >
            Kenya Climate Innovation Centre
          </span>
          <h1
            className="font-bold mb-6"
            style={{
              fontSize: "clamp(2.75rem, 7vw, 4.75rem)",
              fontFamily: typography.fonts.heading,
              color: colors.secondary.gray[900],
              lineHeight: typography.lineHeights.tight,
            }}
          >
            Let&apos;s Build a Climate Resilient Future Together
          </h1>
          <p
            className="text-xl mb-12 max-w-3xl mx-auto"
            style={{
              fontFamily: typography.fonts.body,
              color: colors.secondary.gray[600],
              lineHeight: typography.lineHeights.relaxed,
            }}
          >
            Have a question about our programmes, investment opportunities, or
            collaboration? Reach out and our team will connect you with the
            right people.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            {contactInfo.map((info) => {
              const IconComponent = info.icon;
              return (
                <div
                  key={info.title}
                  className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start gap-5">
                    <div
                      className="h-12 w-12 shrink-0 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: info.color + "1A" }}
                    >
                      <IconComponent
                        className="h-6 w-6"
                        style={{ color: info.color }}
                      />
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-3"
                        style={{
                          fontSize: typography.sizes.heading.h4[0],
                          fontFamily: typography.fonts.heading,
                          color: colors.secondary.gray[900],
                        }}
                      >
                        {info.title}
                      </h3>
                      <ul className="space-y-2">
                        {info.details.map((detail) => (
                          <li
                            key={detail}
                            style={{
                              fontFamily: typography.fonts.body,
                              color: colors.secondary.gray[600],
                              fontSize: typography.sizes.body.sm[0],
                            }}
                          >
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="font-bold mb-4"
              style={{
                fontSize: typography.sizes.heading.h2[0],
                fontFamily: typography.fonts.heading,
                color: colors.secondary.gray[900],
              }}
            >
              Visit Our Innovation Hub in Nairobi
            </h2>
            <p
              className="max-w-3xl mx-auto"
              style={{
                fontFamily: typography.fonts.body,
                color: colors.secondary.gray[600],
                lineHeight: typography.lineHeights.relaxed,
              }}
            >
              We&apos;re located within Strathmore University&apos;s campus—easily
              accessible and surrounded by a community of innovators,
              investors, and sustainability leaders.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200">
            <div className="aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7752656026228!2d36.81002607569015!3d-1.3101592356541791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10f7bbc30573%3A0xb822a84e63d8c610!2sKenya%20Climate%20Innovation%20Center!5e0!3m2!1sen!2ske!4v1762525310440!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kenya Climate Innovation Centre location"
              />
            </div>
          </div>
        </div>
      </section>


      <Footer data={homePageData.footer} />
    </div>
  );
}
