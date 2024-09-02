<!-- 全局组件也就是非路由组件全部写在components里 -->
<template>
    <el-menu 
        default-active="1-4-1" 
        class="el-menu-vertical-demo" 
        @open="handleOpen" 
        @close="handleClose" 
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <h3>{{ isCollapse ?'超市':'超市商品管理系统' }}</h3>
      <el-menu-item @click="clickMenu(item)" v-for="item in  noChildren" :key="item.name" :index="item.name">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title"> {{ item.label }} </span>
        </el-menu-item>  

      <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
        <template slot="title">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title"> {{ item.label }} </span>
        </template>
     
        <el-menu-item-group  v-for="subitem in item.children" :key="subitem.path">
            <el-menu-item @click="clickMenu(subitem)" :index="subitem.path"> {{ subitem.label }} </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       
        
    </el-menu>
</template>
  
  <style lang="less" scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
    .el-menu {
      height: 100vh;
      h3{
        color: white;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
      }
    }
  </style>
  
  <script>
  //辅助函数，要依靠它来获取tap里的state里的东西,实现数据通信 
  import { mapState } from 'vuex';
  import Cookie from "js-cookie"

    export default {
      data() {
        return {
          // isCollapse: false,
         
        };
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        //点击菜单，页面跳转
        clickMenu(item){
          //当页面的路由与当前路由不一致的时候才允许跳转
          if(this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))){
            this.$router.push(item.path)
          }
          this.$store.commit('selectMenu',item)
        }
      },
      computed:{
        //没有子菜单的
        noChildren(){
          return this.menudata.filter(item => !item.children)
        },
        //有子菜单的
        hasChildren(){
          return this.menudata.filter(item => item.children)
        },
        //是否收缩
        isCollapse(){
          return this.$store.state.tab.isCollapse
        },
        // //动态menu菜单
        // ...mapState({
        //   menudata:state => state.tab.menudata || JSON.parse(Cookie.get('mangeMenu'))
        // })//...是扩展运算符ES6的语法,tags是自己起的别名
        menudata(){
          return JSON.parse(Cookie.get('mangeMenu'))
        }
      }
    }
  </script>
  <style lang="less" scoped>
     .el-menu{
      border-right: none;
     }
  </style>