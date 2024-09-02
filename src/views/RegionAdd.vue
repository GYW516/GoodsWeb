<template>
<div class="addRegion" style="display: flex">
    <div class="add" style="width: 500px;">
      <div class="title">新增区域</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="区域名称" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="head">
            <el-input v-model="ruleForm.head"></el-input>
        </el-form-item>
        <el-form-item label="货架数量" prop="shelve_num">
          <el-input-number v-model="ruleForm.shelve_num" @change="handleChange" :min="0" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
    </div>
    <div>
      其他
    </div>
</div>
</template>
<script>
import axios from 'axios';
export default{
    data() {
      return {
        //货架数量
        num:1,
        ruleForm: {
          title: '',
          head: '',
          shelve_num: 0
        },
        rules: {
          title: [
            { required: true, message: '请输入区域名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          head:[
            {required: true, message: '请输入区域负责人', trigger: 'blur'},
            { min: 1, max: 4, message: '长度在 1 到 4 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      handleChange(value) {
        console.log(value);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
                console.log(this.ruleForm.head)
                axios.post("region/addRegion",
            {
                title:this.ruleForm.title,
                shelve_num:this.ruleForm.shelve_num,
                head:this.ruleForm.head
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
                    message: '区域名重复!',
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