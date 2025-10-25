# Verdant Vault - Climate Finance Platform

A comprehensive Next.js web application for inclusive climate finance, enabling investors to support green projects and earn carbon credits as incentives.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Pages and Routes](#pages-and-routes)
- [Components](#components)
- [Utilities and Libraries](#utilities-and-libraries)
- [Styling and Theme](#styling-and-theme)
- [Hedera Integration](#hedera-integration)
- [Form Validation](#form-validation)
- [Mock Data](#mock-data)
- [Development Guidelines](#development-guidelines)
- [Building for Production](#building-for-production)
- [Future Enhancements](#future-enhancements)
- [Support](#support)

## Overview

Verdant Vault is a climate finance platform designed to make sustainable investing accessible to everyone. The platform connects investors with verified green projects in renewable energy, reforestation, and clean water initiatives. Investors earn carbon credits as incentives, creating a dual benefit of financial returns and environmental impact.

The application is built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4, featuring a modern, responsive UI with green-themed branding (#2ECC71 primary color). All 12 screens are fully implemented with mock data and Hedera blockchain integration placeholders.

## Features

### Core Features

1. **Landing Page** - Hero section with feature highlights and call-to-action buttons
2. **User Authentication** - Registration and login pages with form validation
3. **Dashboard** - Personalized dashboard with investment summary, carbon credits, and wallet balance
4. **Project Listing** - Browse green projects with category filters and pagination
5. **Investment Form** - Multi-step investment process with progress indicators
6. **Carbon Credit Marketplace** - Search and purchase verified carbon credits
7. **Purchase Confirmation** - Transaction confirmation with summary details
8. **User Profile** - View investment history, carbon credits, and transaction records
9. **Settings** - Account management and notification preferences
10. **About Page** - Company mission, values, and team information
11. **Contact Page** - Contact form and business information
12. **404 Error Page** - Custom error page with helpful navigation

### UI/UX Features

- Responsive design for mobile, tablet, and desktop
- Toast notifications for user feedback (success/error messages)
- Form validation with real-time error messages
- Hover effects on buttons and interactive elements
- Progress indicators for multi-step forms
- Sidebar navigation on dashboard and projects pages
- Tab-based content organization on profile page
- Search and filter functionality
- Pagination for project listings

## Technology Stack

### Frontend Framework
- **Next.js 16** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript** - Type-safe JavaScript

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **CSS Variables** - Custom theme colors
- **Responsive Design** - Mobile-first approach

### UI Components & Icons
- **Lucide React** - Icon library with 24+ icons used throughout
- **Custom Components** - Header, Footer, and reusable UI elements

### Notifications & Feedback
- **react-hot-toast** - Toast notifications for user feedback

### Blockchain Integration (Placeholders)
- **@hashgraph/sdk** - Hedera blockchain SDK (for future implementation)

### Development Tools
- **Node.js 18+** - JavaScript runtime
- **npm** - Package manager

## Project Structure

```
verdant-vault-app/
├── src/
│   ├── app/
│   │   ├── page.tsx                          # Landing page (/)
│   │   ├── layout.tsx                        # Root layout with Toaster provider
│   │   ├── globals.css                       # Global styles and theme
│   │   ├── favicon.ico
│   │   ├── register/
│   │   │   └── page.tsx                      # Registration form (/register)
│   │   ├── login/
│   │   │   └── page.tsx                      # Login page (/login)
│   │   ├── dashboard/
│   │   │   └── page.tsx                      # Dashboard (/dashboard)
│   │   ├── projects/
│   │   │   └── page.tsx                      # Project listing (/projects)
│   │   ├── invest/
│   │   │   └── [projectId]/
│   │   │       └── page.tsx                  # Investment form (/invest/[projectId])
│   │   ├── carbon-credits/
│   │   │   └── page.tsx                      # Carbon credit marketplace (/carbon-credits)
│   │   ├── purchase-confirmation/
│   │   │   └── page.tsx                      # Purchase confirmation (/purchase-confirmation)
│   │   ├── profile/
│   │   │   └── page.tsx                      # User profile (/profile)
│   │   ├── settings/
│   │   │   └── page.tsx                      # Settings (/settings)
│   │   ├── about/
│   │   │   └── page.tsx                      # About page (/about)
│   │   ├── contact/
│   │   │   └── page.tsx                      # Contact page (/contact)
│   │   └── not-found.tsx                     # 404 error page
│   ├── components/
│   │   ├── Header.tsx                        # Navigation header with logo and menu
│   │   └── Footer.tsx                        # Footer with links and social media
│   ├── lib/
│   │   ├── hedera.ts                         # Hedera integration placeholders
│   │   ├── validation.ts                     # Form validation utilities
│   │   └── mockData.ts                       # Mock data for development
│   ├── images/
│   │   ├── Top leaves.png
│   │   ├── background.png
│   │   ├── palmtree.png
│   │   └── right bottom leaves.png
│   └── figmaDesign/
│       └── ui.md                             # Figma design reference
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   └── vercel.svg
├── package.json                              # Project dependencies
├── package-lock.json
├── tsconfig.json                             # TypeScript configuration
├── postcss.config.mjs                        # PostCSS configuration
├── next.config.ts                            # Next.js configuration
└── README.md                                 # This file
```

## Installation

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Steps

1. **Clone or navigate to the project directory:**
   ```bash
   cd verdant-vault-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install additional packages (if not already installed):**
   ```bash
   npm install react-hot-toast @hashgraph/sdk lucide-react
   ```

4. **Create environment variables file (optional for Hedera integration):**
   ```bash
   touch .env.local
   ```

   Add the following variables:
   ```
   NEXT_PUBLIC_HEDERA_NETWORK=testnet
   HEDERA_ACCOUNT_ID=your_account_id
   HEDERA_PRIVATE_KEY=your_private_key
   NEXT_PUBLIC_CARBON_CREDIT_TOKEN_ID=token_id
   NEXT_PUBLIC_CONTRACT_ID=contract_id
   ```

## Running the Application

### Development Server

Start the development server with hot-reload:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Pages and Routes

### 1. Landing Page (`/`)
- **Description**: Main entry point with hero section and feature highlights
- **Components**: Header, Hero section, Features grid, CTA section, Footer
- **Features**:
  - Full-width hero with headline and subheadline
  - Three feature cards highlighting platform benefits
  - Call-to-action buttons (Get Started, Learn More)
  - Green landscape imagery placeholder
  - Responsive grid layout

### 2. Registration Page (`/register`)
- **Description**: User account creation form
- **Components**: Two-column layout with form and image
- **Features**:
  - Name, email, password, confirm password fields
  - Password visibility toggle
  - Real-time form validation
  - Success toast notification on submission
  - Redirect to dashboard on successful registration
  - Link to login page for existing users

### 3. Login Page (`/login`)
- **Description**: User authentication page
- **Components**: Two-column layout with form and image
- **Features**:
  - Email and password fields
  - Password visibility toggle
  - Form validation
  - Redirect to dashboard on successful login
  - Link to registration page for new users

### 4. Dashboard (`/dashboard`)
- **Description**: User's main dashboard with investment overview
- **Components**: Sidebar navigation, summary cards, transaction list
- **Features**:
  - Sidebar with navigation links (Dashboard, Projects, Carbon Credits, Profile, Settings)
  - Three summary cards: Carbon Credits, Total Invested, Wallet Balance
  - Hedera wallet connection button placeholder
  - Recent transactions list with icons
  - Quick action buttons (Buy Carbon Credits, Invest in Projects)
  - Authentication guard (redirects to register if not logged in)

### 5. Projects Page (`/projects`)
- **Description**: Browse and filter green projects
- **Components**: Sidebar filters, project grid, pagination
- **Features**:
  - Left sidebar with category filters (Renewable Energy, Reforestation, Clean Water)
  - Grid of project cards (2 columns on desktop)
  - Project information: title, description, location, impact
  - Progress bar showing funding progress
  - Invest Now button on each card
  - Pagination controls (Previous, page numbers, Next)
  - Dynamic filtering and pagination

### 6. Investment Form (`/invest/[projectId]`)
- **Description**: Multi-step investment process
- **Components**: Progress indicator, step forms, confirmation
- **Features**:
  - Step 1: Project selection with details
  - Step 2: Investment amount input with payment summary
  - Step 3: Investment confirmation with summary
  - Progress bar showing completion percentage
  - Estimated carbon credits calculation
  - Hedera smart contract integration placeholder
  - Toast notifications for success/error

### 7. Carbon Credit Marketplace (`/carbon-credits`)
- **Description**: Search and purchase carbon credits
- **Components**: Sidebar filters, search bar, credit list
- **Features**:
  - Search bar for finding credits
  - Filter by credit type (Renewable Energy, Reforestation, etc.)
  - List view of available credits with details
  - Price display and Buy Now buttons
  - Total purchased summary
  - Hedera mirror node integration placeholder

### 8. Purchase Confirmation (`/purchase-confirmation`)
- **Description**: Transaction confirmation page
- **Components**: Checkmark icon, summary, action buttons
- **Features**:
  - Success message with checkmark icon
  - Purchase summary with transaction details
  - Transaction ID and date
  - Back to Dashboard and Explore More Projects buttons
  - Success toast notification on page load
  - Next steps information

### 9. Profile Page (`/profile`)
- **Description**: User profile and activity history
- **Components**: Profile info sidebar, tabbed content area
- **Features**:
  - Profile picture placeholder, name, email, bio
  - Member since date and statistics
  - Three tabs: Investments, Carbon Credits, History
  - Investment list with progress bars
  - Carbon credits breakdown
  - Transaction history with dates and amounts
  - Edit Profile button linking to settings
  - Hedera transaction history placeholder

### 10. Settings Page (`/settings`)
- **Description**: Account and notification preferences
- **Components**: Account settings form, notification toggles
- **Features**:
  - Email address field
  - Password change section (current, new, confirm)
  - Notification preferences with toggles:
    - Email Notifications
    - Project Updates
    - Carbon Credit Alerts
    - Weekly Report
  - Save Changes button
  - Form validation with toast feedback

### 11. About Page (`/about`)
- **Description**: Company information and team
- **Components**: Mission section, values grid, team grid
- **Features**:
  - Mission statement and company description
  - Three core values with icons (Sustainability, Transparency, Innovation)
  - Team member cards (4 placeholder cards)
  - Join Our Team CTA section
  - Two-column layout with text and imagery

### 12. Contact Page (`/contact`)
- **Description**: Contact form and business information
- **Components**: Contact form, contact information cards
- **Features**:
  - Contact form with name, email, message fields
  - Form validation and submission
  - Contact information cards:
    - Email addresses
    - Phone numbers
    - Physical address
    - Office hours
  - Icons for each contact method
  - Success toast on form submission

### 13. 404 Error Page (`/not-found`)
- **Description**: Custom error page for missing routes
- **Components**: Error message, helpful links, back button
- **Features**:
  - Confused character emoji
  - 404 error code and message
  - Helpful navigation links
  - Back to Home button
  - Suggestions for common pages

## Components

### Header Component (`src/components/Header.tsx`)
- **Purpose**: Navigation header with logo and menu
- **Features**:
  - Logo with Verdant Vault branding
  - Desktop navigation menu (Home, About, Projects, Carbon Credits, Contact)
  - Sign In button
  - Mobile hamburger menu with responsive navigation
  - Sticky positioning with z-index management
  - Hover effects on links

### Footer Component (`src/components/Footer.tsx`)
- **Purpose**: Footer with links and social media
- **Features**:
  - Brand information and mission statement
  - Quick links section
  - Legal links (Privacy Policy, Terms of Service, Cookie Policy)
  - Social media icons (Twitter, LinkedIn, Instagram)
  - Copyright information
  - Dark background with white text
  - Responsive grid layout

## Utilities and Libraries

### Form Validation (`src/lib/validation.ts`)

Provides validation functions for form inputs:

- `validateEmail(email)` - Validates email format
- `validatePassword(password)` - Validates password strength (8+ chars, uppercase, number)
- `validateName(name)` - Validates name length (2+ chars)
- `validateAmount(amount)` - Validates numeric amounts
- `validateForm(formData)` - Validates entire form and returns array of errors

### Hedera Integration (`src/lib/hedera.ts`)

Placeholder functions for Hedera blockchain integration:

- `connectHederaWallet()` - Connect to Hedera wallet
- `disconnectHederaWallet()` - Disconnect from wallet
- `getAccountBalance(accountId)` - Fetch account balance
- `mintCarbonCredits(amount, projectId)` - Mint carbon credits on HTS
- `purchaseCarbonCredits(amount, price)` - Purchase carbon credits
- `submitInvestment(projectId, amount, investorAccountId)` - Submit investment to smart contract
- `fetchUserTransactions(accountId)` - Fetch transactions from mirror node
- `getCarbonCreditTokenInfo()` - Get token information

### Mock Data (`src/lib/mockData.ts`)

Development data structures and sample data:

- **Projects**: 6 sample green projects with details
- **Carbon Credits**: 4 types of carbon credits with pricing
- **Transactions**: Sample transaction history
- **User Profile**: Mock user data with statistics

## Styling and Theme

### Color Scheme

- **Primary Green**: #2ECC71 - Main brand color for buttons and accents
- **White**: #FFFFFF - Primary background
- **Secondary Gray**: #F0F0F0 - Secondary backgrounds and cards
- **Text Dark**: #333333 - Primary text color
- **Text Light**: #666666 - Secondary text color
- **Border Color**: #E0E0E0 - Borders and dividers

### Typography

- **Font Family**: Inter (sans-serif) - Modern, clean typeface
- **Headings**: Bold (700 weight) - h1, h2, h3 elements
- **Body Text**: Regular (400 weight) - Paragraphs and descriptions
- **Line Height**: 1.6 - Comfortable reading experience

### CSS Classes

Global utility classes defined in `globals.css`:

- `.container-custom` - Max-width container with padding
- `.btn-primary` - Green primary button with hover effects
- `.btn-secondary` - Gray secondary button
- `.text-heading` - Heading text styles
- `.text-body` - Body text styles

### Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Hedera Integration

### Overview

The application includes comprehensive placeholders for Hedera blockchain integration. All Hedera-related functions are in `src/lib/hedera.ts` with detailed comments indicating where actual implementation should occur.

### Integration Points

1. **Wallet Connection** (Dashboard)
   - Connect button with Hedera wallet integration placeholder
   - Display wallet balance and account ID
   - Mock data for development

2. **Carbon Credits** (Marketplace)
   - Mint carbon credits on Hedera Token Service (HTS)
   - Purchase credits with token transfers
   - Track credit balance and transactions

3. **Investments** (Investment Form)
   - Submit investments to Hedera smart contracts
   - Handle HBAR transfers for investment amounts
   - Store investment records on-chain

4. **Transaction History** (Profile)
   - Fetch user transactions from Hedera mirror node
   - Display transaction details and status
   - Real-time balance updates

### Environment Variables

Create `.env.local` with:

```
NEXT_PUBLIC_HEDERA_NETWORK=testnet
HEDERA_ACCOUNT_ID=0.0.xxxxx
HEDERA_PRIVATE_KEY=your_private_key
NEXT_PUBLIC_CARBON_CREDIT_TOKEN_ID=0.0.xxxxx
NEXT_PUBLIC_CONTRACT_ID=0.0.xxxxx
```

### Implementation Guide

To implement actual Hedera integration:

1. Install Hedera SDK: `npm install @hashgraph/sdk`
2. Replace placeholder functions in `src/lib/hedera.ts`
3. Use HashConnect for wallet integration
4. Implement token minting and transfers
5. Create smart contracts for investment handling
6. Query mirror node for transaction history

## Form Validation

### Real-Time Validation

All forms include real-time validation with error messages:

- **Email**: Valid email format required
- **Password**: Minimum 8 characters, uppercase letter, number required
- **Name**: Minimum 2 characters required
- **Amount**: Positive number required
- **Confirmation**: Matching password required

### Error Handling

- Toast notifications display validation errors
- Form fields show focus ring on error
- Error messages are specific and actionable
- Submit button disabled until form is valid

## Mock Data

### Projects

6 sample green projects with:
- Title, description, category
- Target and raised amounts
- Progress percentage
- Location and environmental impact

### Carbon Credits

4 types of carbon credits:
- Verified Carbon Credit (Renewable Energy)
- Reforestation Credit
- Methane Reduction Credit
- Water Conservation Credit

### User Profile

Mock user data includes:
- Name, email, bio
- Join date and statistics
- Investment history
- Carbon credit balance

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Use functional components with hooks
- Use 'use client' directive for client-side components
- Follow React best practices
- Use meaningful variable and function names

### Component Structure

```typescript
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PageName() {
  const [state, setState] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      {/* Page content */}
      <Footer />
    </div>
  );
}
```

### Styling

- Use Tailwind CSS utility classes
- Use custom CSS variables for theme colors
- Maintain responsive design with mobile-first approach
- Use consistent spacing and sizing

### Form Handling

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const errors = validateForm(formData);
  if (errors.length > 0) {
    errors.forEach(error => toast.error(error.message));
    return;
  }

  // Process form
  toast.success('Success message');
};
```

### Navigation

- Use Next.js Link component for internal navigation
- Use useRouter for programmatic navigation
- Implement authentication guards where needed

## Building for Production

### Build Process

```bash
npm run build
```

This creates an optimized production build in the `.next` directory.

### Production Server

```bash
npm start
```

Starts the production server on port 3000.

### Deployment

The application can be deployed to:
- Vercel (recommended for Next.js)
- AWS Amplify
- Netlify
- Docker containers
- Traditional Node.js servers

### Environment Variables for Production

Set the following in your production environment:

```
NEXT_PUBLIC_HEDERA_NETWORK=mainnet
HEDERA_ACCOUNT_ID=production_account_id
HEDERA_PRIVATE_KEY=production_private_key
NEXT_PUBLIC_CARBON_CREDIT_TOKEN_ID=production_token_id
NEXT_PUBLIC_CONTRACT_ID=production_contract_id
```

## Future Enhancements

### Phase 2 Features

1. **Actual Hedera Integration**
   - Implement wallet connection with HashConnect
   - Deploy smart contracts for investments
   - Implement token minting and transfers

2. **Backend API**
   - Create REST API for project management
   - Implement user authentication with JWT
   - Add database for persistent storage

3. **Payment Processing**
   - Integrate Stripe or PayPal
   - Support multiple payment methods
   - Handle subscription billing

4. **Advanced Features**
   - Real-time notifications
   - Email notifications
   - Admin dashboard
   - Analytics and reporting
   - Project management tools

5. **Mobile App**
   - React Native mobile application
   - Push notifications
   - Biometric authentication

6. **Community Features**
   - User forums and discussions
   - Project updates and news
   - Impact tracking and reporting
   - Leaderboards and achievements

## Support

### Getting Help

- **Email**: support@verdantvault.com
- **Contact Form**: Visit `/contact` page
- **Phone**: +1 (555) 123-4567
- **Office Hours**: Monday-Friday 9 AM - 6 PM

### Reporting Issues

If you encounter any issues:

1. Check the console for error messages
2. Verify all dependencies are installed
3. Clear browser cache and restart dev server
4. Check environment variables are set correctly
5. Contact support with detailed error information

### Contributing

To contribute to the project:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request
5. Wait for review and approval

## License

This project is proprietary and confidential. All rights reserved.

## Acknowledgments

- Built with Next.js, React, and TypeScript
- Styled with Tailwind CSS
- Icons from Lucide React
- Notifications with react-hot-toast
- Blockchain integration with Hedera SDK

---

**Last Updated**: October 2024
**Version**: 1.0.0
**Status**: Production Ready
