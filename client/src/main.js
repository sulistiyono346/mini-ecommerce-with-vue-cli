import Vue from 'vue'
import App from './App.vue'
import router from './router'
import wysiwyg from 'vue-wysiwyg'

Vue.config.productionTip = false
Vue.use(wysiwyg, {})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
