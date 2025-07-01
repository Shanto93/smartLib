# Library Management API

A RESTful API built with **Express**, **TypeScript**, and **MongoDB** (via **Mongoose**) for managing a library system — including books and borrow transactions. This API ensures proper business logic, such as inventory availability during borrowing, and supports aggregation reporting.

## Live API Demo

Access the live API (Deployed at):  
[Click Here For Live](https://library-management-eta-rose.vercel.app/)


## Features

* Book creation, retrieval, update, and deletion
* Borrowing functionality with:

  * Availability checks
  * Real-time book quantity updates
* Aggregated summary of borrowed books
* Schema validation & error handling
* Filtering, sorting, and pagination
* Use of Mongoose static methods and middleware

---

## Tech Stack

* **Backend**: Express.js, TypeScript
* **Database**: MongoDB (via Mongoose)
* **Validation & Logic**: Mongoose schema, custom methods
* **Dev Tools**: Nodemon, ts-node, ESLint, Prettier

---

## Getting Started

### Prerequisites

* Node.js (v18+)
* MongoDB (local or cloud instance)
* npm or yarn

### Clone the Repo

```bash
https://github.com/Shanto93/library-management.git
cd library-management-api
```
### Install Dependencies

```bash
npm install
```

### Setup Environment

1. Create a `.env` file at the root of your project directory.

2. Add the following environment variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library
```
### Run the Server

#### Development Mode

Start the server with hot reloading using `ts-node-dev`:

```bash
npm run dev
```
#### Production Mode

1. Build the TypeScript files:

```bash
npm run build
```
2. Start the compiled JavaScript with Node.js:

```bash
npm start
```

## API Endpoints

### Books

| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| POST   | `/api/books`           | Create a new book               |
| GET    | `/api/books`           | Get all books (with filters)    |
| GET    | `/api/books/:bookId`   | Get a single book by ID         |
| PATCH  | `/api/books/:bookId`   | Update a book by ID             |
| DELETE | `/api/books/:bookId`   | Delete a book by ID             |

#### Query Parameters for `/api/books`

- `filter` – Filter books by genre (e.g., `?filter=fiction`)
- `sortBy` – Sort by a field (e.g., `?sortBy=title`)
- `sort` – Order of sort: `asc` or `desc` (e.g., `?sort=desc`)
- `limit` – Limit the number of results (e.g., `?limit=5`)

---

### Borrow

| Method | Endpoint         | Description                               |
|--------|------------------|-------------------------------------------|
| POST   | `/api/borrow`    | Borrow a book (with availability check)   |
| GET    | `/api/borrow`    | Get a summary of all borrowed books       |

#### Sample POST `/api/borrow` Request Body

```json
{
  "book": "BOOK_ID_HERE",
  "quantity": 1,
  "dueDate": "2025-07-01"
}
```

## Aggregation Summary

The `GET /api/borrow` endpoint returns an aggregated summary of all borrowed books, grouped by book ID, with the total quantity borrowed for each title.

### Aggregation Logic

- Groups borrowed records by book ID
- Calculates total quantity borrowed per book
- Joins with the `books` collection to include book details
- Returns a simplified view with book title, ISBN, and total quantity

### Sample Response

```json
[
  {
    "book": {
      "title": "Clean Code",
      "isbn": "1234567890"
    },
    "totalQuantity": 4
  },
  {
    "book": {
      "title": "Atomic Habits",
      "isbn": "9876543210"
    },
    "totalQuantity": 2
  }
]
```

## Error Handling

All API endpoints return consistent and descriptive error responses when validation fails or resources are not found.

### Error Response Format

```json
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error information"
}
```

## Author

Developed by **Shanto Islam**

Feel free to connect:  
- [GitHub](https://github.com/Shanto93)  
- [LinkedIn](https://www.linkedin.com/in/shanta93/)  
- [Email](mailto:shantoislam7363@gmail.com)
