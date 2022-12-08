const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    lintOnSave: undefined,
    publicPath: './',
    outputDir: undefined,
    assetsDir: undefined,
    runtimeCompiler: undefined,
    productionSourceMap: undefined,
    parallel: undefined,
    css: undefined,

    transpileDependencies: true,
    configureWebpack:{
      externals:{
          AMap:'AMap'
      }
    },
    // devServer:{
    //   proxy:{
    //       '/dingzhi':{
    //         target:'http://d1.weather.com.cn/dingzhi/',
    //         ws:true,
    //         changeOrigin:true,
    //         pathRewrite:{
    //           '^/dingzhi':''  //重写路径
    //         },
    //           headers:{
    //             Referer: "http://www.weather.com.cn/"
    //           }
    //       }
    //   }
    // }
})
