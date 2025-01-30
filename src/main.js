import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import GroceryLogin from './components/Grocery-Login.vue';
import GroceryProducts from './components/Grocery-Products.vue';

const routes = [
  { path: '/', component: GroceryProducts },
  { path: '/login', component: GroceryLogin },
  // Add other routes here
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');