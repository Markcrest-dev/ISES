const axios = require('axios');

// Base URL for the API
const BASE_URL = 'http://127.0.0.1:8000/api';

// Test various edge cases for instructor registration
async function testInstructorEdgeCases() {
  console.log('=== Testing Instructor Registration Edge Cases ===\n');
  
  const testCases = [
    {
      name: 'Normal instructor registration',
      data: {
        full_name: 'Test Instructor',
        email: `instructor_normal_${Date.now()}@example.com`,
        password: 'Password123',
        role: 'instructor'
      }
    },
    {
      name: 'Instructor with extra student fields (should be ignored)',
      data: {
        full_name: 'Test Instructor Extra Fields',
        email: `instructor_extra_${Date.now()}@example.com`,
        password: 'Password123',
        role: 'instructor',
        student_id: 'STU123456',  // These should be ignored
        program: 'Computer Science',  // These should be ignored
        year_of_study: 2  // These should be ignored
      }
    },
    {
      name: 'Instructor with empty student fields',
      data: {
        full_name: 'Test Instructor Empty Fields',
        email: `instructor_empty_${Date.now()}@example.com`,
        password: 'Password123',
        role: 'instructor',
        student_id: '',  // Empty string
        program: '',  // Empty string
        year_of_study: null  // Null value
      }
    },
    {
      name: 'Instructor with undefined student fields',
      data: {
        full_name: 'Test Instructor Undefined Fields',
        email: `instructor_undefined_${Date.now()}@example.com`,
        password: 'Password123',
        role: 'instructor'
        // Note: student_id, program, year_of_study are not included
      }
    }
  ];
  
  for (const testCase of testCases) {
    console.log(`\n--- ${testCase.name} ---`);
    console.log('Sending data:', JSON.stringify(testCase.data, null, 2));
    
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, testCase.data, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      console.log('✅ Registration successful!');
      console.log('Status:', response.status);
      console.log('User role:', response.data.user.role);
      console.log('Student ID:', response.data.user.student_id);
      console.log('Program:', response.data.user.program);
      console.log('Year of Study:', response.data.user.year_of_study);
      
      // Verify that student fields are null for instructor
      if (response.data.user.role === 'instructor') {
        if (response.data.user.student_id === null && 
            response.data.user.program === null && 
            response.data.user.year_of_study === null) {
          console.log('✅ Student fields correctly set to null for instructor');
        } else {
          console.log('⚠️  Student fields not correctly set to null for instructor');
        }
      }
    } catch (error) {
      console.log('❌ Registration failed:');
      console.log('Error message:', error.message);
      
      if (error.response) {
        console.log('Status:', error.response.status);
        console.log('Response data:', JSON.stringify(error.response.data, null, 2));
      }
    }
  }
}

async function main() {
  console.log('Testing instructor registration edge cases...\n');
  await testInstructorEdgeCases();
  
  console.log('\n=== Edge Case Testing Complete ===');
}

main();