const { defineConfig } = require('@vue/cli-service')
module.exports = ({
  transpileDependencies:true,
  lintOnSave:false,
  devServer:{
    proxy: {
      '/goods': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // headers: {
        //   'Access-Control-Allow-Origin': '*'
        // }
      },
      '/user': {
        target: 'http://127.0.0.1:8888',
        changeOrigin: true,
      },
      '/manager': {
        target: 'http://127.0.0.1:8888',
        changeOrigin: true,
      },
      '/item': {
        target: 'http://127.0.0.1:8888',
        changeOrigin: true,
      },
      '/cart': {
        target: 'http://127.0.0.1:8888',
        changeOrigin: true,
      },
      '/UserManager': {
        target: 'http://127.0.0.1:8888',
        changeOrigin: true,
      },
      '/region': {
        target: 'http://127.0.0.1:8888',
        changeOrigin: true,
      },
      '/shelve': {
        target: 'http://127.0.0.1:8888',
        changeOrigin: true,
      },
      '/supplier': {
        target: 'http://127.0.0.1:8888',
        changeOrigin: true,
      }


    }

  }
})

//lintonsave 静态代码分析工具 关闭eslint校验

// module.exports = {
//   lintOnSave:false
// }

// proxy:'http://localhost:3000',