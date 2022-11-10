const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
      proxy:{
          '/dingzhi':{
            target:'http://d1.weather.com.cn/dingzhi/',
            ws:true,
            changeOrigin:true,
            pathRewrite:{
              '^/dingzhi':''  //重写路径
            },
              headers:{
                Referer: "http://www.weather.com.cn/"
              }
          }
      }
  }
})
