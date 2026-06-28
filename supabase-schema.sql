-- ============================================================
-- ISES (Intelligent Student Evaluation System) — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. PROFILES TABLE (extends auth.users)
-- ==============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
  student_id TEXT,
  program TEXT,
  year_of_study INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. COURSES TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS courses (
  id BIGSERIAL PRIMARY KEY,
  course_code TEXT NOT NULL UNIQUE,
  course_name TEXT NOT NULL,
  description TEXT,
  instructor_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  semester TEXT NOT NULL,
  year INTEGER NOT NULL,
  credits INTEGER DEFAULT 3,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ENROLLMENTS TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS enrollments (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, student_id)
);

-- 4. EVALUATIONS TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS evaluations (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  instructor_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  evaluation_type TEXT NOT NULL CHECK (evaluation_type IN ('midterm','final','assignment','quiz','project','participation')),
  title TEXT NOT NULL,
  description TEXT,
  score DECIMAL(5,2) NOT NULL,
  max_score DECIMAL(5,2) DEFAULT 100,
  percentage DECIMAL(5,2),
  grade TEXT,
  feedback TEXT,
  strengths TEXT,
  areas_for_improvement TEXT,
  evaluation_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. AUTO-CREATE PROFILE ON SIGNUP (trigger)
-- ==============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists, then recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. ROW LEVEL SECURITY (RLS)
-- ==============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Anyone can read profiles"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Courses Policies
CREATE POLICY "Anyone can read courses"
  ON courses FOR SELECT USING (true);

CREATE POLICY "Instructors can create courses"
  ON courses FOR INSERT WITH CHECK (auth.uid() = instructor_id);

CREATE POLICY "Instructors can update own courses"
  ON courses FOR UPDATE USING (auth.uid() = instructor_id);

-- Enrollments Policies
CREATE POLICY "Anyone can read enrollments"
  ON enrollments FOR SELECT USING (true);

CREATE POLICY "Authenticated can create enrollments"
  ON enrollments FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated can delete enrollments"
  ON enrollments FOR DELETE USING (auth.uid() IS NOT NULL);

-- Evaluations Policies
CREATE POLICY "Anyone can read evaluations"
  ON evaluations FOR SELECT USING (true);

CREATE POLICY "Instructors can create evaluations"
  ON evaluations FOR INSERT WITH CHECK (auth.uid() = instructor_id);

CREATE POLICY "Instructors can update evaluations"
  ON evaluations FOR UPDATE USING (auth.uid() = instructor_id);

CREATE POLICY "Instructors can delete evaluations"
  ON evaluations FOR DELETE USING (auth.uid() = instructor_id);

-- ============================================================
-- DONE! Your database is ready.
-- ============================================================
