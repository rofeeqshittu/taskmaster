# TaskMaster

## Overview

**TaskMaster** is a full-stack task management system designed to streamline task organization and management. The application allows users to register, log in, and manage tasks with features such as priority assignment, deadlines, filtering, and search functionality. The goal is to provide an intuitive, secure, and scalable platform for efficient task management.

## Concepts

This project integrates key concepts of modern web development, including:

- **Backend Development**: Built with Node.js and Express.js, the backend provides a robust API for user authentication and task management.
- **Database Integration**: Data is managed using MongoDB/PostgreSQL to store users and tasks securely.
- **Frontend Development**: A responsive interface built with HTML, CSS, and JavaScript ensures seamless interaction.
- **Authentication**: Secure user registration and login using JWT and bcrypt.
- **Async Operations**: Leverages asynchronous programming with `fetch`, Promises, and `async/await` for smooth data handling.
- **Testing & Deployment**: Includes unit tests and deployment on Fly.io (backend) and Vercel/Netlify (frontend).

## Features

- **User Registration and Login**: Secure registration and authentication.
- **Task Management**:
  - Create, update, and delete tasks.
  - Assign priorities and deadlines.
- **Task Filtering**: Filter tasks by priority or deadline.
- **Search Functionality**: Search for tasks using keywords.
- **Secure and Scalable**: Input validation, protection against SQL injection and XSS attacks.

## Project Setup

### Prerequisites

- **Backend**:
  - Node.js (v16+)
  - MongoDB or PostgreSQL
- **Frontend**:
  - Modern browser with JavaScript enabled

### Backend Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rofeeqshittu/taskmaster.git
   cd taskmaster/backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables: Create a `.env` file in the `backend` directory with the following variables:
    ```bash
    PORT=5000
    JWT_SECRET=your_secret_key
    DB_URI=your_database_uri
    ```

4. Start the server:
    ```bash
    npm run start
    ```

### Frontend Installation

1. Navigate to the `frontend` folder:
    ```bash
    cd taskmaster/frontend
    ```

2. Open `index.html` in a browser or use a local development server:
    ```bash
    npx serve
    ```

### API Endpoints
- **Authentication**
    - **POST /api/auth/register**: Register a new user.
    - **POST /api/auth/login**: Authenticate and log in a user.

- **Task Management**
    - **GET /api/tasks**: Retrieve tasks for the logged-in user.
    - **POST /api/tasks**: Create a new task.
    - **PUT /api/tasks/:id**: Update a task by its ID.
    - **DELETE /api/tasks/:id**: Delete a task by its ID.
 
-- Tasks

| #   | Filename/Component              | Description                             |
| --- | -------------------------------- | --------------------------------------- |
| 1   | `backend/routes/auth.js`        | Handles user registration and login.    |
| 2   | `backend/routes/tasks.js`       | Manages CRUD operations for tasks.      |
| 3   | `frontend/js/app.js`            | Frontend logic for interacting with the backend. |
| 4   | `frontend/index.html`           | Main user interface for the application.|

---

## Deployment

- **Backend**: Hosted on [Fly.io](https://fly.io/).
- **Frontend**: Hosted on [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

---

## Live Demo

[Click here to view the live app](https://your-app-link.com)

---

## Future Enhancements

- Implement drag-and-drop task organization.
- Add email notifications for task deadlines.
- Introduce real-time task updates using WebSockets.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contributors

- **Rofeeq Shittu** - Developer|Designer

---
© Rofeeq Shittu - 2024
