import Vue from 'vue'
import VueRoughNotation from 'vue-rough-notation';
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.use(VueRoughNotation);
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
  