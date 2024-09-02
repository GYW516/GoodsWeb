import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/Good.vue'
import Main from '../views/Main.vue'
import Shop from '../views/Shop.vue'
import Mall from '../views/Mall.vue'
import information from '../views/information.vue'
import PageTwo from '../views/PageTwo.vue'
import Login from '../views/Login.vue'
import Region from '../views/Region.vue'
import RegionAdd from '../views/RegionAdd.vue'
import shelve from '../views/shelve.vue'
import shelveAdd from '../views/shelveAdd.vue'
import AddGood from '../views/GoodAdd.vue'
import supplier from '../views/supplier.vue'
import supplierAdd from '../views/supplierAdd.vue'
// import ECharts from "../views/echart.vue"

Vue.use(VueRouter)

//将路由和组件进行映射
const routes = [
    {
        path:'/',
        component:Main,
        redirect:'/home',//重定向               
        children:[
            { path: 'home', name:'home', component: Home },
            { path: 'user', name:'user', component: User },
            { path: 'mall', name:'mall', component: Mall },
            { path: 'shop', name:'shop', component: Shop },
            { path: 'information', name:'information', component: information},
            { path: 'page2', name:'page2', component: PageTwo},
            { path: 'region',name:'region',component:Region},
            { path: 'regionAdd',name:'regionAdd',component:RegionAdd},
            { path: 'shelve',name:'shelve',component:shelve},
            { path: 'shelveAdd',name:'shelveAdd',component:shelveAdd},
            { path: 'AddGood',name:'AddGood',component:AddGood},
            { path: 'supplier',name:'supplier',component:supplier},
            { path: 'supplierAdd',name:'supplierAdd',component:supplierAdd},
            // { path: 'echarts',name:'echarts',component:ECharts}
        ]
    },
    {
        path:"/login",
        name:'login',
        component:Login
    }
   
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
const router = new VueRouter({
    routes
});

//将router实例对外进行暴露
export default router