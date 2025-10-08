// Simulate the exact form flow for instructor registration
console.log('=== Debugging Instructor Registration Steps ===\n');

// Initial form state
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

let step = 1;  // Initial step
let error = '';

console.log(`Initial state: Step ${step}`);
console.log('Form data:', JSON.stringify(formData, null, 2));

// Step 1: User fills basic info and selects instructor role
console.log('\n--- Step 1: Filling basic info ---');
formData.full_name = 'Test Instructor';
formData.email = `instructor_${Date.now()}@example.com`;
formData.role = 'instructor';  // User selects instructor

console.log('Form data after step 1:', JSON.stringify(formData, null, 2));

// Validate step 1
if (step === 1) {
  if (!formData.full_name || !formData.email || !formData.role) {
    error = 'Please fill in all required fields';
    console.log('❌ Step 1 validation failed:', error);
  } else {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      error = 'Please enter a valid email address';
      console.log('❌ Step 1 validation failed:', error);
    } else {
      console.log('✅ Step 1 validation passed');
      error = '';
    }
  }
}

if (!error) {
  step = 2;
  console.log(`\nMoving to Step ${step}`);
}

// Step 2: For instructor, this is the security step
console.log('\n--- Step 2: Security step (for instructor) ---');
formData.password = 'Password123';
formData.confirmPassword = 'Password123';
formData.agreeToTerms = true;

console.log('Form data after step 2:', JSON.stringify(formData, null, 2));

// Validate step 2
if (step === 2 && formData.role === 'student') {
  console.log('This is student validation - should not apply to instructor');
  if (!formData.student_id || !formData.program || !formData.year_of_study) {
    error = 'Please fill in all required fields';
    console.log('❌ Student validation failed:', error);
  }
}

// For instructors/admins, step 2 is the security step
if (step === 2 && formData.role !== 'student') {
  console.log('This is instructor/admin validation');
  // Validation for password fields for instructors/admins
  if (!formData.password || !formData.confirmPassword) {
    error = 'Please fill in all password fields';
    console.log('❌ Instructor/Admin validation failed:', error);
  } else {
    console.log('✅ Instructor/Admin password validation passed');
    error = '';
  }
}

console.log('\nFinal state:');
console.log(`Step: ${step}`);
console.log(`Role: ${formData.role}`);
console.log(`Error: ${error || 'None'}`);

// Determine if we should submit
const shouldSubmit = (formData.role === 'student' && step === 3) || (formData.role !== 'student' && step === 2);
console.log(`\nShould submit: ${shouldSubmit}`);

if (shouldSubmit && !error) {
  console.log('✅ Form is ready to submit for instructor registration');
} else if (error) {
  console.log('❌ Form has validation errors and cannot submit');
} else {
  console.log('ℹ️  Form is not ready to submit yet');
}