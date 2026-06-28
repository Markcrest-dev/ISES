require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

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

async function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function enrollExisting() {
  console.log('Fetching all students...');
  
  const { data: students, error: studentError } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'student');

  if (studentError) {
    console.error('Error fetching students:', studentError.message);
    return;
  }

  // Filter out the dummy ones
  const dummyEmails = ['student1@ises.edu', 'student2@ises.edu', 'student3@ises.edu', 'student4@ises.edu'];
  const existingStudents = students.filter(s => !dummyEmails.includes(s.email));

  if (existingStudents.length === 0) {
    console.log('No existing students found other than the dummies!');
    return;
  }

  console.log('Found existing student(s):');
  existingStudents.forEach(s => console.log(`- ${s.email} (${s.full_name})`));

  console.log('\nFetching courses...');
  const { data: courses, error: courseError } = await supabase
    .from('courses')
    .select('id, course_code');

  if (courseError) {
    console.error('Error fetching courses:', courseError.message);
    return;
  }

  for (const student of existingStudents) {
    console.log(`Enrolling ${student.email}...`);
    for (const course of courses) {
      let success = false;
      let attempts = 0;

      while (!success && attempts < 3) {
        attempts++;
        const { error } = await supabase
          .from('enrollments')
          .insert({
            course_id: course.id,
            student_id: student.id,
            status: 'active'
          });

        if (error && error.code !== '23505') {
          console.error(`  Failed to enroll in ${course.course_code}: ${error.message}. Retrying...`);
          await delay(2000);
        } else if (!error) {
          console.log(`  Successfully enrolled in ${course.course_code}`);
          success = true;
        } else {
           console.log(`  Already enrolled in ${course.course_code}`);
           success = true;
        }
      }
      
      await delay(1000); // Wait 1s between courses to prevent fetch failure
    }
  }

  console.log('Done!');
}

enrollExisting().catch(console.error);
