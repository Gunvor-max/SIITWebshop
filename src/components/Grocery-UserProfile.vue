<template>
  <div class="register-container">
    <div class="register-form">
      <h2>Brugerprofil</h2>
      <form>
        <div class="form-row">
          <div class="form-group">
            <label for="firstname">Fornavn:</label>
            <input type="text" v-model="firstname" disabled />
          </div>
          <div class="form-group">
            <label for="lastname">Efternavn:</label>
            <input type="text" v-model="lastname" disabled />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" v-model="email" disabled />
          </div>
          <div class="form-group">
            <label for="phoneNumber">Telefonnummer:</label>
            <input type="text" v-model="phoneNumber" disabled />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="street">Gade:</label>
            <input type="text" v-model="street" disabled />
          </div>
          <div class="form-group">
            <label for="houseNumber">Husnummer:</label>
            <input type="text" v-model="houseNumber" disabled />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="city">By:</label>
            <input type="text" v-model="city" disabled />
          </div>
        </div>
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
      error: null,
    };
  },
  async created() {
    try {
      const response = await axios.get(`https://localhost:7040/api/Users/GetById`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      const user = response.data;
      this.firstname = user.firstName;
      this.lastname = user.lastName;
      this.street = user.addressObj.street;
      this.houseNumber = user.addressObj.houseNumber;
      this.city = user.addressObj.cityObj.name;
      this.email = user.email;
      this.phoneNumber = user.phoneNumber;
    } catch (error) {
      this.error = 'Failed to load user profile. Please try again.';
    }
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
  width: 400px;
  text-align: center;
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.form-group {
  flex: 1;
  margin-right: 10px;
}

.form-group:last-child {
  margin-right: 0;
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

.error-message {
  color: red;
  margin-top: 10px;
}
</style>