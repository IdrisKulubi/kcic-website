import { MinimalNavbar } from "@/components/layout/MinimalNavbar";
import { Metadata } from "next";
import { colors, typography } from "@/lib/design-system";
import Footer from "@/components/layout/Footer";
import { navData } from "@/lib/navigation";
import { FaLocationDot, FaEnvelope, FaClock } from "react-icons/fa6";
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
      "KCIC Head Office",
      "Mokoyeti Road West, Off Langata Road",
      "Karen, Nairobi, Kenya",
    ],
    color: colors.primary.green.DEFAULT,
  },
  {
  icon: FaEnvelope,
    title: "Email Us",
    details: [
      "General inquiries: info@kenyacic.org",
      "Corporate services: communication@kenyacic.org",
      "Programmes: emmanuel.mwendwa@kenyacic.org",
      "Procurement: procurement@kenyacic.org",
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
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
            style={{
              fontFamily: typography.fonts.heading,
              color: colors.secondary.gray[900],
              lineHeight: 1.1,
            }}
          >
            Let&apos;s Build a Climate Resilient Future Together
          </h1>
          <p
            className="text-base md:text-lg mb-12 max-w-2xl mx-auto"
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
                        className="text-lg font-semibold mb-2"
                        style={{
                          fontFamily: typography.fonts.heading,
                          color: colors.secondary.gray[900],
                        }}
                      >
                        {info.title}
                      </h3>
                      <ul className="space-y-1.5">
                        {info.details.map((detail) => (
                          <li
                            key={detail}
                            className="text-sm"
                            style={{
                              fontFamily: typography.fonts.body,
                              color: colors.secondary.gray[600],
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
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{
                fontFamily: typography.fonts.heading,
                color: colors.secondary.gray[900],
              }}
            >
              Visit Our Innovation Hub in Nairobi
            </h2>
            <p
              className="text-sm md:text-base max-w-2xl mx-auto"
              style={{
                fontFamily: typography.fonts.body,
                color: colors.secondary.gray[600],
                lineHeight: typography.lineHeights.relaxed,
              }}
            >
              Our new KCIC Head Office is located at Mokoyeti Road West, Off
              Langata Road, Karen, Nairobi—our dedicated home reflecting our
              growth into a Pan-African organisation.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200">
            <div className="aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.748551852801!2d36.756033!3d-1.3268312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1b007796da11%3A0x5afbeec418f04606!2sKenya%20Climate%20Innovation%20Center%20(KCIC)%20Head%20Office!5e0!3m2!1sen!2ske!4v1762525310440!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kenya Climate Innovation Centre Head Office location"
              />
            </div>
          </div>
        </div>
      </section>


      <Footer data={homePageData.footer} />
    </div>
  );
}
