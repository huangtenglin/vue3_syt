import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/Home/index.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/pages/Home/index.vue'),
      meta: {
        title: '首页',
      },
    },
    {
      path: '/hospital',
      name: 'hospital',
      component: () => import('@/pages/Hospital/index.vue'),
      // 路由重定向
      redirect: '/hospital/register',
      children: [
        {
          path: 'register',
          name: 'register',
          component: () => import('@/pages/Hospital/Register/index.vue'),
          meta: {
            title: '预约挂号',
          },
        },
        {
          path: 'detail',
          name: 'detail',
          component: () => import('@/pages/Hospital/Detail/index.vue'),
          meta: {
            title: '医院详情',
          },
        },
        {
          path: 'notice',
          name: 'notice',
          component: () => import('@/pages/Hospital/Notice/index.vue'),
          meta: {
            title: '停诊信息',
          },
        },
        {
          path: 'close',
          name: 'close',
          component: () => import('@/pages/Hospital/Close/index.vue'),
          meta: {
            title: '预约通知',
          },
        },
        {
          path: 'search',
          name: 'search',
          component: () => import('@/pages/Hospital/Search/index.vue'),
          meta: {
            title: '查询/取消',
          },
        },
      ],
    },
    {
      path: '/handsontable',
      component: () => import('@/pages/HandsonTable/index.vue'),
      name: 'handsontable',
    },
  ],
  // 配置项路由，每次切换路由的时候，让他回到left为0，top为0
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});

export default router;
