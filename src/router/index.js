import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/index.vue';
const routes = [
  {
    path: '/login',
    name: 'login',
    component: ()=> import('@/views/login/index.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: () => import('@/views/components/404.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Layout,
    children: [
      {
        path: '/index',
        name: 'index',
        component: ()=> import('@/views/dashboard/index.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
});

export default router;
