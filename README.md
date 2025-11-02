# 🛒 LagbeMart E-Commerce Platform

A full-stack e-commerce platform built with Next.js 16, MongoDB, Redux Toolkit, and Cloudinary. LagbeMart provides a comprehensive multi-role marketplace experience with separate dashboards for Administrators, Sellers, and Buyers.

## 🔐 Test Credentials

All test accounts use the same password: `1234Aa`

### Admin Account
- **Email**: `niaz@gmail.com`
- **Password**: `1234Aa`
- **Protected**: This account cannot be deleted
- **Features**: Full platform access, user management, all orders visibility

### Seller Accounts
- **Seller 1**: `levi@gmail.com`
  - **Password**: `1234Aa`
- **Seller 2**: `erwin@gmail.com`
  - **Password**: `1234Aa`
- **Features**: Product management, order fulfillment, sales analytics

### Buyer Account
- Register any new user to get a buyer account
- **Default Role**: All new registrations are buyers by default
- **Password**: You can set any password (e.g., `1234Aa`)
- **Features**: Product browsing, order placement, order tracking

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Key Features by Role](#key-features-by-role)
- [API Routes](#api-routes)
- [Deployment](#deployment)

## ✨ Features

### 🎯 Core Features
- **Multi-Role System**: Admin, Seller, and Buyer roles with specialized dashboards
- **User Authentication**: Secure login/registration with session management
- **Product Management**: Complete CRUD operations for products with Cloudinary image uploads
- **Order System**: Full order lifecycle with status tracking and history
- **Search & Filter**: Advanced product search by name, category, price, and seller
- **Real-time Notifications**: React Hot Toast for user feedback
- **Responsive Design**: Modern, professional UI with Tailwind CSS

### 🛡️ Security Features
- Protected API routes with role-based access control
- Default admin account protection (cannot be deleted)
- Session-based authentication with cookies
- Input validation with Zod and React Hook Form

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **State Management**: Redux Toolkit + RTK Query
- **Form Handling**: React Hook Form + Zod
- **Notifications**: React Hot Toast
- **Icons**: Lucide React
- **Font**: Roboto

### Backend
- **Runtime**: Node.js
- **Database**: MongoDB with native driver
- **Image Upload**: Cloudinary
- **API**: Next.js API Routes
- **Authentication**: Cookie-based sessions

## 📁 Project Structure

```
lagbemart/
├── app/
│   ├── api/                  # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── orders/          # Order management
│   │   ├── products/        # Product management
│   │   ├── uploads/         # Image upload to Cloudinary
│   │   └── users/           # User management
│   ├── components/          # Reusable UI components
│   │   └── dashboard/       # Dashboard-specific components
│   ├── dashboard/           # Dashboard pages by role
│   │   ├── admin/          # Admin dashboard & user management
│   │   ├── seller/         # Seller dashboard & product management
│   │   ├── buyer/          # Buyer dashboard & order tracking
│   │   └── profile/        # User profile
│   ├── contact/            # Contact page
│   ├── login/              # Login page
│   ├── products/           # Product detail pages
│   ├── register/           # Registration page
│   ├── shop/               # Product listing & search
│   └── page.tsx            # Home page with hero banner
├── lib/
│   ├── mongodb.ts          # Database connection
│   ├── cloudinary.ts       # Cloudinary configuration
│   ├── store.ts            # Redux store setup
│   ├── services/           # RTK Query API slices
│   └── slices/             # Redux slices
└── public/                 # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- MongoDB database (local or Atlas)
- Cloudinary account for image uploads

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lagbemart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   MONGODB_DB=your_database_name
   
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   
   ADMIN_EMAIL=niaz@gmail.com
   SELLER_EMAILS=levi@gmail.com,erwin@gmail.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 👥 Key Features by Role

### 👨‍💼 Admin Dashboard
- View comprehensive platform analytics
- Manage all users (view/delete)
- Monitor all orders across the platform
- View top-selling products
- Track revenue and user statistics
- **Protected**: Default admin account cannot be deleted

### 🏪 Seller Dashboard
- Add, edit, and delete products with image uploads
- Track orders for their products
- Update order statuses (Processing → Out for Delivery → Completed)
- View sales analytics and revenue
- Monitor stock levels and low inventory alerts
- Product performance insights

### 🛍️ Buyer Dashboard
- Browse and search products with advanced filters
- Place orders with Cash on Delivery payment
- Track order history and status
- View purchase analytics
- Shopping cart functionality

## 🔌 API Routes

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - List all users (admin only)
- `POST /api/users` - Register new user
- `DELETE /api/users/[id]` - Delete user (admin only)

### Products
- `GET /api/products` - List all products
- `GET /api/products/[id]` - Get product by ID
- `POST /api/products` - Create product (seller only)
- `PUT /api/products/[id]` - Update product (seller only)
- `DELETE /api/products/[id]` - Delete product (seller only)
- `GET /api/products/seller/my-products` - Get seller's products

### Orders
- `GET /api/orders` - List orders (role-based filtering)
- `POST /api/orders` - Create order (buyer only)
- `GET /api/orders/[id]` - Get order by ID
- `PUT /api/orders/[id]` - Update order status (seller only)

### Uploads
- `POST /api/uploads` - Upload images to Cloudinary

## 🎨 Design Highlights

- **Modern UI**: Clean, professional design with gradients and smooth animations
- **Responsive**: Fully responsive across desktop, tablet, and mobile
- **Accessible**: Proper semantic HTML and ARIA labels
- **Performance**: Optimized with Next.js Image component and lazy loading
- **Feedback**: React Hot Toast notifications for all user actions
- **Typography**: Roboto font throughout for consistency

## 📦 Order Status Flow

1. **Pending Approval** → Buyer places order
2. **Processing** → Seller starts preparing order
3. **Out for Delivery** → Order shipped
4. **Completed** → Order delivered successfully
5. **Cancelled/Rejected** → Order cancelled (can happen at any stage)

## 🔒 Security Considerations

- Role-based access control (RBAC)
- Protected admin account
- Session-based authentication
- Input validation and sanitization
- API route protection
- Cascade deletion for related data

## 🚢 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Environment Variables for Production
Set all environment variables in your hosting platform:
- MongoDB connection string
- Cloudinary credentials
- Admin and seller emails

## 📝 Development Notes

- Uses Next.js 16 with Server Components by default
- All dashboard pages are client components for interactivity
- RTK Query for efficient data fetching and caching
- Cloudinary for image hosting and optimization
- MongoDB native driver (no Mongoose) for direct database access

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👤 Author

**LagbeMart Team**

---

Built with ❤️ using Next.js, MongoDB, and modern web technologies.
