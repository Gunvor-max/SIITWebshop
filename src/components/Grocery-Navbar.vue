<template>
  <nav class="navbar">
    <div class="navbar-brand" @click="goToProducts">Online Indkøb</div>
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
    <div v-if="isLoggedIn" class="navbar-login">
      <!-- Dropdown is its own container -->
      <div class="dropdown">
        <button class="dropdown-button">{{ firstName }}</button>
        <div class="dropdown-content">
          <button @click="goToProfile">Profile</button>
          <button @click="logout">Logout</button>
        </div>
      </div>
      <!-- Basket button is separate -->
      <button class="basket-button" @click="goToBasket">
        <i class="fas fa-shopping-cart"></i> ({{ basketItemCount }})
      </button>
    </div>
    <div v-else class="navbar-logout">
      <!-- Separate container for login and register buttons -->
      <button class="login-button" @click="goToLogin">Login</button>
      <button class="register-button" @click="goToRegister">Opret Bruger</button>
    </div>
  </nav>
</template>


<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import axios from 'axios'

export default {
  name: 'Grocery-Navbar',
  data() {
    return {
      searchQuery: '',
      isDropdownVisible: false, // State to toggle dropdown visibility
    };
  },
  computed: {
    ...mapState(['isLoggedIn']), // Accessing the isLoggedIn state directly
    ...mapGetters(['basketItemCount']), // Fetching basket item count from Vuex getters
    firstName() {
      return localStorage.getItem('firstName'); // Pull first name directly from local storage
    },
  },
  created() {
    this.$store.dispatch('checkLogin'); // Validate login status when component is created
  },
  methods: {
    ...mapActions(['fetchSearchedProducts', 'fetchAllProducts']),
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible; // Toggle visibility state
    },
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
    goToLogin() {
      this.$router.push('/login');
    },
    goToProducts() {
      this.$router.push({ path: '/' });
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
    async logout() {
  try {
    // Make a request to the backend to clear the session and cookies
    await axios.post('https://localhost:7040/api/Users/Logout', {}, {
      withCredentials: true, // Include cookies in the request
    });

    // Clear local storage and Vuex state
    localStorage.removeItem('accessToken');
    this.$store.commit('SET_LOGIN_STATUS', false);

    // Redirect to the login page
    this.$router.push('/login');
  } catch (error) {
    console.error('Error during logout:', error);
  }
},
  },
};
</script>

<style scoped>
/* Common navbar styles */
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
  display: flex;
  align-items: center;
  gap: 8px;
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
}

/* Navbar login/logout container styles */
.navbar-login .basket-button {
  margin-left: 16px; /* Consistent spacing for basket */
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.navbar-login .basket-button:hover {
  background-color: #45a049;
}

.navbar-logout .login-button,
.navbar-logout .register-button {
  /* Consistent styles for non-logged-in buttons */
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.navbar-logout .register-button {
  margin-left: 16px; /* Add consistent spacing between the buttons */
}

.navbar-logout .login-button:hover,
.navbar-logout .register-button:hover {
  background-color: #45a049;
}

/* Dropdown-specific styles */
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
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
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
  cursor: pointer;
}

.dropdown-content button:hover {
  background-color: #f1f1f1;
}

/* Ensure only the dropdown button triggers hover */
.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropdown-button {
  background-color: #45a049;
}
</style>





