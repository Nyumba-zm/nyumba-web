> [!IMPORTANT]
> **Retired (November 2026).** This repository is archived and read-only. Nyumba's web app is
> [`Nyumba-zm/nyumba-frontend`](https://github.com/Nyumba-zm/nyumba-frontend); the API is
> [`Nyumba-zm/nyumba-backend`](https://github.com/Nyumba-zm/nyumba-backend) and the phone app is
> `nyumba-mobile`. The parts of this app worth keeping (location autocomplete, quick filter
> pills, sorting, saved homes) were ported to nyumba-frontend — see
> [`docs/PORTING_NOTES.md`](docs/PORTING_NOTES.md). History, including the `jack-frontend`
> branch, is kept here for reference.

# 🏡 Nyumba - Zambian Real Estate Platform

**Where Nyumbaling Happens** - Your gateway to finding the perfect home in Zambia.

Nyumba is a modern real estate platform built with Next.js, designed to help Zambians discover, explore, and connect with property listings across the country.

## ✨ Features

- 🔍 **Smart Search & Filters** - Search by location, property type, price range, bedrooms, and more
- 🏠 **Property Listings** - Browse houses, apartments, townhouses, and commercial properties
- 💰 **Sale & Rental Listings** - Find properties for sale or rent with dynamic price filtering
- 📱 **Contact System** - Direct WhatsApp integration for quick property inquiries
- ❤️ **Save Favorites** - Save properties to your favorites for later viewing
- 🏷️ **Property Badges** - See New, Featured, and Sold status at a glance
- 📊 **Smart Sorting** - Sort by price, newest, bedrooms, or popularity
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- ⚡ **Fast Performance** - Built with Next.js 16 and React 19

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Nyumba-zm/nyumba-web.git
cd nyumba-web
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Tech Stack

- **Framework:** Next.js 16.0.3 (App Router)
- **React:** 19.2.0 with React Compiler
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **State Management:** Zustand 5.0.8
- **Data Fetching:** React Query 5.90.10
- **Forms:** React Hook Form
- **Validation:** Zod

## 📁 Project Structure

```
nyumba-web/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── properties/        # Property listings & details
│   │   ├── rent/              # Rental properties page
│   │   ├── sell/              # List property page
│   │   └── not-found.tsx      # 404 page
│   ├── components/
│   │   ├── layout/            # Header, Footer
│   │   ├── property/          # Property cards, filters, modals
│   │   └── ui/                # Reusable UI components
│   ├── lib/
│   │   ├── api/               # API client & endpoints
│   │   ├── hooks/             # Custom React hooks
│   │   └── utils/             # Helper functions
│   ├── store/                 # Zustand stores
│   └── types/                 # TypeScript types
├── public/                    # Static assets
└── docs/                      # Documentation files
```

## 🎯 Current Features

### ✅ Implemented

- Complete navigation with Header & Footer
- Homepage with hero, stats, featured properties
- Property listing page with advanced filters
- Property detail pages with image galleries
- Search functionality (by location, title)
- Price range filtering (sale & rental)
- Property type & listing type filters
- Bedrooms & bathrooms filtering
- Multiple sort options
- Contact modal with WhatsApp integration
- Save to favorites functionality
- New, Featured, and Sold badges
- Custom 404 page
- Responsive mobile design

### 🚧 Coming Soon

- User authentication (login/signup)
- User dashboard
- Saved properties page
- Property comparison
- Neighborhood pages
- Agent profiles
- Map integration
- Email notifications

## 🎨 Design System

### Colors

- **Primary (Teal):** #0D9488 - Main brand color
- **Secondary (Yellow):** #FACC15 - Accent color for CTAs
- **Text:** Gray scale for optimal readability

### Typography

- Headings: Bold, large sizes for impact
- Body: Clean, readable sans-serif

## 📊 Mock Data

Currently using mock data with 12 properties:

- **6 Sale Properties:** Houses ranging from 1.5M - 4.2M ZMW
- **6 Rental Properties:** Apartments and townhouses from 3K - 18K ZMW/month

Located in premium Lusaka neighborhoods:

- Kabulonga
- Rhodes Park
- Olympia Park
- Longacres
- Woodlands
- Roma

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 📞 Contact

For questions or support, please contact the Nyumba team.

---

Built with ❤️ for Zambia 🇿🇲
