# UserCRUD - Node.js Application 🚀

![UserCRUD Logo](src/public/images/favicon.ico)

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Overview 📖

**UserCRUD** is a full-stack web application built using **Node.js**, **Express.js**, **MongoDB**, **EJS**, and **Tailwind CSS**. The application allows users to register, log in, create posts, like posts, and manage their profiles. It provides essential CRUD functionalities for users and posts, making it an ideal starting point for a social media-like application.

## Live Project Link

[UserCRUD Live](https://usercrud-r3cc.onrender.com) 🔗

## GitHub Project Link

[UserCRUD GitHub Repository](https://github.com/Sumit0134/UserCRUD) 🔗

### Features ✨:
- 👤 User Registration & Login
- 📝 Create new posts
- ❤️ Like/unlike posts
- 📃 View other user posts
- 🔧 Edit & delete posts
- 📱 Responsive UI designed with Tailwind CSS
- 🔐 Authentication with session-based login

## Table of Contents 🗂️
1. [Installation](#installation)
2. [Usage](#usage)
3. [API Endpoints](#api-endpoints)
4. [Technology Stack](#technology-stack)
5. [Contributing](#contributing)
6. [License](#license)

## Installation 🔧

To get started with the project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Sumit0134/UserCRUD.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd UserCRUD
   ```

3. **Install the required dependencies**:

   ```bash
   npm install
   ```

4. **Create a `.env` file**:

   You need to define your environment variables in a `.env` file. Here is a sample configuration:

   ```bash
   PORT=3000 || AnyOtherPort
   APP_NAME=UserCRUD
   DATABASE_URL=your_mongodb_connection_string
   JWT_SECRET_KEY=your_secret_key
   EXPRESS_SESSION_SECRET_KEY=your_session_secret_key
   ```

5. **Start the application** 🎮:

   ```bash
   npm run dev
   ```

   The application will start on `http://localhost:3000`.

## API Endpoints 🛠️

### **User Routes** 👤

- **POST /createUser** - Register a new user.
- **POST /loginUser** - Login an existing user.
- **GET /logout** - Logout the current user.
- **GET /profile** - View the logged-in user's profile.

### **Post Routes** 📝

- **POST /createPost** - Create a new post (requires authentication).
- **GET /like/:id** - Like/unlike a post (requires authentication).
- **GET /editPost/:id** - Render edit post page (requires authentication).
- **POST /updatePost/:id** - Update an existing post (requires authentication).
- **GET /deletePost/:id** - Delete a post (requires authentication).

## Technology Stack ⚙️

- **Node.js** - JavaScript runtime for backend.
- **Express.js** - Web framework for Node.js.
- **MongoDB** - NoSQL database for storing users and posts.
- **Mongoose** - ODM library for MongoDB.
- **EJS** - Templating engine for rendering views.
- **Tailwind CSS** - Utility-first CSS framework for styling.
- **Session & Cookies** - User authentication.

## Contributing 🤝

We welcome contributions from the community! To contribute:

1. **Fork the repository**
2. **Create a new branch** (`git checkout -b feature-name`)
3. **Make your changes and commit them** (`git commit -am 'Add feature-name'`)
4. **Push to the branch** (`git push origin feature-name`)
5. **Open a pull request**

## License 📄

This project is licensed under the ISC License. See the LICENSE file for more details.
