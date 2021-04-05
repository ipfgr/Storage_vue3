import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import "materialize-css/dist/js/materialize.min"


createApp(App).use(router).use(store).mount('#app')
