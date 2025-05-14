import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../view/home/index.vue'),
    },
    {
        path: '/post',
        name: 'Post',
        component: () => import('../view/post/index.vue'),
    },
    {
        path: '/record',
        name: 'Record',
        component: () => import('../view/record/index.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;