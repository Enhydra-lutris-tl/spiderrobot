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
    // 在vue.config.js中设置 customFileProtocol字段：
    pluginOptions: {
        electronBuilder: {
            customFileProtocol: "./",
            builderOptions: {  // 重点是这个
                productName: `诶嘿`,//应用名
                appId: 'com.orico',
                asar: true,
                mac: {
                    icon: './resources/icons/icon.icns' //自定义应用图标位置
                },
                nsis: {
                    oneClick: false,
                    allowToChangeInstallationDirectory: true,
                    perMachine: true,
                    allowElevation: true,
                    runAfterFinish: true,
                    createDesktopShortcut: true,
                    createStartMenuShortcut: true,
                    deleteAppDataOnUninstall: true,
                },
                extraResources: {
                    // 拷贝静态文件到指定位置,否则打包之后出现找不到资源的问题.将整个resources目录拷贝到 发布的根目录下
                    from: './resources/',
                    to: './'
                }
            }

        }
    }

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


