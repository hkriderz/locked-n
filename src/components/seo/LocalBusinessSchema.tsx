import Script from "next/script";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "name": "Locked N",
    "description": "Premium sports facility offering state-of-the-art shooting machines, high-end training, academies, and tournaments.",
    "url": "https://lockedn.com",
    "telephone": "(555) 123-4567",
    "email": "info@lockedn.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Sports Ave",
      "addressLocality": "City",
      "addressRegion": "State",
      "postalCode": "12345",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.7128",
      "longitude": "-74.0060"
    },
    "openingHours": [
      "Mo-Fr 06:00-22:00",
      "Sa-Su 08:00-20:00"
    ],
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card", "Debit Card"],
    "currenciesAccepted": "USD",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Sports Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Gym Rentals",
            "description": "Flexible hourly and daily rentals for individuals and groups"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Training Programs",
            "description": "Professional coaching and personalized training programs"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tournaments",
            "description": "Competitive tournaments and leagues for all skill levels"
          }
        }
      ]
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "State-of-the-art shooting machines",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Professional training equipment",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Youth academy programs",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Tournament facilities",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Flexible scheduling",
        "value": true
      }
    ],
    "image": "https://lockedn.com/og-image.jpg",
    "logo": "https://lockedn.com/logo.png",
    "sameAs": [
      "https://facebook.com/lockedn",
      "https://instagram.com/lockedn",
      "https://tiktok.com/@lockedn"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah Johnson"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Locked N has transformed my training routine. The state-of-the-art equipment and professional coaching have taken my performance to the next level."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Mike Chen"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "As a coach, I've been bringing my youth teams here for months. The academy programs are outstanding and the tournament organization is top-notch."
      }
    ]
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}



