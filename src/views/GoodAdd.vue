<template>
    <div class="GoodAdd">
        <div class="add" style="margin-left: 50px; width: 800px;">
            <el-card class="box-card">
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <div class="title">上传商品图片</div>
                <el-upload ref="upload" 
                :limit="1" accept=".jpg" 
                :data="this.form" action="#"
                :http-request="load"
                :disabled="upload.isUploading" :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess"
                :auto-upload="false" drag
                style="margin-left: 180px;">
                <i class="el-icon-upload" style="color: #167ad6"></i>
                <div class="el-upload__text">
                    将文件拖到此处，或<em>点击上传</em>
                </div>
                </el-upload>
                <el-form-item label="商品名称" prop="gitle">
                    <el-input v-model="form.gitle" placeholder="请输入商品名称" size="small"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="采购价" prop="buy_P">
                    <el-input v-model="form.buy_P" placeholder="采购价" size="small"></el-input>
                </el-form-item>
                <el-form-item label="销售价" prop="sales_P">
                    <el-input v-model="form.sales_P" placeholder="销售价" size="small"></el-input>
                </el-form-item>
                <br>
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
                <br>
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
                <br>
                <el-form-item>
                    <el-button @click="cancel" style="margin-left: 250px;">取 消</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                    <el-button type="primary" @click="submit" style="margin-left: 50px;">确 定</el-button>
                </el-form-item>

            </el-form>
        </el-card>
        </div>
        
        
        
    </div>
</template>
<script>
import axios from 'axios';
export default {

    data () {
        return {
            myHeaders:{'Access-Control-Allow-Origin':'*'},
            upload: {
            // 是否显示弹出层（用户导入）
            open: false,
            // 弹出层标题（用户导入）
            title: "",
            // 是否禁用上传
            isUploading: false,
            // 是否更新已经存在的用户数据
            updateSupport: 0,
            // 上传的地址
            url:'http://localhost:8888/manager/add',
            },
             //增加
            form:{
                gitle:'',
                buy_P:null,
                sales_P:null,
                type:null,
                shelveID:null,
                numb:null,
                is_Ground:null,
                sup_Id:null
            },
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

            //货架
            shelves:[],
            //供应商
            suppliers:[],
            //类型
            types:[],

        }
    },
    methods: {
        // 上传图片和信息的
        handleFileUploadProgress(event, file, fileList) {
            this.upload.isUploading = true;
        },
        handleFileSuccess(response, file, fileList) {
            this.upload.open = false;
            this.upload.isUploading = false;
            this.addDialog = false;
        },
        load(param) {
            const formData = new FormData()
            formData.append('image', param.file)
            formData.append('gitle', this.form.gitle)
            formData.append('buy_P', this.form.buy_P)
            formData.append('sales_P', this.form.sales_P)
            formData.append('type', this.form.type)
            formData.append('shelveID', this.form.shelveID)
            formData.append('numb', this.form.numb)
            formData.append('is_Ground', this.form.is_Ground)
            formData.append('sup_Id', this.form.sup_Id)
            console.log(this.form)
            console.log(formData)
            axios
            .post('manager/add',formData)
            .then(response => {
                if(response.data.code == 1){
                    this.$message({
                    message: '添加成功',
                    type: 'success'
                    });
                }
                this.getData()
                this.$refs.form.resetFields()
            })
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        },
        submit(){
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
            this.$refs.upload.submit();
        },
        cancel(){
            this.handleClose()
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    mounted() {
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
<style lang="less" scoped>
.title{
  margin-bottom: 20px;
  text-align: center;
  font-size: 20px;
}
</style>