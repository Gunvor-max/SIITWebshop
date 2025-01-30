<template>
    <div class="login-container">
      <div class="login-form">
        <h2>Login</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" v-model="password" required />
          </div>
          <button type="submit" class="login-button">Login</button>
        </form>
        <p v-if="error" class="error-message">{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        error: null,
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:5272/Login', {
            email: this.email,
            password: this.password,
          });
          const token = response.data.accessToken;
          localStorage.setItem('accessToken', token);
          this.$router.push('/'); // Redirect to products component
        } catch (error) {
          this.error = 'Invalid email or password';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  html, body {
    height: 100%;
    margin: 0;
  }
  
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    background-color: #f5f5f5;
    overflow: hidden; /* Prevent scrolling */
  }
  
  .login-form {
    background-color: white;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .login-button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
    width: 100%;
  }
  
  .login-button:hover {
    background-color: #45a049;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  </style>