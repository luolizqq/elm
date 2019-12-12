import Vue from 'vue'
import Router from 'vue-router'
import App from "../App"
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'App',
      redirect:"/home",
      component: App,
      children:[
        {
          path: '/home',
          name: 'Home',
          component: (r) =>require.ensure([],()=>r(require("../page/home")),"home"),
        },
        {
          path: '/city/:id',
          name: 'City',
          component: (r) =>require.ensure([],()=>r(require("../page/city/city")),"city"),
        },
        {
          path: '/msite',
          name: 'Msite',
          component: (r) =>require.ensure([],()=>r(require("../page/msite/msite")),"msite"),
          meta:{
            keepAlive:true,
            isBack:false
          }
        },
        {
          path: '/login',
          name: 'Login',
          component: (r) =>require.ensure([],()=>r(require("../page/login")),"login"),
        },
        {
          path: '/profile',
          name: 'Profile',
          component: (r) =>require.ensure([],()=>r(require("../page/profile")),"profile"),
        },
        {
          path: '/search',
          name: 'Search',
          component: (r) =>require.ensure([],()=>r(require("../page/search")),"search"),
        },
        {
          path: '/food',
          name: 'Food',
          component: (r) =>require.ensure([],()=>r(require("../page/food")),"food"),
        },
      ]
    }
  ]
})
