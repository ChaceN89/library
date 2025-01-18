# Frontend - PageFlow

This document provides a detailed overview of the frontend application of PageFlow, a Next.js-based library platform that allows users to manage and share digital books. The frontend features authentication, user interaction with books, and various utility features built with modern web technologies.

---

## Table of Contents
1. [Features](#features)
2. [Routes](#routes)
3. [Authentication](#authentication)
4. [Running the Application](#running-the-application)
5. [Tailwind CSS Integration](#tailwind-css-integration)
6. [Environment Variables](#environment-variables)
7. [File Structure](#file-structure)

---

## Features
- **Authentication**:
  - User login and logout functionality.
  - Google Sign-In integration via OAuth.
  - Pop-up login form when the user is signed out.
  - Admin-only access for certain routes.
- **Book Management**:
  - Browse, upload, and favorite books.
  - Edit book information.
  - Comment on books.
- **User Settings**:
  - Edit account information.
- **Admin Features**:
  - `/admin` route accessible only to admin users.

---

## Routes
The application uses the following routes within the `app/` directory:

| Route          | Description                                     |
|----------------|-------------------------------------------------|
| `/`            | Homepage with general browsing options.         |
| `/admin`       | Admin dashboard (admin-only access).            |
| `/auth`        | Handles authentication (sign-in and sign-out).  |
| `/book`        | Displays individual book details.               |
| `/browse`      | Browse all books available on the platform.     |
| `/favorites`   | View the user's favorited books.                |
| `/my-books`    | View books uploaded by the user.                |
| `/settings`    | Manage account settings.                        |
| `/upload`      | Upload a new book to the platform.              |

---

## Authentication
- **Sign-In**: Users can log in via a traditional login form or using Google Sign-In. Both methods are implemented for flexibility.
- **Sign-Out**: A logout button is available to terminate the session.
- **Access Control**: The `/admin` route is restricted to admin users.

---

## Running the Application

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v10.2.3 or above)

### Steps to Run
1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The application will be available at `http://localhost:3000`.

To build the app for production:
```bash
npm run build
```

---

## Tailwind CSS Integration
The application uses [Tailwind CSS](https://tailwindcss.com/) for styling. Key features include:
- **Responsive Design**: Tailwind utilities ensure the app is mobile-friendly.
- **Dark Mode**: Built-in support for dark mode toggling.
- **Customization**: The `tailwind.config.js` file allows for custom themes, colors, and components.

---

## Environment Variables
The frontend uses environment variables for configuration. Ensure you create a `.env` file with the following fields:

```plaintext
NEXT_PUBLIC_ENVIRONMENT
NEXT_PUBLIC_API_BASE_URL
NEXT_PUBLIC_BACKEND_URL
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
AWS_STORAGE_BUCKET_NAME
AWS_S3_REGION_NAME
```

- **NEXT_PUBLIC_ENVIRONMENT**: Specifies the environment (`development` or `production`).
- **NEXT_PUBLIC_API_BASE_URL**: The base URL for backend API endpoints.
- **GOOGLE_CLIENT_ID** and **GOOGLE_CLIENT_SECRET**: Used for Google OAuth integration.
- **AWS_STORAGE_BUCKET_NAME** and **AWS_S3_REGION_NAME**: AWS S3 details for file storage.

---

## File Structure
The `frontend` directory follows a standard structure for Next.js applications:

```plaintext
frontend
├── src
│   ├── API                # API utility functions
│   ├── app
│   │   ├── layout.js      # Global layout applied to all routes
│   │   ├── page.js        # Homepage ("/")
│   │   ├── admin          # Admin-specific features
│   │   ├── auth           # Authentication logic
│   │   ├── book           # Book-related pages
│   │   ├── browse         # Browse books
│   │   ├── favorites      # View favorited books
│   │   ├── my-books       # User's uploaded books
│   │   ├── settings       # Account settings
│   │   └── upload         # Upload a new book
│   ├── components         # Reusable components
│   ├── context            # Global state management
│   ├── styles             # Global and Tailwind styles
│   └── utils              # Helper functions
├── public                 # Static assets
├── tailwind.config.js     # Tailwind configuration
├── package.json           # Dependencies and scripts
└── next.config.mjs        # Next.js configuration
```

---

## Notes
- Ensure all environment variables are configured correctly for your environment.
- Regularly update dependencies to maintain security and performance.
- Tailwind's utility-first approach allows rapid prototyping and customization.

---

## About
For any queries or support, please contact:
**Chace Nielson**  
**Website**: [chacenielson.com](https://chacenielson.com)  
**Email**: [chacenielson@gmail.com](mailto:chacenielson@gmail.com)

