<template>
    <div class="addSupplier" style="display: flex;">
        <div class="add" style="width: 500px;">
          <el-card class="box-card">
            <div class="title">新增供应商</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="名称" prop="sname">
                  <el-input v-model="ruleForm.sname"></el-input>
              </el-form-item>

              <el-form-item label="联系人" prop="person">
                  <el-input v-model="ruleForm.person"></el-input>
              </el-form-item>

              <el-form-item label="联系电话" prop="phone">
                  <el-input v-model="ruleForm.phone"></el-input>
              </el-form-item>

              <el-form-item label="邮箱" prop="email">
                  <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>
              
              <el-form-item label="地址" prop="address">
                  <el-input v-model="ruleForm.address"></el-input>
              </el-form-item>

              <el-form-item label="城市" prop="city">
                  <el-input v-model="ruleForm.city"></el-input>
              </el-form-item>

              <el-form-item label="省份" prop="province">
                  <el-input v-model="ruleForm.province"></el-input>
              </el-form-item>

              <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>

        <div class="note">
          <el-card class="box1-card">
            <div style="margin-bottom: 10px; text-align: center;font-size: 20px;">小贴士</div>
            <el-collapse>
              <el-collapse-item title="货架名称注意事项" name="1">
                <div>1.首先是货架名字最好不要重复。</div><br>
                <div>2.如果是同一种类型的货架，可以在名字末尾加数字加以区分,例如:A1,A2。</div>
              </el-collapse-item>
              <el-collapse-item title="货架所在区注意事项" name="2">
                <div>1.货架所在区选项表的数据都是后端动态响应的。</div><br>
                <div>2.若没有适合的区域，可以在区域管理里添加一个区域。</div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </div>
    </div>

    

</template>
<script>
import axios from 'axios'
export default{
    data () {
        return {

        value: true,
        
        //后端接收的区域信息
        regions:[],
        //提交表单
        ruleForm: {
          sname: '',
          person: '',
          phone: '',
          email: '',
          address:'',
          city:'',
          province:'',
        },
        rules: {
          sname: [
            { required: true, message: '请输入区域名称', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在15个字符以内', trigger: 'blur' }
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
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
                console.log(this.ruleForm.head)
                axios.post("supplier/add",
            {
                sname:this.ruleForm.sname,
                person:this.ruleForm.person,
                phone:this.ruleForm.phone,
                email:this.ruleForm.email,
                address:this.ruleForm.address,
                city:this.ruleForm.city,
                province:this.ruleForm.province,
            })
            .then(response => {
                console.log(response.data)
                if(response.data.code == 1){
                    this.$message({
                    message: '添加成功!',
                    type: 'success'
                    });
                }else if(response.data.code == 0){
                    this.$message({
                    message: '服务器异常!',
                    type: 'warning'
                    });
                }
            })
          } else {
            this.$message({
              showClose: true,
              message: '信息有误，无法提交！',
              type: 'error'
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted() {
        axios.get('region/selectIdAndTitle').then(response => {
        this.regions = response.data.data;
      }).catch(function(error){
        console.log(error)
      })
    },
}
</script>
<style lang="less" scoped>
.title{
  margin-bottom: 20px;
  text-align: center;
  font-size: 20px;
}
.box-card {
    width: 480px;
    height: 550px;
  }
.box1-card {
    margin-left:50px;
    width: 480px;
    height: 550px;
  }
</style>