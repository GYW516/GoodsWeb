<template>
  <div>
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt="" />

        <el-card class="front" style="width: 300px;">
        <el-form :model="form" :rules="rules">
            <h3 class="login_title" style="text-align: center;">用户登录</h3>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" placeholder="请输入账号"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>

            <el-form-item >
                <el-button @click="submit" type="primary" style="margin-left:10%;">登录</el-button>
                <el-button @click="dialogVisible = true" type="primary" style="margin-left:20%;">注册</el-button>
            </el-form-item>
        </el-form>
       </el-card>

       <el-dialog
        title="注册提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">

        <el-form ref="formReg" :rules="RegRules" :inline="true" :model="formReg" label-width="80px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="formReg.username" placeholder="请输入用户名" size="small"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="formReg.password" placeholder="请输入密码" size="small"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="formReg.nickname" placeholder="请输入昵称" size="small"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gendar">
                <el-select v-model="formReg.gendar" placeholder="请选择性别" size="small">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
                <el-input v-model="formReg.phone" placeholder="请输入电话号码" size="small"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="formReg.email" placeholder="请输入邮箱" size="small"></el-input>
            </el-form-item>
        </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="register">注册</el-button>
            </span>
        </el-dialog>


       



    </div>

  </div>
</template>



<script>
//辅助函数，要依靠它来获取tap里的state里的东西,实现数据通信 
import { mapState } from 'vuex';
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import axios from 'axios';

export default {
    data(){
    return {
        dialogVisible: false,
        formReg:{
            username:'',
            password:'',
            nickname:'',
            gendar:'',
            phone:'',
            email:''
        },
        RegRules:{
            username:[
             {required: true, message: '请输入用户名'}
            ],
            password:[
             {required: true, message: '请输入密码'}
            ],
            nickname:[
             {required: true, message: '请输入昵称'}
            ],
            gendar:[
             {required: true, message: '请输入性别'}
            ],
            phone:[
             {required: true, message: '请输入电话号码'}
            ],
            email:[
             {required: true, message: '请输入邮箱'}
            ],
        },
        imgSrc:require('../assets/background/bk2.jpg'),
        form:{
            username:'',
            password:''
        },
        rules: {
          username: [
            { required:true, trigger: 'blur' ,message:'请输入用户名' }
          ],
          password: [
            { required:true, trigger: 'blur' ,message:'请输入密码' }
          ]
        },
        options: [{
          value: '1',
          label: '男'
        }, {
          value: '2',
          label: '女'
        }, {
          value: '3',
          label: '其他'
        }],
     }

    },
    methods:{
        //登录逻辑处理
        submit(){
            //token 随机生成虚拟数据
            const token = Mock.Random.guid()
            //token信息存入cookie中用于组件之间的通信
            Cookie.set('token',token)
            //实现页面跳转

            const datas = {
                username:this.form.username,
                passwold:this.form.password
            }

            if(this.form.username === ''||this.form.password ===''){
                this.$message.error('输入框不可为空，请正确填写!');
                return
            }

            if(this.form.username === 'gyw'&& this.form.password ==='111'){
                Cookie.set('user','gyw')
                this.$store.commit('dmangerMenu')
                this.$router.push('/home')
                return
            }
            
            axios.post("user/login",datas)
            .then(response => {
                console.log(response)
                if(response.data.code == 1){
                    Cookie.set('user',this.form.username)
                    this.$store.commit('mangerMenu')
                    this.$router.push('/home')
                }else if(response.data.code == 0){
                    this.$message({
                    message: '不好意思，你的用户名或密码有误!',
                    type: 'warning'
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });

            // if(this.form.username === 'gyp'&& this.form.password ==='111'){
            //     Cookie.set('user','gyp')
            //     this.$store.commit('mangerMenu')
            //     this.$router.push('/home')
            // }else if(this.form.username === 'gyw'&& this.form.password ==='111'){
            //     Cookie.set('user','gyw')
            //     this.$store.commit('dmangerMenu')
            //     this.$router.push('/home')
            // }
            
        },
        handleClose() {
            this.$refs.formReg.resetFields()
            this.dialogVisible = false
        },
        cancel(){
            this.handleClose()
        },
        register(){
            const datas = {
                username:this.formReg.username,
                password:this.formReg.password,
                nickname:this.formReg.nickname,
                gender:parseInt(this.formReg.gendar),
                phone:this.formReg.phone,
                email:this.formReg.email,
            }

            if(this.formReg.username === ''||this.formReg.password === '' || this.formReg.nickname === ''||this.formReg.password ===''||this.formReg.gendar ===''||
            this.formReg.phone ===''||this.formReg.email === ''){
                this.$message.error('您的操作不规范，请正确填写!');
                return
            }
            axios.post("user/add",datas)
            .then(response => {
                if(response.data.code == 1){
                    this.$message({
                    message: '注册成功！',
                    type: 'success'
                    });
                }else if(response.data.code == 0){
                    this.$message.error('用户名已存在!');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
            this.dialogVisible = false;
        }
    }
}
</script>


<style lang="less" scoped>
.background{
    width:100%;  
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: absolute;
    opacity: 0.7;
}

.front{
    z-index:1;
    position: absolute;
    top: 50%;
    left:50%;
    transform: translateX(-50%) translateY(-50%);
    
}

</style>





