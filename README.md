# ☕ Coffee Cafe App

A full-featured cafe web application developed on the MERN stack (MongoDB, Express.js, React, Node.js). The application allows clients to browse the menu, add items to the cart, place orders, and book tables. An administrative dashboard is provided for managing the menu, orders, and reservations.

Here is the link to website (due to the use of free servers, there is a 10-15 second delay):
[Coffee Cafe App](https://cafe-app-woad-seven.vercel.app/)

## Key Features

### For Clients:
* **Menu Browsing & Search**: A convenient catalog of drinks and food with search functionality.
* **Cart & Orders**: Add items to the cart and place orders with automatic total calculation (including shipping and taxes).
* **Table Reservations**: Choose a date, time, number of guests, and (optionally) a specific table.
* **User Profile**: View order history and reservation status, edit profile details, and change passwords.
* **Authentication**: Secure registration and login using JSON Web Tokens (JWT).

### For Administrators:
* **Menu Management (CRUD)**: Add, edit, and delete menu items. Upload product images directly to the cloud (Cloudinary).
* **Order Management**: View all user orders and update their status to "Delivered".
* **Reservation Management**: Confirm or cancel client reservations.

## Technologies

**Frontend:**
* React 19 (using Vite)
* Tailwind CSS
* React Router v7
* Context API
* Axios
* React Toastify

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose
* JSON Web Tokens (JWT) & Bcrypt.js
* Multer & Cloudinary
* Express-Validator

## Project Structure

```text
cafe-app/
├── backend/                # Server-side (Node.js/Express)
│   ├── config/             # Database connection configuration
│   ├── controllers/        # Request handling logic
│   ├── middlewares/        # Custom middlewares (auth, admin, error)
│   ├── models/             # Mongoose schemas (User, MenuItem, Order, Reservation)
│   ├── routes/             # API routes
│   └── server.js           # Backend entry point
├── frontend/               # Client-side (React/Vite)
│   ├── public/             # Static files
│   ├── src/
│   │   ├── api/            # Axios instance configuration
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Auth and Cart state providers
│   │   ├── pages/          # Application screens (Client and Admin)
│   │   ├── App.jsx         # App routing
│   │   └── main.jsx        # Frontend entry point
│   └── tailwind.config.js  # Tailwind CSS configuration
├── package.json            # Root package.json (concurrently scripts)
└── requests.http           # API request examples
```

## License

This project is open-source and available under the **MIT License**.
You are free to copy, modify, and use this project for your own purposes. See the [LICENSE](LICENSE) file for more details.

If you find this project helpful, please consider giving it a ⭐ on GitHub!