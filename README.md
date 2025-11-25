# ShoppyGlobe – Backend API  
A fully functional **Node.js + Express + MongoDB** backend for an e-commerce platform supporting authentication, product management, and cart features.

---

## Features
- User registration & login (JWT authentication)
- Product CRUD operations
- Cart management (Add, Update, Delete, View)
- Proper validation & error handling
- Protected routes using auth middleware
- MongoDB with Mongoose

---

## Installation

### 1 Clone the repository
```sh
git clone https://github.com/Ganesh-Gandla/shoppyglobe-backend.git
cd ShoppyGlobe-Backend
```

### 2 Install dependencies
```sh
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=5100
MONGO_URI=mongodb://127.0.0.1:27017/shoppyglobe
JWT_SECRET=your_jwt_secret_key
```

---

## Start the Server

### Development mode:
```sh
npm run dev
```

### Production mode:
```sh
npm start
```

Server will run on:
```
http://localhost:5100
```

---

# API Documentation

---

## Authentication APIs

### **1. Register User**
**POST** `/api/auth/register`

#### Body:
```json
{
  "name": "Ganesh",
  "email": "ganesh@example.com",
  "password": "123456"
}
```

---

### **2. Login User**
**POST** `/api/auth/login`

#### Body:
```json
{
  "email": "ganesh@example.com",
  "password": "123456"
}
```

#### Response:
- Returns **JWT Token**

---

## How to Use Token in Thunder Client

1. Open Thunder Client  
2. Go to **Headers**  
3. Add:
   ```
   Key: Authorization
   Value: Bearer <your-token>
   ```
4. No need to add `Content-Type` manually unless sending JSON.  
5. Ignore the **Auth** tab — do NOT add token there.

---

# Product APIs

### **Get All Products**
**GET** `/api/products`

---

### **Get Product by ID**
**GET** `/api/products/:id`

---

### **Add New Product**
**POST** `/api/products`

#### Body:
```json
{
  "name": "Wireless Earbuds",
  "price": 1999,
  "description": "Bluetooth 5.1 earbuds",
  "stock": 25
}
```

---

# Cart APIs (Protected)

### **1. Get Cart Items**
**GET** `/api/cart`

---

### **2. Add to Cart**
**POST** `/api/cart`

#### Body:
```json
{
  "productId": "69251dbe27b3ac8e09f6a26f",
  "quantity": 2
}
```

---

### **3. Update Cart Item**
**PUT** `/api/cart/:id`

#### Body:
```json
{
  "quantity": 3
}
```

---

### **4. Delete Cart Item**
**DELETE** `/api/cart/:id`

---

# Testing Guide

### Before Testing
- Insert sample **products** in MongoDB.
- Register and **login** a user.
- Copy the returned **token**.
- Add token in Thunder Client → **Headers**.

---

# Common Errors & Meaning

| Status | Meaning |
|--------|---------|
| 400 | Missing fields / Invalid ID / Bad request |
| 401 | Unauthorized – token missing/invalid |
| 404 | Item not found in DB |
| 500 | Server error |

---

# Conclusion

Your backend is fully ready with:

✔ Secure Authentication  
✔ MongoDB integration  
✔ Product & Cart APIs  
✔ Full validation & error handling  
✔ Thunder Client testing support  
