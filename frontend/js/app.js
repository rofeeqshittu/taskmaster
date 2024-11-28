// frontend/js/app.js

const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const taskContainer = document.getElementById('task-container');
const newTaskBtn = document.getElementById('new-task-btn');

// Handle user registration
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  const response = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();
  if (data.token) {
    alert('Registration successful! You can now log in.');
    registerForm.reset();
  } else {
    alert('Registration failed: ' + data.message);
  }
});

// Handle user login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
    alert('Login successful!');
    loginForm.reset();
    fetchTasks();
  } else {
    alert('Login failed: ' + data.message);
  }
});

// Fetch tasks for the logged-in user
async function fetchTasks() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please log in first.');
    return;
  }

  const response = await fetch('http://localhost:5000/api/tasks', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const tasks = await response.json();
  taskContainer.innerHTML = '';
  tasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Priority: ${task.priority}</p>
      <p>Deadline: ${new Date(task.deadline).toLocaleDateString()}</p>
    `;
    taskContainer.appendChild(taskDiv);
  });
}

// Fetch tasks when page loads
if (localStorage.getItem('token')) {
  fetchTasks();
}


// <!-- Later in js/app.js -->
newTaskBtn.addEventListener('click', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please log in first.');
    return;
  }

  const taskData = {
    title: 'Sample Task',
    description: 'This is a sample task description.',
    deadline: new Date().toISOString(),
    priority: 'medium',
  };

  const response = await fetch('http://localhost:5000/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });

  const task = await response.json();
  if (response.ok) {
    alert('Task created successfully!');
    fetchTasks();  // Refresh the task list
  } else {
    alert('Error creating task');
  }
});

