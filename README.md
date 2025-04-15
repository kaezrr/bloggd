# Bloggd

A fullstack blog application built with Express and Prisma on the backend, and two frontend apps — one for public blog readers and one for authors. It supports JWT-based authentication, post and comment management, and role-based access control.

---

## Project Structure

This is a monorepo containing three main parts:

```
/
├── backend/           # REST API with Express and Prisma
├── user-frontend/   # Website for reading blog posts
└── admin-frontend/    # Dashboard for authors to manage posts and comments
```

---

## Features

### Public Blog (user-frontend)

- View published blog posts
- Read comments for each post
- Post details include title, author, and timestamp

### Admin Dashboard (admin-frontend)

- Login using JWT authentication
- Create, edit, publish/unpublish posts
- Manage comments (edit or delete)
- View post status (published/unpublished)

### Backend API

- RESTful endpoints for users, posts, and comments
- JWT-based authentication
- Protected routes for admin actions
- Prisma for database schema and queries

---

## Data Models (Prisma)

- **User**
  - `id`, `username`, `email`, `passwordHash`, `role`
- **Post**
  - `id`, `title`, `content`, `authorId`, `published`, `createdAt`
- **Comment**
  - `id`, `postId`, `authorName`, `content`, `createdAt`

---

## Getting Started

### Backend Setup

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

Create a `.env` file:

```
DATABASE_URL="file:./dev.db"  # or PostgreSQL connection string
JWT_SECRET="your_secret_key"
```

### Frontend Setup

For both frontends:

```bash
cd user-frontend   # or cd admin-frontend
npm install
npm run dev
```

Add a `.env` file in each frontend project with the backend URL:

```
VITE_API_URL=http://localhost:3000
```

---

## Authentication

- Users log in and receive a JWT token
- JWT is stored in localStorage
- Token is sent via `Authorization: Bearer <token>` header
- Protected routes require valid token

---

## Deployment

- Backend can be deployed on Render, Railway, or similar
- Frontends can be deployed on Vercel, Netlify, etc.
- Ensure CORS settings and HTTPS are properly configured for production

---

## Notes

- Comments require a name but no email
- Unpublished posts are only visible in the admin dashboard
- Only authenticated users can create or modify posts and comments
