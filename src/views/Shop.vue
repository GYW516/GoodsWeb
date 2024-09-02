<template>
    <div class="shopCar">
        <el-card>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <div style="display: flex;">
                <p style=" width: 200px; box-sizing: border-box;">总计: {{ this.totoPrice }} </p>
                <el-button type="success" style="margin: 0 auto;" @click="dialogVisible = true" :disabled="totoPrice === 0">收付款</el-button>
                <el-dialog
                title="请扫描下面的付款码"
                :visible.sync="dialogVisible"
                width="20%"
                :before-close="handleClose">
                <span>总金额: {{ totoPrice }} </span> <br>
                <img src="/wechat/1.jpg" alt="" width="200px" height="200px" style="margin: 0 auto;">
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="qpay">确 定</el-button>
                </span>
                </el-dialog>
            </div>
            <el-checkbox-group v-model="checkedshopCar" @change="handleCheckedshopCarChange">
                <el-checkbox v-for="goods in shopCar" :label="goods" :key="goods.url">
                    <img :src="goods.url" alt="图片" style="width: 100px; height: 100px;">
                    <div style="padding: 30px; font-size: 15px; display: flex; position: relative;">
                        <p>商品名称: {{ goods.title }}</p>
                        <p style="position: absolute; left: 400px;">商品价格: {{ goods.currentP }} </p>
                        <p style="position: absolute; left: 600px;">商品原格: {{ goods.oldP }} </p>
                        <p style="position: absolute; left: 800px;">商品种类: {{ goods.type }} </p>
                        <el-button
                        size="medium"
                        type="danger"
                        @click="handleDelete(goods)" style="position: absolute; left: 950px;">取消该商品</el-button>
                    </div>
                </el-checkbox>
            </el-checkbox-group>
            
        </el-card> 
    </div>
</template>
<script>
import axios from 'axios';
import Cookie from 'js-cookie'
 
export default{
    data(){
        return {
            dialogVisible: false,
            checkAll: false,
            checkedshopCar: [],
            shopCar: [],
            isIndeterminate: true,
            totoPrice:0
        }
    },
    methods:{
        cancel(){
            this.dialogVisible = false
            this.$message({
                type: 'info',
                message: '已取消'
            });          
        },
        qpay(){
            this.dialogVisible = false
            this.$message({
                type: 'success',
                message: '支付成功!'
            });
        },
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
        handleDelete(goods) {
        console.log(goods)
        this.$confirm('确定不买了吗？, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                axios({
                method:"DELETE",
                url:"cart/deletecart?goodUser="+goods.goodUser+"&id="+goods.id,
            }).then(response=>{
                this.getData()
            })    
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
      
      },
      getData(){
            let a = Cookie.get('user')
            axios
            .get('cart/getcart?goodUser='+a)
            .then(response => {
                console.log(response.data.data)
                this.shopCar = response.data.data
                
            })
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        },
        handleCheckAllChange(val) {
        this.checkedshopCar = val ? this.shopCar : [];
        this.isIndeterminate = false;
        if(this.checkAll === false){
            this.totoPrice = 0
            return
        }
        let a = this.shopCar
        for(let i=0;i<a.length;i++){
            this.totoPrice += a[i].currentP
        }
        console.log(this.totoPrice)
      },
      handleCheckedshopCarChange(value) {
        console.log(value)
        let a = value
        this.totoPrice = 0
        for(let i=0;i<a.length;i++){
            this.totoPrice += a[i].currentP
        }
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.shopCar.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.shopCar.length;
      },
    },
    mounted(){
        let a = Cookie.get('user')
        axios
        .get('cart/getcart?goodUser='+a)
        .then(response => {
            console.log(response.data.data)
            this.shopCar = response.data.data
            
        })
        .catch(function (error) { // 请求失败处理
            console.log(error);
        });
        
    }
}
</script>
<style lang="less" scoped>
.shopCar{
    ul{
        list-style: none;
    }
    /deep/.el-checkbox-group{
        display:flex; 
        flex-direction: column;   
        .el-checkbox__label{
            display: flex;
            align-content: center;
        }
    }
    /deep/.el-checkbox__input.is-checked+.el-checkbox__label {
       color: black;
}
}
</style>