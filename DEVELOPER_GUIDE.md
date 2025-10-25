# Verdant Vault - Developer's Guide

## 🛠️ Development Guide for Extending the Project

This guide helps developers understand the codebase and extend Verdant Vault with new features.

## 📚 Project Architecture

### Directory Structure
```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
├── lib/              # Utility functions and helpers
└── images/           # Static image assets
```

### Key Files
- `src/app/layout.tsx` - Root layout with Toaster provider
- `src/app/globals.css` - Global styles and theme variables
- `src/lib/validation.ts` - Form validation utilities
- `src/lib/hedera.ts` - Hedera blockchain integration
- `src/lib/mockData.ts` - Mock data for development

## 🎨 Component Structure

### Creating a New Page

1. **Create directory** in `src/app/`
   ```bash
   mkdir src/app/new-page
   ```

2. **Create page.tsx**
   ```typescript
   'use client';

   import { useState } from 'react';
   import Header from '@/components/Header';
   import Footer from '@/components/Footer';

   export default function NewPage() {
     const [state, setState] = useState('');

     return (
       <div className="min-h-screen flex flex-col bg-white">
         <Header />
         <main className="flex-1 container-custom py-12">
           {/* Page content */}
         </main>
         <Footer />
       </div>
     );
   }
   ```

### Creating a New Component

1. **Create file** in `src/components/`
   ```typescript
   // src/components/MyComponent.tsx
   'use client';

   interface MyComponentProps {
     title: string;
     onClick?: () => void;
   }

   export default function MyComponent({ title, onClick }: MyComponentProps) {
     return (
       <div className="p-4 bg-white rounded-lg border border-gray-200">
         <h3 className="text-lg font-bold text-gray-900">{title}</h3>
         {onClick && (
           <button
             onClick={onClick}
             className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
           >
             Click Me
           </button>
         )}
       </div>
     );
   }
   ```

## 🎯 Form Handling

### Using Validation

```typescript
import { validateForm } from '@/lib/validation';
import toast from 'react-hot-toast';

export default function MyForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(formData);
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error.message));
      return;
    }

    toast.success('Form submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## 🔗 Hedera Integration

### Implementing Wallet Connection

Replace placeholder in `src/lib/hedera.ts`:

```typescript
import { Client, AccountId, PrivateKey } from '@hashgraph/sdk';

export async function connectHederaWallet(): Promise<HederaWallet> {
  try {
    const client = Client.forTestnet();

    const accountId = AccountId.fromString(
      process.env.HEDERA_ACCOUNT_ID || ''
    );
    const privateKey = PrivateKey.fromString(
      process.env.HEDERA_PRIVATE_KEY || ''
    );

    client.setOperator(accountId, privateKey);

    return {
      accountId: accountId.toString(),
      balance: 0,
      connected: true,
    };
  } catch (error) {
    console.error('Wallet connection failed:', error);
    throw error;
  }
}
```

## 🎨 Styling Guide

### Using Tailwind CSS

```typescript
// Primary button
<button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
  Click Me
</button>

// Card
<div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
  <h3 className="text-lg font-bold text-gray-900">Title</h3>
  <p className="mt-2 text-gray-600">Description</p>
</div>
```

## 📊 Working with Mock Data

### Adding New Mock Data

Edit `src/lib/mockData.ts`:

```typescript
export const mockProjects = [
  {
    id: 7,
    title: 'New Project',
    description: 'Project description',
    category: 'Renewable Energy',
    target: 100000,
    raised: 50000,
    location: 'Country',
    impact: 'Environmental impact',
    image: '/images/background.png',
  },
];
```

## 🔄 State Management

### Using React Hooks

```typescript
import { useState, useEffect } from 'react';

export default function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch data
        setData(result);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  return <div>{/* Render data */}</div>;
}
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Form validation works
- [ ] Toast notifications appear
- [ ] Navigation links work
- [ ] Responsive design on mobile
- [ ] Responsive design on tablet
- [ ] Responsive design on desktop
- [ ] Filters work correctly
- [ ] Search functionality works
- [ ] Pagination works
- [ ] Tabs switch content

## 🚀 Performance Optimization

### Code Splitting

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  loading: () => <div>Loading...</div>,
});
```

## 🔐 Security Best Practices

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_HEDERA_NETWORK=testnet
HEDERA_ACCOUNT_ID=0.0.xxxxx
HEDERA_PRIVATE_KEY=your_private_key
```

### Input Validation

```typescript
function validateInput(input: string): boolean {
  if (!input || input.trim().length === 0) {
    return false;
  }
  return true;
}
```

## 📝 Code Style Guide

### Naming Conventions

- **Components**: PascalCase (MyComponent)
- **Functions**: camelCase (myFunction)
- **Constants**: UPPER_SNAKE_CASE (MY_CONSTANT)
- **Files**: kebab-case (my-file.ts)

## 🎓 Common Tasks

### Add a New Page
1. Create directory in `src/app/`
2. Create `page.tsx` file
3. Add Header and Footer
4. Implement page content
5. Add navigation link in Header

### Add a New Component
1. Create file in `src/components/`
2. Define TypeScript interface
3. Implement component
4. Export component
5. Import and use in pages

### Add Form Validation
1. Add validation function in `src/lib/validation.ts`
2. Import in component
3. Call on form submission
4. Display errors with toast

## 🆘 Troubleshooting

### Common Issues

**Port 3000 already in use**
```bash
lsof -ti:3000 | xargs kill -9
```

**Dependencies not installing**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Build errors**
```bash
rm -rf .next
npm run build
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Hedera SDK Documentation](https://docs.hedera.com)

---

**Happy Coding! 🚀**
