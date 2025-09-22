import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Locked N - Premium Sports Facility & Training Academy",
  description: "State-of-the-art shooting machines, high-end training, academies, and tournaments. Book gym rentals and training sessions at Locked N.",
  keywords: "sports facility, gym rental, shooting machines, training academy, tournaments, recreational sports",
  authors: [{ name: "Locked N" }],
  creator: "Locked N",
  publisher: "Locked N",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://lockedn.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Locked N - Premium Sports Facility & Training Academy",
    description: "State-of-the-art shooting machines, high-end training, academies, and tournaments.",
    url: "https://lockedn.com",
    siteName: "Locked N",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Locked N Sports Facility",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Locked N - Premium Sports Facility & Training Academy",
    description: "State-of-the-art shooting machines, high-end training, academies, and tournaments.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        
        {/* Chat Support Widget Script - Disabled until Crisp ID is configured */}
        {/* 
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Crisp Chat Widget
              window.$crisp=[];
              window.CRISP_WEBSITE_ID="YOUR_CRISP_WEBSITE_ID";
              (function(){
                d=document;
                s=d.createElement("script");
                s.src="https://client.crisp.chat/l.js";
                s.async=1;
                d.getElementsByTagName("head")[0].appendChild(s);
              })();
            `,
          }}
        />
        */}
        
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </body>
    </html>
  );
}
