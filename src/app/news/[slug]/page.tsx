"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  Download,
  Printer,
  Share2,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Loader2,
} from "lucide-react";
import { RichTextDisplay } from "@/components/admin/rich-text-display";
import { getNewsArticleBySlug, type NewsData } from "@/lib/actions/news";
import { showErrorToast } from "@/lib/toast";

export default function NewsArticlePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [article, setArticle] = useState<NewsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const loadArticle = async () => {
      setIsLoading(true);
      const result = await getNewsArticleBySlug(slug);

      if (result.success && result.data) {
        setArticle(result.data);
      } else {
        showErrorToast("Article not found", "The requested article could not be found");
        router.push("/");
      }

      setIsLoading(false);
    };

    loadArticle();
  }, [slug, router]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Use browser's native print-to-PDF functionality
    // This is the most reliable method and handles all CSS/colors properly
    window.print();
  };

  const handleShare = (platform: string) => {
    if (!article) return;

    const url = window.location.href;
    const text = article.title;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } else {
      window.open(shareUrls[platform as keyof typeof shareUrls], "_blank");
    }

    setShowShareMenu(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          body {
            background: white;
          }
          @page {
            margin: 2cm;
          }
        }
        .print-only {
          display: none;
        }
      `}</style>

      <div className="min-h-screen bg-gray-50">
        {/* Header Actions - Hidden on Print */}
        <div className="no-print sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>

              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="flex items-center gap-2"
                  title="Save as PDF using your browser's print dialog"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Save PDF</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrint}
                  className="flex items-center gap-2"
                >
                  <Printer className="h-4 w-4" />
                  <span className="hidden sm:inline">Print</span>
                </Button>
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Share</span>
                  </Button>

                  {showShareMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <button
                        onClick={() => handleShare("facebook")}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Facebook className="h-4 w-4 text-blue-600" />
                        Facebook
                      </button>
                      <button
                        onClick={() => handleShare("twitter")}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Twitter className="h-4 w-4 text-sky-500" />
                        Twitter
                      </button>
                      <button
                        onClick={() => handleShare("linkedin")}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Linkedin className="h-4 w-4 text-blue-700" />
                        LinkedIn
                      </button>
                      <button
                        onClick={() => handleShare("email")}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4 text-gray-600" />
                        Email
                      </button>
                      <Separator className="my-2" />
                      <button
                        onClick={() => handleShare("copy")}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                      >
                        Copy Link
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Print Header */}
          <div className="print-only mb-8">
            <h1 className="text-2xl font-bold mb-2">Kenya Climate Innovation Center</h1>
            <p className="text-sm text-gray-600">www.kenyacic.org</p>
            <Separator className="my-4" />
          </div>

          {/* Category Badge */}
          <Badge className="mb-4">{article.category}</Badge>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            {article.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </div>
            )}
          </div>

          <Separator className="mb-8" />

          {/* Featured Image */}
          {article.thumbnail && (
            <div className="relative w-full h-96 mb-12 rounded-xl overflow-hidden">
              <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {article.content ? (
              <RichTextDisplay content={article.content} />
            ) : (
              <p className="text-gray-600">{article.excerpt}</p>
            )}
          </div>

          {/* Footer */}
          <Separator className="my-12" />

          <div className="no-print">
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Share this article</h3>
              <p className="text-gray-600 mb-4">
                Help spread the word about climate innovation
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("facebook")}
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("twitter")}
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("linkedin")}
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare("email")}
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Print Footer */}
          <div className="print-only mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              This article was downloaded from Kenya Climate Innovation Center
            </p>
            <p className="text-sm text-gray-600">
              Visit us at: www.kenyacic.org
            </p>
            <p className="text-sm text-gray-600">
              Published: {new Date(article.publishedAt).toLocaleDateString()}
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
