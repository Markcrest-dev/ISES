const axios = require('axios');

// Base URL for the API
const BASE_URL = 'http://127.0.0.1:8000/api';

async function testRegistration(role, userData) {
  console.log(`\n=== Testing ${role} registration ===`);
  
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    console.log(`✅ ${role.charAt(0).toUpperCase() + role.slice(1)} registration successful!`);
    console.log('Status:', response.status);
    console.log('User ID:', response.data.user.id);
    console.log('Role:', response.data.user.role);
    
    // Verify that student fields are null for non-student users
    if (role !== 'student') {
      if (response.data.user.student_id === null && 
          response.data.user.program === null && 
          response.data.user.year_of_study === null) {
        console.log('✅ Student fields correctly set to null for non-student user');
      } else {
        console.log('⚠️  Student fields not correctly set to null for non-student user');
        console.log('Student ID:', response.data.user.student_id);
        console.log('Program:', response.data.user.program);
        console.log('Year of Study:', response.data.user.year_of_study);
      }
    }
    
    return true;
  } catch (error) {
    console.log(`❌ ${role.charAt(0).toUpperCase() + role.slice(1)} registration failed:`);
    console.log('Error:', error.message);
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    }
    return false;
  }
}

async function main() {
  console.log('Verifying registration fix for all user roles...\n');
  
  // Test data for student
  const studentData = {
    full_name: 'Test Student Fix',
    email: `student_fix_${Date.now()}@example.com`,
    password: 'Password123',
    role: 'student',
    student_id: 'STU789012',
    program: 'Software Engineering',
    year_of_study: 3
  };
  
  // Test data for instructor
  const instructorData = {
    full_name: 'Test Instructor Fix',
    email: `instructor_fix_${Date.now()}@example.com`,
    password: 'Password123',
    role: 'instructor'
  };
  
  // Test data for administrator
  const adminData = {
    full_name: 'Test Administrator Fix',
    email: `admin_fix_${Date.now()}@example.com`,
    password: 'Password123',
    role: 'admin'
  };
  
  // Test all roles
  const studentSuccess = await testRegistration('student', studentData);
  const instructorSuccess = await testRegistration('instructor', instructorData);
  const adminSuccess = await testRegistration('administrator', adminData);
  
  console.log('\n=== SUMMARY ===');
  console.log(`Student registration: ${studentSuccess ? 'SUCCESS' : 'FAILED'}`);
  console.log(`Instructor registration: ${instructorSuccess ? 'SUCCESS' : 'FAILED'}`);
  console.log(`Administrator registration: ${adminSuccess ? 'SUCCESS' : 'FAILED'}`);
  
  if (studentSuccess && instructorSuccess && adminSuccess) {
    console.log('\n🎉 All registrations successful! The fix is working correctly.');
  } else {
    console.log('\n❌ Some registrations failed. The fix may need additional work.');
  }
}

main();