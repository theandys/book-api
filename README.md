# 📚 Book API

Simple CRUD API for managing books, built with Express.js and MongoDB.

---

## ✨ Requirements

- Node.js >= 18.x
- NPM >= 9.x
- MongoDB Atlas account (or local MongoDB server)
- Postman / Thunder Client (optional for API testing)

---

## 🛠️ Installation (Local Setup)

1. **Clone Repository**

```bash
https://github.com/theandys/book-api.git
```

2. **Navigate into project folder**

```bash
cd express-book-api
```

3. **Install Dependencies**

```bash
npm install
```

4. **Create `.env` file**

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

5. **Run the server (development mode)**

```bash
npm run dev
```

6. **Access API**

- Localhost: `http://localhost:5000/api/books`
- Example endpoints:
  - `GET /api/books`
  - `GET /api/books?page=2&pageSize=5`
  - `GET /api/books?keyword=mern`
  - `GET /api/books?genre=Programming`
  - `GET /api/books?yearPublishedFrom=2010&yearPublishedTo=2024`
  - `GET /api/books?sort=yearPublished&order=asc`
  - `POST /api/books`
  - `GET /api/books/:id`
  - `PUT /api/books/:id`
  - `DELETE /api/books/:id`

---

## 📈 Technologies Used

- **Node.js** (JavaScript runtime)
- **Express.js** (Web framework)
- **MongoDB Atlas** (Database)
- **Mongoose** (ODM for MongoDB)
- **dotenv** (Environment variables management)
- **nodemon** (Development server auto-restart)
- **cors** (Cross-Origin Resource Sharing)

---

## ✨ Features

- Create new book
- Read all books
- Read single book by ID
- Update book by ID
- Delete book by ID
- Error Handling Middleware
- Clean and scalable folder structure

---

Happy Coding! 🚀

better response > done
validation di model > done
Gas relation!
Gas continue FE

🔐 add auth JWT (Login/Register user) > done

🛡️ Middleware protect route > progress

📜 Documentation API use Postman Collection > done

📜 Documentation API use Swagger

🚀 Deploy ke Render, Vercel, or Railway free

📈 Setup pagination, searching, filtering di API > done

sampai sini:
Gas setup Auth JWT (Login, Register) dan Middleware protect route

nvm ls
nvm use 22.14.0
nvm use 12.22.12
