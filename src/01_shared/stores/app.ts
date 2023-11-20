import { defineStore } from 'pinia'

interface State {
  isAuth: boolean
}

export const storeApp = defineStore('app', {
  state: (): State => ({
    isAuth: true
  }),
  getters: {
  },
  actions: {
    login() {
    },
  }
})
