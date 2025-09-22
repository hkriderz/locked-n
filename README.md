# Locked N - Premium Sports Facility Website

A modern, responsive website for Locked N, a premium sports facility offering state-of-the-art shooting machines, high-end training, academies, and tournaments.

## Features

### 🏟️ **Core Pages**
- **Home Page**: Hero section, facility highlights, testimonials, and CTAs
- **About Page**: Company background, mission, values, team, and facility gallery
- **Services Page**: Detailed service offerings with pricing previews
- **Booking Page**: Multi-step booking form with service selection
- **Pricing Page**: Transparent pricing tables and comparison charts
- **Contact Page**: Contact form, location info, and interactive map
- **Client Portal**: Placeholder for future member dashboard

### 🎨 **Design & UX**
- Modern, responsive design with mobile-first approach
- Smooth animations and transitions using Framer Motion
- Professional color scheme and typography
- Interactive components and hover effects
- Accessibility-focused design patterns

### 🚀 **Technical Features**
- Built with Next.js 15 and React 19
- TypeScript for type safety
- Tailwind CSS for styling
- Form validation with React Hook Form and Zod
- SEO optimization with metadata and schema markup
- Performance optimized with lazy loading

### 📱 **Responsive Design**
- Mobile-first responsive layout
- Optimized for all screen sizes
- Touch-friendly interface elements
- Fast loading times

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **UI Components**: Custom components with Radix UI primitives

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd locked-n
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── booking/           # Booking page
│   ├── contact/           # Contact page
│   ├── pricing/           # Pricing page
│   ├── portal/            # Client portal placeholder
│   ├── services/          # Services page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── sections/          # Page sections
│   ├── seo/              # SEO components
│   ├── ui/               # UI components
│   ├── Footer.tsx        # Site footer
│   └── Header.tsx        # Site header
└── lib/                  # Utility functions
    └── utils.ts          # Helper functions
```

## Key Components

### Pages
- **Home**: HeroSection, FacilityHighlights, ServicesPreview, TestimonialsSection, CTASection
- **About**: MissionSection, ValuesSection, FacilityGallery, TeamSection
- **Services**: DetailedServices, PricingPreview, ServiceFAQ
- **Booking**: BookingSteps, BookingForm, BookingFAQ
- **Pricing**: PricingTables, PricingComparison, PricingFAQ
- **Contact**: ContactInfo, ContactForm, MapSection

### Features
- **SEO**: LocalBusinessSchema, metadata optimization
- **Forms**: Multi-step booking form with validation
- **Animations**: Scroll-triggered animations with Intersection Observer
- **Responsive**: Mobile-first design with Tailwind CSS

## Customization

### Colors
The color scheme can be customized in `tailwind.config.ts`:
- Primary: Blue theme
- Secondary: Gray tones
- Accent: Green for success states

### Content
- Update company information in components
- Modify pricing in pricing components
- Customize contact information in Header and Footer
- Update social media links

### Styling
- Modify Tailwind classes in components
- Update CSS variables in `globals.css`
- Customize animations in Framer Motion components

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
1. Build the project: `npm run build`
2. Start production server: `npm start`

## Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
# Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_CRISP_WEBSITE_ID=your_crisp_id

# Contact Form
CONTACT_FORM_ENDPOINT=your_form_endpoint
```

## Future Enhancements

### Planned Features
- **Client Portal**: Full member dashboard with booking management
- **UpperHand Integration**: Real booking system integration
- **Payment Processing**: Stripe or similar payment integration
- **Email Notifications**: Automated booking confirmations
- **Admin Dashboard**: Facility management system
- **Mobile App**: React Native companion app

### SEO Improvements
- Blog section for content marketing
- Local SEO optimization
- Schema markup enhancements
- Performance monitoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary to Locked N Sports Facility.

## Support

For technical support or questions:
- Email: info@lockedn.com
- Phone: (555) 123-4567

---

**Built with ❤️ for Locked N Sports Facility**