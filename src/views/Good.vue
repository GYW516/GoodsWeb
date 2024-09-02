<template>
    <div class="manage" style="height: 500px">
        
        <el-dialog
        title="编辑商品信息"
        :visible.sync="editVisible"
        width="30%"
        :before-close="handleClose">

        <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
            <el-form-item label="商品名称" prop="gitle">
                <el-input v-model="form.gitle" placeholder="请输入商品名称" size="small"></el-input>
            </el-form-item>
            <el-form-item label="采购价" prop="buy_P">
                <el-input v-model="form.buy_P" placeholder="采购价" size="small"></el-input>
            </el-form-item>
            <el-form-item label="销售价" prop="sales_P">
                <el-input v-model="form.sales_P" placeholder="销售价" size="small"></el-input>
            </el-form-item>
            <el-form-item label="种类" prop="type">
                <el-select v-model="form.type" placeholder="请选择种类" size="small">
                <el-option
                v-for="item in types"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="货架" prop="shelveID">
                <el-select v-model="form.shelveID" placeholder="请选择货架" size="small">
                <el-option
                v-for="item in shelves"
                :key="item.id"
                :label="item.stitle"
                :value="item.id">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="供应商" prop="sup_Id">
                <el-select v-model="form.sup_Id" placeholder="请选择供应商" size="small">
                <el-option
                v-for="item in suppliers"
                :key="item.id"
                :label="item.sname"
                :value="item.id">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="库存" prop="numb">
                <el-input v-model="form.numb" placeholder="库存" size="small"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
        </el-dialog>

        <el-table
            :data="tableData"
            style="width: 100%;overflow:auto;">
            <el-table-column
                prop="id"
                label="ID"
                width="60"
                align="center">
            </el-table-column>
            <el-table-column
                prop="gitle"
                label="商品名称"
                width="150"
                align="center">
            </el-table-column>
            <el-table-column
                prop="buy_P"
                label="采购价(￥)"
                width="120"
                align="center">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                    <p>采购价: {{ scope.row.buy_P }}￥</p>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.buy_P }}</el-tag>
                    </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="sales_P"
                label="销售价(￥)"
                width="120"
                align="center">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                    <p>销售价: {{ scope.row.sales_P }}￥</p>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.sales_P }}</el-tag>
                    </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="种类"
                width="90"
                align="center">
            </el-table-column>
            <el-table-column
                prop="stitle"
                label="货架名称"
                width="110"
                align="center">
            </el-table-column>
            <el-table-column
                prop="numb"
                label="库存(个)"
                width="90"
                align="center">
            </el-table-column>
            <el-table-column
                prop="sname"
                label="供应商"
                width="240"
                align="center">
            </el-table-column>
            <el-table-column
                prop="is_Ground"
                label="是否上架"
                width="90"
                align="center">
                <template slot-scope="scope">
                    <!-- 使用element-ui的Switch组件传递boolean值 -->
                    <el-switch
                    v-model="scope.row.is_Ground"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="handleActiveChange(scope.row)"
                    ></el-switch>
                </template>
            </el-table-column>
            <el-table-column
                prop="create_on"
                label="创建时间"
                width="190"
                align="center">
            </el-table-column>
            <el-table-column
                prop="update_on"
                label="更新时间"
                width="190"
                align="center">
            </el-table-column>
            
            <el-table-column 
              label="操作"
              fixed="right"
              width="200">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>
<script>

import axios from 'axios';
import Cookie from 'js-cookie'


export default{
    
    data() {
      return {
        editVisible:false,

        tableData:[],

        rules:{
            gitle:[
             {required: true, message: '请输入商品名称'}
            ],
            buy_P:[
             {required: true, message: '请输入采购价格'}
            ],
            sales_P:[
             {required: true, message: '请输入销售价'}
            ],
            type:[
            { required: true, message: '请选择商品类型', trigger: 'change' }
            ],
            shelveID:[
            { required: true, message: '请选择货架', trigger: 'change' }
            ],
            sup_Id:[
            { required: true, message: '请选择供应商', trigger: 'change' }
            ],
            numb:[
             {required: true, message: '请输入库存量'}
            ]
        },
        //编辑
        form:{
            id:null,
            gitle:'',
            buy_P:null,
            sales_P:null,
            type:null,
            shelveID:null,
            numb:null,
            is_Ground:null,
            sup_Id:null
        },

        //货架
        shelves:[],
        //供应商
        suppliers:[],
        //类型
        types:[],
        
        currentPage: 1
      };
    },
    methods: {

        //是否上架操作
        handleActiveChange(row) {
        console.log('是否上架:', row.is_Ground);
        const ground = (row.is_Ground == false) ? 0:1;
        const datas = {
            id:row.id,
            is_Ground:ground
        }
        axios
            .put('manager/ground',datas)
            .then(response => {
                console.log(response)
            })
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        },
        
        //编辑提交
        submit(){
            console.log("编辑")
            console.log(this.form)
            if(isNaN(this.form.numb)){
                this.$message({
                showClose: true,
                message: "请输入合法数字!",
                type: 'error'
                });
                return
            }
            const regex = /(^[1-9]\d*|0)(\.\d{1,2})?$/;
            if(!regex.test(this.form.buy_P) || !regex.test(this.form.sales_P)){
                this.$message({
                showClose: true,
                message: "价格只支持正整数或保留两位小数的正整数!",
                type: 'error'
                });
                return
            }
            const datas = {
                id:this.form.id,
                gitle:this.form.gitle,
                buy_P:this.form.buy_P,
                sales_P:this.form.sales_P,
                type:this.form.type,
                shelveID:this.form.shelveID,
                numb:this.form.numb,
                sup_Id:this.form.sup_Id
            }
            axios
            .put('manager/update',datas)
            .then(response => {
                console.log(response)
                this.getData()
                this.editVisible = false
            })
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        },

        // 编辑操作
        handleEdit(index, row) {
            // this.row = row;
            this.form.id = row.id
            this.form.gitle = row.gitle
            this.form.buy_P = row.buy_P
            this.form.sales_P = row.sales_P
            this.form.type = row.type
            this.form.shelveID = row.shelveID
            this.form.numb = row.numb
            this.form.is_Ground = row.is_Ground
            this.form.sup_Id = row.sup_Id
            this.editVisible = true  
        },
        // 删除操作
        handleDelete(index, row) {
            console.log(index)
            console.log(row.id)
            this.$confirm('此操作将永久删除该行内容, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                axios({
                method:"DELETE",
                url:"manager/delete/"+row.id,
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
    
        // 关闭弹窗
        handleClose(){
            this.$refs.form.resetFields()
            this.editVisible = false
        },
        cancel(){
            this.handleClose()
        },
        getData(){
            axios
            .get('manager/all')
            .then(response => {
                this.tableData = response.data.data
            })
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        }
    },
    mounted() {
        axios
        .get('manager/all')
        .then(response => {
            this.tableData = response.data.data
        })
        .catch(function (error) { // 请求失败处理
            console.log(error);
        });
        //货架
        axios
        .get('manager/shelve')
        .then(response => {
            this.shelves = response.data.data
        })
        .catch(function (error) { // 请求失败处理
            console.log(error);
        });
        //类型
        axios
        .get('manager/type')
        .then(response => {
            this.types = response.data.data
        })
        .catch(function (error) { // 请求失败处理
            console.log(error);
        });
        //供应商
        axios
        .get('manager/supplier')
        .then(response => {
            this.suppliers = response.data.data
        })
        .catch(function (error) { // 请求失败处理
            console.log(error);
        });
        
    },
}
</script>
