<template>
  <div class="tabs">
    <el-tag
        v-for="(item,index) in tags"
        :key="item.path"
        :closable="item.name !== 'home'"
        :effect="$route.name === item.name ?'dark' :'plain'"
        @click="changeMenu(item)"
        @close="handleClose(item,index)">
        
        {{ item.label }}
    </el-tag>
  </div>
</template>

<script>

//辅助函数，要依靠它来获取tap里的state里的东西,实现数据通信 
import { mapState ,mapMutations } from 'vuex';

export default {
    name:'Tag',
    data(){
        return {

        }
    },
    computed:{
        ...mapState({
            tags:state => state.tab.tabslist
        })//...是扩展运算符ES6的语法,tags是自己起的别名
    },
    methods:{
        ...mapMutations(['closeTag']),
        // 点击tag跳转的功能
        changeMenu(item){
            // this.$router.push({name:item.name})
            if(this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))){
            this.$router.push({name:item.name})
          }
        },
        //点击tag删除功能
        handleClose(item,index){
            //调用store中的multation
            this.closeTag(item)
            const length = this.tags.length
            //删除之后的跳转逻辑
            if(item.name !== this.$route.name){
                return
            }
            //表示是删除的最后一项
            if(index === length){
                this.$router.push({
                    name:this.tags[index-1].name
                })
            }else{
                this.$router.push({
                    name:this.tags[index].name
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.tabs{
    padding: 20px;
    span{
        margin-right: 20px;
    }
}
</style>