<template>
  <nav class="navbar">
    <div class="navbar-brand" @click="goToProducts">My Grocery Store</div>
    <div class="navbar-login">
      <button class="login-button" @click="handleAuth">{{ isLoggedIn ? 'Logout' : 'Login' }}</button>
      <button class="register-button" @click="goToRegister">Register</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Grocery-Navbar',
  data() {
    return {
      isLoggedIn: false,
    };
  },
  created() {
    this.checkLoginStatus();
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
</style>