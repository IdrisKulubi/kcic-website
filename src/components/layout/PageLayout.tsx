'use client';

import React from 'react';
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
}

export function PageLayout({ 
  children, 
  title, 
  subtitle, 
  description, 
  breadcrumb,
  className = ""
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <MinimalNavbar {...navData} />
      
      {/* Page Header */}
      <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 pt-20 sm:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Breadcrumb */}
          {breadcrumb && (
            <motion.nav 
              className="mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              aria-label="Breadcrumb"
            >
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <a href="/" className="hover:text-green-600 transition-colors duration-200">
                    Home
                  </a>
                </li>
                {breadcrumb.map((item, index) => (
                  <React.Fragment key={index}>
                    <li className="flex items-center">
                      <svg
                        className="flex-shrink-0 w-4 h-4 text-gray-400 mx-2"
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
                        <a 
                          href={item.href} 
                          className="hover:text-green-600 transition-colors duration-200"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <span className="text-gray-900 font-medium">{item.label}</span>
                      )}
                    </li>
                  </React.Fragment>
                ))}
              </ol>
            </motion.nav>
          )}

          {/* Page Title */}
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {title}
            </h1>
            {subtitle && (
              <h2 className="text-xl sm:text-2xl text-green-600 font-semibold mb-4">
                {subtitle}
              </h2>
            )}
            {description && (
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
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