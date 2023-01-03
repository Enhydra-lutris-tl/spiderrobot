import { createApp } from 'vue'
import App from './App.vue'
import './assets/icon/iconfont.css'
import router from "./router/index";
// element样式/main.js
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-notification.css";
import "element-plus/theme-chalk/el-message-box.css";


const app = createApp(App)
app.use(router)
app.mount('#app')
