<template>
  <div id="app">
    <Grocery-MainLayout>
      <router-view :key="$route.fullPath" />
    </Grocery-MainLayout>
  </div>
</template>

<script>
import GroceryMainLayout from './components/Grocery-MainLayout.vue';
import { useStore } from 'vuex';
import { onMounted, defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    GroceryMainLayout,
  },
  setup() {
    const store = useStore();

    // Fetch the basket when the application starts
    onMounted(() => {
      store.dispatch('fetchBasket'); // Dispatch the fetchBasket action from Vuex
    });

    return {};
  },
});
</script>

<style>
/* Add your styles here */
</style>
