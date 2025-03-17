<template>
  <nav class="navbar">
    <div class="navbar-brand" @click="goToProducts">Online indkøb</div>
    <div class="navbar-search">
      <input
        type="text"
        v-model="searchQuery"
        @keydown.enter="searchProducts"
        placeholder="Søg efter produkter"
        class="search-input"
      />
      <button @click="searchProducts" class="search-button">
        <i class="fa fa-search"></i>
      </button>
    </div>
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
        <button class="register-button" @click="goToRegister">Opret bruger</button>
        <button class="basket-button" @click="goToBasket">
          <i class="fas fa-shopping-cart"></i>
          ({{ basketItemCount }})
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Grocery-Navbar',
  data() {
    return {
      isLoggedIn: false,
      firstName: '',
      searchQuery: '',
    };
  },
  computed: {
    ...mapGetters(['basketItemCount']), // Map the basketItemCount getter to the component
  },
  created() {
    this.checkLoginStatus();
    this.firstName = localStorage.getItem('firstName');
  },
  methods: {
    ...mapActions(['fetchSearchedProducts', 'fetchAllProducts']),
    async searchProducts() {
      try {
        if (this.searchQuery.trim() === '') {
          await this.fetchAllProducts();
        } else {
          await this.fetchSearchedProducts(this.searchQuery);
        }
      } catch (error) {
        console.error('Error searching products:', error);
      }
    },
    checkLoginStatus() {
      const token = localStorage.getItem('accessToken');
      this.isLoggedIn = !!token;
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToProducts() {
      const timestamp = Date.now();
      this.$router.push({ path: '/', query: { reload: timestamp } });
    },
    goToRegister() {
      this.$router.push('/register');
    },
    goToProfile() {
      this.$router.push('/UserProfile');
    },
    goToBasket() {
      this.$router.push('/Basket');
    },
    logout() {
      localStorage.removeItem('accessToken');
      this.isLoggedIn = false;
      this.$router.push('/login');
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

.navbar-search {
  display: flex; /* Added to make it a flex container */
  align-items: center; /* Align items vertically */
  gap: 8px; /* Optional: adds spacing between the input and button */
}

.navbar-search .search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.navbar-search .search-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar-search .search-button:hover {
  background-color: #45a049;
}

.navbar-search .search-button i {
  font-size: 16px;
}

.navbar-login .login-button,
.navbar-login .basket-button,
.navbar-login .register-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
}

.navbar-login .login-button:hover,
.navbar-login .basket-button:hover,
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
