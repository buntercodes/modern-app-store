"use client";

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  // Generate structured data for SEO
  const breadcrumbItems = items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.label,
    "item": item.href || "#"
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <nav className={`mb-6 ${className}`} aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />}
            {item.current ? (
              <span className="text-gray-900 font-medium" aria-current="page">
                {item.label}
              </span>
            ) : item.href ? (
              <Link 
                href={item.href} 
                className="hover:text-green-600 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-500">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
    </>
  );
}
