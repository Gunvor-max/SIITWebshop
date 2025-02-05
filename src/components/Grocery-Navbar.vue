<template>
  <nav class="navbar">
    <div class="navbar-brand" @click="goToProducts">My Grocery Store</div>
    <div class="navbar-login">
      <div v-if="isLoggedIn" class="dropdown">
        <button class="dropdown-button">{{ firstName }}</button>
        <div class="dropdown-content">
          <button @click="goToProfile">Profile</button>
          <button @click="logout">Logout</button>
        </div>
      </div>
      <div v-else>
        <button class="login-button" @click="goToLogin">Login</button>
        <button class="register-button" @click="goToRegister">Register</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Grocery-Navbar',
  data() {
    return {
      isLoggedIn: false,
      firstName: ''
    };
  },
  created() {
    this.checkLoginStatus();
    this.firstName = localStorage.getItem('firstName')
  },
  methods: {
    checkLoginStatus() {
      const token = localStorage.getItem('accessToken');
      this.isLoggedIn = !!token;
    },
    handleAuth() {
      if (this.isLoggedIn) {
        this.logout();
      } else {
        this.goToLogin();
      }
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToProducts() {
      this.$router.push('/');
    },
    goToRegister() {
      this.$router.push('/register');
    },
    goToProfile() {
      this.$router.push('/UserProfile');
    },
    logout() {
      localStorage.removeItem('accessToken');
      this.isLoggedIn = false;
      this.$router.push('/login');
    },
  },
  watch: {
    '$route'() {
      this.checkLoginStatus();
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #333;
  color: white;
}

.navbar-brand {
  font-size: 24px;
  cursor: pointer;
}

.navbar-login .login-button,
.navbar-login .register-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
}

.navbar-login .login-button:hover,
.navbar-login .register-button:hover {
  background-color: #45a049;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content button {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
}

.dropdown-content button:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropdown-button {
  background-color: #45a049;
}
</style>