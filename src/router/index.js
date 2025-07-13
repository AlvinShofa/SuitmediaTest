import { createRouter, createWebHistory } from 'vue-router';
import IdeasList from '../views/Ideas.vue';

const routes = [
  {
    path: '/',
    name: 'Ideas',
    component: IdeasList
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
