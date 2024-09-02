import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'

//全局引入
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        tab
    }
})