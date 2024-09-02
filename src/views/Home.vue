<template>
    <el-container>
        <el-header>
            <el-row>
                <el-col :span="8">
                    <el-card class="box-card">
                        <div class="user">
                            <img src="../assets/images/1.jpg" alt="">
                            <div class="userinfo">
                                <p class="name">戎美尔(Romel)</p>
                                <p class="access">网页作者</p>
                            </div>
                        </div>
                        <div class="login-info">
                            <p>杀青时间: <span>2023-10-30</span> </p>
                            <p>工作地点: <span>无锡学院</span> </p>
                        </div>
                    </el-card>
                </el-col>

                <el-col :span="16">
                    <el-card class="right-card">
                        <div class="block">
                            <span class="demonstration">精选“舰娘”</span>
                            <el-carousel  height="200px">
                            <el-carousel-item v-for="(item,index) in imgs" :key="index">
                                <!-- <h3 class="small">{{ item }}</h3> -->
                                <img :src="require('../assets/images/'+item.imgurl)" alt="">
                            </el-carousel-item>
                            </el-carousel>
                        </div>  

                        <el-card class="card" style="flex:1">
                            <div slot="header" class="clearfix">
                                <span>告示</span>
                                <el-button style="float: right; padding: 3px 0" type="text">无效点击</el-button>
                            </div>
                            <div class="dow">
                                <div v-for="item in lists" :key="item.num" class="text item">
                                {{item.num + item.con }}
                            </div>
                            </div>
                        </el-card>

                    </el-card>
                </el-col>
            </el-row>
        </el-header>
        
        <el-main style="margin-top: 250px;">
            <div>
                <el-row :gutter="20">
                    <el-col :span="8"><div class="grid-content bg-purple">
                        <el-card>
                            <p style="margin: 0 auto; text-align: center; font-size: 20px; font-weight: 600;">技术栈</p>
                            <p>1.前端:vue基础知识</p>
                            <p>2.后端:java基础知识(springboot)</p>
                            <p>3.json-server相关知识,用来存储数据,同时也可以mock</p>
                            <p>4.网页三剑客的基础知识必不可少</p>
                            
                        </el-card>
                    </div></el-col>
                    <el-col :span="8"><div class="grid-content bg-purple">
                        <el-card>
                            <p style="margin: 0 auto; text-align: center; font-size: 20px; font-weight: 600;">工具及组件</p>
                            <p>1.本网站使用VScode来编写的,后端使用的idea</p>
                            <p>2.前端网页设计用的是Element-UI库</p>
                            <p>3.此外网站是用vue脚手架搭建的</p>
                            <p>4.组件包括axios,router,cookie,vuex等</p>
                            <p>5.后端使用的springboot框架以及mybatis</p>
                        </el-card>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple">
                        <el-card>
                            <p style="margin: 0 auto; text-align: center; font-size: 20px; font-weight: 600;">惊喜是什么？</p>
                            <p>1.惊喜就是该网页以后可以通过输入网站来访问!</p>
                            <p>(1) <el-link href="http://101.37.21.253:32/" type="primary" target="_blank">101.37.21.253:32</el-link></p>
                            <p>(2) <el-link href="http://101.37.21.253:33/" type="primary" target="_blank">101.37.21.253:33</el-link></p>
                        </el-card>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple">
                        <el-card>
                            <p style="margin: 0 auto; text-align: center; font-size: 20px; font-weight: 600;">名言警句</p>
                            <p style="font-size: 10px;">人生终有许多选择。每一步都要慎重。但是一次选择不能决定一切。不要犹豫，作出选择就不要后悔。只要我们能不屈不挠地奋斗，胜利就在前方。</p>
                        </el-card>
                    </div></el-col>
                </el-row>
            </div>
        </el-main>
    </el-container>

</template>
<script>
export default{
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      handleChange(val) {
        console.log(val);
      }
    },
    data(){
        return {
            activeNames: ['1'],
            imgs:[
                {imgurl:'2.jpg'},
                {imgurl:'3.jpg'},
                {imgurl:'4.jpg'},
                {imgurl:'5.jpg'},
            ],
            lists:[
                {
                    num:1,
                    con:'本网页由戎美尔独立完成'
                },
                {
                    num:2,
                    con:'本人知识量有限，网页还有很多改进之处'
                },
                {
                    num:3,
                    con:'对前端编程感兴趣的可以加我联系方式'
                },
                {
                    num:4,
                    con:'该网页主打前后端分离!'
                }
            ]
        }
    }
}
</script>
<style lang="less" scoped>
.user{
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    img{
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        }
    .userinfo{
        .name{
            font-size: 32px;
            margin-bottom: 10px;
        }
        .access{
            color: #999999;
        }
    }
}
.login-info{
    p{
        line-height: 28px;
        font-size: 14px;
        color: #999999;
        span{
            color: #666666;
            margin-left: 60px;
        }
    }
}

.right-card{
    display: flex;
    height: 315px;
    padding: 10px;
    box-sizing: border-box;

    /deep/.el-card__body{
        display: flex;
        .block{
            width: 350px;
            .demonstration{
                margin-left: 125px;
                font-family: '楷体';
                font-weight: 700;
            }
        }
        .card{
            margin-top: 20px;
            margin-left: 50px;
            height: 200px;
        }
    }
    .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

 

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
}

.el-carousel__container{
    width: 200px;
  }

  .grid-content{
    p{
        margin: 14px 0;
    }
  }


</style>