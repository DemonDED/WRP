import { createRouter, createWebHashHistory } from 'vue-router'



const routes = [
  {
    path: '/',
    name: 'Monitoring',
    component: () => import('../views/Monitoring.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter: () => {
      if (!document.cookie && document.cookie != 'guest') {
        return({name: 'warningForGuest'})
      }
    } 
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/SettingWidget.vue'),
    beforeEnter: () => {
      if (!document.cookie && document.cookie != 'guest') {
        return({name: 'warningForGuest'})
      }
    } 
  },
  {
    path: '/warningForGuest',
    name: 'warningForGuest',
    component: () => import('../views/notAuth.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeResolve((to, from, next) => {
  if (to.path) {
    console.log('Загрузка');
    const preloader = document.getElementById('preloader');
    let loader = document.getElementById('loader');
    preloader.style.display = 'block';
    loader.style.display = 'block';
  }
  next();
})

router.afterEach(() => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    let loader = document.getElementById('loader');
    preloader.style.display = 'none';
    loader.style.display = 'none';
  }, 1000)
  console.log('Готово');
})

export default router
