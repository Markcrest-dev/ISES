const axios = require('axios');

// Base URL for the API
const BASE_URL = 'http://127.0.0.1:8000/api';

async function testRegistration(role, userData) {
  console.log(`\nTesting ${role} registration...`);
  
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
    
    // Test login with the new user
    console.log(`\nTesting ${role} login...`);
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: userData.email,
      password: userData.password
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    console.log(`✅ ${role.charAt(0).toUpperCase() + role.slice(1)} login successful!`);
    console.log('Status:', loginResponse.status);
    console.log('Token received:', loginResponse.data.token.length > 0 ? 'Yes' : 'No');
    
    return response.data.user;
  } catch (error) {
    console.log(`❌ ${role.charAt(0).toUpperCase() + role.slice(1)} registration failed:`);
    console.log('Error:', error.message);
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    }
    return null;
  }
}

async function main() {
  console.log('Testing registration for all user roles...\n');
  
  // Test data for student
  const studentData = {
    full_name: 'Test Student',
    email: `student_${Date.now()}@example.com`,
    password: 'Password123',
    role: 'student',
    student_id: 'STU123456',
    program: 'Computer Science',
    year_of_study: 2
  };
  
  // Test data for instructor
  const instructorData = {
    full_name: 'Test Instructor',
    email: `instructor_${Date.now()}@example.com`,
    password: 'Password123',
    role: 'instructor'
  };
  
  // Test data for administrator
  const adminData = {
    full_name: 'Test Administrator',
    email: `admin_${Date.now()}@example.com`,
    password: 'Password123',
    role: 'admin'
  };
  
  // Test all roles
  const studentUser = await testRegistration('student', studentData);
  const instructorUser = await testRegistration('instructor', instructorData);
  const adminUser = await testRegistration('administrator', adminData);
  
  console.log('\n=== SUMMARY ===');
  console.log(`Student registration: ${studentUser ? 'SUCCESS' : 'FAILED'}`);
  console.log(`Instructor registration: ${instructorUser ? 'SUCCESS' : 'FAILED'}`);
  console.log(`Administrator registration: ${adminUser ? 'SUCCESS' : 'FAILED'}`);
  
  if (studentUser && instructorUser && adminUser) {
    console.log('\n🎉 All registrations successful!');
  } else {
    console.log('\n❌ Some registrations failed.');
  }
}

main();