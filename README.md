# PageFlow

PageFlow is a full-stack library application designed to upload, manage, and share digital books. Users can store `.txt`, `.doc`, `.docx`, `.pdf`, and `.rtf` files, which may include books sourced from [Project Gutenberg](https://www.gutenberg.org/). The project leverages Next.js for the frontend, Django for the backend, AWS S3 for storage, and PostgreSQL for metadata management. This repository serves as a comprehensive guide to the application, including its structure, setup, and usage.

---

## Table of Contents
1. [Features](#features)
2. [Frontend](#frontend)
3. [Backend](#backend)
4. [Setup](#setup)
5. [Running Commands](#running-commands)
6. [API Documentation](#api-documentation)
7. [Notes](#notes)
8. [About](#about)

---

## Features

### Frontend (Next.js)
- **Upload Books**: Interface for uploading `.txt`, `.doc`, `.docx`, `.pdf`, and `.rtf` files.
- **Browse Books**: View a list of uploaded books by other users. You don't need an account to browse
- **Paginated View**: Navigate through book content across multiple pages.
- **Comment**: Add comments to any book.
- **Download and Read**: Download files and read them within the web application.
- **Dark Mode and Tailwind Screen Display**: Tailwind screen size display and a dark mode toggle are available during development.

### Backend (Django)
- **API Endpoints**:
  - See the backend readme for more infomation.
- **Storage**: Files are securely stored in an AWS S3 bucket.
- **Development Database**: Uses SQLite when `ENV` is set to `development`.

### Storage (AWS S3)
- Stores the `.txt`, `.doc`, `.docx`, `.pdf`, and `.rtf` files of books.
- URLs for book content are securely managed through AWS.

### Database (PostgreSQL)
- Stores metadata such as title, author, and upload information.

---

## Frontend

### .env File Configuration
The frontend `.env` file should include the following fields:
```plaintext
NEXT_PUBLIC_ENVIRONMENT
NEXT_PUBLIC_API_BASE_URL
NEXT_PUBLIC_BACKEND_URL
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
AWS_STORAGE_BUCKET_NAME
AWS_S3_REGION_NAME
```

### Basic File Structure
```plaintext
frontend
├── src
│   ├── API
│   ├── app
│   ├── components
│   ├── context
│   ├── data
│   ├── globals.js
│   ├── styles
│   └── utils
├── public
├── tailwind.config.js
├── package.json
└── next.config.mjs
```

---

## Backend

### .env File Configuration
The backend `.env` file should include the following fields:
```plaintext
SECRET_KEY
DEBUG
ALLOWED_HOSTS
TIME_ZONE
ENV
POSTGRES_DB
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_HOST
POSTGRES_PORT
AWS_STORAGE_BUCKET_NAME
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_S3_REGION_NAME
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
CORS_ALLOWED_ORIGINS
APP_VERSION ="1.0.0"
DUMMY_VAR = "Just a text string"
SITE_ID = 1
```

### Basic File Structure
```plaintext
backend
├── api
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── aws
│   ├── migrations
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── manage.py
├── requirements.txt
└── django_debug.log
```

---

## Setup

### Prerequisites
Ensure you have the following installed:
- [Node.js 10.2.3](https://nodejs.org/)
- [Python 3.10.14](https://www.python.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [AWS CLI](https://aws.amazon.com/cli/)

Any virtual Python environment will work; the project has been developed using `conda`.

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/PageFlow.git
cd PageFlow
```

### 2. Frontend Setup
Navigate to the `frontend` directory and install dependencies:
```bash
cd frontend
npm install
```
Start the development server:
```bash
npm run dev
```
The frontend will be available at `http://localhost:3000`.

### 3. Backend Setup
Navigate to the `backend` directory and set up the environment:
```bash
cd backend
python -m venv env
source env/bin/activate  # On Windows: .\env\Scripts\activate
pip install -r requirements.txt
```

Setup the database:
```bash
python manage.py makemigrations
python manage.py migrate
```

(Optional) Create a superuser (This will act as an Admin that can update the site from the frontend):
```bash
python manage.py createsuperuser
```

Run the development server:
```bash
python manage.py runserver
```
The backend will be available at `http://127.0.0.1:8000`.

### 4. AWS Configuration
Ensure your AWS credentials are configured and S3 bucket access is set up:
1. Log in to the AWS Management Console.
2. Attach the `AmazonS3FullAccess` policy to the IAM user/role.
3. Configure your bucket details in the Django settings.

---

## Running Commands

### Frontend Commands
- **Start Development Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Lint Code**: `npm run lint`

### Backend Commands
- **Apply Migrations**: `python manage.py migrate`
- **Run Server**: `python manage.py runserver`
- **Create Superuser**: `python manage.py createsuperuser`
- **Update Dependencies**: `pip freeze > requirements.txt`

---

## API Documentation
The backend API is documented using `drf-yasg`.
- **Swagger**: [http://127.0.0.1:8000/swagger/](http://127.0.0.1:8000/swagger/)
- **ReDoc**: [http://127.0.0.1:8000/redoc/](http://127.0.0.1:8000/redoc/)

### Authentication
- Use `Bearer <token>` as the authorization value.

---

## Notes
- Ensure all `.env` files are properly configured for environment-specific settings.
- Always secure your AWS credentials and tokens.
- This project is a demonstration of full-stack development using modern technologies.
- Infrastructure for deployment to AWS is detailed in the `infrastructure/README.md`.

---

## About
**Author**: Chace Nielson  
**Website**: [chacenielson.com](https://chacenielson.com)  
**Email**: [chacenielson@gmail.com](mailto:chacenielson@gmail.com)

