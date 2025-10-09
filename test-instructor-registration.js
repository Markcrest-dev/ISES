// Test script to debug instructor registration
const axios = require('axios');

const API_URL = 'http://localhost:8000/api';

async function testInstructorRegistration() {
  console.log('Testing instructor registration...\n');

  const testData = {
    full_name: 'Test Instructor',
    email: `instructor${Date.now()}@test.com`,
    role: 'instructor',
    password: 'TestPassword123'
  };

  console.log('Sending data:', JSON.stringify(testData, null, 2));

  try {
    const response = await axios.post(`${API_URL}/auth/register`, testData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log('\n✅ SUCCESS!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log('\n❌ FAILED!');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('Error:', error.message);
    }
  }
}

testInstructorRegistration();
