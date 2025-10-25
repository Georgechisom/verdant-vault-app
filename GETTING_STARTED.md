# Verdant Vault - Getting Started Guide

## 🚀 Welcome to Verdant Vault!

This guide will help you get up and running with the Verdant Vault climate finance platform in minutes.

---

## ⚡ Quick Start (5 Minutes)

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

**That's it! You're ready to go! 🎉**

---

## 📱 Test the Application

### Landing Page
- **URL**: `http://localhost:3000`
- **What to do**: Click "Sign Up Now" or "Get Started"

### Create Account
- **URL**: `http://localhost:3000/register`
- **What to do**: 
  - Enter any name
  - Enter any email
  - Enter password (8+ chars, uppercase, number)
  - Click "Sign Up"

### Dashboard
- **URL**: `http://localhost:3000/dashboard`
- **What to do**: 
  - View your investment summary
  - See wallet balance
  - Check recent transactions

### Browse Projects
- **URL**: `http://localhost:3000/projects`
- **What to do**:
  - Filter by category
  - Click "Invest Now" on any project

### Invest in Project
- **URL**: `http://localhost:3000/invest/1`
- **What to do**:
  - Step 1: Review project details
  - Step 2: Enter investment amount
  - Step 3: Confirm investment

### Carbon Credits
- **URL**: `http://localhost:3000/carbon-credits`
- **What to do**:
  - Search for credits
  - Filter by type
  - Click "Buy Now"

### User Profile
- **URL**: `http://localhost:3000/profile`
- **What to do**:
  - View your investments
  - Check carbon credits
  - See transaction history

### Settings
- **URL**: `http://localhost:3000/settings`
- **What to do**:
  - Update account settings
  - Toggle notifications
  - Change password

### About
- **URL**: `http://localhost:3000/about`
- **What to do**: Learn about Verdant Vault

### Contact
- **URL**: `http://localhost:3000/contact`
- **What to do**: Send a message

---

## 🎨 Customize the Theme

### Change Primary Color

Edit `src/app/globals.css`:

```css
:root {
  --primary-green: #2ECC71;  /* Change this color */
  --secondary-gray: #F0F0F0;
  --text-dark: #333333;
  --text-light: #666666;
  --border-color: #E0E0E0;
}
```

### Change Font

Edit `src/app/layout.tsx`:

```typescript
// Change from Inter to your preferred font
const inter = Inter({ subsets: ['latin'] });
```

---

## 📁 Project Structure

```
src/
├── app/              # All pages (13 total)
├── components/       # Header, Footer
├── lib/              # Utilities, validation, mock data
└── images/           # Image assets
```

---

## 🔧 Available Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Build for production
npm start            # Start production server

# Linting
npm run lint         # Run ESLint
```

---

## 📚 Documentation

### Quick Reference
- **FINAL_SUMMARY.txt** - Project overview (5 min read)
- **QUICK_START.md** - Setup guide (5 min read)
- **README.md** - Complete documentation (30 min read)

### For Developers
- **DEVELOPER_GUIDE.md** - How to extend the project
- **IMPLEMENTATION_SUMMARY.md** - What was built
- **PROJECT_OVERVIEW.md** - Project details

### Navigation
- **DOCUMENTATION_INDEX.md** - Find the right documentation

---

## 🌐 Environment Variables (Optional)

For Hedera blockchain integration, create `.env.local`:

```
NEXT_PUBLIC_HEDERA_NETWORK=testnet
HEDERA_ACCOUNT_ID=0.0.xxxxx
HEDERA_PRIVATE_KEY=your_private_key
NEXT_PUBLIC_CARBON_CREDIT_TOKEN_ID=0.0.xxxxx
NEXT_PUBLIC_CONTRACT_ID=0.0.xxxxx
```

---

## 🧪 Test Features

### Form Validation
- Try registering with invalid email
- Try password without uppercase
- Try password without number
- See error messages appear

### Toast Notifications
- Submit any form
- See success notification
- Try invalid input
- See error notification

### Responsive Design
- Open DevTools (F12)
- Toggle device toolbar
- Test on mobile (375px)
- Test on tablet (768px)
- Test on desktop (1024px)

### Navigation
- Click all header links
- Click all footer links
- Use sidebar navigation
- Test back buttons

### Filters & Search
- Filter projects by category
- Search carbon credits
- Use pagination
- Switch profile tabs

---

## 🆘 Troubleshooting

### Port 3000 Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Dependencies Not Installing
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
rm -rf .next
npm run build
```

