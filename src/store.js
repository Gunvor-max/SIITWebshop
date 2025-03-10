import { createStore } from 'vuex';

const store = createStore({
  state: {
    basket: [],
  },
  mutations: {
    ADD_TO_BASKET(state, product) {
      const existingItem = state.basket.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.basket.push({ ...product, quantity: 1 });
      }
    },
    REMOVE_FROM_BASKET(state, productId) {
      state.basket = state.basket.filter(item => item.id !== productId);
    },
    DECREMENT_ITEM(state, productId) {
      const item = state.basket.find(i => i.id === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.basket = state.basket.filter(i => i.id !== productId);
      }
    },
  },
  actions: {
    addToBasket({ commit }, product) {
      commit('ADD_TO_BASKET', product);
    },
    removeFromBasket({ commit }, productId) {
      commit('REMOVE_FROM_BASKET', productId);
    },
    decrementItem({ commit }, productId) {
      commit('DECREMENT_ITEM', productId);
    },
  },
  getters: {
    basketItems: state => state.basket,
  },
});

export default store;
