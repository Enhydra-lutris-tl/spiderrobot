const {defineConfig} = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')
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
    configureWebpack: {
        // elementplus组件按需自动引入配置
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
        //高德地图相关
        externals: {
            AMap: 'AMap'
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
// webpack.config.js


