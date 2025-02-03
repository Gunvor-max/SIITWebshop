<template>
  <div class="register-container">
    <div class="register-form">
      <h2>Register user</h2>
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
          <label for="street">Street:</label>
          <input type="text" v-model="street" required />
        </div>
        <div class="form-group">
          <label for="houseNumber">House Number:</label>
          <input type="text" v-model="houseNumber" required />
        </div>
        <div class="form-group">
          <label for="city">City:</label>
          <input type="text" v-model="city" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="phoneNumber">Phone Number:</label>
          <input type="text" v-model="phoneNumber" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit" class="register-button">Register</button>
      </form>
      <p v-if="error" class="error-message">{{ error }}</p>
    </div>

    <div class="register-form">
    <h2>Register admin</h2>
      <form @submit.prevent="registerAdmin">
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
      street: '',
      houseNumber: '',
      city: '',
      email: '',
      phoneNumber: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async register() {
      try {
        // Send email and password to the first API endpoint
        await axios.post('https://localhost:7040/register', {
          email: this.email,
          password: this.password,
        });

        await this.addRole();
        await this.login();

        // Create the request object
        const person = {
          firstName: this.firstname,
          lastName: this.lastname,
          email: this.email,
          phoneNumber: this.phoneNumber,
          addressObj: {
            street: this.street,
            houseNumber: parseInt(this.houseNumber),
            cityObj: {
              name: this.city,
            },
          },
        };

        // Send the request object to the second API endpoint
        await axios.post('https://localhost:7040/Users/CreateUser', person);

        this.$router.push('/'); // Redirect to home or another component
      } catch (error) {
        this.error = 'Registration failed. Please try again.';
      }
    },
    async registerAdmin() {
      try {
        // Send email and password to the first API endpoint
        await axios.post('https://localhost:7040/register', {
          email: this.email,
          password: this.password,
        });

        await this.addRole();
        await this.login();

        this.$router.push('/'); // Redirect to home or another component
      } catch (error) {
        this.error = 'Registration failed. Please try again.';
      }
    },
    async login() {
      try {
        const response = await axios.post('https://localhost:7040/Login', {
          email: this.email,
          password: this.password,
        });
        const token = response.data.accessToken;
        localStorage.setItem('userEmail', this.email);
        localStorage.setItem('accessToken', token);
        this.$router.push('/'); // Redirect to products component
      } catch (error) {
        this.error = 'Invalid email or password';
      }
    },
    async addRole() {
      try {
        await axios.post('https://localhost:7040/api/Users', {
          email: this.email,
        });
        console.log(this.email);
      } catch (error) {
        this.error = 'Failed to add role. Please try again.';
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