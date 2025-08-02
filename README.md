# QuickDesk - A Full-Stack MERN Help Desk Application

QuickDesk is a simple, easy-to-use help desk solution built with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to raise support tickets, and for support staff to manage and resolve them efficiently. The system aims to streamline communication between users and support teams without unnecessary complexity.

This project was built as a comprehensive demonstration of modern full-stack web development, covering everything from backend API design and authentication to frontend state management and role-based UI.


## Table of Contents

- [Features](#features)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [Usage](#usage)
  - [User Roles](#user-roles)
  - [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)

## Features

-   **User Authentication**: Secure user registration and login system using JSON Web Tokens (JWT). Passwords are encrypted with bcrypt.
-   **Role-Based Access Control**: Three distinct user roles with different permissions:
    -   **End User**: Can create, view, and comment on their own tickets.
    -   **Support Agent**: Can view all tickets, assign tickets, update status, and add comments.
    -   **Admin**: Has all agent permissions, plus the ability to manage users and ticket categories.
-   **Ticket Management**: Full CRUD (Create, Read, Update) functionality for support tickets, including status changes (`Open`, `In Progress`, `Resolved`, `Closed`).
-   **Conversation Timeline**: A threaded view of all comments and updates on a ticket.
-   **File Attachments**: Users can upload image attachments to tickets, which are stored in the cloud via Cloudinary.
-   **Email Notifications**: Automatic email notifications (powered by SendGrid) are sent on ticket creation and when a support agent replies.
-   **Admin Dashboards**: Dedicated UIs for admins to manage users and ticket categories.
-   **Responsive UI**: A modern, responsive user interface built with Material-UI (MUI).

## System Architecture

The project is structured as a monorepo with two main packages:

-   **`/backend`**: A Node.js/Express.js RESTful API that handles all business logic, database interactions, and authentication.
-   **`/frontend`**: A React single-page application (SPA) that provides the user interface. It communicates with the backend via HTTP requests.

## Technology Stack

### Backend

-   **Node.js**: JavaScript runtime environment.
-   **Express.js**: Web framework for Node.js.
-   **MongoDB**: NoSQL database for data storage.
-   **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
-   **JSON Web Token (JWT)**: For secure authentication.
-   **bcryptjs**: For password hashing.
-   **Cloudinary**: For cloud-based file storage.
-   **SendGrid**: For transactional email notifications.
-   **Multer**: Middleware for handling file uploads.

### Frontend

-   **React**: JavaScript library for building user interfaces.
-   **Redux Toolkit**: For predictable and efficient global state management.
-   **React Router**: For client-side routing.
-   **Material-UI (MUI)**: For a comprehensive suite of UI components.
-   **Axios**: For making HTTP requests to the backend API.
-   **React-Toastify**: For user-friendly notifications.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following software installed on your machine:
-   [Node.js](https://nodejs.org/) (v14 or higher)
-   [npm](https://www.npmjs.com/) (comes with Node.js)
-   [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Tejas-Panchal/One_Piece_Odoo
    cd one_piece_odoo
    ```

2.  **Set up the Backend:**
    ```bash
    cd backend
    npm install
    ```
    
3.  **Set up the Frontend:**
    ```bash
    cd ../frontend
    npm install
    ```
    The frontend is configured to proxy API requests to the backend running on `localhost:5000`.

4.  **Run the application:**
    -   To start the backend server, run this from the `/backend` directory:
        ```bash
        npm run server
        ```
    -   To start the frontend development server, open a new terminal and run this from the `/frontend` directory:
        ```bash
        npm start
        ```
    The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

## Usage

### User Roles

After setting up the application, you can register a new user, which will have the `End User` role by default. To test other roles, you can manually change the `role` field for a user in your MongoDB database to `Support Agent` or `Admin`.

-   **Admin**: Has full access.
-   **Support Agent**: Can manage all tickets.
-   **End User**: Can only manage their own tickets.

### API Endpoints

The core API endpoints are documented within the source code using comments. You can use a tool like Postman to interact with them directly at `http://localhost:5000/api`.

-   `/api/users` - User registration, login, and management.
-   `/api/tickets` - Ticket creation and management.
-   `/api/categories` - Category management.
-   `/api/upload` - File uploads.

## Deployment

The application is designed to be deployed on separate services:
-   **Backend**: Can be deployed to a service like [Render](https://render.com/) or [Heroku](https://www.heroku.com/). Remember to set up all environment variables in the provider's dashboard.
-   **Frontend**: Can be deployed to a static hosting service like [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/). You will need to configure a proxy redirect to point `/api` requests to your live backend URL.

## Future Improvements

-   **Real-time Updates**: Integrate WebSockets (e.g., using Socket.IO) to provide real-time updates for new comments and status changes without needing a page refresh.
-   **Advanced Reporting**: An admin dashboard with charts and stats on ticket volume, resolution times, and agent performance.
-   **Full-Text Search**: Implement more advanced search functionality for tickets.
-   **Automated Testing**: Add a comprehensive suite of unit and integration tests using Jest and React Testing Library.
-   **OAuth 2.0**: Allow users to log in using third-party providers like Google or GitHub.