### Styles Not Loading
```bash
# Clear cache and restart
rm -rf .next
npm run dev
```

---

## 📊 What's Included

### Pages (13 Total)
- ✅ Landing page
- ✅ Registration
- ✅ Login
- ✅ Dashboard
- ✅ Projects
- ✅ Investment form
- ✅ Carbon credits
- ✅ Purchase confirmation
- ✅ Profile
- ✅ Settings
- ✅ About
- ✅ Contact
- ✅ 404 error

### Features
- ✅ User authentication
- ✅ Form validation
- ✅ Toast notifications
- ✅ Responsive design
- ✅ Project filtering
- ✅ Search functionality
- ✅ Pagination
- ✅ Tabs and toggles
- ✅ Mock data
- ✅ Hedera placeholders

### Technology
- ✅ Next.js 16
- ✅ React 19
- ✅ TypeScript 5
- ✅ Tailwind CSS 4
- ✅ Lucide Icons
- ✅ react-hot-toast

---

## 🎯 Next Steps

### Immediate
1. ✅ Run `npm install`
2. ✅ Run `npm run dev`
3. ✅ Test all pages
4. ✅ Review documentation

### Short Term
1. ⬜ Customize colors and content
2. ⬜ Add your own images
3. ⬜ Modify mock data
4. ⬜ Deploy to production

### Medium Term
1. ⬜ Implement Hedera integration
2. ⬜ Create backend API
3. ⬜ Add payment processing
4. ⬜ Connect to database

### Long Term
1. ⬜ Mobile app
2. ⬜ Admin dashboard
3. ⬜ Analytics
4. ⬜ Community features

---

## 💡 Tips & Tricks

### Tip 1: Use Mock Data
Mock data is in `src/lib/mockData.ts`. Modify it to test different scenarios.

### Tip 2: Check Console
Open browser DevTools (F12) to see console messages and errors.

### Tip 3: Use React DevTools
Install React DevTools browser extension to inspect components.

### Tip 4: Hot Reload
Changes to files automatically reload in the browser.

### Tip 5: TypeScript Errors
Check the terminal for TypeScript errors while developing.

---

## 🔗 Useful Links

### Documentation
- [README.md](README.md) - Complete guide
- [QUICK_START.md](QUICK_START.md) - Quick setup
- [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) - Development

### External Resources
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Hedera SDK](https://docs.hedera.com)

---

## 📞 Support

### Need Help?
1. Check the relevant documentation
2. Search in README.md
3. Review DEVELOPER_GUIDE.md
4. Check troubleshooting section

### Contact
- **Email**: support@verdantvault.com
- **Contact Form**: `/contact`
- **Phone**: +1 (555) 123-4567

---

## ✅ Checklist

- [ ] Installed dependencies (`npm install`)
- [ ] Started dev server (`npm run dev`)
- [ ] Opened application in browser
- [ ] Tested registration
- [ ] Tested dashboard
- [ ] Tested projects page
- [ ] Tested investment form
- [ ] Tested carbon credits
- [ ] Tested profile page
- [ ] Tested settings
- [ ] Tested responsive design
- [ ] Read documentation

---

## 🎉 You're All Set!

Verdant Vault is ready to use. Start exploring and building!

**Let's make climate finance inclusive! 🌍💚**

---

**Last Updated**: October 2024
**Version**: 1.0.0
**Status**: Ready to Use

