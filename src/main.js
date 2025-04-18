import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import Home from './components/HomeComponent'
import Users from './components/UsersComponent'
import AddUser from './components/AddUserComponent'
import DetailUser from './components/DetailUserComponent'
import UpdateUser from './components/UpdateUserComponent'
import Companies from './components/CompaniesComponent'
import Login from './components/LoginComponent'


Vue.config.productionTip = false

Vue.use(VueRouter)//require ile yapınca hata veriyor 

const routes = [
  {path:'/',component:Home},
  {path:'/users',component:Users},
  {path:'/users/adduser',component:AddUser},
  {path:'/users/updateuser/:id',component:UpdateUser},
  {path:'/users/finduserbyid/:id',component:DetailUser},
  {path:'/companies',component:Companies},
  {path:'/login',component:Login,meta: { hideLayout: true }},

]
const router = new VueRouter({
  routes
})

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app');

