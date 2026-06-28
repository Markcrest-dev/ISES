# Intelligent Student Evaluation System (ISES)

## Overview

The Intelligent Student Evaluation System (ISES) is an AI-powered university student evaluation platform that automates grading with personalized feedback, analyzes learning styles, and provides predictive analytics for early intervention.

## Technology Stack

- **Frontend**: React.js + TypeScript + Tailwind CSS
- **Backend**: Supabase (Auth + PostgreSQL + Row-Level Security)
- **AI Services**: OpenAI GPT-4 / Anthropic Claude

## Project Structure

```
.
├── frontend/              # React.js frontend application
│   ├── public/            # Public assets
│   ├── src/               # Source code
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React contexts (Auth, Theme)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Supabase client configuration
│   │   ├── pages/         # Page components
│   │   ├── services/      # Supabase service layers
│   │   └── index.tsx      # App entry point
│   └── .env.example       # Environment variables template
├── supabase-schema.sql    # Database schema for Supabase
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
                  │ Direct Client SDK
┌─────────────────▼───────────────────────────┐
│           Supabase (BaaS)                   │
│  - Authentication (email/password)          │
│  - PostgreSQL Database                      │
│  - Row-Level Security (RLS)                 │
│  - Auto-generated REST API                  │
└─────────────────┬───────────────────────────┘
                  │
         ┌────────┴──────────┐
         │                   │
┌────────▼────────┐  ┌───────▼───────┐
│   PostgreSQL    │  │  OpenAI/      │
│  (profiles,     │  │  Claude API   │
│   courses,      │  │  (future)     │
│   evaluations)  │  └───────────────┘
└─────────────────┘
```

## Getting Started

### Prerequisites

- Node.js 14+ (for local development)
- A Supabase account (free tier: [supabase.com](https://supabase.com))

### Step 1: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to finish provisioning
3. Go to **SQL Editor** → **New Query**
4. Copy the contents of `supabase-schema.sql` and run it
5. Go to **Settings → API** and copy your:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon / public key** (the `eyJ...` string)

### Step 2: Configure Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and add your Supabase credentials:
   ```
   REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`.

## Core Features

### 1. Authentication System
- Supabase Auth with email/password
- Role-based access control (student, instructor, admin)
- Automatic profile creation on signup via database trigger
- Protected routes with role-based redirects

### 2. Course Management
- Instructors can create and manage courses
- Students can view enrolled courses
- Admin can view all courses

### 3. Enrollment System
- Instructors can enroll students in their courses
- Duplicate enrollment prevention
- Enrollment status tracking (active, completed, dropped)

### 4. Evaluation System
- Instructors create evaluations with scores and feedback
- Automatic grade calculation (A to F)
- Detailed feedback with strengths and areas for improvement
- Performance summary by type and by course

### 5. Dashboard Views
- Role-specific dashboards (student, instructor, admin)
- Student: view evaluations, grades, and feedback
- Instructor: manage courses, students, and evaluations
- Admin: system overview

## Database Tables

| Table | Description |
|---|---|
| `profiles` | User profiles (extends Supabase auth.users) |
| `courses` | Courses with instructor assignment |
| `enrollments` | Student-course enrollment records |
| `evaluations` | Evaluation scores, grades, and feedback |

## Frontend Services

| Service | Description |
|---|---|
| `authService.ts` | Login, register, logout, get current user |
| `courseService.ts` | CRUD operations for courses |
| `enrollmentService.ts` | Student enrollment management |
| `evaluationService.ts` | Evaluation CRUD with grade calculation |
| `userService.ts` | Student queries with statistics |

## Support

For support, contact:
- **Technical Support**: support@ises.edu
- **Security Issues**: security@ises.edu
- **Feature Requests**: feedback@ises.edu

---

© 2025 ISES - Intelligent Student Evaluation System. All rights reserved.