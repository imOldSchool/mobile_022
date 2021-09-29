import Vue from 'vue'
import App from './App.vue'
//移动端适配
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
