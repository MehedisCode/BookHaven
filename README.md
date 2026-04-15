# 📚 BookHaven – Full Stack Book Selling Platform

BookHaven is a modern full-stack e-commerce web application for buying and managing books. Built using **ASP.NET Core Web API** and **React + Tailwind CSS**, it demonstrates clean architecture, authentication, and real-world e-commerce features.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access (**Admin / Customer**)
- Protected routes

---

## 🧩 Pages

- 🏠 Home Page  
- 📦 Product Page (Admin CRUD)  
- 🛒 Cart Page  
- 📂 Category Page (Admin)  
- 📄 Order Page  
- 👤 Profile Page  
- 🔐 Login Page  
- 📝 Register Page  

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router
- Context API

### 🔹 Backend
- ASP.NET Core Web API
- Entity Framework Core
- ASP.NET Identity
- JWT Authentication
- Repository Pattern + Unit of Work

### 🔹 Database
- SQL Server

---

## 🔐 Roles

### 👑 Admin
- Manage Products
- Manage Categories

### 🧑 Customer
- Browse books
- Add to cart
- Checkout & place orders

---

## 🛒 Key Functionalities

- Product listing with pagination  
- Add to cart & quantity management  
- Checkout system  
- Order management  
- Image upload for products  
- Responsive modern UI  

---

## ⚙️ Installation & Setup

### 🔹 Clone Repository

```bash
git clone https://github.com/MehedisCode/BookHaven
cd bookhaven
```

### 🔹 Frontend Setup

```bash
cd bookhaven-client
npm install
npm run dev
```

### 🔑 Environment Configuration
Update your appsettings.json:

```bash
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=BookHaven;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "Jwt": {
    "Key": "your-super-secret-key-min-32-chars"
  }
}
```

## 📈 Project Highlights
- Built a full-stack e-commerce web application using ASP.NET Core & React
- Implemented JWT authentication and role-based authorization
- Designed scalable backend using Repository & Unit of Work pattern
- Developed responsive UI with Tailwind CSS
- Implemented cart, checkout, and order system
- Integrated image upload and pagination

## 🤝 Contribution
Feel free to fork this project and submit pull requests.

## 📄 License
MIT License

## 🙌 Author
Md. Mehedi Hasan

## 📸 Screenshots

### 🏠 Home Page
<img width="480" height="807" alt="book2" src="https://github.com/user-attachments/assets/af6b373d-0b6c-42f7-8eb3-99bd1e1505d3" />

### 🛒 Cart Page
<img width="400" height="262" alt="book-cart" src="https://github.com/user-attachments/assets/2e473c42-649b-4b3a-80ed-3ff625852d3a" />

### 📄 Order Page
<img width="400" height="275" alt="book-orders" src="https://github.com/user-attachments/assets/de3dadc6-2cad-42c3-b32e-a633a8064ffc" />

### 📄 Profile Page
<img width="400" height="262" alt="order" src="https://github.com/user-attachments/assets/4d87fe2e-d72f-48e4-8c20-290bbadf79bb" />
