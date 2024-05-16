import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/index.vue';
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index.vue')
      },
      {
        path: 'change-password',
        component: () => import('@/views/profile/change_password.vue')
      },
      {
        path: 'change-email',
        component: () => import('@/views/profile/change_email.vue')
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
});

export default router;
