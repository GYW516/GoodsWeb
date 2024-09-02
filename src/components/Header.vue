<template>
    <div class="header-container">
        <div class="l-content">
            <el-button @click="handerMenu" icon="el-icon-menu" size="mini"></el-button>
            <!-- 面包屑 -->
            <!-- <span class="text">首页</span> -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">

            <el-dropdown  @command="handleCommand"  >
                <span class="el-dropdown-link">
                    <img class="img" src="../assets/images/1.jpg" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="a">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        </div>
    </div>
    
</template>
<script>
//辅助函数，要依靠它来获取tap里的state里的东西,实现数据通信 
import { mapState } from 'vuex';
import Cookie from 'js-cookie'

export default{
    data(){
        return {

        }
    },
    methods:{
        handleCommand(command){
            if(command === 'a'){
                console.log('退出')
                Cookie.remove('token')
                Cookie.remove('mangeMenu')
                Cookie.remove('user')
                this.$router.push('/login')
                this.$router.go(0)
            }
        },
       
        handerMenu(){
            this.$store.commit('collapseMenu')
        }
    },
    computed:{
        ...mapState({
            tags:state => state.tab.tabslist
        })//...是扩展运算符ES6的语法,tags是自己起的别名
    },

}
</script>
<style lang="less" scoped>
.header-container{
    padding: 15px 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    box-sizing: border-box;
    .text{
        color: white;
        font-size: 15px;
        margin-left: 10px;
    }
    .r-content{
        .img{
            width:40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    .l-content{
        display: flex;
        align-content: center;
        .el-breadcrumb{
           margin-top: 8px;
           margin-left: 10px;
        }
        .el-breadcrumb__item{
            /deep/.el-breadcrumb__inner{
                font-weight: normal;
                &.is-link{
                    color:#666;
                }
            }
            &:last-child{
                .el-breadcrumb__inner{
                    color: #fff;
                }
            }
        }
    }

}
</style>