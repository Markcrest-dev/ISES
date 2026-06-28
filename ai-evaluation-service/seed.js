require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function seed() {
  console.log('Starting seed process...');
  const credentials = [];

  // Generate 5 Instructors
  const instructors = [];
  for (let i = 1; i <= 5; i++) {
    const email = `instructor${i}@ises.edu`;
    const password = `password123`;
    const fullName = `Dr. Instructor ${i}`;

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName, role: 'instructor' }
    });

    if (authError) {
      console.log(`Failed to create ${email}: ${authError.message}`);
      continue;
    }

    // Wait a brief moment to ensure trigger runs
    await new Promise(r => setTimeout(r, 500));

    instructors.push(authData.user);
    credentials.push({ role: 'Instructor', name: fullName, email, password });
    console.log(`Created instructor: ${email}`);
  }

  // Generate 4 Students
  const students = [];
  for (let i = 1; i <= 4; i++) {
    const email = `student${i}@ises.edu`;
    const password = `password123`;
    const fullName = `Student ${i} Name`;

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName, role: 'student' }
    });

    if (authError) {
      console.log(`Failed to create ${email}: ${authError.message}`);
      continue;
    }

    await new Promise(r => setTimeout(r, 500));

    students.push(authData.user);
    credentials.push({ role: 'Student', name: fullName, email, password });
    console.log(`Created student: ${email}`);
  }

  // Save credentials to file
  const credsText = credentials.map(c => `${c.role} | ${c.name} | ${c.email} | ${c.password}`).join('\n');
  fs.writeFileSync('../dummy_logins.txt', credsText);
  console.log('Saved credentials to ../dummy_logins.txt');

  // Create Courses and Assignments for each instructor
  for (let i = 0; i < instructors.length; i++) {
    const instructor = instructors[i];
    
    // Create course
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .insert({
        course_code: `CS10${i + 1}`,
        course_name: `Computer Science 10${i + 1}`,
        description: `Introduction to CS 10${i + 1}`,
        instructor_id: instructor.id,
        semester: 'Fall',
        year: 2026,
        credits: 3
      })
      .select()
      .single();

    if (courseError) {
      console.error('Error creating course:', courseError.message);
      continue;
    }
    console.log(`Created course ${course.course_code} for instructor ${i+1}`);

    // Enroll all students in this course
    const enrollments = students.map(student => ({
      course_id: course.id,
      student_id: student.id,
      status: 'active'
    }));

    const { error: enrollError } = await supabase
      .from('enrollments')
      .insert(enrollments);

    if (enrollError) console.error('Error enrolling students:', enrollError.message);

    // Create an assignment
    const { data: assignment, error: assignError } = await supabase
      .from('assignments')
      .insert({
        course_id: course.id,
        instructor_id: instructor.id,
        title: `AI Evaluation Test Assignment ${i + 1}`,
        description: `Write a short essay about the history of artificial intelligence and its impact on modern society. Ensure you cover at least two major milestones.`,
        total_points: 100,
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
      });
      
    if (assignError) console.error('Error creating assignment:', assignError.message);
    else console.log(`Created assignment for course ${course.course_code}`);
  }

  console.log('Seed complete!');
}

seed().catch(console.error);
