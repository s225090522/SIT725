const apiBase = '/api/auth';

// Handle Signup (only if signup-form exists)
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch(`${apiBase}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        window.location.href = 'login.html'; // Redirect to login page
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup. Please try again.');
    }
  });
}

// Handle Login (only if login-form exists)
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch(`${apiBase}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = response;//.json();

      if (response.ok) {
        alert(data.message);
        localStorage.setItem('token', data.token); // Store the token in localStorage
        window.location.href = 'index.html'; // Redirect to homepage
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  });
}

// Check if User is Logged In
window.onload = () => {
  const token = localStorage.getItem('token');
  if (token) {
    console.log('User is logged in.');
  } else {
    console.log('User is not logged in.');
  }
};
