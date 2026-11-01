<div align="center">

# 🛒 বাজার দর (BazarDor)

**প্রয়োজনীয় পণ্যের দাম এক নজরে**

চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর, বাজারভিত্তিক বিস্তারিত এবং দামের পরিবর্তন, সব এক জায়গায়।

[🌐 Live Demo](YOUR_LIVE_LINK) · [💻 GitHub Repository](YOUR_REPO_LINK)

</div>

---

## 📖 About the Project

**BazarDor** is a Bangla-first web application that helps people track the daily prices of everyday essentials across Bangladesh. It shows today's price, the daily change (▲ / ▼ / —), and a market-by-market breakdown for every product, with all numbers rendered in Bengali digits.

Anyone can browse prices on the home and category pages. Detailed market data is available to signed-in users only.

## 🛠️ Technologies Used

| Purpose | Technology |
| --- | --- |
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| UI Library | React |
| Styling | Tailwind CSS + [DaisyUI](https://daisyui.com/) |
| Authentication | [Better Auth](https://better-auth.com/) (Email/Password, Google, GitHub) |
| Database | MongoDB Atlas |
| Notifications | react-hot-toast |
| Language | JavaScript |
| Deployment | Vercel |

## ✨ Key Features

1. **Live price ticker:** an infinite scrolling marquee showing every product with its price and ▲/▼ change.
2. **Smart home page:** top 6 price risers, top 6 fallers, and the full product grid, with a hero section that scrolls to the product list.
3. **Category pages with sorting:** filter by category and sort by price (low → high / high → low). Sorting is numeric, so it works correctly with Bengali numerals.
4. **Protected product details:** signed-in users see minimum, maximum and average prices plus a market-wise price table across divisions.
5. **Full authentication:** email/password sign up and sign in, plus Google and GitHub login, powered by Better Auth.
6. **Profile management:** view your profile and update your name and photo.
7. **Fully responsive:** works on mobile, tablet and desktop, including a collapsible category menu.
8. **Polished UX:** loading skeletons, friendly 404 pages, empty states and toast notifications for auth and route-protection events.

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or newer
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- (Optional, for social login) Google and GitHub OAuth apps

### Installation

```bash
# 1. Clone the repository
git clone YOUR_REPO_LINK
cd bazardor

# 2. Install dependencies
npm install

# 3. Create your environment file (see below)

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env` file in the project root:

```dotenv
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_DB_URL=your_mongodb_connection_string

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

> Never commit your `.env` file. Generate a secret with `openssl rand -base64 32`.

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/sign-in, sign-up   # Authentication pages
│   ├── category/[slug]           # Category listing with sorting
│   ├── product/[slug]            # Protected product details
│   ├── profile, profile/update   # Profile and update information
│   ├── api/auth/[...all]         # Better Auth route handler
│   └── not-found.js              # 404 page
├── components/                   # Navbar, Ticker, Hero, ProductCard, Footer ...
├── lib/                          # API helpers, Bengali formatters, auth config
└── proxy.js                      # Route protection
```

## 🔌 API

Product and category data comes from the Programming Hero BazarDor API:

```
https://openapi.programming-hero.com/api/bazardor
```

| Endpoint | Description |
| --- | --- |
| `/products` | All products |
| `/products?category=chal` | Products by category |
| `/categories` | All categories |

## 👤 Author

**Zibon**, Web Developer, Rajshahi, Bangladesh

---

<div align="center">

বাজার দর: সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।

</div>