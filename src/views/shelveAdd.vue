<template>
    <div class="addShelve" style="display: flex;">
        <div class="add" style="width: 500px;">
          <el-card class="box-card">
            <div class="title">新增货架</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="货架名称" prop="title">
                  <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>

              <el-form-item label="货架所在区" prop="region_ID">
                  <el-select v-model="ruleForm.region_ID" placeholder="请选择区域">
                    <el-option v-for="item in regions" :key="item.id" :label="item.title" :value="item.id"></el-option>
                  </el-select>
              </el-form-item>

              <el-form-item label="负责人" prop="head">
                  <el-input v-model="ruleForm.head"></el-input>
              </el-form-item>

              <el-form-item label="货架状态" prop="cond">
                  <el-select v-model="ruleForm.cond" placeholder="请选择货架状态">
                      <el-option label="已满" value="1"></el-option>
                      <el-option label="空闲" value="2"></el-option>
                      <el-option label="损坏" value="3"></el-option>
                  </el-select>
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
          title: '',
          head: '',
          region_ID: '',
          cond: null
        },
        rules: {
          title: [
            { required: true, message: '请输入区域名称', trigger: 'blur' },
            { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
          ],
          head:[
            {required: true, message: '请输入区域负责人', trigger: 'blur'},
            { min: 1, max: 4, message: '长度在 1 到 4 个字符', trigger: 'blur' }
          ],
          region_ID: [
            { required: true, message: '请选择区域', trigger: 'change' }
          ],
          cond: [
            { required: true, message: '请选择货架状态', trigger: 'change' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
                console.log(this.ruleForm.head)
                axios.post("shelve/add",
            {
                title:this.ruleForm.title,
                region_ID:this.ruleForm.region_ID,
                cond: this.ruleForm.cond,
                head: this.ruleForm.head,
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
                    message: '货架名重复!',
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