import { createStore } from 'vuex';
import { fetchBasket, reserveAndGetBasket, removeAndGetBasket, fetchAllProducts, fetchSearchedProducts, checkLogin } from './productService';

const store = createStore({
  state: {
    basket: [],
    products: [], // Store the fetched products
    statusCode: null, // Store the status code
    isLoggedIn: false,
  },
  mutations: {
    SET_LOGIN_STATUS(state, status) {
      state.isLoggedIn = status;
    },
    SET_BASKET(state, basket) {
      const groupedBasket = [];
      basket.forEach((item) => {
        const existingItem = groupedBasket.find((i) => i.varenummer === item.varenummer);
        if (existingItem) {
          existingItem.quantity = (existingItem.quantity || 1) + (item.quantity || 1);
        } else {
          groupedBasket.push({ ...item, quantity: item.quantity || 1 });
        }
      });
      state.basket = groupedBasket;
    },
    SET_PRODUCTS(state, products) {
      state.products = products; // Update the products in Vuex state
    },
    DECREMENT_ITEM(state, varenummer) {
      const item = state.basket.find((i) => i.varenummer === varenummer);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.basket = state.basket.filter((i) => i.varenummer !== varenummer);
      }
    },
    SET_STATUS_CODE(state, code) {
      state.statusCode = code; // Update the status code
    },
  },
  actions: {
    async checkLogin({ commit }) {
      try {
        const response = await checkLogin();
        console.log('Response from API:', response); // Debugging
        commit('SET_LOGIN_STATUS', response); // Commit the actual boolean value
      } catch (error) {
        console.error('Error during login check:', error);
        commit('SET_LOGIN_STATUS', false); // Ensure fallback to false
      }
    },    
    async fetchAllProducts({ commit }) {
      try {
        const response = await fetchAllProducts(); // Call the service function
        commit('SET_PRODUCTS', response.data); // Commit the products data to Vuex state
        commit('SET_STATUS_CODE', response.status); // Commit the status code
      } catch (error) {
        console.error('Error fetching all products:', error);
        // Handle the case where the server is unreachable (e.g., ERR_CONNECTION_REFUSED)
        commit('SET_PRODUCTS', []); // Clear the products list in case of an error
        commit('SET_STATUS_CODE', error.response ? error.response.status : 0); // Commit status code 0 for network errors
      }
    },    
    async fetchSearchedProducts({ commit }, query) {
      try {
        const response = await fetchSearchedProducts(query); // Call the service function
        commit('SET_PRODUCTS', response.data); // Commit products to Vuex state
        commit('SET_STATUS_CODE', response.status); // Commit the status code
      } catch (error) {
        console.error('Error fetching searched products:', error);
        // If there's no response, set status code to 0 for a network error
        commit('SET_STATUS_CODE', error.response ? error.response.status : 0);
      }
    },
    async fetchBasket({ commit }) {
      try {
        const basketData = await fetchBasket();
        const groupedBasket = [];
        basketData.forEach((item) => {
          const existingItem = groupedBasket.find((i) => i.varenummer === item.varenummer);
          if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + (item.quantity || 1);
          } else {
            groupedBasket.push({ ...item, quantity: item.quantity || 1 });
          }
        });
        commit('SET_BASKET', groupedBasket);
      } catch (error) {
        console.error('Error fetching basket:', error);
      }
    },
    async reserveProduct({ commit }, productId) {
      try {
        const updatedBasket = await reserveAndGetBasket(productId);
        commit('SET_BASKET', updatedBasket);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert('Du skal være logget ind for at kunne købe et produkt.');
        } else {
          console.error('Error updating basket:', error);
          alert('Something went wrong. Please try again.');
        }
      }
    },
    async removeReservedProduct({ commit }, productId) {
      try {
        const updatedBasket = await removeAndGetBasket(productId);
        commit('SET_BASKET', updatedBasket);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert('Du skal være logget ind for at kunne købe et produkt.');
        } else {
          console.error('Error updating basket:', error);
          alert('Something went wrong. Please try again.');
        }
      }
    },
    decrementItem({ commit }, varenummer) {
      commit('DECREMENT_ITEM', varenummer);
    },
  },
  getters: {
    basketItems: (state) => state.basket,
    basketItemCount: (state) =>
      Array.isArray(state.basket)
        ? state.basket.reduce((total, item) => total + (item.quantity || 1), 0)
        : 0,
    productList: (state) => state.products, // Getter for the products
    statusCode: (state) => state.statusCode,
    isLoggedIn: (state) => state.isLoggedIn,
  },
});

export default store;
