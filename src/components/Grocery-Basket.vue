<template>
  <div>
    <div class="basket" v-if="basketItems.length > 0">
      <div class="container">
        <div class="basket-items">
          <h2>Your Shopping Basket</h2>
          <ul class="basket-list">
            <li v-for="item in basketItems" :key="item.id" class="basket-item">
              <div class="item-info">
                <h2>{{ item.name }}</h2>
                <p><strong>Antal:</strong> {{ item.quantity }}</p>
                <p><strong>Pris:</strong> {{ (item.price * item.quantity).toFixed(2) }} kr</p>
              </div>
              <div class="item-image" :style="{ backgroundImage: `url(${item.url})` }"></div>
              <div class="item-actions">
                <button @click="addToBasket(item)">+</button>
                <button @click="decrementOrRemoveFromBasket(item)">-</button>
              </div>
            </li>
          </ul>
        </div>
        <div class="checkout-info">
          <div class="checkout-summary">
            <h2>Total Price: {{ totalPrice }}</h2>
            <button @click="checkout">Til kassen</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Din indkøbskurv er tom</p>
      <button @click="goToProducts">Gå til produkter</button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Grocery-Basket',
  setup() {
    const store = useStore();
    const router = useRouter();
    const basketItems = computed(() => store.getters.basketItems);
    
    const addToBasket = item => {
      store.dispatch('addToBasket', item);
    };

    const decrementOrRemoveFromBasket = item => {
      store.dispatch('decrementItem', item.id);
    };

    const address = reactive({
      name: '',
      address: '',
      city: '',
      postcode: '',
      country: ''
    });

    const submitAddress = () => {
      console.log('Address submitted:', address);
      // Handle address submission logic
    };

    const totalPrice = computed(() => {
      return basketItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    });

    const checkout = () => {
      // Handle checkout logic
      console.log('Proceeding to checkout');
    };

    const goToProducts = () => {
      router.push('/');
    };

    return {
      basketItems,
      addToBasket,
      decrementOrRemoveFromBasket,
      address,
      submitAddress,
      totalPrice,
      checkout,
      goToProducts
    };
  },
});
</script>

<style scoped>
.basket {
  margin: 20px;
}

.container {
  display: flex;
  justify-content: space-between;
}

.basket-items {
  flex: 1;
  margin-right: 20px;
}

.checkout-info {
  flex: 1;
  margin-left: 20px;
}

.basket-list {
  list-style-type: none; /* Remove default list style */
  padding-left: 0; /* Remove left padding */
}

.basket-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  padding: 8px 16px;
  background: #f9f9f9;
  height: 75px; /* Half the height */
  margin-bottom: 0; /* No distance between rows */
}

.item-info {
  flex-grow: 1;
  padding-right: 16px;
}

.item-info h2 {
  margin: 0 0 8px 0;
  font-size: 1.2em;
}

.item-info p {
  margin: 4px 0;
}

.item-image {
  width: 75px; /* Half the width */
  height: 75px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.item-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.item-actions button {
  background: #4CAF50;
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 4px;
  width: 40px;
}

.item-actions button:hover {
  background: #45a049;
}

.checkout-summary {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background: #f9f9f9;
}

.checkout-summary h2 {
  margin: 0 0 10px 0;
}

.checkout-summary button {
  background: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.checkout-summary button:hover {
  background: #45a049;
}
</style>
