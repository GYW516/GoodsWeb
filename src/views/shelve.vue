<template>
    <div class="shelve">
      <div class="title">
        超市货架管理
      </div>
        <el-dialog
            title="编辑超市区域信息"
            :visible.sync="editVisible"
            width="30%"
            :before-close="handleClose">
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px" >
                <el-form-item label="货架名称" prop="STitle">
                    <el-input v-model="form.STitle" placeholder="请输入货架名称" size="small"></el-input>
                </el-form-item>

                <el-form-item label="所在区域" prop="region_ID">
                    <el-select v-model="form.region_ID" placeholder="请选择区域">
                    <el-option v-for="item in regions" :key="item.id" :label="item.title" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="货架状态" prop="cond">
                    <el-select v-model="form.cond" placeholder="请选择货架状态">
                        <el-option label="已满" value="1"></el-option>
                        <el-option label="空闲" value="2"></el-option>
                        <el-option label="损坏" value="3"></el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item label="负责人" prop="head">
                    <el-input v-model="form.head" placeholder="负责人" size="small"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit(form)">确 定</el-button>
            </span>
        </el-dialog>

        <el-table
        :data="tableData"
        style="width: 100%;left: 50px;">
        <el-table-column
          fixed
          prop="id"
          label="ID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="stitle"
          label="货架名称"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="title"
          label="货架所在区域"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          label="货架状态"
          width="150"
          align="center">
          <template slot-scope="scope">
            <el-tag type="success" effect="dark" v-if="scope.row.cond==2">空闲</el-tag>
            <el-tag type="warning" effect="dark" v-if="scope.row.cond==1">已满</el-tag>
            <el-tag type="danger" effect="dark" v-if="scope.row.cond==3">损坏</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="head"
          label="负责人"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="create_on"
          label="创建时间"
          width="200"
          >
        </el-table-column>
        <el-table-column
          prop="update_on"
          label="更新时间"
          width="200">
        </el-table-column>
        <el-table-column label="操作">
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
    import axios from 'axios'
    export default{
        data(){
            return {
                //货架数据
                tableData: [],
                //区域数据
                regions:[],
                //编辑
            form:{
                id:0,
                STitle:'',
                region_ID:0,
                cond:null,
                head:'',
            },
            //编辑窗口初始值不可见
            editVisible:false,
            rules:{
                STitle:[
                 {required: true, message: '请输入货架名称'}
                ],
                head:[
                 {required: true, message: '请输入负责人名称'}
                ],
                region_ID: [
                 { required: true, message: '请选择区域', trigger: 'change' }
                ],
                cond: [
                 { required: true, message: '请选择货架状态', trigger: 'change' }
                ],
            }
            }
        },
        methods: {
            // 关闭弹窗操作
            handleClose(){
                this.$refs.form.resetFields()
                this.editVisible = false
            },
            cancel(){
                this.handleClose()
            },
            //编辑操作
          handleEdit(index, row) {
            this.form.id = row.id
            this.form.STitle = row.stitle
            this.form.region_ID = row.region_ID
            this.form.head = row.head
            this.form.cond = row.cond
            this.editVisible = true
          },
          //编辑操作提交请求
          submit(formName){
              console.log("编辑")
              if(this.form.cond == null){
                this.$message({
                    showClose: true,
                    message: '数据不可为空!',
                    type: 'error'
                });
                return
              }
              const datas = {
                    id:this.form.id,
                    stitle:this.form.STitle,
                    region_ID:this.form.region_ID,
                    cond:this.form.cond,
                    head:this.form.head
              }
              axios
              .put('shelve/update',datas)
              .then(response => {
                 console.log(response)
                 this.getData()
                 this.editVisible = false
             })
             .catch(function (error) { // 请求失败处理
                 console.log(error);
             });
           },
          handleDelete(index, row) {
                this.$confirm('此操作将永久删除该行内容, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    axios({
                    method:"DELETE",
                    url:"shelve/delete/"+row.id,
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
                axios
                .get('shelve/all')
                .then(response => {
                    this.tableData = response.data.data
                })
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            }
        },
        mounted(){
          axios.get('shelve/all').then(response => {
            this.tableData = response.data.data;
          }).catch(function(error){
            console.log(error)
          })
          axios.get('region/selectIdAndTitle').then(response => {
                this.regions = response.data.data;
            }).catch(function(error){
                console.log(error)
      })
        }
    }
    </script>
    <style lang="less" scoped>
    .title{
      margin-bottom: 20px;
      text-align: center;
      font-size: 20px;
    }
    </style>