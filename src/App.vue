<template>
  <div id="app">
    <Grocery-MainLayout>
      <router-view></router-view>
    </Grocery-MainLayout>
  </div>
</template>

<script>
import GroceryMainLayout from './components/Grocery-MainLayout.vue';

export default {
  name: 'App',
  components: {
    GroceryMainLayout,
  },
};
</script>

<style>
/* Add your styles here */
</style>