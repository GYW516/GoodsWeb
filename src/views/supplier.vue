<template>
    <div class="supplier">

      <div class="edit">
        <el-dialog
            title="编辑供应商信息"
            :visible.sync="editVisible"
            width="30%"
            :before-close="handleClose">
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px" >
              <el-form-item label="名称" prop="sname">
                  <el-input v-model="form.sname"></el-input>
              </el-form-item>

              <el-form-item label="联系人" prop="person">
                  <el-input v-model="form.person"></el-input>
              </el-form-item>

              <el-form-item label="联系电话" prop="phone">
                  <el-input v-model="form.phone"></el-input>
              </el-form-item>

              <el-form-item label="邮箱" prop="email">
                  <el-input v-model="form.email"></el-input>
              </el-form-item>
              
              <el-form-item label="地址" prop="address">
                  <el-input v-model="form.address"></el-input>
              </el-form-item>

              <el-form-item label="城市" prop="city">
                  <el-input v-model="form.city"></el-input>
              </el-form-item>

              <el-form-item label="省份" prop="province">
                  <el-input v-model="form.province"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit(form)">确 定</el-button>
            </span>
        </el-dialog>
      </div>

      <el-table
        :data="tableData"
        style="width: 100%;">
        <el-table-column
          fixed
          prop="id"
          label="ID"
          width="80">
        </el-table-column>
        <el-table-column
          label="供应商"
          width="150"
          align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.sname }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="person"
          label="联系人"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          label="电话"
          width="150"
          align="center">
          <template slot-scope="scope">
            <el-tag type="success">{{ scope.row.phone }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="250"
          align="center">
        </el-table-column>
        <el-table-column
          prop="city"
          label="城市"
          width="90"
          align="center">
        </el-table-column>
        <el-table-column
          prop="province"
          label="省份"
          width="90"
          align="center">
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
export default {
    data () {
        return {
          //供应商信息
          tableData: [],
          //编辑表单
          form:{
            id:null,
            sname: '',
            person: '',
            phone: '',
            email: '',
            address:'',
            city:'',
            province:'',
          },
        //编辑窗口初始值不可见
        editVisible:false,
        rules: {
          sname: [
            { required: true, message: '请输入区域名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在10个字符以内', trigger: 'blur' }
          ],
          person:[
            {required: true, message: '请输入联系人', trigger: 'blur'},
            { min: 1, max: 5, message: '长度在5个字符以内', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
            { min: 1, max: 11, message: '电话号码有误', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' },
            { min: 1, max: 30, message: '30个字以内', trigger: 'blur' }
          ],
          city: [
            { required: true, message: '请输入城市', trigger: 'blur' }
          ],
          province: [
            { required: true, message: '请输入省份', trigger: 'blur' }
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
            this.form.sname = row.sname
            this.form.person = row.person
            this.form.phone = row.phone
            this.form.email = row.email
            this.form.address = row.address
            this.form.city = row.city
            this.form.province = row.province
            this.editVisible = true
          },
          //编辑操作提交请求
          submit(formName){
              console.log("编辑")
              console.log(this.form)
              const datas = {
                  id:this.form.id,
                  sname:this.form.sname,
                  person:this.form.person,
                  phone:this.form.phone,
                  email:this.form.email,
                  address:this.form.address,
                  city:this.form.city,
                  province:this.form.province
              }
              axios
              .put('supplier/update',datas)
              .then(response => {
                 this.getData()
                 this.editVisible = false
                 this.$message({
                    type: 'success',
                    message: '更新成功!'
                });
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
                    url:"supplier/delete/"+row.id,
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
                .get('supplier/all')
                .then(response => {
                    this.tableData = response.data.data
                })
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
        }
    },
    mounted() {
        axios.get('supplier/all').then(response => {
            this.tableData = response.data.data;
          }).catch(function(error){
            console.log(error)
          })
    },
}
</script>