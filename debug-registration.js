const axios = require('axios');

// Base URL for the API
const BASE_URL = 'http://127.0.0.1:8000/api';

async function debugRegistration(role, userData) {
  console.log(`\n=== Debugging ${role} registration ===`);
  console.log('Sending data:', JSON.stringify(userData, null, 2));
  
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    console.log(`✅ ${role.charAt(0).toUpperCase() + role.slice(1)} registration successful!`);
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    console.log(`❌ ${role.charAt(0).toUpperCase() + role.slice(1)} registration failed:`);
    console.log('Error message:', error.message);
    
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Response data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('No response data available');
    }
    
    return null;
  }
}

async function main() {
  console.log('Debugging registration issues for admin and instructor...\n');
  
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
  
  // Test instructor registration
  await debugRegistration('instructor', instructorData);
  
  // Test administrator registration
  await debugRegistration('administrator', adminData);
  
  console.log('\n=== Debugging Complete ===');
}

main();