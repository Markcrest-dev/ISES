# ISES Frontend

This is the frontend application for the Intelligent Student Evaluation System (ISES).

## Technology Stack

- React.js with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for HTTP requests

## Project Structure

```
src/
├── components/        # Reusable UI components
├── hooks/             # Custom React hooks
├── pages/             # Page components
│   ├── admin/         # Admin dashboard pages
│   ├── auth/          # Authentication pages (login, signup)
│   ├── instructor/    # Instructor dashboard pages
│   ├── public/        # Public pages (landing page)
│   └── student/       # Student dashboard pages
├── services/          # API service layer
├── utils/             # Utility functions
├── App.tsx            # Main application component
├── index.tsx          # Entry point
└── index.css          # Global styles
```

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

3. Build for production:
   ```
   npm run build
   ```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Removes the single build dependency

## Folder Details

### Components
Reusable UI components like buttons, forms, and navigation elements.

### Hooks
Custom React hooks for handling authentication, data fetching, and other logic.

### Pages
Page components organized by user role:
- **Admin**: Dashboard and management pages for administrators
- **Auth**: Login and signup pages
- **Instructor**: Dashboard and course management pages for instructors
- **Public**: Landing page and other publicly accessible pages
- **Student**: Dashboard and assignment pages for students

### Services
API service layer for communicating with the backend.

## Development Guidelines

1. Use TypeScript for all components and services
2. Follow the existing folder structure
3. Use Tailwind CSS for styling
4. Create reusable components when possible
5. Use the provided hooks for common functionality

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
```
