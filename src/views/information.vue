<template>
     <el-table
    :data="tableData"
    style="width: 100%;left: 50px;"
    height="520">
    <el-table-column
      fixed
      prop="id"
      label="ID"
      width="80">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="昵称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话号码"
      width="150">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="200">
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
  </el-table>
</template>
<script>
import axios from 'axios'
export default{
    data(){
        return {
            tableData: []
        }
    },
    mounted(){
      axios.get('UserManager/users').then(response => {
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
.el-main{
    padding: 0;
}
</style>