<template>
  <div>
    <Grocery-Navbar />
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script>
import GroceryNavbar from './Grocery-Navbar.vue';

export default {
  name: 'Grocery-MainLayout',
  components: {
    GroceryNavbar,
  },
};
</script>

<style scoped>
main {
  padding: 16px;
}
</style>