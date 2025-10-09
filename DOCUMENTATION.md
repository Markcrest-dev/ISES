# ISES - Intelligent Student Evaluation System
## Complete Project Documentation

![ISES Logo](https://via.placeholder.com/800x200/4F46E5/FFFFFF?text=ISES+-+Intelligent+Student+Evaluation+System)

**Version:** 1.0.0
**Last Updated:** October 2025
**License:** MIT

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [System Architecture](#system-architecture)
5. [Project Structure](#project-structure)
6. [Installation & Setup](#installation--setup)
7. [Configuration](#configuration)
8. [Database Schema](#database-schema)
9. [API Documentation](#api-documentation)
10. [Frontend Documentation](#frontend-documentation)
11. [Backend Documentation](#backend-documentation)
12. [Authentication & Authorization](#authentication--authorization)
13. [User Roles & Permissions](#user-roles--permissions)
14. [Deployment Guide](#deployment-guide)
15. [Testing](#testing)
16. [Troubleshooting](#troubleshooting)
17. [Contributing](#contributing)
18. [Support](#support)

---

## Project Overview

The **Intelligent Student Evaluation System (ISES)** is a comprehensive AI-powered university student evaluation platform designed to revolutionize the way educational institutions assess and track student performance.

### Vision
To provide an intelligent, automated, and data-driven approach to student evaluation that enhances learning outcomes through personalized feedback and predictive analytics.

### Key Objectives
- **Automated Grading:** AI-powered evaluation system with personalized feedback
- **Learning Analytics:** Track student progress and learning styles using the VARK model
- **Predictive Insights:** Early intervention through predictive analytics
- **Multi-Stakeholder Dashboards:** Tailored interfaces for students, instructors, and administrators
- **Seamless Integration:** Compatible with popular LMS platforms (Canvas, Moodle, Blackboard)

### Target Audience
- **Students:** Access instant feedback, progress tracking, and personalized recommendations
- **Instructors:** Save time with automation, gain class analytics, and receive early warning alerts
- **Administrators:** Get program-level insights, accreditation reporting, and retention analytics

---

## Features

### Core Features

#### 1. User Authentication & Authorization
- Multi-role registration (Student, Instructor, Admin)
- Secure login/logout with Laravel Sanctum
- Role-based access control (RBAC)
- Password encryption with bcrypt
- Token-based authentication for API access

#### 2. Landing Page
- Modern, responsive design with Tailwind CSS
- Hero section with call-to-action
- Features showcase grid
- How it works section (4-step process)
- Testimonials from various stakeholders
- FAQ section
- Footer with important links

#### 3. User Dashboards

**Student Dashboard**
- Personal performance metrics
- Assignment submissions and grades
- Progress tracking and analytics
- Personalized recommendations
- Upcoming deadlines

**Instructor Dashboard**
- Class overview and analytics
- Assignment management
- Student performance monitoring
- Grading interface
- Early warning alerts

**Admin Dashboard**
- System-wide analytics
- User management
- Comment system for student tracking
- Program-level insights
- System configuration

#### 4. Admin Comment System
- Track notes and observations for individual students
- Comment types: General, Academic, Behavioral, Intervention, Praise
- Priority levels: Low, Medium, High, Critical
- Privacy settings (Private/Public)
- Role-based access (Admin/Instructor can manage)

#### 5. AI-Powered Evaluation (Planned)
- Automated grading using Bloom's Taxonomy
- Critical thinking assessment with Paul-Elder Framework
- Learning style analysis (VARK model)
- Personalized feedback generation
- Confidence scoring for human review triggers

---

## Technology Stack

### Frontend
- **Framework:** React.js 18.2.0
- **Language:** TypeScript 4.9.5
- **Styling:** Tailwind CSS 3.2.4
- **Routing:** React Router DOM 6.30.1
- **HTTP Client:** Axios 1.12.2
- **UI Components:** Custom components with Tailwind
- **Build Tool:** React Scripts 5.0.1

### Backend
- **Framework:** Laravel 10.10
- **Language:** PHP 8.1+
- **Authentication:** Laravel Sanctum 3.3
- **Database ORM:** Eloquent
- **API:** RESTful API architecture
- **Package Manager:** Composer

### Database
- **Primary:** Supabase (PostgreSQL)
- **ORM:** Eloquent (Laravel)
- **Migrations:** Laravel migrations

### Infrastructure
- **Containerization:** Docker & Docker Compose
- **Cache/Queue:** Redis (planned)
- **Web Server:** Nginx (production)
- **Version Control:** Git

### AI Services (Planned)
- OpenAI GPT-4 / Anthropic Claude
- Custom evaluation algorithms

---

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│              Frontend (React.js)                    │
│  ┌─────────────────────────────────────────────┐   │
│  │  - Landing Page    - Authentication         │   │
│  │  - Student Dashboard                        │   │
│  │  - Instructor Dashboard                     │   │
│  │  - Admin Dashboard                          │   │
│  │  - Protected Routes (RBAC)                  │   │
│  └─────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────┘
                     │ REST API (HTTPS)
                     │ Authorization: Bearer {token}
┌────────────────────▼────────────────────────────────┐
│           Backend (Laravel API)                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  - AuthController (register, login, logout) │   │
│  │  - Middleware: auth:sanctum                 │   │
│  │  - User Model & Eloquent ORM                │   │
│  │  - Validation & Error Handling              │   │
│  └─────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────┘
                     │
        ┌────────────┴──────────┬────────────────┐
        │                       │                │
┌───────▼────────┐     ┌────────▼──────┐  ┌─────▼──────┐
│   Supabase     │     │  OpenAI/      │  │   Redis    │
│  (PostgreSQL)  │     │  Claude API   │  │  (Cache)   │
│                │     │  (Planned)    │  │ (Planned)  │
└────────────────┘     └───────────────┘  └────────────┘
```

### Request Flow
1. User interacts with React frontend
2. Frontend sends authenticated requests to Laravel API
3. Laravel validates JWT token via Sanctum middleware
4. Request is processed and data is fetched/updated in database
5. Response is sent back to frontend in JSON format
6. Frontend updates UI based on response

---

## Project Structure

```
ISES/
├── frontend/                    # React.js frontend application
│   ├── public/                  # Static assets
│   │   ├── index.html          # Main HTML file
│   │   └── favicon.ico         # Favicon
│   ├── src/                    # Source code
│   │   ├── components/         # Reusable UI components
│   │   │   ├── layout/        # Layout components
│   │   │   ├── ui/            # UI components
│   │   │   ├── ApiTest.tsx    # API connection test
│   │   │   ├── Footer.tsx     # Footer component
│   │   │   ├── Navbar.tsx     # Navigation bar
│   │   │   └── ProtectedRoute.tsx  # Route protection
│   │   ├── contexts/          # React contexts
│   │   ├── hooks/             # Custom React hooks
│   │   ├── pages/             # Page components
│   │   │   ├── public/        # Public pages
│   │   │   │   ├── LandingPage.tsx
│   │   │   │   ├── AboutPage.tsx
│   │   │   │   ├── FeaturesPage.tsx
│   │   │   │   ├── ContactPage.tsx
│   │   │   │   ├── PrivacyPolicy.tsx
│   │   │   │   └── TermsOfService.tsx
│   │   │   ├── auth/          # Authentication pages
│   │   │   │   ├── Login.tsx
│   │   │   │   └── Signup.tsx
│   │   │   ├── student/       # Student pages
│   │   │   │   └── Dashboard.tsx
│   │   │   ├── instructor/    # Instructor pages
│   │   │   │   └── Dashboard.tsx
│   │   │   └── admin/         # Admin pages
│   │   │       └── Dashboard.tsx
│   │   ├── services/          # API service layers
│   │   ├── App.tsx            # Main App component
│   │   ├── index.tsx          # Entry point
│   │   └── index.css          # Global styles
│   ├── package.json           # Dependencies
│   ├── tsconfig.json          # TypeScript config
│   ├── tailwind.config.js     # Tailwind CSS config
│   └── Dockerfile             # Frontend Docker config
│
├── backend/                    # Laravel backend API
│   ├── app/                   # Application source code
│   │   ├── Console/           # Artisan commands
│   │   ├── Exceptions/        # Exception handling
│   │   ├── Http/              # HTTP layer
│   │   │   ├── Controllers/   # API controllers
│   │   │   │   ├── AuthController.php
│   │   │   │   └── Controller.php
│   │   │   ├── Middleware/    # Middleware
│   │   │   └── Kernel.php     # HTTP kernel
│   │   ├── Models/            # Eloquent models
│   │   │   └── User.php       # User model
│   │   └── Providers/         # Service providers
│   ├── bootstrap/             # Bootstrap files
│   ├── config/                # Configuration files
│   ├── database/              # Database files
│   │   ├── factories/         # Model factories
│   │   ├── migrations/        # Database migrations
│   │   └── seeders/           # Database seeders
│   ├── public/                # Public directory
│   ├── resources/             # Resources
│   ├── routes/                # Route definitions
│   │   ├── api.php            # API routes
│   │   └── web.php            # Web routes
│   ├── storage/               # Storage
│   ├── tests/                 # Tests
│   ├── .env                   # Environment variables
│   ├── .env.example           # Environment template
│   ├── artisan                # Artisan CLI
│   ├── composer.json          # PHP dependencies
│   └── Dockerfile             # Backend Docker config
│
├── Chapters/                   # Documentation chapters
├── docker-compose.yml          # Docker Compose config
├── init-project.sh            # Project initialization script (Linux/Mac)
├── init-project.bat           # Project initialization script (Windows)
├── README.md                  # Main README file
├── ISES_Executive_Summary.md  # Executive summary
├── DOCUMENTATION.md           # This file
└── .gitignore                 # Git ignore file
```

---

## Installation & Setup

### Prerequisites
- **Node.js** 14+ (for frontend development)
- **PHP** 8.1+ (for backend development)
- **Composer** (PHP package manager)
- **Docker & Docker Compose** (for containerized deployment)
- **PostgreSQL** (or Supabase account)
- **Git** (version control)

### Quick Start with Docker (Recommended)

1. **Clone the repository**
```bash
git clone <repository-url>
cd ISES
```

2. **Start all services**
```bash
docker-compose up -d --build
```

3. **Access the applications**
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **Database:** localhost:5432

4. **View logs**
```bash
docker-compose logs -f
```

5. **Stop all services**
```bash
docker-compose down
```

### Manual Setup (Local Development)

#### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file:
```bash
REACT_APP_API_URL=http://localhost:8000/api
```

4. **Start development server**
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

#### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install PHP dependencies**
```bash
composer install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` file with your database credentials:
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=ises
DB_USERNAME=postgres
DB_PASSWORD=your_password

SANCTUM_STATEFUL_DOMAINS=localhost:3000
SESSION_DOMAIN=localhost
```

4. **Generate application key**
```bash
php artisan key:generate
```

5. **Run database migrations**
```bash
php artisan migrate
```

6. **Seed the database (optional)**
```bash
php artisan db:seed
```

7. **Start the development server**
```bash
php artisan serve
```

The backend API will be available at `http://localhost:8000`

---

## Configuration

### Frontend Configuration

**Environment Variables (.env)**
```env
# API Configuration
REACT_APP_API_URL=http://localhost:8000/api

# Supabase Configuration (if using)
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

**Tailwind Configuration (tailwind.config.js)**
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#10B981',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

### Backend Configuration

**Environment Variables (.env)**
```env
APP_NAME=ISES
APP_ENV=local
APP_KEY=base64:generated-key
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_LEVEL=debug

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=ises
DB_USERNAME=postgres
DB_PASSWORD=secret

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

# Sanctum Configuration
SANCTUM_STATEFUL_DOMAINS=localhost:3000
SESSION_DOMAIN=localhost

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

**CORS Configuration (config/cors.php)**
```php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:3000',
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

---

## Database Schema

### Users Table

```sql
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'instructor', 'admin') NOT NULL,
    student_id VARCHAR(255) NULL,
    program VARCHAR(255) NULL,
    year_of_study INT NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

**Columns:**
- `id` - Primary key
- `full_name` - User's full name
- `email` - Unique email address
- `password` - Hashed password (bcrypt)
- `role` - User role (student, instructor, admin)
- `student_id` - Student ID (nullable, required for students)
- `program` - Academic program (nullable, for students)
- `year_of_study` - Current year of study (nullable, for students)
- `created_at` - Record creation timestamp
- `updated_at` - Record update timestamp

### Personal Access Tokens Table (Sanctum)

```sql
CREATE TABLE personal_access_tokens (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tokenable_type VARCHAR(255) NOT NULL,
    tokenable_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    token VARCHAR(64) UNIQUE NOT NULL,
    abilities TEXT NULL,
    last_used_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    INDEX idx_tokenable (tokenable_type, tokenable_id)
);
```

### Future Tables (Planned)

**Courses Table**
- id, course_code, course_title, instructor_id, semester, created_at, updated_at

**Assignments Table**
- id, course_id, title, description, total_points, due_date, rubric, created_at, updated_at

**Submissions Table**
- id, assignment_id, student_id, submission_content, submitted_at, grade, feedback, ai_analysis, status

**Admin Comments Table**
- id, student_id, admin_id, comment, comment_type, is_private, priority, created_at, updated_at

---

## API Documentation

### Base URL
- **Development:** `http://localhost:8000/api`
- **Production:** `https://your-domain.com/api`

### Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer {token}
```

### Endpoints

#### Authentication Endpoints

##### 1. Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "full_name": "John Doe",
  "email": "john.doe@university.edu",
  "password": "SecurePassword123",
  "role": "student",
  "student_id": "2021001",
  "program": "Computer Science",
  "year_of_study": 2
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "full_name": "John Doe",
    "email": "john.doe@university.edu",
    "role": "student",
    "student_id": "2021001",
    "program": "Computer Science",
    "year_of_study": 2,
    "created_at": "2025-10-09T10:30:00.000000Z",
    "updated_at": "2025-10-09T10:30:00.000000Z"
  },
  "token": "1|xxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

**Validation Rules:**
- `full_name`: required, string, max 255 characters
- `email`: required, valid email, unique, max 255 characters
- `password`: required, string, minimum 8 characters
- `role`: required, must be one of: student, instructor, admin
- `student_id`: required if role is student, nullable otherwise
- `program`: required if role is student, nullable otherwise
- `year_of_study`: required if role is student, integer between 1-10

##### 2. Login User
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john.doe@university.edu",
  "password": "SecurePassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "full_name": "John Doe",
    "email": "john.doe@university.edu",
    "role": "student",
    "student_id": "2021001",
    "program": "Computer Science",
    "year_of_study": 2
  },
  "token": "1|xxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

**Error Response (422 Validation Error):**
```json
{
  "message": "The provided credentials are incorrect.",
  "errors": {
    "email": ["The provided credentials are incorrect."]
  }
}
```

##### 3. Logout User
```http
POST /api/auth/logout
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

##### 4. Get Current User
```http
GET /api/auth/me
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": 1,
    "full_name": "John Doe",
    "email": "john.doe@university.edu",
    "role": "student",
    "student_id": "2021001",
    "program": "Computer Science",
    "year_of_study": 2
  }
}
```

#### Test Endpoint

##### 5. Test Connection
```http
GET /api/test
```

**Response (200 OK):**
```json
{
  "message": "Successfully connected to the backend!"
}
```

### Error Responses

#### 400 Bad Request
```json
{
  "message": "Bad request",
  "errors": {}
}
```

#### 401 Unauthorized
```json
{
  "message": "Unauthenticated"
}
```

#### 403 Forbidden
```json
{
  "message": "Forbidden"
}
```

#### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

#### 422 Unprocessable Entity (Validation Error)
```json
{
  "message": "Validation failed",
  "errors": {
    "email": ["The email field is required."],
    "password": ["The password must be at least 8 characters."]
  }
}
```

#### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

---

## Frontend Documentation

### Key Components

#### 1. App Component (App.tsx)
Main application component that sets up routing.

**Routes:**
- `/` - Landing page
- `/about` - About page
- `/features` - Features page
- `/contact` - Contact page
- `/login` - Login page
- `/signup` - Signup page
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/student/dashboard` - Student dashboard (protected)
- `/instructor/dashboard` - Instructor dashboard (protected)
- `/admin/dashboard` - Admin dashboard (protected)

#### 2. ProtectedRoute Component
Wraps protected routes and enforces role-based access control.

**Props:**
- `allowedRoles: string[]` - Array of allowed roles
- `children: ReactNode` - Child components to render

**Usage:**
```tsx
<ProtectedRoute allowedRoles={['student']}>
  <StudentDashboard />
</ProtectedRoute>
```

#### 3. Navbar Component
Responsive navigation bar with role-based menu items.

**Features:**
- Logo and brand name
- Desktop and mobile navigation
- User authentication status
- Role-based menu items
- Logout functionality

#### 4. Footer Component
Site footer with important links and information.

**Sections:**
- About ISES
- Quick links
- Contact information
- Social media links
- Copyright notice

### Pages Structure

#### Public Pages
- **LandingPage.tsx** - Home page with hero, features, testimonials, FAQ
- **AboutPage.tsx** - About the system
- **FeaturesPage.tsx** - Detailed features showcase
- **ContactPage.tsx** - Contact form
- **PrivacyPolicy.tsx** - Privacy policy
- **TermsOfService.tsx** - Terms of service

#### Authentication Pages
- **Login.tsx** - User login form
- **Signup.tsx** - Multi-step registration form

#### Dashboard Pages
- **student/Dashboard.tsx** - Student dashboard
- **instructor/Dashboard.tsx** - Instructor dashboard
- **admin/Dashboard.tsx** - Admin dashboard

### State Management

#### Authentication Context (Planned)
```tsx
interface AuthContext {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
```

### API Service Layer

#### authService.ts (Example)
```typescript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const authService = {
  register: async (data: RegisterData) => {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },

  logout: async () => {
    const token = localStorage.getItem('auth_token');
    await axios.post(`${API_URL}/auth/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    localStorage.removeItem('auth_token');
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('auth_token');
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.user;
  }
};
```

---

## Backend Documentation

### Controllers

#### AuthController
Handles all authentication-related operations.

**Methods:**

##### register(Request $request)
- Validates registration data
- Creates new user with hashed password
- Generates authentication token
- Returns user data and token

##### login(Request $request)
- Validates credentials
- Checks email and password
- Generates authentication token
- Returns user data and token

##### logout(Request $request)
- Requires authentication
- Deletes current access token
- Returns success message

##### me(Request $request)
- Requires authentication
- Returns current authenticated user

### Models

#### User Model
Eloquent model for users table.

**Attributes:**
- id, full_name, email, password, role, student_id, program, year_of_study

**Hidden Attributes:**
- password, remember_token

**Casts:**
- email_verified_at: datetime

**Methods:**
- HasApiTokens trait (Sanctum)
- HasFactory trait
- Notifiable trait

### Middleware

#### auth:sanctum
Laravel Sanctum authentication middleware that validates API tokens.

**Usage:**
```php
Route::middleware('auth:sanctum')->group(function () {
    // Protected routes
});
```

### Routes

**Public Routes:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/test` - Connection test

**Protected Routes (auth:sanctum):**
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `GET /api/user` - Get authenticated user

---

## Authentication & Authorization

### Authentication Flow

1. **Registration**
   - User submits registration form
   - Frontend sends POST request to `/api/auth/register`
   - Backend validates data and creates user
   - Backend generates Sanctum token
   - Token is stored in localStorage
   - User is redirected to role-specific dashboard

2. **Login**
   - User submits login form
   - Frontend sends POST request to `/api/auth/login`
   - Backend validates credentials
   - Backend generates Sanctum token
   - Token is stored in localStorage
   - User is redirected to role-specific dashboard

3. **Authenticated Requests**
   - Frontend retrieves token from localStorage
   - Token is added to request headers: `Authorization: Bearer {token}`
   - Backend validates token via `auth:sanctum` middleware
   - Request is processed if token is valid

4. **Logout**
   - User clicks logout
   - Frontend sends POST request to `/api/auth/logout`
   - Backend deletes the current token
   - Token is removed from localStorage
   - User is redirected to login page

### Token Management

**Storage:**
- Tokens are stored in browser localStorage
- Key: `auth_token`

**Security:**
- Tokens are generated using Laravel Sanctum
- Tokens are hashed before storage in database
- Tokens can be revoked server-side
- HTTPS recommended for production

### Role-Based Access Control

**Roles:**
- `student` - Regular student user
- `instructor` - Faculty/instructor user
- `admin` - System administrator

**Frontend Protection:**
```tsx
<ProtectedRoute allowedRoles={['admin']}>
  <AdminDashboard />
</ProtectedRoute>
```

**Backend Protection (Planned):**
```php
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    // Admin-only routes
});
```

---

## User Roles & Permissions

### Student Role
**Capabilities:**
- View personal dashboard
- Submit assignments
- View grades and feedback
- Track progress
- Access personalized recommendations
- Update profile

**Restricted From:**
- Accessing other students' data
- Grading assignments
- Managing users
- System configuration

### Instructor Role
**Capabilities:**
- View instructor dashboard
- Manage courses and assignments
- Grade student submissions
- View class analytics
- Access student performance data (enrolled courses only)
- Add comments to student records
- Generate reports

**Restricted From:**
- Accessing system-wide data
- Managing users
- System configuration

### Admin Role
**Capabilities:**
- Full system access
- User management (create, update, delete)
- View all dashboards
- Access system-wide analytics
- Manage admin comments
- System configuration
- Generate all reports
- Access logs and audit trails

**Unrestricted Access**

---

## Deployment Guide

### Docker Deployment (Recommended)

#### Prerequisites
- Docker 20.10+
- Docker Compose 1.29+

#### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd ISES
```

2. **Configure environment variables**

Frontend `.env`:
```env
REACT_APP_API_URL=https://api.yourdomain.com/api
```

Backend `.env`:
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=pgsql
DB_HOST=your-supabase-host
DB_DATABASE=your-database
DB_USERNAME=your-username
DB_PASSWORD=your-password
```

3. **Build and start services**
```bash
docker-compose up -d --build
```

4. **Run migrations**
```bash
docker-compose exec backend php artisan migrate --force
```

5. **Optimize Laravel**
```bash
docker-compose exec backend php artisan config:cache
docker-compose exec backend php artisan route:cache
docker-compose exec backend php artisan view:cache
```

### Manual Deployment

#### Frontend Deployment

1. **Build production bundle**
```bash
cd frontend
npm install
npm run build
```

2. **Deploy to web server (Nginx example)**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/ises/frontend/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### Backend Deployment

1. **Install dependencies**
```bash
cd backend
composer install --no-dev --optimize-autoloader
```

2. **Configure environment**
```bash
cp .env.example .env
# Edit .env with production settings
php artisan key:generate
```

3. **Run migrations**
```bash
php artisan migrate --force
```

4. **Optimize for production**
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
composer dump-autoload --optimize
```

5. **Configure web server (Nginx example)**
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;
    root /var/www/ises/backend/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

### Environment-Specific Configurations

#### Production Checklist
- [ ] Set `APP_ENV=production`
- [ ] Set `APP_DEBUG=false`
- [ ] Configure production database
- [ ] Set up SSL certificates (HTTPS)
- [ ] Configure CORS for production domain
- [ ] Set up Redis for caching and queues
- [ ] Configure email service
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Implement rate limiting
- [ ] Set up CI/CD pipeline

---

## Testing

### Frontend Testing

#### Unit Tests
```bash
cd frontend
npm test
```

#### Test Coverage
```bash
npm test -- --coverage
```

### Backend Testing

#### PHPUnit Tests
```bash
cd backend
php artisan test
```

#### Specific Test
```bash
php artisan test --filter AuthControllerTest
```

#### Test Coverage
```bash
php artisan test --coverage
```

### API Testing

#### Using cURL

**Register:**
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "student",
    "student_id": "2021001",
    "program": "Computer Science",
    "year_of_study": 2
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Get Current User:**
```bash
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer {your-token}"
```

---

## Troubleshooting

### Common Issues

#### Frontend Issues

**Issue: "Cannot connect to API"**
- Check if backend server is running
- Verify `REACT_APP_API_URL` in `.env`
- Check CORS configuration in backend
- Inspect browser console for errors

**Issue: "Routes not working after deployment"**
- Ensure web server is configured for SPA
- Add `try_files $uri $uri/ /index.html;` in Nginx config
- Or use `.htaccess` rewrite rules for Apache

#### Backend Issues

**Issue: "CORS error"**
- Add frontend URL to `config/cors.php`
- Set `supports_credentials` to `true`
- Verify `SANCTUM_STATEFUL_DOMAINS` in `.env`

**Issue: "Database connection failed"**
- Verify database credentials in `.env`
- Ensure database server is running
- Check firewall rules
- Test connection: `php artisan tinker` then `DB::connection()->getPdo();`

**Issue: "401 Unauthorized on protected routes"**
- Verify token is being sent in Authorization header
- Check token format: `Bearer {token}`
- Ensure token hasn't expired
- Verify `auth:sanctum` middleware is applied

#### Docker Issues

**Issue: "Container keeps restarting"**
- Check logs: `docker-compose logs backend`
- Verify environment variables
- Check database connectivity

**Issue: "Port already in use"**
- Stop conflicting services
- Change port in `docker-compose.yml`
- Use `docker-compose down` before restarting

### Debug Mode

**Enable Laravel Debug Mode:**
```env
APP_DEBUG=true
LOG_LEVEL=debug
```

**View Laravel Logs:**
```bash
tail -f backend/storage/logs/laravel.log
```

**Clear Laravel Cache:**
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

---

## Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

3. **Make your changes**
4. **Commit with meaningful messages**
```bash
git commit -m "feat: add user profile page"
```

5. **Push to your fork**
```bash
git push origin feature/your-feature-name
```

6. **Create a Pull Request**

### Code Style

#### Frontend (TypeScript/React)
- Use functional components with hooks
- Follow React best practices
- Use TypeScript for type safety
- Follow Airbnb JavaScript Style Guide
- Use Prettier for formatting

#### Backend (PHP/Laravel)
- Follow PSR-12 coding standard
- Use Laravel best practices
- Use type hints
- Write meaningful comments
- Use Laravel Pint for formatting

### Commit Message Convention

Follow Conventional Commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

---

## Support

### Documentation
- **Main README:** [README.md](README.md)
- **Executive Summary:** [ISES_Executive_Summary.md](ISES_Executive_Summary.md)
- **This Documentation:** DOCUMENTATION.md

### Contact

**Email Support:**
- Technical Support: support@ises.edu
- Security Issues: security@ises.edu
- Feature Requests: feedback@ises.edu

**Resources:**
- API Documentation: http://api.yourdomain.com/docs
- User Guide: Available in `/docs` folder
- Video Tutorials: [Link to tutorials]

### Community

- GitHub Issues: [Repository Issues](https://github.com/yourusername/ises/issues)
- Discussions: [GitHub Discussions](https://github.com/yourusername/ises/discussions)

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Laravel Framework
- React.js Community
- Tailwind CSS
- Laravel Sanctum
- All contributors and supporters

---

## Roadmap

### Current Version (v1.0.0)
- ✅ User authentication and authorization
- ✅ Role-based access control
- ✅ Landing page and public pages
- ✅ Basic dashboards for all roles
- ✅ Admin comment system (planned)

### Future Versions

**v1.1.0 - Core Features**
- AI-powered evaluation system
- Assignment submission and grading
- Learning analytics dashboard
- LMS integration (Canvas, Moodle)

**v1.2.0 - Advanced Features**
- Predictive analytics
- Early intervention alerts
- Advanced reporting
- Mobile app (iOS/Android)

**v1.3.0 - Enterprise Features**
- Multi-tenancy support
- Advanced security features
- API rate limiting
- Webhooks and integrations

---

## Changelog

### [1.0.0] - 2025-10-09

**Added:**
- Initial project setup
- User authentication (register, login, logout)
- Role-based access control (student, instructor, admin)
- Landing page with features showcase
- Public pages (About, Features, Contact, Privacy, Terms)
- Protected dashboards for all user roles
- Docker support with docker-compose
- Comprehensive documentation

**Technical Stack:**
- React.js 18.2.0 with TypeScript
- Laravel 10.10 with PHP 8.1+
- Laravel Sanctum for authentication
- Tailwind CSS for styling
- PostgreSQL database (Supabase)

---

**End of Documentation**

For questions, issues, or contributions, please refer to the Support section above.

© 2025 ISES - Intelligent Student Evaluation System. All rights reserved.
