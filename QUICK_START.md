# Verdant Vault - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- npm 9+ installed
- A code editor (VS Code recommended)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Visit `http://localhost:3000`

## 📱 Test the Application

### Landing Page
- URL: `http://localhost:3000`
- Features: Hero section, feature cards, CTA buttons

### Sign Up
- URL: `http://localhost:3000/register`
- Test: Enter name, email, password
- Result: Redirects to dashboard

### Dashboard
- URL: `http://localhost:3000/dashboard`
- Features: Summary cards, wallet balance, recent transactions

### Browse Projects
- URL: `http://localhost:3000/projects`
- Features: Filter by category, pagination, invest buttons

### Invest in Project
- URL: `http://localhost:3000/invest/1`
- Features: 3-step form, progress indicator, confirmation

### Carbon Credits
- URL: `http://localhost:3000/carbon-credits`
- Features: Search, filter, buy buttons

### User Profile
- URL: `http://localhost:3000/profile`
- Features: Profile info, tabs (Investments, Credits, History)

### Settings
- URL: `http://localhost:3000/settings`
- Features: Account settings, notification preferences

### About
- URL: `http://localhost:3000/about`
- Features: Mission, values, team

### Contact
- URL: `http://localhost:3000/contact`
- Features: Contact form, business info

## 🎨 Customize the Theme

Edit `src/app/globals.css` to change colors:

```css
:root {
  --primary-green: #2ECC71;      /* Change primary color */
  --secondary-gray: #F0F0F0;     /* Change secondary color */
  --text-dark: #333333;          /* Change text color */
}
```

## 📦 Project Structure

```
src/
├── app/              # All pages and routes
├── components/       # Reusable components (Header, Footer)
├── lib/              # Utilities (validation, hedera, mockData)
└── images/           # Image assets
```

## 🔧 Available Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Start production server

# Linting
npm run lint         # Run ESLint
```

## 🌐 Environment Variables (Optional)

Create `.env.local` for Hedera integration:

```
NEXT_PUBLIC_HEDERA_NETWORK=testnet
HEDERA_ACCOUNT_ID=0.0.xxxxx
HEDERA_PRIVATE_KEY=your_private_key
NEXT_PUBLIC_CARBON_CREDIT_TOKEN_ID=0.0.xxxxx
NEXT_PUBLIC_CONTRACT_ID=0.0.xxxxx
```

## 📝 Mock Credentials

Use these for testing:

**Registration:**
- Name: Any name
- Email: Any email
- Password: Any password (8+ chars, uppercase, number)

**Login:**
- Email: Any registered email
- Password: Any registered password

## 🎯 Key Features to Test

1. **Form Validation** - Try invalid inputs
2. **Toast Notifications** - Submit forms to see notifications
3. **Responsive Design** - Resize browser window
4. **Navigation** - Click all links
5. **Filters** - Filter projects by category
6. **Search** - Search carbon credits
7. **Pagination** - Navigate project pages
8. **Tabs** - Switch profile tabs
9. **Toggles** - Toggle settings

## 🚨 Troubleshooting

### Port 3000 Already in Use
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

## 📚 Documentation

- **README.md** - Comprehensive documentation
- **IMPLEMENTATION_SUMMARY.md** - What was built
- **QUICK_START.md** - This file

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Hedera SDK](https://docs.hedera.com/hedera/sdks-and-apis/sdks)
- [Lucide Icons](https://lucide.dev)

## 💡 Next Steps

1. ✅ Run the application
2. ✅ Test all pages
3. ⬜ Implement Hedera integration
4. ⬜ Connect to backend API
5. ⬜ Deploy to production

## 📞 Support

- Email: support@verdantvault.com
- Contact Form: `/contact`
- Phone: +1 (555) 123-4567

---

**Happy Coding! 🌱**

