<template>
  <div>
    <h1>Produkter</h1>
    <div v-if="loading">Indlæser...</div>
    <div v-else>
      <div v-if="productList.length" class="product-grid">
        <div class="product-card" v-for="product in productList" :key="product.varenummer">
          <div class="product-image" :style="{ backgroundImage: `url(${product.url})` }"></div>
          <div class="product-info">
            <h2>{{ product.name }}</h2>
            <p><strong>Mærke:</strong> {{ product.brand }}</p>
            <p><strong>Kategori:</strong> {{ product.category }}</p>
            <p><strong>Vægt:</strong> {{ product.weight }}g</p>
            <p><strong>Pris:</strong> {{ formatCurrency(product.price) }}</p>
            <p v-if="product.stock"><strong>Lagerbeholdning:</strong> {{ product.stock.quantity }}</p>
            <p v-if="product.stock"><strong>Sidst købt:</strong> {{ new Date(product.stock.lastpurchased).toLocaleDateString() }}</p>
            <button class="add-to-cart" @click="reserveProduct(product.varenummer)">
              <i class="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      </div>
      <div v-if="statusCode === 204">
        Produktet kan ikke findes
      </div>
      <div v-if="statusCode === 0">
        Ingen forbindelse til serveren
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProductPage',
  data() {
    return {
      loading: true, // Local loading state
    };
  },
  computed: {
    ...mapGetters(['productList','statusCode']), // Get products from Vuex
  },
  created() {
    this.loadProducts(); // Fetch products when the component is created
  },
  methods: {
    ...mapActions(['fetchAllProducts', 'reserveProduct']), // Map Vuex actions
    async loadProducts() {
      try {
        this.loading = true;
        await this.fetchAllProducts(); 
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        this.loading = false;
      }
    },
    async reserveProduct(productId) {
      try {
        console.log('Reserving product from product page:', productId);
        await this.$store.dispatch('reserveProduct', productId); // Dispatch Vuex action
      } catch (error) {
        console.error('Error reserving product:', error);
      }
    },
    formatCurrency(value) {
      return `${value.toFixed(2)} kr`; // Format currency
    },
  },
});
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  position: relative;
}

.product-card:hover {
  transform: scale(1.05);
}

.product-image {
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 150px;
}

.product-info {
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  text-shadow: 1px 1px 2px black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.product-info p {
  margin: 4px 0;
}

.add-to-cart {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.add-to-cart:hover {
  color: #4CAF50;
}
</style>