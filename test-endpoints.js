const axios = require('axios');

// Configure axios to not follow redirects
axios.defaults.maxRedirects = 0;

async function testEndpoints() {
  console.log('Testing API endpoints...\n');
  
  try {
    // Test the test endpoint
    console.log('1. Testing /api/test endpoint...');
    const testResponse = await axios.get('http://127.0.0.1:8000/api/test');
    console.log('   ✅ Status:', testResponse.status);
    console.log('   ✅ Response:', testResponse.data);
  } catch (error) {
    console.log('   ❌ Error:', error.message);
    if (error.response) {
      console.log('   ❌ Status:', error.response.status);
      console.log('   ❌ Data:', error.response.data);
    }
  }
  
  console.log('\n');
  
  try {
    // Test the login endpoint
    console.log('2. Testing /api/auth/login endpoint...');
    const loginResponse = await axios.post('http://127.0.0.1:8000/api/auth/login', {
      email: 'test@example.com',
      password: 'Password123'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    console.log('   ✅ Status:', loginResponse.status);
    console.log('   ✅ Response:', loginResponse.data);
  } catch (error) {
    console.log('   ❌ Error:', error.message);
    if (error.response) {
      console.log('   ❌ Status:', error.response.status);
      console.log('   ❌ Data:', error.response.data);
    }
  }
  
  console.log('\n');
  
  try {
    // Test the register endpoint
    console.log('3. Testing /api/auth/register endpoint...');
    const registerResponse = await axios.post('http://127.0.0.1:8000/api/auth/register', {
      full_name: 'Test User',
      email: 'test@example.com',
      password: 'Password123',
      password_confirmation: 'Password123',
      role: 'student',
      student_id: '123456',
      program: 'Computer Science',
      year_of_study: 2
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    console.log('   ✅ Status:', registerResponse.status);
    console.log('   ✅ Response:', registerResponse.data);
  } catch (error) {
    console.log('   ❌ Error:', error.message);
    if (error.response) {
      console.log('   ❌ Status:', error.response.status);
      console.log('   ❌ Data:', error.response.data);
    }
  }
}

testEndpoints();