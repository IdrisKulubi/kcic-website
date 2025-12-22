import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { listNews } from "@/lib/actions/news";
import Image from "next/image";

// Removed placeholder stories data - now using real news articles from database
export default async function StoriesPage() {
  // Fetch news articles from database
  const result = await listNews({ limit: 20 });
  const articles = result.success ? result.data?.articles || [] : [];

  // Helper function to format date
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <PageLayout
      title="Impact Stories"
      subtitle="Celebrating climate innovation success"
      description="Discover inspiring stories of entrepreneurs who are transforming Kenya's climate landscape through innovation, determination, and KCIC's support."
      breadcrumb={[{ label: "Impact", href: "/impact" }, { label: "Stories" }]}
    >
      <div className="py-16">
        {/* Stories Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No stories available at the moment.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Check back soon for inspiring climate innovation stories!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                >
                  {/* Article Header with Image - Fixed Height */}
                  <div className="relative h-48 flex-shrink-0 overflow-hidden bg-gradient-to-br from-green-400 to-blue-500">
                    {article.thumbnail ? (
                      <>
                        <Image
                          src={article.thumbnail}
                          alt={article.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          priority={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500"></div>
                    )}
                    <div className="absolute top-3 right-3 z-20">
                      <span className="px-3 py-1 bg-white bg-opacity-95 text-gray-800 text-xs font-semibold rounded-full shadow-sm">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Article Content - Flexible Height */}
                  <div className="p-5 flex flex-col flex-grow">
                    {/* Title - Fixed Height with Line Clamp */}
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
                      {article.title}
                    </h3>

                    {/* Date and Read Time */}
                    <div className="flex items-center text-xs text-gray-500 mb-4">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      <span>{formatDate(article.publishedAt)}</span>
                      {article.readTime && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{article.readTime}</span>
                        </>
                      )}
                    </div>

                    {/* Excerpt - Fixed Height with Line Clamp */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3 flex-grow">
                      {article.excerpt}
                    </p>

                    {/* Read More Button - Always at Bottom */}
                    <Link
                      href={`/news/${article.slug}`}
                      className="w-full bg-green-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center text-sm mt-auto"
                    >
                      Read Full Story
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="text-center bg-green-50 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our community of climate innovators and let us help you
              transform your idea into impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/programmes"
                className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Explore Our Programmes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
