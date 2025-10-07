# Intelligent Student Evaluation System (ISES)

## Overview

The Intelligent Student Evaluation System (ISES) is an AI-powered university student evaluation platform that automates grading with personalized feedback, analyzes learning styles, and provides predictive analytics for early intervention.

## Technology Stack

- **Frontend**: React.js + TypeScript + Tailwind CSS
- **Backend**: Laravel (PHP 8.2+) + Sanctum Auth
- **Database**: Supabase (PostgreSQL)
- **AI Services**: OpenAI GPT-4 / Anthropic Claude
- **Cache/Queue**: Redis

## Project Structure

```
.
├── frontend/              # React.js frontend application
│   ├── public/            # Public assets
│   ├── src/               # Source code
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layers
│   │   └── utils/         # Utility functions
│   ├── Dockerfile         # Frontend Docker configuration
│   └── README.md          # Frontend documentation
├── backend/               # Laravel backend API
│   ├── app/               # Application source code
│   ├── database/          # Database migrations
│   ├── routes/            # API routes
│   ├── Dockerfile         # Backend Docker configuration
│   └── README.md          # Backend documentation
├── docker-compose.yml     # Docker Compose configuration
├── ISES_Executive_Summary.md  # Project executive summary
└── README.md              # This file
```

## System Architecture

```
┌─────────────────────────────────────────────┐
│           Frontend (React.js)               │
│  - Landing Page  - Login/Signup             │
│  - Student Dashboard  - Instructor Panel    │
│  - Admin Portal  - Analytics Views          │
└─────────────────┬───────────────────────────┘
                  │ REST API (HTTPS)
┌─────────────────▼───────────────────────────┐
│         Backend (Laravel API)               │
│  - Authentication  - Evaluation Engine      │
│  - Comment System  - Analytics Service      │
└─────────────────┬───────────────────────────┘
                  │
        ┌─────────┴──────────┬────────────────┐
        │                    │                │
┌───────▼────────┐  ┌────────▼──────┐  ┌─────▼──────┐
│   Supabase     │  │  OpenAI/      │  │   Redis    │
│  (PostgreSQL)  │  │  Claude API   │  │  (Cache)   │
└────────────────┘  └───────────────┘  └────────────┘
```

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 14+ (for local development)
- PHP 8.2+ (for local development)
- Composer (for local development)

### Quick Start with Docker

1. **Start all services:**
```bash
docker-compose up -d --build
```

2. **Access the applications:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

3. **View logs:**
```bash
docker-compose logs -f
```

4. **Stop all services:**
```bash
docker-compose down
```

### Frontend Setup (Local Development)

1. **Navigate to the frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
```

The frontend will be available at `http://localhost:3000`.

### Backend Setup (Local Development)

1. **Navigate to the backend directory:**
```bash
cd backend
```

2. **Install PHP dependencies:**
```bash
composer install
```

3. **Configure environment variables:**
Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. **Generate application key:**
```bash
php artisan key:generate
```

5. **Start the development server:**
```bash
php artisan serve
```

The backend API will be available at `http://localhost:8000`.

## Core Features Implementation

### 1. Authentication System

#### Frontend Implementation
- Custom React hook for authentication state management
- Protected routes with role-based access control
- Login/signup forms with validation

#### Backend Implementation
- Laravel Sanctum for API token authentication
- Role-based access control middleware
- User registration and login endpoints

### 2. Landing Page

#### Frontend Implementation
- Responsive design with Tailwind CSS
- Navigation component with routing
- Hero section, features grid, and testimonials
- FAQ section and call-to-action footer

### 3. Login & Signup Pages

#### Frontend Implementation
- Multi-step signup form for different user roles
- Form validation with user-friendly error messages
- Password strength indicator
- "Remember me" functionality

### 4. Dashboard Views

#### Frontend Implementation
- Role-specific dashboards (student, instructor, admin)
- Data visualization components
- Submission management interface
- Analytics display components

### 5. Admin Comment System

#### Frontend Implementation
- Comment management interface
- Priority and privacy settings
- Comment type categorization

#### Backend Implementation
- Dedicated comments table in database
- API endpoints for comment management
- Role-based access control for comments

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

## Development Workflow

1. **Frontend Development**
   - Create components in `frontend/src/components/`
   - Implement pages in `frontend/src/pages/`
   - Add services in `frontend/src/services/`
   - Update routes in `frontend/src/App.tsx`

2. **Backend Development**
   - Create models in `backend/app/Models/`
   - Implement controllers in `backend/app/Http/Controllers/`
   - Add routes in `backend/routes/api.php`
   - Create migrations in `backend/database/migrations/`

## Support

For support, contact:
- **Technical Support**: support@ises.edu
- **Security Issues**: security@ises.edu
- **Feature Requests**: feedback@ises.edu

---

© 2025 ISES - Intelligent Student Evaluation System. All rights reserved.