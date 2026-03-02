'use client';

import React from 'react';
import Link from 'next/link';
import { MinimalNavbar } from './MinimalNavbar';
import Footer from './Footer';
import { navData } from '@/lib/navigation';
import { homePageData } from '@/data/home';
import { motion } from 'framer-motion';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  breadcrumb?: Array<{ label: string; href?: string }>;
  className?: string;
  headerBackgroundImage?: string;
  headerOverlayClassName?: string;
  headerTitleClassName?: string;
  headerSubtitleClassName?: string;
  headerDescriptionClassName?: string;
  headerBreadcrumbClassName?: string;
}

export function PageLayout({ 
  children, 
  title, 
  subtitle, 
  description, 
  breadcrumb,
  className = "",
  headerBackgroundImage,
  headerOverlayClassName = "bg-black/50",
  headerTitleClassName,
  headerSubtitleClassName,
  headerDescriptionClassName,
  headerBreadcrumbClassName
}: PageLayoutProps) {
  const headerIsImage = Boolean(headerBackgroundImage);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <MinimalNavbar {...navData} />
      
      {/* Page Header */}
      <div className={`relative ${
        headerIsImage
          ? "mt-16 sm:mt-20 pt-8 sm:pt-10 overflow-hidden"
          : "pt-20 sm:pt-24"
      }`}>
        {headerBackgroundImage ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${headerBackgroundImage}')` }}
              aria-hidden="true"
            />
            <div className={`absolute inset-0 ${headerOverlayClassName}`} aria-hidden="true" />
          </>
        ) : (
          <div
            className="absolute inset-0 bg-linear-to-br from-green-50 via-blue-50 to-purple-50"
            aria-hidden="true"
          />
        )}

        <div
          className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
            headerIsImage ? "py-16 sm:py-24" : "py-12 sm:py-16"
          }`}
        >
          {/* Breadcrumb */}
          {breadcrumb && (
            <motion.nav 
              className={headerIsImage ? "mb-10 sm:mb-12" : "mb-8"}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              aria-label="Breadcrumb"
            >
              <ol className={`flex items-center space-x-2 text-sm ${
                headerBackgroundImage ? "text-white/80" : "text-gray-600"
              } ${headerBreadcrumbClassName ?? ""}`}>
                <li>
                  <Link
                    href="/"
                    className={`transition-colors duration-200 ${
                      headerBackgroundImage ? "hover:text-white" : "hover:text-green-600"
                    }`}
                  >
                    Home
                  </Link>
                </li>
                {breadcrumb.map((item, index) => (
                  <React.Fragment key={index}>
                    <li className="flex items-center">
                      <svg
                        className="shrink-0 w-4 h-4 text-gray-400 mx-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {item.href ? (
                        <Link 
                          href={item.href} 
                          className={`transition-colors duration-200 ${
                            headerBackgroundImage ? "hover:text-white" : "hover:text-green-600"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className={`font-medium ${headerBackgroundImage ? "text-white" : "text-gray-900"}`}>
                          {item.label}
                        </span>
                      )}
                    </li>
                  </React.Fragment>
                ))}
              </ol>
            </motion.nav>
          )}

          {/* Page Title */}
          <motion.div 
            className={`text-center max-w-4xl mx-auto ${headerIsImage ? "pb-4 sm:pb-6" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${
              headerBackgroundImage ? "text-white" : "text-gray-900"
            } ${headerTitleClassName ?? ""}`}>
              {title}
            </h1>
            {subtitle && (
              <h2 className={`text-xl sm:text-2xl font-semibold mb-4 ${
                headerBackgroundImage ? "text-green-200" : "text-green-600"
              } ${headerSubtitleClassName ?? ""}`}>
                {subtitle}
              </h2>
            )}
            {description && (
              <p className={`text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto ${
                headerBackgroundImage ? "text-white/90" : "text-gray-600"
              } ${headerDescriptionClassName ?? ""}`}>
                {description}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Page Content */}
      <motion.main 
        className={`flex-1 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {children}
      </motion.main>

      {/* Footer */}
      <Footer data={homePageData.footer} />
    </div>
  );
}