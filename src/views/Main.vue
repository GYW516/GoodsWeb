<template>
    <!-- vue的最外层只能有一个根节点，也就是div -->
   <div>
    <el-container>
        <el-aside width="auto">
            <common-aside />
        </el-aside>
        <el-container>
            <el-header>
                <CommonHeader></CommonHeader>
            </el-header>
            <CommonTag></CommonTag>
            <el-main>
                <!-- 如果说主路由有孩子的话，孩子路由是在主路由里面的，所以在主路由里要写路由出口 -->
                <!-- 路由出口 -->
                <!-- 路由匹配到的组件将渲染在这里 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
   </div>
</template>
<script>
import CommonAside from '../components/Aside.vue'
import CommonHeader from '../components/Header.vue'
import CommonTag from '../components/Tag.vue'
export default{
    data(){
        return {}
    },
    components:{
        CommonAside,
        CommonHeader,
        CommonTag
    }
}
</script>
<style lang="less" scoped>
.el-header{
    padding: 0;
}

.el-main{
    height: 500px;
    // overflow: hidden;
}
</style>