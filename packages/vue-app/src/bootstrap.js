import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

export const mount = (element) => {
  new Vue({
    render: h => h(App),
  }).$mount(element)
}
