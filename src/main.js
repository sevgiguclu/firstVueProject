import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import Home from './components/CompaniesComponent'
import Users from './components/UsersComponent'
import Companies from './components/CompaniesComponent'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  {path:'/',component:Home},
  {path:'/users',component:Users},
  {path:'/companies',component:Companies}
]
const router = new VueRouter({
  routes
})

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
