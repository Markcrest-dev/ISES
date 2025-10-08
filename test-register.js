const axios = require('axios');

async function testRegister() {
  console.log('Testing user registration with a new email...\n');
  
  // Generate a unique email for testing
  const uniqueEmail = `test_${Date.now()}@example.com`;
  
  try {
    const registerResponse = await axios.post('http://127.0.0.1:8000/api/auth/register', {
      full_name: 'Test User',
      email: uniqueEmail,  // Unique email
      password: 'Password123',
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
    console.log('✅ Registration successful!');
    console.log('Status:', registerResponse.status);
    console.log('Response:', registerResponse.data);
    
    // Try to login with the new user
    console.log('\nTesting login with the new user...\n');
    const loginResponse = await axios.post('http://127.0.0.1:8000/api/auth/login', {
      email: uniqueEmail,
      password: 'Password123'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    console.log('✅ Login successful!');
    console.log('Status:', loginResponse.status);
    console.log('Response:', loginResponse.data);
    
  } catch (error) {
    console.log('❌ Error:', error.message);
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    }
  }
}

testRegister();