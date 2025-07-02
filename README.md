# SmartLib - Library Management System

SmartLib is a full-stack Library Management System built with modern technologies. It enables users to manage books, borrow records, and track borrowing summaries efficiently. This project supports CRUD operations, borrowing logic with due dates, and a paginated summary of all borrow activities.


## Live Demo

You can access the live project here:  
[SmartLib - Frontend](https://smart-lib-ruby.vercel.app/)
[SmartLib - Backend](https://library-management-eta-rose.vercel.app/)

## Features

- View all books with pagination and filtering
- Add, edit, delete books
- Borrow books (with quantity and due date)
- View borrow summary (aggregated data with pagination)
- Prevent borrowing unavailable books
- Server-side validation
- Fully responsive frontend UI

---

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Redux Toolkit & RTK Query
- React Router DOM
- Zod + React Hook Form
- Vite

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- Aggregation Pipeline

---

## Folder Structure

```bash
├── client/                # Frontend source code
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── types/
│   │   └── main.tsx
│   └── index.html
├── server/                # Backend source code
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.ts
```
---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB installed and running locally or on the cloud (MongoDB Atlas)

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/smartlib.git
cd smartlib
```

## Deployment

### Backend Deployment (Render)

1. **Push your server code to GitHub** (if not already).
2. Go to [Render](https://render.com/), create an account and click **New → Web Service**.
3. Connect your GitHub repository and select the backend project folder (e.g., `server/`).
4. Configure the deployment:

   - **Build Command**:  
     ```bash
     npm install && npm run build
     ```

   - **Start Command**:  
     ```bash
     node dist/index.js
     ```

   - **Environment Variables**:  
     Add the following:

     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     ```

5. Click **Create Web Service** and wait for it to deploy.
6. After deployment, copy the **Render URL** (e.g., `https://smartlib-backend.onrender.com`).

---

### Frontend Deployment (Vercel)

1. **Push your frontend code to GitHub** (inside `client/` folder).
2. Go to [Vercel](https://vercel.com/), sign in with GitHub and import your repo.
3. In **project settings**, set:

   - **Root Directory**: `client/`
   - No need to define build command — Vercel auto detects Vite.
   - Add environment variables if needed (usually none unless using `.env`)

4. Update your frontend `baseQuery` URLs in:

   - `baseApi.ts`:
     ```ts
     baseQuery: fetchBaseQuery({ baseUrl: "https://smartlib-backend.onrender.com/api/books" })
     ```

   - `borrowApi.ts`:
     ```ts
     baseQuery: fetchBaseQuery({ baseUrl: "https://smartlib-backend.onrender.com/api" })
     ```

5. Push the changes. Vercel will auto-deploy.
6. Your site is now live at: `https://your-project-name.vercel.app`

---

> Now your frontend is served from Vercel and your backend from Render — both fully working together in production!

---

## Usage

Once both frontend and backend are running (locally or in production), you can:

- Browse all books from the homepage.
- Add a new book from the "Add Book" page.
- Edit/delete a book using the action buttons.
- Borrow a book (only if it's available and has copies left).
- Visit the "Borrow Summary" page to view an aggregated, paginated summary of all borrowing activities.

---

## API Endpoints

### Books (`/api/books`)
- `GET /` – Get all books (supports `page`, `limit`, `filter`, `sortBy`, `sort`)
- `GET /:id` – Get a single book
- `POST /` – Add a new book
- `PUT /:id` – Update a book (automatically adjusts `available` based on `copies`)
- `DELETE /:id` – Remove a book

### Borrow (`/api/borrow`)
- `POST /` – Borrow a book (must have enough copies)
- `GET /` – Aggregated borrow summary with pagination

---

## Environment Variables

### Backend `.env`
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```
## Author

**Shanto Islam**  
GitHub: [https://github.com/your-username](https://github.com/Shanto93)  
Email: shantoislam7363@gmail.com  
LinkedIn: [https://linkedin.com/in/your-profile](https://www.linkedin.com/in/shanta93/)  
Portfolio: [https://yourportfolio.com](https://updated-portfolio-neon.vercel.app/)
