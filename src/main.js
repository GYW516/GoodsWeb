import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import Cookie from 'js-cookie'
import axios from 'axios'

Vue.config.productionTip = false

// 全局ui引入
Vue.use(ElementUI)

//按需引入
// Vue.use(Button)
// Vue.use(Select)

//添加全局前置导航守卫
router.beforeEach((to,from,next) =>{
  //判断token存不存在
  const token = Cookie.get('token')
  //token不存在,说明当前用户是未登录状态，应该跳转至登录页
  if(!token && to.name !== 'login'){
    next({name:'login'})
  }else if(token && to.name === 'login'){
    next({name:'home'})
  }else{
    next();
  }
})

//vue实例挂载router
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
