# ZuhorBooks

Frontend for zuhorbooks.uz — an online book platform where users can browse a catalog, place orders, and manage their profile.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript (Create React App) |
| UI | MUI 5 (MaterialTheme) |
| State | Redux Toolkit + React Context |
| API | REST (service layer) + Socket.IO |
| Auth | JWT stored in client state |
| Deploy | VPS + Nginx |

## Getting Started

**Prerequisites:** Node.js 18+, npm, running ZuhorBooks backend

```bash
git clone <repo-url>
cd Zuhorbooks-react

npm install

# Set REACT_APP_API_URL in src/lib/config.ts or .env

npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Features

**For Users**
- Homepage with popular books, new arrivals, top members, advertisements, and events
- Browse full book catalog with filtering by category and collection
- Book detail page with description, price, and availability
- Add books to cart and place orders
- Order history with status tracking — Process, Paused, Finished
- Member registration, login, and profile management with photo upload
- Profile settings and account customization

**Admin Panel (server-rendered, via backend)**
- Book (product) management — add, edit, delete
- Order management and status control
- Member management and role control

## Project Structure

```
src/
├── app/
│   ├── screens/
│   │   ├── homePage/        # Homepage (popular, new, top users, events)
│   │   ├── productsPage/    # Book catalog and detail
│   │   ├── ordersPage/      # Order history (process, paused, finished)
│   │   ├── userPage/        # Member profile and settings
│   │   └── helpPage/        # Help and support
│   ├── components/          # Reusable UI components
│   ├── services/            # API functions (Member, Product, Order)
│   ├── context/             # Global auth state + Socket.IO context
│   └── hooks/               # Custom hooks
└── lib/
    ├── types/               # TypeScript interfaces
    ├── enums/               # Shared enums
    └── config.ts            # API base URL and constants
```

## Deployment

VPS: production build served via `serve` on port 3004 behind Nginx.

## Live

[https://zuhorbooks.uz](https://zuhorbooks.uz)
 
