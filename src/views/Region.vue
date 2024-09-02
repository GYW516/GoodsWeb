<template>
<div class="region">
  <div class="title">
    超市区域管理
  </div>
    <el-dialog
        title="编辑超市区域信息"
        :visible.sync="editVisible"
        width="30%"
        :before-close="handleClose">
        <!-- 这边放一个表单 -->
        <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
            <el-form-item label="区域名称" prop="title">
                <el-input v-model="form.title" placeholder="请输入区域名称" size="small"></el-input>
            </el-form-item>
            <el-form-item label="货架数量" prop="shelve_num">
                <el-input v-model="form.shelve_num" placeholder="货架数量" size="small"></el-input>
            </el-form-item>
            <el-form-item label="负责人" prop="head">
                <el-input v-model="form.head" placeholder="负责人" size="small"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
        </el-dialog>

    <el-table
    :data="tableData"
    style="width: 100%;left: 50px;">
    <el-table-column
      fixed
      prop="id"
      label="ID"
      width="100">
    </el-table-column>
    <el-table-column
      label="超市区域"
      width="150">
      <template slot-scope="scope">
          <el-tag>{{ scope.row.title }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="shelve_num"
      label="货架数量(个)"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      label="区域负责人"
      width="250"
      align="center">
      <template slot-scope="scope">
        <el-tag type="success">{{ scope.row.head }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="create_on"
      label="创建时间"
      width="200">
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
            tableData: [],
            //编辑
        form:{
            id:0,
            title:'',
            shelve_num:0,
            head:'',
        },
        //编辑窗口初始值不可见
        editVisible:false,
        rules:{
            title:[
             {required: true, message: '请输入区域名称'}
            ],
            shelve_num:[
             {required: true, message: '请输入货架数量'},
            ],
            head:[
             {required: true, message: '请输入负责人名称'}
            ]
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
        this.form.title = row.title
        this.form.shelve_num = row.shelve_num
        this.form.head = row.head
        this.editVisible = true
      },
      //编辑操作提交请求
      submit(){
            console.log("编辑")
            console.log(this.form)
            const datas = {
                id:this.form.id,
                title:this.form.title,
                shelve_num:this.form.shelve_num,
                head:this.form.head,
            }
            axios
            .put('region/update',datas)
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
                url:"region/delete/"+row.id,
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
            .get('region/all')
            .then(response => {
                this.tableData = response.data.data
            })
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        }
    },
    mounted(){
      axios.get('region/all').then(response => {
        console.log(response)
        console.log(response.data.data)
        this.tableData = response.data.data;
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