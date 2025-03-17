<template>
  <div>
    <div class="basket" v-if="basketItems.length > 0">
      <div class="container">
        <div class="basket-items">
          <h2>Your Shopping Basket</h2>
          <ul class="basket-list">
            <li v-for="item in basketItems" :key="item.varenummer" class="basket-item">
              <div class="item-info">
                <h2>{{ item.name }}</h2>
                <p><strong>Antal:</strong> {{ item.quantity || 1 }}</p>
                <p><strong>Pris:</strong> {{ (item.price * (item.quantity || 1)).toFixed(2) }} kr</p>
              </div>
              <div class="item-image" :style="{ backgroundImage: `url(${item.url})` }"></div>
              <div class="item-actions">
                <button @click="reserveProduct(item.varenummer)">+</button>
                <button @click="removeReservedProduct(item.varenummer)">-</button>
              </div>
            </li>
          </ul>
        </div>
        <div class="checkout-info">
          <h2>Total for ordre</h2>
          <div class="checkout-summary">
            <h2>Samlet pris (inkl. moms): {{ totalPrice }}</h2>
            <button @click="checkout">Til kassen</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty-basket">
      <p>Din indkøbskurv er tom</p>
      <button @click="goToProducts">Gå til produkter</button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'Grocery-Basket',
  setup() {
    const store = useStore();

    // Fetch basket items from Vuex store
    const basketItems = computed(() => store.getters.basketItems);

    // Fetch basket on component load
    onMounted(() => {
      store.dispatch('fetchBasket'); // Dispatch the fetchBasket action from Vuex
    });

    const reserveProduct = async (productId) => {
      await store.dispatch('reserveProduct', productId); // Dispatch action to reserve and fetch basket
    };

    const removeReservedProduct = async (productId) => {
      await store.dispatch('removeReservedProduct', productId); // Dispatch action to reserve and fetch basket
    };

    const decrementOrRemoveFromBasket = (item) => {
      store.dispatch('decrementItem', item.varenummer); // Dispatch action to decrement item
    };

    const totalPrice = computed(() =>
      basketItems.value.reduce((total, item) => total + item.price * (item.quantity || 1), 0).toFixed(2)
    );

    const checkout = () => {
      console.log('Proceeding to checkout'); // Handle checkout logic
    };

    const goToProducts = function () {
  const timestamp = Date.now();
  this.$router.push({ path: '/', query: { reload: timestamp } });
};


    return {
      basketItems,
      reserveProduct,
      removeReservedProduct,
      decrementOrRemoveFromBasket,
      totalPrice,
      checkout,
      goToProducts,
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

.empty-basket {
  display: flex;
  flex-direction: column; /* Arrange elements vertically */
  justify-content: center; /* Center elements vertically */
  align-items: center; /* Center elements horizontally */
  max-width: 600px; /* Optional: Prevent it from being too wide on large screens */
  height: auto; /* Let the height adjust to the content */
  border: 2px solid #ddd; /* Add a border */
  border-radius: 8px; /* Optional: Rounded corners */
  background-color: #f9f9f9; /* Optional: Light background */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow for depth */
  text-align: center; /* Center the text */
  padding: 20px; /* Add padding */
  margin: auto; /* Center it horizontally */
  position: absolute; /* Use absolute positioning */
  top: 30%; /* Center it vertically */
  left: 50%; /* Center it horizontally */
  transform: translate(-50%, -50%); /* Offset it by 50% of its own width and height */
}


.empty-basket button {
  margin-top: 16px; /* Add some spacing above the button */
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.empty-basket button:hover {
  background-color: #45a049;
}

</style>
