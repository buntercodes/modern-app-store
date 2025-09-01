# Modern App Store

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- **Modern App Store**: Discover and download amazing applications
- **Google Play API Integration**: Real app data from Google Play Store
- **Admin Panel**: Comprehensive management interface for developers
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Authentication System**: User login and role-based access control
- **App Management**: Review, approve, and manage app submissions
- **Real-time Analytics**: Monitor store performance and user engagement

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Admin Panel

The app includes a comprehensive admin panel accessible to users with developer roles:

- **Dashboard**: Overview statistics and quick actions
- **App Management**: Review and manage app submissions
- **User Management**: Control user accounts and permissions
- **Analytics**: Monitor store performance and user engagement
- **Settings**: Configure store preferences and security
- **Security**: Monitor system security and access logs

### Accessing the Admin Panel

1. Login with developer credentials: `dev@appstore.com` / `dev123`
2. Click the "Admin" link in the header navigation
3. Navigate through different sections using the sidebar

For detailed admin panel documentation, see [ADMIN_PANEL.md](./ADMIN_PANEL.md).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
