# Backend - PageFlow Library

The backend of the PageFlow Library is built with Django, leveraging Django REST Framework for API functionality, JWT for authentication, Swagger for API documentation, and support for both SQLite and PostgreSQL databases. This README provides instructions to set up and run the backend locally or in production, configure the environment, and utilize the application's features.

---

## Table of Contents
1. [Features](#features)
2. [Setup and Installation](#setup-and-installation)
3. [Environment Variables](#environment-variables)
4. [Database Configuration](#database-configuration)
5. [Swagger API Documentation](#swagger-api-documentation)
6. [Running the Application](#running-the-application)
7. [Notes](#notes)

---

## Features
- **API Endpoints**:
  - User authentication using JWT.
  - CRUD operations for books.
  - User profile management.
- **Authentication**:
  - Supports JWT-based authentication.
  - Includes Google OAuth via Django Allauth.
- **Database**:
  - SQLite for development.
  - PostgreSQL for production.
- **File Storage**:
  - AWS S3 for storing static and media files.
- **API Documentation**:
  - Swagger UI and ReDoc available for API documentation.

---

## Setup and Installation

### Prerequisites
Ensure you have the following installed:
- [Python 3.10](https://www.python.org/)
- [pip](https://pip.pypa.io/en/stable/)
- [PostgreSQL](https://www.postgresql.org/) (for production database)

### Installation Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/PageFlow.git
   cd backend
   ```

2. **Create and Activate a Virtual Environment**:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: .\env\Scripts\activate
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set Up Environment Variables**:
   Create a `.env` file in the `backend/` directory and configure it as described in the [Environment Variables](#environment-variables) section.

5. **Apply Migrations**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create a Superuser** (Optional):
   ```bash
   python manage.py createsuperuser
   ```

---

## Environment Variables
The application requires a `.env` file with the following variables:

```plaintext
SECRET_KEY=<your-secret-key>
DEBUG=True  # Set to False in production
ALLOWED_HOSTS=localhost,127.0.0.1
TIME_ZONE=UTC
ENV=development  # Change to 'production' for production

# Database configuration
POSTGRES_DB=<your-database-name>
POSTGRES_USER=<your-database-user>
POSTGRES_PASSWORD=<your-database-password>
POSTGRES_HOST=<your-database-host>
POSTGRES_PORT=5432

# AWS S3 configuration
AWS_ACCESS_KEY_ID=<your-aws-access-key-id>
AWS_SECRET_ACCESS_KEY=<your-aws-secret-access-key>
AWS_STORAGE_BUCKET_NAME=<your-bucket-name>
AWS_S3_REGION_NAME=<your-region-name>

# Google OAuth configuration
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>

# CORS settings
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Miscellaneous
SITE_ID=1
APP_VERSION=1.0.0
DUMMY_VAR=dummy_value
```

---

## Database Configuration

### Development Database
By default, the application uses SQLite during development. The database file (`db.sqlite3`) will be created in the `backend/` directory when migrations are applied.

### Production Database
For production, configure PostgreSQL using the environment variables defined in the `.env` file. Example configuration:
```plaintext
ENV=production
POSTGRES_DB=pageflow
POSTGRES_USER=pageflow_user
POSTGRES_PASSWORD=securepassword
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```
Ensure the PostgreSQL server is running and the database is created before applying migrations.

---

## Swagger API Documentation
The backend includes interactive API documentation using Swagger and ReDoc.

- **Swagger UI**: [http://127.0.0.1:8000/swagger/](http://127.0.0.1:8000/swagger/)
- **ReDoc**: [http://127.0.0.1:8000/redoc/](http://127.0.0.1:8000/redoc/)

### Authentication in Swagger
Use the `Authorization` header with a Bearer token:
```
Authorization: Bearer <your-jwt-token>
```

---

## Running the Application
1. **Run the Development Server**:
   ```bash
   python manage.py runserver
   ```
   Access the server at [http://127.0.0.1:8000](http://127.0.0.1:8000).

2. **Run Tests** (Optional):
   ```bash
   python manage.py test
   ```

---

## Notes
- Ensure the `.env` file is properly configured for your environment.
- Use `DEBUG=False` and secure `SECRET_KEY` in production.
- Swagger documentation is a powerful tool for testing and exploring the API.
- SQLite is recommended for development, while PostgreSQL should be used for production.

---

## About
For any queries or support, contact:
**Chace Nielson**  
**Website**: [chacenielson.com](https://chacenielson.com)  
**Email**: [chacenielson@gmail.com](mailto:chacenielson@gmail.com)

