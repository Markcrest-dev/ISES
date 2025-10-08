const axios = require('axios');

// Base URL for the API
const BASE_URL = 'http://127.0.0.1:8000/api';

// Simulate what might be happening in the frontend form
async function simulateInstructorForm() {
  console.log('=== Simulating Instructor Registration Form Flow ===\n');
  
  // This simulates the initial form state (role defaults to 'student')
  let formData = {
    full_name: '',
    email: '',
    role: 'student',  // Default role
    student_id: '',
    program: '',
    year_of_study: 1,
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  };
  
  console.log('Initial form state:');
  console.log(JSON.stringify(formData, null, 2));
  
  // User fills step 1 fields
  formData.full_name = 'Test Instructor';
  formData.email = `instructor_${Date.now()}@example.com`;
  formData.role = 'instructor';  // User selects instructor role
  
  console.log('\nAfter filling step 1 (with instructor role):');
  console.log(JSON.stringify(formData, null, 2));
  
  // User proceeds to step 2 (security step for instructors)
  console.log('\nProceeding to step 2 (security step for instructor)...');
  
  // User fills password fields
  formData.password = 'Password123';
  formData.confirmPassword = 'Password123';
  formData.agreeToTerms = true;
  
  console.log('\nAfter filling step 2 (security fields):');
  console.log(JSON.stringify(formData, null, 2));
  
  // Prepare data for API call (this is what the frontend should send)
  const registrationData = {
    full_name: formData.full_name,
    email: formData.email,
    role: formData.role,
    password: formData.password
  };
  
  console.log('\nData being sent to API:');
  console.log(JSON.stringify(registrationData, null, 2));
  
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, registrationData, {
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
  console.log('Simulating instructor registration form flow...\n');
  const success = await simulateInstructorForm();
  
  console.log('\n=== Simulation Complete ===');
  console.log(`Instructor registration simulation: ${success ? 'SUCCESS' : 'FAILED'}`);
}

main();