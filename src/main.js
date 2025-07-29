import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue3-lazyload'
import './style.css'

// Create Vue app instance
const app = createApp(App)

// Configure vue3-lazyload
app.use(VueLazyload, {
  loading: '/loading-placeholder.jpg', // Add a loading placeholder image
  error: '/error-placeholder.jpg',     // Add an error placeholder image
  lifecycle: {
    loading: (el) => {
      el.setAttribute('lazy', 'loading')
    },
    error: (el) => {
      el.setAttribute('lazy', 'error')
    },
    loaded: (el) => {
      el.setAttribute('lazy', 'loaded')
    }
  }
})

// Use router
app.use(router)

// Mount the app
app.mount('#app')