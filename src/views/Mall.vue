<template>
   <div class="viewport">

    <el-tag style="margin-left: 60px;">查询商品</el-tag>
    <el-select v-model="kind" placeholder="请选择种类" size="small" style="margin-left: 100px;">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
    </el-select>
    <el-button icon="el-icon-search" @click="search" circle style="margin-left: 10px;"></el-button>

    <el-button @click="backo">恢复默认</el-button>

      <!-- Your content goes here -->
       <div style="height: 1000px;">
        <ul class="imgP">
            <li class="imgs" v-for="i in goods" :key=i.id >
                <el-card>
                <img :src="i.url" alt="">
                <span>商品名称: {{ i.gitle }}</span>
                <span>现价: {{ i.buy_P }} ￥</span>
                <span style="color:gainsboro;">原价: {{ i.sales_P }} ￥</span>
                <el-button @click="add(i)" type="primary" plain>加入购物车</el-button>
                </el-card>
            </li>
        </ul>
       </div>
   </div>

</template>
<script>
import axios from 'axios';
import Cookie from 'js-cookie';
export default{
    data(){
        return {
            kind:'1',
            count: 10,
            goods:[],
            options: [{
            value: '1',
            label: '1:数码'
            }, {
            value: '2',
            label: '2:包包'
            }, {
            value: '3',
            label: '3:玩具'
            }, {
            value: '4',
            label: '4:服装'
            }, {
            value: '5',
            label: '5:其他'
            }],
        }
    },
    methods: {
      add(i) {
        let a = Cookie.get('user')
        console.log(a)
        console.log(i)
        axios.post("item/cart",
        {
            goodUser:a,
            id:i.id,
            url:i.url,
            title:i.title,
            currentP:i.currentP,
            oldP:i.oldP,
            type: i.type,
        })
        .then(response => {
            console.log(response.data)
            if(response.data.data == 0){
                this.$message({
                message: '添加成功!',
                type: 'success'
                });
            }else if(response.data.data == 1){
                this.$message({
                message: '该商品已添加到购物车中',
                type: 'warning'
                });
            }
        })
      
      },
      search(){
        var type = parseInt(this.kind)
        axios
            .get('item/search/'+type)
            .then(response => {
                let a = response.data.data
                this.goods = a
            })
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
      },
      backo(){
        axios
            .get('item/getGoods')
            .then(response => {
                let a = response.data.data
                this.goods = a
            })
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
      }

    },
    mounted() {
        axios
            .get('item/getGoods')
            .then(response => {
                let a = response.data.data
                console.log(a)
                this.goods = a

            })
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
    },
}
</script>
<style lang="less" scoped>
.imgP{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    list-style: none;
    /deep/.imgs{
        box-sizing: border-box;
        padding: 10px;
        width: 250px;
        // height: 400px;
        .el-card__body{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            height: 350px;
            img{
                width: 200px;
                height: 200px;
            }
            span{
                text-align: center;
                font-family: '黑体';
            }
        }
    }
}

</style>
