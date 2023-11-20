import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/05_pages'
// import { storeApp } from '@/01_shared/stores/app'

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  // const store = storeApp()
  // if (to.meta.authRequired && !store.isAuth) {
  //   next({ name: 'SignPage' })
  // } else {
  //   next()
  // }
  next()
  
  const title = to.meta.title ? `- ${to.meta.title}` : ''
  document.title = `[SiteTitle] ${title}`
})
