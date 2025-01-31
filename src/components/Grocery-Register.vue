<template>
    <div class="register-container">
      <div class="register-form">
        <h2>Register</h2>
        <form @submit.prevent="register">
          <div class="form-group">
            <label for="firstname">First Name:</label>
            <input type="text" v-model="firstname" required />
          </div>
          <div class="form-group">
            <label for="lastname">Last Name:</label>
            <input type="text" v-model="lastname" required />
          </div>
          <div class="form-group">
            <label for="city">City:</label>
            <input type="text" v-model="city" required />
          </div>
          <div class="form-group">
            <label for="zipcode">Zip Code:</label>
            <input type="text" v-model="zipcode" required />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" v-model="password" required />
          </div>
          <button type="submit" class="register-button">Register</button>
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
        firstname: '',
        lastname: '',
        city: '',
        zipcode: '',
        email: '',
        password: '',
        error: null,
      };
    },
    methods: {
      async register() {
        try {
          // Send email and password to the first API endpoint
          await axios.post('http://localhost:5272/Register', {
            email: this.email,
            password: this.password,
          });
  
          // Send other information and email to the second API endpoint
          await axios.post('http://localhost:5272/RegisterDetails', {
            firstname: this.firstname,
            lastname: this.lastname,
            city: this.city,
            zipcode: this.zipcode,
            email: this.email,
          });
  
          this.$router.push('/'); // Redirect to home or another component
        } catch (error) {
          this.error = 'Registration failed. Please try again.';
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
  
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    background-color: #f5f5f5;
    overflow: hidden; /* Prevent scrolling */
  }
  
  .register-form {
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
  
  .register-button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
    width: 100%;
  }
  
  .register-button:hover {
    background-color: #45a049;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  </style>