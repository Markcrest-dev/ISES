const axios = require('axios');

// Base URL for the API
const BASE_URL = 'http://127.0.0.1:8000/api';

async function debugInstructorRegistration() {
  console.log('=== Debugging Instructor Registration ===\n');
  
  // Test data for instructor
  const instructorData = {
    full_name: 'Test Instructor',
    email: `instructor_${Date.now()}@example.com`,
    password: 'Password123',
    role: 'instructor'
  };
  
  console.log('Sending instructor registration data:');
  console.log(JSON.stringify(instructorData, null, 2));
  
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, instructorData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    console.log('\n✅ Instructor registration successful!');
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    
    return true;
  } catch (error) {
    console.log('\n❌ Instructor registration failed:');
    console.log('Error message:', error.message);
    
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Response data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('No response data available');
    }
    
    return false;
  }
}

async function main() {
  console.log('Debugging instructor registration issue...\n');
  const success = await debugInstructorRegistration();
  
  console.log('\n=== Debugging Complete ===');
  console.log(`Instructor registration: ${success ? 'SUCCESS' : 'FAILED'}`);
}

main();